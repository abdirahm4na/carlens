import Link from "next/link";
import { AuthStatus } from "@/components/auth/AuthStatus";
import { CarLensLogo } from "@/components/brand/CarLensLogo";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-10 text-slate-950">
      <section className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <CarLensLogo size="md" />
        <p className="mt-6 text-sm font-semibold uppercase tracking-normal text-blue-600">
          Profile
        </p>
        <h1 className="mt-3 text-3xl font-bold">Abdi</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Manage your CarLens account session.
        </p>
        <div className="mt-6">
          <AuthStatus />
        </div>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
