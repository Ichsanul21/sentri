"use client";

interface TimelineEvent {
  time: string;
  content: string;
  engagement: number;
  isSeed: boolean;
}

export function SourceTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative pl-6 space-y-6">
      <div className="absolute left-2.5 top-1 bottom-1 w-0.5 bg-hairline-violet/50" />
      {events.map((ev, i) => (
        <div key={i} className="relative">
          <div className={`absolute -left-5 top-1 w-3 h-3 rounded-full border-2 ${
            ev.isSeed ? "bg-severity-critical border-severity-critical" : "bg-accent-violet-mid border-accent-violet-mid"
          }`} />
          <div className={`pl-2 ${ev.isSeed ? "bg-severity-critical/5 -ml-2 pl-4 py-2 rounded border-l-2 border-severity-critical" : ""}`}>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-on-dark-muted">{ev.time}</span>
              {ev.isSeed && (
                <span className="text-[10px] font-semibold uppercase text-severity-critical tracking-[0.25px]">Viral Seed</span>
              )}
            </div>
            <p className="text-[16px] leading-[1.5] my-0.5">{ev.content}</p>
            {ev.engagement > 0 && (
              <span className="text-[14px] text-on-dark-muted">{ev.engagement.toLocaleString()} engagements</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
