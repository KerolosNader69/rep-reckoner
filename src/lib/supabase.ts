
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

// Use the Supabase client from the integrations folder
import { supabase as supabaseClient } from '@/integrations/supabase/client';

export const supabase = supabaseClient;

export type WorkoutEntry = {
  id: string;
  user_id: string;
  date: Date;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  weight_unit: string;
  created_at?: string;
};

export type UserProfile = {
  id: string;
  username: string | null;
  email: string | null;
  created_at?: string;
};
