import Link from "next/link";

export function ResultsActions() {
  return (
    <section className="grid gap-3 pb-8 sm:grid-cols-2">
      <Link
        href="/chat"
        className="rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Ask AI
      </Link>
      <button
        type="button"
        className="rounded-full bg-white px-6 py-4 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Save Scan
      </button>
    </section>
  );
}
