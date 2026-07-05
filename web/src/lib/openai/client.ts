// This file is the single future home for OpenAI client configuration.
// It intentionally does not instantiate an SDK client yet because CarLens is still
// using mocked analysis data and no OpenAI package has been added.

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
    model: process.env.OPENAI_VEHICLE_MODEL ?? "gpt-4.1-mini",
  };
}
