
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Dumbbell, CalendarDays, MessageSquare } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <div className="absolute top-0 left-0 right-0 h-64 bg-blue-600/10 blur-3xl -z-10 rounded-full transform translate-y-[-50%] scale-150"></div>
      
      <header className="p-6 flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Dumbbell className="text-blue-400 h-8 w-8" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Rep Reckoner</h1>
        </div>
        <div className="flex gap-3">
          {user ? (
            <Button 
              variant="ghost" 
              onClick={handleSignOut}
              className="border border-gray-700 hover:bg-gray-800 hover:text-blue-400 transition-all"
            >
              Sign Out
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </header>
      
      <main className="p-6 py-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
            Your Ultimate Fitness Companion
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Track your progress, explore exercises, and get expert advice to achieve your fitness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/70 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <Dumbbell className="text-blue-400" />
                Exercises
              </CardTitle>
              <CardDescription className="text-gray-400">Browse exercise library</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Explore a comprehensive library of exercises with detailed instructions and videos.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/exercises" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/20">
                  View Exercises
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/70 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <CalendarDays className="text-blue-400" />
                Workout Log
              </CardTitle>
              <CardDescription className="text-gray-400">Track your workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Keep track of your workouts, sets, reps, and weight to monitor your progress over time.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/workout-log" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/20">
                  Open Workout Log
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/70 hover:border-blue-500/70 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/10 group">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                <MessageSquare className="text-blue-400" />
                Fitness Chat
              </CardTitle>
              <CardDescription className="text-gray-400">Ask anatomy & fitness questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">
                Chat with an AI assistant that can answer questions about anatomy, exercises, and fitness principles.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/fitness-chat" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-blue-900/20">
                  Open Chat
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
      
      <footer className="p-6 text-center text-gray-500 mt-10">
        <p>© {new Date().getFullYear()} Rep Reckoner. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
