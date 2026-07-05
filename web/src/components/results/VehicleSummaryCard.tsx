export type VehicleSummary = {
  year: number;
  make: string;
  model: string;
  trim: string;
  confidenceScore: number;
  reliabilityScore: number;
  estimatedMarketValue: string;
};

type VehicleSummaryCardProps = {
  vehicle: VehicleSummary;
};

export function VehicleSummaryCard({ vehicle }: VehicleSummaryCardProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-64 bg-gradient-to-br from-sky-300 via-blue-600 to-slate-950">
          <div className="absolute bottom-10 left-8 right-8 h-16 rounded-t-[4rem] bg-white/85 shadow-2xl" />
          <div className="absolute bottom-6 left-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
          <div className="absolute bottom-6 right-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
          <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white ring-1 ring-white/25">
            Placeholder Image
          </div>
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
            {vehicle.year}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            {vehicle.make} {vehicle.model}
          </h2>
          <p className="mt-1 text-lg font-semibold text-slate-500">{vehicle.trim}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <ScoreTile label="Confidence" value={`${vehicle.confidenceScore}%`} />
            <ScoreTile label="Reliability" value={`${vehicle.reliabilityScore}/100`} />
          </div>

          <div className="mt-4 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
              Estimated Market Value
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {vehicle.estimatedMarketValue}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-blue-50 p-4 ring-1 ring-blue-100">
      <p className="text-xs font-bold uppercase tracking-normal text-blue-600">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
