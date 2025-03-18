
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey || openAIApiKey.length === 0) {
      console.error('OPENAI_API_KEY is not properly set in environment variables');
      // Return a more helpful error message with instructions
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured on the server. Please configure it in the Supabase Edge Function secrets.",
          message: {
            role: 'assistant',
            content: "I'm currently unavailable due to a configuration issue. Please try again later when the API key has been configured."
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // Return 200 to avoid breaking the app
        }
      );
    }

    const { messages } = await req.json() as { messages: ChatMessage[] };
    
    // Insert system message if it's not already present
    if (messages.length === 0 || messages[0].role !== 'system') {
      messages.unshift({
        role: 'system',
        content: `You are a knowledgeable fitness and anatomy assistant. 
        Provide accurate, scientifically-backed information about exercise, muscle anatomy, training techniques, and fitness principles.
        Explain complex concepts in simple terms and offer practical workout advice based on scientific evidence.
        Avoid providing medical diagnosis or treatment recommendations.
        If you're unsure about something, admit it rather than providing potentially incorrect information.`
      });
    }

    console.log(`Processing chat request with ${messages.length} messages`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      return new Response(
        JSON.stringify({ 
          message: {
            role: 'assistant',
            content: "I'm having trouble connecting to my knowledge base. Please try again in a moment."
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // Return 200 to prevent app from breaking
        }
      );
    }

    const data = await response.json();
    console.log('OpenAI API response received');

    return new Response(
      JSON.stringify({ message: data.choices[0].message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in fitness-chatbot function:', error);
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
