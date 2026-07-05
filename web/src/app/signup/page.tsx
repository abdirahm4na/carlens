import { Suspense } from "react";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-10 text-slate-950">
      <Suspense fallback={null}>
        <AuthForm mode="signup" />
      </Suspense>
    </main>
  );
}
