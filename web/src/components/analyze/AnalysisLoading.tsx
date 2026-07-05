"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import { isVehicleAnalysis, storeVehicleAnalysis } from "@/lib/analysisSession";
import { getStoredScanImages } from "@/lib/scanSession";

const ANALYSIS_DURATION_MS = 3600;

const checklistSteps = [
  "Uploading",
  "Detecting vehicle",
  "Identifying generation",
  "Estimating market value",
  "Building inspection report",
];

export function AnalysisLoading() {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string>();
  const [imageSources, setImageSources] = useState<string[]>([]);
  const [photoCount, setPhotoCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Starting analysis...");

  useEffect(() => {
    let isActive = true;
    const startedAt = Date.now();
    const storedImages = getStoredScanImages();

    queueMicrotask(() => {
      if (!isActive) {
        return;
      }

      setImageSrc(storedImages[0]);
      setImageSources(storedImages);
      setPhotoCount(storedImages.length);
    });

    const progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / ANALYSIS_DURATION_MS) * 100));
      setProgress(nextProgress);
    }, 120);

    async function runAnalysis() {
      try {
        const [analysis] = await Promise.all([
          requestVehicleAnalysis(storedImages),
          wait(ANALYSIS_DURATION_MS),
        ]);

        if (!isActive) {
          return;
        }

        storeVehicleAnalysis(analysis);
        setProgress(100);
        setStatusMessage("Analysis complete. Opening results...");
        router.push("/results");
      } catch {
        if (!isActive) {
          return;
        }

        setProgress(100);
        setStatusMessage("Analysis unavailable. Opening fallback results...");
        router.push("/results");
      }
    }

    void runAnalysis();

    return () => {
      isActive = false;
      window.clearInterval(progressInterval);
    };
  }, [router]);

  const activeStepIndex = useMemo(() => {
    if (progress >= 86) {
      return 4;
    }

    if (progress >= 66) {
      return 3;
    }

    if (progress >= 46) {
      return 2;
    }

    if (progress >= 22) {
      return 1;
    }

    return 0;
  }, [progress]);

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-7xl flex-col justify-center">
      <section className="grid gap-6 rounded-[2rem] bg-[#080A0F]/95 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.36)] ring-1 ring-white/10 backdrop-blur lg:grid-cols-[minmax(0,1.2fr)_minmax(22rem,0.8fr)] lg:p-4">
        <div className="space-y-3">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.6rem] bg-slate-950">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt="Uploaded vehicle"
                fill
                unoptimized
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 760px"
              />
            ) : (
              <PlaceholderVehicle />
            )}

            <div className="absolute inset-0 bg-blue-950/10" />
            <div className="absolute inset-x-0 top-0 h-28 animate-[scan_1.7s_ease-in-out_infinite] bg-gradient-to-b from-cyan-300/0 via-cyan-300/45 to-cyan-300/0" />
            <div className="absolute inset-5 rounded-[1.25rem] border border-white/25" />
            <div className="absolute left-5 top-5 rounded-full bg-white/12 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur">
              Analyzing
            </div>
          </div>

          {imageSources.length > 1 ? (
            <div className="grid grid-cols-4 gap-3">
              {imageSources.slice(0, 4).map((source, index) => (
                <div
                  key={`${source.slice(0, 24)}-${index}`}
                  className="motion-fade-up relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-white/10"
                >
                  <Image
                    src={source}
                    alt={`Analysis photo ${index + 1}`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-center p-4 sm:p-6 lg:p-8">
          <p className="text-sm font-semibold text-blue-400">AI inspection</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal text-white sm:text-5xl">
            Reading the photos
          </h1>
          <p className="mt-4 text-sm font-medium leading-6 text-slate-400">
            {statusMessage}
          </p>
          <p className="mt-3 text-sm font-semibold text-slate-500">
            Estimated completion: about 4 seconds
          </p>
          {photoCount > 1 ? (
            <p className="mt-4 inline-flex w-fit rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300 ring-1 ring-blue-400/20">
              {photoCount} photos included
            </p>
          ) : null}

          <ol className="mt-8 space-y-3">
            {checklistSteps.map((step, index) => {
              const isComplete = index < activeStepIndex;
              const isActive = index === activeStepIndex;

              return (
                <li
                  key={step}
                  className={`flex items-center gap-4 rounded-2xl p-3 transition duration-300 ${
                    isActive
                      ? "bg-white/[0.07] ring-1 ring-white/12"
                      : "bg-white/[0.03] ring-1 ring-white/[0.06]"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                      isComplete
                        ? "bg-blue-600 text-white"
                        : isActive
                          ? "bg-white text-slate-950 shadow-[0_0_32px_rgba(37,99,235,0.22)]"
                          : "bg-white/5 text-slate-500 ring-1 ring-white/10"
                    }`}
                  >
                    {isComplete ? <CheckIcon /> : isActive ? <PulseIcon /> : index + 1}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      isActive || isComplete ? "text-white" : "text-slate-500"
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

async function requestVehicleAnalysis(imageSources: string[]) {
  const formData = new FormData();

  imageSources.forEach((imageSrc, index) => {
    const imageFile = dataUrlToFile(imageSrc, `vehicle-upload-${index + 1}.jpg`);
    formData.append("image", imageFile);
  });

  const response = await fetch("/api/analyze", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Vehicle analysis request failed.");
  }

  const analysis: unknown = await response.json();

  if (!isVehicleAnalysis(analysis)) {
    throw new Error("Vehicle analysis response was not valid.");
  }

  return analysis;
}

function dataUrlToFile(dataUrl: string, fileName: string) {
  const [metadata, base64Data] = dataUrl.split(",");

  if (!base64Data) {
    throw new Error("Image data URL is not valid.");
  }

  const mimeType = metadata.match(/data:(.*);base64/)?.[1] ?? "image/jpeg";
  const binaryString = window.atob(base64Data);
  const bytes = Uint8Array.from(binaryString, (character) => character.charCodeAt(0));

  return new File([bytes], fileName, { type: mimeType });
}

function wait(durationMs: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });
}

function PlaceholderVehicle() {
  return (
    <div
      className="absolute inset-0 bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.34)), url(${automotivePhotos.detail})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
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

function PulseIcon() {
  return (
    <span className="relative flex size-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
      <span className="relative inline-flex size-3 rounded-full bg-blue-600" />
    </span>
  );
}
