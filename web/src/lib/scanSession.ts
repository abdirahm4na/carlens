export const SCAN_IMAGE_SESSION_KEY = "carlens.scan.imagePreview";
export const SCAN_IMAGES_SESSION_KEY = "carlens.scan.imagePreviews";

export function getStoredScanImage() {
  const storedImages = getStoredScanImages();

  if (storedImages.length > 0) {
    return storedImages[0];
  }

  if (typeof window === "undefined") {
    return undefined;
  }

  const storedImage = sessionStorage.getItem(SCAN_IMAGE_SESSION_KEY);
  return storedImage?.startsWith("data:image/") ? storedImage : undefined;
}

export function getStoredScanImages() {
  if (typeof window === "undefined") {
    return [];
  }

  const storedImages = sessionStorage.getItem(SCAN_IMAGES_SESSION_KEY);

  if (storedImages) {
    try {
      const parsedImages: unknown = JSON.parse(storedImages);

      if (Array.isArray(parsedImages)) {
        return parsedImages.filter(
          (image): image is string =>
            typeof image === "string" && image.startsWith("data:image/"),
        );
      }
    } catch {
      return [];
    }
  }

  const storedImage = sessionStorage.getItem(SCAN_IMAGE_SESSION_KEY);
  return storedImage?.startsWith("data:image/") ? [storedImage] : [];
}

export function storeScanImages(images: string[]) {
  const validImages = images.filter((image) => image.startsWith("data:image/")).slice(0, 8);

  sessionStorage.setItem(SCAN_IMAGES_SESSION_KEY, JSON.stringify(validImages));

  if (validImages[0]) {
    sessionStorage.setItem(SCAN_IMAGE_SESSION_KEY, validImages[0]);
  } else {
    sessionStorage.removeItem(SCAN_IMAGE_SESSION_KEY);
  }
}

export function getServerStoredScanImage() {
  return undefined;
}

export function subscribeToScanImageStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}
