interface KpiMetricProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive: boolean };
}

export function KpiMetric({ label, value, delta }: KpiMetricProps) {
  return (
    <div className="flex flex-col justify-center h-full">
      <span className="text-[13px] font-medium uppercase tracking-[0.3px] text-on-dark-muted/80">{label}</span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-[36px] font-semibold leading-[1.1] tracking-tight">{value}</span>
        {delta && (
          <span className={`text-[13px] font-semibold leading-[1.4] ${delta.positive ? "text-sentiment-positive" : "text-sentiment-negative"}`}>
            {delta.positive ? "↑" : "↓"} {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
