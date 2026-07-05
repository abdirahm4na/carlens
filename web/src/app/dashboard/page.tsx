import Link from "next/link";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import { RecentScansSection, type RecentScan } from "@/components/home/RecentScansSection";

const recentScans: RecentScan[] = [
  {
    id: "porsche-911",
    name: "2024 Porsche 911 GT3",
    scannedAt: "2h ago",
    confidence: "98%",
    imageUrl: automotivePhotos.hero,
  },
  {
    id: "bmw-m4",
    name: "2021 BMW M4 Competition",
    scannedAt: "Yesterday",
    confidence: "96%",
    imageUrl: automotivePhotos.coupe,
  },
];

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

        <section className="motion-fade-up mt-16 grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-stretch [animation-delay:90ms]">
          <Link
            href="/scan"
            className="group relative overflow-hidden rounded-[2.5rem] bg-slate-950 p-7 text-white ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:shadow-[0_40px_120px_rgba(0,0,0,0.5)] sm:p-10"
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
              <span className="inline-flex w-fit rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_40px_rgba(37,99,235,0.24)]">
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

          <aside className="grid content-start gap-3 rounded-[2rem] bg-white/90 p-4 ring-1 ring-slate-200/80 backdrop-blur">
            <ToolIconLink href="/vin" label="VIN Decoder" icon="V" />
            <ToolIconLink href="/negotiator" label="Negotiator" icon="$" />
            <ToolIconLink href="/chat" label="AI Chat" icon="?" />
            <ToolIconLink href="/history" label="Garage" icon="G" />
            <Link
              href="/tools"
              className="mt-2 flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-blue-600 ring-1 ring-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-50"
              aria-label="Open all tools"
            >
              All tools
            </Link>
          </aside>
        </section>

        <section className="motion-fade-up mt-20 [animation-delay:170ms]">
          <RecentScansSection scans={recentScans} />
        </section>
      </div>
    </main>
  );
}

function ToolIconLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-slate-300 ring-1 ring-slate-200/80 transition hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
      aria-label={label}
      title={label}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs transition group-hover:scale-110">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}
