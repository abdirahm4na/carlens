export type ChatVehicleContext = {
  year: number;
  make: string;
  model: string;
  trim: string;
  confidenceScore: number;
  estimatedMarketValue: string;
};

type VehicleContextCardProps = {
  vehicle: ChatVehicleContext;
};

export function VehicleContextCard({ vehicle }: VehicleContextCardProps) {
  return (
    <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700">
          {vehicle.make.slice(0, 1)}
          {vehicle.model.slice(0, 1)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
            Current vehicle context
          </p>
          <h2 className="mt-1 truncate text-lg font-bold text-slate-950">
            {vehicle.year} {vehicle.make} {vehicle.model} {vehicle.trim}
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ContextMetric label="Confidence" value={`${vehicle.confidenceScore}%`} />
        <ContextMetric label="Market value" value={vehicle.estimatedMarketValue} />
      </div>
    </section>
  );
}

function ContextMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
