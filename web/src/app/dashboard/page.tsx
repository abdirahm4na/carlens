import Link from "next/link";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import { DashboardActivity } from "@/components/dashboard/DashboardActivity";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-6xl flex-col">
        <header className="motion-fade-up flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">Good afternoon, Abdi</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-semibold tracking-normal text-slate-950 sm:text-6xl">
              Know the car before you buy it.
            </h1>
          </div>
        </header>

        <section className="motion-fade-up mt-20 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-stretch [animation-delay:90ms]">
          <Link
            href="/scan"
            aria-label="Start a vehicle inspection"
            className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-7 text-white ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:ring-white/20 hover:shadow-[0_40px_120px_rgba(0,0,0,0.5)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#05070A] sm:p-10"
          >
            <div
              className="image-zoom absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.82), rgba(0,0,0,0.34), rgba(0,0,0,0.08)), url(${automotivePhotos.hero})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <div className="relative flex min-h-[30rem] flex-col justify-between">
              <span className="inline-flex w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)] transition group-hover:bg-blue-500">
                Start inspection
              </span>
              <div>
                <h2 className="text-5xl font-semibold tracking-normal text-white sm:text-6xl">
                  Scan vehicle
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                  AI inspection from photos.
                </p>
              </div>
            </div>
          </Link>

          <DashboardActivity />
        </section>
      </div>
    </main>
  );
}
