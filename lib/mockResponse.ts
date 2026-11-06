import type { TripCard } from "./types";

// Three rows from kyoto_weekend_content.xlsx (compiled by Priya Raman, PM Search).
// Picked to fit the $600 reference budget for 2 guests: $366 + $116 + $34 = $516.
// Skipped: E3 (sold out), E4 (no host listed), F4 (pushes total over budget).
// No photos: image rights for the prototype are not cleared, so cards use grey placeholders.
export const mockResponse: TripCard[] = [
  {
    cardType: "stay",
    details: {
      optionId: "S1",
      listingTitle: "Restored machiya townhouse near Gion",
      propertyType: "Entire townhouse",
      neighbourhood: "Gion",
      nights: 2,
      pricePerNightUsd: 168,
      totalUsd: 366,
      rating: 4.92,
      reviewCount: 214,
      hostFirstName: "Kenji",
      highlight: "Private garden and cedar soaking tub",
      checkIn: "2025-04-11",
      checkOut: "2025-04-13",
    },
  },
  {
    cardType: "experience",
    details: {
      optionId: "E1",
      experienceTitle: "Tea ceremony in a 100-year-old machiya",
      category: "Culture",
      hostFirstName: "Mei",
      date: "2025-04-12",
      startTime: "10:30",
      durationHours: 2,
      totalUsd: 116,
      rating: 4.96,
      meetingPoint: "Outside Gion-Shijo Station, exit 6",
    },
  },
  {
    cardType: "food",
    details: {
      optionId: "F1",
      placeName: "Menya Inoichi",
      cuisine: "Ramen",
      neighbourhood: "Gion",
      meal: "Dinner",
      priceLevel: "$",
      estCostUsd: 34,
      walkFromStayMin: 8,
      bookingNote: "No reservations - arrive before 18:00",
    },
  },
];

export const BUDGET_USD = 600;

let failedOnce = false;

// Pretend network call. With ?fail=once in the address, the FIRST request
// returns an empty list (no cards), so the chat shows the error bubble.
// Every request after that works normally.
export async function fetchTripPlan(): Promise<TripCard[]> {
  await new Promise((r) => setTimeout(r, 1800));
  const failOnce =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("fail") === "once";
  if (failOnce && !failedOnce) {
    failedOnce = true;
    return [];
  }
  return mockResponse;
}
