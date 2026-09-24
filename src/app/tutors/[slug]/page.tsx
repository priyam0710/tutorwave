import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

type Tutor = {
  id: string;
  fullName?: string;
  profilePhoto?: string;
  gender?: string;
  city?: string;
  areas?: string[];
  subjects?: string[];
  classes?: string[];
  boards?: string[];
  mode?: string;
  highestQualification?: string;
  college?: string;
  experienceYears?: number;
  bio?: string;
  specialization?: string;
  rating?: number;
  totalPlacements?: number;
  isVerified?: boolean;
};

type PublicTutorsResponse = {
  tutors?: Tutor[];
  total?: number;
};

/* =========================================================
   CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://tutorwave.in';

/*
 * We use the existing public API route.
 *
 * This means:
 * Website
 *   ↓
 * /api/public-tutors
 *   ↓
 * TutorWave CRM
 *   ↓
 * MongoDB
 *
 * No CRM route changes are required.
 */
const PUBLIC_TUTORS_API =
  `${SITE_URL.replace(/\/$/, '')}/api/public-tutors`;


/* =========================================================
   HELPERS
========================================================= */

function safeArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item !== null && item !== undefined)
    .map((item) => String(item).trim())
    .filter(Boolean);
}


function formatMode(mode?: string): string {
  const value = String(mode || '').toLowerCase();

  if (value.includes('both')) {
    return 'Home & Online';
  }

  if (value.includes('online')) {
    return 'Online';
  }

  if (
    value.includes('offline') ||
    value.includes('home')
  ) {
    return 'Home Tuition';
  }

  return mode || '';
}


function formatExperience(years?: number): string {
  if (
    years === undefined ||
    years === null ||
    Number.isNaN(Number(years))
  ) {
    return '';
  }

  const numericYears = Number(years);

  if (numericYears === 1) {
    return '1 Year';
  }

  return `${numericYears} Years`;
}


function getTutorSlug(tutor: Tutor): string {
  /*
   * The listing page currently uses the CRM tutor ID
   * as the URL segment.
   *
   * Example:
   * /tutors/nawnit-8ebd57b9
   *
   * Therefore the detail page accepts the URL value
   * as an ID first.
   */

  return tutor.id;
}


async function getPublicTutors(): Promise<Tutor[]> {
  try {
    const response = await fetch(
      PUBLIC_TUTORS_API,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(
        'Public tutors API returned:',
        response.status
      );

      return [];
    }

    const data =
      (await response.json()) as PublicTutorsResponse;

    return Array.isArray(data?.tutors)
      ? data.tutors
      : [];
  } catch (error) {
    console.error(
      'Failed to fetch public tutors:',
      error
    );

    return [];
  }
}


async function findTutor(
  rawSlug: string
): Promise<Tutor | null> {

  const slug = decodeURIComponent(
    rawSlug || ''
  )
    .trim()
    .toLowerCase();

  if (!slug) {
    return null;
  }

  const tutors = await getPublicTutors();

  /*
   * Primary match:
   * CRM tutor ID.
   */
  let tutor = tutors.find(
    (item) =>
      String(item.id || '')
        .trim()
        .toLowerCase() === slug
  );

  if (tutor) {
    return tutor;
  }

  /*
   * Fallback:
   * In case an older link uses a slug based on
   * the tutor's name.
   *
   * Example:
   * Nawnit Gautam
   * →
   * nawnit-gautam
   */
  tutor = tutors.find((item) => {
    const nameSlug = String(
      item.fullName || ''
    )
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return nameSlug === slug;
  });

  return tutor || null;
}


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {

  const tutor = await findTutor(params.slug);

  if (!tutor) {
    return {
      title: 'Tutor Profile | TutorWave',
      description:
        'Explore verified tutors available through TutorWave.',
    };
  }

  const name =
    tutor.fullName || 'Verified Tutor';

  const subjects =
    safeArray(tutor.subjects);

  const city =
    tutor.city || 'Delhi NCR';

  const experience =
    formatExperience(tutor.experienceYears);

  const title =
    `${name} — ${subjects.slice(0, 3).join(', ')} Tutor in ${city} | TutorWave`;

  const description =
    `${name} is a verified TutorWave tutor in ${city}${
      subjects.length
        ? ` teaching ${subjects.slice(0, 5).join(', ')}`
        : ''
    }${
      experience
        ? ` with ${experience} of teaching experience`
        : ''
    }.`;

  return {
    title,
    description,

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical:
        `${SITE_URL}/tutors/${encodeURIComponent(
          tutor.id
        )}`,
    },

    openGraph: {
      type: 'profile',
      title,
      description,
      url:
        `${SITE_URL}/tutors/${encodeURIComponent(
          tutor.id
        )}`,

      images: tutor.profilePhoto
        ? [
            {
              url: tutor.profilePhoto,
              width: 1200,
              height: 630,
              alt: `${name} - TutorWave Tutor`,
            },
          ]
        : [],
    },
  };
}


/* =========================================================
   PAGE
========================================================= */

export default async function TutorDetailPage({
  params,
}: {
  params: { slug: string };
}) {

  const tutor = await findTutor(params.slug);

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!tutor) {
    return (
      <main className="min-h-screen bg-white">

        <Header />

        <section className="min-h-[55vh] flex items-center justify-center px-6">

          <div className="max-w-xl text-center">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#EBF4FF] flex items-center justify-center">

              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A6FF7"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path d="M12 8v4" />

                <circle
                  cx="12"
                  cy="16"
                  r="1"
                  fill="#0A6FF7"
                  stroke="none"
                />
              </svg>

            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118] mb-4">
              Tutor Profile Not Available
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              We couldn't load this tutor profile from
              TutorWave at the moment. The tutor may have
              been removed, may not be verified yet, or the
              profile link may be outdated.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>

              Back to Tutors
            </Link>

          </div>

        </section>

        <Footer />

        <WhatsAppButton />

      </main>
    );
  }


  /* =======================================================
     NORMALIZE DATA
  ======================================================= */

  const name =
    tutor.fullName || 'Tutor';

  const subjects =
    safeArray(tutor.subjects);

  const classes =
    safeArray(tutor.classes);

  const boards =
    safeArray(tutor.boards);

  const areas =
    safeArray(tutor.areas);

  const qualification =
    tutor.highestQualification ||
    '';

  const college =
    tutor.college ||
    '';

  const specialization =
    tutor.specialization ||
    '';

  const bio =
    tutor.bio ||
    '';

  const city =
    tutor.city ||
    '';

  const experience =
    formatExperience(
      tutor.experienceYears
    );

  const mode =
    formatMode(tutor.mode);

  const rating =
    Number(tutor.rating || 0);

  const placements =
    Number(
      tutor.totalPlacements || 0
    );

  const profilePhoto =
    tutor.profilePhoto || '';

  const profileUrl =
    `${SITE_URL}/tutors/${encodeURIComponent(
      tutor.id
    )}`;


  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    '@context': 'https://schema.org',

    '@type': 'Person',

    name,

    image: profilePhoto || undefined,

    description:
      bio ||
      `${name} is a verified tutor available through TutorWave.`,

    jobTitle: 'Tutor',

    address: {
      '@type': 'PostalAddress',
      addressLocality: city || 'Delhi NCR',
      addressCountry: 'IN',
    },

    url: profileUrl,

    knowsAbout: subjects,

    worksFor: {
      '@type': 'Organization',
      name: 'TutorWave',
      url: SITE_URL,
    },
  };


  /* =======================================================
     PAGE UI
  ======================================================= */

  return (
    <main className="min-h-screen bg-white">

      <Header />


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-[#F8FAFC] border-b border-[#E5E7EB]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">

          {/* Breadcrumb */}

          <nav
            className="flex flex-wrap items-center gap-2 text-sm text-[#6B7280] mb-8"
            aria-label="Breadcrumb"
          >

            <Link
              href="/"
              className="hover:text-[#0A6FF7]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/tutors"
              className="hover:text-[#0A6FF7]"
            >
              Tutors
            </Link>

            <span>/</span>

            <span className="text-[#0D1118] font-medium">
              {name}
            </span>

          </nav>


          {/* Main Hero */}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left */}

            <div className="lg:col-span-2">

              <div className="flex flex-col sm:flex-row items-start gap-6">

                {/* Profile Photo */}

                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] shadow-sm flex-shrink-0">

                  {profilePhoto ? (

                    <img
                      src={profilePhoto}
                      alt={`${name} - TutorWave verified tutor`}
                      className="w-full h-full object-cover"
                    />

                  ) : (

                    <div className="w-full h-full flex items-center justify-center bg-[#EBF4FF] text-[#0A6FF7] text-4xl font-bold">

                      {name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}

                    </div>

                  )}

                </div>


                {/* Basic Information */}

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3 mb-3">

                    <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118]">

                      {name}

                    </h1>


                    {tutor.isVerified && (

                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0C8F81] bg-[#E6F7F5] px-3 py-1.5 rounded-full">

                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M5 12l4 4L19 6" />
                        </svg>

                        Verified Tutor

                      </span>

                    )}

                  </div>


                  {/* Location */}

                  {city && (

                    <div className="flex items-center gap-2 text-[#6B7280] mb-2">

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                      <span>
                        {city}
                      </span>

                    </div>

                  )}


                  {/* Experience */}

                  {experience && (

                    <div className="flex items-center gap-2 text-[#6B7280] mb-2">

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="9"
                        />
                        <path d="M12 7v5l3 2" />
                      </svg>

                      <span>
                        {experience} Teaching Experience
                      </span>

                    </div>

                  )}


                  {/* Mode */}

                  {mode && (

                    <div className="flex items-center gap-2 text-[#6B7280] mb-5">

                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="14"
                          rx="2"
                        />
                        <path d="M8 21h8M12 18v3" />
                      </svg>

                      <span>
                        {mode}
                      </span>

                    </div>

                  )}


                  {/* Subjects */}

                  {subjects.length > 0 && (

                    <div className="flex flex-wrap gap-2">

                      {subjects.map((subject) => (

                        <span
                          key={subject}
                          className="px-3 py-1.5 bg-white border border-[#DCE6F2] text-[#0A6FF7] text-xs font-semibold rounded-full"
                        >
                          {subject}
                        </span>

                      ))}

                    </div>

                  )}

                </div>

              </div>

            </div>


            {/* Right Summary */}

            <div>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 shadow-sm">

                <div className="grid grid-cols-2 gap-3">

                  {/* Rating */}

                  <div className="rounded-xl bg-[#F8FAFC] p-4">

                    <div className="text-xl font-bold text-[#0D1118]">

                      {rating > 0
                        ? rating.toFixed(1)
                        : '—'}

                    </div>

                    <div className="text-xs text-[#6B7280] mt-1">
                      Rating
                    </div>

                  </div>


                  {/* Experience */}

                  <div className="rounded-xl bg-[#F8FAFC] p-4">

                    <div className="text-xl font-bold text-[#0D1118]">

                      {tutor.experienceYears
                        ? `${tutor.experienceYears}y`
                        : '—'}

                    </div>

                    <div className="text-xs text-[#6B7280] mt-1">
                      Experience
                    </div>

                  </div>


                  {/* Placements */}

                  <div className="rounded-xl bg-[#F8FAFC] p-4">

                    <div className="text-xl font-bold text-[#0D1118]">

                      {placements}

                    </div>

                    <div className="text-xs text-[#6B7280] mt-1">
                      Placements
                    </div>

                  </div>


                  {/* Verification */}

                  <div className="rounded-xl bg-[#F8FAFC] p-4">

                    <div className="text-xl font-bold text-[#0C8F81]">

                      {tutor.isVerified
                        ? '✓'
                        : '—'}

                    </div>

                    <div className="text-xs text-[#6B7280] mt-1">
                      Verified
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          DETAILS
      =================================================== */}

      <section className="py-12 md:py-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


            {/* =================================================
                MAIN INFORMATION
            ================================================= */}

            <div className="lg:col-span-2 space-y-8">


              {/* ABOUT */}

              {bio && (

                <section>

                  <h2 className="text-xl md:text-2xl font-bold text-[#0D1118] mb-4">
                    About {name}
                  </h2>

                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6">

                    <p className="text-[#4B5563] leading-7 whitespace-pre-line">
                      {bio}
                    </p>

                  </div>

                </section>

              )}


              {/* TEACHING PROFILE */}

              <section>

                <h2 className="text-xl md:text-2xl font-bold text-[#0D1118] mb-5">
                  Teaching Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                  {/* Subjects */}

                  {subjects.length > 0 && (

                    <div className="border border-[#E5E7EB] rounded-2xl p-5">

                      <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Subjects
                      </div>

                      <div className="flex flex-wrap gap-2">

                        {subjects.map((subject) => (

                          <span
                            key={subject}
                            className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] rounded-lg text-sm font-medium"
                          >
                            {subject}
                          </span>

                        ))}

                      </div>

                    </div>

                  )}


                  {/* Classes */}

                  {classes.length > 0 && (

                    <div className="border border-[#E5E7EB] rounded-2xl p-5">

                      <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Classes
                      </div>

                      <div className="flex flex-wrap gap-2">

                        {classes.map((item) => (

                          <span
                            key={item}
                            className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#1F2937] rounded-lg text-sm font-medium"
                          >
                            {item}
                          </span>

                        ))}

                      </div>

                    </div>

                  )}


                  {/* Boards */}

                  {boards.length > 0 && (

                    <div className="border border-[#E5E7EB] rounded-2xl p-5">

                      <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Boards
                      </div>

                      <div className="flex flex-wrap gap-2">

                        {boards.map((board) => (

                          <span
                            key={board}
                            className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#1F2937] rounded-lg text-sm font-medium"
                          >
                            {board}
                          </span>

                        ))}

                      </div>

                    </div>

                  )}


                  {/* Mode */}

                  {mode && (

                    <div className="border border-[#E5E7EB] rounded-2xl p-5">

                      <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Teaching Mode
                      </div>

                      <div className="text-base font-semibold text-[#0D1118]">
                        {mode}
                      </div>

                    </div>

                  )}

                </div>

              </section>


              {/* QUALIFICATIONS */}

              {(qualification || college) && (

                <section>

                  <h2 className="text-xl md:text-2xl font-bold text-[#0D1118] mb-5">
                    Education & Qualifications
                  </h2>

                  <div className="border border-[#E5E7EB] rounded-2xl overflow-hidden">

                    {qualification && (

                      <div className="p-5 border-b border-[#E5E7EB]">

                        <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                          Highest Qualification
                        </div>

                        <div className="text-base font-semibold text-[#0D1118]">
                          {qualification}
                        </div>

                      </div>

                    )}


                    {college && (

                      <div className="p-5">

                        <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                          College / University
                        </div>

                        <div className="text-base font-semibold text-[#0D1118]">
                          {college}
                        </div>

                      </div>

                    )}

                  </div>

                </section>

              )}


              {/* SPECIALIZATION */}

              {specialization && (

                <section>

                  <h2 className="text-xl md:text-2xl font-bold text-[#0D1118] mb-4">
                    Specialization
                  </h2>

                  <div className="bg-[#EBF4FF] border border-[#D7E8FF] rounded-2xl p-6">

                    <p className="text-[#1F4F85] leading-7">
                      {specialization}
                    </p>

                  </div>

                </section>

              )}


              {/* LOCATION */}

              {(city || areas.length > 0) && (

                <section>

                  <h2 className="text-xl md:text-2xl font-bold text-[#0D1118] mb-5">
                    Location & Service Areas
                  </h2>

                  <div className="border border-[#E5E7EB] rounded-2xl p-6">

                    {city && (

                      <div className="mb-5">

                        <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                          City
                        </div>

                        <div className="text-base font-semibold text-[#0D1118]">
                          {city}
                        </div>

                      </div>

                    )}


                    {areas.length > 0 && (

                      <div>

                        <div className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                          Areas Covered
                        </div>

                        <div className="flex flex-wrap gap-2">

                          {areas.map((area) => (

                            <span
                              key={area}
                              className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] rounded-lg text-sm"
                            >
                              {area}
                            </span>

                          ))}

                        </div>

                      </div>

                    )}

                  </div>

                </section>

              )}

            </div>


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside>

              <div className="lg:sticky lg:top-24">

                <div className="bg-[#0D1118] rounded-2xl p-6 text-white">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-[#0A6FF7] flex items-center justify-center">

                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>

                    </div>

                    <div>

                      <div className="font-bold">
                        Verified Tutor
                      </div>

                      <div className="text-xs text-[#9CA3AF]">
                        Profile reviewed by TutorWave
                      </div>

                    </div>

                  </div>


                  <h3 className="text-lg font-bold mb-2">
                    Interested in {name}?
                  </h3>

                  <p className="text-sm text-[#9CA3AF] leading-6 mb-6">
                    Submit your tuition requirement and
                    our team can help you connect with a
                    suitable tutor.
                  </p>


                  <Link
                    href="/find-a-tutor"
                    className="block w-full text-center bg-[#0A6FF7] text-white font-bold py-3 rounded-xl hover:bg-[#0858c8] transition-colors mb-3"
                  >
                    Request This Tutor
                  </Link>


                  <Link
                    href="/find-a-tutor"
                    className="block w-full text-center bg-white/10 text-white font-semibold py-3 rounded-xl hover:bg-white/15 transition-colors"
                  >
                    Submit Requirement
                  </Link>

                </div>


                {/* Quick facts */}

                <div className="mt-5 border border-[#E5E7EB] rounded-2xl p-5">

                  <h3 className="font-bold text-[#0D1118] mb-4">
                    Quick Information
                  </h3>

                  <div className="space-y-4">


                    {experience && (

                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Experience
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {experience}
                        </span>

                      </div>

                    )}


                    {mode && (

                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Mode
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {mode}
                        </span>

                      </div>

                    )}


                    {city && (

                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Location
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {city}
                        </span>

                      </div>

                    )}


                    {subjects.length > 0 && (

                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Subjects
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {subjects.length}
                        </span>

                      </div>

                    )}


                    {classes.length > 0 && (

                      <div className="flex items-start justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Classes
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {classes.length}
                        </span>

                      </div>

                    )}

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* ===================================================
          BOTTOM CTA
      =================================================== */}

      <section className="bg-[#F8FAFC] border-t border-[#E5E7EB] py-12">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-2xl md:text-3xl font-bold text-[#0D1118] mb-3">
            Looking for the right tutor?
          </h2>

          <p className="text-[#6B7280] mb-6">
            Tell us your requirements and TutorWave
            can help you find a suitable verified tutor.
          </p>

          <Link
            href="/find-a-tutor"
            className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
          >
            Find a Tutor

            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>

          </Link>

        </div>

      </section>


      {/* ===================================================
          STRUCTURED DATA
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData
          ),
        }}
      />


      <Footer />

      <WhatsAppButton />

    </main>
  );
}
