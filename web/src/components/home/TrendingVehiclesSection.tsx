import { SectionHeader } from "../ui/SectionHeader";

export type TrendingVehicle = {
  id: string;
  name: string;
  category: string;
  trend: string;
};

type TrendingVehiclesSectionProps = {
  vehicles: TrendingVehicle[];
};

export function TrendingVehiclesSection({ vehicles }: TrendingVehiclesSectionProps) {
  return (
    <section className="mt-8">
      <SectionHeader title="Trending Vehicles" />

      <div className="space-y-3">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="flex items-center justify-between gap-4 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-600">
                {vehicle.name
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold text-slate-950">
                  {vehicle.name}
                </h3>
                <p className="mt-1 truncate text-xs font-medium text-slate-500">
                  {vehicle.category}
                </p>
              </div>
            </div>

            <span className="shrink-0 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
              {vehicle.trend}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
