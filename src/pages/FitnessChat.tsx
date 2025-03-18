
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const FitnessChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your fitness and anatomy assistant. Ask me anything about workouts, muscle groups, exercise techniques, or anatomy!",
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto focus on input when page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("fitness-chatbot", {
        body: {
          messages: [
            ...messages.filter(m => m.id !== "welcome").map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input.trim() },
          ],
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.message) {
        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message.content,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10 border-b border-gray-800">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Fitness & Anatomy Chat</h1>
      </header>

      <main className="flex-1 flex flex-col p-4 max-w-3xl mx-auto w-full">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar className={message.role === "user" ? "bg-blue-600" : "bg-gray-700"}>
                    <AvatarFallback>
                      {message.role === "user" ? "U" : "AI"}
                    </AvatarFallback>
                    {message.role === "assistant" && (
                      <AvatarImage src="/placeholder.svg" />
                    )}
                  </Avatar>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4 flex gap-2 items-center">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about workout techniques, anatomy, or exercises..."
            className="flex-1 bg-gray-800 border-gray-700"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send size={18} />
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FitnessChat;
