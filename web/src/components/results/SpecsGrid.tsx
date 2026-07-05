export type VehicleSpec = {
  label: string;
  value: string;
};

type SpecsGridProps = {
  specs: VehicleSpec[];
};

export function SpecsGrid({ specs }: SpecsGridProps) {
  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold tracking-normal text-slate-950">Specs</h2>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
              {spec.label}
            </p>
            <p className="mt-2 text-sm font-bold leading-5 text-slate-950">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
