import { type NegotiatorAnalysis } from "@/types/negotiator";

type NegotiatorReportProps = {
  analysis: NegotiatorAnalysis;
};

export function NegotiatorReport({ analysis }: NegotiatorReportProps) {
  return (
    <article className="space-y-5">
      <section className="rounded-[2rem] bg-white/95 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-normal text-blue-600">
          Negotiation Read
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          {[analysis.year, analysis.make, analysis.model].filter(Boolean).join(" ") ||
            "Listing details unclear"}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {analysis.summary || "CarLens extracted the visible listing details below."}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="Price" value={analysis.price || "Unknown"} />
          <Metric label="Assessment" value={capitalize(analysis.price_assessment)} />
          <Metric label="See in person" value={capitalize(analysis.worth_seeing_in_person)} />
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <InfoCard title="Visible Listing Details">
          <Detail label="Mileage" value={analysis.mileage} />
          <Detail label="Location" value={analysis.location} />
          <Detail label="Title Status" value={analysis.title_status} />
          <Detail label="Suggested Offer" value={analysis.suggested_offer_range} />
        </InfoCard>

        <InfoCard title="Negotiation Angle">
          <p className="text-sm font-semibold leading-6 text-slate-700">
            {analysis.negotiation_angle || "No negotiation angle returned."}
          </p>
        </InfoCard>
      </section>

      <InfoCard title="Message to Send Seller">
        <p className="rounded-3xl bg-blue-50 p-4 text-sm font-semibold leading-6 text-blue-900 ring-1 ring-blue-100">
          {analysis.message_to_seller || "No seller message returned."}
        </p>
      </InfoCard>

      <section className="grid gap-4 sm:grid-cols-2">
        <ListCard title="Questions to Ask" items={analysis.questions_to_ask} />
        <ListCard title="Red Flags" items={analysis.red_flags} emptyLabel="No red flags visible." />
        <ListCard title="Seller Claims" items={analysis.seller_claims} />
        <ListCard title="Modifications" items={analysis.modifications} />
      </section>
    </article>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[2rem] bg-white/95 p-5 shadow-[0_16px_44px_rgba(15,23,42,0.07)] ring-1 ring-slate-200/80">
      <h3 className="text-xl font-semibold text-slate-950">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function ListCard({
  title,
  items,
  emptyLabel = "Nothing visible in the screenshot.",
}: {
  title: string;
  items: string[];
  emptyLabel?: string;
}) {
  return (
    <InfoCard title={title}>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item}
              className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700 ring-1 ring-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-slate-500 ring-1 ring-slate-200">
          {emptyLabel}
        </p>
      )}
    </InfoCard>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value || "Unknown"}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-slate-950">{value}</p>
    </div>
  );
}

function capitalize(value: string) {
  return value ? value.slice(0, 1).toUpperCase() + value.slice(1) : "Unknown";
}
