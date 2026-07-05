"use client";

import { useEffect, useState } from "react";
import { getStoredVehicleAnalysis } from "@/lib/analysisSession";
import { getStoredScanImage } from "@/lib/scanSession";
import { type VehicleAnalysis } from "@/types/vehicle";
import { ChatPanel } from "./ChatPanel";
import { VehicleContextCard } from "./VehicleContextCard";

export function ChatExperience() {
  const [vehicleAnalysis, setVehicleAnalysis] = useState<VehicleAnalysis>();
  const [imageDataUrl, setImageDataUrl] = useState<string>();

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (!isMounted) {
        return;
      }

      setVehicleAnalysis(getStoredVehicleAnalysis());
      setImageDataUrl(getStoredScanImage());
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="mt-6 grid flex-1 gap-5 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <VehicleContextCard vehicle={vehicleAnalysis} />
      <ChatPanel vehicleAnalysis={vehicleAnalysis} imageDataUrl={imageDataUrl} />
    </div>
  );
}
