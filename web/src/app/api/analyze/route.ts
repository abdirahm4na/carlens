import { analyzeVehicle } from "@/lib/openai/analyzeVehicle";

// This API route is the server entry point for vehicle image analysis. The uploaded
// image stays server-side and is passed to the OpenAI Responses API from there.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json(
        { error: "A vehicle image is required in the image form field." },
        { status: 400 },
      );
    }

    const analysis = await analyzeVehicle({ image });

    return Response.json(analysis);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Vehicle analysis failed unexpectedly.",
      },
      { status: 500 },
    );
  }
}

// GET is intentionally unsupported because analysis should be triggered by an
// uploaded image request, not fetched as a cacheable read endpoint.
export function GET() {
  return Response.json(
    { error: "Use POST with multipart form data to analyze a vehicle image." },
    { status: 405 },
  );
}
