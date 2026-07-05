export type NegotiatorAnalysis = {
  make: string;
  model: string;
  year: string;
  mileage: string;
  price: string;
  location: string;
  seller_claims: string[];
  modifications: string[];
  title_status: string;
  red_flags: string[];
  price_assessment: "high" | "fair" | "low" | "unknown";
  message_to_seller: string;
  questions_to_ask: string[];
  negotiation_angle: string;
  suggested_offer_range: string;
  worth_seeing_in_person: "yes" | "no" | "maybe";
  summary: string;
};

export type NegotiatorInput = {
  image: File;
};
