import { RecentScanCard, type RecentScanCardData } from "./RecentScanCard";
import { SectionHeader } from "../ui/SectionHeader";

export type RecentScan = RecentScanCardData;

type RecentScansSectionProps = {
  scans: RecentScan[];
};

export function RecentScansSection({ scans }: RecentScansSectionProps) {
  return (
    <section id="recent-scans" className="mt-0">
      <SectionHeader title="Recent" actionLabel="Garage" actionHref="/history" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {scans.map((scan) => (
          <RecentScanCard key={scan.id} scan={scan} />
        ))}
      </div>
    </section>
  );
}
