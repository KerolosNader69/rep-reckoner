
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `You are an expert fitness coach and anatomy specialist. Provide detailed, accurate information about:
- Workout techniques and proper form
- Muscle anatomy and physiology
- Exercise programming and workout splits
- Nutrition and recovery strategies
- Personal training and coaching advice

Keep answers informative, practical, and evidence-based. When possible, cite scientific research.
If asked about injuries or medical conditions, remind the user to consult healthcare professionals.
Use a friendly, encouraging tone and include specific, actionable advice.`;

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

    console.log('Processing fitness AI chat request with messages:', 
      messages.map(m => ({ role: m.role, content: m.content.substring(0, 50) + '...' })));

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
        message: {
          role: 'assistant',
          content: "I encountered an error processing your request. Please try again later."
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 to prevent app from breaking
      }
    );
  }
});
