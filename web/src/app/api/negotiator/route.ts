import { analyzeListingScreenshot } from "@/lib/openai/negotiator";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");

    if (!(image instanceof File)) {
      return Response.json(
        { error: "A listing screenshot is required in the image form field." },
        { status: 400 },
      );
    }

    const analysis = await analyzeListingScreenshot({ image });

    return Response.json(analysis);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Listing negotiation analysis failed unexpectedly.",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return Response.json(
    { error: "Use POST with multipart form data to analyze a listing screenshot." },
    { status: 405 },
  );
}
