import { buildVehicleAnalysisPrompt } from "@/lib/prompts/vehicleAnalysisPrompt";
import { type VehicleAnalysis, type VehicleAnalysisInput } from "@/types/vehicle";

// The analysis service is the boundary where the future OpenAI request will live.
// For now it returns stable mocked data so the frontend and API contract can move
// forward before model credentials, billing, and image handling are connected.
export async function analyzeVehicle(
  input: VehicleAnalysisInput,
): Promise<VehicleAnalysis> {
  // Keep these references wired now so future implementation work has an obvious
  // place to use both the uploaded image and the production prompt.
  void input.image;
  void buildVehicleAnalysisPrompt();

  return {
    make: "Porsche",
    model: "911",
    trim: "GT3",
    year_range: "2022-2024",
    confidence: 98,
    summary: "High-performance sports car.",
  };
}
