import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { isVehicleAnalysis } from "@/lib/analysisSession";
import { type VehicleAnalysis } from "@/types/vehicle";

export type SavedScan = {
  id: string;
  user_id: string;
  image_url: string;
  thumbnail: string | null;
  vehicle_analysis: VehicleAnalysis;
  created_at: string;
};

type ScanRow = {
  id: string;
  user_id: string;
  image_url: string;
  thumbnail: string | null;
  vehicle_analysis: unknown;
  created_at: string;
};

export class HistoryAuthRequiredError extends Error {
  constructor() {
    super("You need to log in to view scan history.");
    this.name = "HistoryAuthRequiredError";
  }
}

export async function listSavedScans() {
  const supabase = createBrowserSupabaseClient();
  const user = await getCurrentUserId(supabase);
  const { data, error } = await supabase
    .from("scans")
    .select("id, user_id, image_url, thumbnail, vehicle_analysis, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(toSavedScan);
}

export async function getSavedScanById(scanId: string) {
  const supabase = createBrowserSupabaseClient();
  const user = await getCurrentUserId(supabase);
  const { data, error } = await supabase
    .from("scans")
    .select("id, user_id, image_url, thumbnail, vehicle_analysis, created_at")
    .eq("user_id", user.id)
    .eq("id", scanId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return toSavedScan(data);
}

async function getCurrentUserId(supabase: ReturnType<typeof createBrowserSupabaseClient>) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new HistoryAuthRequiredError();
  }

  return user;
}

function toSavedScan(row: ScanRow): SavedScan {
  if (!isVehicleAnalysis(row.vehicle_analysis)) {
    throw new Error("Saved scan has invalid vehicle analysis data.");
  }

  return {
    ...row,
    vehicle_analysis: row.vehicle_analysis,
  };
}
