import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors } from '@/lib/data/tutors';

function findTutorBySlug(rawSlug: string) {
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase();

  return tutors.find(
    (tutor) => tutor.slug.trim().toLowerCase() === normalized
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tutor = findTutorBySlug(params.slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description:
        'The tutor profile you are looking for does not exist.',
    };
  }

  const primarySubjects = tutor.subjects
    .slice(0, 3)
    .join(', ');

  const title = `${tutor.name} — ${primarySubjects} Tutor | TutorWave`;

  const description = `${tutor.name} is a tutor with ${tutor.experience}+ years of experience, teaching ${primarySubjects} from ${tutor.locations[0]}. View qualifications, subjects, availability and profile details on TutorWave.`;

  return {
    title,
    description,

    alternates: {
      canonical: `${baseUrl}/tutors/${tutor.slug}`,
    },

    openGraph: {
      type: 'profile',
      title,
      description,
      url: `${baseUrl}/tutors/${tutor.slug}`,

      images: [
        {
          url: tutor.photo,
          width: 1200,
          height: 630,
          alt: tutor.photoAlt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return tutors.map((tutor) => ({
    slug: tutor.slug,
  }));
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2.5 py-1 rounded-full">
      <svg
        width="11"
        height="11"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="6"
          cy="6"
          r="6"
          fill="#0C8F81"
        />

        <path
          d="M3.5 6l1.8 1.8 3.2-3.2"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      Verified Tutor
    </span>
  );
}

function TeachingModePill({
  mode,
}: {
  mode: 'Home' | 'Online';
}) {
  const isHome = mode === 'Home';

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
        isHome
          ? 'bg-[#FFF8E6] text-[#B07A00]'
          : 'bg-[#EBF4FF] text-[#0A6FF7]'
      }`}
    >
      {isHome ? (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ) : (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="3"
            width="20"
            height="14"
            rx="2"
          />

          <path d="M8 21h8M12 17v4" />
        </svg>
      )}

      {mode}
    </span>
  );
}

export default function TutorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutor = findTutorBySlug(params.slug);

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />

        <section className="py-24 text-center px-4">
          <div className="max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0D1118] mb-3">
              Tutor Not Found
            </h1>

            <p className="text-[#6B7280] mb-8">
              The tutor profile you are looking for does not exist.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#0A6FF7] px-5 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Back to Tutors

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
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    );
  }

  const modes: ('Home' | 'Online')[] = [];

  if (
    tutor.teachingMode.includes('home') ||
    tutor.teachingMode.includes('both')
  ) {
    modes.push('Home');
  }

  if (
    tutor.teachingMode.includes('online') ||
    tutor.teachingMode.includes('both')
  ) {
    modes.push('Online');
  }

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Hero / Profile Header */}
      <section className="pt-20 md:pt-24 pb-12 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Breadcrumb */}
          <nav
            className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280] mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Home
            </Link>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>

            <Link
              href="/tutors"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Tutors
            </Link>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="opacity-40"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>

            <span className="text-[#0D1118] font-medium">
              {tutor.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main profile */}
            <div className="lg:col-span-2">

              {/* Profile intro */}
              <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">

                {/* Photo */}
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-white border border-[#E5E7EB] shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tutor.photo}
                    alt={tutor.photoAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">

                  {/* Name */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118] leading-tight">
                      {tutor.name}
                    </h1>

                    {tutor.verified && <VerifiedBadge />}
                  </div>

                  {/* Subjects */}
                  <p className="text-base text-[#6B7280] mb-4 leading-relaxed">
                    {tutor.subjects.slice(0, 4).join(' · ')}
                  </p>

                  {/* Experience + Location */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#6B7280] mb-4">

                    {/* Experience */}
                    <span className="flex items-center gap-1.5">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />

                        <polyline points="12 6 12 12 16 14" />
                      </svg>

                      <span>
                        <strong className="text-[#0D1118]">
                          {tutor.experience}+ years
                        </strong>{' '}
                        experience
                      </span>
                    </span>

                    {/* Location */}
                    <span className="flex items-center gap-1.5">

                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />

                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                      <span className="truncate">
                        {tutor.locations[0]}
                      </span>
                    </span>

                  </div>

                  {/* Teaching mode */}
                  <div className="flex flex-wrap gap-2">
                    {modes.map((mode) => (
                      <TeachingModePill
                        key={mode}
                        mode={mode}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6 mb-8">

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M22 10l-10-5L2 10l10 5 10-5Z" />
                      <path d="M6 12.5v4.5c3.5 2 8.5 2 12 0v-4.5" />
                    </svg>
                  </div>

                  <h2 className="text-xl font-bold text-[#0D1118]">
                    Qualifications
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {tutor.qualifications?.length ? (
                    tutor.qualifications.map(
                      (qualification) => (
                        <span
                          key={qualification}
                          className="inline-flex items-center px-3 py-2 bg-[#F3F7FF] border border-[#E1EBFA] text-[#1F3B64] text-sm font-medium rounded-lg"
                        >
                          {qualification}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-sm text-[#6B7280]">
                      Qualification details available on request.
                    </p>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="mb-8">

                <h2 className="text-2xl font-bold text-[#0D1118] mb-4">
                  About {tutor.name}
                </h2>

                <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 md:p-6">
                  <p className="text-[#6B7280] leading-7">
                    {tutor.bio}
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div className="mb-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-4">
                  Subjects Taught
                </h2>

                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-lg"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classes */}
              <div className="mb-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-4">
                  Classes Taught
                </h2>

                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">
                  <p className="text-sm text-[#4B5563] leading-relaxed">
                    {tutor.classes.join(', ')}
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div>

                <h2 className="text-xl font-bold text-[#0D1118] mb-4">
                  Availability
                </h2>

                <div className="flex items-start gap-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A6FF7"
                    strokeWidth="2"
                    className="flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                    />

                    <polyline points="12 6 12 12 16 14" />
                  </svg>

                  <p className="text-sm text-[#4B5563]">
                    {tutor.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,23,42,0.05)] sticky top-24">

                {/* Rating */}
                <div className="pb-5 border-b border-[#F0F2F5]">
                  <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">
                    Tutor Rating
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="#F8AD03"
                        stroke="none"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>

                      <span className="text-2xl font-bold text-[#0D1118]">
                        {tutor.rating}
                      </span>

                      <span className="text-sm text-[#6B7280]">
                        / 5
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B7280] mt-1">
                    Based on {tutor.reviewCount} reviews
                  </p>
                </div>

                {/* Quick info */}
                <div className="py-5 border-b border-[#F0F2F5]">

                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-[#F3F7FF] text-[#0A6FF7] flex items-center justify-center flex-shrink-0">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                        Experience
                      </p>

                      <p className="text-sm font-semibold text-[#0D1118] mt-0.5">
                        {tutor.experience}+ Years
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#F3F7FF] text-[#0A6FF7] flex items-center justify-center flex-shrink-0">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-[11px] text-[#6B7280] uppercase tracking-wider font-semibold">
                        Location
                      </p>

                      <p className="text-sm font-semibold text-[#0D1118] mt-0.5">
                        {tutor.locations[0]}
                      </p>
                    </div>
                  </div>

                </div>

                {/* CTA */}
                <div className="pt-5">

                  <Link
                    href={`/find-a-tutor?tutor=${tutor.slug}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
                  >
                    Request This Tutor

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center gap-2 w-full mt-3 bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#D6EAFF] transition-colors"
                  >
                    Submit Requirement
                  </Link>

                  <p className="text-[11px] text-[#9CA3AF] text-center mt-4 leading-relaxed">
                    Tell us your requirements and TutorWave can help you find the right tutor.
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
