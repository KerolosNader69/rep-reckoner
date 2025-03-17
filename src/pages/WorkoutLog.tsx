
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkoutEntry, supabase, formatDateForSupabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const WorkoutLog = () => {
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState<Omit<WorkoutEntry, 'id' | 'created_at'>>({
    user_id: '',
    date: new Date(),
    exercise: '',
    sets: 0,
    reps: 0,
    weight: 0,
    weight_unit: 'kg',
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          toast({
            title: "Not authenticated",
            description: "Please sign in to view your workout log.",
            variant: "destructive",
          });
          return;
        }

        const userId = user.id;
        setNewWorkout(prev => ({ ...prev, user_id: userId }));

        const { data, error } = await supabase
          .from('workouts')
          .select('*')
          .eq('user_id', userId)
          .order('date', { ascending: false });

        if (error) {
          console.error("Error fetching workouts:", error);
          toast({
            title: "Error fetching workouts",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        if (data) {
          // Parse dates before setting the state
          const parsedWorkouts = data.map(entry => ({
            ...entry,
            date: new Date(entry.date),
          })) as WorkoutEntry[];
          
          setWorkoutEntries(parsedWorkouts);
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        toast({
          title: "Unexpected error",
          description: "Failed to load workout entries.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, [toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setNewWorkout(prev => ({ ...prev, date: date || new Date() }));
  };

  const handleAddWorkout = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to add a workout.",
          variant: "destructive",
        });
        return;
      }

      const userId = user.id;
      const workoutToAdd = {
        ...newWorkout,
        user_id: userId,
        date: formatDateForSupabase(newWorkout.date),
        sets: Number(newWorkout.sets),
        reps: Number(newWorkout.reps),
        weight: Number(newWorkout.weight),
      };

      const { data, error } = await supabase
        .from('workouts')
        .insert([workoutToAdd])
        .select();

      if (error) {
        console.error("Error adding workout:", error);
        toast({
          title: "Error adding workout",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data && data.length > 0) {
        // Convert string date to Date object before adding to state
        const addedWorkout = {
          ...data[0],
          date: new Date(data[0].date)
        } as WorkoutEntry;
        
        setWorkoutEntries(prev => [addedWorkout, ...prev]);
        setNewWorkout({
          user_id: userId,
          date: new Date(),
          exercise: '',
          sets: 0,
          reps: 0,
          weight: 0,
          weight_unit: 'kg',
        });
        setIsAddingWorkout(false);
        toast({
          title: "Workout added",
          description: "Your workout has been successfully added.",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Unexpected error",
        description: "Failed to add workout entry.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteWorkout = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting workout:", error);
        toast({
          title: "Error deleting workout",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      setWorkoutEntries(prev => prev.filter(entry => entry.id !== id));
      toast({
        title: "Workout deleted",
        description: "Your workout has been successfully deleted.",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        title: "Unexpected error",
        description: "Failed to delete workout entry.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="p-4 flex items-center gap-2 sticky top-0 bg-gray-900 z-10">
        <Link to="/" className="text-blue-400">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Workout Log</h1>
      </header>

      <main className="flex-1 p-4">
        <div className="mb-4">
          <Button onClick={() => setIsAddingWorkout(true)} className="bg-green-600 hover:bg-green-700">
            <Plus size={18} className="mr-2" /> Add Workout
          </Button>
        </div>

        {isAddingWorkout && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <h2 className="text-xl font-semibold mb-4">Add New Workout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="exercise">Exercise</Label>
                <Input
                  type="text"
                  id="exercise"
                  name="exercise"
                  value={newWorkout.exercise}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="sets">Sets</Label>
                <Input
                  type="number"
                  id="sets"
                  name="sets"
                  value={newWorkout.sets}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="reps">Reps</Label>
                <Input
                  type="number"
                  id="reps"
                  name="reps"
                  value={newWorkout.reps}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight</Label>
                <Input
                  type="number"
                  id="weight"
                  name="weight"
                  value={newWorkout.weight}
                  onChange={handleInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="weight_unit">Weight Unit</Label>
                <Select onValueChange={(value) => handleInputChange({ target: { name: 'weight_unit', value } } as any)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 text-white">
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddingWorkout(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddWorkout} className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add"}
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-md border">
          <ScrollArea>
            <Table>
              <TableCaption>Your recent workouts.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Date</TableHead>
                  <TableHead>Exercise</TableHead>
                  <TableHead>Sets</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workoutEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{format(entry.date, "PPP")}</TableCell>
                    <TableCell>{entry.exercise}</TableCell>
                    <TableCell>{entry.sets}</TableCell>
                    <TableCell>{entry.reps}</TableCell>
                    <TableCell>{entry.weight} {entry.weight_unit}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <Edit className="mr-2 h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteWorkout(entry.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
};

export default WorkoutLog;
