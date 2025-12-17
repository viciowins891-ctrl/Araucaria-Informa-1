import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SupabaseUrl;
const supabaseKey = import.meta.env.VITE_SupabaseKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
