import { CommonIssuesAccordion } from "@/components/results/CommonIssuesAccordion";
import { ResultsActions } from "@/components/results/ResultsActions";
import { ResultsHeader } from "@/components/results/ResultsHeader";
import { SpecsGrid, type VehicleSpec } from "@/components/results/SpecsGrid";
import { type VehicleSummary } from "@/components/results/VehicleSummaryCard";
import { VehicleSummaryWithStoredImage } from "@/components/results/VehicleSummaryWithStoredImage";

const vehicle: VehicleSummary = {
  year: 2023,
  make: "Porsche",
  model: "911",
  trim: "Carrera S",
  confidenceScore: 98,
  reliabilityScore: 86,
  estimatedMarketValue: "$118,000 - $132,000",
};

const specs: VehicleSpec[] = [
  { label: "Engine", value: "3.0L twin-turbo flat-six" },
  { label: "Horsepower", value: "443 hp" },
  { label: "Drivetrain", value: "Rear-wheel drive" },
  { label: "Transmission", value: "8-speed PDK" },
  { label: "Body Style", value: "Coupe" },
  { label: "Fuel Economy", value: "18 city / 24 highway" },
];

const commonIssues = [
  {
    id: "front-lift",
    title: "Front axle lift wear",
    description:
      "Inspect the lift system for slow response, uneven height, or warning messages during startup.",
  },
  {
    id: "pdk-service",
    title: "PDK service history",
    description:
      "Confirm the transmission service interval was followed and check for hesitation during low-speed shifts.",
  },
  {
    id: "brakes-tires",
    title: "Brake and tire wear",
    description:
      "Performance tires and brakes can wear quickly. Review tread depth, rotor condition, and recent replacement records.",
  },
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-8 text-slate-950 sm:px-6">
      <div className="mx-auto w-full max-w-3xl">
        <ResultsHeader />

        <div className="mt-8 space-y-6">
          <VehicleSummaryWithStoredImage vehicle={vehicle} />
          <SpecsGrid specs={specs} />
          <CommonIssuesAccordion issues={commonIssues} />
          <ResultsActions />
        </div>
      </div>
    </main>
  );
}
