import React from 'react';
import Link from 'next/link';

const locations = [
  { name: 'Delhi', slug: 'delhi' },
  { name: 'Noida', slug: 'noida' },
  { name: 'Greater Noida', slug: 'greater-noida' },
  { name: 'Ghaziabad', slug: 'ghaziabad' },
  { name: 'Gurugram', slug: 'gurugram' },
  { name: 'Faridabad', slug: 'faridabad' },
];

export default function HomeDelhiNCR() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC] border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              Coverage
            </span>
            <h2
              className="font-sans font-bold text-[#0D1118] leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}
            >
              Home Tutors Across Delhi NCR
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-md">
              TutorWave connects families with verified tutors across all major Delhi NCR locations.
            </p>
          </div>
          <Link
            href="/locations"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:underline whitespace-nowrap"
          >
            View All Locations
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {locations?.map((loc) => (
            <Link
              key={loc?.slug}
              href={`/locations/${loc?.slug}`}
              className="flex flex-col items-center justify-center gap-2 bg-white border border-[#E5E7EB] rounded-2xl px-4 py-5 hover:border-[#BFDBFE] hover:shadow-sm hover:text-[#0A6FF7] transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-[#EBF4FF] flex items-center justify-center group-hover:bg-[#0A6FF7] transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="2" className="group-hover:stroke-white transition-colors">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#0D1118] group-hover:text-[#0A6FF7] transition-colors text-center">
                {loc?.name}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-xs text-[#9CA3AF] mt-6 text-center">
          Expanding across Delhi NCR and beyond.
        </p>
      </div>
    </section>
  );
}
