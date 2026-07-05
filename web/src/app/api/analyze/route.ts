import { analyzeVehicle } from "@/lib/openai/analyzeVehicle";

// This API route is the server entry point for vehicle image analysis. It accepts
// multipart form data now so an uploaded image can be passed through later, while
// still returning mocked JSON until the OpenAI integration is intentionally enabled.
export async function POST(request: Request) {
  const formData = await request.formData().catch(() => undefined);
  const image = formData?.get("image");
  const analysis = await analyzeVehicle({ image });

  return Response.json(analysis);
}

// GET is intentionally unsupported because analysis should be triggered by an
// uploaded image request, not fetched as a cacheable read endpoint.
export function GET() {
  return Response.json(
    { error: "Use POST with multipart form data to analyze a vehicle image." },
    { status: 405 },
  );
}
