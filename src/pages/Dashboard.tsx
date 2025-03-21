
import React from "react";
import { Link } from "react-router-dom";
import { 
  ChartBarIcon, 
  Dumbbell, 
  CalendarDays, 
  BarChart3, 
  Apple, 
  Heart, 
  MessageCircle,
  Home 
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import NutritionCalculator from "@/components/NutritionCalculator";
import WorkoutGuide from "@/components/WorkoutGuide";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-400 to-indigo-500">Rep Reckoner</h1>
            <p className="text-gray-400 mt-1">Your personalized fitness companion</p>
          </div>
          <Link to="/" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600 transition-colors">
            <Home className="h-5 w-5 text-blue-400" />
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6 animate-fade-in">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Link to="/workout-log" className="bg-gradient-to-br from-blue-900/80 to-indigo-900/80 rounded-xl p-5 text-center hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-800/50 hover:scale-[1.02]">
            <CalendarDays className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <span className="text-sm md:text-base font-medium">Workout Log</span>
          </Link>
          <Link to="/progress-tracking" className="bg-gradient-to-br from-emerald-900/80 to-green-900/80 rounded-xl p-5 text-center hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 border border-green-800/50 hover:scale-[1.02]">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <span className="text-sm md:text-base font-medium">Progress</span>
          </Link>
          <Link to="/fitness-chat" className="bg-gradient-to-br from-amber-900/80 to-orange-900/80 rounded-xl p-5 text-center hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 border border-amber-800/50 hover:scale-[1.02]">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-amber-400" />
            <span className="text-sm md:text-base font-medium">AI Coach</span>
          </Link>
        </div>

        {/* Main Dashboard Area */}
        <Tabs defaultValue="nutrition" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-gray-800/60 p-1 rounded-lg">
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-50">Nutrition</TabsTrigger>
            <TabsTrigger value="recovery" className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-50">Recovery Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nutrition" className="mt-0 space-y-6 animate-fade-in">
            <NutritionCalculator />
          </TabsContent>
          
          <TabsContent value="recovery" className="mt-0 space-y-6 animate-fade-in">
            <WorkoutGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
