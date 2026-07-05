import Image from "next/image";
import { automotivePhotos } from "@/components/brand/automotivePhotos";
import { type VehicleAnalysis } from "@/types/vehicle";

export type VehicleSummary = VehicleAnalysis;

type VehicleSummaryCardProps = {
  vehicle: VehicleAnalysis;
  imageSrc?: string;
  photoCount?: number;
};

export function VehicleSummaryCard({
  vehicle,
  imageSrc,
  photoCount = 0,
}: VehicleSummaryCardProps) {
  const title = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
  const buyerScore = calculateBuyerScore(vehicle);
  const conditionScore = calculateConditionScore(vehicle);

  return (
    <article className="space-y-10">
      <section className="overflow-hidden rounded-[2rem] bg-[#080A0F] shadow-[0_30px_100px_rgba(0,0,0,0.36)] ring-1 ring-white/10">
        <div className="relative min-h-[28rem] bg-gradient-to-br from-sky-300 via-blue-600 to-slate-950 lg:min-h-[38rem]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title || "Analyzed vehicle"}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
            />
          ) : (
            <PlaceholderVehicle />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 pt-32 text-white lg:p-12 lg:pt-48">
            <p className="text-sm font-semibold text-blue-200">Vehicle</p>
            <h2 className="mt-3 max-w-4xl text-4xl font-semibold tracking-normal lg:text-6xl">
              {title || "Vehicle not identified"}
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                {vehicle.trim || "Trim unknown"}
              </p>
              <p className="rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                {vehicle.confidence}% confidence
              </p>
              {photoCount > 1 ? (
                <p className="rounded-full bg-white/12 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
                  {photoCount} photos used
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard label="Buyer Score" value={buyerScore} tone="emerald" />
        <ScoreCard label="Condition Score" value={conditionScore} tone="blue" />
        <ScoreCard label="Reliability Score" value={vehicle.reliability} tone="slate" />
        <ValueCard value={vehicle.estimated_market_value} />
      </section>

      <ReportSection
        eyebrow="Quick Summary"
        title="AI summary"
        body={vehicle.summary || "No summary available."}
      />

      <section className="space-y-5">
        <div>
          <p className="text-sm font-semibold text-blue-400">Inspection</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-normal text-white">
            Vehicle report
          </h3>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_minmax(24rem,0.92fr)] xl:items-start">
          <div className="space-y-5">
            <ReportSection eyebrow="Identity" title="Identified vehicle">
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailTile label="Make" value={vehicle.make} />
                <DetailTile label="Model" value={vehicle.model} />
                <DetailTile label="Trim" value={vehicle.trim} />
                <DetailTile label="Generation" value={vehicle.generation} />
                <DetailTile label="Year" value={vehicle.year} />
                <DetailTile label="Exterior Color" value={vehicle.exterior_color} />
              </div>
            </ReportSection>

            <ReportSection eyebrow="Specifications" title="Factory snapshot">
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailTile label="Engine" value={vehicle.engine} />
                <DetailTile label="Horsepower" value={vehicle.horsepower} />
                <DetailTile label="Drivetrain" value={vehicle.drivetrain} />
                <DetailTile label="Transmission" value={vehicle.transmission} />
              </div>
            </ReportSection>

            <ReportSection
              eyebrow="Condition"
              title="Visual condition"
              body={getConditionSummary(vehicle)}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailTile label="Condition Score" value={`${conditionScore}/100`} />
                <DetailTile label="Exterior Color" value={vehicle.exterior_color} />
              </div>
            </ReportSection>

            <ReportSection
              eyebrow="Damage"
              title="Visible damage"
              body={getDamageSummary()}
            />
          </div>

        <aside className="space-y-5">
          <ReportSection
            eyebrow="AI Confidence"
            title={`${vehicle.confidence}% identification confidence`}
            body={getConfidenceSummary(vehicle.confidence)}
          >
            <details className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10">
              <summary className="cursor-pointer text-sm font-bold text-white">
                Confidence explanation
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                This score reflects how clearly the photos support the make, model, trim,
                generation, and year. Low scores should be verified with a VIN.
              </p>
            </details>
          </ReportSection>

          <ReportSection
            eyebrow="Visible Modifications"
            title="Non-factory changes"
          >
            <ListTile
              emptyLabel="No visible modifications identified from the uploaded photos."
              items={vehicle.visible_modifications}
            />
          </ReportSection>

          <ReportSection
            eyebrow="Reliability"
            title="Common issues"
          >
            <div className="grid gap-3">
              <ScoreCard label="Reliability" value={vehicle.reliability} tone="slate" />
              <ListTile
                emptyLabel="No common issues returned for this analysis."
                items={vehicle.common_issues}
              />
            </div>
          </ReportSection>

          <ReportSection
            eyebrow="Market Value"
            title={vehicle.estimated_market_value || "Unknown value"}
            body="Compare this range against the seller's asking price, mileage, title status, and service history."
          />

          <ReportSection
            eyebrow="Buying Recommendation"
            title={getBuyingRecommendationTitle(buyerScore)}
            body={getBuyingRecommendation(vehicle, buyerScore)}
          />
        </aside>
        </div>
      </section>
    </article>
  );
}

function ReportSection({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] bg-white/[0.04] p-5 shadow-[0_18px_54px_rgba(0,0,0,0.18)] ring-1 ring-white/10 backdrop-blur sm:p-6">
      <p className="text-xs font-bold uppercase tracking-normal text-blue-400">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-semibold tracking-normal text-white">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p> : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </section>
  );
}

function ScoreCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "emerald" | "blue" | "slate";
}) {
  const toneClassName = {
    emerald: "bg-white/[0.04] text-emerald-300 ring-white/10",
    blue: "bg-white/[0.04] text-blue-300 ring-white/10",
    slate: "bg-white/[0.04] text-slate-300 ring-white/10",
  }[tone];

  return (
    <div className={`rounded-3xl p-4 shadow-sm ring-1 transition hover:-translate-y-0.5 hover:bg-white/[0.06] ${toneClassName}`}>
      <p className="text-xs font-bold uppercase tracking-normal">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-current" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ValueCard({ value }: { value: string }) {
  return (
    <div className="rounded-3xl bg-white/[0.04] p-4 shadow-sm ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-white/[0.06]">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-400">
        Estimated Market Value
      </p>
      <p className="mt-2 text-xl font-bold leading-7 text-white">
        {value || "Unknown"}
      </p>
    </div>
  );
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.06]">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-sm font-bold leading-5 text-white">
        {value || "Unknown"}
      </p>
    </div>
  );
}

function ListTile({ emptyLabel, items }: { emptyLabel: string; items: string[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-white/[0.04] p-4 text-sm font-bold leading-6 text-slate-400 ring-1 ring-white/10">
        {emptyLabel}
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-3xl bg-white/[0.04] p-4 text-sm font-semibold leading-6 text-white ring-1 ring-white/10 transition hover:bg-white/[0.06]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PlaceholderVehicle() {
  return (
    <div
      className="absolute inset-0 bg-slate-950"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.34)), url(${automotivePhotos.hero})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}

function calculateBuyerScore(vehicle: VehicleAnalysis) {
  const issuePenalty = Math.min(vehicle.common_issues.length * 4, 18);
  const modificationPenalty = Math.min(vehicle.visible_modifications.length * 3, 12);
  return clampScore(
    Math.round(vehicle.confidence * 0.35 + vehicle.reliability * 0.55 + 10) -
      issuePenalty -
      modificationPenalty,
  );
}

function calculateConditionScore(vehicle: VehicleAnalysis) {
  const modificationPenalty = Math.min(vehicle.visible_modifications.length * 5, 20);
  return clampScore(
    Math.round(vehicle.confidence * 0.45 + vehicle.reliability * 0.45 + 10) -
      modificationPenalty,
  );
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

function getConfidenceSummary(confidence: number) {
  if (confidence >= 85) {
    return "The AI found strong visual support for the reported vehicle identity.";
  }

  if (confidence >= 60) {
    return "The AI has moderate confidence. Verify trim, year, and options with a VIN or listing details.";
  }

  return "Confidence is below 60, so treat this as a low-confidence lead rather than a confirmed identification.";
}

function getConditionSummary(vehicle: VehicleAnalysis) {
  if (vehicle.visible_modifications.length > 0) {
    return "Visible modifications were detected. Verify workmanship, fitment, and service records in person.";
  }

  return "No obvious modifications returned. Inspect paint, panels, tires, glass, and underbody in person.";
}

function getDamageSummary() {
  return "No dedicated damage field is returned yet. Use the photos as a first pass, then verify panels, paint, glass, wheels, and underbody condition.";
}

function getBuyingRecommendationTitle(score: number) {
  if (score >= 80) {
    return "Strong candidate with normal verification";
  }

  if (score >= 60) {
    return "Worth considering after inspection";
  }

  return "Proceed carefully";
}

function getBuyingRecommendation(vehicle: VehicleAnalysis, score: number) {
  const valueText = vehicle.estimated_market_value
    ? ` Compare the asking price against the estimated ${vehicle.estimated_market_value} range.`
    : " Market value could not be determined from the returned analysis.";

  if (score >= 80) {
    return `This looks like a strong buyer candidate based on the current AI report.${valueText} Still verify service history, title status, and condition before purchase.`;
  }

  if (score >= 60) {
    return `This vehicle may be worth pursuing, but the report leaves enough uncertainty to require a pre-purchase inspection.${valueText}`;
  }

  return `Do not rely on the AI report alone for this vehicle. Confirm identity, condition, ownership history, and pricing with stronger evidence before moving forward.${valueText}`;
}
