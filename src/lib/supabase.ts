
import { createClient } from '@supabase/supabase-js';

// Default values for development (these will be replaced by environment variables in production)
const defaultSupabaseUrl = 'https://your-supabase-project.supabase.co';
const defaultSupabaseKey = 'your-anon-key';

// Use environment variables if available, otherwise use defaults (to prevent errors during development)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseKey;

// Display a warning if using default values
if (supabaseUrl === defaultSupabaseUrl || supabaseAnonKey === defaultSupabaseKey) {
  console.warn('Using default Supabase credentials. For production, set up your Supabase project and add the keys to your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WorkoutEntry = {
  id: number;
  user_id: string;
  date: Date;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  weightUnit: "kg" | "lbs";
  created_at?: string;
};

export type UserProfile = {
  id: string;
  username: string;
  email: string;
  created_at?: string;
};
