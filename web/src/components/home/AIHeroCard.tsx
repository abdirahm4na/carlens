import Link from "next/link";

export function AIHeroCard() {
  return (
    <section className="group relative overflow-hidden rounded-[2rem] bg-blue-600 p-6 text-white shadow-[0_24px_60px_rgba(37,99,235,0.28)] ring-1 ring-blue-400/30 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_72px_rgba(37,99,235,0.34)]">
      <div className="absolute right-0 top-0 h-32 w-40 translate-x-8 -translate-y-8 rotate-12 rounded-3xl bg-cyan-300/20 transition duration-500 group-hover:translate-x-6" />
      <div className="absolute bottom-0 right-8 h-20 w-48 translate-y-10 -rotate-6 rounded-3xl bg-blue-950/20" />

      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-normal text-blue-50 ring-1 ring-white/20">
            AI Identification
          </span>
          <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-2xl ring-1 ring-white/20">
            +
          </span>
        </div>

        <h2 className="text-4xl font-semibold tracking-normal">Scan a Car</h2>
        <p className="mt-3 max-w-[17rem] text-sm leading-6 text-blue-50">
          Identify year, make, model, trim clues, and key details from a single photo.
        </p>

        <Link
          href="/scan"
          className="mt-7 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-lg shadow-blue-950/10 transition hover:scale-[1.03] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        >
          Start scan
        </Link>
      </div>
    </section>
  );
}
