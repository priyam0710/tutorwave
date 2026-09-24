
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
  location?: string;
  area?: string;
  locality?: string;
  areas?: string[] | string;

  subjects?: string[] | string;
  classes?: string[] | string;
  boards?: string[] | string;

  mode?: string;
  teachingMode?: string | string[];
  preferredMode?: string;
  modes?: string[];

  highestQualification?: string;
  degree?: string;
  qualification?: string;
  college?: string;
  collegeUniversity?: string;
  university?: string;
  institution?: string;
  specialization?: string;

  experienceYears?: number | string;
  experience?: number | string;

  bio?: string;
  about?: string;
  aboutTutor?: string;
  description?: string;

  rating?: number | string;
  averageRating?: number | string;

  isVerified?: boolean;
  verified?: boolean;
  verificationStatus?: string;
  status?: string;

  languages?: string[] | string;
  teachingLanguages?: string[] | string;
  language?: string;
  spokenLanguages?: string[] | string;

  availability?: string;
  availabilityDays?: string[] | string;
  availabilityTime?: string;
  availableTimings?: string;
  preferredTiming?: string;
  timings?: string;

  feeRange?: string;
  hourlyRate?: string | number;
  fees?: string;

  studentsTaught?: number | string;
  totalStudents?: number | string;
  studentsCount?: number | string;

  /* School / teaching background */
  schoolsTaught?: string[] | string;
  previousInstitutions?: string[] | string;
  institutions?: string[] | string;
  schoolNames?: string[] | string;
  studentsTaughtFromSchools?: string[] | string;

  schoolExperience?: string;
  schoolTeachingExperience?: string;
  schoolExperienceYears?: string | number;

  teachingExperience?: string;
  experienceDetails?: string;

  teachingApproach?: string;
  teachingMethodology?: string;
  approach?: string;
  teachingMethods?: string[] | string;

  achievements?: string[] | string;
  certifications?: string[] | string;

  /* Actual nested CRM structure */
  teaching?: {
    experience?: number | string;

    schoolExperience?: string;
    schoolTeachingExperience?: string;
    schoolExperienceYears?: number | string;

    studentsTaughtFrom?: string | string[];
    studentsTaughtFromSchools?: string | string[];

    boards?: string[] | string;

    primaryClasses?: string[] | string;
    primarySubjects?: string[] | string;

    secondaryClasses?: string[] | string;
    secondarySubjects?: string[] | string;

    seniorSecondaryClasses?: string[] | string;
    seniorSecondarySubjects?: string[] | string;

    englishFluency?: string;
  };

  education?: {
    highestQualification?: string;
    college?: string;
    university?: string;
    stream?: string;
    specialization?: string;
    additionalQualification?: string;
  };

  personal?: {
    fullName?: string;
    profilePhoto?: string;
    city?: string;
    location?: string;
  };

  preferences?: {
    teachingMode?: string[] | string;
    offlineAreas?: string | string[];
    availability?: string[] | string;
    studentTypes?: string[] | string;
  };

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

  const idShort = id
    .replace(/-/g, '')
    .slice(0, 8);

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
      id
        .replace(/-/g, '')
        .startsWith(suffix)
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
   ARRAY / TEXT NORMALIZATION
========================================================= */

function cleanArray(
  value: any
): string[] {
  if (
    value === undefined ||
    value === null
  ) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .flat(Infinity)
      .filter(
        (item) =>
          item !== undefined &&
          item !== null &&
          String(item).trim() !== ''
      )
      .map((item) =>
        String(item).trim()
      )
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    const text = value.trim();

    if (!text) {
      return [];
    }

    return text
      .split(/[,;|•\n]+/)
      .map((item) =>
        item.trim()
      )
      .filter(Boolean);
  }

  return [
    String(value).trim(),
  ].filter(Boolean);
}

function firstArray(
  ...values: any[]
): string[] {
  for (const value of values) {
    const result =
      cleanArray(value);

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

function formatExperience(
  value?: number | string | null
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  const text =
    String(value).trim();

  if (
    /year|years|month|months/i.test(
      text
    )
  ) {
    return text;
  }

  return `${text} ${
    text === '1'
      ? 'year'
      : 'years'
  }`;
}

function formatMode(
  mode?: string | string[] | null
) {
  const values =
    cleanArray(mode);

  if (values.length === 0) {
    return null;
  }

  const normalized =
    values.map((value) =>
      value
        .toLowerCase()
        .trim()
    );

  const hasHome =
    normalized.includes('home') ||
    normalized.includes('offline') ||
    normalized.includes(
      'home tuition'
    );

  const hasOnline =
    normalized.includes('online') ||
    normalized.includes(
      'online tuition'
    );

  if (hasHome && hasOnline) {
    return 'Home & Online';
  }

  if (hasOnline) {
    return 'Online Tuition';
  }

  if (hasHome) {
    return 'Home Tuition';
  }

  return values.join(' • ');
}

function initials(
  name?: string
) {
  if (!name) return 'TW';

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part
        .charAt(0)
        .toUpperCase()
    )
    .join('');
}

function formatNumber(
  value?: number | string | null
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
   UI COMPONENTS
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
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A6FF7] mb-2">
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

      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-1">
          {label}
        </p>

        <p className="text-base font-semibold text-[#0D1118] break-words">
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
      strokeLinecap="round"
      strokeLinejoin="round"
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
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } =
    await params;

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
    tutor.fullName ||
    tutor.personal?.fullName ||
    'Tutor';

  const subjects =
    firstArray(
      tutor.subjects,
      tutor.teaching?.primarySubjects,
      tutor.teaching?.secondarySubjects,
      tutor.teaching?.seniorSecondarySubjects
    );

  const city =
    firstText(
      tutor.city,
      tutor.location,
      tutor.personal?.city,
      tutor.personal?.location
    ) || 'Delhi NCR';

  return {
    title:
      `${name} — ${
        subjects.length
          ? subjects.join(', ')
          : 'Home Tuition'
      } Tutor in ${city} | TutorWave`,

    description:
      tutor.bio ||
      tutor.about ||
      `${name} is a TutorWave tutor available for personalized tuition in ${city}.`,
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const tutor =
    await findTutorBySlug(slug);

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
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0D1118] mb-3">
              Tutor Profile Not Found
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              We couldn't find this tutor profile in the TutorWave tutor network. The profile may have been removed, unpublished or is still being verified.
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
    tutor.fullName ||
    tutor.personal?.fullName ||
    'Tutor';

  const photo =
    tutor.profilePhoto ||
    tutor.personal?.profilePhoto ||
    '';

  const subjects =
    firstArray(
      tutor.subjects,
      tutor.teaching?.primarySubjects,
      tutor.teaching?.secondarySubjects,
      tutor.teaching?.seniorSecondarySubjects
    );

  const classes =
    firstArray(
      tutor.classes,
      tutor.teaching?.primaryClasses,
      tutor.teaching?.secondaryClasses,
      tutor.teaching?.seniorSecondaryClasses
    );

  const boards =
    firstArray(
      tutor.boards,
      tutor.teaching?.boards
    );

  const city =
    firstText(
      tutor.city,
      tutor.location,
      tutor.area,
      tutor.locality,
      tutor.personal?.city,
      tutor.personal?.location
    ) || 'Delhi NCR';

  const areas =
    firstArray(
      tutor.areas,
      tutor.preferences?.offlineAreas
    );

  const languages =
    firstArray(
      tutor.languages,
      tutor.teachingLanguages,
      tutor.language,
      tutor.spokenLanguages
    );

  const rawExperience =
    tutor.experienceYears ??
    tutor.experience ??
    tutor.teaching?.experience;

  const experience =
    formatExperience(
      rawExperience
    );

  const mode =
    formatMode(
      tutor.mode ??
      tutor.teachingMode ??
      tutor.modes ??
      tutor.preferredMode ??
      tutor.preferences?.teachingMode
    );

  const qualification =
    firstText(
      tutor.highestQualification,
      tutor.qualification,
      tutor.degree,
      tutor.education?.highestQualification
    );

  const college =
    firstText(
      tutor.college,
      tutor.university,
      tutor.collegeUniversity,
      tutor.institution,
      tutor.education?.college,
      tutor.education?.university
    );

  const specialization =
    firstText(
      tutor.specialization,
      tutor.education?.specialization
    );

  const experienceDetails =
    firstText(
      tutor.teachingExperience,
      tutor.experienceDetails
    );

  /* =======================================================
     SCHOOL TEACHING EXPERIENCE
  ======================================================= */

  const schoolExperience =
    firstText(
      tutor.schoolExperience,
      tutor.schoolTeachingExperience,
      tutor.schoolExperienceYears,
      tutor.teaching?.schoolExperience,
      tutor.teaching?.schoolTeachingExperience,
      tutor.teaching?.schoolExperienceYears
    );

  /* =======================================================
     STUDENTS TAUGHT FROM / SCHOOL NAMES
  ======================================================= */

  const schoolsTaught =
    firstArray(
      tutor.schoolsTaught,
      tutor.schoolNames,
      tutor.studentsTaughtFromSchools,
      tutor.previousInstitutions,
      tutor.institutions,
      tutor.teaching?.studentsTaughtFrom,
      tutor.teaching?.studentsTaughtFromSchools
    );

  const studentsTaught =
    formatNumber(
      tutor.studentsTaught ??
      tutor.totalStudents ??
      tutor.studentsCount
    );

  const bio =
    firstText(
      tutor.bio,
      tutor.about,
      tutor.aboutTutor,
      tutor.description
    ) ||
    `${name} is a TutorWave tutor available for personalized tuition support.`;

  const teachingApproach =
    firstText(
      tutor.teachingApproach,
      tutor.teachingMethodology,
      tutor.approach,
      tutor.teachingMethods
    );

  const availability =
    firstText(
      tutor.availability,
      tutor.availableTimings,
      tutor.preferredTiming,
      tutor.timings,
      tutor.preferences?.availability
    );

  const availabilityTime =
    firstText(
      tutor.availabilityTime
    );

  const availabilityDays =
    firstArray(
      tutor.availabilityDays
    );

  const feeRange =
    firstText(
      tutor.feeRange,
      tutor.fees,
      tutor.hourlyRate
    );

  const isVerified =
    tutor.isVerified === true ||
    tutor.verified === true ||
    String(
      tutor.verificationStatus || ''
    ).toLowerCase() ===
      'verified' ||
    String(
      tutor.status || ''
    ).toLowerCase() ===
      'verified';

  const ratingValue =
    tutor.rating ??
    tutor.averageRating;

  const rating =
    ratingValue !== undefined &&
    ratingValue !== null &&
    ratingValue !== ''
      ? Number(ratingValue)
      : null;

  const achievements =
    cleanArray(
      tutor.achievements
    );

  const certifications =
    cleanArray(
      tutor.certifications
    );

  /* =======================================================
     RETURN
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

          <div className="grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)_180px] gap-7 lg:gap-10 items-start">

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

                {isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#0C8F81] px-3 py-1.5 rounded-full text-xs font-bold">
                    <CheckIcon />
                    Verified
                  </span>
                )}

              </div>

              {experience && (
                <p className="text-base sm:text-lg font-semibold text-[#4B5563] mb-2">
                  {experience} Experience
                </p>
              )}

              {subjects.length > 0 && (
                <p className="text-lg text-[#5F6B7A] mb-6">
                  {subjects.join(' • ')}
                </p>
              )}

              <div className="flex flex-wrap gap-3">

                {city && (
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
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                      />
                    </svg>

                    {city}

                  </div>
                )}

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

            {/* HERO CTA */}

            <div className="w-full">

              <Link
                href="/find-a-tutor"
                className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold px-5 py-4 rounded-xl hover:bg-[#0858c8] transition-colors shadow-sm"
              >
                Request This Tutor
                <span>→</span>
              </Link>

              <p className="text-xs text-center text-[#6B7280] mt-3 leading-5">
                Share your requirement. TutorWave will help you proceed.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="py-8 sm:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-7 lg:gap-8">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  TUTOR AT A GLANCE
              ================================================= */}

              <Section
                title="Tutor at a Glance"
                eyebrow="Quick profile"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                  {experience && (
                    <InfoRow
                      label="Experience"
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
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />
                          <path d="M12 7v5l3 2" />
                        </svg>
                      }
                    />
                  )}

                  <InfoRow
                    label="Qualification"
                    value={qualification}
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M22 10l-10-5-10 5 10 5 10-5Z" />
                        <path d="M6 12v5c3 2 9 2 12 0v-5" />
                      </svg>
                    }
                  />

                  <InfoRow
                    label="Classes"
                    value={
                      classes.length
                        ? classes.join(' • ')
                        : null
                    }
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M4 19V5a2 2 0 012-2h12a2 2 0 012 2v14" />
                        <path d="M4 19c0-1.1.9-2 2-2h14" />
                        <path d="M8 7h8M8 11h8" />
                      </svg>
                    }
                  />

                  <InfoRow
                    label="Boards"
                    value={
                      boards.length
                        ? boards.join(' • ')
                        : null
                    }
                    icon={
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M3 6h18" />
                        <path d="M5 6v14h14V6" />
                        <path d="M8 3h8v3H8z" />
                      </svg>
                    }
                  />

                  <InfoRow
                    label="Mode"
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
                    label="Location"
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
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>
                    }
                  />

                  {studentsTaught && (
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
                          <circle
                            cx="9"
                            cy="8"
                            r="3"
                          />
                          <path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
                          <path d="M16 11c2.5 0 5 1.8 5 5" />
                        </svg>
                      }
                    />
                  )}

                </div>

              </Section>

              {/* =================================================
                  ACADEMIC EXPERTISE
              ================================================= */}

              <Section
                title="Academic Expertise"
                eyebrow="Subjects, classes & boards"
              >

                <div className="space-y-6">

                  {subjects.length > 0 && (
                    <div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Subjects
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {subjects.map(
                          (
                            subject,
                            index
                          ) => (
                            <Tag
                              key={`${subject}-${index}`}
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

                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Classes
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {classes.map(
                          (
                            item,
                            index
                          ) => (
                            <Tag
                              key={`${item}-${index}`}
                            >
                              {item}
                            </Tag>
                          )
                        )}
                      </div>

                    </div>
                  )}

                  {boards.length > 0 && (
                    <div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Boards
                      </p>

                      <div className="flex flex-wrap gap-2.5">
                        {boards.map(
                          (
                            board,
                            index
                          ) => (
                            <Tag
                              key={`${board}-${index}`}
                            >
                              {board}
                            </Tag>
                          )
                        )}
                      </div>

                    </div>
                  )}

                  {specialization && (
                    <div>

                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                        Specialisation
                      </p>

                      <p className="text-[#374151] leading-7">
                        {specialization}
                      </p>

                    </div>
                  )}

                </div>

              </Section>

              {/* =================================================
                  EDUCATION
              ================================================= */}

              {(qualification ||
                college) && (
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

                        <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-2">
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

                        <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-2">
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

              {/* =================================================
                  TEACHING EXPERIENCE
              ================================================= */}

              {(experience ||
                experienceDetails) && (
                <Section
                  title="Teaching Experience"
                  eyebrow="Professional background"
                >

                  <div className="flex items-start gap-5">

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

              {/* =================================================
                  SCHOOL BACKGROUND
              ================================================= */}

              {(schoolExperience ||
                schoolsTaught.length >
                  0) && (
                <Section
                  title="School Background"
                  eyebrow="School teaching exposure"
                >

                  <div className="space-y-7">

                    {schoolExperience && (
                      <div>

                        <div className="flex items-start gap-4">

                          <div className="w-11 h-11 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">

                            <svg
                              width="21"
                              height="21"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M3 21h18" />
                              <path d="M5 21V9l7-5 7 5v12" />
                              <path d="M9 21v-6h6v6" />
                              <path d="M8 11h2M14 11h2" />
                            </svg>

                          </div>

                          <div>

                            <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                              School Teaching Experience
                            </p>

                            <p className="text-base font-semibold text-[#0D1118]">
                              {schoolExperience}
                            </p>

                          </div>

                        </div>

                      </div>
                    )}

                    {schoolsTaught.length >
                      0 && (
                      <div>

                        <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Students Taught From
                        </p>

                        <div className="flex flex-wrap gap-2.5">

                          {schoolsTaught.map(
                            (
                              school,
                              index
                            ) => (
                              <Tag
                                key={`${school}-${index}`}
                              >
                                {school}
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
                  ABOUT
              ================================================= */}

              <Section
                title={`About ${name}`}
                eyebrow="Tutor introduction"
              >

                <p className="text-[#4B5563] leading-8 text-[15px] sm:text-base">
                  {bio}
                </p>

              </Section>

              {/* =================================================
                  TEACHING APPROACH
              ================================================= */}

              {teachingApproach && (
                <Section
                  title="Teaching Approach"
                  eyebrow="Teaching style"
                >

                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                    <p className="text-[#374151] leading-8">
                      {teachingApproach}
                    </p>

                  </div>

                </Section>
              )}

              {/* =================================================
                  LANGUAGES
              ================================================= */}

              {languages.length >
                0 && (
                <Section
                  title="Languages"
                  eyebrow="Communication"
                >

                  <div className="flex flex-wrap gap-2.5">

                    {languages.map(
                      (
                        language,
                        index
                      ) => (
                        <Tag
                          key={`${language}-${index}`}
                        >
                          {language}
                        </Tag>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  LOCATION
              ================================================= */}

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
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                    </div>

                    <div>

                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        City
                      </p>

                      <p className="text-lg font-bold text-[#0D1118]">
                        {city}
                      </p>

                    </div>

                  </div>

                  {areas.length >
                    0 && (
                    <div>

                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                        Areas Served
                      </p>

                      <div className="flex flex-wrap gap-2.5">

                        {areas.map(
                          (
                            area,
                            index
                          ) => (
                            <Tag
                              key={`${area}-${index}`}
                            >
                              {area}
                            </Tag>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>

              </Section>

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              {(
                availability ||
                availabilityTime ||
                availabilityDays.length >
                  0
              ) && (
                <Section
                  title="Availability"
                  eyebrow="Current availability"
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {availability && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5">

                        <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          Availability
                        </p>

                        <p className="text-[#374151] font-medium">
                          {availability}
                        </p>

                      </div>
                    )}

                    {availabilityTime && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5">

                        <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                          Preferred Time
                        </p>

                        <p className="text-[#374151] font-medium">
                          {availabilityTime}
                        </p>

                      </div>
                    )}

                  </div>

                  {availabilityDays.length >
                    0 && (
                    <div className="mt-5">

                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                        Days
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {availabilityDays.map(
                          (
                            day,
                            index
                          ) => (
                            <Tag
                              key={`${day}-${index}`}
                            >
                              {day}
                            </Tag>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </Section>
              )}

              {/* =================================================
                  ACHIEVEMENTS
              ================================================= */}

              {achievements.length >
                0 && (
                <Section
                  title="Achievements"
                  eyebrow="Additional highlights"
                >

                  <div className="space-y-3">

                    {achievements.map(
                      (
                        achievement,
                        index
                      ) => (
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

              {/* =================================================
                  CERTIFICATIONS
              ================================================= */}

              {certifications.length >
                0 && (
                <Section
                  title="Certifications"
                  eyebrow="Additional qualifications"
                >

                  <div className="flex flex-wrap gap-2.5">

                    {certifications.map(
                      (
                        certificate,
                        index
                      ) => (
                        <Tag
                          key={`${certificate}-${index}`}
                        >
                          {certificate}
                        </Tag>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  MOBILE REQUEST CTA
              ================================================= */}

              <div className="lg:hidden bg-white border border-[#E5E7EB] rounded-3xl p-6">

                <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                  TutorWave
                </p>

                <h2 className="text-xl font-bold text-[#0D1118] mb-2">
                  Interested in {name}?
                </h2>

                <p className="text-sm text-[#6B7280] leading-6 mb-5">
                  Share your tuition requirement and our team will help you proceed.
                </p>

                <Link
                  href="/find-a-tutor"
                  className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl"
                >
                  Request This Tutor
                  <span>→</span>
                </Link>

                <p className="text-xs text-center text-[#6B7280] mt-3">
                  No obligation to hire.
                </p>

              </div>

              {/* =================================================
                  HOW IT WORKS — BELOW MAIN PROFILE
              ================================================= */}

              <section className="bg-[#0D1118] rounded-3xl p-6 sm:p-7 text-white">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div>

                    <p className="text-[11px] uppercase tracking-[0.14em] font-bold text-[#5DB8FF] mb-2">
                      TutorWave
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold">
                      How It Works
                    </h2>

                    <p className="text-sm text-white/55 mt-1">
                      A simple process to help you move forward.
                    </p>

                  </div>

                  <div className="hidden sm:block w-10 h-10 rounded-xl bg-white/10 items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#5DB8FF"
                      strokeWidth="1.8"
                      className="mx-auto mt-2.5"
                    >
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">

                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                        1
                      </div>

                      <p className="font-semibold text-sm">
                        Share requirement
                      </p>

                    </div>

                    <p className="text-xs text-white/55 leading-5">
                      Tell us your child's class, subject and location.
                    </p>

                  </div>

                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-4">

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                        2
                      </div>

                      <p className="font-semibold text-sm">
                        We confirm
                      </p>

                    </div>

                    <p className="text-xs text-white/55 leading-5">
                      Our team reviews your requirement and tutor preferences.
                    </p>

                  </div>

                  <div className="bg-[#0A6FF7] rounded-2xl p-4">

                    <div className="flex items-center gap-3 mb-3">

                      <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-sm font-bold">
                        3
                      </div>

                      <p className="font-semibold text-sm">
                        Move forward
                      </p>

                    </div>

                    <p className="text-xs text-white/75 leading-5">
                      We help you take the next step with the selected tutor.
                    </p>

                  </div>

                </div>

              </section>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* PROFILE SUMMARY */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <p className="text-[11px] uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-5">
                    Profile Summary
                  </h3>

                  <div className="space-y-4">

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

                    {subjects.length >
                      0 && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Subjects
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {subjects.length}
                        </span>

                      </div>
                    )}

                    {classes.length >
                      0 && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Classes
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {classes.length}
                        </span>

                      </div>
                    )}

                    {boards.length >
                      0 && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Boards
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {boards.join(', ')}
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

                {/* TUTORWAVE VERIFICATION */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] flex items-center justify-center text-[#0C8F81]">
                      <CheckIcon />
                    </div>

                    <div>

                      <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">
                        TutorWave
                      </p>

                      <h3 className="font-bold text-[#0D1118]">
                        Verification
                      </h3>

                    </div>

                  </div>

                  <div className="space-y-3">

                    <div className="flex items-start gap-3">

                      <span className="text-[#0C8F81] mt-0.5">
                        <CheckIcon />
                      </span>

                      <p className="text-sm text-[#374151] leading-6">
                        Profile reviewed by TutorWave
                      </p>

                    </div>

                    {qualification && (
                      <div className="flex items-start gap-3">

                        <span className="text-[#0C8F81] mt-0.5">
                          <CheckIcon />
                        </span>

                        <p className="text-sm text-[#374151] leading-6">
                          Qualification information provided
                        </p>

                      </div>
                    )}

                    {photo && (
                      <div className="flex items-start gap-3">

                        <span className="text-[#0C8F81] mt-0.5">
                          <CheckIcon />
                        </span>

                        <p className="text-sm text-[#374151] leading-6">
                          Profile photo provided
                        </p>

                      </div>
                    )}

                    {isVerified && (
                      <div className="pt-3 mt-3 border-t border-[#E5E7EB]">

                        <p className="text-sm font-bold text-[#0C8F81]">
                          ✓ Verified Tutor Profile
                        </p>

                        <p className="text-xs text-[#6B7280] mt-1 leading-5">
                          This profile has been reviewed and verified by the TutorWave team.
                        </p>

                      </div>
                    )}

                  </div>

                </div>

                {/* BROWSE OTHER TUTORS */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <p className="text-[11px] uppercase tracking-wider font-bold text-[#0A6FF7] mb-2">
                    Explore
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Browse Other Tutors
                  </h3>

                  <p className="text-sm text-[#6B7280] leading-6 mb-5">
                    Explore more TutorWave profiles based on your child's requirements.
                  </p>

                  <Link
                    href="/tutors"
                    className="flex items-center justify-center gap-2 w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                  >
                    Browse Tutors
                    <span>→</span>
                  </Link>

                </div>

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
            Need help choosing a tutor?
          </h2>

          <p className="text-white/60 mt-3 max-w-2xl mx-auto leading-7">
            Share your child's class, subject, location and learning requirements. Our team can help you explore suitable tutor options.
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
