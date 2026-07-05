"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { storeVinContext } from "@/lib/vin/vinSession";
import { type VinDecodeResult } from "@/types/vin";

type DecodeState = "idle" | "loading" | "ready" | "error";

export function VinDecoderPage() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<VinDecodeResult>();
  const [status, setStatus] = useState<DecodeState>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();
  const normalizedVin = normalizeVin(vin);
  const isValid = isValidVin(normalizedVin);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid || status === "loading") {
      return;
    }

    setStatus("loading");
    setErrorMessage(undefined);

    try {
      const response = await fetch("/api/vin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vin: normalizedVin }),
      });
      const body: unknown = await response.json();

      if (!response.ok) {
        throw new Error(getErrorMessage(body));
      }

      const decodedResult = assertVinDecodeResult(body);
      setResult(decodedResult);
      storeVinContext(decodedResult);
      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to decode that VIN.",
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
              VIN Decoder
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-normal text-slate-950">
              Decode factory details
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Enter a 17-character VIN to pull public NHTSA vehicle details and save
              them as extra context for a future scan.
            </p>
          </div>

          <Link
            href="/"
            className="shrink-0 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Home
          </Link>
        </header>

        <section className="mt-8 rounded-[2rem] bg-white/95 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/80 sm:p-6">
          <form onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-bold text-slate-700">Vehicle VIN</span>
              <input
                value={vin}
                onChange={(event) => setVin(event.target.value.toUpperCase())}
                maxLength={20}
                placeholder="17-character VIN"
                className="mt-2 min-h-14 w-full rounded-2xl bg-slate-50/80 px-4 text-lg font-bold uppercase tracking-[0.12em] text-slate-950 ring-1 ring-slate-200 transition placeholder:tracking-normal placeholder:text-slate-400 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <div className="mt-3 flex items-center justify-between gap-3 text-sm">
              <p className={isValid ? "font-bold text-emerald-600" : "font-semibold text-slate-500"}>
                {normalizedVin.length}/17 characters
              </p>
              <p className="font-semibold text-slate-500">No login required</p>
            </div>

            <button
              type="submit"
              disabled={!isValid || status === "loading"}
              className="mt-5 flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_38px_rgba(37,99,235,0.24)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {status === "loading" ? "Decoding..." : "Decode VIN"}
            </button>
          </form>

          {!isValid && normalizedVin.length > 0 ? (
            <p className="mt-4 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
              VINs must be exactly 17 characters and cannot contain I, O, or Q.
            </p>
          ) : null}

          {status === "loading" ? <VinSkeleton /> : null}

          {status === "error" && errorMessage ? (
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-700 ring-1 ring-red-200">
              {errorMessage}
            </p>
          ) : null}
        </section>

        {result ? (
          <section className="mt-6 rounded-[2rem] bg-white/95 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
              Saved as future scan context
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {[result.year, result.make, result.model].filter(Boolean).join(" ") ||
                "Decoded VIN"}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Detail label="VIN" value={result.vin} />
              <Detail label="Trim" value={result.trim} />
              <Detail label="Engine" value={result.engine} />
              <Detail label="Body Style" value={result.body_style} />
              <Detail label="Plant" value={result.plant} />
              <Detail label="Manufacturer" value={result.manufacturer} />
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50/90 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold leading-5 text-slate-950">
        {value || "Unknown"}
      </p>
    </div>
  );
}

function VinSkeleton() {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="relative h-20 overflow-hidden rounded-3xl bg-slate-100">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent animate-[shimmer_1.4s_infinite]" />
        </div>
      ))}
    </div>
  );
}

function normalizeVin(value: string) {
  return value.replace(/\s|-/g, "").toUpperCase();
}

function isValidVin(value: string) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(value);
}

function assertVinDecodeResult(value: unknown) {
  if (!value || typeof value !== "object") {
    throw new Error("VIN response was not valid.");
  }

  return value as VinDecodeResult;
}

function getErrorMessage(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    typeof (value as Record<string, unknown>).error === "string"
  ) {
    return (value as { error: string }).error;
  }

  return "Unable to decode that VIN.";
}
