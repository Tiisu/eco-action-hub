
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cshtuzuxlwvimdiwdgrs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzaHR1enV4bHd2aW1kaXdkZ3JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTMzMzYsImV4cCI6MjA1NzUyOTMzNn0.CbtHw_upFOLD8Oi0ZgJdf6WiTdslKmqXD026fc3MOUU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
