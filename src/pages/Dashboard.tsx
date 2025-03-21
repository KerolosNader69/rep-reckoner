
import React from "react";
import { Link } from "react-router-dom";
import { 
  ChartBarIcon, 
  Dumbbell, 
  CalendarDays, 
  BarChart3, 
  Apple, 
  Heart, 
  Video, 
  MessageCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import WorkoutRecommendations from "@/components/WorkoutRecommendations";
import NutritionCalculator from "@/components/NutritionCalculator";
import WorkoutGuide from "@/components/WorkoutGuide";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Fitness Dashboard</h1>
          <p className="text-gray-400 mt-1">Your personalized fitness companion</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/workout-log" className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
            <CalendarDays className="h-8 w-8 mx-auto mb-2 text-blue-400" />
            <span className="text-sm md:text-base">Workout Log</span>
          </Link>
          <Link to="/progress-tracking" className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
            <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-400" />
            <span className="text-sm md:text-base">Progress</span>
          </Link>
          <Link to="/exercises" className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
            <Dumbbell className="h-8 w-8 mx-auto mb-2 text-purple-400" />
            <span className="text-sm md:text-base">Exercises</span>
          </Link>
          <Link to="/fitness-chat" className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-amber-400" />
            <span className="text-sm md:text-base">AI Coach</span>
          </Link>
        </div>

        {/* Main Dashboard Area */}
        <Tabs defaultValue="workouts" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="workouts">Workout Plans</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            <TabsTrigger value="guides">Training Guide</TabsTrigger>
          </TabsList>
          
          <TabsContent value="workouts" className="mt-0 space-y-6">
            <WorkoutRecommendations />
          </TabsContent>
          
          <TabsContent value="nutrition" className="mt-0 space-y-6">
            <NutritionCalculator />
          </TabsContent>
          
          <TabsContent value="guides" className="mt-0 space-y-6">
            <WorkoutGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
