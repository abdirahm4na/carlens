import "server-only";

import { buildNegotiatorPrompt } from "@/lib/prompts/negotiatorPrompt";
import {
  type NegotiatorAnalysis,
  type NegotiatorInput,
} from "@/types/negotiator";
import { createOpenAIClient, getOpenAIClientConfig } from "./client";

export async function analyzeListingScreenshot({
  image,
}: NegotiatorInput): Promise<NegotiatorAnalysis> {
  const client = createOpenAIClient();
  const { model } = getOpenAIClientConfig();
  const imageUrl = await fileToDataUrl(image);

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: buildNegotiatorPrompt() },
          { type: "input_image", image_url: imageUrl, detail: "high" },
        ],
      },
    ],
    text: {
      format: {
        type: "json_schema",
        name: "listing_negotiation_analysis",
        strict: true,
        schema: negotiatorJsonSchema,
      },
    },
  });

  return parseNegotiatorAnalysis(response.output_text);
}

const negotiatorJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    make: { type: "string" },
    model: { type: "string" },
    year: { type: "string" },
    mileage: { type: "string" },
    price: { type: "string" },
    location: { type: "string" },
    seller_claims: { type: "array", items: { type: "string" } },
    modifications: { type: "array", items: { type: "string" } },
    title_status: { type: "string" },
    red_flags: { type: "array", items: { type: "string" } },
    price_assessment: {
      type: "string",
      enum: ["high", "fair", "low", "unknown"],
    },
    message_to_seller: { type: "string" },
    questions_to_ask: { type: "array", items: { type: "string" } },
    negotiation_angle: { type: "string" },
    suggested_offer_range: { type: "string" },
    worth_seeing_in_person: {
      type: "string",
      enum: ["yes", "no", "maybe"],
    },
    summary: { type: "string" },
  },
  required: [
    "make",
    "model",
    "year",
    "mileage",
    "price",
    "location",
    "seller_claims",
    "modifications",
    "title_status",
    "red_flags",
    "price_assessment",
    "message_to_seller",
    "questions_to_ask",
    "negotiation_angle",
    "suggested_offer_range",
    "worth_seeing_in_person",
    "summary",
  ],
};

function isNegotiatorAnalysis(value: unknown): value is NegotiatorAnalysis {
  if (!value || typeof value !== "object") {
    return false;
  }

  const analysis = value as Record<string, unknown>;

  return (
    typeof analysis.make === "string" &&
    typeof analysis.model === "string" &&
    typeof analysis.year === "string" &&
    typeof analysis.mileage === "string" &&
    typeof analysis.price === "string" &&
    typeof analysis.location === "string" &&
    isStringArray(analysis.seller_claims) &&
    isStringArray(analysis.modifications) &&
    typeof analysis.title_status === "string" &&
    isStringArray(analysis.red_flags) &&
    isPriceAssessment(analysis.price_assessment) &&
    typeof analysis.message_to_seller === "string" &&
    isStringArray(analysis.questions_to_ask) &&
    typeof analysis.negotiation_angle === "string" &&
    typeof analysis.suggested_offer_range === "string" &&
    isWorthSeeing(analysis.worth_seeing_in_person) &&
    typeof analysis.summary === "string"
  );
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isPriceAssessment(value: unknown): value is NegotiatorAnalysis["price_assessment"] {
  return value === "high" || value === "fair" || value === "low" || value === "unknown";
}

function isWorthSeeing(value: unknown): value is NegotiatorAnalysis["worth_seeing_in_person"] {
  return value === "yes" || value === "no" || value === "maybe";
}

async function fileToDataUrl(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString("base64");
  const mimeType = file.type || "image/jpeg";

  return `data:${mimeType};base64,${base64Image}`;
}

function parseNegotiatorAnalysis(outputText: string) {
  try {
    const parsedAnalysis: unknown = JSON.parse(outputText);

    if (!isNegotiatorAnalysis(parsedAnalysis)) {
      throw new Error("OpenAI returned JSON that does not match NegotiatorAnalysis.");
    }

    return parsedAnalysis;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? `Failed to parse negotiator JSON: ${error.message}`
        : "Failed to parse negotiator JSON.",
    );
  }
}
