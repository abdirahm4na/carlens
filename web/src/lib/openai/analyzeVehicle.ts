import "server-only";

import { buildVehicleAnalysisPrompt } from "@/lib/prompts/vehicleAnalysisPrompt";
import { isVehicleAnalysis } from "@/lib/analysisSession";
import { type VehicleAnalysis, type VehicleAnalysisInput } from "@/types/vehicle";
import { createOpenAIClient, getOpenAIClientConfig } from "./client";

// The analysis service is the server-only boundary for OpenAI calls. It receives
// the uploaded image from the route, sends it through the Responses API, and
// returns only validated JSON to the rest of the application.
export async function analyzeVehicle(
  input: VehicleAnalysisInput,
): Promise<VehicleAnalysis> {
  const client = createOpenAIClient();
  const { model } = getOpenAIClientConfig();
  const imageUrls = await Promise.all(input.images.map(fileToDataUrl));

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `${buildVehicleAnalysisPrompt()}\n\nUse all ${imageUrls.length} uploaded photos as one combined vehicle appraisal. Treat the first photo as the primary image and use the remaining photos as supporting evidence.`,
          },
          ...imageUrls.map((imageUrl) => ({
            type: "input_image" as const,
            image_url: imageUrl,
            detail: "high" as const,
          })),
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "vehicle_analysis",
        strict: true,
        schema: vehicleAnalysisJsonSchema,
      },
    },
  });

  return parseVehicleAnalysis(response.output_text);
}

const vehicleAnalysisJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    make: { type: "string" },
    model: { type: "string" },
    trim: { type: "string" },
    generation: { type: "string" },
    year: { type: "string" },
    confidence: { type: "integer", minimum: 0, maximum: 100 },
    reliability: { type: "integer", minimum: 0, maximum: 100 },
    engine: { type: "string" },
    horsepower: { type: "string" },
    drivetrain: { type: "string" },
    transmission: { type: "string" },
    estimated_market_value: { type: "string" },
    visible_modifications: { type: "array", items: { type: "string" } },
    exterior_color: { type: "string" },
    common_issues: { type: "array", items: { type: "string" } },
    summary: { type: "string" },
  },
  required: [
    "make",
    "model",
    "trim",
    "generation",
    "year",
    "confidence",
    "reliability",
    "engine",
    "horsepower",
    "drivetrain",
    "transmission",
    "estimated_market_value",
    "visible_modifications",
    "exterior_color",
    "common_issues",
    "summary",
  ],
};

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = file.type || "image/jpeg";

  return `data:${mimeType};base64,${base64Image}`;
}

function parseVehicleAnalysis(outputText: string) {
  try {
    const parsedAnalysis: unknown = JSON.parse(outputText);

    if (!isVehicleAnalysis(parsedAnalysis)) {
      throw new Error("OpenAI returned JSON that does not match VehicleAnalysis.");
    }

    return parsedAnalysis;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to parse vehicle analysis JSON: ${error.message}`
        : "Failed to parse vehicle analysis JSON.",
    );
  }
}
