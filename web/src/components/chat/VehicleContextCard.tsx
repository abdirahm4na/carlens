import { type VehicleAnalysis } from "@/types/vehicle";

type VehicleContextCardProps = {
  vehicle?: VehicleAnalysis;
};

export function VehicleContextCard({ vehicle }: VehicleContextCardProps) {
  const initials = vehicle
    ? `${vehicle.make.slice(0, 1)}${vehicle.model.slice(0, 1)}`
    : "AI";

  return (
    <section className="rounded-[2rem] bg-white/95 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80 backdrop-blur lg:self-start">
      <div className="flex items-center gap-4">
        <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700">
          {initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
            Current vehicle context
          </p>
          <h2 className="mt-1 truncate text-lg font-bold text-slate-950">
            {vehicle
              ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`
              : "No analyzed vehicle loaded"}
          </h2>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
        <ContextMetric label="Confidence" value={vehicle ? `${vehicle.confidence}%` : "N/A"} />
        <ContextMetric
          label="Market value"
          value={vehicle?.estimated_market_value ?? "N/A"}
        />
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
