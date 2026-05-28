"use client";

interface CompetitorRow {
  metric: string;
  values: { brand: string; value: string | number }[];
}

interface MatrixProps {
  rows: CompetitorRow[];
}

export function CompetitorMatrix({ rows }: MatrixProps) {
  if (!rows.length) {
    return (
      <div className="flex items-center justify-center h-32 text-on-dark-muted text-[14px]">
        Add competitors in Brand Setup to see comparison
      </div>
    );
  }
  const brands = rows[0]?.values.map((v) => v.brand) ?? [];
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-[15px] font-medium uppercase tracking-[0.2px] text-on-dark-muted pb-2 pr-4">Metric</th>
            {brands.map((brand, i) => (
              <th
                key={brand}
                className={`pb-2 px-3 text-[14px] font-medium uppercase tracking-[0.2px] ${
                  i === 0 ? "border-t-2 border-accent-lime text-accent-lime" : "text-on-dark-muted"
                }`}
              >
                {brand}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.metric} className="border-t border-hairline-violet/50">
              <td className="py-3 pr-4 text-[16px] font-medium leading-[1.5]">{row.metric}</td>
              {row.values.map((v, i) => (
                <td key={v.brand} className={`py-3 px-3 text-[16px] font-semibold leading-[1.5] text-right ${i === 0 ? "text-accent-lime" : ""}`}>
                  {v.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
