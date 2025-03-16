
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or Anonymous Key. Make sure to set up your Supabase project and add the keys to your environment variables.');
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
