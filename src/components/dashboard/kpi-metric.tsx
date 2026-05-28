interface KpiMetricProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive: boolean };
}

export function KpiMetric({ label, value, delta }: KpiMetricProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[15px] font-medium uppercase tracking-[0.2px] text-on-dark-muted">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-[48px] font-medium leading-[1.1] tracking-tight">{value}</span>
        {delta && (
          <span className={`text-[16px] font-medium leading-[1.5] ${delta.positive ? "text-sentiment-positive" : "text-sentiment-negative"}`}>
            {delta.positive ? "+" : ""}{delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
