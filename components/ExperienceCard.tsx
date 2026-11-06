import type { ExperienceDetails } from "@/lib/types";

// Look: tall image strip on the left · biggest text = activity name · accent = purple day label
export default function ExperienceCard({ d }: { d: ExperienceDetails }) {
  return (
    <article className="flex overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="flex w-24 shrink-0 items-center justify-center bg-stone-200 px-2 text-center text-[10px] text-stone-500">
        Photo placeholder · tall strip
      </div>
      <div className="space-y-2 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-violet-600">Experience</p>
        <p className="text-xl font-bold leading-snug">{d.experienceTitle}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-md bg-violet-600 px-2 py-0.5 text-xs font-bold text-white">SAT 12 APR</span>
          <span>
            {d.startTime} · {d.durationHours} hours
          </span>
        </div>
        <p className="text-sm text-stone-600">
          {d.category} · Hosted by {d.hostFirstName} · ★ {d.rating}
        </p>
        <p className="text-sm text-stone-600">Meet: {d.meetingPoint}</p>
        <p className="text-sm">
          <span className="font-semibold">${d.totalUsd}</span> for 2 guests
        </p>
      </div>
    </article>
  );
}
