import { type VehicleAnalysis } from "@/types/vehicle";

export const VEHICLE_ANALYSIS_SESSION_KEY = "carlens.scan.vehicleAnalysis";

// Runtime validation keeps sessionStorage data type-safe because browser storage
// can be stale, manually edited, or written by an older version of the app.
export function isVehicleAnalysis(value: unknown): value is VehicleAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const analysis = value as Record<string, unknown>;

  return (
    typeof analysis.make === "string" &&
    typeof analysis.model === "string" &&
    typeof analysis.trim === "string" &&
    typeof analysis.year_range === "string" &&
    typeof analysis.confidence === "number" &&
    typeof analysis.summary === "string"
  );
}

// Store only the typed analysis JSON returned by the API route. The uploaded image
// preview remains managed separately by scanSession helpers.
export function storeVehicleAnalysis(analysis: VehicleAnalysis) {
  sessionStorage.setItem(VEHICLE_ANALYSIS_SESSION_KEY, JSON.stringify(analysis));
}

// Read and validate the latest vehicle analysis from sessionStorage. Invalid or
// missing data returns undefined so UI components can safely use placeholders.
export function getStoredVehicleAnalysis() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const storedAnalysis = sessionStorage.getItem(VEHICLE_ANALYSIS_SESSION_KEY);

  if (!storedAnalysis) {
    return undefined;
  }

  try {
    const parsedAnalysis: unknown = JSON.parse(storedAnalysis);
    return isVehicleAnalysis(parsedAnalysis) ? parsedAnalysis : undefined;
  } catch {
    return undefined;
  }
}

export function getServerStoredVehicleAnalysis() {
  return undefined;
}

export function subscribeToVehicleAnalysisStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}
