import Image from "next/image";
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
    <article className="space-y-5">
      <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-200">
        <div className="relative min-h-80 bg-gradient-to-br from-sky-300 via-blue-600 to-slate-950">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={title || "Analyzed vehicle"}
              fill
              unoptimized
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          ) : (
            <PlaceholderVehicle />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-24 text-white">
            <p className="text-xs font-bold uppercase tracking-normal text-blue-100">
              Premium AI Inspection Report
            </p>
            <h2 className="mt-2 text-4xl font-bold tracking-normal">
              {title || "Vehicle not identified"}
            </h2>
            <p className="mt-1 text-lg font-semibold text-slate-200">
              {vehicle.trim || "Trim unknown"}
            </p>
            {photoCount > 1 ? (
              <p className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/25">
                Analysis used {photoCount} uploaded photos
              </p>
            ) : null}
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
        eyebrow="Vehicle Identity"
        title="Identified vehicle"
        body={vehicle.summary || "No appraisal summary returned."}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailTile label="Make" value={vehicle.make} />
          <DetailTile label="Model" value={vehicle.model} />
          <DetailTile label="Trim" value={vehicle.trim} />
          <DetailTile label="Generation" value={vehicle.generation} />
          <DetailTile label="Year" value={vehicle.year} />
          <DetailTile label="Exterior Color" value={vehicle.exterior_color} />
        </div>
      </ReportSection>

      <ReportSection
        eyebrow="AI Confidence"
        title={`${vehicle.confidence}% identification confidence`}
        body={getConfidenceSummary(vehicle.confidence)}
      >
        <details className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <summary className="cursor-pointer text-sm font-bold text-slate-950">
            Confidence explanation
          </summary>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            The confidence score reflects how strongly the uploaded photo evidence
            supports the reported make, model, trim, generation, and year. Low scores
            mean the image or available context was insufficient, and the result should
            be treated as a starting point for manual inspection.
          </p>
        </details>
      </ReportSection>

      <ReportSection eyebrow="Specs" title="Factory specification snapshot">
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailTile label="Engine" value={vehicle.engine} />
          <DetailTile label="Horsepower" value={vehicle.horsepower} />
          <DetailTile label="Drivetrain" value={vehicle.drivetrain} />
          <DetailTile label="Transmission" value={vehicle.transmission} />
        </div>
      </ReportSection>

      <ReportSection
        eyebrow="Visible Modifications"
        title="Observed non-factory changes"
      >
        <ListTile
          emptyLabel="No visible modifications identified from the uploaded photos."
          items={vehicle.visible_modifications}
        />
      </ReportSection>

      <ReportSection
        eyebrow="Condition & Damage"
        title="Visual condition read"
        body={getConditionSummary(vehicle)}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <DetailTile label="Condition Score" value={`${conditionScore}/100`} />
          <DetailTile
            label="Damage Observations"
            value="No dedicated damage field returned by the current AI schema."
          />
        </div>
      </ReportSection>

      <ReportSection
        eyebrow="Reliability & Common Issues"
        title="Ownership risk signals"
      >
        <div className="grid gap-3 sm:grid-cols-[12rem_1fr]">
          <ScoreCard label="Reliability" value={vehicle.reliability} tone="slate" />
          <ListTile
            emptyLabel="No common issues returned for this analysis."
            items={vehicle.common_issues}
          />
        </div>
      </ReportSection>

      <ReportSection
        eyebrow="Buying Recommendation"
        title={getBuyingRecommendationTitle(buyerScore)}
        body={getBuyingRecommendation(vehicle, buyerScore)}
      />
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
    <section className="rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-6">
      <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-normal text-slate-950">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-6 text-slate-500">{body}</p> : null}
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
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    blue: "bg-blue-50 text-blue-700 ring-blue-100",
    slate: "bg-slate-50 text-slate-700 ring-slate-200",
  }[tone];

  return (
    <div className={`rounded-3xl p-4 shadow-sm ring-1 ${toneClassName}`}>
      <p className="text-xs font-bold uppercase tracking-normal">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/80">
        <div className="h-full rounded-full bg-current" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ValueCard({ value }: { value: string }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">
        Estimated Market Value
      </p>
      <p className="mt-2 text-xl font-bold leading-7 text-slate-950">
        {value || "Unknown"}
      </p>
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

function ListTile({ emptyLabel, items }: { emptyLabel: string; items: string[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl bg-slate-50 p-4 text-sm font-bold leading-6 text-slate-500 ring-1 ring-slate-200">
        {emptyLabel}
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-3xl bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-950 ring-1 ring-slate-200"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function PlaceholderVehicle() {
  return (
    <>
      <div className="absolute bottom-20 left-8 right-8 h-16 rounded-t-[4rem] bg-white/85 shadow-2xl" />
      <div className="absolute bottom-16 left-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
      <div className="absolute bottom-16 right-16 size-9 rounded-full bg-slate-950 ring-8 ring-white/90" />
      <div className="absolute left-6 top-6 rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-normal text-white ring-1 ring-white/25">
        Placeholder Image
      </div>
    </>
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
  return clampScore(Math.round(vehicle.confidence * 0.45 + vehicle.reliability * 0.45 + 10) - modificationPenalty);
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
    return "The photos show visible modifications, so condition should be verified carefully in person.";
  }

  return "No dedicated damage assessment was returned. Use the image review as a first pass and verify paint, panels, glass, wheels, tires, and underbody condition in person.";
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
