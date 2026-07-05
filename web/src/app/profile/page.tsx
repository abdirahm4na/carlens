import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-10 text-slate-950">
      <section className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
          Profile
        </p>
        <h1 className="mt-3 text-3xl font-bold">Abdi</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Account settings and authentication details will live here when Supabase
          Auth is connected.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back home
        </Link>
      </section>
    </main>
  );
}
