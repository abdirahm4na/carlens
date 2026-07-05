import { type VinDecodeResult } from "@/types/vin";

type NhtsaDecodeResponse = {
  Results?: Array<Record<string, unknown>>;
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const vin = normalizeVin(getVinFromBody(body));

    if (!isValidVin(vin)) {
      return Response.json(
        { error: "VIN must be exactly 17 characters and cannot contain I, O, or Q." },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(
        vin,
      )}?format=json`,
      { cache: "no-store" },
    );

    if (!response.ok) {
      return Response.json(
        { error: "VIN decoder service is unavailable. Try again later." },
        { status: 502 },
      );
    }

    const decoded: unknown = await response.json();
    const result = mapNhtsaResponse(vin, decoded);

    return Response.json(result);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "VIN decoding failed unexpectedly.",
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return Response.json(
    { error: "Use POST with a VIN JSON payload to decode a vehicle." },
    { status: 405 },
  );
}

function getVinFromBody(body: unknown) {
  if (!body || typeof body !== "object") {
    return "";
  }

  const vin = (body as Record<string, unknown>).vin;
  return typeof vin === "string" ? vin : "";
}

function normalizeVin(vin: string) {
  return vin.replace(/\s|-/g, "").toUpperCase();
}

function isValidVin(vin: string) {
  return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
}

function mapNhtsaResponse(vin: string, value: unknown): VinDecodeResult {
  const response = value as NhtsaDecodeResponse;
  const row = response.Results?.[0] ?? {};

  return {
    vin,
    year: getString(row.ModelYear),
    make: getString(row.Make),
    model: getString(row.Model),
    trim: getString(row.Trim),
    engine: getEngine(row),
    body_style: getString(row.BodyClass),
    plant: [getString(row.PlantCity), getString(row.PlantState), getString(row.PlantCountry)]
      .filter(Boolean)
      .join(", "),
    manufacturer: getString(row.Manufacturer),
  };
}

function getEngine(row: Record<string, unknown>) {
  return [
    getString(row.EngineModel),
    getString(row.EngineConfiguration),
    getString(row.DisplacementL) ? `${getString(row.DisplacementL)}L` : "",
    getString(row.EngineCylinders) ? `${getString(row.EngineCylinders)} cyl` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}
