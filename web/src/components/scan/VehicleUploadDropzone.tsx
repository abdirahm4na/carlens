"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import { ImagePreview } from "./ImagePreview";

type SelectedImage = {
  file: File;
  previewUrl: string;
};

export function VehicleUploadDropzone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (selectedImage?.previewUrl) {
        URL.revokeObjectURL(selectedImage.previewUrl);
      }
    };
  }, [selectedImage?.previewUrl]);

  function openFilePicker() {
    inputRef.current?.click();
  }

  function selectFile(file?: File) {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setSelectedImage((currentImage) => {
      if (currentImage?.previewUrl) {
        URL.revokeObjectURL(currentImage.previewUrl);
      }

      return {
        file,
        previewUrl: URL.createObjectURL(file),
      };
    });
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    selectFile(event.target.files?.[0]);
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
    selectFile(event.dataTransfer.files?.[0]);
  }

  function removeImage() {
    setSelectedImage((currentImage) => {
      if (currentImage?.previewUrl) {
        URL.revokeObjectURL(currentImage.previewUrl);
      }

      return undefined;
    });
  }

  return (
    <div className="w-full">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleInputChange}
      />

      {selectedImage ? (
        <ImagePreview
          imageUrl={selectedImage.previewUrl}
          fileName={selectedImage.file.name}
          onRemove={removeImage}
        />
      ) : (
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
          className={`flex min-h-[28rem] cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed bg-white p-8 text-center shadow-sm transition ${
            isDragging
              ? "border-blue-500 bg-blue-50 shadow-lg"
              : "border-slate-300 hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-lg"
          }`}
        >
          <div className="flex size-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
            <UploadIcon />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-normal text-slate-950">
            Upload vehicle photo
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Drag and drop an image here, or choose a file from your device.
          </p>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              openFilePicker();
            }}
            className="mt-7 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Upload image
          </button>
        </div>
      )}

      <button
        type="button"
        disabled={!selectedImage}
        className="mt-5 flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Continue
      </button>
    </div>
  );
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
