export type RecentScanCardData = {
  id: string;
  name: string;
  scannedAt: string;
  confidence: string;
  accentClassName: string;
};

type RecentScanCardProps = {
  scan: RecentScanCardData;
};

export function RecentScanCard({ scan }: RecentScanCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`relative h-28 bg-gradient-to-br ${scan.accentClassName}`}>
        <div className="absolute inset-x-5 bottom-4 h-8 rounded-full bg-white/20 blur-sm" />
        <div className="absolute bottom-5 left-4 right-4 h-8 rounded-t-[2rem] bg-white/80 shadow-lg" />
        <div className="absolute bottom-3 left-8 size-5 rounded-full bg-slate-950 ring-4 ring-white/80" />
        <div className="absolute bottom-3 right-8 size-5 rounded-full bg-slate-950 ring-4 ring-white/80" />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-bold leading-5 text-slate-950">{scan.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-2 text-xs">
          <span className="font-medium text-slate-500">{scan.scannedAt}</span>
          <span className="rounded-full bg-emerald-50 px-2 py-1 font-bold text-emerald-700">
            {scan.confidence}
          </span>
        </div>
      </div>
    </article>
  );
}
