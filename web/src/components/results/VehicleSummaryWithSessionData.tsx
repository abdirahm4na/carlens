"use client";

import { useEffect, useState } from "react";
import { getStoredVehicleAnalysis } from "@/lib/analysisSession";
import { getStoredScanImage } from "@/lib/scanSession";
import { type VehicleAnalysis } from "@/types/vehicle";
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
  const [imageSrc, setImageSrc] = useState<string>();
  const [analysis, setAnalysis] = useState<VehicleAnalysis>();

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) {
        return;
      }

      setImageSrc(getStoredScanImage());
      setAnalysis(getStoredVehicleAnalysis());
    });

    return () => {
      isMounted = false;
    };
  }, []);

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
