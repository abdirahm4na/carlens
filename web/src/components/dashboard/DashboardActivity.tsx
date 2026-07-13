"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import {
  HistoryAuthRequiredError,
  HistorySetupRequiredError,
  listSavedScans,
  type SavedScan,
} from "@/services/scans/history";

type DashboardStatus = "loading" | "ready" | "empty" | "setup" | "auth" | "error";

type DashboardScan = {
  id: string;
  name: string;
  scannedAt: string;
  confidence: string;
  imageUrl: string;
  href: string;
};

const demoScans: DashboardScan[] = [
  {
    id: "demo-porsche-911",
    name: "2024 Porsche 911 GT3",
    scannedAt: "Demo report",
    confidence: "98%",
    imageUrl: automotivePhotos.hero,
    href: "/history",
  },
  {
    id: "demo-bmw-m4",
    name: "2021 BMW M4 Competition",
    scannedAt: "Demo report",
    confidence: "96%",
    imageUrl: automotivePhotos.coupe,
    href: "/history",
  },
  {
    id: "demo-corvette",
    name: "2023 Chevrolet Corvette",
    scannedAt: "Demo report",
    confidence: "94%",
    imageUrl: automotivePhotos.performance,
    href: "/history",
  },
];

export function DashboardActivity() {
  const [status, setStatus] = useState<DashboardStatus>("loading");
  const [scans, setScans] = useState<SavedScan[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardScans() {
      try {
        const savedScans = await listSavedScans();

        if (!isMounted) {
          return;
        }

        setScans(savedScans);
        setStatus(savedScans.length > 0 ? "ready" : "empty");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof HistorySetupRequiredError) {
          setStatus("setup");
          setErrorMessage(error.message);
          return;
        }

        if (error instanceof HistoryAuthRequiredError) {
          setStatus("auth");
          return;
        }

        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load recent reports.",
        );
      }
    }

    void loadDashboardScans();

    return () => {
      isMounted = false;
    };
  }, []);

  const realReports = useMemo(() => scans.map(toDashboardScan), [scans]);
  const shouldUseDemo =
    ["empty", "setup", "auth"].includes(status) && process.env.NODE_ENV !== "production";
  const reports = status === "ready" ? realReports.slice(0, 3) : shouldUseDemo ? demoScans : [];
  const latestReport = reports[0];

  return (
    <>
      <DashboardSideModule
        status={status}
        latestReport={latestReport}
        reportCount={status === "ready" ? scans.length : undefined}
        vehicleCount={status === "ready" ? countVehicles(scans) : undefined}
        lastInspectionDate={status === "ready" ? formatDate(scans[0]?.created_at) : undefined}
        errorMessage={errorMessage}
        isDemo={shouldUseDemo}
      />

      <section className="motion-fade-up mt-20 lg:col-span-2 [animation-delay:170ms]">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-400">Recent Reports</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-normal text-white">
              Latest activity
            </h2>
          </div>
          <Link
            href="/history"
            className="rounded-full px-4 py-2 text-sm font-bold text-slate-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View all
          </Link>
        </div>

        {status === "loading" ? (
          <RecentReportsSkeleton />
        ) : reports.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-3">
            {reports.map((report) => (
              <RecentReportCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <EmptyRecentReports status={status} errorMessage={errorMessage} />
        )}
      </section>
    </>
  );
}

function DashboardSideModule({
  status,
  latestReport,
  reportCount,
  vehicleCount,
  lastInspectionDate,
  errorMessage,
  isDemo,
}: {
  status: DashboardStatus;
  latestReport?: DashboardScan;
  reportCount?: number;
  vehicleCount?: number;
  lastInspectionDate?: string;
  errorMessage?: string;
  isDemo: boolean;
}) {
  if (status === "loading") {
    return <SideModuleSkeleton />;
  }

  if (latestReport) {
    return (
      <aside className="rounded-[2rem] bg-white/[0.04] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.22)] ring-1 ring-white/10">
        <p className="text-sm font-semibold text-blue-400">
          {isDemo ? "Garage preview" : "Continue last inspection"}
        </p>
        <Link
          href={latestReport.href}
          className="group mt-4 block overflow-hidden rounded-[1.5rem] bg-slate-950 ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={latestReport.imageUrl}
              alt={latestReport.name}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
              {latestReport.confidence}
            </span>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold leading-6 text-white">
              {latestReport.name}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-500">
              {latestReport.scannedAt}
            </p>
            <p className="mt-5 text-sm font-bold text-blue-400">
              {isDemo ? "Open garage" : "View report"}
            </p>
          </div>
        </Link>

        {!isDemo ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            <MiniStat label="Reports" value={String(reportCount ?? 0)} />
            <MiniStat label="Vehicles" value={String(vehicleCount ?? 0)} />
            <MiniStat label="Last" value={lastInspectionDate ?? "None"} />
          </div>
        ) : null}
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] bg-white/[0.04] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.18)] ring-1 ring-white/10">
      <p className="text-sm font-semibold text-blue-400">Garage</p>
      <h2 className="mt-3 text-2xl font-semibold text-white">
        {status === "setup" ? "Setup needed" : "No reports yet"}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        {getSideModuleBody(status, errorMessage)}
      </p>
      <Link
        href={status === "auth" ? "/login?redirectTo=/dashboard" : "/history"}
        className="mt-6 inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {status === "auth" ? "Sign in" : "Open garage"}
      </Link>
    </aside>
  );
}

function RecentReportCard({ report }: { report: DashboardScan }) {
  return (
    <Link
      href={report.href}
      className="group overflow-hidden rounded-[2rem] bg-white/[0.04] ring-1 ring-white/10 transition duration-500 hover:-translate-y-1 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <Image
          src={report.imageUrl}
          alt={report.name}
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 380px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-base font-semibold leading-6 text-white">
          {report.name}
        </h3>
        <div className="mt-4 flex items-center justify-between gap-2 text-sm">
          <span className="font-medium text-slate-500">{report.scannedAt}</span>
          <span className="rounded-full bg-blue-600/15 px-3 py-1 text-xs font-bold text-blue-300 ring-1 ring-blue-500/20">
            {report.confidence}
          </span>
        </div>
      </div>
    </Link>
  );
}

function EmptyRecentReports({
  status,
  errorMessage,
}: {
  status: DashboardStatus;
  errorMessage?: string;
}) {
  return (
    <div className="rounded-[2rem] bg-white/[0.04] p-6 ring-1 ring-white/10">
      <h3 className="text-lg font-semibold text-white">
        {status === "setup" ? "Garage unavailable" : "No recent reports"}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">
        {status === "setup"
          ? errorMessage ?? "Supabase is not configured yet."
          : "Saved inspections will appear here."}
      </p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function SideModuleSkeleton() {
  return (
    <aside className="rounded-[2rem] bg-white/[0.04] p-4 ring-1 ring-white/10">
      <div className="h-4 w-32 rounded-full bg-white/10" />
      <div className="mt-4 aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white/5">
        <div className="h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.4s_infinite]" />
      </div>
      <div className="mt-4 h-5 w-3/4 rounded-full bg-white/10" />
      <div className="mt-3 h-4 w-1/2 rounded-full bg-white/5" />
    </aside>
  );
}

function RecentReportsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[2rem] bg-white/[0.04] ring-1 ring-white/10"
        >
          <div className="h-48 overflow-hidden bg-white/5">
            <div className="h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.4s_infinite]" />
          </div>
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 rounded-full bg-white/10" />
            <div className="h-4 w-1/2 rounded-full bg-white/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function toDashboardScan(scan: SavedScan): DashboardScan {
  const vehicle = scan.vehicle_analysis;
  const name = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

  return {
    id: scan.id,
    name: name || "Saved vehicle",
    scannedAt: formatDate(scan.created_at),
    confidence: `${vehicle.confidence}%`,
    imageUrl: scan.thumbnail ?? scan.image_url,
    href: `/history/${scan.id}`,
  };
}

function countVehicles(scans: SavedScan[]) {
  const vehicles = new Set(
    scans.map((scan) =>
      [scan.vehicle_analysis.year, scan.vehicle_analysis.make, scan.vehicle_analysis.model]
        .filter(Boolean)
        .join(" "),
    ),
  );

  return vehicles.size;
}

function getSideModuleBody(status: DashboardStatus, errorMessage?: string) {
  if (status === "setup") {
    return errorMessage ?? "Supabase is not configured yet. The dashboard can still be used locally.";
  }

  if (status === "auth") {
    return "Sign in to see saved inspections and continue from your garage.";
  }

  if (status === "error") {
    return errorMessage ?? "Recent reports could not be loaded.";
  }

  return "Start an inspection, then save the report to build your garage.";
}

function formatDate(value?: string) {
  if (!value) {
    return "None";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
