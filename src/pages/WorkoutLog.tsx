
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Calendar, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { supabase, WorkoutEntry } from "@/lib/supabase";

const formSchema = z.object({
  exercise: z.string().min(1, { message: "Exercise name is required" }),
  sets: z.string().transform(val => Number(val)),
  reps: z.string().transform(val => Number(val)),
  weight: z.string().transform(val => Number(val)),
  weightUnit: z.enum(["kg", "lbs"]),
});

type FormValues = z.infer<typeof formSchema>;

const WorkoutLog = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/login');
        return;
      }
      
      setUser(session.user);
      fetchWorkouts(session.user.id);
    };
    
    checkUser();
  }, [navigate]);

  const fetchWorkouts = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data) {
        setWorkouts(data.map(workout => ({
          ...workout,
          date: new Date(workout.date)
        })));
      }
    } catch (error) {
      console.error('Error fetching workouts:', error);
      toast({
        title: "Error",
        description: "Failed to load your workout data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      exercise: "",
      sets: "3",
      reps: "10",
      weight: "0",
      weightUnit: "kg",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save workouts.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      const newWorkout = {
        user_id: user.id,
        date: new Date().toISOString(),
        exercise: values.exercise,
        sets: Number(values.sets),
        reps: Number(values.reps),
        weight: Number(values.weight),
        weightUnit: values.weightUnit,
      };
      
      const { data, error } = await supabase
        .from('workouts')
        .insert([newWorkout])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        const savedWorkout = {
          ...data[0],
          id: data[0].id,
          date: new Date(data[0].date)
        };
        
        setWorkouts([savedWorkout, ...workouts]);
        setOpen(false);
        form.reset();
        
        toast({
          title: "Workout logged",
          description: "Your workout has been successfully recorded.",
        });
      }
    } catch (error) {
      console.error('Error saving workout:', error);
      toast({
        title: "Error",
        description: "Failed to save your workout.",
        variant: "destructive",
      });
    }
  };

  const deleteWorkout = async (id: number) => {
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setWorkouts(workouts.filter(workout => workout.id !== id));
      toast({
        title: "Workout deleted",
        description: "Your workout entry has been removed.",
      });
    } catch (error) {
      console.error('Error deleting workout:', error);
      toast({
        title: "Error",
        description: "Failed to delete workout.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-16">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-900 z-10">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-blue-400">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Workout Log</h1>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus size={18} className="mr-1" /> Add
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle>Log New Workout</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="exercise"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exercise</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bench Press" className="bg-gray-700" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="sets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sets</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            className="bg-gray-700" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reps</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            className="bg-gray-700" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              step="0.5" 
                              className="bg-gray-700" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="w-20">
                    <FormField
                      control={form.control}
                      name="weightUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup 
                              className="flex space-x-2" 
                              value={field.value} 
                              onValueChange={field.onChange}
                            >
                              <div className="flex items-center">
                                <RadioGroupItem id="kg" value="kg" className="sr-only" />
                                <FormLabel htmlFor="kg" className={`px-2 py-1 rounded ${field.value === 'kg' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                  kg
                                </FormLabel>
                              </div>
                              <div className="flex items-center">
                                <RadioGroupItem id="lbs" value="lbs" className="sr-only" />
                                <FormLabel htmlFor="lbs" className={`px-2 py-1 rounded ${field.value === 'lbs' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                                  lbs
                                </FormLabel>
                              </div>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Save Workout
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </header>
      
      <div className="p-4 pb-16">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <p>Loading your workouts...</p>
          </div>
        ) : workouts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 mb-4">No workouts logged yet</p>
            <Button onClick={() => setOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              Log Your First Workout
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {workouts.map((workout) => (
              <Card key={workout.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{workout.exercise}</h3>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteWorkout(workout.id)}
                        className="text-gray-400 hover:text-red-400 h-8 w-8 p-0"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm flex items-center mb-2">
                    <Calendar size={14} className="mr-1" /> 
                    {workout.date.toLocaleDateString()}
                  </p>
                  <div className="bg-gray-700 p-2 rounded-md grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-400">Sets</p>
                      <p className="font-medium">{workout.sets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Reps</p>
                      <p className="font-medium">{workout.reps}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Weight</p>
                      <p className="font-medium">{workout.weight} {workout.weightUnit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLog;
