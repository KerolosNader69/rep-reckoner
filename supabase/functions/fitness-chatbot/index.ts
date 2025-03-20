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

// Enhanced knowledge base directly in the edge function
const fitnessKnowledge = {
  // General greetings and basic responses
  greetings: [
    "Hello! I'm your fitness assistant. What would you like to know about fitness or anatomy?",
    "Hi there! I can help with fitness questions, workout advice, or anatomy information. What's on your mind?",
    "Welcome! I'm here to assist with your fitness and anatomy questions. How can I help you today?"
  ],
  
  // General fitness
  generalFitness: [
    "General fitness encompasses cardiovascular health, strength training, flexibility, and nutrition. A well-rounded fitness routine should include all these elements. The WHO recommends at least 150 minutes of moderate exercise or 75 minutes of vigorous exercise weekly, plus strength training twice a week. What specific aspect of fitness would you like to know more about?",
    "A balanced fitness approach includes strength training 2-3 times weekly, cardio 3-5 times weekly, and flexibility work daily. For beginners, focus on building consistency with activities you enjoy. Track your progress with metrics like weight lifted, distance covered, or how you feel during workouts. What part of your fitness journey are you working on?",
    "Overall fitness has five main components: cardiovascular endurance, muscular strength, muscular endurance, flexibility, and body composition. A complete fitness program addresses all of these areas. Would you like specific information about any of these components?"
  ],
  
  // Muscle anatomy - specific areas
  biceps: [
    "The biceps brachii is a two-headed muscle on the front of the upper arm. It's primary functions are elbow flexion and forearm supination. Effective exercises include various curls (dumbbell, barbell, hammer, preacher), chin-ups, and rows. For maximum bicep development, use a full range of motion and vary grip positions.",
    "Your biceps consist of two heads - the long head (outer portion) and the short head (inner portion). They work with the brachialis (underneath the biceps) and brachioradialis (forearm) during pulling movements. To fully develop your biceps, include exercises that target both heads like incline curls (for long head) and concentration curls (for short head).",
    "The biceps is more than just a show muscle - it plays a crucial role in many daily activities and compound exercises. While isolation exercises like curls directly target the biceps, they're also heavily engaged in pulling movements like rows and pull-ups. For balanced development, train your biceps through both isolation and compound movements."
  ],
  
  chest: [
    "The chest (pectoralis major) is a large, fan-shaped muscle with two parts: the clavicular head (upper chest) and the sternal head (lower chest). Key exercises include bench press variations (flat, incline, decline), push-ups, dips, and flyes. To fully develop your chest, incorporate exercises that target all angles.",
    "For comprehensive chest development, you need to work all three areas: upper (incline exercises), middle (flat bench exercises), and lower (decline exercises). The best compound movements for chest include bench press, push-ups, and dips. Isolation moves like flyes help with detail and mind-muscle connection.",
    "Many people struggle with chest development due to poor form. Key technique tips: maintain scapular retraction (shoulders back and down), use a full range of motion, focus on the chest contraction rather than just moving weight, and ensure balanced development between all parts of the chest."
  ],
  
  back: [
    "The back consists of several major muscles including the latissimus dorsi (lats), trapezius (traps), rhomboids, erector spinae, and teres major/minor. Effective exercises include pull-ups, rows (barbell, dumbbell, cable), deadlifts, and lat pulldowns. A strong back improves posture and prevents injuries.",
    "Your back is actually the most complex muscle group in your upper body. The latissimus dorsi (or 'lats') create the V-taper appearance, while the trapezius affects your neck and shoulder appearance. For complete back development, you need vertical pulls (pull-ups, pulldowns) and horizontal pulls (rows) in your routine.",
    "Back training is crucial for posture and balanced physique development. Many people have underdeveloped backs due to sedentary lifestyles. Focus on proper form: engage your lats by thinking about pulling with your elbows, maintain a stable core, and avoid using momentum."
  ],
  
  legs: [
    "Leg muscles include quadriceps (front thigh), hamstrings (back thigh), gluteals (buttocks), calves, and adductors (inner thigh). Key exercises include squats, lunges, leg press, leg curls, and calf raises. Strong legs provide the foundation for overall strength and athletic performance.",
    "Leg training is essential for balanced physique development and functional strength. The quadriceps consist of four muscles on the front of the thigh, while hamstrings are three muscles on the back of the thigh. For complete development, include both knee-dominant (squats, leg extensions) and hip-dominant exercises (deadlifts, leg curls).",
    "Calf muscles include the gastrocnemius (the visible diamond-shaped muscle) and the soleus (underneath the gastrocnemius). They respond best to high-volume training and both straight-leg (targeting gastrocnemius) and bent-leg movements (targeting soleus). Consistent calf training is key as they can be stubborn to develop."
  ],
  
  nutrition: [
    "Proper nutrition is crucial for fitness progress. Key components include adequate protein (1.6-2.2g per kg of bodyweight for those training regularly), quality carbohydrates for energy, and healthy fats for hormone production. Stay hydrated by drinking at least 2-3 liters of water daily.",
    "Meal timing can enhance workout performance and recovery. Consume protein and carbohydrates 1-2 hours before training, and have a protein-rich meal or shake within 1-2 hours after training. For overall health, focus on whole foods, adequate fiber, and a variety of fruits and vegetables to ensure micronutrient intake.",
    "Weight management comes down to energy balance: calories in vs. calories out. For weight loss, aim for a moderate caloric deficit (300-500 calories below maintenance) combined with strength training to preserve muscle mass. For muscle gain, a slight caloric surplus (200-300 calories above maintenance) supports muscle growth while minimizing fat gain."
  ],
  
  weightLoss: [
    "Effective weight loss combines a sustainable caloric deficit with regular exercise and adequate protein intake. Aim for 0.5-1% of body weight loss per week. Strength training helps preserve muscle mass during a deficit, while protein intake (1.6-2.2g per kg of bodyweight) supports satiety and muscle maintenance.",
    "For sustainable fat loss, focus on dietary adherence rather than extreme approaches. Create a moderate caloric deficit through both diet and increased activity. Track progress through multiple metrics including weight, measurements, photos, and performance in the gym, as the scale alone can be misleading.",
    "Common weight loss mistakes include cutting calories too drastically, excessive cardio without strength training, not eating enough protein, and failing to plan for long-term maintenance. A successful approach includes behavioral changes you can sustain, a supportive environment, and progressive adjustments as your body adapts."
  ],
  
  cardio: [
    "Cardiovascular exercise improves heart health, increases endurance, and supports weight management. Aim for 150-300 minutes of moderate-intensity cardio per week. Options include running, cycling, swimming, rowing, and brisk walking. Vary intensity and duration for optimal results.",
    "There are two main cardio approaches: steady-state (consistent effort level, like jogging) and interval training (alternating high and low intensity). Both have benefits. Steady-state is excellent for endurance and recovery, while intervals can be more time-efficient and may provide greater EPOC (excess post-exercise oxygen consumption).",
    "For cardio programming, consider your goals: for general health, 3-5 sessions of 20-30 minutes is sufficient; for endurance, longer sessions are beneficial; for concurrent training (cardio + strength), separate sessions when possible or prioritize your primary goal. Monitor intensity using heart rate, perceived exertion, or talk test."
  ],
  
  strengthTraining: [
    "Strength training builds muscle, increases metabolism, improves bone density, and enhances functional capacity. Key principles include progressive overload, appropriate volume, and sufficient recovery. Beginners should start with 2-3 full-body sessions weekly, focusing on compound movements like squats, deadlifts, presses, and rows.",
    "Program design factors include frequency (how often you train), volume (sets × reps), intensity (weight/difficulty), exercise selection, and progression scheme. For hypertrophy (muscle growth), moderate weights with higher volume (3-4 sets of 8-12 reps) are effective. For maximum strength, heavier weights with lower reps (3-5 sets of 1-5 reps) are optimal.",
    "Common strength training mistakes include poor form, inadequate progression, program hopping, insufficient recovery, and imbalanced programming. Focus on technique before weight, track your workouts, follow a structured program for at least 8-12 weeks, prioritize sleep and nutrition, and ensure balanced development of all muscle groups."
  ],
  
  flexibility: [
    "Flexibility training improves range of motion, reduces injury risk, enhances performance, and can alleviate muscle tension. Include dynamic stretching before workouts (moving stretches like leg swings) and static stretching after workouts (holding positions for 20-30 seconds). Aim for 2-3 dedicated flexibility sessions weekly.",
    "Mobility (active range of motion) differs from flexibility (passive range of motion). A comprehensive approach includes both static stretching and mobility drills. Focus on problem areas like hips, shoulders, and thoracic spine. Yoga, pilates, and dedicated mobility routines can all be effective approaches.",
    "Age, genetics, activity level, and consistency all influence flexibility. Improvements happen gradually - aim for small, consistent progress rather than dramatic changes. For optimal results, warm muscles stretch more effectively, so stretch after workouts or after a brief cardio warm-up."
  ],
  
  recovery: [
    "Recovery is when adaptation and progress occur. Key components include sleep (7-9 hours nightly), nutrition (adequate protein and calories), stress management, and active recovery. Balancing training stress with recovery capacity is essential for continued progress.",
    "Signs of insufficient recovery include persistent fatigue, decreased performance, increased resting heart rate, poor sleep, irritability, and frequent illnesses or injuries. Strategies to enhance recovery include proper sleep hygiene, nutrition timing, hydration, contrast therapy, massage, and scheduled deload periods.",
    "Periodization (strategic training cycles) helps optimize recovery. Include deload weeks (reduced volume/intensity) every 4-8 weeks, vary intensity throughout training cycles, and plan both short-term (daily/weekly) and long-term (monthly/yearly) recovery periods. Listen to your body and adjust training accordingly."
  ],
  
  // New fitness coaching category
  coaching: [
    "Fitness coaching provides personalized guidance to help you reach your goals more efficiently. A good coach assesses your current fitness level, creates customized programs, corrects your technique, and adjusts your plan as needed. When choosing a coach, look for proper certifications (NSCA, ACE, NASM, ISSA), experience with your specific goals, and a style that matches your personality.",
    "Working with a coach offers several benefits: expert program design tailored to your specific needs, form correction to maximize results and prevent injuries, accountability to keep you consistent, and motivation during challenging periods. Coaches can be especially valuable for beginners, those with specific goals like competition prep, individuals with medical conditions, and anyone struggling with motivation.",
    "Personal training typically costs $50-150 per session depending on experience and location, while online coaching ranges from $100-300 monthly. Many coaches offer packages with discounted rates. The investment often pays off through faster progress, fewer injuries, and more sustainable results. Before committing, look for a coach who offers a consultation to ensure their approach aligns with your needs and communication style."
  ],
  
  // Workout splits information
  pushDay: [
    "A push day focuses on muscles used in pushing movements: chest, shoulders, and triceps. A well-structured push workout typically includes compound chest movements (bench press variations), compound shoulder exercises (overhead press), isolation movements for shoulders (lateral raises), and tricep exercises (extensions, pushdowns). Start with heavier compound lifts when you're fresh, then move to isolation exercises.",
    "For an effective push day, consider this structure: begin with a horizontal push (bench press variation) for chest, follow with a vertical push (overhead press variation) for shoulders, then add isolation work for any lagging areas with exercises like cable flyes, lateral raises, and tricep extensions. Typical volume might include 12-16 sets for chest, 8-12 sets for shoulders, and 6-10 sets for triceps.",
    "Common push day mistakes include neglecting shoulder health (incorporate face pulls or band pull-aparts), overemphasizing certain areas (like chest) while neglecting others (like rear deltoids), and failing to use a variety of angles and equipment. Remember that chest, shoulder and tricep development requires working these muscles from multiple angles and with various types of tension."
  ],
  
  pullDay: [
    "A pull day targets muscles used in pulling movements: back, rear deltoids, and biceps. An effective pull workout typically includes vertical pulling for lats (pull-ups, lat pulldowns), horizontal pulling for mid-back (row variations), rear deltoid work (face pulls, reverse flyes), and bicep exercises (curls with various grips). Start with compound movements, then progress to isolated exercises.",
    "For an effective pull day structure: begin with a lat-focused movement (pull-ups or pulldowns), follow with a row variation targeting the mid/upper back, add specific rear deltoid work, and finish with direct bicep training. For back development, focus on feeling the target muscles working rather than just moving weight. Typical volume includes 12-16 sets for back, 4-6 sets for rear deltoids, and 6-10 sets for biceps.",
    "To maximize your pull workout, focus on initiating movements with your back muscles rather than your arms, experiment with different grip positions and widths to target different areas of the back, and ensure you're fully retracting your scapulae at the peak of rowing movements. Many lifters benefit from higher rep ranges (10-15) for back to develop the mind-muscle connection necessary for proper activation."
  ],
  
  legDay: [
    "A comprehensive leg day targets all lower body muscles: quadriceps, hamstrings, glutes, and calves. An effective workout structure includes compound movements (squats, leg press, lunges, deadlift variations), quad-focused exercises, hamstring/glute work, and calf exercises. Start with the most demanding compound movements, then move to more isolated exercises.",
    "For an optimal leg session: begin with a squat variation or leg press for overall lower body development, follow with a hip hinge movement like Romanian deadlifts for posterior chain, add isolation work for quadriceps (leg extensions) and hamstrings (leg curls), include specific glute exercises like hip thrusts, and finish with both standing (gastrocnemius) and seated (soleus) calf work.",
    "Common leg training mistakes include neglecting full range of motion on squats and leg press, avoiding challenging weights due to discomfort, neglecting posterior chain development, and treating calf training as an afterthought. For balanced development, ensure you're training with equal emphasis on both quadriceps and hamstrings/glutes, as posterior chain weaknesses are common and can lead to injuries."
  ],
  
  // Fallback for unmatched queries
  default: [
    "I can provide information about muscle anatomy, workout techniques, nutrition, coaching, and general fitness principles. What specific topic are you interested in learning more about?",
    "I'm here to help with fitness and anatomy questions. Would you like to know about specific muscle groups, training approaches, nutrition strategies, coaching advice, or something else?",
    "I can assist with various fitness topics including workout programming, exercise technique, muscle development, nutrition, coaching, and recovery strategies. What would you like to explore?"
  ]
};

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

    const query = lastUserMessage.content.toLowerCase();
    console.log(`Processing local fitness chatbot request: "${query}"`);

    // Improved keyword matching with more detailed responses
    let responseCategory = 'default';
    
    // Check query against all categories
    if (/\b(hello|hi|hey|greetings)\b/.test(query)) {
      responseCategory = 'greetings';
    } 
    else if (/\b(general fitness|fitness basics|fitness overview|overall fitness)\b/.test(query)) {
      responseCategory = 'generalFitness';
    }
    else if (/\b(bicep|biceps|arm|arms)\b/.test(query)) {
      responseCategory = 'biceps';
    }
    else if (/\b(chest|pec|pecs|pectoral|bench)\b/.test(query)) {
      responseCategory = 'chest';
    }
    else if (/\b(back|lats|latissimus|trap|traps|trapezius)\b/.test(query)) {
      responseCategory = 'back';
    }
    else if (/\b(leg|legs|quad|quads|hamstring|calf|calves|glute|glutes)\b/.test(query)) {
      responseCategory = 'legs';
    }
    else if (/\b(nutrition|diet|food|eat|eating|macro|macros|protein|carbs|carbohydrates|fat|fats)\b/.test(query)) {
      responseCategory = 'nutrition';
    }
    else if (/\b(weight loss|fat loss|lose weight|burn fat|calorie deficit|cutting)\b/.test(query)) {
      responseCategory = 'weightLoss';
    }
    else if (/\b(cardio|cardiovascular|aerobic|running|jogging|cycling|swimming)\b/.test(query)) {
      responseCategory = 'cardio';
    }
    else if (/\b(strength|resistance|weights|lifting|powerlifting|hypertrophy|muscle growth|build muscle)\b/.test(query)) {
      responseCategory = 'strengthTraining';
    }
    else if (/\b(flexibility|mobility|stretching|stretch|range of motion|rom|yoga)\b/.test(query)) {
      responseCategory = 'flexibility';
    }
    else if (/\b(recovery|rest|sleep|overtraining|deload|recuperation|soreness|doms)\b/.test(query)) {
      responseCategory = 'recovery';
    }
    else if (/\b(coaching|coach|personal trainer|trainer|fitness coach)\b/.test(query)) {
      responseCategory = 'coaching';
    }
    else if (/\b(push day|push workout|chest workout|chest day|shoulder workout|tricep)\b/.test(query)) {
      responseCategory = 'pushDay';
    }
    else if (/\b(pull day|pull workout|back workout|back day|bicep workout)\b/.test(query)) {
      responseCategory = 'pullDay';
    }
    else if (/\b(leg day|leg workout|lower body|lower body day)\b/.test(query)) {
      responseCategory = 'legDay';
    }
    
    // Get responses for the category and pick a random one
    const possibleResponses = fitnessKnowledge[responseCategory];
    const responseIndex = Math.floor(Math.random() * possibleResponses.length);
    const responseContent = possibleResponses[responseIndex];

    // Log the response
    console.log(`Local fitness chatbot response category: "${responseCategory}"`);

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
