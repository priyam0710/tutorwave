'use client';

import React, { useMemo, useState } from 'react';

interface LocationAreasGridProps {
  areas: string[];
  initialCount?: number;
}

// The raw area lists in lib/data/locations.ts end with a literal "& more..."
// placeholder string and contain some repeated names across sub-regions
// (e.g. "Shalimar Bagh" or "Rohini" appear multiple times in Delhi's list).
// Rendering that array directly turns the "Areas Covered" section into a
// wall of 150-300+ chips, including a chip that literally says "& more...".
// This filters that noise out and keeps the count accurate before display.
const IGNORED_ENTRIES = new Set(['& more...', '&more...', 'more...', '']);

function cleanAreas(areas: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  areas.forEach((area) => {
    const trimmed = area.trim();
    const key = trimmed.toLowerCase();

    if (!trimmed || IGNORED_ENTRIES.has(key) || seen.has(key)) {
      return;
    }

    seen.add(key);
    result.push(trimmed);
  });

  return result;
}

export default function LocationAreasGrid({ areas, initialCount = 24 }: LocationAreasGridProps) {
  const [expanded, setExpanded] = useState(false);

  const cleanedAreas = useMemo(() => cleanAreas(areas), [areas]);
  const visibleAreas = expanded ? cleanedAreas : cleanedAreas.slice(0, initialCount);
  const canExpand = cleanedAreas.length > initialCount;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        {visibleAreas.map((area) => (
          <div
            key={area}
            className="px-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] text-sm font-medium rounded-lg"
          >
            {area}
          </div>
        ))}
      </div>

      {canExpand && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:underline"
        >
          {expanded ? 'Show less' : `Show all ${cleanedAreas.length} areas`}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      )}
    </div>
  );
}
