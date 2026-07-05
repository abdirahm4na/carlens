"use client";

import { ChangeEvent, useRef, useState } from "react";

export function UploadPhotoCard() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>();

  function openPhotoPicker() {
    inputRef.current?.click();
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setSelectedFileName(file?.name);
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handlePhotoChange}
      />

      <button
        type="button"
        onClick={openPhotoPicker}
        className="group flex w-full items-center gap-4 rounded-[1.75rem] bg-white/90 p-4 text-left shadow-[0_14px_34px_rgba(15,23,42,0.06)] ring-1 ring-slate-200/80 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_44px_rgba(15,23,42,0.09)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-blue-600 transition group-hover:bg-blue-50">
          <UploadIcon />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-base font-bold text-slate-950">Upload Photo</span>
          <span className="mt-1 block text-sm leading-5 text-slate-500">
            {selectedFileName ?? "Choose a vehicle image from your gallery."}
          </span>
        </span>

        <span className="text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500">
          <ChevronRightIcon />
        </span>
      </button>
    </>
  );
}

function UploadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-6"
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

function ChevronRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
    </svg>
  );
}
