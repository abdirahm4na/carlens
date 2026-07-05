import "server-only";

import OpenAI from "openai";

// This file is the single home for OpenAI client configuration. It is imported
// only by server code so the API key never reaches browser bundles.

export type OpenAIClientConfig = {
  apiKey: string;
  model: string;
};

// API keys must only be read on the server from environment variables. Never pass
// this config into Client Components or expose it through API responses.
export function getOpenAIClientConfig(): OpenAIClientConfig {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  return {
    apiKey,
    model: process.env.OPENAI_VEHICLE_MODEL ?? "gpt-5",
  };
}

export function createOpenAIClient() {
  const { apiKey } = getOpenAIClientConfig();

  return new OpenAI({ apiKey });
}
