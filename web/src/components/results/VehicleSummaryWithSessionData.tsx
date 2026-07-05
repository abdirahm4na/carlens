"use client";

import { useSyncExternalStore } from "react";
import {
  getServerStoredVehicleAnalysis,
  getStoredVehicleAnalysis,
  subscribeToVehicleAnalysisStorage,
} from "@/lib/analysisSession";
import {
  getServerStoredScanImage,
  getStoredScanImage,
  subscribeToScanImageStorage,
} from "@/lib/scanSession";
import {
  VehicleSummaryCard,
  type VehicleSummary,
} from "./VehicleSummaryCard";

type VehicleSummaryWithSessionDataProps = {
  fallbackVehicle: VehicleSummary;
};

export function VehicleSummaryWithSessionData({
  fallbackVehicle,
}: VehicleSummaryWithSessionDataProps) {
  const imageSrc = useSyncExternalStore(
    subscribeToScanImageStorage,
    getStoredScanImage,
    getServerStoredScanImage,
  );
  const analysis = useSyncExternalStore(
    subscribeToVehicleAnalysisStorage,
    getStoredVehicleAnalysis,
    getServerStoredVehicleAnalysis,
  );
  const vehicle = analysis
    ? {
        ...fallbackVehicle,
        year: analysis.year_range,
        make: analysis.make,
        model: analysis.model,
        trim: analysis.trim,
        confidenceScore: analysis.confidence,
        summary: analysis.summary,
      }
    : fallbackVehicle;

  return <VehicleSummaryCard vehicle={vehicle} imageSrc={imageSrc} />;
}
