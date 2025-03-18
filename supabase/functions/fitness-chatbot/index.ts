
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
    // Validate API key at runtime to ensure it's actually available and valid
    if (!openAIApiKey || openAIApiKey.length === 0) {
      console.error('OpenAI API key is missing or empty');
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key is not configured correctly",
          message: {
            role: 'assistant',
            content: "Sorry, I'm currently unavailable due to a server configuration issue. Please try again later."
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
    console.log('Using OpenAI API key:', openAIApiKey ? 'Key is present (not showing for security)' : 'Key is missing');

    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json();
      console.error('OpenAI API error:', JSON.stringify(errorData));
      
      // Handle different API error types
      let errorMessage = "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
      
      if (errorData.error && errorData.error.type === 'invalid_request_error') {
        errorMessage = "There was an issue with your request. This could be due to a configuration problem.";
      } else if (errorData.error && errorData.error.type === 'authentication_error') {
        errorMessage = "I'm currently unavailable due to an authentication issue. The server needs reconfiguration.";
      }
      
      return new Response(
        JSON.stringify({ 
          message: {
            role: 'assistant',
            content: errorMessage
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200, // Return 200 to prevent app from breaking
        }
      );
    }

    const data = await openAIResponse.json();
    console.log('OpenAI API response received successfully');

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
