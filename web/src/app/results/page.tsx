import { ResultsActions } from "@/components/results/ResultsActions";
import { ResultsHeader } from "@/components/results/ResultsHeader";
import { type VehicleSummary } from "@/components/results/VehicleSummaryCard";
import { VehicleSummaryWithSessionData } from "@/components/results/VehicleSummaryWithSessionData";

const fallbackVehicle: VehicleSummary = {
  make: "Porsche",
  model: "911",
  trim: "GT3",
  generation: "992.1",
  year: "2022-2024",
  confidence: 98,
  reliability: 84,
  engine: "4.0L naturally aspirated flat-six",
  horsepower: "502 hp",
  drivetrain: "Rear-wheel drive",
  transmission: "6-speed manual or 7-speed PDK",
  estimated_market_value: "$165,000 - $220,000",
  visible_modifications: [],
  exterior_color: "Unknown",
  common_issues: [
    "Track use can accelerate brake, tire, and suspension wear",
    "Front splitter and underbody aero pieces are vulnerable to scraping",
  ],
  summary:
    "Fallback appraisal data shown because no stored AI analysis is available.",
};

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#05070A] px-5 py-7 text-slate-950 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <ResultsHeader />

        <div className="mt-8 space-y-6">
          <VehicleSummaryWithSessionData fallbackVehicle={fallbackVehicle} />
          <ResultsActions />
        </div>
      </div>
    </main>
  );
}
