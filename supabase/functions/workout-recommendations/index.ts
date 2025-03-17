
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WorkoutRecommendationRequest {
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goal: 'strength' | 'hypertrophy' | 'endurance' | 'weight-loss';
  preferences?: string[];
  limitations?: string[];
}

interface ExerciseRecommendation {
  name: string;
  sets: number;
  reps: number;
  weight: string;
  notes: string;
}

interface WorkoutRecommendation {
  day: string;
  focus: string;
  exercises: ExerciseRecommendation[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fitnessLevel, goal, preferences, limitations } = await req.json() as WorkoutRecommendationRequest;
    console.log(`Received request for ${fitnessLevel} level, goal: ${goal}`);

    // Create workout plan based on fitness level and goals
    const workoutPlan = generateWorkoutPlan(fitnessLevel, goal, preferences, limitations);

    return new Response(
      JSON.stringify({ workoutPlan }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in workout-recommendations function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function generateWorkoutPlan(
  fitnessLevel: string, 
  goal: string, 
  preferences?: string[], 
  limitations?: string[]
): WorkoutRecommendation[] {
  // Basic workout templates based on fitness level and goal
  const workoutPlans: Record<string, Record<string, WorkoutRecommendation[]>> = {
    beginner: {
      strength: [
        {
          day: "Monday",
          focus: "Full Body",
          exercises: [
            { name: "Bodyweight Squats", sets: 3, reps: 10, weight: "Bodyweight", notes: "Focus on form" },
            { name: "Push-ups", sets: 3, reps: 8, weight: "Bodyweight", notes: "Modify on knees if needed" },
            { name: "Dumbbell Rows", sets: 3, reps: 10, weight: "Light", notes: "Start with light weight" },
            { name: "Plank", sets: 3, reps: 1, weight: "Hold 20 seconds", notes: "Keep body straight" }
          ]
        },
        {
          day: "Wednesday",
          focus: "Full Body",
          exercises: [
            { name: "Lunges", sets: 3, reps: 8, weight: "Bodyweight", notes: "Each leg" },
            { name: "Dumbbell Shoulder Press", sets: 3, reps: 10, weight: "Light", notes: "Control the movement" },
            { name: "Assisted Pull-ups", sets: 3, reps: 6, weight: "Assisted", notes: "Use band or machine" },
            { name: "Bicycle Crunches", sets: 3, reps: 12, weight: "Bodyweight", notes: "Slow and controlled" }
          ]
        },
        {
          day: "Friday",
          focus: "Full Body",
          exercises: [
            { name: "Goblet Squats", sets: 3, reps: 10, weight: "Light", notes: "Hold dumbbell at chest" },
            { name: "Bench Press", sets: 3, reps: 8, weight: "Light", notes: "Use spotter if available" },
            { name: "Lat Pulldown", sets: 3, reps: 10, weight: "Light", notes: "Control the movement" },
            { name: "Glute Bridges", sets: 3, reps: 12, weight: "Bodyweight", notes: "Squeeze at top" }
          ]
        }
      ],
      hypertrophy: [
        /* Similar structure for hypertrophy */
        {
          day: "Monday",
          focus: "Upper Body",
          exercises: [
            { name: "Push-ups", sets: 3, reps: 12, weight: "Bodyweight", notes: "Focus on chest contraction" },
            { name: "Dumbbell Rows", sets: 3, reps: 12, weight: "Light", notes: "Slow eccentric phase" },
            { name: "Lateral Raises", sets: 3, reps: 15, weight: "Very Light", notes: "Control the movement" },
            { name: "Dumbbell Curls", sets: 3, reps: 12, weight: "Light", notes: "Full range of motion" }
          ]
        },
        {
          day: "Wednesday",
          focus: "Lower Body",
          exercises: [
            { name: "Goblet Squats", sets: 3, reps: 12, weight: "Light", notes: "Go deeper for more activation" },
            { name: "Romanian Deadlifts", sets: 3, reps: 12, weight: "Light", notes: "Focus on hamstring stretch" },
            { name: "Leg Press", sets: 3, reps: 15, weight: "Moderate", notes: "Don't lock knees at top" },
            { name: "Calf Raises", sets: 3, reps: 20, weight: "Light", notes: "Full range of motion" }
          ]
        },
        {
          day: "Friday",
          focus: "Full Body",
          exercises: [
            { name: "Incline Dumbbell Press", sets: 3, reps: 12, weight: "Light", notes: "Squeeze chest at top" },
            { name: "Pull-ups or Assisted Pull-ups", sets: 3, reps: 8, weight: "Assisted if needed", notes: "Widen grip for more lat engagement" },
            { name: "Walking Lunges", sets: 3, reps: 10, weight: "Bodyweight", notes: "Each leg" },
            { name: "Tricep Pushdowns", sets: 3, reps: 15, weight: "Light", notes: "Keep elbows fixed" }
          ]
        }
      ],
      // Additional goals would be defined here
    },
    intermediate: {
      // Intermediate level workouts
    },
    advanced: {
      // Advanced level workouts
    }
  };

  // Return the corresponding workout plan or a default one
  return workoutPlans[fitnessLevel]?.[goal] || [
    {
      day: "General recommendation",
      focus: "Basic plan - Please specify fitness level and goal for more tailored advice",
      exercises: [
        { name: "Squats", sets: 3, reps: 10, weight: "Moderate", notes: "Focus on form" },
        { name: "Push-ups", sets: 3, reps: 10, weight: "Bodyweight", notes: "Chest to ground" },
        { name: "Pull-ups", sets: 3, reps: 8, weight: "Bodyweight", notes: "Assisted if needed" },
        { name: "Planks", sets: 3, reps: 1, weight: "Hold 30 seconds", notes: "Keep core tight" }
      ]
    }
  ];
}
