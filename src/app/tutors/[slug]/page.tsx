import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const CRM_API_URL =
  process.env.TUTORWAVE_CRM_URL ||
  'https://tutorwave-crm-xi.vercel.app';

/* =========================================================
   TYPES
========================================================= */

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
  specialization?: string;

  experienceYears?: number | string;

  bio?: string;

  rating?: number;
  totalPlacements?: number;

  isVerified?: boolean;

  /* Optional / future CRM fields */
  languages?: string[];
  teachingLanguages?: string[];

  availability?: string;
  availabilityDays?: string[];
  availabilityTime?: string;

  feeRange?: string;
  hourlyRate?: string | number;
  fees?: string;

  studentsTaught?: number | string;
  totalStudents?: number | string;

  schoolsTaught?: string[];
  previousInstitutions?: string[];
  institutions?: string[];

  teachingExperience?: string;
  experienceDetails?: string;

  teachingApproach?: string;
  teachingMethodology?: string;

  achievements?: string[];
  certifications?: string[];

  schoolExperience?: string;

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

function tutorMatchesSlug(tutor: Tutor, rawSlug: string) {
  if (!tutor?.id || !tutor?.fullName) {
    return false;
  }

  const slug = normalize(safeDecode(rawSlug));
  const nameSlug = normalize(tutor.fullName);

  const id = String(tutor.id).toLowerCase();
  const idShort = id.replace(/-/g, '').slice(0, 8);

  const expectedSlug = `${nameSlug}-${idShort}`;

  if (slug === expectedSlug) {
    return true;
  }

  if (slug.startsWith(`${nameSlug}-`)) {
    const suffix = slug.slice(nameSlug.length + 1);

    if (
      suffix === idShort ||
      id.replace(/-/g, '').startsWith(suffix)
    ) {
      return true;
    }
  }

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

function formatExperience(
  value?: number | string
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  return `${value} ${
    String(value) === '1' ? 'year' : 'years'
  }`;
}

function formatMode(mode?: string) {
  if (!mode) return null;

  const value = mode.toLowerCase().trim();

  if (value === 'both') {
    return 'Home & Online';
  }

  if (value === 'online') {
    return 'Online Tuition';
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
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join('');
}

function cleanArray(
  value: any
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        item !== undefined &&
        item !== null &&
        String(item).trim() !== ''
    )
    .map((item) => String(item).trim());
}

function firstArray(
  ...values: any[]
): string[] {
  for (const value of values) {
    const result = cleanArray(value);

    if (result.length > 0) {
      return result;
    }
  }

  return [];
}

function firstText(
  ...values: any[]
): string | null {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ''
    ) {
      return String(value).trim();
    }
  }

  return null;
}

function formatNumber(
  value?: number | string
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  return String(value);
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8">
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#0A6FF7] mb-2">
          {eyebrow}
        </p>
      )}

      <h2 className="text-xl sm:text-2xl font-bold text-[#0D1118] mb-6">
        {title}
      </h2>

      {children}
    </section>
  );
}

function Tag({
  children,
  blue = false,
}: {
  children: React.ReactNode;
  blue?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-medium ${
        blue
          ? 'bg-[#EBF4FF] text-[#0A6FF7]'
          : 'bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151]'
      }`}
    >
      {children}
    </span>
  );
}

function InfoRow({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string | null;
  icon: React.ReactNode;
}) {
  if (!value) return null;

  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
          {label}
        </p>

        <p className="text-base font-semibold text-[#0D1118]">
          {value}
        </p>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
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
      `${name} is a TutorWave tutor available for ${subjects} in ${city}.`,
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
     NORMALIZED DATA
  ======================================================= */

  const name =
    tutor.fullName || 'Tutor';

  const photo =
    tutor.profilePhoto || '';

  const subjects =
    cleanArray(tutor.subjects);

  const classes =
    cleanArray(tutor.classes);

  const boards =
    cleanArray(tutor.boards);

  const areas =
    cleanArray(tutor.areas);

  const languages = firstArray(
    tutor.languages,
    tutor.teachingLanguages
  );

  const schoolsTaught = firstArray(
    tutor.schoolsTaught,
    tutor.previousInstitutions,
    tutor.institutions
  );

  const achievements =
    cleanArray(tutor.achievements);

  const certifications =
    cleanArray(tutor.certifications);

  const city =
    tutor.city || 'Delhi NCR';

  const experience =
    formatExperience(tutor.experienceYears);

  const mode =
    formatMode(tutor.mode);

  const qualification =
    firstText(
      tutor.highestQualification
    );

  const college =
    firstText(tutor.college);

  const specialization =
    firstText(tutor.specialization);

  const experienceDetails =
    firstText(
      tutor.teachingExperience,
      tutor.experienceDetails,
      tutor.schoolExperience
    );

  const teachingApproach =
    firstText(
      tutor.teachingApproach,
      tutor.teachingMethodology
    );

  const availability =
    firstText(tutor.availability);

  const availabilityTime =
    firstText(tutor.availabilityTime);

  const feeRange =
    firstText(
      tutor.feeRange,
      tutor.fees,
      tutor.hourlyRate
    );

  const studentsTaught =
    formatNumber(
      tutor.studentsTaught ??
      tutor.totalStudents
    );

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

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      <Header />

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4">

          <div className="flex items-center gap-2 text-sm text-[#6B7280]">

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

        </div>
      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-white border-b border-[#E5E7EB]">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr_auto] gap-7 lg:gap-10 items-start">

            {/* PHOTO */}

            <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-3xl overflow-hidden bg-[#EBF4FF] border border-[#E5E7EB] shadow-sm">

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

            {/* MAIN INFORMATION */}

            <div>

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1118] tracking-tight">
                  {name}
                </h1>

                {tutor.isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#0C8F81] px-3 py-1.5 rounded-full text-xs font-bold">
                    <CheckIcon />
                    Verified Tutor
                  </span>
                )}

              </div>

              {subjects.length > 0 && (
                <p className="text-lg text-[#5F6B7A] mb-6">
                  {subjects.join(' • ')}
                </p>
              )}

              <div className="flex flex-wrap gap-3">

                {experience && (
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A6FF7"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 2" />
                    </svg>
                    {experience}
                  </div>
                )}

                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                  <svg
                    width="16"
                    height="16"
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

                {mode && (
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                    <svg
                      width="16"
                      height="16"
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
                )}

              </div>

            </div>

            {/* QUICK STATS */}

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">

              {rating !== null && (
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4 min-w-[145px]">

                  <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                    Rating
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#0D1118]">
                      {rating.toFixed(1)}
                    </span>

                    <span className="text-[#F59E0B]">
                      ★
                    </span>
                  </div>

                </div>
              )}

              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4 min-w-[145px]">

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
          MAIN
      =================================================== */}

      <section className="py-8 sm:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-7 lg:gap-8">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-6">

              {/* ABOUT */}

              <Section
                title={`About ${name}`}
                eyebrow="Tutor introduction"
              >
                <p className="text-[#4B5563] leading-8 text-[15px] sm:text-base">
                  {bio}
                </p>
              </Section>

              {/* QUICK OVERVIEW */}

              <Section
                title="Tutor at a Glance"
                eyebrow="Quick overview"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                  {experience && (
                    <InfoRow
                      label="Teaching Experience"
                      value={experience}
                      icon={
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>
                      }
                    />
                  )}

                  <InfoRow
                    label="Teaching Location"
                    value={city}
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    }
                  />

                  <InfoRow
                    label="Teaching Mode"
                    value={mode}
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
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
                    }
                  />

                  <InfoRow
                    label="Students Taught"
                    value={studentsTaught}
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <circle cx="9" cy="8" r="3" />
                        <path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
                        <path d="M16 11c2.5 0 5 1.8 5 5" />
                      </svg>
                    }
                  />

                </div>

              </Section>

              {/* TEACHING PROFILE */}

              <Section
                title="Teaching Profile"
                eyebrow="Academic expertise"
              >

                <div className="space-y-7">

                  {subjects.length > 0 && (
                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Subjects
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {subjects.map((subject) => (
                          <Tag
                            key={subject}
                            blue
                          >
                            {subject}
                          </Tag>
                        ))}
                      </div>

                    </div>
                  )}

                  {classes.length > 0 && (
                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Classes
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {classes.map((item) => (
                          <Tag key={item}>
                            {item}
                          </Tag>
                        ))}
                      </div>

                    </div>
                  )}

                  {boards.length > 0 && (
                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Boards
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {boards.map((board) => (
                          <Tag key={board}>
                            {board}
                          </Tag>
                        ))}
                      </div>

                    </div>
                  )}

                  {specialization && (
                    <div>

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Specialisation
                      </p>

                      <p className="text-[#374151] leading-7">
                        {specialization}
                      </p>

                    </div>
                  )}

                </div>

              </Section>

              {/* EDUCATION */}

              {(qualification || college) && (
                <Section
                  title="Education & Qualifications"
                  eyebrow="Academic background"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {qualification && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5">

                        <div className="w-11 h-11 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] mb-4">

                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M22 10l-10-5-10 5 10 5 10-5Z" />
                            <path d="M6 12v5c3 2 9 2 12 0v-5" />
                          </svg>

                        </div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          Highest Qualification
                        </p>

                        <p className="font-semibold text-[#0D1118]">
                          {qualification}
                        </p>

                      </div>
                    )}

                    {college && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5">

                        <div className="w-11 h-11 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] mb-4">

                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M4 4h16v16H4z" />
                            <path d="M8 8h8M8 12h8M8 16h5" />
                          </svg>

                        </div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          College / University
                        </p>

                        <p className="font-semibold text-[#0D1118]">
                          {college}
                        </p>

                      </div>
                    )}

                  </div>

                </Section>
              )}

              {/* EXPERIENCE */}

              {(experience || experienceDetails) && (
                <Section
                  title="Teaching Experience"
                  eyebrow="Professional experience"
                >

                  <div className="flex gap-5">

                    <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <rect
                          x="3"
                          y="7"
                          width="18"
                          height="13"
                          rx="2"
                        />
                        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                        <path d="M3 12h18" />
                      </svg>

                    </div>

                    <div>

                      {experience && (
                        <p className="text-lg font-bold text-[#0D1118] mb-2">
                          {experience} of teaching experience
                        </p>
                      )}

                      {experienceDetails && (
                        <p className="text-[#4B5563] leading-7">
                          {experienceDetails}
                        </p>
                      )}

                    </div>

                  </div>

                </Section>
              )}

              {/* SCHOOLS / INSTITUTIONS */}

              {schoolsTaught.length > 0 && (
                <Section
                  title="Students & Institutions"
                  eyebrow="Teaching exposure"
                >

                  <p className="text-[#6B7280] mb-5">
                    Has taught students from:
                  </p>

                  <div className="flex flex-wrap gap-2.5">

                    {schoolsTaught.map((school) => (
                      <Tag key={school}>
                        {school}
                      </Tag>
                    ))}

                  </div>

                </Section>
              )}

              {/* TEACHING APPROACH */}

              {teachingApproach && (
                <Section
                  title="Teaching Approach"
                  eyebrow="How the tutor teaches"
                >

                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                    <p className="text-[#374151] leading-8">
                      {teachingApproach}
                    </p>

                  </div>

                </Section>
              )}

              {/* LANGUAGES */}

              {languages.length > 0 && (
                <Section
                  title="Languages"
                  eyebrow="Communication"
                >

                  <div className="flex flex-wrap gap-2.5">

                    {languages.map((language) => (
                      <Tag key={language}>
                        {language}
                      </Tag>
                    ))}

                  </div>

                </Section>
              )}

              {/* LOCATION */}

              <Section
                title="Teaching Location"
                eyebrow="Where the tutor teaches"
              >

                <div className="space-y-6">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">

                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280]">
                        City
                      </p>

                      <p className="text-lg font-bold text-[#0D1118]">
                        {city}
                      </p>

                    </div>

                  </div>

                  {areas.length > 0 && (
                    <div>

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                        Areas Served
                      </p>

                      <div className="flex flex-wrap gap-2.5">

                        {areas.map((area) => (
                          <Tag key={area}>
                            {area}
                          </Tag>
                        ))}

                      </div>

                    </div>
                  )}

                </div>

              </Section>

              {/* AVAILABILITY */}

              {(availability ||
                availabilityTime ||
                tutor.availabilityDays) && (
                <Section
                  title="Availability"
                  eyebrow="When the tutor may be available"
                >

                  <div className="space-y-5">

                    {availability && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          Availability
                        </p>

                        <p className="text-[#374151] font-medium">
                          {availability}
                        </p>

                      </div>
                    )}

                    {availabilityTime && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          Preferred Time
                        </p>

                        <p className="text-[#374151] font-medium">
                          {availabilityTime}
                        </p>

                      </div>
                    )}

                    {cleanArray(tutor.availabilityDays).length > 0 && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Days
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {cleanArray(
                            tutor.availabilityDays
                          ).map((day) => (
                            <Tag key={day}>
                              {day}
                            </Tag>
                          ))}

                        </div>

                      </div>
                    )}

                  </div>

                </Section>
              )}

              {/* ACHIEVEMENTS */}

              {achievements.length > 0 && (
                <Section
                  title="Achievements"
                  eyebrow="Additional highlights"
                >

                  <div className="space-y-3">

                    {achievements.map(
                      (achievement, index) => (
                        <div
                          key={`${achievement}-${index}`}
                          className="flex items-start gap-3"
                        >

                          <div className="mt-1 text-[#0A6FF7]">
                            <CheckIcon />
                          </div>

                          <p className="text-[#374151] leading-7">
                            {achievement}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* CERTIFICATIONS */}

              {certifications.length > 0 && (
                <Section
                  title="Certifications"
                  eyebrow="Additional qualifications"
                >

                  <div className="flex flex-wrap gap-2.5">

                    {certifications.map(
                      (certificate) => (
                        <Tag key={certificate}>
                          {certificate}
                        </Tag>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* MOBILE CTA */}

              <div className="lg:hidden bg-white border border-[#E5E7EB] rounded-3xl p-6">

                <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                  TutorWave
                </p>

                <h2 className="text-xl font-bold text-[#0D1118] mb-2">
                  Interested in {name}?
                </h2>

                <p className="text-sm text-[#6B7280] leading-6 mb-5">
                  Tell us about your child's requirements
                  and our team will help you proceed.
                </p>

                <Link
                  href="/find-a-tutor"
                  className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl"
                >
                  Request This Tutor
                  <span>→</span>
                </Link>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* REQUEST CARD */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave Profile
                  </p>

                  <h2 className="text-2xl font-bold text-[#0D1118]">
                    Interested in this tutor?
                  </h2>

                  <p className="text-sm text-[#6B7280] mt-3 leading-6">
                    Share your tuition requirement with
                    TutorWave and our team will help you
                    proceed with a suitable tutor.
                  </p>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-4 rounded-xl hover:bg-[#0858c8] transition-colors mt-6"
                  >
                    Request This Tutor
                    <span>→</span>
                  </Link>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-4 rounded-xl hover:bg-[#DCEBFF] transition-colors mt-3"
                  >
                    Find a Different Tutor
                  </Link>

                  <div className="border-t border-[#E5E7EB] mt-6 pt-6">

                    <div className="flex items-start gap-3">

                      <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] flex items-center justify-center flex-shrink-0 text-[#0C8F81]">
                        <CheckIcon />
                      </div>

                      <div>

                        <p className="text-sm font-bold text-[#0D1118]">
                          {tutor.isVerified
                            ? 'Verified Tutor'
                            : 'Tutor Profile'}
                        </p>

                        <p className="text-xs text-[#6B7280] mt-1 leading-5">
                          {tutor.isVerified
                            ? 'This tutor profile has been reviewed and verified by the TutorWave team.'
                            : 'Tutor verification information is available through the TutorWave team.'}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* PROFILE SUMMARY */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <h3 className="font-bold text-[#0D1118] mb-5">
                    Profile Summary
                  </h3>

                  <div className="space-y-4">

                    {subjects.length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-[#6B7280]">
                          Subjects
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {subjects.length}
                        </span>
                      </div>
                    )}

                    {classes.length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-[#6B7280]">
                          Classes
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {classes.length}
                        </span>
                      </div>
                    )}

                    {boards.length > 0 && (
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-[#6B7280]">
                          Boards
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {boards.join(', ')}
                        </span>
                      </div>
                    )}

                    {experience && (
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-[#6B7280]">
                          Experience
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {experience}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between gap-4">
                      <span className="text-sm text-[#6B7280]">
                        Location
                      </span>

                      <span className="text-sm font-semibold text-[#0D1118] text-right">
                        {city}
                      </span>
                    </div>

                    {mode && (
                      <div className="flex justify-between gap-4">
                        <span className="text-sm text-[#6B7280]">
                          Mode
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {mode}
                        </span>
                      </div>
                    )}

                  </div>

                </div>

                {/* FEE */}

                {feeRange && (
                  <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                    <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                      Fee Information
                    </p>

                    <p className="text-lg font-bold text-[#0D1118]">
                      {feeRange}
                    </p>

                    <p className="text-xs text-[#6B7280] mt-2 leading-5">
                      Final fee may depend on class,
                      subject, location and tuition
                      requirements.
                    </p>

                  </div>
                )}

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#0D1118] py-12 sm:py-16">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <p className="text-[#5DB8FF] text-sm font-bold uppercase tracking-[0.15em] mb-3">
            TutorWave
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Looking for the right tutor for your child?
          </h2>

          <p className="text-white/60 mt-3 max-w-2xl mx-auto leading-7">
            Tell us your child's class, subject, location
            and learning requirements. Our team will help
            you find a suitable tutor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Find a Tutor
              <span>→</span>
            </Link>

            <Link
              href="/tutors"
              className="inline-flex items-center justify-center bg-white/10 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-white/15 transition-colors"
            >
              Browse All Tutors
            </Link>

          </div>

        </div>

      </section>

      <Footer />

      <WhatsAppButton />

    </main>
  );
}
