
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dumbbell, Info } from 'lucide-react';

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

const WorkoutRecommendations = () => {
  const { toast } = useToast();
  const [fitnessLevel, setFitnessLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [goal, setGoal] = useState<'strength' | 'hypertrophy' | 'endurance' | 'weight-loss'>('strength');
  const [isLoading, setIsLoading] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutRecommendation[] | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('workout-recommendations', {
        body: { fitnessLevel, goal },
      });

      if (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch workout recommendations. Please try again.',
          variant: 'destructive',
        });
        return;
      }

      if (data?.workoutPlan) {
        setWorkoutPlan(data.workoutPlan);
        toast({
          title: 'Success',
          description: 'Your personalized workout plan is ready!',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: 'Unexpected error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Get AI Workout Recommendations</h2>
        
        <div className="space-y-4">
          <div>
            <Label className="text-lg font-medium mb-2 block">Fitness Level</Label>
            <RadioGroup 
              value={fitnessLevel} 
              onValueChange={(value) => setFitnessLevel(value as any)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id="beginner" />
                <Label htmlFor="beginner">Beginner</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id="intermediate" />
                <Label htmlFor="intermediate">Intermediate</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="advanced" id="advanced" />
                <Label htmlFor="advanced">Advanced</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-lg font-medium mb-2 block">Training Goal</Label>
            <RadioGroup 
              value={goal} 
              onValueChange={(value) => setGoal(value as any)}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="strength" id="strength" />
                <Label htmlFor="strength">Strength</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hypertrophy" id="hypertrophy" />
                <Label htmlFor="hypertrophy">Muscle Growth</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="endurance" id="endurance" />
                <Label htmlFor="endurance">Endurance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="weight-loss" id="weight-loss" />
                <Label htmlFor="weight-loss">Weight Loss</Label>
              </div>
            </RadioGroup>
          </div>

          <Button 
            onClick={handleGetRecommendations} 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={isLoading}
          >
            {isLoading ? "Generating Plan..." : "Get Personalized Workout Plan"}
          </Button>
        </div>
      </div>

      {workoutPlan && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Personalized Workout Plan</h2>
          
          <Tabs defaultValue={workoutPlan[0]?.day}>
            <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${workoutPlan.length}, 1fr)` }}>
              {workoutPlan.map((workout) => (
                <TabsTrigger key={workout.day} value={workout.day}>
                  {workout.day}
                </TabsTrigger>
              ))}
            </TabsList>

            {workoutPlan.map((workout) => (
              <TabsContent key={workout.day} value={workout.day} className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Dumbbell className="mr-2" /> {workout.focus}
                    </CardTitle>
                    <CardDescription>Complete all exercises with proper form</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workout.exercises.map((exercise, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg p-4">
                          <h3 className="font-semibold text-lg">{exercise.name}</h3>
                          <div className="flex justify-between mt-2 text-sm text-gray-300">
                            <span>{exercise.sets} sets</span>
                            <span>{exercise.reps} reps</span>
                            <span>{exercise.weight}</span>
                          </div>
                          <div className="mt-2 flex items-start gap-1 text-sm text-gray-300">
                            <Info size={16} className="shrink-0 mt-0.5" />
                            <span>{exercise.notes}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full mt-2" 
                      variant="outline"
                      onClick={() => {
                        // Here you would add the workout to the user's log
                        toast({
                          title: "Workout Saved",
                          description: "This workout has been saved to your log.",
                        });
                      }}
                    >
                      Add to Workout Log
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default WorkoutRecommendations;
