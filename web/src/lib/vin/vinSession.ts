import { type VinDecodeResult } from "@/types/vin";

const VIN_CONTEXT_SESSION_KEY = "carlens.vin.context";

export function storeVinContext(result: VinDecodeResult) {
  sessionStorage.setItem(VIN_CONTEXT_SESSION_KEY, JSON.stringify(result));
}

export function getStoredVinContext() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const storedValue = sessionStorage.getItem(VIN_CONTEXT_SESSION_KEY);

  if (!storedValue) {
    return undefined;
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);
    return isVinDecodeResult(parsedValue) ? parsedValue : undefined;
  } catch {
    return undefined;
  }
}

function isVinDecodeResult(value: unknown): value is VinDecodeResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const result = value as Record<string, unknown>;

  return (
    typeof result.vin === "string" &&
    typeof result.year === "string" &&
    typeof result.make === "string" &&
    typeof result.model === "string" &&
    typeof result.trim === "string" &&
    typeof result.engine === "string" &&
    typeof result.body_style === "string" &&
    typeof result.plant === "string" &&
    typeof result.manufacturer === "string"
  );
}
