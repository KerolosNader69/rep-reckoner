
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, BarChart, Save, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

// Demo exercise data (expanded with more exercises)
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
  },
  {
    id: 6,
    name: "Bent Over Rows",
    muscle: "Back",
    difficulty: "Intermediate",
    videoId: "FWJR5Ve8UR8",
    instructions: [
      "Hold a barbell with an overhand grip, hands just outside shoulder width.",
      "Bend at the hips and knees, keeping your back straight.",
      "Pull the barbell to your lower ribcage.",
      "Lower the barbell with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your back flat and core engaged throughout the movement.",
      "Pull your elbows back, not up.",
      "Keep the barbell close to your body.",
      "Maintain a slight bend in your knees."
    ]
  },
  {
    id: 7,
    name: "Dumbbell Lunges",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "D7KaRcUTQeE",
    instructions: [
      "Stand with feet hip-width apart, holding dumbbells at your sides.",
      "Step forward with one leg and lower your body until both knees are bent at 90-degree angles.",
      "Push through the heel of your front foot to return to the starting position.",
      "Repeat with the other leg."
    ],
    tips: [
      "Keep your upper body straight and shoulders back.",
      "Don't let your front knee extend past your toes.",
      "Keep your weight evenly distributed.",
      "Look straight ahead, not down."
    ]
  },
  {
    id: 8,
    name: "Incline Bench Press",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "SrqOu55lrYU",
    instructions: [
      "Lie on an incline bench set to 15-30 degrees.",
      "Grip the barbell slightly wider than shoulder-width apart.",
      "Lower the bar to your upper chest.",
      "Press the bar back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your feet flat on the floor.",
      "Maintain full contact between your back and the bench.",
      "Lower the weight under control.",
      "Focus on using your upper chest muscles."
    ]
  },
  {
    id: 9,
    name: "Leg Press",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "IZxyjW7MPJQ",
    instructions: [
      "Sit on the leg press machine with your back flat against the seat.",
      "Place your feet shoulder-width apart on the platform.",
      "Release the safety handles and lower the platform by bending your knees.",
      "Push through your heels to extend your legs without locking your knees.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't lock your knees at the top of the movement.",
      "Keep your back against the seat at all times.",
      "Don't let your knees collapse inward.",
      "Use a controlled motion throughout the exercise."
    ]
  },
  {
    id: 10,
    name: "Lateral Raises",
    muscle: "Shoulders",
    difficulty: "Beginner",
    videoId: "3VcKaXpzqRo",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides.",
      "Keep a slight bend in your elbows.",
      "Raise the dumbbells out to the sides until they reach shoulder height.",
      "Lower the dumbbells with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't swing the weights or use momentum.",
      "Keep your wrists in a neutral position.",
      "Don't raise the dumbbells above shoulder height.",
      "Maintain good posture throughout the exercise."
    ]
  },
  {
    id: 11,
    name: "Tricep Pushdowns",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "2-LAMcpzODU",
    instructions: [
      "Stand facing a cable machine with a rope attachment at about chest height.",
      "Grab the rope with both hands, palms facing each other.",
      "Keep your elbows close to your body and push the rope down until your arms are fully extended.",
      "Slowly allow the rope to rise back up, keeping tension on your triceps.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your elbows fixed at your sides.",
      "Only move your forearms during the exercise.",
      "Don't lean forward too much.",
      "Squeeze your triceps at the bottom of the movement."
    ]
  },
  {
    id: 12,
    name: "Bicep Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "ykJmrZ5v0Oo",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing forward.",
      "Keep your elbows close to your sides.",
      "Curl the weights up toward your shoulders.",
      "Lower the weights with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't swing your body to lift the weights.",
      "Keep your wrists straight throughout the movement.",
      "Focus on full range of motion.",
      "Keep your upper arms stationary."
    ]
  },
  {
    id: 13,
    name: "Romanian Deadlift",
    muscle: "Legs",
    difficulty: "Intermediate",
    videoId: "JCXUYuzwNrM",
    instructions: [
      "Stand with feet hip-width apart, holding a barbell in front of your thighs.",
      "Keep your back straight and knees slightly bent.",
      "Hinge at the hips and lower the barbell down your legs.",
      "Lower until you feel a stretch in your hamstrings, typically just below the knees.",
      "Return to the starting position by driving your hips forward."
    ],
    tips: [
      "Keep the bar close to your legs throughout the movement.",
      "Maintain a neutral spine position.",
      "Focus on the hip hinge, not a squat movement.",
      "Feel the stretch in your hamstrings at the bottom of the movement."
    ]
  },
  {
    id: 14,
    name: "Dumbbell Flyes",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "eozdVDA78K0",
    instructions: [
      "Lie on a flat bench with a dumbbell in each hand above your chest.",
      "Lower the dumbbells out to the sides in a wide arc.",
      "Keep a slight bend in your elbows throughout the movement.",
      "Return to the starting position, squeezing your chest muscles.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Don't lower the weights too far and strain your shoulders.",
      "Keep the movement slow and controlled.",
      "Focus on stretching and contracting your chest muscles.",
      "Keep your feet flat on the floor and back against the bench."
    ]
  },
  {
    id: 15,
    name: "Face Pulls",
    muscle: "Shoulders",
    difficulty: "Intermediate",
    videoId: "V8dZ3pyiCBo",
    instructions: [
      "Set a cable pulley to slightly above head height with a rope attachment.",
      "Grab the rope with both hands, palms facing each other.",
      "Step back until your arms are fully extended.",
      "Pull the rope toward your face, separating the ends as you pull.",
      "Return to the starting position with control."
    ],
    tips: [
      "Keep your elbows high during the movement.",
      "Pull the rope toward your face, not your chest.",
      "Squeeze your shoulder blades together at the end of the pull.",
      "Use a light weight to master proper form."
    ]
  },
  {
    id: 16,
    name: "Calf Raises",
    muscle: "Legs",
    difficulty: "Beginner",
    videoId: "gwLzBJYoWlI",
    instructions: [
      "Stand on a raised surface like a step or calf raise machine.",
      "Place the balls of your feet on the edge with heels hanging off.",
      "Lower your heels toward the floor.",
      "Raise your heels as high as possible by pushing through the balls of your feet.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Hold onto something for balance if needed.",
      "Perform the exercise slowly for maximum benefit.",
      "Don't bounce at the bottom of the movement.",
      "For added resistance, hold dumbbells or use a calf raise machine."
    ]
  },
  {
    id: 17,
    name: "Chest Dips",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "dX_nSOOJIsE",
    instructions: [
      "Grip the parallel bars with palms facing inward.",
      "Lean your torso forward slightly to target the chest muscles.",
      "Lower your body by bending your elbows until you feel a stretch in your chest.",
      "Push back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep a slight forward lean to target the chest more than the triceps.",
      "Don't lower yourself too far to avoid shoulder strain.",
      "Keep your core engaged throughout the movement.",
      "For beginners, use an assisted dip machine."
    ]
  },
  {
    id: 18,
    name: "Hammer Curls",
    muscle: "Arms",
    difficulty: "Beginner",
    videoId: "zC3nLlEvin4",
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides with palms facing your body.",
      "Keep your elbows close to your sides.",
      "Curl the weights up toward your shoulders while keeping your palms facing each other.",
      "Lower the weights with control.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your upper arms stationary throughout the exercise.",
      "Don't swing the weights or use momentum.",
      "Focus on the brachialis and brachioradialis muscles (side of the arm).",
      "Keep your wrists straight throughout the movement."
    ]
  },
  {
    id: 19,
    name: "Barbell Hip Thrusts",
    muscle: "Glutes",
    difficulty: "Intermediate",
    videoId: "Zp26q4BY5HE",
    instructions: [
      "Sit on the ground with your upper back against a bench, knees bent, and feet flat on the floor.",
      "Place a padded barbell across your hips.",
      "Drive through your heels to lift your hips toward the ceiling.",
      "Squeeze your glutes at the top of the movement.",
      "Lower your hips with control and repeat."
    ],
    tips: [
      "Keep your chin tucked and maintain a neutral spine.",
      "Drive through your heels, not your toes.",
      "Use a pad or towel on the barbell for comfort.",
      "Focus on using your glutes, not your lower back."
    ]
  },
  {
    id: 20,
    name: "Cable Crossovers",
    muscle: "Chest",
    difficulty: "Intermediate",
    videoId: "taI4XduLpTk",
    instructions: [
      "Stand between two cable machines with the pulleys set high.",
      "Grab the handles with each hand and step forward slightly.",
      "With a slight bend in your elbows, bring your hands together in front of you in an arcing motion.",
      "Slowly return to the starting position, feeling the stretch in your chest.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep a slight bend in your elbows throughout the movement.",
      "Focus on squeezing your chest muscles as you bring your hands together.",
      "Don't let the weights pull your arms back too far and strain your shoulders.",
      "Maintain good posture throughout the exercise."
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
