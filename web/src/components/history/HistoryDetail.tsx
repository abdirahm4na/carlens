"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { VehicleSummaryCard } from "@/components/results/VehicleSummaryCard";
import {
  getSavedScanById,
  HistoryAuthRequiredError,
  type SavedScan,
} from "@/services/scans/history";

export function HistoryDetail() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [scan, setScan] = useState<SavedScan>();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    let isMounted = true;

    async function loadScan() {
      try {
        const savedScan = await getSavedScanById(params.id);

        if (!isMounted) {
          return;
        }

        setScan(savedScan);
        setStatus("ready");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        if (error instanceof HistoryAuthRequiredError) {
          router.replace(`/login?redirectTo=/history/${params.id}`);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : "Unable to load this scan.",
        );
        setStatus("error");
      }
    }

    void loadScan();

    return () => {
      isMounted = false;
    };
  }, [params.id, router]);

  if (status === "loading") {
    return <StatePanel title="Loading scan" body="Fetching saved scan details." />;
  }

  if (status === "error" || !scan) {
    return (
      <StatePanel
        title="Could not load scan"
        body={errorMessage ?? "This saved scan could not be found."}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
            Saved Scan
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            {scan.vehicle_analysis.make} {scan.vehicle_analysis.model}
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            Saved {formatDate(scan.created_at)}
          </p>
        </div>
        <Link
          href="/history"
          className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back
        </Link>
      </div>

      <VehicleSummaryCard vehicle={scan.vehicle_analysis} imageSrc={scan.image_url} />
    </div>
  );
}

function StatePanel({ title, body }: { title: string; body: string }) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{body}</p>
      <Link
        href="/history"
        className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to history
      </Link>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
