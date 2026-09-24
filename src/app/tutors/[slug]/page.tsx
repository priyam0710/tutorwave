import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const CRM_API_URL =
  process.env.TUTORWAVE_CRM_URL ||
  'https://tutorwave-crm-xi.vercel.app';

type Tutor = {
  id?: string;
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

  experienceYears?: number | string;

  bio?: string;
  specialization?: string;

  rating?: number;
  totalPlacements?: number;

  isVerified?: boolean;

  [key: string]: any;
};

type ApiResponse = {
  tutors?: Tutor[];
  total?: number;
  error?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function safeDecode(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/*
  The tutor card URL is expected to look like:

  /tutors/nawnit-8ebd57b9

  The slug contains:

  tutor name + first 8 characters of CRM tutor ID

  This function checks both parts so the profile remains
  connected to the real CRM record.
*/
function tutorMatchesSlug(tutor: Tutor, rawSlug: string) {
  if (!tutor?.id || !tutor?.fullName) {
    return false;
  }

  const slug = normalize(safeDecode(rawSlug));

  const nameSlug = normalize(tutor.fullName);

  const id = String(tutor.id).toLowerCase();

  const idShort = id.replace(/-/g, '').slice(0, 8);

  /*
    Possible slug formats supported:

    name-id
    name-idshort
    name
  */

  const expectedSlug = `${nameSlug}-${idShort}`;

  if (slug === expectedSlug) {
    return true;
  }

  /*
    Also support a slug containing the first 8 characters
    of the UUID without relying on the exact UUID formatting.
  */

  if (slug.startsWith(`${nameSlug}-`)) {
    const suffix = slug.slice(nameSlug.length + 1);

    if (
      suffix === idShort ||
      id.replace(/-/g, '').startsWith(suffix)
    ) {
      return true;
    }
  }

  /*
    Last fallback:
    match exact tutor name if no ID suffix exists.
  */

  if (slug === nameSlug) {
    return true;
  }

  return false;
}

async function getTutors(): Promise<Tutor[]> {
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
        'TutorWave CRM tutor API failed:',
        response.status,
        response.statusText
      );

      return [];
    }

    const data: ApiResponse = await response.json();

    return Array.isArray(data?.tutors)
      ? data.tutors
      : [];
  } catch (error) {
    console.error(
      'Unable to fetch tutors from TutorWave CRM:',
      error
    );

    return [];
  }
}

async function findTutorBySlug(
  rawSlug: string
): Promise<Tutor | null> {
  const tutors = await getTutors();

  return (
    tutors.find((tutor) =>
      tutorMatchesSlug(tutor, rawSlug)
    ) || null
  );
}

function formatArray(
  value?: string[],
  fallback = 'Not specified'
) {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.join(', ');
}

function formatExperience(
  value?: number | string
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return 'Not specified';
  }

  return `${value} ${
    String(value) === '1' ? 'year' : 'years'
  }`;
}

function formatMode(mode?: string) {
  if (!mode) return 'Not specified';

  const value = mode.toLowerCase();

  if (value === 'both') {
    return 'Home & Online';
  }

  if (value === 'online') {
    return 'Online';
  }

  if (
    value === 'offline' ||
    value === 'home'
  ) {
    return 'Home Tuition';
  }

  return mode;
}

function initials(name?: string) {
  if (!name) return 'TW';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const tutor = await findTutorBySlug(slug);

  if (!tutor) {
    return {
      title: 'Tutor Profile | TutorWave',
      description:
        'Explore verified tutors available through TutorWave.',
    };
  }

  const name =
    tutor.fullName || 'Tutor';

  const subjects =
    Array.isArray(tutor.subjects) &&
    tutor.subjects.length
      ? tutor.subjects.join(', ')
      : 'Multiple Subjects';

  const city =
    tutor.city || 'Delhi NCR';

  return {
    title: `${name} — ${subjects} Tutor in ${city} | TutorWave`,

    description:
      tutor.bio ||
      `${name} is a verified TutorWave tutor available for ${subjects} in ${city}.`,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const tutor = await findTutorBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!tutor) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <section className="min-h-[55vh] flex items-center justify-center px-4">
          <div className="text-center max-w-lg">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#EBF4FF] flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A6FF7"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0D1118] mb-3">
              Tutor Profile Not Found
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              We couldn't find this tutor profile in the
              TutorWave tutor network. The profile may have
              been removed, unpublished or is still being
              verified.
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
                strokeWidth="2"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>

              Browse Tutors
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

  const photo =
    tutor.profilePhoto || '';

  const subjects =
    Array.isArray(tutor.subjects)
      ? tutor.subjects
      : [];

  const classes =
    Array.isArray(tutor.classes)
      ? tutor.classes
      : [];

  const boards =
    Array.isArray(tutor.boards)
      ? tutor.boards
      : [];

  const areas =
    Array.isArray(tutor.areas)
      ? tutor.areas
      : [];

  const city =
    tutor.city || 'Delhi NCR';

  const experience =
    formatExperience(tutor.experienceYears);

  const mode =
    formatMode(tutor.mode);

  const qualification =
    tutor.highestQualification ||
    'Not specified';

  const college =
    tutor.college ||
    'Not specified';

  const rating =
    typeof tutor.rating === 'number'
      ? tutor.rating
      : null;

  const placements =
    typeof tutor.totalPlacements === 'number'
      ? tutor.totalPlacements
      : 0;

  const bio =
    tutor.bio?.trim() ||
    `${name} is a TutorWave tutor available for personalized tuition support.`;

  const specialization =
    tutor.specialization?.trim() ||
    '';

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-8">

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

            <span className="text-[#0D1118] font-medium truncate">
              {name}
            </span>

          </div>

          {/* Hero */}

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 items-start">

            {/* Photo */}

            <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-[#EBF4FF] border border-[#E5E7EB] flex-shrink-0">

              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={`${name} - TutorWave Tutor`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#0A6FF7]">
                  {initials(name)}
                </div>
              )}

            </div>

            {/* Main information */}

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1118] tracking-tight">
                  {name}
                </h1>

                {tutor.isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#0C8F81] px-3 py-1.5 rounded-full text-xs font-bold">

                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.8"
                    >
                      <path d="M5 12l4 4L19 6" />
                    </svg>

                    Verified Tutor

                  </span>
                )}

              </div>

              <p className="text-[#6B7280] text-base mb-5">
                {subjects.length
                  ? subjects.join(' • ')
                  : 'Tutor'}
              </p>

              <div className="flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-sm text-[#374151]">

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A6FF7"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>

                  {experience}

                </div>

                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-sm text-[#374151]">

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A6FF7"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>

                  {city}

                </div>

                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-sm text-[#374151]">

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#0A6FF7"
                    strokeWidth="2"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="16"
                      rx="2"
                    />
                    <path d="M7 8h10M7 12h10M7 16h6" />
                  </svg>

                  {mode}

                </div>

              </div>

            </div>

            {/* Rating / Placements */}

            <div className="flex lg:flex-col gap-3">

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4 min-w-[140px]">

                <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                  Rating
                </p>

                <div className="flex items-center gap-2">

                  <span className="text-2xl font-bold text-[#0D1118]">
                    {rating !== null
                      ? rating.toFixed(1)
                      : '—'}
                  </span>

                  {rating !== null && (
                    <span className="text-[#F59E0B]">
                      ★
                    </span>
                  )}

                </div>

              </div>

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4 min-w-[140px]">

                <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                  Placements
                </p>

                <span className="text-2xl font-bold text-[#0D1118]">
                  {placements}
                </span>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6">

              {/* ABOUT */}

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-4">
                  About {name}
                </h2>

                <p className="text-[#4B5563] leading-7">
                  {bio}
                </p>

              </div>

              {/* TEACHING PROFILE */}

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-6">
                  Teaching Profile
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Subjects */}

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                      Subjects
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {subjects.length ? (
                        subjects.map((subject) => (
                          <span
                            key={subject}
                            className="px-3 py-2 bg-[#EBF4FF] text-[#0A6FF7] rounded-lg text-sm font-semibold"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-[#6B7280]">
                          Not specified
                        </span>
                      )}

                    </div>

                  </div>

                  {/* Classes */}

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                      Classes
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {classes.length ? (
                        classes.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-2 bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] rounded-lg text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-[#6B7280]">
                          Not specified
                        </span>
                      )}

                    </div>

                  </div>

                  {/* Boards */}

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                      Boards
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {boards.length ? (
                        boards.map((board) => (
                          <span
                            key={board}
                            className="px-3 py-2 bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] rounded-lg text-sm font-medium"
                          >
                            {board}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-[#6B7280]">
                          Not specified
                        </span>
                      )}

                    </div>

                  </div>

                  {/* Mode */}

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                      Teaching Mode
                    </p>

                    <p className="text-base font-semibold text-[#0D1118]">
                      {mode}
                    </p>

                  </div>

                </div>

              </div>

              {/* QUALIFICATIONS */}

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-6">
                  Education & Qualifications
                </h2>

                <div className="space-y-5">

                  <div className="flex gap-4">

                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">

                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0A6FF7"
                        strokeWidth="1.8"
                      >
                        <path d="M22 10l-10-5-10 5 10 5 10-5Z" />
                        <path d="M6 12v5c3 2 9 2 12 0v-5" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                        Highest Qualification
                      </p>

                      <p className="text-base font-semibold text-[#0D1118]">
                        {qualification}
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-4">

                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">

                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0A6FF7"
                        strokeWidth="1.8"
                      >
                        <path d="M4 4h16v16H4z" />
                        <path d="M8 8h8M8 12h8M8 16h5" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                        College / University
                      </p>

                      <p className="text-base font-semibold text-[#0D1118]">
                        {college}
                      </p>

                    </div>

                  </div>

                  {specialization && (
                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">

                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0A6FF7"
                          strokeWidth="1.8"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="8"
                          />
                          <path d="M12 8v8M8 12h8" />
                        </svg>

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                          Specialization
                        </p>

                        <p className="text-base font-semibold text-[#0D1118]">
                          {specialization}
                        </p>

                      </div>

                    </div>
                  )}

                </div>

              </div>

              {/* LOCATION */}

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8">

                <h2 className="text-xl font-bold text-[#0D1118] mb-6">
                  Location & Availability
                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                      City
                    </p>

                    <p className="text-base font-semibold text-[#0D1118]">
                      {city}
                    </p>

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                      Areas Served
                    </p>

                    {areas.length ? (
                      <div className="flex flex-wrap gap-2">

                        {areas.map((area) => (
                          <span
                            key={area}
                            className="px-3 py-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg text-sm text-[#374151]"
                          >
                            {area}
                          </span>
                        ))}

                      </div>
                    ) : (
                      <p className="text-sm text-[#6B7280]">
                        Area details available on request.
                      </p>
                    )}

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside>

              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sticky top-24">

                <div className="mb-6">

                  <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                    TutorWave Profile
                  </p>

                  <h2 className="text-xl font-bold text-[#0D1118]">
                    Interested in this tutor?
                  </h2>

                  <p className="text-sm text-[#6B7280] mt-2 leading-relaxed">
                    Share your tuition requirement with us and
                    our team will help you proceed with a suitable
                    tutor.
                  </p>

                </div>

                <Link
                  href="/find-a-tutor"
                  className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors mb-3"
                >
                  Request This Tutor

                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7-7" />
                  </svg>

                </Link>

                <Link
                  href="/find-a-tutor"
                  className="flex items-center justify-center w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                >
                  Find a Different Tutor
                </Link>

                <div className="border-t border-[#E5E7EB] mt-6 pt-6">

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#E6F7F5] flex items-center justify-center flex-shrink-0">

                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0C8F81"
                        strokeWidth="2"
                      >
                        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4Z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-sm font-bold text-[#0D1118]">
                        Verified Tutor
                      </p>

                      <p className="text-xs text-[#6B7280] mt-0.5 leading-relaxed">
                        This profile has been verified by the
                        TutorWave team.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>
      </section>

      <Footer />

      <WhatsAppButton />

    </main>
  );
}
