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
  qualification?: string;
  degree?: string;
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

  /* =======================================================
     SCHOOL / TEACHING BACKGROUND
  ======================================================= */

  schoolsTaught?: string[] | string;
  schoolNames?: string[] | string;
  studentsTaughtFromSchools?: string[] | string;
  previousInstitutions?: string[] | string;
  institutions?: string[] | string;

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

  /* =======================================================
     NESTED CRM STRUCTURE
  ======================================================= */

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
      slug.slice(
        nameSlug.length + 1
      );

    if (
      suffix === idShort ||
      id
        .replace(/-/g, '')
        .startsWith(suffix)
    ) {
      return true;
    }
  }

  return slug === nameSlug;
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
      'Unable to fetch tutors:',
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
   DATA NORMALIZATION
========================================================= */

function cleanArray(value: any): string[] {
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

  return [String(value).trim()]
    .filter(Boolean);
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

  if (!values.length) {
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

  if (
    hasHome &&
    hasOnline
  ) {
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

function initials(name?: string) {
  if (!name) {
    return 'TW';
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (part) =>
        part.charAt(0).toUpperCase()
    )
    .join('');
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
  if (!value) {
    return null;
  }

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
    tutor.fullName ||
    tutor.personal?.fullName ||
    'Tutor';

  const subjects =
    firstArray(
      tutor.subjects,
      tutor.teaching
        ?.primarySubjects,
      tutor.teaching
        ?.secondarySubjects,
      tutor.teaching
        ?.seniorSecondarySubjects
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
  const { slug } = await params;

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
              We couldn't find this tutor profile in the TutorWave tutor network.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              ← Browse Tutors
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

  /* SUBJECTS */

  const subjects =
    firstArray(
      tutor.subjects,
      tutor.teaching
        ?.primarySubjects,
      tutor.teaching
        ?.secondarySubjects,
      tutor.teaching
        ?.seniorSecondarySubjects
    );

  /* CLASSES */

  const classes =
    firstArray(
      tutor.classes,
      tutor.teaching
        ?.primaryClasses,
      tutor.teaching
        ?.secondaryClasses,
      tutor.teaching
        ?.seniorSecondaryClasses
    );

  /* BOARDS */

  const boards =
    firstArray(
      tutor.boards,
      tutor.teaching?.boards
    );

  /* LOCATION */

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
      tutor.preferences
        ?.offlineAreas
    );

  /* EXPERIENCE */

  const rawExperience =
    tutor.experienceYears ??
    tutor.experience ??
    tutor.teaching?.experience;

  const experience =
    formatExperience(
      rawExperience
    );

  /* MODE */

  const mode =
    formatMode(
      tutor.mode ??
      tutor.teachingMode ??
      tutor.modes ??
      tutor.preferredMode ??
      tutor.preferences
        ?.teachingMode
    );

  /* QUALIFICATION */

  const qualification =
    firstText(
      tutor.highestQualification,
      tutor.qualification,
      tutor.degree,
      tutor.education
        ?.highestQualification
    );

  /* COLLEGE */

  const college =
    firstText(
      tutor.college,
      tutor.university,
      tutor.collegeUniversity,
      tutor.institution,
      tutor.education?.college,
      tutor.education?.university
    );

  /* SPECIALIZATION */

  const specialization =
    firstText(
      tutor.specialization,
      tutor.education
        ?.specialization
    );

  /* =======================================================
     SCHOOL TEACHING EXPERIENCE
  ======================================================= */

  const schoolExperience =
    firstText(
      tutor.schoolExperience,
      tutor.schoolTeachingExperience,
      tutor.schoolExperienceYears,

      /* IMPORTANT — nested CRM field */
      tutor.teaching
        ?.schoolExperience,

      tutor.teaching
        ?.schoolTeachingExperience,

      tutor.teaching
        ?.schoolExperienceYears
    );

  /* =======================================================
     STUDENTS TAUGHT FROM — SCHOOL NAMES
  ======================================================= */

  const schoolsTaught =
    firstArray(

      /* Direct fields */
      tutor.schoolsTaught,
      tutor.schoolNames,
      tutor.studentsTaughtFromSchools,
      tutor.previousInstitutions,
      tutor.institutions,

      /* IMPORTANT — ACTUAL REGISTRATION FIELD */
      tutor.teaching
        ?.studentsTaughtFrom,

      /* Possible CRM variation */
      tutor.teaching
        ?.studentsTaughtFromSchools
    );

  /* STUDENTS COUNT */

  const studentsTaught =
    firstText(
      tutor.studentsTaught,
      tutor.totalStudents,
      tutor.studentsCount
    );

  /* LANGUAGES */

  const languages =
    firstArray(
      tutor.languages,
      tutor.teachingLanguages,
      tutor.language,
      tutor.spokenLanguages
    );

  /* ABOUT */

  const bio =
    firstText(
      tutor.bio,
      tutor.about,
      tutor.aboutTutor,
      tutor.description
    ) ||
    `${name} is a TutorWave tutor available for personalized tuition support.`;

  /* TEACHING EXPERIENCE DETAILS */

  const experienceDetails =
    firstText(
      tutor.teachingExperience,
      tutor.experienceDetails
    );

  /* TEACHING APPROACH */

  const teachingApproach =
    firstText(
      tutor.teachingApproach,
      tutor.teachingMethodology,
      tutor.approach,
      tutor.teachingMethods
    );

  /* AVAILABILITY */

  const availability =
    firstText(
      tutor.availability,
      tutor.availableTimings,
      tutor.preferredTiming,
      tutor.timings,
      tutor.preferences
        ?.availability
    );

  const availabilityTime =
    firstText(
      tutor.availabilityTime
    );

  const availabilityDays =
    firstArray(
      tutor.availabilityDays
    );

  /* FEES */

  const feeRange =
    firstText(
      tutor.feeRange,
      tutor.fees,
      tutor.hourlyRate
    );

  /* VERIFICATION */

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

  /* RATING */

  const ratingValue =
    tutor.rating ??
    tutor.averageRating;

  const rating =
    ratingValue !== undefined &&
    ratingValue !== null &&
    ratingValue !== ''
      ? Number(ratingValue)
      : null;

  /* ACHIEVEMENTS */

  const achievements =
    cleanArray(
      tutor.achievements
    );

  /* CERTIFICATIONS */

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

                {isVerified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#0C8F81] px-3 py-1.5 rounded-full text-xs font-bold">
                    <CheckIcon />
                    Verified Tutor
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

                {experience && (
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                    ⏱
                    {experience}
                  </div>
                )}

                <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                  📍
                  {city}
                </div>

                {mode && (
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                    🏠
                    {mode}
                  </div>
                )}

              </div>

            </div>

            {/* QUICK STATS */}

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">

              {rating !== null &&
                !Number.isNaN(rating) && (
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

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="py-8 sm:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-7 lg:gap-8">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  TUTOR AT A GLANCE
              ================================================= */}

              <Section
                title="Tutor at a Glance"
                eyebrow="Quick overview"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                  <InfoRow
                    label="Experience"
                    value={experience}
                    icon={<span>⏱</span>}
                  />

                  <InfoRow
                    label="Location"
                    value={city}
                    icon={<span>📍</span>}
                  />

                  <InfoRow
                    label="Teaching Mode"
                    value={mode}
                    icon={<span>🏠</span>}
                  />

                  <InfoRow
                    label="Students Taught"
                    value={studentsTaught}
                    icon={<span>👥</span>}
                  />

                </div>

              </Section>

              {/* =================================================
                  ACADEMIC EXPERTISE
              ================================================= */}

              {(subjects.length > 0 ||
                classes.length > 0 ||
                boards.length > 0 ||
                specialization) && (

                <Section
                  title="Academic Expertise"
                  eyebrow="Subjects, classes & boards"
                >

                  <div className="space-y-7">

                    {subjects.length > 0 && (
                      <div>

                        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
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

                        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
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

                        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
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
              )}

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

              {/* =================================================
                  TEACHING EXPERIENCE
              ================================================= */}

              {(experience ||
                experienceDetails) && (

                <Section
                  title="Teaching Experience"
                  eyebrow="Professional experience"
                >

                  <div className="flex gap-5">

                    <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">
                      👨‍🏫
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
                  SCHOOL TEACHING EXPERIENCE
              ================================================= */}

              {schoolExperience && (

                <Section
                  title="School Teaching Experience"
                  eyebrow="School background"
                >

                  <div className="flex items-start gap-5">

                    <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">
                      🏫
                    </div>

                    <p className="text-[#374151] leading-8">
                      {schoolExperience}
                    </p>

                  </div>

                </Section>
              )}

              {/* =================================================
                  STUDENTS TAUGHT FROM
              ================================================= */}

              {schoolsTaught.length > 0 && (

                <Section
                  title="Students Taught From"
                  eyebrow="School exposure"
                >

                  <p className="text-[#6B7280] mb-5 leading-7">
                    This tutor has taught students from:
                  </p>

                  <div className="flex flex-wrap gap-2.5">

                    {schoolsTaught.map(
                      (school, index) => (
                        <Tag
                          key={`${school}-${index}`}
                        >
                          {school}
                        </Tag>
                      )
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
                  eyebrow="How the tutor teaches"
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

              {languages.length > 0 && (

                <Section
                  title="Languages"
                  eyebrow="Communication"
                >

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
                  LOCATION
              ================================================= */}

              <Section
                title="Teaching Location"
                eyebrow="Where the tutor teaches"
              >

                <div className="space-y-6">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">
                      📍
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

                </div>

              </Section>

              {/* =================================================
                  AVAILABILITY
              ================================================= */}

              {(availability ||
                availabilityTime ||
                availabilityDays.length > 0) && (

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

                    {availabilityDays.length > 0 && (
                      <div>

                        <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-3">
                          Days
                        </p>

                        <div className="flex flex-wrap gap-2">

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
                  ACHIEVEMENTS
              ================================================= */}

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

              {/* =================================================
                  CERTIFICATIONS
              ================================================= */}

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

              {/* =================================================
                  MOBILE REQUEST
              ================================================= */}

              <div className="lg:hidden bg-white border border-[#E5E7EB] rounded-3xl p-6">

                <p className="text-xs uppercase tracking-wider font-bold text-[#0A6FF7] mb-2">
                  TutorWave
                </p>

                <h2 className="text-xl font-bold text-[#0D1118] mb-2">
                  Interested in {name}?
                </h2>

                <p className="text-sm text-[#6B7280] leading-6 mb-5">
                  Tell us your tuition requirement and our team will help you proceed.
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
                SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* PROFILE SUMMARY */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-5">
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

                {/* TUTORWAVE VERIFICATION */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-11 h-11 rounded-xl bg-[#E6F7F5] flex items-center justify-center text-[#0C8F81]">
                      <CheckIcon />
                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280]">
                        TutorWave
                      </p>

                      <h3 className="font-bold text-[#0D1118]">
                        Verification
                      </h3>

                    </div>

                  </div>

                  <div className="space-y-3">

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#0C8F81]">
                        <CheckIcon />
                      </div>

                      <p className="text-sm text-[#4B5563]">
                        Profile reviewed
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#0C8F81]">
                        <CheckIcon />
                      </div>

                      <p className="text-sm text-[#4B5563]">
                        Qualification information reviewed
                      </p>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#0C8F81]">
                        <CheckIcon />
                      </div>

                      <p className="text-sm text-[#4B5563]">
                        Photo and profile information reviewed
                      </p>
                    </div>

                    {isVerified && (
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 text-[#0C8F81]">
                          <CheckIcon />
                        </div>

                        <p className="text-sm font-semibold text-[#0D1118]">
                          Verified Tutor
                        </p>
                      </div>
                    )}

                  </div>

                </div>

                {/* BROWSE OTHER TUTORS */}

                <div className="bg-[#0D1118] rounded-3xl p-6">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#5DB8FF] mb-2">
                    Explore
                  </p>

                  <h3 className="text-xl font-bold text-white mb-2">
                    Looking for more options?
                  </h3>

                  <p className="text-sm text-white/60 leading-6 mb-5">
                    Explore other tutors available through TutorWave.
                  </p>

                  <Link
                    href="/tutors"
                    className="flex items-center justify-center gap-2 w-full bg-white text-[#0D1118] font-bold py-3.5 rounded-xl hover:bg-[#F1F5F9] transition-colors"
                  >
                    Browse Other Tutors
                    <span>→</span>
                  </Link>

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
                      Final fee may depend on class, subject, location and tuition requirements.
                    </p>

                  </div>
                )}

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ===================================================
          HOW IT WORKS
          IMPORTANT: BELOW MAIN PROFILE, NOT SIDEBAR
      =================================================== */}

      <section className="bg-white border-t border-[#E5E7EB] py-12 sm:py-16">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="text-center mb-10">

            <p className="text-xs uppercase tracking-[0.15em] font-bold text-[#0A6FF7] mb-2">
              TutorWave
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1118]">
              How It Works
            </h2>

            <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto">
              Getting started with a TutorWave tutor is simple.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* STEP 1 */}

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-7">

              <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center text-lg font-bold mb-5">
                01
              </div>

              <h3 className="text-lg font-bold text-[#0D1118] mb-2">
                Share Your Requirement
              </h3>

              <p className="text-sm text-[#6B7280] leading-6">
                Tell us your child's class, subject, location and preferred tuition requirements.
              </p>

            </div>

            {/* STEP 2 */}

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-7">

              <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center text-lg font-bold mb-5">
                02
              </div>

              <h3 className="text-lg font-bold text-[#0D1118] mb-2">
                We Confirm Suitability
              </h3>

              <p className="text-sm text-[#6B7280] leading-6">
                Our team reviews the requirement and confirms whether this tutor is suitable for your needs.
              </p>

            </div>

            {/* STEP 3 */}

            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-7">

              <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center text-lg font-bold mb-5">
                03
              </div>

              <h3 className="text-lg font-bold text-[#0D1118] mb-2">
                We Help You Proceed
              </h3>

              <p className="text-sm text-[#6B7280] leading-6">
                Once the requirements match, our team helps coordinate the next step with the tutor.
              </p>

            </div>

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
            Interested in this tutor?
          </h2>

          <p className="text-white/60 mt-3 max-w-2xl mx-auto leading-7">
            Share your child's class, subject, location and learning requirements with our team.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Request This Tutor
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
