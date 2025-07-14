
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oyhrbhfhqhuxsjoqdvrv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95aHJiaGZocWh1eHNqb3FkdnJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjY2NDksImV4cCI6MjA2NTk0MjY0OX0.G30se7hbD_cnmzrf23DN9K48-prtZ5ERt5LLM00aO4M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
