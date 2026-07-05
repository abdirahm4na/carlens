// Prompt builders are isolated from API logic so future prompt iteration can happen
// without touching route handlers, OpenAI client setup, or React components.
export function buildVehicleAnalysisPrompt() {
  return [
    "Identify the vehicle in the uploaded image.",
    "Return make, model, trim, likely year range, confidence, and a concise summary.",
    "Use conservative language when the image quality is low or details are uncertain.",
  ].join(" ");
}
