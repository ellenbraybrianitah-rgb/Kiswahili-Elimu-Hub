import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your credentials
const supabaseUrl = 'https://your-supabase-url.supabase.co';  // Replace with your Supabase URL
const supabaseAnonKey = 'your-anon-key';  // Replace with your Supabase Anon key

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;