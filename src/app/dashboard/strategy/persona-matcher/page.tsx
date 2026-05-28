"use client";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { PersonaCard } from "@/components/strategy/persona-card";
import type { AudienceData, PersonaGap } from "@/types/strategy";

const actualAudience: AudienceData = {
  ageDistribution: { "18-24": 12, "25-34": 45, "35-44": 28, "45+": 15 },
  genderSplit: { male: 62, female: 36, other: 2 },
  topLocations: [
    { city: "Jakarta", percentage: 34 },
    { city: "Surabaya", percentage: 18 },
    { city: "Bandung", percentage: 15 },
    { city: "Yogyakarta", percentage: 11 },
  ],
  topInterests: [
    { interest: "Technology", percentage: 42 },
    { interest: "Marketing", percentage: 28 },
    { interest: "Business", percentage: 18 },
    { interest: "Content Creation", percentage: 12 },
  ],
};

const gaps: PersonaGap[] = [
  { dimension: "Age", expected: "25-45", actual: "28-42", actionItem: "On target — good alignment" },
  { dimension: "Gender", expected: "50/50 Male/Female", actual: "62% Male", actionItem: "Create female-focused content campaigns" },
  { dimension: "Interest", expected: "Technology", actual: "SaaS + Marketing", actionItem: "Add lifestyle content to broaden reach" },
  { dimension: "Location", expected: "All Indonesia", actual: "78% Java", actionItem: "Create region-specific campaigns for outer Java" },
];

export default function PersonaMatcherPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: "Strategy", href: "/strategy" }, { label: "Persona Matcher" }]} />

      <div>
        <h1 className="text-[30px] font-medium leading-[1.2]">Audience Persona Matcher</h1>
        <p className="text-[16px] text-on-dark-muted mt-1">How well does your audience match your target demographic?</p>
      </div>

      <PersonaCard
        actual={actualAudience}
        alignmentScore={82}
        gaps={gaps}
      />
    </div>
  );
}
