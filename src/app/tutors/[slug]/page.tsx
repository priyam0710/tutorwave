```tsx
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

type PublicTutor = {
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
  rating?: number | string;
  totalPlacements?: number;
  isVerified?: boolean;
};

type PublicTutorResponse = {
  tutors?: PublicTutor[];
  total?: number;
};

/* =========================================================
   CONFIG
========================================================= */

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000');

/*
 * We intentionally use the existing public API.
 *
 * Do NOT change the CRM route or public API for this page.
 */
const PUBLIC_TUTORS_API = `${SITE_URL}/api/public-tutors`;


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

function normalize(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase();
}

function slugify(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function asArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? '').trim())
      .filter(Boolean);
  }

  if (typeof value === 'string' && value.trim()) {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function displayValue(value: unknown, fallback = 'Not provided') {
  const text = String(value ?? '').trim();

  return text || fallback;
}

function formatMode(mode: unknown): string {
  const value = normalize(mode);

  if (value === 'both') return 'Home & Online';
  if (value === 'online') return 'Online';
  if (value === 'offline' || value === 'home') return 'Home Tuition';

  if (String(mode ?? '').trim()) {
    return String(mode);
  }

  return 'Not specified';
}

function formatExperience(value: unknown): string {
  const number = Number(value);

  if (!Number.isNaN(number) && number > 0) {
    return `${number} ${number === 1 ? 'Year' : 'Years'}`;
  }

  return 'Not specified';
}

function formatRating(value: unknown): string {
  const number = Number(value);

  if (!Number.isNaN(number) && number > 0) {
    return number.toFixed(1);
  }

  return 'New';
}

function getPhotoUrl(tutor: PublicTutor): string {
  const photo = String(tutor.profilePhoto ?? '').trim();

  return photo;
}

function getTutorSlugCandidates(tutor: PublicTutor): string[] {
  const id = normalize(tutor.id);
  const nameSlug = slugify(tutor.fullName);

  const candidates: string[] = [];

  if (id) {
    candidates.push(id);

    /*
     * Your current public URLs use:
     *
     * /tutors/name-idSuffix
     *
     * Example:
     * /tutors/nawnit-8ebd57b9
     */
    if (id.length >= 8) {
      candidates.push(`${nameSlug}-${id.slice(-8)}`);
    }

    if (id.length >= 7) {
      candidates.push(`${nameSlug}-${id.slice(-7)}`);
    }

    if (id.length >= 6) {
      candidates.push(`${nameSlug}-${id.slice(-6)}`);
    }
  }

  if (nameSlug) {
    candidates.push(nameSlug);
  }

  return candidates.map(normalize);
}

function tutorMatchesSlug(
  tutor: PublicTutor,
  rawSlug: string
): boolean {
  const slug = normalize(safeDecode(rawSlug));

  if (!slug) return false;

  const candidates = getTutorSlugCandidates(tutor);

  if (candidates.includes(slug)) {
    return true;
  }

  /*
   * Extra protection for URLs such as:
   * nawnit-8ebd57b9
   *
   * If the URL contains the final 8 characters of the CRM id,
   * compare that suffix directly.
   */
  const id = normalize(tutor.id);

  if (id && id.length >= 8) {
    const idSuffix = id.slice(-8);

    if (slug.endsWith(`-${idSuffix}`)) {
      return true;
    }
  }

  /*
   * Also allow exact tutor-name slugs.
   */
  const nameSlug = slugify(tutor.fullName);

  if (nameSlug && slug === nameSlug) {
    return true;
  }

  return false;
}


/* =========================================================
   FETCH REAL CRM TUTORS
========================================================= */

async function getPublicTutors(): Promise<PublicTutor[]> {
  try {
    const response = await fetch(PUBLIC_TUTORS_API, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },

      /*
       * Important:
       * Always fetch fresh CRM data.
       *
       * This means when a tutor is verified/updated in CRM,
       * the public profile does not remain stuck on old data.
       */
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error(
        `TutorWave public tutor API returned ${response.status}`
      );

      return [];
    }

    const data =
      (await response.json()) as PublicTutorResponse;

    if (!Array.isArray(data?.tutors)) {
      return [];
    }

    return data.tutors;
  } catch (error) {
    console.error(
      'Failed to fetch public tutors:',
      error
    );

    return [];
  }
}


async function getTutorBySlug(
  rawSlug: string
): Promise<PublicTutor | null> {
  const tutors = await getPublicTutors();

  const tutor = tutors.find((item) =>
    tutorMatchesSlug(item, rawSlug)
  );

  return tutor ?? null;
}


/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tutor = await getTutorBySlug(params.slug);

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description:
        'The tutor profile you are looking for does not exist.',
    };
  }

  const name = displayValue(
    tutor.fullName,
    'Tutor'
  );

  const subjects = asArray(tutor.subjects);

  const city = displayValue(
    tutor.city,
    'Delhi NCR'
  );

  const experience = Number(tutor.experienceYears);

  const subjectText =
    subjects.length > 0
      ? subjects.slice(0, 3).join(', ')
      : 'Home Tuition';

  const experienceText =
    !Number.isNaN(experience) && experience > 0
      ? `${experience} years of teaching experience`
      : 'experienced teaching professional';

  const title = `${name} — ${subjectText} Tutor in ${city} | TutorWave`;

  const description =
    `${name} is a verified TutorWave tutor in ${city}, ` +
    `offering ${subjectText}. ` +
    `${experienceText}.`;

  const slug = safeDecode(params.slug);

  const photo = getPhotoUrl(tutor);

  return {
    title,
    description,

    alternates: {
      canonical: `${SITE_URL}/tutors/${slug}`,
    },

    openGraph: {
      type: 'profile',
      title,
      description,
      url: `${SITE_URL}/tutors/${slug}`,

      ...(photo
        ? {
            images: [
              {
                url: photo,
                width: 1200,
                height: 630,
                alt: `${name} — TutorWave Tutor`,
              },
            ],
          }
        : {}),
    },
  };
}


/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="mb-5">
      {eyebrow && (
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A6FF7] mb-1.5">
          {eyebrow}
        </p>
      )}

      <h2 className="text-xl md:text-2xl font-bold text-[#0D1118]">
        {title}
      </h2>
    </div>
  );
}


function TagList({
  items,
  emptyText = 'Not provided',
  blue = false,
}: {
  items: string[];
  emptyText?: string;
  blue?: boolean;
}) {
  if (!items.length) {
    return (
      <p className="text-sm text-[#6B7280]">
        {emptyText}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className={`inline-flex items-center rounded-xl px-3 py-2 text-xs md:text-sm font-semibold ${
            blue
              ? 'bg-[#EBF4FF] text-[#0A6FF7]'
              : 'bg-[#F8FAFC] text-[#273142] border border-[#E5E7EB]'
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}


function DetailRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-[#EEF2F6] last:border-b-0">
      <div className="w-9 h-9 rounded-xl bg-[#F3F7FF] text-[#0A6FF7] flex items-center justify-center flex-shrink-0">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-0.5">
          {label}
        </p>

        <div className="text-sm font-semibold text-[#1F2937] break-words">
          {value}
        </div>
      </div>
    </div>
  );
}


function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path
        d="M5 12l4 4L19 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default async function TutorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutor = await getTutorBySlug(params.slug);

  /*
   * -------------------------------------------------------
   * NOT FOUND
   * -------------------------------------------------------
   */

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />

        <section className="min-h-[55vh] flex items-center justify-center px-4 py-20">
          <div className="max-w-xl mx-auto text-center">

            <div className="w-16 h-16 rounded-2xl bg-[#F3F7FF] flex items-center justify-center mx-auto mb-6 text-[#0A6FF7]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9 9l6 6M15 9l-6 6" />
              </svg>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118] mb-4">
              Tutor Not Found
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              The tutor profile you are looking for could not
              be found or may no longer be publicly available.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
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
     NORMALIZE REAL CRM DATA
  ======================================================= */

  const name = displayValue(
    tutor.fullName,
    'Tutor'
  );

  const subjects = asArray(tutor.subjects);
  const classes = asArray(tutor.classes);
  const boards = asArray(tutor.boards);
  const areas = asArray(tutor.areas);

  const city = displayValue(
    tutor.city,
    'Delhi NCR'
  );

  const qualification = displayValue(
    tutor.highestQualification
  );

  const college = displayValue(
    tutor.college
  );

  const specialization = displayValue(
    tutor.specialization
  );

  const bio = displayValue(
    tutor.bio,
    'This tutor has not added a detailed introduction yet.'
  );

  const mode = formatMode(tutor.mode);

  const experience = formatExperience(
    tutor.experienceYears
  );

  const rating = formatRating(
    tutor.rating
  );

  const placements =
    Number(tutor.totalPlacements) || 0;

  const photo = getPhotoUrl(tutor);

  const isVerified =
    tutor.isVerified === true;

  const slug = safeDecode(params.slug);


  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url: `${SITE_URL}/tutors/${slug}`,

    ...(photo
      ? {
          image: photo,
        }
      : {}),

    ...(college && college !== 'Not provided'
      ? {
          alumniOf: {
            '@type': 'CollegeOrUniversity',
            name: college,
          },
        }
      : {}),

    ...(qualification !== 'Not provided'
      ? {
          description: bio,
        }
      : {}),

    jobTitle: 'Tutor',

    knowsAbout: subjects,

    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'IN',
    },
  };


  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="bg-[#F8FAFC] min-h-screen">

      <Header />

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">

          <nav
            className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-[#6B7280]"
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

            <span className="text-[#0D1118] font-medium truncate max-w-[220px]">
              {name}
            </span>
          </nav>

        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: SITE_URL,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Tutors',
                  item: `${SITE_URL}/tutors`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name,
                  item: `${SITE_URL}/tutors/${slug}`,
                },
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </section>


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">

            {/* LEFT */}
            <div>

              <div className="flex flex-col sm:flex-row items-start gap-6">

                {/* PHOTO */}
                <div className="relative flex-shrink-0">

                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden bg-[#F3F7FF] border border-[#E5E7EB] shadow-sm">

                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={photo}
                        alt={`${name} - TutorWave Tutor`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0A6FF7] text-4xl font-bold">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}

                  </div>

                  {isVerified && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-white border border-[#DCEFEA] text-[#0C8F81] rounded-full px-3 py-1.5 shadow-sm whitespace-nowrap">

                      <span className="w-5 h-5 rounded-full bg-[#0C8F81] text-white flex items-center justify-center">
                        <CheckIcon />
                      </span>

                      <span className="text-[10px] font-bold">
                        Verified Tutor
                      </span>

                    </div>
                  )}

                </div>


                {/* BASIC INFORMATION */}
                <div className="min-w-0 flex-1 pt-1">

                  <div className="flex flex-wrap items-center gap-3 mb-2">

                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0D1118]">
                      {name}
                    </h1>

                    {isVerified && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0C8F81] bg-[#E6F7F5] px-2.5 py-1 rounded-full">

                        <CheckIcon />

                        Verified
                      </span>
                    )}

                  </div>


                  <p className="text-sm md:text-base text-[#6B7280] mb-5">
                    Professional Tutor
                    {city !== 'Not provided'
                      ? ` · ${city}`
                      : ''}
                  </p>


                  {/* QUICK TAGS */}

                  <div className="flex flex-wrap gap-2">

                    <span className="inline-flex items-center gap-1.5 bg-[#EBF4FF] text-[#0A6FF7] px-3 py-2 rounded-xl text-xs font-semibold">

                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20V10" />
                        <path d="M18 20V4" />
                        <path d="M6 20v-6" />
                      </svg>

                      {experience} Experience
                    </span>


                    <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] px-3 py-2 rounded-xl text-xs font-semibold">

                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l7-4 7 4v14" />
                        <path d="M9 21v-4h6v4" />
                      </svg>

                      {city}
                    </span>


                    <span className="inline-flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] px-3 py-2 rounded-xl text-xs font-semibold">

                      <svg
                        width="13"
                        height="13"
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
                        <path d="M8 21h8" />
                        <path d="M12 18v3" />
                      </svg>

                      {mode}
                    </span>

                  </div>

                </div>

              </div>


              {/* =================================================
                  QUICK STATS
              ================================================= */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">

                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                    Experience
                  </p>

                  <p className="text-lg font-bold text-[#0D1118]">
                    {experience}
                  </p>

                </div>


                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                    Rating
                  </p>

                  <div className="flex items-center gap-1.5">

                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="#F5A623"
                      stroke="none"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>

                    <p className="text-lg font-bold text-[#0D1118]">
                      {rating}
                    </p>

                  </div>

                </div>


                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                    Placements
                  </p>

                  <p className="text-lg font-bold text-[#0D1118]">
                    {placements}
                  </p>

                </div>


                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-4">

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                    Status
                  </p>

                  <p className="text-lg font-bold text-[#0C8F81]">
                    {isVerified
                      ? 'Verified'
                      : 'Profile'}
                  </p>

                </div>

              </div>

            </div>


            {/* =================================================
                CTA SIDEBAR
            ================================================= */}

            <aside>

              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-[0_8px_30px_rgba(15,23,42,0.05)] lg:sticky lg:top-24">

                <p className="text-xs font-bold uppercase tracking-wider text-[#0A6FF7] mb-2">
                  Looking for a tutor?
                </p>

                <h2 className="text-xl font-bold text-[#0D1118] mb-2">
                  Interested in this tutor?
                </h2>

                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  Share your requirement with TutorWave and
                  our team can help you connect with a suitable
                  tutor.
                </p>


                <Link
                  href="/find-a-tutor"
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
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>


                <Link
                  href="/find-a-tutor"
                  className="flex items-center justify-center w-full mt-3 bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                >
                  Tell Us Your Requirement
                </Link>


                <div className="mt-5 pt-5 border-t border-[#EEF2F6]">

                  <div className="flex items-start gap-2.5">

                    <div className="w-8 h-8 rounded-full bg-[#E6F7F5] text-[#0C8F81] flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>

                    <p className="text-[11px] text-[#6B7280] leading-relaxed">
                      Tutor profiles displayed publicly are
                      reviewed through TutorWave's verification
                      process before being listed.
                    </p>

                  </div>

                </div>

              </div>

            </aside>

          </div>

        </div>
      </section>


      {/* =====================================================
          MAIN PROFILE CONTENT
      ===================================================== */}

      <section className="py-10 md:py-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 lg:gap-12">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="space-y-8">


              {/* ABOUT */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Tutor Profile"
                  title="About the Tutor"
                />

                <p className="text-sm md:text-base text-[#5F6B7A] leading-7 whitespace-pre-line">
                  {bio}
                </p>

              </section>


              {/* SUBJECTS */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Teaching"
                  title="Subjects Taught"
                />

                <TagList
                  items={subjects}
                  blue
                  emptyText="Subject information has not been added yet."
                />

              </section>


              {/* CLASSES */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Academic Levels"
                  title="Classes Taught"
                />

                <TagList
                  items={classes}
                  emptyText="Class information has not been added yet."
                />

              </section>


              {/* BOARDS */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Curriculum"
                  title="Boards & Curriculum"
                />

                <TagList
                  items={boards}
                  emptyText="Board information has not been added yet."
                />

              </section>


              {/* SPECIALIZATION */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Expertise"
                  title="Specialization"
                />

                {specialization !== 'Not provided' ? (
                  <div className="rounded-2xl bg-[#F8FAFC] border border-[#EEF2F6] p-5">

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center flex-shrink-0">

                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M12 2l3 7h7l-5.5 4.5L18.5 21 12 17l-6.5 4L8 13.5 2 9h7z" />
                        </svg>

                      </div>

                      <p className="text-sm text-[#374151] leading-relaxed">
                        {specialization}
                      </p>

                    </div>

                  </div>
                ) : (
                  <p className="text-sm text-[#6B7280]">
                    No specialization has been added yet.
                  </p>
                )}

              </section>


              {/* QUALIFICATION */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Education"
                  title="Qualification & Education"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-[#F8FAFC] border border-[#EEF2F6] p-5">

                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                      Highest Qualification
                    </p>

                    <p className="text-sm md:text-base font-bold text-[#1F2937]">
                      {qualification}
                    </p>

                  </div>


                  <div className="rounded-2xl bg-[#F8FAFC] border border-[#EEF2F6] p-5">

                    <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-2">
                      College / University
                    </p>

                    <p className="text-sm md:text-base font-bold text-[#1F2937]">
                      {college}
                    </p>

                  </div>

                </div>

              </section>


              {/* LOCATION */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Location"
                  title="Teaching Locations"
                />

                <div className="mb-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">

                      <svg
                        width="18"
                        height="18"
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

                    </div>

                    <div>

                      <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF]">
                        City
                      </p>

                      <p className="text-sm font-bold text-[#1F2937]">
                        {city}
                      </p>

                    </div>

                  </div>

                </div>


                <div>

                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#9CA3AF] mb-3">
                    Areas Served
                  </p>

                  <TagList
                    items={areas}
                    emptyText="Specific areas have not been added."
                  />

                </div>

              </section>


              {/* TEACHING MODE */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="Learning Format"
                  title="Teaching Mode"
                />

                <div className="flex flex-wrap gap-3">

                  <div className="inline-flex items-center gap-2 bg-[#EBF4FF] text-[#0A6FF7] rounded-2xl px-4 py-3 text-sm font-bold">

                    <svg
                      width="17"
                      height="17"
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

                    {mode}

                  </div>

                </div>

              </section>


              {/* VERIFICATION */}

              <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8">

                <SectionTitle
                  eyebrow="TutorWave"
                  title="Verification"
                />

                <div className="rounded-2xl bg-[#F8FAFC] border border-[#EEF2F6] p-5">

                  <div className="flex items-start gap-4">

                    <div className="w-11 h-11 rounded-full bg-[#E6F7F5] text-[#0C8F81] flex items-center justify-center flex-shrink-0">

                      <CheckIcon />

                    </div>

                    <div>

                      <h3 className="font-bold text-[#1F2937] mb-1">
                        {isVerified
                          ? 'Verified Tutor Profile'
                          : 'Tutor Profile'}
                      </h3>

                      <p className="text-sm text-[#6B7280] leading-relaxed">
                        {isVerified
                          ? 'This tutor has been verified by TutorWave and is eligible to appear in our public tutor directory.'
                          : 'This tutor profile is currently available in the TutorWave directory.'}
                      </p>

                    </div>

                  </div>

                </div>

              </section>

            </div>


            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="space-y-5">


              {/* QUICK PROFILE SUMMARY */}

              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 lg:sticky lg:top-24">

                <h2 className="text-lg font-bold text-[#0D1118] mb-5">
                  Tutor Overview
                </h2>


                <DetailRow
                  label="Qualification"
                  value={qualification}
                  icon={
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 10L12 5 2 10l10 5 10-5Z" />
                      <path d="M6 12v5c3 2 9 2 12 0v-5" />
                    </svg>
                  }
                />


                <DetailRow
                  label="College"
                  value={college}
                  icon={
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 21h18" />
                      <path d="M5 21V7l7-4 7 4v14" />
                      <path d="M9 21v-4h6v4" />
                    </svg>
                  }
                />


                <DetailRow
                  label="Experience"
                  value={experience}
                  icon={
                    <svg
                      width="17"
                      height="17"
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
                  }
                />


                <DetailRow
                  label="Location"
                  value={city}
                  icon={
                    <svg
                      width="17"
                      height="17"
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
                  }
                />


                <DetailRow
                  label="Teaching Mode"
                  value={mode}
                  icon={
                    <svg
                      width="17"
                      height="17"
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
                  }
                />


                <div className="pt-5">

                  <Link
                    href="/find-a-tutor"
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
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>

                  </Link>

                </div>

              </div>


              {/* TRUST CARD */}

              <div className="bg-[#0D1118] rounded-3xl p-6 text-white">

                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">

                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>

                </div>

                <h3 className="text-base font-bold mb-2">
                  Looking for a verified tutor?
                </h3>

                <p className="text-xs text-[#AAB2BF] leading-relaxed mb-5">
                  TutorWave helps parents discover tutors based
                  on subjects, classes, boards, location and
                  teaching mode.
                </p>

                <Link
                  href="/find-a-tutor"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#8EC5FF] transition-colors"
                >
                  Find a Tutor

                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>

                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="pb-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="bg-[#0D1118] rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

            <div>

              <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#5EA7FF] mb-2">
                TutorWave
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Looking for the right tutor for your child?
              </h2>

              <p className="text-sm text-[#9CA3AF] max-w-2xl leading-relaxed">
                Tell us your requirements and our team will
                help identify suitable tutor options.
              </p>

            </div>

            <Link
              href="/find-a-tutor"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Find a Tutor

              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>

            </Link>

          </div>

        </div>

      </section>


      <Footer />

      <WhatsAppButton />

    </main>
  );
}
```
