"use client";

import { useSyncExternalStore } from "react";
import {
  getServerStoredScanImage,
  getStoredScanImage,
  subscribeToScanImageStorage,
} from "@/lib/scanSession";
import { VehicleSummaryCard, type VehicleSummary } from "./VehicleSummaryCard";

type VehicleSummaryWithStoredImageProps = {
  vehicle: VehicleSummary;
};

export function VehicleSummaryWithStoredImage({
  vehicle,
}: VehicleSummaryWithStoredImageProps) {
  const imageSrc = useSyncExternalStore(
    subscribeToScanImageStorage,
    getStoredScanImage,
    getServerStoredScanImage,
  );

  return <VehicleSummaryCard vehicle={vehicle} imageSrc={imageSrc} />;
}
