// Central vehicle-analysis types live here so API routes, UI, and future services
// can share one contract instead of duplicating response shapes across the app.
export type VehicleAnalysis = {
  make: string;
  model: string;
  trim: string;
  year_range: string;
  confidence: number;
  summary: string;
};

// This input type leaves room for the API route to pass an uploaded image later
// without coupling the rest of the app to FormData implementation details.
export type VehicleAnalysisInput = {
  image?: FormDataEntryValue | null;
};
