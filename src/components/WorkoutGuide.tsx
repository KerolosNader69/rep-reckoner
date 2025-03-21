
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Info } from 'lucide-react';

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
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Recovery & Injury Prevention</h2>
      
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
  );
};

export default WorkoutGuide;
