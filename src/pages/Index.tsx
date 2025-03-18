import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Dumbbell, CalendarDays, Bot, MessageSquare } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">FitTrack</h1>
        <div className="flex gap-2">
          {user ? (
            <Button variant="ghost" onClick={handleSignOut}>
              Sign Out
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          )}
        </div>
      </header>
      
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="text-blue-400" />
                Exercises
              </CardTitle>
              <CardDescription>Browse exercise library</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Explore a comprehensive library of exercises with detailed instructions and videos.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/exercises" className="w-full">
                <Button className="w-full">View Exercises</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="text-blue-400" />
                Workout Log
              </CardTitle>
              <CardDescription>Track your workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Keep track of your workouts, sets, reps, and weight to monitor your progress over time.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/workout-log" className="w-full">
                <Button className="w-full">Open Workout Log</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="text-blue-400" />
                AI Coach
              </CardTitle>
              <CardDescription>Get personalized plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Receive AI-generated workout plans tailored to your fitness level and goals.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/ai-coach" className="w-full">
                <Button className="w-full">Get Recommendations</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="text-blue-400" />
                Fitness Chat
              </CardTitle>
              <CardDescription>Ask anatomy & fitness questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Chat with an AI assistant that can answer questions about anatomy, exercises, and fitness principles.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/fitness-chat" className="w-full">
                <Button className="w-full">Open Chat</Button>
              </Link>
            </CardFooter>
          </Card>
          
        </div>
      </main>
    </div>
  );
};

export default Index;
