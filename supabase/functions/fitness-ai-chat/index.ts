
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert fitness coach and anatomy specialist with advanced certifications. Provide comprehensive, evidence-based information about:

- Optimal workout techniques including proper form and sequencing
- Detailed muscle anatomy and biomechanics 
- Exercise programming for all fitness levels from beginner to advanced
- Periodization strategies for strength, hypertrophy, and endurance
- Nutrition protocols including macronutrient timing and supplementation
- Recovery methods including sleep optimization and stress management
- Personal training methodologies and coaching psychology

Your guidance should be backed by exercise science and sports medicine research. Include specific examples and practical applications whenever possible.
When discussing injuries or medical conditions, emphasize the importance of consulting healthcare professionals.
Use a confident, motivational tone and provide customized advice based on the user's specific needs and goals.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      throw new Error('Invalid messages format');
    }

    // Improved logging with more detail
    console.log('Processing fitness AI chat request:', JSON.stringify({
      messageCount: messages.length,
      lastMessagePreview: messages.length > 0 ? 
        `${messages[messages.length-1].role}: ${messages[messages.length-1].content.substring(0, 50)}...` : 
        'No messages'
    }));

    const openAIMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(msg => ({ 
        role: msg.role, 
        content: msg.content 
      }))
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: openAIMessages,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to get response from OpenAI');
    }

    const data = await response.json();
    const responseContent = data.choices[0].message.content;

    console.log('AI response generated successfully');

    return new Response(
      JSON.stringify({ 
        message: {
          role: 'assistant',
          content: responseContent
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fitness-ai-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: true,
        message: {
          role: 'assistant',
          content: "I encountered an error processing your request. Please try again later. Error details: " + error.message
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 to prevent app from breaking
      }
    );
  }
});
