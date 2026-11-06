export type StayDetails = {
  optionId: string;
  listingTitle: string;
  propertyType: string;
  neighbourhood: string;
  nights: number;
  pricePerNightUsd: number;
  totalUsd: number;
  rating: number;
  reviewCount: number;
  hostFirstName: string;
  highlight: string;
  checkIn: string;
  checkOut: string;
};

export type ExperienceDetails = {
  optionId: string;
  experienceTitle: string;
  category: string;
  hostFirstName: string;
  date: string;
  startTime: string;
  durationHours: number;
  totalUsd: number;
  rating: number;
  meetingPoint: string;
};

export type FoodDetails = {
  optionId: string;
  placeName: string;
  cuisine: string;
  neighbourhood: string;
  meal: string;
  priceLevel: string;
  estCostUsd: number;
  walkFromStayMin: number;
  bookingNote: string;
};

export type TripCard =
  | { cardType: "stay"; details: StayDetails }
  | { cardType: "experience"; details: ExperienceDetails }
  | { cardType: "food"; details: FoodDetails };
