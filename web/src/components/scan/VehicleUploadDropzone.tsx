"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
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
        className={`cursor-pointer rounded-[2rem] border border-dashed bg-[#0B0D12]/95 p-3 shadow-[0_28px_90px_rgba(0,0,0,0.32)] ring-1 ring-white/10 backdrop-blur transition duration-300 sm:p-4 ${
          isDragging
            ? "border-blue-500 bg-blue-950/35"
            : "border-white/15 hover:-translate-y-0.5 hover:border-blue-400/70"
        }`}
      >
        {selectedImages.length > 0 ? (
          <SelectedImageGrid images={selectedImages} onRemove={removeImage} />
        ) : (
          <div
            className="image-zoom relative flex min-h-[32rem] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] bg-slate-950 text-center text-white"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.72)), url(${automotivePhotos.coupe})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="motion-fade-up flex size-16 items-center justify-center rounded-3xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur">
              <UploadIcon />
            </div>
            <h2 className="motion-fade-up mt-7 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Upload vehicle photos
            </h2>
            <p className="motion-fade-up mt-4 max-w-sm text-sm font-medium leading-6 text-slate-300">
              Drag photos here or choose up to {MAX_IMAGES}.
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1 pb-1">
          <p className="text-sm font-semibold text-slate-400">
            {selectedImages.length}/{MAX_IMAGES} photos selected
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            disabled={selectedImages.length >= MAX_IMAGES}
            className="rounded-full bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-white/15 disabled:cursor-not-allowed disabled:bg-white/5 disabled:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {selectedImages.length > 0 ? "Add photos" : "Choose photos"}
          </button>
        </div>
      </div>

      <button
        type="button"
        disabled={selectedImages.length === 0 || isContinuing}
        onClick={handleContinue}
        className="mt-5 flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-[0_18px_42px_rgba(37,99,235,0.28)] transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isContinuing ? "Preparing..." : "Start Inspection"}
      </button>

      {errorMessage ? (
        <p className="mt-3 text-center text-sm font-semibold text-red-400">
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="motion-fade-up group relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-950 shadow-sm ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.28)]"
        >
          <Image
            src={image.previewUrl}
            alt={`Selected vehicle photo ${index + 1}`}
            fill
            unoptimized
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          />
          {index === 0 ? (
            <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-blue-950/20">
              Primary
            </span>
          ) : null}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRemove(image.id);
            }}
            className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-black/55 text-sm font-bold text-white opacity-90 shadow-sm ring-1 ring-white/15 backdrop-blur transition hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Remove photo ${index + 1}`}
          >
            ×
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
