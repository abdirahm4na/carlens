"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStoredVehicleAnalysis } from "@/lib/analysisSession";
import { getStoredScanImage } from "@/lib/scanSession";
import {
  AuthRequiredError,
  saveScan,
  SaveScanSetupRequiredError,
} from "@/services/scans/saveScan";

type SaveState = "idle" | "saving" | "success" | "error";

export function ResultsActions() {
  const router = useRouter();
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [toastMessage, setToastMessage] = useState<string>();

  async function handleSaveScan() {
    if (saveState === "saving") {
      return;
    }

    const imageDataUrl = getStoredScanImage();
    const vehicleAnalysis = getStoredVehicleAnalysis();

    if (!imageDataUrl) {
      setSaveState("error");
      setToastMessage("Upload and analyze an image before saving.");
      return;
    }

    if (!vehicleAnalysis) {
      setSaveState("error");
      setToastMessage("Vehicle analysis is missing. Run the scan again.");
      return;
    }

    setSaveState("saving");
    setToastMessage(undefined);

    try {
      await saveScan({ imageDataUrl, vehicleAnalysis });
      setSaveState("success");
      setToastMessage("Scan saved successfully.");
    } catch (error) {
      if (error instanceof AuthRequiredError) {
        router.push("/login?redirectTo=/results");
        return;
      }

      if (error instanceof SaveScanSetupRequiredError) {
        setSaveState("error");
        setToastMessage(error.message);
        return;
      }

      setSaveState("error");
      setToastMessage(
        error instanceof Error ? error.message : "Unable to save scan. Try again.",
      );
    }
  }

  return (
    <section className="relative pb-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <Link
          href="/chat"
          className="rounded-full bg-blue-600 px-6 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Ask AI
        </Link>
        <button
          type="button"
          disabled={saveState === "saving"}
          onClick={handleSaveScan}
          className="rounded-full bg-white px-6 py-4 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-blue-200 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-50 enabled:hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {saveState === "saving" ? "Saving..." : "Save Scan"}
        </button>
      </div>

      {toastMessage ? (
        <div
          role="status"
          className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold shadow-sm ring-1 ${
            saveState === "success"
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-red-50 text-red-700 ring-red-200"
          }`}
        >
          {toastMessage}
        </div>
      ) : null}
    </section>
  );
}
