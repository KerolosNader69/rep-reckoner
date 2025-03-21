import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Apple, Beef, Egg, Fish, Utensils, Coffee, Salad } from 'lucide-react';

interface FoodItem {
  name: string;
  protein: number;
  carbs: number;
  fat: number;
  amount: number;
  unit: string;
}

interface Meal {
  name: string;
  icon: React.ReactNode;
  description: string;
  foods: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface NutritionPlan {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meals: Meal[];
  dietType: string;
}

const NutritionCalculator = () => {
  const { toast } = useToast();
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [gender, setGender] = useState<string>('male');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [dietPreference, setDietPreference] = useState<string>('balanced');
  const [mealCount, setMealCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<NutritionPlan | null>(null);

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
    
    // Calculate macros based on goal and diet preference
    let proteinRatio, fatRatio, carbRatio;
    
    // Initial macros determination based on goal
    if (goal === 'lose') {
      proteinRatio = 0.4; // 40% protein
      fatRatio = 0.35;    // 35% fat
      carbRatio = 0.25;   // 25% carbs
    } else if (goal === 'gain') {
      proteinRatio = 0.3; // 30% protein
      fatRatio = 0.25;    // 25% fat
      carbRatio = 0.45;   // 45% carbs
    } else {
      proteinRatio = 0.3; // 30% protein
      fatRatio = 0.3;     // 30% fat
      carbRatio = 0.4;    // 40% carbs
    }
    
    // Adjust macros based on diet preference
    switch (dietPreference) {
      case 'high-protein':
        proteinRatio += 0.1;
        carbRatio -= 0.1;
        break;
      case 'low-carb':
        carbRatio -= 0.15;
        fatRatio += 0.1;
        proteinRatio += 0.05;
        break;
      case 'keto':
        carbRatio = 0.05; // 5% carbs
        proteinRatio = 0.3; // 30% protein
        fatRatio = 0.65; // 65% fat
        break;
      case 'vegetarian':
        proteinRatio -= 0.05;
        carbRatio += 0.05;
        break;
      default:
        // balanced diet, keep the ratios as they are
        break;
    }
    
    // Calculate actual macro amounts in grams
    const totalProtein = (goalCalories * proteinRatio) / 4; // 4 calories per gram of protein
    const totalFat = (goalCalories * fatRatio) / 9; // 9 calories per gram of fat
    const totalCarbs = (goalCalories * carbRatio) / 4; // 4 calories per gram of carbs
    
    // Generate personalized meal plan
    const meals = generateMealPlan(
      goalCalories, 
      totalProtein, 
      totalCarbs, 
      totalFat, 
      mealCount, 
      dietPreference, 
      goal
    );
    
    setTimeout(() => {
      setResult({
        calories: Math.round(goalCalories),
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fat: Math.round(totalFat),
        meals: meals,
        dietType: getDietType(dietPreference, goal)
      });
      setIsLoading(false);
      
      toast({
        title: "Nutrition Plan Generated",
        description: "Your personalized nutrition plan with detailed meal suggestions is ready!",
      });
    }, 1000);
  };

  const getDietType = (preference: string, goalType: string): string => {
    switch (preference) {
      case 'balanced':
        return `Balanced diet for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
      case 'high-protein':
        return `High protein diet for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
      case 'low-carb':
        return `Low carbohydrate diet for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
      case 'keto':
        return `Ketogenic diet for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
      case 'vegetarian':
        return `Vegetarian diet for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
      default:
        return `Custom diet plan for ${goalType === 'lose' ? 'fat loss' : goalType === 'gain' ? 'muscle gain' : 'maintenance'}`;
    }
  };

  const generateMealPlan = (
    calories: number, 
    protein: number, 
    carbs: number, 
    fat: number, 
    numMeals: number,
    dietType: string, 
    goalType: string
  ): Meal[] => {
    // Meal distribution ratios (what percentage of daily intake each meal represents)
    let mealRatios: number[] = [];
    
    if (numMeals === 3) {
      mealRatios = [0.3, 0.4, 0.3]; // Breakfast 30%, Lunch 40%, Dinner 30%
    } else if (numMeals === 4) {
      mealRatios = [0.25, 0.3, 0.15, 0.3]; // Breakfast 25%, Lunch 30%, Snack 15%, Dinner 30%
    } else if (numMeals === 5) {
      mealRatios = [0.2, 0.1, 0.3, 0.1, 0.3]; // Breakfast 20%, Snack 10%, Lunch 30%, Snack 10%, Dinner 30%
    } else {
      mealRatios = [0.3, 0.4, 0.3]; // Default to 3 meals
    }
    
    // Create sample meal plans based on diet preference and goal
    const meals: Meal[] = [];
    
    // The meal data would depend on dietType and goalType
    if (dietType === 'balanced' || dietType === 'high-protein') {
      if (numMeals >= 3) {
        meals.push(createMeal(
          'Breakfast', 
          <Coffee size={18} />,
          'Start your day with a balanced breakfast', 
          [
            { name: 'Greek yogurt', protein: 15, carbs: 6, fat: 5, amount: 150, unit: 'g' },
            { name: 'Granola', protein: 4, carbs: 30, fat: 6, amount: 40, unit: 'g' },
            { name: 'Berries', protein: 1, carbs: 15, fat: 0, amount: 100, unit: 'g' },
            { name: 'Honey', protein: 0, carbs: 17, fat: 0, amount: 10, unit: 'g' }
          ],
          calories * mealRatios[0],
          protein * mealRatios[0],
          carbs * mealRatios[0],
          fat * mealRatios[0]
        ));
        
        meals.push(createMeal(
          'Lunch', 
          <Utensils size={18} />,
          'Fuel your day with a nutritious lunch', 
          [
            { name: 'Grilled chicken breast', protein: 30, carbs: 0, fat: 4, amount: 120, unit: 'g' },
            { name: 'Brown rice', protein: 5, carbs: 45, fat: 2, amount: 150, unit: 'g' },
            { name: 'Mixed vegetables', protein: 3, carbs: 15, fat: 0, amount: 150, unit: 'g' },
            { name: 'Olive oil', protein: 0, carbs: 0, fat: 14, amount: 15, unit: 'ml' }
          ],
          calories * mealRatios[1],
          protein * mealRatios[1],
          carbs * mealRatios[1],
          fat * mealRatios[1]
        ));
        
        meals.push(createMeal(
          'Dinner', 
          <Beef size={18} />,
          'Complete your day with a satisfying dinner', 
          [
            { name: 'Baked salmon', protein: 25, carbs: 0, fat: 15, amount: 150, unit: 'g' },
            { name: 'Quinoa', protein: 8, carbs: 40, fat: 5, amount: 150, unit: 'g' },
            { name: 'Steamed broccoli', protein: 4, carbs: 10, fat: 0, amount: 150, unit: 'g' },
            { name: 'Avocado', protein: 2, carbs: 12, fat: 15, amount: 50, unit: 'g' }
          ],
          calories * mealRatios[2],
          protein * mealRatios[2],
          carbs * mealRatios[2],
          fat * mealRatios[2]
        ));
      }
      
      if (numMeals >= 4) {
        meals.splice(2, 0, createMeal(
          'Afternoon Snack', 
          <Apple size={18} />,
          'Healthy afternoon boost', 
          [
            { name: 'Protein shake', protein: 25, carbs: 5, fat: 2, amount: 1, unit: 'serving' },
            { name: 'Banana', protein: 1, carbs: 27, fat: 0, amount: 1, unit: 'medium' },
            { name: 'Almond butter', protein: 3, carbs: 3, fat: 9, amount: 15, unit: 'g' }
          ],
          calories * mealRatios[2],
          protein * mealRatios[2],
          carbs * mealRatios[2],
          fat * mealRatios[2]
        ));
      }
      
      if (numMeals >= 5) {
        meals.splice(1, 0, createMeal(
          'Morning Snack', 
          <Egg size={18} />,
          'Mid-morning energy boost', 
          [
            { name: 'Hard-boiled eggs', protein: 12, carbs: 1, fat: 10, amount: 2, unit: 'medium' },
            { name: 'Apple', protein: 0, carbs: 25, fat: 0, amount: 1, unit: 'medium' }
          ],
          calories * mealRatios[1],
          protein * mealRatios[1],
          carbs * mealRatios[1],
          fat * mealRatios[1]
        ));
      }
    } else if (dietType === 'keto' || dietType === 'low-carb') {
      if (numMeals >= 3) {
        meals.push(createMeal(
          'Breakfast', 
          <Coffee size={18} />,
          'High-fat, low-carb breakfast', 
          [
            { name: 'Scrambled eggs', protein: 12, carbs: 1, fat: 10, amount: 2, unit: 'large' },
            { name: 'Avocado', protein: 2, carbs: 12, fat: 15, amount: 1, unit: 'medium' },
            { name: 'Bacon', protein: 12, carbs: 0, fat: 14, amount: 30, unit: 'g' },
            { name: 'Spinach sautéed in butter', protein: 3, carbs: 3, fat: 5, amount: 100, unit: 'g' }
          ],
          calories * mealRatios[0],
          protein * mealRatios[0],
          carbs * mealRatios[0],
          fat * mealRatios[0]
        ));
        
        meals.push(createMeal(
          'Lunch', 
          <Salad size={18} />,
          'Satisfying low-carb lunch', 
          [
            { name: 'Grilled chicken thighs', protein: 25, carbs: 0, fat: 15, amount: 150, unit: 'g' },
            { name: 'Mixed green salad', protein: 2, carbs: 5, fat: 0, amount: 150, unit: 'g' },
            { name: 'Olive oil & vinegar dressing', protein: 0, carbs: 1, fat: 14, amount: 15, unit: 'ml' },
            { name: 'Feta cheese', protein: 6, carbs: 1, fat: 8, amount: 30, unit: 'g' }
          ],
          calories * mealRatios[1],
          protein * mealRatios[1],
          carbs * mealRatios[1],
          fat * mealRatios[1]
        ));
        
        meals.push(createMeal(
          'Dinner', 
          <Fish size={18} />,
          'Nutritious keto-friendly dinner', 
          [
            { name: 'Baked salmon fillet', protein: 25, carbs: 0, fat: 15, amount: 150, unit: 'g' },
            { name: 'Cauliflower rice', protein: 2, carbs: 5, fat: 0, amount: 150, unit: 'g' },
            { name: 'Asparagus sautéed in butter', protein: 4, carbs: 5, fat: 12, amount: 150, unit: 'g' },
            { name: 'MCT or coconut oil', protein: 0, carbs: 0, fat: 14, amount: 10, unit: 'ml' }
          ],
          calories * mealRatios[2],
          protein * mealRatios[2],
          carbs * mealRatios[2],
          fat * mealRatios[2]
        ));
      }
      
      // Add snacks for 4 and 5 meal plans with keto-friendly options
      // ... similar structure as above
    } else if (dietType === 'vegetarian') {
      if (numMeals >= 3) {
        meals.push(createMeal(
          'Breakfast', 
          <Coffee size={18} />,
          'Plant-based breakfast', 
          [
            { name: 'Greek yogurt', protein: 15, carbs: 6, fat: 5, amount: 150, unit: 'g' },
            { name: 'Chia seeds', protein: 4, carbs: 12, fat: 9, amount: 15, unit: 'g' },
            { name: 'Mixed berries', protein: 1, carbs: 15, fat: 0, amount: 100, unit: 'g' },
            { name: 'Almond butter', protein: 3, carbs: 3, fat: 9, amount: 15, unit: 'g' }
          ],
          calories * mealRatios[0],
          protein * mealRatios[0],
          carbs * mealRatios[0],
          fat * mealRatios[0]
        ));
        
        meals.push(createMeal(
          'Lunch', 
          <Salad size={18} />,
          'Protein-rich vegetarian lunch', 
          [
            { name: 'Lentil and vegetable soup', protein: 15, carbs: 30, fat: 3, amount: 300, unit: 'ml' },
            { name: 'Whole grain bread', protein: 5, carbs: 20, fat: 2, amount: 50, unit: 'g' },
            { name: 'Hummus', protein: 8, carbs: 12, fat: 9, amount: 60, unit: 'g' },
            { name: 'Mixed green salad', protein: 2, carbs: 5, fat: 0, amount: 100, unit: 'g' }
          ],
          calories * mealRatios[1],
          protein * mealRatios[1],
          carbs * mealRatios[1],
          fat * mealRatios[1]
        ));
        
        meals.push(createMeal(
          'Dinner', 
          <Utensils size={18} />,
          'Complete vegetarian dinner', 
          [
            { name: 'Tofu stir-fry', protein: 20, carbs: 10, fat: 12, amount: 150, unit: 'g' },
            { name: 'Brown rice', protein: 5, carbs: 45, fat: 2, amount: 150, unit: 'g' },
            { name: 'Mixed vegetables', protein: 3, carbs: 15, fat: 0, amount: 150, unit: 'g' },
            { name: 'Sesame oil', protein: 0, carbs: 0, fat: 14, amount: 10, unit: 'ml' }
          ],
          calories * mealRatios[2],
          protein * mealRatios[2],
          carbs * mealRatios[2],
          fat * mealRatios[2]
        ));
      }
      
      // Add vegetarian snacks for 4 and 5 meal plans
      // ... similar structure as above
    }
    
    return meals;
  };

  const createMeal = (
    name: string, 
    icon: React.ReactNode,
    description: string, 
    foods: FoodItem[], 
    calories: number,
    protein: number,
    carbs: number,
    fat: number
  ): Meal => {
    return {
      name,
      icon,
      description,
      foods,
      totalCalories: Math.round(calories),
      totalProtein: Math.round(protein),
      totalCarbs: Math.round(carbs),
      totalFat: Math.round(fat)
    };
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle>Personal Nutrition Calculator</CardTitle>
          <CardDescription>Calculate your daily caloric needs and get a detailed meal plan</CardDescription>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="space-y-2">
              <Label htmlFor="dietPreference">Diet Type</Label>
              <Select value={dietPreference} onValueChange={setDietPreference}>
                <SelectTrigger className="bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="high-protein">High Protein</SelectItem>
                  <SelectItem value="low-carb">Low Carb</SelectItem>
                  <SelectItem value="keto">Ketogenic</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mealCount">Number of Meals Per Day</Label>
            <Select value={mealCount.toString()} onValueChange={(value) => setMealCount(parseInt(value))}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
                <SelectValue placeholder="Select number of meals" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 Meals</SelectItem>
                <SelectItem value="4">4 Meals (includes 1 snack)</SelectItem>
                <SelectItem value="5">5 Meals (includes 2 snacks)</SelectItem>
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
            {isLoading ? "Calculating..." : "Calculate Personalized Nutrition Plan"}
          </Button>
        </CardFooter>
      </Card>
      
      {result && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle>Your Personalized Nutrition Plan</CardTitle>
            <CardDescription>{result.dietType}</CardDescription>
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
              <h3 className="text-lg font-semibold">Detailed Meal Plan</h3>
              
              <Tabs defaultValue={result.meals[0].name.toLowerCase()} className="w-full">
                <TabsList className="grid" style={{ gridTemplateColumns: `repeat(${result.meals.length}, 1fr)` }}>
                  {result.meals.map((meal, index) => (
                    <TabsTrigger key={index} value={meal.name.toLowerCase()}>
                      <span className="flex items-center gap-2">
                        {meal.icon}
                        <span className="hidden md:inline">{meal.name}</span>
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {result.meals.map((meal, index) => (
                  <TabsContent key={index} value={meal.name.toLowerCase()} className="pt-4">
                    <Card className="bg-gray-700 border-gray-600">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {meal.icon} {meal.name} ({meal.totalCalories} kcal)
                        </CardTitle>
                        <CardDescription>{meal.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-5 gap-2 font-medium text-sm">
                            <div className="col-span-2">Food Item</div>
                            <div className="text-center">Protein</div>
                            <div className="text-center">Carbs</div>
                            <div className="text-center">Fat</div>
                          </div>
                          
                          {meal.foods.map((food, foodIndex) => (
                            <div key={foodIndex} className="grid grid-cols-5 gap-2 py-2 border-b border-gray-600 text-sm">
                              <div className="col-span-2">
                                <p className="font-medium">{food.name}</p>
                                <p className="text-gray-400 text-xs">{food.amount} {food.unit}</p>
                              </div>
                              <div className="text-center">{food.protein}g</div>
                              <div className="text-center">{food.carbs}g</div>
                              <div className="text-center">{food.fat}g</div>
                            </div>
                          ))}
                          
                          <div className="grid grid-cols-5 gap-2 py-2 border-t border-gray-600 font-medium">
                            <div className="col-span-2">Total</div>
                            <div className="text-center">{Math.round(meal.foods.reduce((sum, food) => sum + food.protein, 0))}g</div>
                            <div className="text-center">{Math.round(meal.foods.reduce((sum, food) => sum + food.carbs, 0))}g</div>
                            <div className="text-center">{Math.round(meal.foods.reduce((sum, food) => sum + food.fat, 0))}g</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg space-y-3">
              <h3 className="text-lg font-semibold">Nutrition Tips</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Stay hydrated by drinking at least 8 glasses of water daily</li>
                <li>Focus on whole, unprocessed foods when possible</li>
                <li>Time your protein intake around workouts for optimal recovery</li>
                <li>Adjust portion sizes based on hunger and fullness cues</li>
                <li>This meal plan is a starting point - monitor your progress and adjust as needed</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NutritionCalculator;
