'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { featuredTutors } from '@/lib/data/tutors';

function StarRating({
  rating,
  count,
}: {
  rating: number;
  count: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="#F8AD03"
        stroke="none"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      <span className="text-xs font-bold text-[#0D1118]">
        {rating}
      </span>

      <span className="text-[10px] text-[#6B7280]">
        ({count})
      </span>
    </div>
  );
}

function getModeLabel(modes: string[]) {
  if (modes.includes('home') && modes.includes('online')) {
    return 'Home & Online';
  }

  if (modes.includes('home')) {
    return 'Home Tuition';
  }

  return 'Online Tuition';
}

export default function MeetTutorsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section heading */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              Our Tutors
            </span>

            <h2
              className="font-sans font-bold text-[#0D1118] leading-tight"
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                letterSpacing: '-0.025em',
              }}
            >
              Meet Some of Our Tutors
            </h2>

            <p className="mt-2 text-sm text-[#6B7280] max-w-xl">
              Meet verified tutors and explore their profiles,
              qualifications and teaching experience.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/tutors"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:underline whitespace-nowrap"
          >
            View All Tutors

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured Tutor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTutors.map((tutor) => (
            <Link
              key={tutor.slug}
              href={`/tutors/${tutor.slug}`}
              aria-label={`View ${tutor.name}'s tutor profile`}
              className="
                group
                relative
                flex
                flex-col
                bg-white
                border
                border-[#E5E7EB]
                rounded-2xl
                overflow-hidden
                shadow-[0_2px_12px_rgba(15,23,42,0.04)]
                hover:-translate-y-1
                hover:border-[#BFDBFE]
                hover:shadow-[0_14px_36px_rgba(10,111,247,0.12)]
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#0A6FF7]
                transition-all
                duration-300
              "
            >

              {/* Tutor Image */}
              <div className="relative aspect-[4/4.45] overflow-hidden bg-[#F8FAFC]">

                <AppImage
                  src={tutor.photo}
                  alt={tutor.photoAlt}
                  width={420}
                  height={470}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-[1.03]
                    transition-transform
                    duration-500
                  "
                />

                {/* Bottom image gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

                {/* Verified Badge */}
                {tutor.verified && (
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1.5 shadow-sm">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A6FF7"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>

                    <span className="text-[10px] font-bold text-[#0A6FF7]">
                      Verified Tutor
                    </span>
                  </div>
                )}

                {/* Image Bottom Information */}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3 text-white">

                  <div className="min-w-0">

                    {/* Teaching Mode */}
                    <p className="text-[11px] font-medium text-white/80">
                      {getModeLabel(tutor.teachingMode)}
                    </p>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 min-w-0 mt-0.5">

                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                        className="flex-shrink-0"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                      <span className="text-xs font-semibold truncate">
                        {tutor.locations[0]}
                      </span>
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/95 text-[#0A6FF7] text-[10px] font-bold shadow-sm">
                    {tutor.experience}+ yrs
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex flex-col flex-1">

                {/* Tutor Name + Arrow */}
                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3
                      className="
                        font-sans
                        font-bold
                        text-[15px]
                        text-[#0D1118]
                        leading-tight
                        truncate
                        group-hover:text-[#0A6FF7]
                        transition-colors
                      "
                    >
                      {tutor.name}
                    </h3>

                    {/* Subjects */}
                    <p className="mt-1 text-xs text-[#6B7280] line-clamp-1">
                      {tutor.subjects.slice(0, 3).join(' · ')}

                      {tutor.subjects.length > 3
                        ? ' · +more'
                        : ''}
                    </p>
                  </div>

                  {/* Arrow */}
                  <span
                    className="
                      flex-shrink-0
                      inline-flex
                      items-center
                      justify-center
                      w-8
                      h-8
                      rounded-full
                      bg-[#F3F7FF]
                      text-[#0A6FF7]
                      group-hover:bg-[#0A6FF7]
                      group-hover:text-white
                      transition-colors
                    "
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Qualification */}
                <div className="mt-3 rounded-xl bg-[#F8FAFC] border border-[#EEF2F6] px-3 py-2.5">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">
                    Qualification
                  </p>

                  <p className="text-[11px] font-medium text-[#1F2937] leading-snug line-clamp-2">
                    {tutor.qualifications?.length
                      ? tutor.qualifications.slice(0, 2).join(' • ')
                      : 'View profile for details'}
                  </p>
                </div>

                {/* Bio */}
                <p className="mt-3 text-[11px] text-[#6B7280] leading-relaxed line-clamp-2">
                  {tutor.bio}
                </p>

                {/* Rating + View Profile */}
                <div className="mt-3 flex items-center justify-between gap-3">

                  <StarRating
                    rating={tutor.rating}
                    count={tutor.reviewCount}
                  />

                  <span className="text-[11px] font-semibold text-[#0A6FF7] group-hover:underline">
                    View Profile
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">

          <Link
            href="/tutors"
            className="
              inline-flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              text-[#0A6FF7]
              border
              border-[#0A6FF7]
              px-6
              py-3
              rounded-xl
              hover:bg-[#EBF4FF]
              transition-colors
            "
          >
            View All Tutors

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

        </div>
      </div>
    </section>
  );
}
