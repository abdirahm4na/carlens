import { analyzeVehicle } from "@/lib/openai/analyzeVehicle";

// This API route is the server entry point for vehicle image analysis. The uploaded
// image stays server-side and is passed to the OpenAI Responses API from there.
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const images = formData
      .getAll("image")
      .filter((value): value is File => value instanceof File);

    if (images.length === 0) {
      return Response.json(
        { error: "At least one vehicle image is required in the image form field." },
        { status: 400 },
      );
    }

    const analysis = await analyzeVehicle({ images: images.slice(0, 8) });

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
    { error: "Use POST with multipart form data to analyze vehicle images." },
    { status: 405 },
  );
}
