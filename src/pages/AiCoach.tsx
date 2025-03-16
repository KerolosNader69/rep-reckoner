
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
    text: "👋 Hi there! I'm your AI Fitness Coach. I can help you with workout plans, nutrition advice, and fitness tips. What would you like help with today?",
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
        workout: "For an effective workout routine, I recommend focusing on compound exercises like squats, deadlifts, bench press, and rows. Start with 3-4 sessions per week, alternating between push and pull exercises. Would you like a specific plan based on your goals?",
        nutrition: "A balanced diet should include protein (meat, eggs, legumes), complex carbs (whole grains, fruits, vegetables), and healthy fats (avocados, nuts, olive oil). Aim for 3-4 meals daily with a caloric intake appropriate for your goals. Would you like more specific advice?",
        weight: "To lose weight, create a caloric deficit through diet and exercise. Focus on nutrient-dense foods, increase protein intake, reduce processed foods, and combine strength training with cardio. Aim for 1-2 pounds of weight loss per week for sustainability.",
        muscle: "For muscle gain, ensure you're in a slight caloric surplus, consume 1.6-2.2g of protein per kg of bodyweight, and focus on progressive overload in your training. Split your workouts by muscle groups and ensure adequate recovery between sessions.",
        beginner: "As a beginner, focus on learning proper form for basic exercises. Start with full-body workouts 3 times per week, focusing on compound movements. Don't worry about advanced techniques yet - consistency is more important than perfection at this stage.",
      };
      
      const query = inputValue.toLowerCase();
      let botReply = "I'm not sure how to help with that specifically. Could you ask about workout routines, nutrition advice, weight loss, muscle gain, or beginner tips?";
      
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
                <p>{message.text}</p>
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
          Try asking about workout routines, nutrition advice, or specific exercises
        </p>
      </div>
    </div>
  );
};

export default AiCoach;
