import Image from "next/image";

type ImagePreviewProps = {
  imageUrl: string;
  fileName: string;
  onRemove: () => void;
};

export function ImagePreview({ imageUrl, fileName, onRemove }: ImagePreviewProps) {
  return (
    <div className="w-full overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="relative aspect-[4/3] bg-slate-100">
        <Image
          src={imageUrl}
          alt={fileName}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 672px"
        />
      </div>

      <div className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-slate-950">{fileName}</p>
          <p className="mt-1 text-xs font-medium text-slate-500">Ready to continue</p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
