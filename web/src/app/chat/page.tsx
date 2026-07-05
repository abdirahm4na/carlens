import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatPanel } from "@/components/chat/ChatPanel";
import {
  VehicleContextCard,
  type ChatVehicleContext,
} from "@/components/chat/VehicleContextCard";

const vehicleContext: ChatVehicleContext = {
  year: 2023,
  make: "Porsche",
  model: "911",
  trim: "Carrera S",
  confidenceScore: 98,
  estimatedMarketValue: "$118,000 - $132,000",
};

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#F5F7FB] px-5 py-8 text-slate-950 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col">
        <ChatHeader />
        <div className="mt-6 space-y-4">
          <VehicleContextCard vehicle={vehicleContext} />
          <ChatPanel vehicle={vehicleContext} />
        </div>
      </div>
    </main>
  );
}
