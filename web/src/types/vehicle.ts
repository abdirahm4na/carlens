// Central vehicle-analysis types live here so API routes, UI, and future services
// can share one contract instead of duplicating response shapes across the app.
export type VehicleAnalysis = {
  make: string;
  model: string;
  trim: string;
  generation: string;
  year: string;
  confidence: number;
  reliability: number;
  engine: string;
  horsepower: string;
  drivetrain: string;
  transmission: string;
  estimated_market_value: string;
  visible_modifications: string[];
  exterior_color: string;
  common_issues: string[];
  summary: string;
};

// This input type leaves room for the API route to pass an uploaded image later
// without coupling the rest of the app to FormData implementation details.
export type VehicleAnalysisInput = {
  images: File[];
};
