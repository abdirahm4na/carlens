import "server-only";

import { isVehicleAnalysis } from "@/lib/analysisSession";
import { type ChatMessage } from "@/components/chat/types";
import { type VehicleAnalysis } from "@/types/vehicle";
import { createOpenAIClient, getOpenAIClientConfig } from "./client";

export type VehicleChatInput = {
  messages: ChatMessage[];
  vehicleAnalysis?: VehicleAnalysis;
  imageDataUrl?: string;
};

export async function chatAboutVehicle({
  messages,
  vehicleAnalysis,
  imageDataUrl,
}: VehicleChatInput) {
  const client = createOpenAIClient();
  const { model } = getOpenAIClientConfig();
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");

  if (!latestUserMessage) {
    throw new Error("A user message is required.");
  }

  const response = await client.responses.create({
    model,
    input: [
      {
        role: "user",
        content: buildVehicleChatContent({
          messages,
          vehicleAnalysis,
          imageDataUrl,
        }),
      },
    ],
  });

  const answer = response.output_text.trim();

  if (!answer) {
    throw new Error("OpenAI returned an empty chat response.");
  }

  return answer;
}

export function isVehicleChatRequest(value: unknown): value is VehicleChatInput {
  if (!value || typeof value !== "object") {
    return false;
  }

  const request = value as Record<string, unknown>;
  const hasValidMessages =
    Array.isArray(request.messages) &&
    request.messages.every(
      (message) =>
        message &&
        typeof message === "object" &&
        (message as Record<string, unknown>).role !== "system" &&
        ((message as Record<string, unknown>).role === "user" ||
          (message as Record<string, unknown>).role === "assistant") &&
        typeof (message as Record<string, unknown>).content === "string",
    );
  const hasValidAnalysis =
    request.vehicleAnalysis === undefined || isVehicleAnalysis(request.vehicleAnalysis);
  const hasValidImage =
    request.imageDataUrl === undefined ||
    (typeof request.imageDataUrl === "string" &&
      request.imageDataUrl.startsWith("data:image/"));

  return hasValidMessages && hasValidAnalysis && hasValidImage;
}

function buildVehicleChatContent({
  messages,
  vehicleAnalysis,
  imageDataUrl,
}: VehicleChatInput) {
  const contextText = vehicleAnalysis
    ? JSON.stringify(vehicleAnalysis, null, 2)
    : "No vehicle analysis JSON was provided.";
  const conversationText = messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n");
  const content: Array<
    | { type: "input_text"; text: string }
    | { type: "input_image"; image_url: string; detail: "high" }
  > = [
    {
      type: "input_text",
      text: `You are CarLens AI, a concise automotive assistant.

Answer the user's latest question using the vehicle analysis JSON and uploaded image when available.
Be honest when the context or image is insufficient. Do not invent facts.
If details are uncertain, say what is uncertain and suggest what to inspect.
Keep answers concise, practical, and automotive-focused.

Vehicle analysis JSON:
${contextText}

Chat history:
${conversationText}`,
    },
  ];

  if (imageDataUrl) {
    content.push({ type: "input_image", image_url: imageDataUrl, detail: "high" });
  }

  return content;
}
