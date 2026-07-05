import Link from "next/link";
import { CarLensLogo } from "@/components/brand/CarLensLogo";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import {
  VehicleSummaryCard,
  type VehicleSummary,
} from "@/components/results/VehicleSummaryCard";

const features = [
  {
    title: "Scanner",
    description: "Upload vehicle photos and get a structured inspection report.",
  },
  {
    title: "VIN",
    description: "Decode factory details before you compare a listing.",
  },
  {
    title: "Negotiator",
    description: "Turn seller screenshots into questions and an offer range.",
  },
  {
    title: "AI Chat",
    description: "Ask follow-up questions about value, reliability, and risk.",
  },
];

const steps = ["Upload photos", "Review the report", "Ask follow-ups"];

const previewVehicle: VehicleSummary = {
  make: "Porsche",
  model: "911",
  trim: "GT3",
  generation: "992.1",
  year: "2024",
  confidence: 98,
  reliability: 84,
  engine: "4.0L naturally aspirated flat-six",
  horsepower: "502 hp",
  drivetrain: "Rear-wheel drive",
  transmission: "6-speed manual or 7-speed PDK",
  estimated_market_value: "$165,000 - $220,000",
  visible_modifications: [],
  exterior_color: "Shark Blue",
  common_issues: ["Track use can accelerate brake and tire wear"],
  summary:
    "A clean, structured first pass before you spend time or money on the wrong car.",
};

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <LandingNavigation />
      <HeroSection />
      <FeatureSection />
      <ProcessSection />
      <PreviewSection />
      <Footer />
    </main>
  );
}

function LandingNavigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/72 px-5 backdrop-blur-2xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black">
          <CarLensLogo size="sm" />
        </Link>

        <div className="flex items-center gap-2 text-sm font-semibold text-slate-400">
          <Link
            href="/dashboard"
            className="hidden transition hover:text-white sm:inline-flex"
          >
            Dashboard
          </Link>
          <Link
            href="/scan"
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 hover:bg-blue-500"
          >
            Start scan
          </Link>
          <Link
            href="/negotiator"
            className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/[0.1]"
          >
            Try negotiator
          </Link>
        </div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative px-5 pb-28 pt-24 sm:pt-36">
      <div className="absolute left-1/2 top-24 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[150px]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold text-slate-500">AI vehicle intelligence</p>
          <h1 className="mt-8 text-5xl font-semibold tracking-normal text-white sm:text-6xl lg:text-7xl">
            Know the car before you buy it.
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-slate-400">
            Know the value, reliability, modifications, and hidden risks before
            you buy.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/scan"
              className="rounded-full bg-blue-600 px-7 py-4 text-sm font-bold text-white shadow-[0_22px_60px_rgba(37,99,235,0.34)] transition hover:-translate-y-1 hover:bg-blue-500"
            >
              Start scan
            </Link>
            <Link
              href="/negotiator"
              className="rounded-full border border-white/10 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/[0.1]"
            >
              Try negotiator
            </Link>
          </div>
        </div>

        <ProductMockup />
      </div>
    </section>
  );
}

function ProductMockup() {
  return (
    <div className="relative mx-auto mt-28 max-w-6xl">
      <div className="absolute inset-x-20 -top-10 h-28 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B0D12]/82 p-3 shadow-[0_44px_140px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="size-3 rounded-full bg-red-400/70" />
          <span className="size-3 rounded-full bg-yellow-300/70" />
          <span className="size-3 rounded-full bg-emerald-400/70" />
          <span className="ml-4 rounded-full bg-white/[0.06] px-4 py-1 text-xs font-semibold text-slate-500">
            carlens.ai/report
          </span>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div
            className="relative min-h-[24rem] overflow-hidden rounded-[1.5rem] bg-slate-950"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.72)), url(${automotivePhotos.hero})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="absolute left-5 top-5 z-10 grid gap-2">
              {["Uploading photos", "Detecting vehicle", "Building inspection report"].map(
                (label, index) => (
                  <span
                    key={label}
                    className="rounded-full bg-black/28 px-3 py-1.5 text-xs font-bold text-white/90 ring-1 ring-white/15 backdrop-blur-md animate-pulse"
                    style={{ animationDelay: `${index * 220}ms` }}
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-7 pt-32">
              <p className="text-xs font-bold uppercase text-blue-100">Inspection</p>
              <h2 className="mt-2 text-3xl font-semibold">2024 Porsche 911 GT3</h2>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["Confidence", "98%"],
              ["Market", "$165k - $220k"],
              ["Reliability", "84"],
              ["Recommendation", "Inspect"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/10 bg-white/[0.055] p-5"
              >
                <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureSection() {
  return (
    <section id="features" className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Features"
          title="Four tools. One clearer decision."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="min-h-56 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.065]"
            >
              <p className="text-sm font-bold text-blue-300">{feature.title}</p>
              <p className="mt-16 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="how-it-works" className="px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <SectionHeader
              eyebrow="How it works"
              title="A quieter way to inspect listings."
              align="left"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step} className="rounded-3xl bg-black/25 p-5 ring-1 ring-white/10">
                  <p className="text-sm font-bold text-blue-300">0{index + 1}</p>
                  <p className="mt-8 text-lg font-semibold text-white">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewSection() {
  return (
    <section className="px-5 py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <SectionHeader
          eyebrow="Report"
          title="The inspection is structured, not noisy."
          align="left"
        />
        <div className="relative max-h-[44rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-3 shadow-[0_34px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <VehicleSummaryCard vehicle={previewVehicle} photoCount={3} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 sm:flex-row">
        <CarLensLogo variant="wordmark" size="sm" />
        <div className="flex gap-5">
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/login" className="transition hover:text-white">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-xl"}>
      <p className="text-sm font-bold uppercase tracking-normal text-blue-400">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
        {title}
      </h2>
    </div>
  );
}
