import type { StayDetails } from "@/lib/types";

// Look: wide banner image on top · biggest text = travel dates · accent = coral top border
export default function StayCard({ d }: { d: StayDetails }) {
  return (
    <article className="overflow-hidden rounded-2xl border-t-4 border-[#F26B5B] bg-white shadow-sm">
      <div className="flex h-32 items-center justify-center bg-stone-200 text-xs text-stone-500">
        Photo placeholder · wide banner
      </div>
      <div className="space-y-1 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F26B5B]">Stay</p>
        <p className="text-2xl font-bold leading-tight">11–13 Apr 2025 · {d.nights} nights</p>
        <p className="font-medium">{d.listingTitle}</p>
        <p className="text-sm text-stone-600">
          {d.propertyType} · {d.neighbourhood} · Host {d.hostFirstName}
        </p>
        <p className="text-sm text-stone-600">{d.highlight}</p>
        <div className="flex items-baseline justify-between pt-2 text-sm">
          <span>
            <span className="font-semibold">${d.pricePerNightUsd}</span> / night ·{" "}
            <span className="font-semibold">${d.totalUsd}</span> total
          </span>
          <span className="text-stone-600">★ {d.rating} ({d.reviewCount})</span>
        </div>
      </div>
    </article>
  );
}
