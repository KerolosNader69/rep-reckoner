
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import WorkoutRecommendations from "@/components/WorkoutRecommendations";

const AiCoach = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">AI Fitness Coach</h1>
      </header>

      <main className="flex-1 p-4">
        <WorkoutRecommendations />
      </main>
    </div>
  );
};

export default AiCoach;
