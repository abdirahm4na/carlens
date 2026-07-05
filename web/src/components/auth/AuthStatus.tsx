"use client";

import Link from "next/link";
import { type User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { logout } from "@/services/auth/auth";

export function AuthStatus() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    let isMounted = true;

    async function loadUser() {
      const {
        data: { user: currentUser },
        error,
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (error) {
        setErrorMessage(error.message);
      }

      setUser(currentUser);
      setIsLoading(false);
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    setErrorMessage(undefined);

    try {
      await logout();
      setUser(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Logout failed.");
    }
  }

  if (isLoading) {
    return (
      <section className="rounded-3xl bg-white p-4 text-sm font-bold text-slate-500 shadow-sm ring-1 ring-slate-200">
        Checking account...
      </section>
    );
  }

  return (
    <section className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      {user ? (
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
              Signed in
            </p>
            <p className="mt-1 truncate text-sm font-bold text-slate-950">
              {user.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
              Guest mode
            </p>
            <p className="mt-1 text-sm font-bold text-slate-950">
              Log in to save scans.
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Link
              href="/login"
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-white px-4 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-200 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}

      {errorMessage ? (
        <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 ring-1 ring-red-200">
          {errorMessage}
        </p>
      ) : null}
    </section>
  );
}
