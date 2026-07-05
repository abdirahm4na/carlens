import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { type VehicleAnalysis } from "@/types/vehicle";

const VEHICLE_SCANS_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_VEHICLE_IMAGES_BUCKET ?? "vehicle-scans";

type SaveScanInput = {
  imageDataUrl: string;
  vehicleAnalysis: VehicleAnalysis;
};

type SaveScanResult = {
  id: string;
  imageUrl: string;
};

// Saves the current scan for the signed-in user by uploading the image first and
// then inserting the scan metadata row. The DB policies enforce user ownership.
export async function saveScan({
  imageDataUrl,
  vehicleAnalysis,
}: SaveScanInput): Promise<SaveScanResult> {
  const supabase = createBrowserSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("You need to sign in before saving a scan.");
  }

  const imageFile = dataUrlToFile(imageDataUrl, "vehicle-scan.jpg");
  const filePath = `${user.id}/${crypto.randomUUID()}.${getFileExtension(imageFile.type)}`;
  const { error: uploadError } = await supabase.storage
    .from(VEHICLE_SCANS_BUCKET)
    .upload(filePath, imageFile, {
      cacheControl: "3600",
      contentType: imageFile.type,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(VEHICLE_SCANS_BUCKET).getPublicUrl(filePath);

  const { data, error: insertError } = await supabase
    .from("scans")
    .insert({
      user_id: user.id,
      image_url: publicUrl,
      vehicle_analysis: vehicleAnalysis,
      thumbnail: publicUrl,
    })
    .select("id, image_url")
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  if (!data) {
    throw new Error("Scan saved but no scan record was returned.");
  }

  return {
    id: String(data.id),
    imageUrl: String(data.image_url),
  };
}

function dataUrlToFile(dataUrl: string, fileName: string) {
  const [metadata, base64Data] = dataUrl.split(",");

  if (!base64Data) {
    throw new Error("Saved scan image is not valid.");
  }

  const mimeType = metadata.match(/data:(.*);base64/)?.[1] ?? "image/jpeg";
  const binaryString = window.atob(base64Data);
  const bytes = Uint8Array.from(binaryString, (character) => character.charCodeAt(0));

  return new File([bytes], fileName, { type: mimeType });
}

function getFileExtension(mimeType: string) {
  if (mimeType === "image/png") {
    return "png";
  }

  if (mimeType === "image/webp") {
    return "webp";
  }

  return "jpg";
}
