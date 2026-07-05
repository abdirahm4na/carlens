"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { storeScanImages } from "@/lib/scanSession";

const MAX_IMAGES = 8;

type SelectedImage = {
  id: string;
  file: File;
  previewUrl: string;
};

export function VehicleUploadDropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedImagesRef = useRef<SelectedImage[]>([]);
  const [selectedImages, setSelectedImages] = useState<SelectedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    selectedImagesRef.current = selectedImages;
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      selectedImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function selectFiles(files?: FileList | File[]) {
    const incomingFiles = Array.from(files ?? []);
    const imageFiles = incomingFiles.filter((file) => file.type.startsWith("image/"));

    if (incomingFiles.length > 0 && imageFiles.length === 0) {
      setErrorMessage("Please choose valid image files.");
      return;
    }

    setSelectedImages((currentImages) => {
      const availableSlots = MAX_IMAGES - currentImages.length;
      const nextFiles = imageFiles.slice(0, availableSlots);

      if (imageFiles.length > availableSlots) {
        setErrorMessage(`You can upload up to ${MAX_IMAGES} photos.`);
      } else {
        setErrorMessage(undefined);
      }

      return [
        ...currentImages,
        ...nextFiles.map((file) => ({
          id: crypto.randomUUID(),
          file,
          previewUrl: URL.createObjectURL(file),
        })),
      ];
    });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    selectFiles(event.target.files ?? undefined);
    event.target.value = "";
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    selectFiles(event.dataTransfer.files);
  }

  function removeImage(imageId: string) {
    setErrorMessage(undefined);
    setSelectedImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === imageId);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== imageId);
    });
  }

  async function handleContinue() {
    if (selectedImages.length === 0 || isContinuing) {
      return;
    }

    setIsContinuing(true);
    setErrorMessage(undefined);

    try {
      const imageDataUrls = await Promise.all(
        selectedImages.map((image) => readFileAsDataUrl(image.file)),
      );
      storeScanImages(imageDataUrls);
      router.push("/analyze");
    } catch {
      setErrorMessage("We could not prepare those images. Try uploading them again.");
      setIsContinuing(false);
    }
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={openFilePicker}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openFilePicker();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-[2rem] border-2 border-dashed bg-white p-5 shadow-sm transition ${
          isDragging
            ? "border-blue-500 bg-blue-50 shadow-lg"
            : "border-slate-300 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg"
        }`}
      >
        {selectedImages.length > 0 ? (
          <SelectedImageGrid images={selectedImages} onRemove={removeImage} />
        ) : (
          <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
            <div className="flex size-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
              <UploadIcon />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-normal text-slate-950">
              Upload vehicle photos
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              Drag and drop 1 to {MAX_IMAGES} images, or choose files from your device.
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-500">
            {selectedImages.length}/{MAX_IMAGES} photos selected
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            disabled={selectedImages.length >= MAX_IMAGES}
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add photos
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={selectedImages.length === 0 || isContinuing}
        onClick={handleContinue}
        className="mt-5 flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isContinuing ? "Preparing..." : "Continue"}
      </button>

      {errorMessage ? (
        <p className="mt-3 text-center text-sm font-semibold text-red-600">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

function SelectedImageGrid({
  images,
  onRemove,
}: {
  images: SelectedImage[];
  onRemove: (imageId: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200"
        >
          <Image
            src={image.previewUrl}
            alt={`Selected vehicle photo ${index + 1}`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 160px"
          />
          {index === 0 ? (
            <span className="absolute left-2 top-2 rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white">
              Primary
            </span>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(image.id);
            }}
            className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/95 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Remove photo ${index + 1}`}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Unexpected file reader result."));
    };

    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-9"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0 5 5m-5-5-5 5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 20h14" />
    </svg>
  );
}
