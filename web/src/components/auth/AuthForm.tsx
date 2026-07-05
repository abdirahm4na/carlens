"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  loginWithEmailPassword,
  signUpWithEmailPassword,
} from "@/services/auth/auth";

type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirectPath(searchParams.get("redirectTo"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const isLogin = mode === "login";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setMessage(undefined);
    setErrorMessage(undefined);

    try {
      if (isLogin) {
        await loginWithEmailPassword({ email, password });
        router.replace(redirectTo);
        router.refresh();
        return;
      }

      const signUpData = await signUpWithEmailPassword({ email, password });

      if (signUpData.session) {
        router.replace(redirectTo);
        router.refresh();
        return;
      }

      setMessage("Account created. Check your email if confirmation is required, then log in.");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Authentication failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
        {isLogin ? "Welcome back" : "Create account"}
      </p>
      <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
        {isLogin ? "Log in" : "Sign up"}
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {isLogin
          ? "Log in to save scans and build your CarLens history."
          : "Create an account to save vehicle scans and return to them later."}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            className="mt-2 min-h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-medium text-slate-950 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-slate-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            autoComplete={isLogin ? "current-password" : "new-password"}
            className="mt-2 min-h-12 w-full rounded-2xl bg-slate-50 px-4 text-sm font-medium text-slate-950 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="At least 6 characters"
          />
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-12 w-full rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isSubmitting ? "Working..." : isLogin ? "Log in" : "Create account"}
        </button>
      </form>

      {message ? (
        <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
          {message}
        </p>
      ) : null}

      {errorMessage ? (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 ring-1 ring-red-200">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-4 text-sm font-semibold">
        <Link href="/" className="text-slate-500 transition hover:text-slate-900">
          Back home
        </Link>
        <Link
          href={`${isLogin ? "/signup" : "/login"}?redirectTo=${encodeURIComponent(
            redirectTo,
          )}`}
          className="text-blue-600 transition hover:text-blue-700"
        >
          {isLogin ? "Create account" : "Log in instead"}
        </Link>
      </div>
    </section>
  );
}

function getSafeRedirectPath(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  return value;
}
