import { chatAboutVehicle, isVehicleChatRequest } from "@/lib/openai/chatVehicle";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isVehicleChatRequest(body)) {
      return Response.json(
        { error: "Invalid chat request payload." },
        { status: 400 },
      );
    }

    const message = await chatAboutVehicle(body);

    return Response.json({ message });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Vehicle chat failed unexpectedly.",
      },
      { status: 500 },
    );
  }
}
