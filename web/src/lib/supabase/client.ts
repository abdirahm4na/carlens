import { createClient } from "@supabase/supabase-js";

// Browser Supabase client. Only public environment variables are used here; never
// import service-role keys into client-side code.
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public environment variables are not configured.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}
