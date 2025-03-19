
// This file can be used by both the edge function and frontend components
// if you want to share knowledge between them

// Basic fitness and anatomy knowledge base
export interface KnowledgeEntry {
  keywords: string[];
  response: string;
}

export const fitnessKnowledge: KnowledgeEntry[] = [
  {
    keywords: ["hello", "hi", "hey", "greetings"],
    response: "Hello! I'm your fitness and anatomy assistant. How can I help you today?"
  },
  {
    keywords: ["muscle", "muscles", "anatomy"],
    response: "The human body has over 600 muscles. Major muscle groups include the pectorals (chest), latissimus dorsi (back), deltoids (shoulders), biceps and triceps (arms), quadriceps and hamstrings (legs), and abdominals (core)."
  },
  {
    keywords: ["cardio", "cardiovascular", "aerobic"],
    response: "Cardiovascular exercise improves heart health, burns calories, and builds endurance. Recommended forms include running, swimming, cycling, and brisk walking. Aim for at least 150 minutes of moderate-intensity cardio per week."
  },
  {
    keywords: ["strength", "resistance", "weight", "lifting"],
    response: "Strength training builds muscle mass, increases metabolism, and improves bone density. Focus on compound movements like squats, deadlifts, bench press, and rows. Beginners should start with 2-3 sessions per week, allowing 48 hours of recovery between working the same muscle group."
  },
  {
    keywords: ["protein", "nutrition", "diet", "food"],
    response: "Proper nutrition is crucial for fitness progress. Protein intake should be around 1.6-2.2g per kg of bodyweight for those strength training. Include quality carbohydrates for energy and healthy fats for hormone production. Stay hydrated by drinking at least 2-3 liters of water daily."
  },
  {
    keywords: ["rest", "recovery", "sleep"],
    response: "Recovery is when muscle growth happens. Ensure you get 7-9 hours of quality sleep each night. Active recovery like light walking or yoga can help reduce muscle soreness. Each muscle group typically needs 48-72 hours to recover fully after intense training."
  },
  {
    keywords: ["stretching", "flexibility", "mobility"],
    response: "Stretching improves flexibility, range of motion, and reduces injury risk. Dynamic stretches are best before workouts, while static stretches work well after exercise. Consider adding yoga or dedicated mobility work to your routine 2-3 times per week."
  },
  {
    keywords: ["injury", "pain", "hurt"],
    response: "If you're experiencing pain during exercise, stop immediately. RICE (Rest, Ice, Compression, Elevation) is a good first approach for minor injuries. However, persistent pain should be evaluated by a healthcare professional. Always prioritize proper form over heavier weights."
  },
  {
    keywords: ["routine", "program", "plan", "schedule", "workout"],
    response: "A balanced fitness routine includes strength training, cardiovascular exercise, and flexibility work. Beginners might start with 3 full-body workouts weekly. More advanced trainees can consider splits (e.g., upper/lower or push/pull/legs). Consistency is more important than perfection."
  },
  {
    keywords: ["abs", "core", "six pack"],
    response: "Core muscles include the rectus abdominis (six-pack), transverse abdominis, obliques, and lower back muscles. Effective exercises include planks, hollow holds, Russian twists, and leg raises. Remember that visible abs also require low body fat, which is primarily achieved through nutrition."
  },
  {
    keywords: ["back", "lat", "latissimus"],
    response: "The back contains multiple muscles including the latissimus dorsi (lats), trapezius (traps), rhomboids, and erector spinae. Effective exercises include pull-ups, rows, lat pulldowns, and deadlifts. A strong back improves posture and prevents injuries."
  },
  {
    keywords: ["chest", "pectoral", "pec"],
    response: "The chest consists mainly of the pectoralis major and minor. Effective exercises include bench press (flat, incline, decline), push-ups, dips, and flyes. For balanced development, work the chest from multiple angles."
  },
  {
    keywords: ["leg", "legs", "quad", "hamstring", "calf"],
    response: "Leg muscles include quadriceps (front thigh), hamstrings (back thigh), gluteals (buttocks), calves, and adductors (inner thigh). Key exercises include squats, lunges, leg press, leg curls, and calf raises. Don't skip leg day—strong legs benefit your entire body and metabolism!"
  },
  {
    keywords: ["shoulder", "deltoid", "delt"],
    response: "The shoulders consist of three deltoid heads (anterior, lateral, posterior) plus the rotator cuff muscles. Effective exercises include overhead press, lateral raises, face pulls, and reverse flyes. Balanced shoulder training is crucial for joint health and upper body aesthetics."
  },
  {
    keywords: ["arm", "bicep", "tricep", "forearm"],
    response: "Arm muscles include the biceps (front), triceps (back), and forearm muscles. The triceps actually make up about 2/3 of your arm size. Effective exercises include curls, tricep extensions, dips, and wrist curls. Many compound movements like rows and presses also work the arms."
  },
  {
    keywords: ["weight loss", "fat loss", "burn fat", "lose weight"],
    response: "Weight loss requires a caloric deficit—burning more calories than you consume. Combine strength training (to preserve muscle), cardiovascular exercise (to burn calories), and a nutritious diet with moderate calorie reduction (typically 500 calories below maintenance). Aim for 0.5-1% of body weight loss per week for sustainability."
  },
  {
    keywords: ["muscle gain", "build muscle", "hypertrophy", "bulking"],
    response: "Muscle growth (hypertrophy) requires progressive overload (gradually increasing weight/reps), adequate protein (1.6-2.2g per kg bodyweight), sufficient calories (slight surplus), and recovery. Focus on compound movements with proper form and train each muscle group 2-3 times weekly."
  },
  {
    keywords: ["bodyweight", "calisthenics", "no equipment"],
    response: "Bodyweight training can be highly effective. Progressive exercises include push-up variations, pull-ups/chin-ups, dips, squats, lunges, and plank progressions. Increase difficulty by adjusting leverage, adding pauses, or increasing time under tension."
  },
  {
    keywords: ["help", "assist", "info", "information", "question"],
    response: "I can provide information about muscle anatomy, workout techniques, nutrition basics, recovery strategies, and general fitness principles. What specific topic are you interested in learning more about?"
  },
  {
    keywords: ["thanks", "thank you", "appreciate"],
    response: "You're welcome! Consistency is key to fitness success. Keep up the good work, and let me know if you have any other questions."
  }
];

// Function to find the best matching response
export function findResponse(query: string): string {
  if (!query || query.trim().length === 0) {
    return "I didn't catch that. Could you please ask me about fitness, workouts, muscle anatomy, or nutrition?";
  }

  const normalizedQuery = query.toLowerCase();
  let bestMatch: { entry: KnowledgeEntry; matchCount: number } | null = null;

  // Find the knowledge entry with the most keyword matches
  for (const entry of fitnessKnowledge) {
    const matchCount = entry.keywords.filter(keyword => 
      normalizedQuery.includes(keyword)
    ).length;
    
    if (matchCount > 0 && (!bestMatch || matchCount > bestMatch.matchCount)) {
      bestMatch = { entry, matchCount };
    }
  }

  if (bestMatch) {
    return bestMatch.entry.response;
  }

  // Return default response if no matches found
  return "I don't have specific information about that yet, but I can help with questions about muscle anatomy, workout techniques, nutrition, recovery, or general fitness principles. What would you like to know?";
}
