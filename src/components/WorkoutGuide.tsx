
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Info, AlertTriangle, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ExerciseGuide {
  name: string;
  muscleGroup: string;
  level: string;
  instructions: string[];
  tips: string[];
  warnings: string[];
  gifUrl: string;
}

const exerciseGuides: ExerciseGuide[] = [
  {
    name: "Barbell Bench Press",
    muscleGroup: "chest",
    level: "beginner",
    instructions: [
      "Lie on a flat bench with your feet flat on the ground",
      "Grip the barbell slightly wider than shoulder-width apart",
      "Unrack the bar and lower it to the middle of your chest",
      "Press the bar back up to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    tips: [
      "Keep your wrists straight and elbows at about a 45-degree angle",
      "Maintain a slight arch in your lower back",
      "Focus on pushing through your chest, not just your arms",
      "Keep your shoulder blades retracted and down throughout the movement"
    ],
    warnings: [
      "Don't bounce the bar off your chest",
      "Avoid excessive arching of the back",
      "Use a spotter for heavy weights",
      "If you feel shoulder pain, consider using dumbbells instead"
    ],
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHZheWl3djhzcDRjanQ2dXh3bWp2NTk1NmwyMTZhbXZuZDhoZ3B4ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZF8qiA3wjSXE1HWWQZ/giphy.gif"
  },
  {
    name: "Squats",
    muscleGroup: "legs",
    level: "beginner",
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and core engaged",
      "Bend at the knees and hips, lowering as if sitting in a chair",
      "Lower until thighs are parallel to the ground (or as low as comfortable)",
      "Push through your heels to return to standing position"
    ],
    tips: [
      "Keep weight in your heels and mid-foot",
      "Maintain a neutral spine throughout the movement",
      "Push your knees outward slightly to engage glutes better",
      "Breathe in on the way down, out on the way up"
    ],
    warnings: [
      "Don't let your knees cave inward",
      "Avoid rounding your lower back",
      "Start with bodyweight before adding external load",
      "If you have knee issues, limit depth initially"
    ],
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXE2Y2M2aTUxNWgwc3k5MWQyM3ByaXV0N3EzNWg2dDNnNXRnOHJudCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XfhQN2NqofqGqAG3FX/giphy.gif"
  },
  {
    name: "Deadlift",
    muscleGroup: "back",
    level: "intermediate",
    instructions: [
      "Stand with feet hip-width apart, barbell over mid-foot",
      "Bend at the hips and knees, grab the bar with hands outside knees",
      "Keep chest up, back flat, and core tight",
      "Drive through heels, extending hips and knees to stand up",
      "Return the weight to the ground with control"
    ],
    tips: [
      "Think of the movement as pushing the floor away rather than pulling the bar up",
      "Keep the bar close to your body throughout the movement",
      "Engage your lats by pulling your shoulders back and down",
      "Use a mixed grip or hook grip for heavier weights to prevent bar rolling"
    ],
    warnings: [
      "Never round your lower back",
      "Start with lighter weights to perfect form",
      "Avoid jerking the bar off the ground",
      "If you have back issues, consult a professional first"
    ],
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnFqZ3hkdnkzYjR0cW9ycHRsbGZnZnJtZzUxZnJqcXRxZng4OHZ2NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gIu9QApg93hV0ZmJEb/giphy.gif"
  }
];

interface RecoveryTip {
  title: string;
  type: 'warmup' | 'cooldown' | 'recovery';
  description: string;
  steps: string[];
}

const recoveryTips: RecoveryTip[] = [
  {
    title: "Dynamic Warm-up Routine",
    type: "warmup",
    description: "A proper warm-up increases blood flow, activates muscles, and reduces injury risk. Perform this 5-10 minute routine before every workout.",
    steps: [
      "Jumping jacks or light jogging (2 minutes)",
      "Arm circles forward and backward (20 seconds each direction)",
      "Bodyweight squats (10-15 reps)",
      "Walking lunges (10 each leg)",
      "Hip circles and rotations (10 each direction)",
      "Push-up to downward dog (5-10 reps)",
      "Light stretching for target muscle groups (1-2 minutes)"
    ]
  },
  {
    title: "Effective Cool-down Protocol",
    type: "cooldown",
    description: "Cooling down helps lower heart rate gradually and begins the recovery process. Spend 5-10 minutes on this after each workout.",
    steps: [
      "Light cardio (walking or cycling) at a decreasing pace (2-3 minutes)",
      "Static stretching for major muscle groups worked (hold each stretch 20-30 seconds)",
      "Deep breathing exercises (1-2 minutes)",
      "Foam rolling painful or tight areas (2-3 minutes)"
    ]
  },
  {
    title: "Recovery Day Activities",
    type: "recovery",
    description: "Active recovery promotes blood flow without causing additional muscle damage. Incorporate these on rest days.",
    steps: [
      "Light walking or swimming (20-30 minutes)",
      "Yoga or mobility work (15-20 minutes)",
      "Foam rolling entire body (10-15 minutes)",
      "Contrast therapy: alternating hot and cold showers",
      "Proper hydration and nutrition focus"
    ]
  },
  {
    title: "Sleep Optimization for Athletes",
    type: "recovery",
    description: "Quality sleep is crucial for muscle recovery, hormone production, and overall performance.",
    steps: [
      "Aim for 7-9 hours of sleep per night",
      "Maintain consistent sleep/wake times",
      "Create a cool, dark sleeping environment",
      "Avoid screens 1 hour before bed",
      "Consider melatonin or magnesium supplements if needed (consult healthcare provider first)",
      "Use recovery tools like massage guns before sleep to improve relaxation"
    ]
  }
];

const WorkoutGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string | null>(null);
  
  const filteredExercises = exerciseGuides.filter(exercise => 
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (!selectedMuscleGroup || exercise.muscleGroup === selectedMuscleGroup)
  );

  return (
    <Tabs defaultValue="exercises" className="w-full">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="exercises">Exercise Tutorials</TabsTrigger>
        <TabsTrigger value="recovery">Recovery & Injury Prevention</TabsTrigger>
      </TabsList>
      
      <TabsContent value="exercises" className="mt-0">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={16} />
              <Input
                placeholder="Search exercises..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700 border-gray-600"
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedMuscleGroup(selectedMuscleGroup === 'chest' ? null : 'chest')}
                className={`px-3 py-2 rounded-md ${selectedMuscleGroup === 'chest' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Chest
              </button>
              <button 
                onClick={() => setSelectedMuscleGroup(selectedMuscleGroup === 'back' ? null : 'back')}
                className={`px-3 py-2 rounded-md ${selectedMuscleGroup === 'back' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Back
              </button>
              <button 
                onClick={() => setSelectedMuscleGroup(selectedMuscleGroup === 'legs' ? null : 'legs')}
                className={`px-3 py-2 rounded-md ${selectedMuscleGroup === 'legs' ? 'bg-blue-600' : 'bg-gray-700'}`}
              >
                Legs
              </button>
            </div>
          </div>
          
          {filteredExercises.length === 0 ? (
            <div className="text-center py-8 bg-gray-800 rounded-lg">
              <p>No exercises found. Try a different search term or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredExercises.map((exercise) => (
                <Card key={exercise.name} className="bg-gray-800 border-gray-700 overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-center p-4 bg-gray-900">
                      <div className="relative w-full pt-[100%] overflow-hidden rounded-md">
                        <img 
                          src={exercise.gifUrl} 
                          alt={exercise.name} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                          <Play size={40} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 p-6">
                      <h3 className="text-xl font-bold mb-2">{exercise.name}</h3>
                      <div className="flex gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-900 text-blue-200 rounded text-xs">
                          {exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)}
                        </span>
                        <span className="px-2 py-1 bg-gray-700 text-gray-200 rounded text-xs">
                          {exercise.level.charAt(0).toUpperCase() + exercise.level.slice(1)}
                        </span>
                      </div>
                      
                      <h4 className="font-medium mb-2">How to perform:</h4>
                      <ol className="list-decimal pl-5 mb-4 space-y-1">
                        {exercise.instructions.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <Info size={16} className="mr-1 text-blue-400" />
                            Tips
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {exercise.tips.map((tip, index) => (
                              <li key={index} className="text-sm">{tip}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 flex items-center">
                            <AlertTriangle size={16} className="mr-1 text-amber-400" />
                            Warnings
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {exercise.warnings.map((warning, index) => (
                              <li key={index} className="text-sm text-amber-300">{warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="recovery" className="mt-0">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recoveryTips.map((tip, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>{tip.title}</CardTitle>
                  <CardDescription>
                    {tip.type === 'warmup' && 'Pre-workout routine'}
                    {tip.type === 'cooldown' && 'Post-workout routine'}
                    {tip.type === 'recovery' && 'Rest day strategy'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{tip.description}</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    {tip.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>Injury Prevention Strategy</CardTitle>
              <CardDescription>Comprehensive approach to prevent training-related injuries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">1. Progressive Overload</h3>
                <p className="text-sm text-gray-400">
                  Increase training intensity gradually (5-10% per week maximum). Avoid sudden jumps in weight, volume, or intensity 
                  that can overwhelm your body's adaptive capabilities.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">2. Proper Form</h3>
                <p className="text-sm text-gray-400">
                  Master technique before adding weight. Consider occasional sessions with a qualified trainer to check form, especially 
                  on compound movements like squats, deadlifts, and presses.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">3. Balanced Training</h3>
                <p className="text-sm text-gray-400">
                  Address all major muscle groups and movement patterns. Pay special attention to antagonistic muscle pairs and 
                  often-neglected areas like rotator cuff, posterior chain, and core stability muscles.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">4. Recovery Protocols</h3>
                <p className="text-sm text-gray-400">
                  Implement deload weeks every 4-8 weeks of training. Follow a structured plan for sleep, nutrition, and active recovery. 
                  Consider techniques like contrast therapy, massage, and compression for enhanced recovery.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">5. Listen to Your Body</h3>
                <p className="text-sm text-gray-400">
                  Distinguish between productive discomfort and potential injury signals. Track niggling pains or persistent discomfort and address them early.
                  Don't hesitate to modify workouts or take extra rest when needed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default WorkoutGuide;
