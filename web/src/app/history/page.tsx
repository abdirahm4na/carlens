import Link from "next/link";
import { HistoryList } from "@/components/history/HistoryList";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
              Garage
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
              Saved vehicles
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Review past inspections.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Home
          </Link>
        </header>

        <div className="mt-8">
          <HistoryList />
        </div>
      </div>
    </main>
  );
}
