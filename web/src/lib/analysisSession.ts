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
    typeof analysis.generation === "string" &&
    typeof analysis.year === "string" &&
    isScore(analysis.confidence) &&
    isScore(analysis.reliability) &&
    typeof analysis.engine === "string" &&
    typeof analysis.horsepower === "string" &&
    typeof analysis.drivetrain === "string" &&
    typeof analysis.transmission === "string" &&
    typeof analysis.estimated_market_value === "string" &&
    typeof analysis.exterior_color === "string" &&
    isStringArray(analysis.visible_modifications) &&
    isStringArray(analysis.common_issues) &&
    typeof analysis.summary === "string"
  );
}

function isScore(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 100;
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
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
