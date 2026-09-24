import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

/* =========================================================
   CONFIG
========================================================= */

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
  schoolExperience?: string;

  teachingApproach?: string;
  teachingMethodology?: string;

  achievements?: string[];
  certifications?: string[];

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

function cleanArray(value: any): string[] {
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

function firstArray(...values: any[]): string[] {
  for (const value of values) {
    const result = cleanArray(value);

    if (result.length > 0) {
      return result;
    }
  }

  return [];
}

function firstText(...values: any[]): string | null {
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

function formatExperience(value?: number | string) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  const numericValue = Number(value);

  if (!Number.isNaN(numericValue)) {
    if (numericValue === 1) {
      return '1 Year';
    }

    return `${numericValue}+ Years`;
  }

  const textValue = String(value).trim();

  if (
    textValue.toLowerCase().includes('year')
  ) {
    return textValue;
  }

  return `${textValue}+ Years`;
}

function formatMode(mode?: string) {
  if (!mode) return null;

  const value = mode.toLowerCase().trim();

  if (value === 'both') {
    return 'Home + Online';
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
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join('');
}

function tutorMatchesSlug(
  tutor: Tutor,
  rawSlug: string
) {
  if (!tutor?.id || !tutor?.fullName) {
    return false;
  }

  const slug = normalize(
    safeDecode(rawSlug)
  );

  const nameSlug = normalize(
    tutor.fullName
  );

  const id = String(tutor.id).toLowerCase();

  const idWithoutHyphens =
    id.replace(/-/g, '');

  const idShort =
    idWithoutHyphens.slice(0, 8);

  const expectedSlug =
    `${nameSlug}-${idShort}`;

  if (slug === expectedSlug) {
    return true;
  }

  if (slug.startsWith(`${nameSlug}-`)) {
    const suffix =
      slug.slice(nameSlug.length + 1);

    if (
      suffix === idShort ||
      idWithoutHyphens.startsWith(suffix)
    ) {
      return true;
    }
  }

  if (slug === nameSlug) {
    return true;
  }

  return false;
}

/* =========================================================
   API
========================================================= */

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

    const data: ApiResponse =
      await response.json();

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
      tutorMatchesSlug(
        tutor,
        rawSlug
      )
    ) || null
  );
}

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function CheckIcon({
  size = 17,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12l4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function Section({
  title,
  children,
  className = '',
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 ${className}`}
    >
      <h2 className="text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mb-6">
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
      className={`inline-flex items-center rounded-xl px-3.5 py-2 text-sm font-medium ${
        blue
          ? 'bg-[#EBF4FF] text-[#0A6FF7]'
          : 'bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151]'
      }`}
    >
      {children}
    </span>
  );
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value) return null;

  return (
    <div className="py-4 border-b border-[#EEF0F3] last:border-b-0">
      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1.5">
        {label}
      </p>

      <p className="text-[15px] sm:text-base font-semibold text-[#111827]">
        {value}
      </p>
    </div>
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

  const tutor =
    await findTutorBySlug(slug);

  if (!tutor) {
    return {
      title:
        'Tutor Profile | TutorWave',
      description:
        'Explore verified tutors available through TutorWave.',
    };
  }

  const name =
    tutor.fullName || 'Tutor';

  const subjects =
    cleanArray(tutor.subjects);

  const city =
    tutor.city || 'Delhi NCR';

  const subjectText =
    subjects.length > 0
      ? subjects.join(', ')
      : 'Multiple Subjects';

  return {
    title: `${name} — ${subjectText} Tutor in ${city} | TutorWave`,
    description:
      tutor.bio ||
      `${name} is a TutorWave tutor available for ${subjectText} in ${city}.`,
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

  const tutor =
    await findTutorBySlug(slug);

  /* =======================================================
     NOT FOUND
  ======================================================= */

  if (!tutor) {
    return (
      <main className="min-h-screen bg-[#F7F9FC]">
        <Header />

        <section className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center max-w-lg">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#111827] mb-3">
              Tutor Profile Not Found
            </h1>

            <p className="text-[#6B7280] leading-7 mb-8">
              We couldn't find this tutor
              profile in the TutorWave
              tutor network. The profile may
              have been removed, unpublished
              or is still being verified.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0858C8] transition-colors"
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

  const languages =
    firstArray(
      tutor.languages,
      tutor.teachingLanguages
    );

  const schools =
    firstArray(
      tutor.schoolsTaught,
      tutor.previousInstitutions,
      tutor.institutions
    );

  const experience =
    formatExperience(
      tutor.experienceYears
    );

  const mode =
    formatMode(tutor.mode);

  const qualification =
    firstText(
      tutor.highestQualification
    );

  const college =
    firstText(tutor.college);

  const specialization =
    firstText(
      tutor.specialization
    );

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
    firstText(
      tutor.availability
    );

  const availabilityTime =
    firstText(
      tutor.availabilityTime
    );

  const availabilityDays =
    cleanArray(
      tutor.availabilityDays
    );

  const city =
    tutor.city || 'Delhi NCR';

  const bio =
    tutor.bio?.trim() ||
    `${name} is a TutorWave tutor available for personalised tuition support.`;

  const hasEducation =
    Boolean(
      qualification ||
      college ||
      specialization
    );

  const hasExperience =
    Boolean(
      experience ||
      experienceDetails ||
      schools.length > 0
    );

  const hasAvailability =
    Boolean(
      availability ||
      availabilityTime ||
      availabilityDays.length > 0 ||
      areas.length > 0
    );

  const hasAcademicExpertise =
    subjects.length > 0 ||
    classes.length > 0 ||
    boards.length > 0;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      <Header />

      {/* ===================================================
          BREADCRUMB
      =================================================== */}

      <div className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex items-center gap-2 text-sm text-[#6B7280]">

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

            <span className="text-[#111827] font-medium truncate">
              {name}
            </span>

          </div>

        </div>
      </div>

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="bg-white border-b border-[#E5E7EB]">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

          <div className="flex flex-col lg:flex-row gap-7 lg:gap-10 items-start">

            {/* PHOTO */}

            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl overflow-hidden bg-[#EBF4FF] border border-[#E5E7EB] shadow-sm flex-shrink-0">

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

            {/* INFORMATION */}

            <div className="flex-1 min-w-0">

              <div className="flex flex-wrap items-center gap-3 mb-2">

                <h1 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
                  {name}
                </h1>

                {tutor.isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E7F7F4] text-[#087F72] px-3 py-1.5 rounded-full text-xs font-bold">
                    <CheckIcon size={15} />
                    Verified
                  </span>
                )}

              </div>

              {experience && (
                <p className="text-base sm:text-lg font-semibold text-[#4B5563] mb-3">
                  {experience} Experience
                </p>
              )}

              {subjects.length > 0 && (
                <p className="text-base sm:text-lg text-[#5F6B7A] leading-7 mb-5">
                  {subjects.join(' • ')}
                </p>
              )}

              <div className="flex flex-wrap gap-2.5">

                {city && (
                  <span className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-sm font-medium text-[#374151]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A6FF7"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                      />
                    </svg>

                    {city}
                  </span>
                )}

                {mode && (
                  <span className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-3.5 py-2 rounded-xl text-sm font-medium text-[#374151]">
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
                  </span>
                )}

              </div>

            </div>

            {/* CTA */}

            <div className="w-full lg:w-auto lg:min-w-[210px]">

              <Link
                href="/find-a-tutor"
                className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#0858C8] transition-colors shadow-sm"
              >
                Request This Tutor
                <ArrowIcon />
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN
      =================================================== */}

      <section className="py-7 sm:py-9">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_290px] gap-6 lg:gap-8">

            {/* =================================================
                MAIN COLUMN
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  WHY CONSIDER
              ================================================= */}

              <Section title="Why Consider This Tutor">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">

                  {experience && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        {experience} of teaching experience
                      </p>

                    </div>
                  )}

                  {boards.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        {boards.join(' & ')} experience
                      </p>

                    </div>
                  )}

                  {subjects.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        {subjects.join(', ')}
                      </p>

                    </div>
                  )}

                  {classes.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        {classes.length === 1
                          ? `${classes[0]} students`
                          : `${classes[0]} – ${classes[classes.length - 1]} students`}
                      </p>

                    </div>
                  )}

                  {mode && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        {mode}
                        {city
                          ? ` in ${city}`
                          : ''}
                      </p>

                    </div>
                  )}

                  {specialization && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] font-medium">
                        Specialised in{' '}
                        {specialization}
                      </p>

                    </div>
                  )}

                </div>

              </Section>

              {/* =================================================
                  TUTOR AT A GLANCE
              ================================================= */}

              <Section title="Tutor at a Glance">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">

                  <DetailItem
                    label="Experience"
                    value={experience}
                  />

                  <DetailItem
                    label="Qualification"
                    value={qualification}
                  />

                  <DetailItem
                    label="Classes"
                    value={
                      classes.length > 0
                        ? classes.join(' • ')
                        : null
                    }
                  />

                  <DetailItem
                    label="Boards"
                    value={
                      boards.length > 0
                        ? boards.join(' • ')
                        : null
                    }
                  />

                  <DetailItem
                    label="Mode"
                    value={mode}
                  />

                  <DetailItem
                    label="Location"
                    value={city}
                  />

                </div>

              </Section>

              {/* =================================================
                  ACADEMIC EXPERTISE
              ================================================= */}

              {hasAcademicExpertise && (
                <Section title="Academic Expertise">

                  <div className="space-y-7">

                    {subjects.length > 0 && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Subjects
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {subjects.map(
                            (subject) => (
                              <Tag
                                key={subject}
                                blue
                              >
                                {subject}
                              </Tag>
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {classes.length > 0 && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Classes
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {classes.map(
                            (item) => (
                              <Tag key={item}>
                                {item}
                              </Tag>
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {boards.length > 0 && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Boards
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {boards.map(
                            (board) => (
                              <Tag key={board}>
                                {board}
                              </Tag>
                            )
                          )}

                        </div>

                      </div>
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  EDUCATION
              ================================================= */}

              {hasEducation && (
                <Section title="Education & Qualifications">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                    {qualification && (
                      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFBFC] p-5">

                        <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] mb-4">

                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M22 10l-10-5-10 5 10 5 10-5Z" />
                            <path d="M6 12v5c3 2 9 2 12 0v-5" />
                          </svg>

                        </div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1.5">
                          Qualification
                        </p>

                        <p className="font-bold text-[#111827]">
                          {qualification}
                        </p>

                      </div>
                    )}

                    {college && (
                      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFBFC] p-5">

                        <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] mb-4">

                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M4 4h16v16H4z" />
                            <path d="M8 8h8M8 12h8M8 16h5" />
                          </svg>

                        </div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1.5">
                          College / University
                        </p>

                        <p className="font-bold text-[#111827]">
                          {college}
                        </p>

                      </div>
                    )}

                  </div>

                  {specialization && (
                    <div className="mt-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-5">

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                        Specialisation
                      </p>

                      <p className="text-[#374151] leading-7">
                        {specialization}
                      </p>

                    </div>
                  )}

                </Section>
              )}

              {/* =================================================
                  TEACHING EXPERIENCE
              ================================================= */}

              {hasExperience && (
                <Section title="Teaching Experience">

                  <div className="flex gap-4">

                    <div className="w-11 h-11 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">

                      <svg
                        width="21"
                        height="21"
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

                    <div className="min-w-0">

                      {experience && (
                        <p className="text-lg font-bold text-[#111827] mb-2">
                          {experience} of teaching
                        </p>
                      )}

                      {experienceDetails && (
                        <p className="text-[#4B5563] leading-7">
                          {experienceDetails}
                        </p>
                      )}

                      {schools.length > 0 && (
                        <div className="mt-5">

                          <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                            Teaching Exposure
                          </p>

                          <div className="flex flex-wrap gap-2.5">

                            {schools.map(
                              (school) => (
                                <Tag key={school}>
                                  {school}
                                </Tag>
                              )
                            )}

                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </Section>
              )}

              {/* =================================================
                  ABOUT
              ================================================= */}

              <Section title="About the Tutor">

                <p className="text-[#4B5563] leading-8 text-[15px] sm:text-base">
                  {bio}
                </p>

              </Section>

              {/* =================================================
                  TEACHING APPROACH
              ================================================= */}

              {teachingApproach && (
                <Section title="Teaching Approach">

                  <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] p-5 sm:p-6">

                    <p className="text-[#374151] leading-8">
                      {teachingApproach}
                    </p>

                  </div>

                </Section>
              )}

              {/* =================================================
                  LOCATION & AVAILABILITY
              ================================================= */}

              {hasAvailability && (
                <Section title="Location & Availability">

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">

                    <DetailItem
                      label="Location"
                      value={city}
                    />

                    {mode && (
                      <DetailItem
                        label="Mode"
                        value={mode}
                      />
                    )}

                    {areas.length > 0 && (
                      <div className="py-4 sm:col-span-2 border-b border-[#EEF0F3]">

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Areas Served
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {areas.map(
                            (area) => (
                              <Tag key={area}>
                                {area}
                              </Tag>
                            )
                          )}

                        </div>

                      </div>
                    )}

                    {availability && (
                      <DetailItem
                        label="Availability"
                        value={availability}
                      />
                    )}

                    {availabilityTime && (
                      <DetailItem
                        label="Preferred Time"
                        value={availabilityTime}
                      />
                    )}

                    {availabilityDays.length > 0 && (
                      <div className="py-4 sm:col-span-2">

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Days
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {availabilityDays.map(
                            (day) => (
                              <Tag key={day}>
                                {day}
                              </Tag>
                            )
                          )}

                        </div>

                      </div>
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  LANGUAGES
              ================================================= */}

              {languages.length > 0 && (
                <Section title="Languages">

                  <div className="flex flex-wrap gap-2.5">

                    {languages.map(
                      (language) => (
                        <Tag key={language}>
                          {language}
                        </Tag>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  VERIFICATION
              ================================================= */}

              <Section title="TutorWave Verification">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#E7F7F4] text-[#087F72] flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={16} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#111827]">
                        Profile reviewed
                      </p>

                      <p className="text-sm text-[#6B7280] mt-1">
                        Tutor profile reviewed by TutorWave.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#E7F7F4] text-[#087F72] flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={16} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#111827]">
                        Qualification information
                      </p>

                      <p className="text-sm text-[#6B7280] mt-1">
                        Academic information reviewed where available.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#E7F7F4] text-[#087F72] flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={16} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#111827]">
                        Teaching information
                      </p>

                      <p className="text-sm text-[#6B7280] mt-1">
                        Teaching profile reviewed by TutorWave.
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <div className="w-9 h-9 rounded-lg bg-[#E7F7F4] text-[#087F72] flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={16} />
                    </div>

                    <div>
                      <p className="font-semibold text-[#111827]">
                        Profile photo
                      </p>

                      <p className="text-sm text-[#6B7280] mt-1">
                        Profile information maintained in the TutorWave network.
                      </p>
                    </div>

                  </div>

                </div>

              </Section>

              {/* =================================================
                  MOBILE CTA
              ================================================= */}

              <div className="lg:hidden">

                <div className="bg-[#0D1118] rounded-3xl p-6 sm:p-8">

                  <p className="text-[#5DB8FF] text-xs uppercase tracking-[0.14em] font-bold mb-2">
                    TutorWave
                  </p>

                  <h2 className="text-2xl font-bold text-white">
                    Interested in this tutor?
                  </h2>

                  <p className="text-white/60 text-sm leading-6 mt-3">
                    Tell us your child's requirements
                    and we'll help you proceed.
                  </p>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl mt-6 hover:bg-[#0858C8] transition-colors"
                  >
                    Request This Tutor
                    <ArrowIcon />
                  </Link>

                  <p className="text-xs text-white/40 text-center mt-3">
                    No obligation to hire.
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* REQUEST */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 shadow-sm">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h2 className="text-xl font-bold text-[#111827]">
                    Interested in this tutor?
                  </h2>

                  <p className="text-sm text-[#6B7280] leading-6 mt-3">
                    Tell us your child's class,
                    subject and tuition
                    requirements.
                  </p>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl mt-5 hover:bg-[#0858C8] transition-colors"
                  >
                    Request This Tutor
                    <ArrowIcon />
                  </Link>

                  <Link
                    href="/tutors"
                    className="flex items-center justify-center w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl mt-3 hover:bg-[#DCEBFF] transition-colors"
                  >
                    Browse Other Tutors
                  </Link>

                  <p className="text-xs text-[#6B7280] text-center mt-4">
                    No obligation to hire.
                  </p>

                </div>

                {/* QUICK SUMMARY */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <h3 className="font-bold text-[#111827] mb-4">
                    Quick Details
                  </h3>

                  <div className="space-y-4">

                    {experience && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Experience
                        </span>

                        <span className="text-sm font-semibold text-[#111827] text-right">
                          {experience}
                        </span>

                      </div>
                    )}

                    {qualification && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Qualification
                        </span>

                        <span className="text-sm font-semibold text-[#111827] text-right">
                          {qualification}
                        </span>

                      </div>
                    )}

                    {subjects.length > 0 && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Subjects
                        </span>

                        <span className="text-sm font-semibold text-[#111827] text-right">
                          {subjects.length}
                        </span>

                      </div>
                    )}

                    {city && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Location
                        </span>

                        <span className="text-sm font-semibold text-[#111827] text-right">
                          {city}
                        </span>

                      </div>
                    )}

                    {mode && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Mode
                        </span>

                        <span className="text-sm font-semibold text-[#111827] text-right">
                          {mode}
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
          HOW IT WORKS
      =================================================== */}

      <section className="bg-white border-t border-[#E5E7EB] py-10 sm:py-12">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-8">

            <p className="text-xs uppercase tracking-[0.14em] font-bold text-[#0A6FF7] mb-2">
              TutorWave
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
              How It Works
            </h2>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="text-center">

              <div className="w-11 h-11 mx-auto rounded-full bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center font-bold mb-4">
                1
              </div>

              <h3 className="font-bold text-[#111827]">
                Share your requirement
              </h3>

              <p className="text-sm text-[#6B7280] leading-6 mt-2">
                Tell us your child's class,
                subject, location and
                learning requirements.
              </p>

            </div>

            <div className="text-center">

              <div className="w-11 h-11 mx-auto rounded-full bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center font-bold mb-4">
                2
              </div>

              <h3 className="font-bold text-[#111827]">
                We confirm availability
              </h3>

              <p className="text-sm text-[#6B7280] leading-6 mt-2">
                Our team checks the tutor's
                availability and requirement
                match.
              </p>

            </div>

            <div className="text-center">

              <div className="w-11 h-11 mx-auto rounded-full bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center font-bold mb-4">
                3
              </div>

              <h3 className="font-bold text-[#111827]">
                We help you proceed
              </h3>

              <p className="text-sm text-[#6B7280] leading-6 mt-2">
                We connect you with the tutor
                and help you take the next step.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <Footer />

      <WhatsAppButton />

    </main>
  );
}
