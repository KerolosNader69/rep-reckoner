
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ArrowLeft, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Demo exercise data with additional exercises
const exercisesData = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "rT7DgCr-3pg",
    thumbnail: "https://i.ytimg.com/vi/rT7DgCr-3pg/hqdefault.jpg",
  },
  {
    id: 2,
    name: "Pull-ups",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "eGo4IYlbE5g",
    thumbnail: "https://i.ytimg.com/vi/eGo4IYlbE5g/hqdefault.jpg",
  },
  {
    id: 3,
    name: "Squats",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "YaXPRqUwItQ",
    thumbnail: "https://i.ytimg.com/vi/YaXPRqUwItQ/hqdefault.jpg",
  },
  {
    id: 4,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    videoId: "r4MzxtBKyNE",
    thumbnail: "https://i.ytimg.com/vi/r4MzxtBKyNE/hqdefault.jpg",
  },
  {
    id: 5,
    name: "Overhead Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "2yjwXTZQDDI",
    thumbnail: "https://i.ytimg.com/vi/2yjwXTZQDDI/hqdefault.jpg",
  },
  {
    id: 6,
    name: "Bent Over Rows",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "FWJR5Ve8UR8",
    thumbnail: "https://i.ytimg.com/vi/FWJR5Ve8UR8/hqdefault.jpg",
  },
  {
    id: 7,
    name: "Dumbbell Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "D7KaRcUTQeE",
    thumbnail: "https://i.ytimg.com/vi/D7KaRcUTQeE/hqdefault.jpg",
  },
  {
    id: 8,
    name: "Incline Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "SrqOu55lrYU",
    thumbnail: "https://i.ytimg.com/vi/SrqOu55lrYU/hqdefault.jpg",
  },
  {
    id: 9,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "IZxyjW7MPJQ",
    thumbnail: "https://i.ytimg.com/vi/IZxyjW7MPJQ/hqdefault.jpg",
  },
  {
    id: 10,
    name: "Lateral Raises",
    muscle: "Shoulders",
    difficulty: "Beginner",
    videoId: "3VcKaXpzqRo",
    thumbnail: "https://i.ytimg.com/vi/3VcKaXpzqRo/hqdefault.jpg",
  },
  {
    id: 11,
    name: "Tricep Pushdowns",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "2-LAMcpzODU",
    thumbnail: "https://i.ytimg.com/vi/2-LAMcpzODU/hqdefault.jpg",
  },
  {
    id: 12,
    name: "Bicep Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "ykJmrZ5v0Oo",
    thumbnail: "https://i.ytimg.com/vi/ykJmrZ5v0Oo/hqdefault.jpg",
  },
  {
    id: 13,
    name: "Romanian Deadlift",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "JCXUYuzwNrM",
    thumbnail: "https://i.ytimg.com/vi/JCXUYuzwNrM/hqdefault.jpg",
  },
  {
    id: 14,
    name: "Dumbbell Flyes",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "eozdVDA78K0",
    thumbnail: "https://i.ytimg.com/vi/eozdVDA78K0/hqdefault.jpg",
  },
  {
    id: 15,
    name: "Face Pulls",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "V8dZ3pyiCBo",
    thumbnail: "https://i.ytimg.com/vi/V8dZ3pyiCBo/hqdefault.jpg",
  },
  {
    id: 16,
    name: "Calf Raises",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "gwLzBJYoWlI",
    thumbnail: "https://i.ytimg.com/vi/gwLzBJYoWlI/hqdefault.jpg",
  },
  {
    id: 17,
    name: "Chest Dips",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "dX_nSOOJIsE",
    thumbnail: "https://i.ytimg.com/vi/dX_nSOOJIsE/hqdefault.jpg",
  },
  {
    id: 18,
    name: "Hammer Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "zC3nLlEvin4",
    thumbnail: "https://i.ytimg.com/vi/zC3nLlEvin4/hqdefault.jpg",
  },
  {
    id: 19,
    name: "Barbell Hip Thrusts",
    muscle: "Glutes",
    difficulty: "Intermediate",
    videoId: "Zp26q4BY5HE",
    thumbnail: "https://i.ytimg.com/vi/Zp26q4BY5HE/hqdefault.jpg",
  },
  {
    id: 20,
    name: "Cable Crossovers",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "taI4XduLpTk",
    thumbnail: "https://i.ytimg.com/vi/taI4XduLpTk/hqdefault.jpg",
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
