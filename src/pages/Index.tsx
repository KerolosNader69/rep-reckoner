
import React from "react";
import { Link } from "react-router-dom";
import { Dumbbell, Search, Pencil, MessageSquare, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const handleDemo = () => {
    toast({
      title: "Welcome to RepReckoner!",
      description: "Your ultimate fitness companion app"
    });
  };
  
  return <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Dumbbell className="mr-2" /> RepReckoner
        </h1>
        <Link to="/login">
          <Button variant="outline" className="flex items-center gap-2 border-white hover:bg-white/10 text-white">
            <LogIn size={18} /> Sign In
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Track Your Fitness Journey</h2>
          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Your all-in-one fitness companion for workouts, tracking, and guidance
          </p>
          <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-lg" onClick={handleDemo}>
            Get Started
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          <FeatureCard icon={<Search className="w-10 h-10 text-blue-400" />} title="Search Exercises" description="Find the perfect exercise with video tutorials to perfect your form" to="/exercises" />
          
          <FeatureCard icon={<Pencil className="w-10 h-10 text-green-400" />} title="Workout Log" description="Track your sets, reps, and progress over time" to="/workout-log" />
          
          <FeatureCard icon={<MessageSquare className="w-10 h-10 text-purple-400" />} title="AI Fitness Coach" description="Get personalized workout and nutrition plans" to="/ai-coach" />
          
          <FeatureCard icon={<Dumbbell className="w-10 h-10 text-orange-400" />} title="Exercise Library" description="Browse our comprehensive exercise database with videos" to="/exercises" />
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-2 flex justify-around items-center">
        <Link to="/" className="flex flex-col items-center p-2 text-blue-400">
          <Dumbbell size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link to="/exercises" className="flex flex-col items-center p-2 text-gray-400">
          <Search size={24} />
          <span className="text-xs mt-1">Search</span>
        </Link>
        <Link to="/workout-log" className="flex flex-col items-center p-2 text-gray-400">
          <Pencil size={24} />
          <span className="text-xs mt-1">Log</span>
        </Link>
        <Link to="/ai-coach" className="flex flex-col items-center p-2 text-gray-400">
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Coach</span>
        </Link>
      </nav>
    </div>;
};

// Feature card component for the home page
const FeatureCard = ({
  icon,
  title,
  description,
  to
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) => {
  return <Link to={to} className="block">
      <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </Link>;
};

export default Index;
