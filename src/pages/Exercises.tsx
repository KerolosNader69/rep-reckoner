
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Demo exercise data with many more exercises
const exercisesData = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "gRVjAtPip0Y",
    thumbnail: "https://i.ytimg.com/vi/gRVjAtPip0Y/hqdefault.jpg",
  },
  {
    id: 2,
    name: "Pull-ups",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "XB_7En-zf_M",
    thumbnail: "https://i.ytimg.com/vi/XB_7En-zf_M/hqdefault.jpg",
  },
  {
    id: 3,
    name: "Squats",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "SW_C1A-rejs",
    thumbnail: "https://i.ytimg.com/vi/SW_C1A-rejs/hqdefault.jpg",
  },
  {
    id: 4,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    videoId: "ytGaGIn3SjE",
    thumbnail: "https://i.ytimg.com/vi/ytGaGIn3SjE/hqdefault.jpg",
  },
  {
    id: 5,
    name: "Overhead Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "QAQ64hK4Xxs",
    thumbnail: "https://i.ytimg.com/vi/QAQ64hK4Xxs/hqdefault.jpg",
  },
  {
    id: 6,
    name: "Bent Over Rows",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "kBWAon7ItDw",
    thumbnail: "https://i.ytimg.com/vi/kBWAon7ItDw/hqdefault.jpg",
  },
  {
    id: 7,
    name: "Dumbbell Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "3frV3RnPfOY",
    thumbnail: "https://i.ytimg.com/vi/3frV3RnPfOY/hqdefault.jpg",
  },
  {
    id: 8,
    name: "Incline Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "DbFgADa2PL8",
    thumbnail: "https://i.ytimg.com/vi/DbFgADa2PL8/hqdefault.jpg",
  },
  {
    id: 9,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "GvRgijoJ2xY",
    thumbnail: "https://i.ytimg.com/vi/GvRgijoJ2xY/hqdefault.jpg",
  },
  {
    id: 10,
    name: "Lateral Raises",
    muscle: "Shoulders",
    difficulty: "Beginner",
    videoId: "JIhbYYA1Q90",
    thumbnail: "https://i.ytimg.com/vi/JIhbYYA1Q90/hqdefault.jpg",
  },
  {
    id: 11,
    name: "Tricep Pushdowns",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "6kALZikXxLc",
    thumbnail: "https://i.ytimg.com/vi/6kALZikXxLc/hqdefault.jpg",
  },
  {
    id: 12,
    name: "Bicep Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "in7PaeYlhrM",
    thumbnail: "https://i.ytimg.com/vi/in7PaeYlhrM/hqdefault.jpg",
  },
  {
    id: 13,
    name: "Romanian Deadlift",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "7AaaYJbCXUU",
    thumbnail: "https://i.ytimg.com/vi/7AaaYJbCXUU/hqdefault.jpg",
  },
  {
    id: 14,
    name: "Dumbbell Flyes",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "UKwkChzThig",
    thumbnail: "https://i.ytimg.com/vi/UKwkChzThig/hqdefault.jpg",
  },
  {
    id: 15,
    name: "Face Pulls",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "rep-zHkHfZY",
    thumbnail: "https://i.ytimg.com/vi/rep-zHkHfZY/hqdefault.jpg",
  },
  {
    id: 16,
    name: "Calf Raises",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "JbyjNymZOt0",
    thumbnail: "https://i.ytimg.com/vi/JbyjNymZOt0/hqdefault.jpg",
  },
  {
    id: 17,
    name: "Chest Dips",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "wjUmnZH528Y",
    thumbnail: "https://i.ytimg.com/vi/wjUmnZH528Y/hqdefault.jpg",
  },
  {
    id: 18,
    name: "Hammer Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "TwD-YGVP4Bk",
    thumbnail: "https://i.ytimg.com/vi/TwD-YGVP4Bk/hqdefault.jpg",
  },
  {
    id: 19,
    name: "Barbell Hip Thrusts",
    muscle: "Glutes",
    difficulty: "Intermediate",
    videoId: "LM8XHLYJoYs",
    thumbnail: "https://i.ytimg.com/vi/LM8XHLYJoYs/hqdefault.jpg",
  },
  {
    id: 20,
    name: "Cable Crossovers",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "Iwe6AmxVf7o",
    thumbnail: "https://i.ytimg.com/vi/Iwe6AmxVf7o/hqdefault.jpg",
  },
  {
    id: 21,
    name: "Mountain Climbers",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "cnyTQDSE884",
    thumbnail: "https://i.ytimg.com/vi/cnyTQDSE884/hqdefault.jpg",
  },
  {
    id: 22,
    name: "Kettlebell Swings",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "mKDIuUbH76o",
    thumbnail: "https://i.ytimg.com/vi/mKDIuUbH76o/hqdefault.jpg",
  },
  {
    id: 23,
    name: "Dips",
    muscle: "Arms",
    difficulty: "Intermediate",
    videoId: "6kALZikXxLc",
    thumbnail: "https://i.ytimg.com/vi/6kALZikXxLc/hqdefault.jpg",
  },
  {
    id: 24,
    name: "Front Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "VfBOBhwXbro",
    thumbnail: "https://i.ytimg.com/vi/VfBOBhwXbro/hqdefault.jpg",
  },
  {
    id: 25,
    name: "Good Mornings",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "5Xj6XUa77qc",
    thumbnail: "https://i.ytimg.com/vi/5Xj6XUa77qc/hqdefault.jpg",
  },
  {
    id: 26,
    name: "Hang Cleans",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "YhGbXD-VIXw",
    thumbnail: "https://i.ytimg.com/vi/YhGbXD-VIXw/hqdefault.jpg",
  },
  {
    id: 27,
    name: "Bulgarian Split Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "hPlKPjohFS0",
    thumbnail: "https://i.ytimg.com/vi/hPlKPjohFS0/hqdefault.jpg",
  },
  {
    id: 28,
    name: "Inverted Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "hXTc1mDnZCw",
    thumbnail: "https://i.ytimg.com/vi/hXTc1mDnZCw/hqdefault.jpg",
  },
  {
    id: 29,
    name: "Push Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "X6-DMh-t4nQ",
    thumbnail: "https://i.ytimg.com/vi/X6-DMh-t4nQ/hqdefault.jpg",
  },
  {
    id: 30,
    name: "Box Jumps",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "NBY9-kTuHEk",
    thumbnail: "https://i.ytimg.com/vi/NBY9-kTuHEk/hqdefault.jpg",
  },
  {
    id: 31,
    name: "Russian Twists",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "JyUqwkVpsi8",
    thumbnail: "https://i.ytimg.com/vi/JyUqwkVpsi8/hqdefault.jpg",
  },
  {
    id: 32,
    name: "Cable Lat Pulldowns",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "CAwf7n6Luuc",
    thumbnail: "https://i.ytimg.com/vi/CAwf7n6Luuc/hqdefault.jpg",
  },
  {
    id: 33,
    name: "Reverse Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "XRBAODXK4MW",
    thumbnail: "https://i.ytimg.com/vi/XRBAODXK4MW/hqdefault.jpg",
  },
  {
    id: 34,
    name: "Side Planks",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "wqzrb67Dwf8",
    thumbnail: "https://i.ytimg.com/vi/wqzrb67Dwf8/hqdefault.jpg",
  },
  {
    id: 35,
    name: "Clean and Jerk",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "c77CAvOJ1NM",
    thumbnail: "https://i.ytimg.com/vi/c77CAvOJ1NM/hqdefault.jpg",
  },
  {
    id: 36,
    name: "Seated Cable Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "GZbfZ033f74",
    thumbnail: "https://i.ytimg.com/vi/GZbfZ033f74/hqdefault.jpg",
  },
  {
    id: 37,
    name: "Jump Rope",
    muscle: "Cardio",
    difficulty: "Beginner",
    videoId: "u3zgwmWjKaQ",
    thumbnail: "https://i.ytimg.com/vi/u3zgwmWjKaQ/hqdefault.jpg",
  },
  {
    id: 38,
    name: "Burpees",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "auBLPXO8Fww",
    thumbnail: "https://i.ytimg.com/vi/auBLPXO8Fww/hqdefault.jpg",
  },
  {
    id: 39,
    name: "Ab Wheel Rollouts",
    muscle: "Core",
    difficulty: "Advanced",
    videoId: "rqiTPdK1c_I",
    thumbnail: "https://i.ytimg.com/vi/rqiTPdK1c_I/hqdefault.jpg",
  },
  {
    id: 40,
    name: "Medicine Ball Slams",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "kvz8kQ_gNdE",
    thumbnail: "https://i.ytimg.com/vi/kvz8kQ_gNdE/hqdefault.jpg",
  },
];

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExercises = exercisesData.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Exercise Library</h1>
      </header>
      
      <div className="p-4">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="search"
            placeholder="Search exercises..."
            className="pl-10 bg-gray-800 border-gray-700 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="ghost" className="absolute right-2 top-2">
            <Filter size={20} />
          </Button>
        </div>
        
        {filteredExercises.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400">No exercises found. Try a different search term.</p>
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <div className="space-y-4 pb-16">
              {filteredExercises.map((exercise) => (
                <Link to={`/exercise/${exercise.id}`} key={exercise.id}>
                  <Card className="bg-gray-800 hover:bg-gray-700 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <img 
                          src={exercise.thumbnail} 
                          alt={exercise.name} 
                          className="w-24 h-24 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{exercise.name}</h3>
                          <p className="text-gray-400 text-sm">Muscle: {exercise.muscle}</p>
                          <p className="text-gray-400 text-sm">Difficulty: {exercise.difficulty}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Exercises;
