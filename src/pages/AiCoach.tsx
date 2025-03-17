
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: 1,
    type: "bot",
    text: "👋 Hi there! I'm your AI Fitness Coach. I can help you with workout plans, nutrition advice, fitness tips, and information about muscles and anatomy. What would you like help with today?",
    timestamp: new Date(),
  },
];

const AiCoach = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        // General fitness advice
        workout: "For an effective workout routine, I recommend focusing on compound exercises like squats, deadlifts, bench press, and rows. Start with 3-4 sessions per week, alternating between push and pull exercises. Would you like a specific plan based on your goals?",
        nutrition: "A balanced diet should include protein (meat, eggs, legumes), complex carbs (whole grains, fruits, vegetables), and healthy fats (avocados, nuts, olive oil). Aim for 3-4 meals daily with a caloric intake appropriate for your goals. Would you like more specific advice?",
        weight: "To lose weight, create a caloric deficit through diet and exercise. Focus on nutrient-dense foods, increase protein intake, reduce processed foods, and combine strength training with cardio. Aim for 1-2 pounds of weight loss per week for sustainability.",
        muscle: "For muscle gain, ensure you're in a slight caloric surplus, consume 1.6-2.2g of protein per kg of bodyweight, and focus on progressive overload in your training. Split your workouts by muscle groups and ensure adequate recovery between sessions.",
        beginner: "As a beginner, focus on learning proper form for basic exercises. Start with full-body workouts 3 times per week, focusing on compound movements. Don't worry about advanced techniques yet - consistency is more important than perfection at this stage.",
        
        // Workout splits
        "push day": "A Push Day typically focuses on chest, shoulders, and triceps. Try this routine:\n1. Bench Press: 4 sets x 8-12 reps\n2. Overhead Press: 3 sets x 8-12 reps\n3. Incline Dumbbell Press: 3 sets x 10-15 reps\n4. Lateral Raises: 3 sets x 12-15 reps\n5. Tricep Pushdowns: 3 sets x 12-15 reps\n6. Overhead Tricep Extensions: 3 sets x 12-15 reps",
        "pull day": "A Pull Day targets back and biceps. Try this routine:\n1. Deadlifts or Barbell Rows: 4 sets x 6-10 reps\n2. Pull-Ups or Lat Pulldowns: 4 sets x 8-12 reps\n3. Seated Cable Rows: 3 sets x 10-12 reps\n4. Face Pulls: 3 sets x 12-15 reps\n5. Bicep Curls: 3 sets x 10-12 reps\n6. Hammer Curls: 3 sets x 10-12 reps",
        "leg day": "A Leg Day works your lower body. Try this routine:\n1. Squats: 4 sets x 8-10 reps\n2. Romanian Deadlifts: 3 sets x 8-10 reps\n3. Leg Press: 3 sets x 10-12 reps\n4. Walking Lunges: 3 sets x 10 steps each leg\n5. Leg Extensions: 3 sets x 12-15 reps\n6. Leg Curls: 3 sets x 12-15 reps\n7. Calf Raises: 4 sets x 15-20 reps",
        "chest": "For a chest-focused workout, try:\n1. Flat Bench Press: 4 sets x 8-10 reps\n2. Incline Dumbbell Press: 3 sets x 10-12 reps\n3. Chest Flyes: 3 sets x 12-15 reps\n4. Push-Ups: 3 sets to failure\n5. Cable Crossovers: 3 sets x 12-15 reps",
        "back": "For a back-focused workout, try:\n1. Deadlifts: 4 sets x 6-8 reps\n2. Pull-Ups or Lat Pulldowns: 4 sets x 8-12 reps\n3. Barbell Rows: 3 sets x 8-10 reps\n4. Seated Cable Rows: 3 sets x 10-12 reps\n5. Face Pulls: 3 sets x 15 reps\n6. Straight Arm Pulldowns: 3 sets x 12-15 reps",
        "shoulder": "For shoulder development, try:\n1. Overhead Press: 4 sets x 8-10 reps\n2. Lateral Raises: 4 sets x 12-15 reps\n3. Front Raises: 3 sets x 12-15 reps\n4. Rear Delt Flyes: 3 sets x 12-15 reps\n5. Upright Rows: 3 sets x 10-12 reps\n6. Shrugs: 3 sets x 12-15 reps",
        "biceps": "For biceps training, try:\n1. Barbell Curls: 4 sets x 8-12 reps\n2. Hammer Curls: 3 sets x 10-12 reps\n3. Incline Dumbbell Curls: 3 sets x 10-12 reps\n4. Concentration Curls: 3 sets x 12-15 reps\n5. Cable Curls: 3 sets x 15 reps",
        "triceps": "For triceps training, try:\n1. Close-Grip Bench Press: 4 sets x 8-10 reps\n2. Tricep Dips: 3 sets x 8-12 reps\n3. Tricep Pushdowns: 3 sets x 10-12 reps\n4. Overhead Tricep Extensions: 3 sets x 10-12 reps\n5. Skull Crushers: 3 sets x 10-12 reps",
        "chest and back": "A chest and back combo workout:\n1. Bench Press: 4 sets x 8-10 reps\n2. Bent-Over Rows: 4 sets x 8-10 reps\n3. Incline Dumbbell Press: 3 sets x 10-12 reps\n4. Pull-Ups or Lat Pulldowns: 3 sets x 8-12 reps\n5. Cable Flyes: 3 sets x 12-15 reps\n6. Seated Cable Rows: 3 sets x 10-12 reps",
        "arnold": "The Arnold Split (Shoulders, Biceps, Triceps):\n1. Overhead Press: 4 sets x 8-10 reps\n2. Lateral Raises: 3 sets x 12-15 reps\n3. Barbell Curls: 3 sets x 8-12 reps\n4. Skull Crushers: 3 sets x 10-12 reps\n5. Hammer Curls: 3 sets x 10-12 reps\n6. Tricep Pushdowns: 3 sets x 12-15 reps\n7. Rear Delt Flyes: 3 sets x 12-15 reps",
        
        // Muscle and anatomy information
        "muscles": "The main muscle groups include:\n- Chest (Pectoralis)\n- Back (Latissimus Dorsi, Trapezius, Rhomboids)\n- Shoulders (Deltoids)\n- Arms (Biceps, Triceps)\n- Abs (Rectus Abdominis, Obliques)\n- Legs (Quadriceps, Hamstrings, Calves, Glutes)\n\nEach muscle responds best to specific exercises and training volumes. What muscle group would you like to learn more about?",
        "chest muscles": "The chest consists primarily of the pectoralis major (upper, middle, and lower portions) and pectoralis minor. The pec major is responsible for movements like pushing and bringing your arms together. Different angles of pressing movements (flat, incline, decline) target different portions of the chest.",
        "back muscles": "The back consists of several muscles including the latissimus dorsi (lats), trapezius (traps), rhomboids, erector spinae, and rear deltoids. These muscles work together for pulling movements, posture maintenance, and spine stability.",
        "leg muscles": "The legs contain some of the largest muscles in the body: quadriceps (front thigh), hamstrings (back thigh), glutes (buttocks), calves (gastrocnemius and soleus), and adductors (inner thigh). These powerful muscles enable walking, running, jumping, and provide stability.",
        "shoulder muscles": "The shoulders consist of three deltoid heads (anterior/front, medial/side, and posterior/rear) along with the rotator cuff muscles (supraspinatus, infraspinatus, teres minor, and subscapularis) which stabilize the shoulder joint.",
        "arm muscles": "Arms include the biceps brachii (front) which flex the elbow and supinate the forearm, and the triceps brachii (back) which extend the elbow. The forearm contains numerous smaller muscles for wrist and finger movements.",
        "core muscles": "The core includes the rectus abdominis (six-pack muscles), obliques (sides), transverse abdominis (deep layer), and erector spinae (lower back). A strong core is essential for stability, posture, and power transfer between upper and lower body.",
        
        "bones": "The human skeleton has 206 bones that provide structure, protection for organs, and attachment points for muscles. Major bones include:\n- Skull (cranium)\n- Spine (vertebrae)\n- Ribcage (ribs and sternum)\n- Shoulder girdle (clavicle and scapula)\n- Arms (humerus, radius, ulna)\n- Hands (carpals, metacarpals, phalanges)\n- Pelvis (hip bones)\n- Legs (femur, tibia, fibula)\n- Feet (tarsals, metatarsals, phalanges)\n\nWhat specific bone structure would you like to learn about?",
        "joints": "Joints are where bones meet, allowing movement and flexibility. The main types are:\n- Ball and socket (shoulder, hip)\n- Hinge (elbow, knee)\n- Pivot (neck)\n- Saddle (thumb)\n- Gliding (wrist, ankle)\n\nJoint health is crucial for mobility and injury prevention. Regular exercise, proper form, and adequate nutrition help maintain joint integrity.",
      };
      
      const query = inputValue.toLowerCase();
      let botReply = "I'm not sure how to help with that specifically. You can ask about workout routines (Push Day, Pull Day, Leg Day, etc.), specific muscle groups, anatomy, nutrition advice, weight loss, muscle gain, or beginner tips.";
      
      for (const [keyword, response] of Object.entries(botResponses)) {
        if (query.includes(keyword)) {
          botReply = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: Date.now(),
        type: "bot",
        text: botReply,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">AI Fitness Coach</h1>
      </header>
      
      <ScrollArea className="flex-1 overflow-y-auto px-4 pb-4" ref={scrollAreaRef}>
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === "user" 
                    ? "bg-blue-600 rounded-tr-none" 
                    : "bg-gray-700 rounded-tl-none"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.type === "bot" ? (
                    <Bot size={16} className="text-blue-400" />
                  ) : (
                    <User size={16} className="text-gray-300" />
                  )}
                  <span className="text-xs text-gray-300">
                    {message.type === "bot" ? "Coach" : "You"}
                  </span>
                </div>
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Ask about workouts, nutrition, or fitness tips..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-gray-700 border-gray-600 text-white"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-4">
            <Send size={18} />
          </Button>
        </form>
        <p className="text-xs text-gray-400 mt-2">
          Try asking about workout routines (Push Day, Pull Day), specific muscles, nutrition advice, or anatomy
        </p>
      </div>
    </div>
  );
};

export default AiCoach;
