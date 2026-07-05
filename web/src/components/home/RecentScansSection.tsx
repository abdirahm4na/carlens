import { RecentScanCard, type RecentScanCardData } from "./RecentScanCard";
import { SectionHeader } from "../ui/SectionHeader";

export type RecentScan = RecentScanCardData;

type RecentScansSectionProps = {
  scans: RecentScan[];
};

export function RecentScansSection({ scans }: RecentScansSectionProps) {
  return (
    <section id="recent-scans" className="mt-8">
      <SectionHeader title="Recent Scans" actionLabel="See All" actionHref="/history" />

      <div className="grid grid-cols-2 gap-4">
        {scans.map((scan) => (
          <RecentScanCard key={scan.id} scan={scan} />
        ))}
      </div>
    </section>
  );
}
