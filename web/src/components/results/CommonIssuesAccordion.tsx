"use client";

import { useState } from "react";

export type CommonIssue = {
  id: string;
  title: string;
  description: string;
};

type CommonIssuesAccordionProps = {
  issues: CommonIssue[];
};

export function CommonIssuesAccordion({ issues }: CommonIssuesAccordionProps) {
  const [openIssueId, setOpenIssueId] = useState<string | undefined>(issues[0]?.id);

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold tracking-normal text-slate-950">Common Issues</h2>

      <div className="mt-5 divide-y divide-slate-200">
        {issues.map((issue) => {
          const isOpen = issue.id === openIssueId;

          return (
            <div key={issue.id} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => setOpenIssueId(isOpen ? undefined : issue.id)}
                className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-bold text-slate-950">{issue.title}</span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen ? (
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                  {issue.description}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
