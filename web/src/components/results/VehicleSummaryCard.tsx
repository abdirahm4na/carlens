import Image from "next/image";
import { type VehicleAnalysis } from "@/types/vehicle";

export type VehicleSummary = VehicleAnalysis;

type VehicleSummaryCardProps = {
  vehicle: VehicleAnalysis;
  imageSrc?: string;
};

export function VehicleSummaryCard({ vehicle, imageSrc }: VehicleSummaryCardProps) {
  const title = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");

  return (
    <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
        <div className="relative min-h-64 bg-gradient-to-br from-sky-300 via-blue-600 to-slate-950">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title || "Analyzed vehicle"}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 396px"
            />
          ) : (
            <>
              <div className="absolute bottom-10 left-8 right-8 h-16 rounded-t-[4rem] bg-white/85 shadow-2xl" />
              <div className="absolute bottom-6 left-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
              <div className="absolute bottom-6 right-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
              <div className="absolute left-8 top-8 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white ring-1 ring-white/25">
                Placeholder Image
              </div>
            </>
          )}
        </div>

        <div className="p-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-blue-600">
            {vehicle.generation || "Generation unknown"}
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            {title || "Vehicle not identified"}
          </h2>
          <p className="mt-1 text-lg font-semibold text-slate-500">
            {vehicle.trim || "Trim unknown"}
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            {vehicle.summary || "No appraisal summary returned."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <ScoreTile label="Confidence" value={`${vehicle.confidence}%`} />
            <ScoreTile label="Reliability" value={`${vehicle.reliability}/100`} />
          </div>

          <div className="mt-4 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
              Estimated Market Value
            </p>
            <p className="mt-2 text-xl font-bold text-slate-950">
              {vehicle.estimated_market_value || "Not enough evidence"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 border-t border-slate-200 p-6 sm:grid-cols-2">
        <DetailTile label="Make" value={vehicle.make} />
        <DetailTile label="Model" value={vehicle.model} />
        <DetailTile label="Trim" value={vehicle.trim} />
        <DetailTile label="Generation" value={vehicle.generation} />
        <DetailTile label="Year" value={vehicle.year} />
        <DetailTile label="Exterior Color" value={vehicle.exterior_color} />
        <DetailTile label="Engine" value={vehicle.engine} />
        <DetailTile label="Horsepower" value={vehicle.horsepower} />
        <DetailTile label="Drivetrain" value={vehicle.drivetrain} />
        <DetailTile label="Transmission" value={vehicle.transmission} />
      </div>

      <div className="grid gap-4 border-t border-slate-200 p-6 sm:grid-cols-2">
        <ListTile
          label="Visible Modifications"
          emptyLabel="No visible modifications identified"
          items={vehicle.visible_modifications}
        />
        <ListTile
          label="Common Issues"
          emptyLabel="No common issues returned"
          items={vehicle.common_issues}
        />
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

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold leading-5 text-slate-950">
        {value || "Unknown"}
      </p>
    </div>
  );
}

function ListTile({
  label,
  emptyLabel,
  items,
}: {
  label: string;
  emptyLabel: string;
  items: string[];
}) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      {items.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item} className="text-sm font-semibold leading-5 text-slate-950">
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm font-bold leading-5 text-slate-950">{emptyLabel}</p>
      )}
    </div>
  );
}
