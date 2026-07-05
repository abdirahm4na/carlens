"use client";

import { useState } from "react";
import { type NegotiatorAnalysis } from "@/types/negotiator";

type NegotiatorReportProps = {
  analysis: NegotiatorAnalysis;
};

export function NegotiatorReport({ analysis }: NegotiatorReportProps) {
  const [copied, setCopied] = useState(false);

  async function copySellerMessage() {
    if (!analysis.message_to_seller) {
      return;
    }

    try {
      await navigator.clipboard.writeText(analysis.message_to_seller);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <article className="space-y-6">
      <section className="rounded-[2rem] bg-white/[0.04] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.24)] ring-1 ring-white/10 sm:p-6">
        <p className="text-xs font-bold uppercase tracking-normal text-blue-400">
          Offer Strategy
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          {[analysis.year, analysis.make, analysis.model].filter(Boolean).join(" ") ||
            "Listing details unclear"}
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-400">
          {analysis.negotiation_angle ||
            analysis.summary ||
            "Use the visible listing details to negotiate carefully."}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Metric label="Suggested Offer" value={analysis.suggested_offer_range || "Unknown"} />
          <Metric label="Price" value={analysis.price || "Unknown"} />
          <Metric label="Worth Seeing?" value={capitalize(analysis.worth_seeing_in_person)} />
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <InfoCard title="Listing Details">
          <Detail label="Mileage" value={analysis.mileage} />
          <Detail label="Location" value={analysis.location} />
          <Detail label="Title Status" value={analysis.title_status} />
          <Detail label="Price Assessment" value={capitalize(analysis.price_assessment)} />
        </InfoCard>

        <InfoCard title="Seller Message">
          <div className="rounded-3xl bg-blue-500/10 p-4 text-sm font-semibold leading-6 text-blue-100 ring-1 ring-blue-400/20">
            {analysis.message_to_seller || "No seller message returned."}
          </div>
          <button
            type="button"
            onClick={copySellerMessage}
            disabled={!analysis.message_to_seller}
            className="mt-4 rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition enabled:hover:-translate-y-0.5 enabled:hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-slate-500"
          >
            {copied ? "Copied" : "Copy message"}
          </button>
        </InfoCard>
      </section>

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
    <section className="rounded-[2rem] bg-white/[0.04] p-5 shadow-[0_16px_50px_rgba(0,0,0,0.18)] ring-1 ring-white/10">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
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
              className="rounded-2xl bg-white/[0.04] p-3 text-sm font-semibold leading-6 text-slate-200 ring-1 ring-white/10"
            >
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-2xl bg-white/[0.04] p-3 text-sm font-semibold text-slate-500 ring-1 ring-white/10">
          {emptyLabel}
        </p>
      )}
    </InfoCard>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/10">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-white">{value || "Unknown"}</p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10">
      <p className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-bold text-white">{value}</p>
    </div>
  );
}

function capitalize(value: string) {
  return value ? value.slice(0, 1).toUpperCase() + value.slice(1) : "Unknown";
}
