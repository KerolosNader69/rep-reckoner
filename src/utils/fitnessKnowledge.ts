
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
    response: "Hello! I'm your AI fitness and anatomy assistant. How can I help you today with your fitness journey?"
  },
  {
    keywords: ["muscle", "muscles", "anatomy"],
    response: "The human body has over 600 muscles. Major muscle groups include the pectorals (chest), latissimus dorsi (back), deltoids (shoulders), biceps and triceps (arms), quadriceps and hamstrings (legs), and abdominals (core). Each muscle has a specific function and proper training can help enhance strength, endurance, and aesthetics."
  },
  {
    keywords: ["cardio", "cardiovascular", "aerobic"],
    response: "Cardiovascular exercise improves heart health, burns calories, and builds endurance. Recommended forms include running, swimming, cycling, and brisk walking. For general health, aim for at least 150 minutes of moderate-intensity cardio per week. You can break this into 30-minute sessions 5 days a week. High-Intensity Interval Training (HIIT) is an efficient alternative that alternates between intense bursts of activity and fixed periods of less-intense activity or rest."
  },
  {
    keywords: ["strength", "resistance", "weight", "lifting"],
    response: "Strength training builds muscle mass, increases metabolism, and improves bone density. Focus on compound movements like squats, deadlifts, bench press, and rows that work multiple muscle groups simultaneously. For beginners, start with 2-3 full-body sessions per week, allowing 48 hours of recovery between working the same muscle group. Progressive overload—gradually increasing weight, reps, or sets—is key to continued improvement. Remember that proper form is more important than lifting heavy weights, especially when starting out."
  },
  {
    keywords: ["protein", "nutrition", "diet", "food", "eat", "eating"],
    response: "Proper nutrition is crucial for fitness progress. Protein intake should be around 1.6-2.2g per kg of bodyweight for those strength training to support muscle repair and growth. Quality carbohydrates provide energy for workouts and daily activities, while healthy fats support hormone production and cell function. For optimal results, focus on whole foods (lean proteins, fruits, vegetables, whole grains, and healthy fats) rather than processed options. Stay hydrated by drinking at least 2-3 liters of water daily, more if you're very active or in hot conditions."
  },
  {
    keywords: ["rest", "recovery", "sleep"],
    response: "Recovery is when muscle growth happens. Ensure you get 7-9 hours of quality sleep each night to optimize hormone production and tissue repair. Active recovery like light walking, swimming, or yoga can help reduce muscle soreness after intense training. Each muscle group typically needs 48-72 hours to recover fully after intense training. Overtraining signs include persistent fatigue, decreased performance, frequent injuries, and disrupted sleep. Listen to your body and include deload weeks (reduced intensity/volume) every 4-8 weeks for optimal long-term progress."
  },
  {
    keywords: ["stretching", "flexibility", "mobility"],
    response: "Stretching improves flexibility, range of motion, and reduces injury risk. Dynamic stretches (like leg swings or arm circles) are best before workouts to prepare muscles and joints for movement. Static stretches (holding a position for 15-60 seconds) work well after exercise when muscles are warm. Consider adding yoga or dedicated mobility work to your routine 2-3 times per week. Areas that commonly need attention include hip flexors, hamstrings, shoulders, and thoracic spine. Regular flexibility work can improve performance in all other forms of exercise and reduce discomfort from daily activities."
  },
  {
    keywords: ["injury", "pain", "hurt"],
    response: "If you're experiencing pain during exercise, stop immediately. RICE (Rest, Ice, Compression, Elevation) is a good first approach for minor injuries. However, persistent pain should be evaluated by a healthcare professional. Always prioritize proper form over heavier weights or more repetitions. Common fitness injuries include muscle strains, tendonitis, and joint pain, often caused by overtraining, poor form, or inadequate warm-up. Prevention strategies include thorough warm-ups, proper technique, gradual progression, and listening to your body's signals."
  },
  {
    keywords: ["routine", "program", "plan", "schedule", "workout"],
    response: "A balanced fitness routine includes strength training, cardiovascular exercise, and flexibility work. Beginners might start with 3 full-body workouts weekly plus 2-3 cardio sessions. More advanced trainees can consider splits (e.g., upper/lower or push/pull/legs) to increase training volume per muscle group. Progressive overload is essential—gradually increase weights, sets, reps, or decrease rest periods. Track your workouts to ensure progress. Remember that consistency is more important than perfection, and the best program is one you'll actually follow consistently."
  },
  {
    keywords: ["abs", "core", "six pack"],
    response: "Core muscles include the rectus abdominis (six-pack), transverse abdominis (inner corset), obliques (sides), and lower back muscles. Effective exercises include planks, hollow holds, Russian twists, leg raises, and compound movements like squats and deadlifts that engage the core for stability. Remember that visible abs also require low body fat, which is primarily achieved through nutrition rather than endless crunches. For a balanced approach, train all core muscles from multiple angles and include exercises that focus on stability, rotation, and anti-rotation."
  },
  {
    keywords: ["back", "lat", "latissimus", "traps", "trapezius"],
    response: "The back contains multiple muscles including the latissimus dorsi (lats), trapezius (traps), rhomboids, and erector spinae. The lats create the V-taper appearance and are activated during pulling movements. Effective exercises include pull-ups, rows (barbell, dumbbell, cable), lat pulldowns, and deadlifts. For complete development, include both vertical pulls (pull-ups, pulldowns) and horizontal pulls (rows) in your routine. A strong back improves posture, prevents injuries, and creates an aesthetic physique. Many people have underdeveloped backs due to sedentary lifestyles and too much focus on 'mirror muscles'."
  },
  {
    keywords: ["chest", "pectoral", "pec", "bench"],
    response: "The chest consists mainly of the pectoralis major (with upper, middle, and lower portions) and the pectoralis minor underneath. For comprehensive development, include exercises that target all regions: incline movements for upper chest (incline press, incline flyes), flat bench for mid-chest (bench press, push-ups), and decline or dip movements for lower chest. Cable crossovers and flyes help with chest detail and mind-muscle connection. Common mistakes include excessive arching, insufficient range of motion, and neglecting the upper chest. Ensure proper form with shoulders retracted, controlled tempo, and appropriate weight selection."
  },
  {
    keywords: ["leg", "legs", "quad", "hamstring", "calf", "glute", "glutes"],
    response: "Leg muscles include quadriceps (front thigh), hamstrings (back thigh), gluteals (buttocks), calves (gastrocnemius and soleus), and adductors (inner thigh). A complete leg workout includes both knee-dominant exercises (squats, leg extensions, lunges) and hip-dominant exercises (deadlifts, hip thrusts, leg curls). For balanced development, train the posterior chain (hamstrings, glutes) as much as the anterior (quads). Don't skip leg day—strong legs benefit your entire body and metabolism! Functional leg strength improves all daily activities and athletic performance while reducing injury risk."
  },
  {
    keywords: ["shoulder", "deltoid", "delt"],
    response: "The shoulders consist of three deltoid heads (anterior/front, lateral/side, posterior/rear) plus the rotator cuff muscles that stabilize the shoulder joint. For balanced development, include pressing movements (overhead press, push press) primarily for the front delts, lateral raises for the side delts, and reverse flyes or face pulls for the often-neglected rear delts. Rotator cuff exercises like internal/external rotations are important for joint health. Shoulder training should emphasize control and moderate weights rather than heavy loads that can compromise form. Balanced shoulder development is crucial for both aesthetics and injury prevention."
  },
  {
    keywords: ["arm", "bicep", "tricep", "forearm"],
    response: "Arm muscles include the biceps (front), triceps (back, making up about 2/3 of your arm size), and forearm muscles. For complete arm development, include various curling exercises (barbell, dumbbell, hammer, preacher) for biceps, extension movements (overhead, pushdowns, dips) for triceps, and dedicated forearm work (wrist curls, reverse curls). The biceps have two heads (long and short) that can be emphasized with different grip positions, while the triceps have three heads that respond to different angles of extension. Many compound movements like rows and presses also work the arms indirectly."
  },
  {
    keywords: ["weight loss", "fat loss", "burn fat", "lose weight", "cutting"],
    response: "Weight loss requires a caloric deficit—burning more calories than you consume. For sustainable results, combine strength training (to preserve muscle), cardiovascular exercise (to burn calories), and a nutritious diet with moderate calorie reduction (typically 500 calories below maintenance). Aim for 0.5-1% of body weight loss per week to minimize muscle loss. Track progress through multiple metrics (weight, measurements, photos, performance) since the scale alone can be misleading. Common mistakes include excessive calorie restriction, too much cardio without strength training, insufficient protein, and unsustainable approaches. Focus on building healthy habits rather than quick fixes."
  },
  {
    keywords: ["muscle gain", "build muscle", "hypertrophy", "bulking"],
    response: "Muscle growth (hypertrophy) requires progressive overload (gradually increasing weight/reps), adequate protein (1.6-2.2g per kg bodyweight), sufficient calories (slight surplus of 200-300 calories above maintenance), and proper recovery. Focus on compound movements with proper form and train each muscle group 2-3 times weekly with sufficient volume (10-20 sets per muscle group per week). For optimal results, use a mix of rep ranges, emphasizing 6-12 reps for hypertrophy, and ensure adequate time under tension. Patience is key—natural muscle gain is a slow process, typically 1-2 pounds per month for beginners and even slower for experienced lifters."
  },
  {
    keywords: ["bodyweight", "calisthenics", "no equipment"],
    response: "Bodyweight training can be highly effective without any equipment. Progressive exercises include push-up variations (standard, incline, decline, diamond), pull-ups/chin-ups, dips, bodyweight squats, lunges, and plank progressions. To increase difficulty as you get stronger, adjust leverage (elevate feet for push-ups), add pauses, slow down tempo, increase time under tension, or move to single-limb variations (pistol squats, one-arm push-up progressions). Rings or suspension trainers can add versatility to a bodyweight routine. Calisthenics can build impressive strength, muscle, and skills like the human flag, muscle-up, or handstand."
  },
  {
    keywords: ["kettlebell", "kettlebells"],
    response: "Kettlebells are versatile tools that combine strength, power, and cardio benefits. Key kettlebell exercises include the swing (develops explosive hip power and conditioning), Turkish get-up (builds total-body coordination and shoulder stability), clean and press (develops strength and power), and goblet squat (builds leg strength and core stability). Kettlebell training emphasizes full-body movements, grip strength, and dynamic control. For beginners, start with a moderate weight (8-12kg for women, 12-16kg for men) and focus on technique before progressing. Kettlebell training can be structured as circuits, intervals, or traditional strength sets."
  },
  {
    keywords: ["warm up", "warming up", "warmup"],
    response: "A proper warm-up prepares your body for exercise, increases performance, and reduces injury risk. Start with 5-10 minutes of light cardio (jogging, rowing, cycling) to raise your core temperature. Follow with dynamic stretches targeting the muscles you'll use in your workout, such as leg swings, arm circles, and torso rotations. For strength training, include activation exercises for key muscle groups and gradually build up to your working weights with lighter sets. Avoid static stretching before strength or power activities as it may temporarily reduce force production. Save static stretching for after your workout when muscles are warm."
  },
  {
    keywords: ["progression", "progressive overload", "plateau"],
    response: "Progressive overload is the gradual increase of stress placed on the body during exercise and is essential for continued improvement. Ways to implement it include: increasing weight, adding reps or sets, decreasing rest periods, improving technique, increasing range of motion, or adding tempo variations (slower eccentrics, pauses). When you plateau, consider changing one variable at a time, deloading for a week to allow full recovery, or rotating exercises while maintaining the same movement patterns. Track your workouts to ensure you're consistently making small improvements over time."
  },
  {
    keywords: ["supplement", "supplements", "creatine", "protein powder"],
    response: "While supplements can enhance a solid nutrition and training program, they can't compensate for poor habits. Well-researched supplements include: protein powder (convenient source of complete protein, especially post-workout), creatine monohydrate (improves strength, power, and muscle growth), vitamin D (if deficient), omega-3 fatty acids (supports recovery and overall health), and caffeine (performance enhancer for both strength and endurance). Start with the basics (protein, creatine) before considering more specialized supplements. Remember that supplements should complement, not replace, whole foods and proper training."
  },
  {
    keywords: ["help", "assist", "info", "information", "question"],
    response: "I can provide information about muscle anatomy, workout techniques, nutrition basics, recovery strategies, program design, and general fitness principles. I can help you understand how to train specific muscle groups, develop appropriate workout routines, optimize nutrition for your goals, or improve exercise technique. What specific topic are you interested in learning more about? The more details you provide about your situation, goals, and experience level, the more personalized guidance I can offer."
  },
  {
    keywords: ["beginner", "starting", "new", "novice"],
    response: "Welcome to your fitness journey! As a beginner, focus on building consistency and proper technique rather than advanced methods. Start with 2-3 full-body workouts weekly, emphasizing compound movements like squats, pushups, rows, and lunges. Begin with bodyweight or light weights to master form before progressing. For cardio, 20-30 minutes of moderate activity 2-3 times weekly is sufficient. Nutritionally, focus on whole foods, adequate protein (1.6-2g per kg of bodyweight), and proper hydration. Rest at least one day between strength sessions for the same muscle groups. Be patient—establishing the habit is your first priority, results will follow with consistency."
  },
  {
    keywords: ["female", "woman", "women"],
    response: "Women benefit from the same fundamental training principles as men, including progressive resistance training. Despite myths, lifting weights won't make women 'bulky' due to lower testosterone levels, but will develop strength and an athletic physique. Women often excel at higher training volumes and may recover faster between sets than men. Training considerations include accounting for menstrual cycle phases (some women find strength peaks during follicular phase), focusing on posterior chain development (glutes, hamstrings) for both aesthetics and function, and including upper body work that's often neglected. Proper nutrition with adequate protein (1.6-2g per kg) and sufficient calories supports training goals."
  },
  {
    keywords: ["older", "senior", "age", "aging"],
    response: "Fitness becomes even more important as we age. Resistance training is essential for maintaining muscle mass and bone density, with research showing adults can build strength at any age. Start with 2-3 strength sessions weekly focusing on functional movements that translate to daily activities. Balance training helps prevent falls, while flexibility work maintains mobility. If you're new to exercise or have health conditions, consider working with a qualified professional initially. Progress gradually, allow more recovery time between intense sessions, and listen to your body. Exercise can significantly improve quality of life and independence with age."
  },
  {
    keywords: ["motivation", "habit", "consistent", "consistency"],
    response: "Building fitness consistency starts with small, sustainable habits rather than dramatic changes. Set specific, measurable goals focusing on behaviors (\"strength train three times this week\") rather than outcomes (\"lose 10 pounds\"). Find intrinsic motivators beyond appearance: energy levels, stress reduction, health markers, or performance improvements. Make exercise convenient by preparing in advance (pack gym bag, schedule sessions). Track your progress to see improvements over time. Connect with a community or workout partner for accountability. Remember that motivation follows action—starting the workout is often the hardest part, but momentum builds once you begin."
  },
  {
    keywords: ["workout split", "training split", "push pull legs", "upper lower"],
    response: "Common training splits include: Full Body (ideal for beginners, 2-4 sessions weekly, training all major muscle groups each workout), Upper/Lower (4 sessions weekly alternating upper and lower body), Push/Pull/Legs (6 sessions dividing into pushing movements, pulling movements, and legs), and Body Part splits (training 1-2 muscle groups per session). The best split depends on your experience, recovery capacity, and schedule. Beginners benefit from full body routines for more frequent practice and balanced development. More advanced trainees might prefer splits allowing greater volume per muscle group. Regardless of split, ensure each muscle group is trained 2-3 times weekly for optimal results."
  },
  {
    keywords: ["rep", "reps", "repetition", "repetitions", "set", "sets"],
    response: "Different rep ranges serve different purposes: 1-5 reps builds primarily strength and neural efficiency, 6-12 reps optimizes muscle growth (hypertrophy), and 12+ reps develops muscular endurance. For overall development, include a variety of rep ranges in your program. Rest periods typically correlate with rep ranges: 2-5 minutes for low-rep strength work, 1-2 minutes for moderate-rep hypertrophy work, and 30-60 seconds for high-rep endurance work. Beginners should start with 2-3 sets per exercise to build technique and work capacity, while more advanced trainees might perform 3-5 sets per exercise for main movements."
  },
  {
    keywords: ["form", "technique", "proper"],
    response: "Proper exercise technique is crucial for both results and injury prevention. Key principles include: maintaining neutral spine alignment during load-bearing exercises, creating tension in the target muscles before initiating movement, controlling the eccentric (lowering) portion of exercises, breathing appropriately (typically exhale during exertion), and using appropriate ranges of motion for your individual structure. Start with lighter weights to master form before progressing. Consider occasional video recording to assess your technique, or work with a qualified coach for feedback. Remember that proper form with moderate weight is more effective and safer than poor form with heavy weight."
  },
  {
    keywords: ["thanks", "thank you", "appreciate"],
    response: "You're welcome! Consistency is key to fitness success. Keep up the good work, and let me know if you have any other questions as you progress on your fitness journey. Every workout brings you one step closer to your goals!"
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
