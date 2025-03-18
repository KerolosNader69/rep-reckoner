
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Send, Info, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  const [configError, setConfigError] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
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

  // Function to test the connection to OpenAI API
  const testConnection = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("fitness-chatbot", {
        body: {
          messages: [{ role: "user", content: "test" }],
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error && data.error.includes("OpenAI API key")) {
        setConfigError(true);
        throw new Error("API key configuration error");
      } else {
        setConfigError(false);
        toast({
          title: "Connection Successful",
          description: "The fitness assistant is ready to use!",
        });
      }
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

      if (data?.error && data.error.includes("OpenAI API key")) {
        setConfigError(true);
        toast({
          title: "Server Configuration Error",
          description: "The chatbot is not properly configured. Please contact the administrator.",
          variant: "destructive",
        });
        
        const errorMessage: Message = {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "I'm currently unavailable due to a configuration issue. Please try again later when the server has been properly set up.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else if (data?.message) {
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
      
      const errorMessage: Message = {
        id: `assistant-error-${Date.now()}`,
        role: "assistant",
        content: "I'm having trouble responding right now. Please try again later.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      
      setApiError("Failed to connect to the assistant service. Please try again later.");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900/80 backdrop-blur-md z-10 border-b border-gray-800/70">
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Fitness & Anatomy Chat</h1>
        <div className="flex-1"></div>
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
          Test Connection
        </Button>
      </header>

      <main className="flex-1 flex flex-col p-4 max-w-3xl mx-auto w-full">
        {configError && (
          <Alert className="mb-4 bg-amber-900/30 border-amber-800 text-amber-100">
            <Info className="h-4 w-4 text-amber-400" />
            <AlertDescription>
              The chatbot is not properly configured. Please contact the administrator to set up the OpenAI API key.
            </AlertDescription>
          </Alert>
        )}

        {apiError && (
          <Alert className="mb-4 bg-red-900/30 border-red-800 text-red-100">
            <Info className="h-4 w-4 text-red-400" />
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <ScrollArea className="flex-1 pr-4 pb-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
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
                      <AvatarImage src="/placeholder.svg" />
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
            className="flex-1 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 focus-visible:ring-blue-500 text-white"
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-900/30"
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
