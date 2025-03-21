
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase, WorkoutEntry } from "@/lib/supabase";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subDays, isWithinInterval, startOfMonth, endOfMonth } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

const ProgressTracking = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [exercises, setExercises] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWorkoutData = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please log in to view your progress",
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: true });

        if (error) {
          throw error;
        }

        if (data) {
          // Parse dates for consistency
          const parsedData = data.map(item => ({
            ...item,
            date: new Date(item.date)
          })) as WorkoutEntry[];
          
          setWorkoutData(parsedData);
          
          // Extract unique exercises
          const uniqueExercises = Array.from(new Set(parsedData.map(item => item.exercise)));
          setExercises(uniqueExercises);
          
          // Set default selected exercise if none is selected yet
          if (!selectedExercise && uniqueExercises.length > 0) {
            setSelectedExercise(uniqueExercises[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching workout data:", error);
        toast({
          title: "Error",
          description: "Failed to load workout data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkoutData();
  }, [toast, selectedExercise]);

  // Filter data based on selected time range
  const getFilteredData = () => {
    if (!workoutData.length || !selectedExercise) return [];

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case 'week':
        startDate = subDays(now, 7);
        break;
      case 'year':
        startDate = subDays(now, 365);
        break;
      case 'month':
      default:
        startDate = subDays(now, 30);
    }

    return workoutData
      .filter(entry => 
        entry.exercise === selectedExercise && 
        isWithinInterval(new Date(entry.date), { start: startDate, end: now })
      )
      .map(entry => ({
        date: format(new Date(entry.date), 'MMM dd'),
        weight: entry.weight,
        reps: entry.reps,
        volume: entry.weight * entry.reps * entry.sets,
      }));
  };

  // Calculate statistics
  const getStatistics = () => {
    if (!workoutData.length || !selectedExercise) return { max: 0, avg: 0, volume: 0, sessions: 0 };

    const filteredData = workoutData.filter(entry => entry.exercise === selectedExercise);
    
    if (!filteredData.length) return { max: 0, avg: 0, volume: 0, sessions: 0 };
    
    const weights = filteredData.map(entry => entry.weight);
    const maxWeight = Math.max(...weights);
    const avgWeight = weights.reduce((sum, weight) => sum + weight, 0) / weights.length;
    
    const totalVolume = filteredData.reduce((sum, entry) => sum + (entry.weight * entry.reps * entry.sets), 0);
    
    return {
      max: maxWeight,
      avg: avgWeight,
      volume: totalVolume,
      sessions: filteredData.length,
    };
  };

  // Calculate monthly progress
  const getMonthlyProgress = () => {
    if (!workoutData.length || !selectedExercise) return 0;
    
    const now = new Date();
    const currentMonthData = workoutData.filter(entry => 
      entry.exercise === selectedExercise && 
      isWithinInterval(new Date(entry.date), { 
        start: startOfMonth(now), 
        end: endOfMonth(now) 
      })
    );
    
    if (!currentMonthData.length) return 0;
    
    const initialWeight = currentMonthData[0].weight;
    const latestWeight = currentMonthData[currentMonthData.length - 1].weight;
    
    return latestWeight > initialWeight 
      ? ((latestWeight - initialWeight) / initialWeight) * 100 
      : 0;
  };

  const chartData = getFilteredData();
  const stats = getStatistics();
  const monthlyProgress = getMonthlyProgress();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Progress Tracking</h1>
      </header>

      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : workoutData.length === 0 ? (
          <div className="text-center p-10 bg-gray-800 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">No workout data available</h2>
            <p className="text-gray-400 mb-4">Start logging your workouts to see your progress here!</p>
            <Link to="/workout-log" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Go to Workout Log
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Exercise Selection</h2>
                <Select value={selectedExercise || ""} onValueChange={setSelectedExercise}>
                  <SelectTrigger className="bg-gray-700">
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises.map((exercise) => (
                      <SelectItem key={exercise} value={exercise}>
                        {exercise}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Time Range</h2>
                <Select value={timeRange} onValueChange={(value: 'week' | 'month' | 'year') => setTimeRange(value)}>
                  <SelectTrigger className="bg-gray-700">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Past Week</SelectItem>
                    <SelectItem value="month">Past Month</SelectItem>
                    <SelectItem value="year">Past Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Max Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.max} {workoutData[0]?.weight_unit || 'kg'}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Average Weight</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.avg.toFixed(1)} {workoutData[0]?.weight_unit || 'kg'}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.volume.toFixed(0)} {workoutData[0]?.weight_unit || 'kg'}</div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Workout Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.sessions}</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Progress for {selectedExercise} this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Strength Improvement</span>
                    <span>{monthlyProgress.toFixed(1)}%</span>
                  </div>
                  <Progress value={Math.min(monthlyProgress, 100)} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="weight">Weight Progress</TabsTrigger>
                <TabsTrigger value="reps">Reps Progress</TabsTrigger>
                <TabsTrigger value="volume">Volume Progress</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weight" className="mt-0">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Weight Progression</CardTitle>
                    <CardDescription>
                      {selectedExercise ? `${selectedExercise} weight over time` : 'Select an exercise'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                          <Legend />
                          <Line type="monotone" dataKey="weight" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reps" className="mt-0">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Reps Progression</CardTitle>
                    <CardDescription>
                      {selectedExercise ? `${selectedExercise} reps over time` : 'Select an exercise'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                          <Legend />
                          <Line type="monotone" dataKey="reps" stroke="#10b981" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="volume" className="mt-0">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle>Volume Progression</CardTitle>
                    <CardDescription>
                      {selectedExercise ? `${selectedExercise} total volume over time` : 'Select an exercise'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                          <XAxis dataKey="date" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip contentStyle={{ backgroundColor: '#333', borderColor: '#555' }} />
                          <Legend />
                          <Line type="monotone" dataKey="volume" stroke="#f97316" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProgressTracking;
