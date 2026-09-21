import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const CRM_API_URL =
  process.env.TUTORWAVE_CRM_URL ||
  'https://tutorwave-crm-xi.vercel.app';

interface CRMTutor {
  id: string;
  fullName: string;
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
}

/* ─────────────────────────────────────────────
   SLUG HELPERS
───────────────────────────────────────────── */

function createTutorSlug(
  name: string,
  id: string
): string {
  const nameSlug = String(name || 'tutor')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const shortId = String(id || '')
    .replace(/[^a-zA-Z0-9]/g, '')
    .slice(0, 8)
    .toLowerCase();

  return shortId
    ? `${nameSlug}-${shortId}`
    : nameSlug;
}

/* ─────────────────────────────────────────────
   FETCH LIVE CRM TUTORS
───────────────────────────────────────────── */

async function getPublicTutors(): Promise<CRMTutor[]> {
  try {
    const response = await fetch(
      `${CRM_API_URL}/api/public/tutors`,
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
        'CRM public tutors request failed:',
        response.status
      );

      return [];
    }

    const data = await response.json();

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

/* ─────────────────────────────────────────────
   FIND TUTOR BY SLUG
───────────────────────────────────────────── */

async function findTutorBySlug(
  rawSlug: string
): Promise<CRMTutor | null> {
  const normalizedSlug = decodeURIComponent(
    rawSlug
  )
    .trim()
    .toLowerCase();

  const tutors = await getPublicTutors();

  const tutor = tutors.find((item) => {
    const generatedSlug = createTutorSlug(
      item.fullName,
      item.id
    );

    return (
      generatedSlug === normalizedSlug
    );
  });

  return tutor || null;
}

/* ─────────────────────────────────────────────
   METADATA
───────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tutor = await findTutorBySlug(
    params.slug
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.tutorwave.in';

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description:
        'The tutor profile you are looking for does not exist.',
    };
  }

  const subjects =
    tutor.subjects?.filter(Boolean) || [];

  const city =
    tutor.city ||
    tutor.areas?.[0] ||
    'Delhi NCR';

  const title = `${tutor.fullName} — ${
    subjects.length > 0
      ? subjects.join(', ')
      : 'Verified'
  } Tutor in ${city} | TutorWave`;

  const description = `${
    tutor.fullName
  } is a verified TutorWave tutor${
    subjects.length > 0
      ? ` teaching ${subjects.join(', ')}`
      : ''
  } in ${city}${
    tutor.experienceYears
      ? ` with ${tutor.experienceYears} years of experience`
      : ''
  }.`;

  return {
    title,
    description,

    alternates: {
      canonical: `${baseUrl}/tutors/${createTutorSlug(
        tutor.fullName,
        tutor.id
      )}`,
    },

    openGraph: {
      type: 'profile',
      title,
      description,
      url: `${baseUrl}/tutors/${createTutorSlug(
        tutor.fullName,
        tutor.id
      )}`,

      images: tutor.profilePhoto
        ? [
            {
              url: tutor.profilePhoto,
              width: 1200,
              height: 630,
              alt: `${tutor.fullName} - TutorWave Verified Tutor`,
            },
          ]
        : undefined,
    },
  };
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */

export default async function TutorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutor = await findTutorBySlug(
    params.slug
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://www.tutorwave.in';

  /* ─────────────────────────────────────────
     NOT FOUND
  ───────────────────────────────────────── */

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />

        <section className="pt-20 pb-24 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118] mb-4">
              Tutor Not Found
            </h1>

            <p className="text-[#6B7280] mb-8">
              The tutor profile you are looking
              for does not exist or is no longer
              publicly available.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center justify-center bg-[#0A6FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Back to Tutors
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* ─────────────────────────────────────────
     DATA NORMALIZATION
  ───────────────────────────────────────── */

  const subjects =
    tutor.subjects?.filter(Boolean) || [];

  const classes =
    tutor.classes?.filter(Boolean) || [];

  const boards =
    tutor.boards?.filter(Boolean) || [];

  const areas =
    tutor.areas?.filter(Boolean) || [];

  const city =
    tutor.city?.trim() ||
    areas[0] ||
    'Delhi NCR';

  const experience =
    Number(tutor.experienceYears) || 0;

  const rating =
    Number(tutor.rating) || 0;

  const placements =
    Number(tutor.totalPlacements) || 0;

  const qualifications = Array.from(
    new Set(
      [
        tutor.highestQualification,
        tutor.college,
      ]
        .map((value) =>
          String(value || '').trim()
        )
        .filter(Boolean)
    )
  );

  const mode =
    String(tutor.mode || '')
      .trim()
      .toLowerCase();

  const modes: string[] = [];

  if (
    mode === 'offline' ||
    mode.includes('offline') ||
    mode === 'both' ||
    mode.includes('both')
  ) {
    modes.push('Home');
  }

  if (
    mode === 'online' ||
    mode.includes('online') ||
    mode === 'both' ||
    mode.includes('both')
  ) {
    modes.push('Online');
  }

  if (modes.length === 0) {
    modes.push('Home');
  }

  const tutorSlug = createTutorSlug(
    tutor.fullName,
    tutor.id
  );

  /* ─────────────────────────────────────────
     BREADCRUMB STRUCTURED DATA
  ───────────────────────────────────────── */

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',

    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },

      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tutors',
        item: `${baseUrl}/tutors`,
      },

      {
        '@type': 'ListItem',
        position: 3,
        name: tutor.fullName,
        item: `${baseUrl}/tutors/${tutorSlug}`,
      },
    ],
  };

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* ─────────────────────────────────────
          PROFILE HEADER
      ───────────────────────────────────── */}

      <section className="pt-20 pb-12 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-[#6B7280] mb-8"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/tutors"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Tutors
            </Link>

            <span>/</span>

            <span className="text-[#0D1118] font-medium truncate">
              {tutor.fullName}
            </span>
          </nav>

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                breadcrumbSchema
              ),
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* LEFT CONTENT */}
            <div className="md:col-span-2">

              {/* Tutor Header */}
              <div className="flex items-start gap-6 mb-8">

                {/* Photo */}
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F8FAFC] border border-[#E5E7EB]">

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      tutor.profilePhoto ||
                      '/images/default-tutor.png'
                    }
                    alt={`${tutor.fullName} - TutorWave Verified Tutor`}
                    className="w-full h-full object-cover"
                  />

                </div>

                {/* Basic Info */}
                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3 mb-2">

                    <h1 className="text-3xl font-bold text-[#0D1118]">
                      {tutor.fullName}
                    </h1>

                    {tutor.isVerified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2.5 py-1 rounded-full">

                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
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

                        Verified
                      </span>
                    )}

                  </div>

                  {/* Experience + Location */}
                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#6B7280]">

                    <span className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />

                        <polyline points="12 6 12 12 16 14" />
                      </svg>

                      {experience}{' '}
                      {experience === 1
                        ? 'Year'
                        : 'Years'}{' '}
                      Experience
                    </span>

                    <span className="flex items-center gap-1">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />

                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                      {city}
                    </span>

                  </div>

                  {/* Teaching Modes */}
                  <div className="flex gap-2 flex-wrap">

                    {modes.map((item) => (
                      <span
                        key={item}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          item === 'Home'
                            ? 'bg-[#FFF8E6] text-[#B07A00]'
                            : 'bg-[#EBF4FF] text-[#0A6FF7]'
                        }`}
                      >

                        {item === 'Home' ? (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
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

                        {item}

                      </span>
                    ))}

                  </div>
                </div>
              </div>

              {/* ABOUT */}
              {tutor.bio && (
                <div className="mb-8">

                  <h2 className="text-2xl font-bold text-[#0D1118] mb-4">
                    About
                  </h2>

                  <p className="text-[#6B7280] leading-relaxed">
                    {tutor.bio}
                  </p>

                </div>
              )}

              {/* SPECIALIZATION */}
              {tutor.specialization && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Specialization
                  </h3>

                  <p className="text-[#6B7280] leading-relaxed">
                    {tutor.specialization}
                  </p>

                </div>
              )}

              {/* SUBJECTS */}
              {subjects.length > 0 && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Subjects
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-lg"
                      >
                        {subject}
                      </span>
                    ))}

                  </div>
                </div>
              )}

              {/* CLASSES */}
              {classes.length > 0 && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Classes
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {classes.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#0D1118] text-sm font-medium rounded-lg"
                      >
                        {item}
                      </span>
                    ))}

                  </div>

                </div>
              )}

              {/* BOARDS */}
              {boards.length > 0 && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Boards
                  </h3>

                  <div className="flex flex-wrap gap-2">

                    {boards.map((board) => (
                      <span
                        key={board}
                        className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#0D1118] text-sm font-medium rounded-lg"
                      >
                        {board}
                      </span>
                    ))}

                  </div>

                </div>
              )}

              {/* QUALIFICATIONS */}
              {qualifications.length > 0 && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Qualifications
                  </h3>

                  <ul className="space-y-2">

                    {qualifications.map(
                      (qualification) => (
                        <li
                          key={qualification}
                          className="flex items-start gap-3 text-[#6B7280]"
                        >
                          <span className="text-[#0A6FF7] font-bold mt-1">
                            ✓
                          </span>

                          <span>
                            {qualification}
                          </span>
                        </li>
                      )
                    )}

                  </ul>
                </div>
              )}

              {/* LOCATION */}
              {(city || areas.length > 0) && (
                <div className="mb-8">

                  <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                    Location
                  </h3>

                  {city && (
                    <p className="text-[#6B7280] mb-3">
                      <strong className="text-[#0D1118]">
                        City:
                      </strong>{' '}
                      {city}
                    </p>
                  )}

                  {areas.length > 0 && (
                    <div className="flex flex-wrap gap-2">

                      {areas.map((area) => (
                        <span
                          key={area}
                          className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#0D1118] text-sm rounded-lg"
                        >
                          {area}
                        </span>
                      ))}

                    </div>
                  )}

                </div>
              )}

            </div>

            {/* ───────────────────────────────
                RIGHT SIDEBAR
            ─────────────────────────────── */}

            <div className="md:col-span-1">

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">

                {/* Rating */}
                <div className="mb-6">

                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-3xl font-bold text-[#0A6FF7]">
                      {rating > 0
                        ? rating.toFixed(1)
                        : '—'}
                    </span>

                    {rating > 0 && (
                      <span className="text-sm text-[#6B7280]">
                        /5
                      </span>
                    )}

                  </div>

                  <p className="text-xs text-[#6B7280]">
                    TutorWave Rating
                  </p>

                </div>

                {/* Placements */}
                <div className="mb-6 pb-6 border-b border-[#E5E7EB]">

                  <div className="flex items-center gap-2">

                    <span className="text-2xl font-bold text-[#0D1118]">
                      {placements}
                    </span>

                    <span className="text-sm text-[#6B7280]">
                      {placements === 1
                        ? 'Placement'
                        : 'Placements'}
                    </span>

                  </div>

                  <p className="text-xs text-[#6B7280] mt-1">
                    Through TutorWave
                  </p>

                </div>

                {/* CTA */}
                <Link
                  href={`/find-a-tutor?tutor=${encodeURIComponent(
                    tutor.fullName
                  )}`}
                  className="block w-full text-center bg-[#0A6FF7] text-white font-bold py-3 rounded-xl hover:bg-[#0858c8] transition-colors mb-3"
                >
                  Request Tutor
                </Link>

                <Link
                  href="/find-a-tutor"
                  className="block w-full text-center bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3 rounded-xl hover:bg-[#D6EAFF] transition-colors"
                >
                  Submit Requirement
                </Link>

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
