"use client";

import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { type NegotiatorAnalysis } from "@/types/negotiator";
import { NegotiatorReport } from "./NegotiatorReport";

type UploadState = "idle" | "analyzing" | "ready" | "error";

export function NegotiatorPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [analysis, setAnalysis] = useState<NegotiatorAnalysis>();
  const [status, setStatus] = useState<UploadState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  function openPicker() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    event.target.value = "";

    if (!selectedFile) {
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setStatus("error");
      setErrorMessage("Please upload an image screenshot.");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setAnalysis(undefined);
    setStatus("idle");
    setErrorMessage(undefined);
  }

  async function handleAnalyze() {
    if (!file || status === "analyzing") {
      return;
    }

    setStatus("analyzing");
    setErrorMessage(undefined);

    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/negotiator", {
        method: "POST",
        body: formData,
      });
      const body: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(body));
      }

      setAnalysis(assertNegotiatorAnalysis(body));
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to analyze that screenshot.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
              Listing Negotiator
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal text-slate-950">
              Turn screenshots into leverage
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Upload a marketplace listing, dealer page, or seller conversation. CarLens
              extracts the visible details and drafts a negotiation plan.
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Home
          </Link>
        </header>

        <section className="mt-8 overflow-hidden rounded-[2rem] bg-white/95 shadow-[0_24px_70px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={openPicker}
            className="group relative flex min-h-80 w-full flex-col items-center justify-center overflow-hidden bg-slate-950 text-center text-white"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Listing screenshot preview"
                fill
                unoptimized
                className="object-cover opacity-80 transition duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-slate-900 to-slate-950" />
            )}
            <div className="relative p-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-3xl bg-white/15 ring-1 ring-white/25">
                <UploadIcon />
              </div>
              <h2 className="mt-5 text-2xl font-semibold">
                {previewUrl ? "Change screenshot" : "Upload listing screenshot"}
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-200">
                Screenshots of listings, seller chats, or pricing pages work best.
              </p>
            </div>
          </button>

          <div className="p-5 sm:p-6">
            <button
              type="button"
              disabled={!file || status === "analyzing"}
              onClick={handleAnalyze}
              className="flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {status === "analyzing" ? "Analyzing screenshot..." : "Analyze negotiation"}
            </button>

            {status === "analyzing" ? <NegotiatorSkeleton /> : null}

            {status === "error" && errorMessage ? (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 ring-1 ring-red-200">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </section>

        {analysis ? (
          <div className="mt-6">
            <NegotiatorReport analysis={analysis} />
          </div>
        ) : null}
      </div>
    </main>
  );
}

function NegotiatorSkeleton() {
  return (
    <div className="mt-5 space-y-3">
      <div className="relative h-20 overflow-hidden rounded-3xl bg-slate-100">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shimmer_1.4s_infinite]" />
      </div>
      <div className="relative h-20 overflow-hidden rounded-3xl bg-slate-100">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shimmer_1.4s_infinite]" />
      </div>
    </div>
  );
}

function assertNegotiatorAnalysis(value: unknown) {
  if (!value || typeof value !== "object") {
    throw new Error("Negotiation response was not valid.");
  }

  return value as NegotiatorAnalysis;
}

function getErrorMessage(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).error === "string"
  ) {
    return (value as { error: string }).error;
  }

  return "Unable to analyze that screenshot.";
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0 5 5m-5-5-5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14" />
    </svg>
  );
}
