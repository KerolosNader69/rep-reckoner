
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface NutritionResult {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  mealPlan?: {
    breakfast: string;
    lunch: string;
    dinner: string;
    snacks: string[];
  };
}

const NutritionCalculator = () => {
  const { toast } = useToast();
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<NutritionResult | null>(null);

  const calculateNutrition = () => {
    setIsLoading(true);
    
    // Basic BMR calculation using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Activity multiplier
    let activityMultiplier: number;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.55;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    let tdee = bmr * activityMultiplier;
    
    // Adjust based on goal
    let goalCalories: number;
    switch (goal) {
      case 'lose':
        goalCalories = tdee - 500; // 500 calorie deficit
        break;
      case 'gain':
        goalCalories = tdee + 500; // 500 calorie surplus
        break;
      default:
        goalCalories = tdee; // maintain
    }
    
    // Calculate macros (simple ratio-based approach)
    let protein: number, carbs: number, fat: number;
    
    if (goal === 'lose') {
      protein = weight * 2.2; // Higher protein for weight loss (g)
      fat = (goalCalories * 0.25) / 9; // 25% of calories from fat (9 cal/g)
      carbs = (goalCalories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs (4 cal/g)
    } else if (goal === 'gain') {
      protein = weight * 1.8; // High protein for muscle gain (g)
      fat = (goalCalories * 0.25) / 9; // 25% of calories from fat
      carbs = (goalCalories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs
    } else {
      protein = weight * 1.6; // Moderate protein for maintenance (g)
      fat = (goalCalories * 0.3) / 9; // 30% of calories from fat
      carbs = (goalCalories - (protein * 4) - (fat * 9)) / 4; // Remaining calories from carbs
    }
    
    // Sample meal plan suggestions
    const mealPlan = {
      breakfast: goal === 'lose' 
        ? "Protein oatmeal with berries" 
        : (goal === 'gain' ? "Protein pancakes with banana and honey" : "Greek yogurt with granola and fruit"),
      lunch: goal === 'lose' 
        ? "Grilled chicken salad with olive oil dressing" 
        : (goal === 'gain' ? "Chicken wrap with avocado and sweet potato fries" : "Turkey sandwich with vegetables"),
      dinner: goal === 'lose' 
        ? "Baked salmon with steamed vegetables" 
        : (goal === 'gain' ? "Steak with roasted potatoes and vegetables" : "Stir-fry with lean protein and mixed vegetables"),
      snacks: goal === 'lose' 
        ? ["Apple with almond butter", "Protein shake"] 
        : (goal === 'gain' ? ["Protein smoothie with banana", "Trail mix", "Protein bar"] : ["Greek yogurt", "Mixed nuts"])
    };
    
    // Set result and finish loading
    setTimeout(() => {
      setResult({
        calories: Math.round(goalCalories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat),
        mealPlan
      });
      setIsLoading(false);
      
      toast({
        title: "Nutrition Plan Generated",
        description: "Your personalized nutrition plan is ready!",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Nutrition Calculator</CardTitle>
          <CardDescription>Calculate your daily caloric needs and macronutrients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input 
                id="age" 
                type="number" 
                value={age} 
                onChange={(e) => setAge(parseInt(e.target.value) || 0)} 
                className="bg-gray-700 border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input 
                id="weight" 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(parseInt(e.target.value) || 0)} 
                className="bg-gray-700 border-gray-600" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input 
                id="height" 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(parseInt(e.target.value) || 0)} 
                className="bg-gray-700 border-gray-600" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <RadioGroup 
                value={gender} 
                onValueChange={setGender}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (intense exercise daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose">Lose Weight</SelectItem>
                <SelectItem value="maintain">Maintain Weight</SelectItem>
                <SelectItem value="gain">Gain Muscle Mass</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={calculateNutrition} 
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Nutrition Plan"}
          </Button>
        </CardFooter>
      </Card>
      
      {result && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Your Nutrition Plan</CardTitle>
            <CardDescription>Based on your goals and body metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <h3 className="text-sm text-gray-400">Daily Calories</h3>
                <p className="text-2xl font-bold">{result.calories}</p>
                <p className="text-xs text-gray-400">kcal</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <h3 className="text-sm text-gray-400">Protein</h3>
                <p className="text-2xl font-bold">{result.protein}</p>
                <p className="text-xs text-gray-400">grams</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <h3 className="text-sm text-gray-400">Carbs</h3>
                <p className="text-2xl font-bold">{result.carbs}</p>
                <p className="text-xs text-gray-400">grams</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <h3 className="text-sm text-gray-400">Fat</h3>
                <p className="text-2xl font-bold">{result.fat}</p>
                <p className="text-xs text-gray-400">grams</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Sample Meal Plan</h3>
              <div className="space-y-2">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-400">Breakfast</h4>
                  <p>{result.mealPlan?.breakfast}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-400">Lunch</h4>
                  <p>{result.mealPlan?.lunch}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-400">Dinner</h4>
                  <p>{result.mealPlan?.dinner}</p>
                </div>
                <div className="bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-400">Snacks</h4>
                  <ul className="list-disc pl-5">
                    {result.mealPlan?.snacks.map((snack, index) => (
                      <li key={index}>{snack}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NutritionCalculator;
