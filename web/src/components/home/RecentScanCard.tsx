export type RecentScanCardData = {
  id: string;
  name: string;
  scannedAt: string;
  confidence: string;
  imageUrl: string;
};

type RecentScanCardProps = {
  scan: RecentScanCardData;
};

export function RecentScanCard({ scan }: RecentScanCardProps) {
  return (
    <article className="group overflow-hidden rounded-[2rem] bg-white/90 ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-1 hover:bg-white/95">
      <div
        className="image-zoom relative h-44 bg-slate-950"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.34)), url(${scan.imageUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
      </div>

      <div className="p-5">
        <h3 className="text-base font-semibold leading-6 text-slate-950">{scan.name}</h3>
        <div className="mt-4 flex items-center justify-between gap-2 text-sm">
          <span className="font-medium text-slate-500">{scan.scannedAt}</span>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            {scan.confidence}
          </span>
        </div>
      </div>
    </article>
  );
}
