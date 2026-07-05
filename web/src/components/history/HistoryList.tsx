"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HistoryAuthRequiredError,
  listSavedScans,
  type SavedScan,
} from "@/services/scans/history";

export function HistoryList() {
  const router = useRouter();
  const [scans, setScans] = useState<SavedScan[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">(
    "loading",
  );
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    let isMounted = true;

    async function loadScans() {
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

        if (error instanceof HistoryAuthRequiredError) {
          router.replace("/login?redirectTo=/history");
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load scan history.",
        );
        setStatus("error");
      }
    }

    void loadScans();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (status === "loading") {
    return <StatePanel title="Loading scans" body="Fetching your saved vehicle history." />;
  }

  if (status === "error") {
    return (
      <StatePanel
        title="Could not load history"
        body={errorMessage ?? "Something went wrong while loading your scans."}
      />
    );
  }

  if (status === "empty") {
    return (
      <StatePanel
        title="No saved scans yet"
        body="Analyze a vehicle and press Save Scan to build your history."
      />
    );
  }

  return (
    <div className="space-y-4">
      {scans.map((scan) => (
        <Link
          key={scan.id}
          href={`/history/${scan.id}`}
          className="grid gap-4 rounded-[2rem] bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg sm:grid-cols-[10rem_1fr]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={scan.thumbnail ?? scan.image_url}
              alt={`${scan.vehicle_analysis.make} ${scan.vehicle_analysis.model}`}
              fill
              unoptimized
              className="object-cover"
              sizes="160px"
            />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
              {scan.vehicle_analysis.generation || "Generation unknown"}
            </p>
            <h2 className="mt-1 truncate text-xl font-bold text-slate-950">
              {scan.vehicle_analysis.year} {scan.vehicle_analysis.make}{" "}
              {scan.vehicle_analysis.model}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {scan.vehicle_analysis.trim || "Trim unknown"}
            </p>

            <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
              <Metric label="Date" value={formatDate(scan.created_at)} />
              <Metric label="Confidence" value={`${scan.vehicle_analysis.confidence}%`} />
              <Metric
                label="Market Value"
                value={scan.vehicle_analysis.estimated_market_value || "Unknown"}
              />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function StatePanel({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-1 truncate font-bold text-slate-950">{value}</p>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
