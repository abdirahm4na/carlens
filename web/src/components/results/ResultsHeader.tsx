import Link from "next/link";

export function ResultsHeader() {
  return (
    <header className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
          Identification Results
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
          Vehicle Details
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Review the detected vehicle profile before saving or asking AI for a deeper
          breakdown.
        </p>
      </div>

      <Link
        href="/scan"
        className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back
      </Link>
    </header>
  );
}
