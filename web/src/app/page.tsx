import { AIHeroCard } from "@/components/home/AIHeroCard";
import { BottomNavigation } from "@/components/home/BottomNavigation";
import { GreetingSection } from "@/components/home/GreetingSection";
import { RecentScansSection, type RecentScan } from "@/components/home/RecentScansSection";
import {
  TrendingVehiclesSection,
  type TrendingVehicle,
} from "@/components/home/TrendingVehiclesSection";
import { UploadPhotoCard } from "@/components/home/UploadPhotoCard";

const recentScans: RecentScan[] = [
  {
    id: "porsche-911",
    name: "2023 Porsche 911",
    scannedAt: "Today",
    confidence: "98%",
    accentClassName: "from-sky-300 via-blue-500 to-slate-900",
  },
  {
    id: "bmw-m4",
    name: "2022 BMW M4",
    scannedAt: "Yesterday",
    confidence: "96%",
    accentClassName: "from-zinc-200 via-neutral-500 to-black",
  },
];

const trendingVehicles: TrendingVehicle[] = [
  {
    id: "tesla-model-s",
    name: "Tesla Model S",
    category: "Electric sedan",
    trend: "+18%",
  },
  {
    id: "ford-bronco",
    name: "Ford Bronco",
    category: "Off-road SUV",
    trend: "+12%",
  },
  {
    id: "toyota-supra",
    name: "Toyota Supra",
    category: "Sports coupe",
    trend: "+9%",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-28 pt-8 sm:px-6">
        <GreetingSection greeting="Good morning" userName="Abdi" />

        <div className="mt-7 space-y-4">
          <AIHeroCard />
          <UploadPhotoCard />
        </div>

        <RecentScansSection scans={recentScans} />
        <TrendingVehiclesSection vehicles={trendingVehicles} />
      </div>

      <BottomNavigation />
    </main>
  );
}
