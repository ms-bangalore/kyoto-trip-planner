import type { FoodDetails } from "@/lib/types";

// Look: small round image top-right · biggest text = restaurant name · accent = amber meal/price label
export default function FoodCard({ d }: { d: FoodDetails }) {
  return (
    <article className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-600">Food spot</p>
          <p className="text-xl font-bold leading-snug">{d.placeName}</p>
          <span className="inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
            {d.meal} · {d.priceLevel}
          </span>
        </div>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-stone-200 text-[9px] text-stone-500">
          Photo
        </div>
      </div>
      <p className="mt-2 text-sm text-stone-600">
        {d.cuisine} · {d.neighbourhood} · {d.walkFromStayMin} min walk from your stay
      </p>
      <p className="text-sm text-stone-600">{d.bookingNote}</p>
      <p className="mt-1 text-sm">
        About <span className="font-semibold">${d.estCostUsd}</span> for 2
      </p>
    </article>
  );
}
