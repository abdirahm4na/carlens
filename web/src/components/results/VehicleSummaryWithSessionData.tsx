"use client";

import { useEffect, useState } from "react";
import { getStoredVehicleAnalysis } from "@/lib/analysisSession";
import { getStoredScanImages } from "@/lib/scanSession";
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
  const [photoCount, setPhotoCount] = useState(0);
  const [analysis, setAnalysis] = useState<VehicleAnalysis>();

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) {
        return;
      }

      const storedImages = getStoredScanImages();
      setImageSrc(storedImages[0]);
      setPhotoCount(storedImages.length);
      setAnalysis(getStoredVehicleAnalysis());
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const vehicle = analysis
    ? analysis
    : fallbackVehicle;

  return (
    <VehicleSummaryCard
      vehicle={vehicle}
      imageSrc={imageSrc}
      photoCount={photoCount}
    />
  );
}
