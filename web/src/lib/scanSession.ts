export const SCAN_IMAGE_SESSION_KEY = "carlens.scan.imagePreview";

export function getStoredScanImage() {
  if (typeof window === "undefined") {
    return undefined;
  }

  const storedImage = sessionStorage.getItem(SCAN_IMAGE_SESSION_KEY);
  return storedImage?.startsWith("data:image/") ? storedImage : undefined;
}

export function getServerStoredScanImage() {
  return undefined;
}

export function subscribeToScanImageStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}
