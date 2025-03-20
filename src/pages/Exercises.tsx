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
  {
    id: 21,
    name: "Mountain Climbers",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "nmwgirgXLYM",
    thumbnail: "https://i.ytimg.com/vi/nmwgirgXLYM/hqdefault.jpg",
  },
  {
    id: 22,
    name: "Kettlebell Swings",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "YSxHifyI6s8",
    thumbnail: "https://i.ytimg.com/vi/YSxHifyI6s8/hqdefault.jpg",
  },
  {
    id: 23,
    name: "Dips",
    muscle: "Arms",
    difficulty: "Intermediate",
    videoId: "2z8JmcrW-As",
    thumbnail: "https://i.ytimg.com/vi/2z8JmcrW-As/hqdefault.jpg",
  },
  {
    id: 24,
    name: "Front Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "uEPLXQzyK1o",
    thumbnail: "https://i.ytimg.com/vi/uEPLXQzyK1o/hqdefault.jpg",
  },
  {
    id: 25,
    name: "Good Mornings",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "YA-h3n9L4YU",
    thumbnail: "https://i.ytimg.com/vi/YA-h3n9L4YU/hqdefault.jpg",
  },
  {
    id: 26,
    name: "Hang Cleans",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "WCdhjt5G9C4",
    thumbnail: "https://i.ytimg.com/vi/WCdhjt5G9C4/hqdefault.jpg",
  },
  {
    id: 27,
    name: "Bulgarian Split Squats",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "2C-uNgKwPLE",
    thumbnail: "https://i.ytimg.com/vi/2C-uNgKwPLE/hqdefault.jpg",
  },
  {
    id: 28,
    name: "Inverted Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "SyIBPOvNhto",
    thumbnail: "https://i.ytimg.com/vi/SyIBPOvNhto/hqdefault.jpg",
  },
  {
    id: 29,
    name: "Push Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "iaBVSJm78ko",
    thumbnail: "https://i.ytimg.com/vi/iaBVSJm78ko/hqdefault.jpg",
  },
  {
    id: 30,
    name: "Box Jumps",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "52r_Ul5k03g",
    thumbnail: "https://i.ytimg.com/vi/52r_Ul5k03g/hqdefault.jpg",
  },
  {
    id: 31,
    name: "Russian Twists",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "wkD8rjkodUI",
    thumbnail: "https://i.ytimg.com/vi/wkD8rjkodUI/hqdefault.jpg",
  },
  {
    id: 32,
    name: "Cable Lat Pulldowns",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "OcFCHdQHjVU",
    thumbnail: "https://i.ytimg.com/vi/OcFCHdQHjVU/hqdefault.jpg",
  },
  {
    id: 33,
    name: "Reverse Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "rHZACn1Gixs",
    thumbnail: "https://i.ytimg.com/vi/rHZACn1Gixs/hqdefault.jpg",
  },
  {
    id: 34,
    name: "Side Planks",
    muscle: "Core",
    difficulty: "Beginner",
    videoId: "XeN4pEZZJNI",
    thumbnail: "https://i.ytimg.com/vi/XeN4pEZZJNI/hqdefault.jpg",
  },
  {
    id: 35,
    name: "Clean and Jerk",
    muscle: "Full Body",
    difficulty: "Advanced",
    videoId: "yN48sZ3FzlI",
    thumbnail: "https://i.ytimg.com/vi/yN48sZ3FzlI/hqdefault.jpg",
  },
  {
    id: 36,
    name: "Seated Cable Rows",
    muscle: "Back",
    difficulty: "Beginner",
    videoId: "sP_4vybjVJs",
    thumbnail: "https://i.ytimg.com/vi/sP_4vybjVJs/hqdefault.jpg",
  },
  {
    id: 37,
    name: "Jump Rope",
    muscle: "Cardio",
    difficulty: "Beginner",
    videoId: "FJmRQ5iTXKE",
    thumbnail: "https://i.ytimg.com/vi/FJmRQ5iTXKE/hqdefault.jpg",
  },
  {
    id: 38,
    name: "Burpees",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "TU8QYVW0gDU",
    thumbnail: "https://i.ytimg.com/vi/TU8QYVW0gDU/hqdefault.jpg",
  },
  {
    id: 39,
    name: "Ab Wheel Rollouts",
    muscle: "Core",
    difficulty: "Advanced",
    videoId: "JecU7nSgL0A",
    thumbnail: "https://i.ytimg.com/vi/JecU7nSgL0A/hqdefault.jpg",
  },
  {
    id: 40,
    name: "Medicine Ball Slams",
    muscle: "Full Body",
    difficulty: "Intermediate",
    videoId: "bfZetoOPpig",
    thumbnail: "https://i.ytimg.com/vi/bfZetoOPpig/hqdefault.jpg",
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
