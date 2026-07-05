import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  actionHref?: string;
};

export function SectionHeader({ title, actionLabel, actionHref }: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <h2 className="text-xl font-bold tracking-normal text-slate-950">{title}</h2>
      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="shrink-0 text-sm font-bold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
