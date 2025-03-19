
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { messages } = await req.json() as { messages: ChatMessage[] };

    // Get the last user message
    const lastUserMessage = messages
      .filter(msg => msg.role === 'user')
      .pop();

    if (!lastUserMessage) {
      throw new Error("No user message found");
    }

    console.log(`Processing local fitness chatbot request: "${lastUserMessage.content}"`);

    // Simple pattern matching response system
    let responseContent = "";

    // Very basic keyword matching
    const query = lastUserMessage.content.toLowerCase();

    // Simple response matching based on keywords
    if (query.includes("muscle") || query.includes("anatomy")) {
      responseContent = "The human body has over 600 muscles. The major muscle groups include the chest (pectorals), back (latissimus dorsi), shoulders (deltoids), arms (biceps, triceps), legs (quadriceps, hamstrings), and core (abdominals).";
    } 
    else if (query.includes("workout") || query.includes("exercise") || query.includes("training")) {
      responseContent = "A well-rounded fitness routine includes strength training, cardiovascular exercise, and flexibility work. For beginners, I recommend 2-3 full-body strength workouts per week plus 150 minutes of moderate cardio. Remember to warm up before and cool down after each session!";
    }
    else if (query.includes("cardio") || query.includes("running") || query.includes("aerobic")) {
      responseContent = "Cardiovascular exercise strengthens your heart and improves endurance. Aim for 150-300 minutes of moderate-intensity cardio per week. Good options include running, swimming, cycling, and brisk walking. Start slowly and gradually increase duration and intensity.";
    }
    else if (query.includes("nutrition") || query.includes("diet") || query.includes("food") || query.includes("eat")) {
      responseContent = "Nutrition is crucial for fitness success. Focus on whole foods like lean proteins, complex carbohydrates, and healthy fats. For active individuals, protein intake should be around 1.6-2.2g per kg of bodyweight. Stay hydrated by drinking at least 2-3 liters of water daily.";
    }
    else if (query.includes("weight loss") || query.includes("fat loss") || query.includes("lose weight")) {
      responseContent = "Weight loss requires a caloric deficit—consuming fewer calories than you burn. A sustainable approach combines moderate calorie reduction (about 500 calories below maintenance), regular strength training to preserve muscle, and increased physical activity. Aim for 0.5-1% of body weight loss per week.";
    }
    else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
      responseContent = "Hello! I'm your fitness and anatomy assistant. How can I help you today?";
    }
    else if (query.includes("thanks") || query.includes("thank you")) {
      responseContent = "You're welcome! Consistency is key to fitness success. Keep up the good work!";
    }
    else {
      responseContent = "I can provide information about muscle anatomy, workout techniques, nutrition, and general fitness principles. What specific topic are you interested in?";
    }

    // Log the response
    console.log(`Local fitness chatbot response: "${responseContent}"`);

    return new Response(
      JSON.stringify({ 
        message: {
          role: 'assistant',
          content: responseContent
        }
      }),
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
          content: "I encountered an error processing your request. Please try again."
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200, // Return 200 to prevent app from breaking
      }
    );
  }
});
