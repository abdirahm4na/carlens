import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type EmailPasswordInput = {
  email: string;
  password: string;
};

export async function loginWithEmailPassword({ email, password }: EmailPasswordInput) {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function signUpWithEmailPassword({ email, password }: EmailPasswordInput) {
  const supabase = createBrowserSupabaseClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const supabase = createBrowserSupabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
