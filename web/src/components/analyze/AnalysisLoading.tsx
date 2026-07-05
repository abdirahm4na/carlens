"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  getServerStoredScanImage,
  getStoredScanImage,
  subscribeToScanImageStorage,
} from "@/lib/scanSession";

const ANALYSIS_DURATION_MS = 3600;

const checklistSteps = [
  "Reading image",
  "Detecting vehicle",
  "Matching specs",
  "Preparing results",
];

export function AnalysisLoading() {
  const router = useRouter();
  const imageSrc = useSyncExternalStore(
    subscribeToScanImageStorage,
    getStoredScanImage,
    getServerStoredScanImage,
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / ANALYSIS_DURATION_MS) * 100));
      setProgress(nextProgress);
    }, 120);

    const redirectTimer = window.setTimeout(() => {
      router.push("/results");
    }, ANALYSIS_DURATION_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(redirectTimer);
    };
  }, [router]);

  const activeStepIndex = useMemo(() => {
    if (progress >= 92) {
      return 3;
    }

    if (progress >= 62) {
      return 2;
    }

    if (progress >= 32) {
      return 1;
    }

    return 0;
  }, [progress]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col justify-center">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-sky-300 via-blue-600 to-slate-950">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Uploaded vehicle"
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          ) : (
            <PlaceholderVehicle />
          )}

          <div className="absolute inset-0 bg-blue-950/10" />
          <div className="absolute inset-x-0 top-0 h-24 animate-[scan_1.6s_ease-in-out_infinite] bg-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-cyan-300/0" />
          <div className="absolute inset-5 rounded-[1.5rem] border border-white/40" />
          <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white ring-1 ring-white/25 backdrop-blur">
            Scanning
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
            AI Analysis
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            Analyzing vehicle
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            We are preparing a placeholder analysis flow. Real OpenAI detection will be
            connected later.
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-normal text-slate-500">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-[width] duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ol className="mt-6 space-y-3">
            {checklistSteps.map((step, index) => {
              const isComplete = index < activeStepIndex;
              const isActive = index === activeStepIndex;

              return (
                <li
                  key={step}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      isComplete
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-white text-slate-400 ring-1 ring-slate-200"
                    }`}
                  >
                    {isComplete ? <CheckIcon /> : index + 1}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isActive || isComplete ? "text-slate-950" : "text-slate-500"
                    }`}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </div>
  );
}

function PlaceholderVehicle() {
  return (
    <>
      <div className="absolute bottom-16 left-12 right-12 h-20 rounded-t-[5rem] bg-white/85 shadow-2xl" />
      <div className="absolute bottom-10 left-24 size-10 rounded-full bg-slate-950 ring-8 ring-white/90" />
      <div className="absolute bottom-10 right-24 size-10 rounded-full bg-slate-950 ring-8 ring-white/90" />
    </>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );
}
