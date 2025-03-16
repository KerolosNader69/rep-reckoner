
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart, Save, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Demo exercise data (would be fetched from an API in a real app)
const exercisesData = [
  {
    id: 1,
    name: "Barbell Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "rT7DgCr-3pg",
    instructions: [
      "Lie on a flat bench with your feet flat on the floor.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Unrack the bar and lower it to your mid-chest.",
      "Press the bar back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your wrists straight and elbows at a 45-degree angle from your body.",
      "Maintain a natural arch in your lower back.",
      "Don't bounce the bar off your chest.",
      "Keep your shoulders back and down throughout the movement."
    ]
  },
  {
    id: 2,
    name: "Pull-ups",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "eGo4IYlbE5g",
    instructions: [
      "Hang from a pull-up bar with an overhand grip, hands slightly wider than shoulder-width.",
      "Pull your body up until your chin is over the bar.",
      "Lower your body back to the starting position with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Engage your core throughout the movement.",
      "Don't swing your body to generate momentum.",
      "Fully extend your arms at the bottom of each rep.",
      "Focus on pulling with your back muscles, not just your arms."
    ]
  },
  {
    id: 3,
    name: "Squats",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "YaXPRqUwItQ",
    instructions: [
      "Stand with feet shoulder-width apart.",
      "Lower your body by bending your knees and hips, as if sitting in a chair.",
      "Keep your chest up and back straight.",
      "Lower until thighs are parallel to the ground or slightly below.",
      "Return to standing position."
    ],
    tips: [
      "Keep your weight on your heels.",
      "Don't let your knees cave inward.",
      "Keep your back in a neutral position.",
      "Breathe in as you lower and out as you stand."
    ]
  },
  {
    id: 4,
    name: "Deadlift",
    muscle: "Back",
    difficulty: "Advanced",
    videoId: "r4MzxtBKyNE",
    instructions: [
      "Stand with feet hip-width apart, toes under the bar.",
      "Bend at the hips and knees, grasp the bar with hands shoulder-width apart.",
      "Keep your back straight, chest up, and shoulders back.",
      "Push through your heels to stand up, keeping the bar close to your body.",
      "Return the weight to the ground with control."
    ],
    tips: [
      "Keep the bar close to your body throughout the movement.",
      "Don't round your back at any point.",
      "Drive through your heels, not your toes.",
      "Keep your head in a neutral position, don't look up or down excessively."
    ]
  },
  {
    id: 5,
    name: "Overhead Press",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "2yjwXTZQDDI",
    instructions: [
      "Stand with feet shoulder-width apart, holding a barbell at shoulder level.",
      "Press the bar overhead until your arms are fully extended.",
      "Lower the bar back to shoulder level with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your core tight throughout the movement.",
      "Don't arch your back excessively.",
      "Keep your wrists straight and elbows tucked.",
      "Breathe out as you press up."
    ]
  }
];

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const exerciseId = parseInt(id || "1");
  
  const exercise = exercisesData.find(ex => ex.id === exerciseId);
  
  if (!exercise) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Exercise not found</h1>
        <Link to="/exercises" className="text-blue-400">
          Back to exercises
        </Link>
      </div>
    );
  }

  const addToWorkout = () => {
    toast({
      title: "Added to workout",
      description: `${exercise.name} has been added to your workout.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/exercises" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">{exercise.name}</h1>
      </header>
      
      <div className="aspect-video bg-black relative">
        <iframe 
          src={`https://www.youtube.com/embed/${exercise.videoId}`}
          title={exercise.name}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{exercise.name}</h2>
            <p className="text-gray-400">Target: {exercise.muscle} • {exercise.difficulty}</p>
          </div>
          <Button onClick={addToWorkout} className="bg-blue-600 hover:bg-blue-700">
            Log Workout
          </Button>
        </div>
        
        <Separator className="my-4" />
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {exercise.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
