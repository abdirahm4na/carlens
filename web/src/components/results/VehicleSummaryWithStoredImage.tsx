"use client";

import { useSyncExternalStore } from "react";
import { SCAN_IMAGE_SESSION_KEY } from "@/lib/scanSession";
import { VehicleSummaryCard, type VehicleSummary } from "./VehicleSummaryCard";

type VehicleSummaryWithStoredImageProps = {
  vehicle: VehicleSummary;
};

export function VehicleSummaryWithStoredImage({
  vehicle,
}: VehicleSummaryWithStoredImageProps) {
  const imageSrc = useSyncExternalStore(
    subscribeToStorageChanges,
    getStoredScanImage,
    getServerStoredScanImage,
  );

  return <VehicleSummaryCard vehicle={vehicle} imageSrc={imageSrc} />;
}

function subscribeToStorageChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getStoredScanImage() {
  const storedImage = sessionStorage.getItem(SCAN_IMAGE_SESSION_KEY);
  return storedImage?.startsWith("data:image/") ? storedImage : undefined;
}

function getServerStoredScanImage() {
  return undefined;
}
