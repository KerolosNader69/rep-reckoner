import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Dumbbell, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { findResponse } from "@/utils/fitnessKnowledge";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [apiError, setApiError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your fitness and anatomy assistant. Ask me anything about workouts, muscle groups, exercise techniques, nutrition, or fitness coaching!",
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
    if (!isMobile) {
      inputRef.current?.focus();
    }
  }, [isMobile]);

  // Function to test the local knowledge base
  const testConnection = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const response = findResponse("hello");
      
      if (!response) {
        throw new Error("Failed to get a response");
      }

      toast({
        title: "Connection Successful",
        description: "The fitness assistant is ready to use!",
      });
    } catch (error) {
      console.error("Connection test error:", error);
      setApiError("Couldn't connect to the assistant service. Please try again later.");
      toast({
        title: "Connection Error",
        description: "Failed to connect to the fitness assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    setApiError(null);

    // Add typing indicator
    setMessages((prev) => [
      ...prev,
      {
        id: "typing-indicator",
        role: "assistant",
        content: "",
        timestamp: new Date(),
      },
    ]);

    try {
      // Short delay to simulate processing time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get response from local knowledge base
      const responseContent = findResponse(input.trim());

      // Remove typing indicator
      setMessages((prev) => prev.filter(m => m.id !== "typing-indicator"));

      // Add assistant response
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: responseContent,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Remove typing indicator
      setMessages((prev) => prev.filter(m => m.id !== "typing-indicator"));
      
      const errorMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      setApiError("Failed to get a response. Please try again.");
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

  // Render loading skeleton for typing indicator
  const renderMessage = (message: Message) => {
    if (message.id === "typing-indicator") {
      return (
        <div className="flex gap-2 items-end">
          <Skeleton className="h-4 w-12 bg-gray-700" />
          <Skeleton className="h-3 w-24 bg-gray-700" />
          <Skeleton className="h-4 w-16 bg-gray-700" />
        </div>
      );
    }

    return (
      <div
        key={message.id}
        className={`flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`flex gap-3 max-w-[85%] ${
            message.role === "user" ? "flex-row-reverse" : ""
          }`}
        >
          <Avatar className={message.role === "user" ? "bg-blue-600" : "bg-emerald-700"}>
            <AvatarFallback>
              {message.role === "user" ? "U" : "AI"}
            </AvatarFallback>
            {message.role === "assistant" && (
              <AvatarImage src="/lovable-uploads/4917af78-800a-4915-92eb-8b7b549ea36b.png" alt="Fitness Bot" />
            )}
            {message.role === "user" && (
              <AvatarImage src="/lovable-uploads/30fb3a54-d028-446a-99f6-c45998fad47c.png" alt="User" />
            )}
          </Avatar>
          <div
            className={`p-3 rounded-lg ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 text-white"
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <header className="p-3 flex items-center gap-2 sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 border-b border-gray-800/70">
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={isMobile ? 20 : 24} />
        </Link>
        <h1 className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold flex items-center gap-2`}>
          <Dumbbell className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-emerald-400`} />
          AI Fitness Coach
        </h1>
        <div className="flex-1"></div>
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={testConnection} 
            disabled={isLoading}
            className="text-blue-400 border-blue-500 hover:bg-blue-950"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
            ) : (
              <RefreshCw size={16} className="mr-1" />
            )}
            Test AI
          </Button>
        )}
      </header>

      <main className={`flex-1 flex flex-col ${isMobile ? 'p-2' : 'p-4'} max-w-3xl mx-auto w-full`}>
        {apiError && (
          <Alert className="mb-4 bg-red-900/30 border-red-800 text-red-100">
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className={`flex-1 ${isMobile ? 'pr-2' : 'pr-4'} pb-4`}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id}>
                {renderMessage(message)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className={`${isMobile ? 'mt-2' : 'mt-4'} flex gap-2 items-center`}>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isMobile ? "Ask about fitness..." : "Ask about workout techniques, coaching, or fitness advice..."}
            className="flex-1 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus-visible:ring-blue-500 text-white"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30"
            size={isMobile ? "sm" : "default"}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <Send size={isMobile ? 16 : 18} />
            )}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default FitnessChat;
