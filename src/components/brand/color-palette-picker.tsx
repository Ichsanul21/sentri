"use client";

import type { BrandColors } from "@/types/brand";

interface ColorPalettePickerProps {
  value: BrandColors;
  onChange: (colors: BrandColors) => void;
}

export function ColorPalettePicker({ value, onChange }: ColorPalettePickerProps) {
  return (
    <div className="space-y-3">
      <label className="text-[14px] font-medium text-on-dark-muted block">Brand Color Palette</label>
      <div className="grid grid-cols-3 gap-3">
        {(["primary", "secondary", "accent"] as (keyof BrandColors)[]).map((key) => (
          <div key={key}>
            <label className="text-[12px] text-on-dark-muted block mb-1 capitalize">{key} Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value[key] || "#150f23"}
                onChange={(e) => onChange({ ...value, [key]: e.target.value })}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-[12px] text-on-dark-muted">{value[key] || "—"}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-2">
        {(["primary", "secondary", "accent"] as (keyof BrandColors)[]).map((key) => (
          <div
            key={key}
            className="w-6 h-6 rounded-full border border-hairline-violet"
            style={{ backgroundColor: value[key] || "transparent" }}
          />
        ))}
      </div>
    </div>
  );
}
