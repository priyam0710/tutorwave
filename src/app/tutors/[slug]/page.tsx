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

type EducationRecord = {
  highestQualification?: string;
  qualification?: string;
  degree?: string;

  college?: string;
  university?: string;
  institution?: string;

  stream?: string;
  qualificationStream?: string;
  educationStream?: string;
  fieldOfStudy?: string;
  course?: string;
  major?: string;
  specialization?: string;

  additionalQualification?: string;
  additionalQualifications?: string[] | string;

  qualificationDetails?: string;

  qualifications?:
    | string[]
    | string
    | Array<{
        qualification?: string;
        degree?: string;
        highestQualification?: string;
        stream?: string;
        qualificationStream?: string;
        educationStream?: string;
        fieldOfStudy?: string;
        specialization?: string;
        college?: string;
        university?: string;
        institution?: string;
      }>;
};

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
  qualificationStream?: string;
  educationStream?: string;
  fieldOfStudy?: string;
  course?: string;
  major?: string;
  stream?: string;
  qualificationDetails?: string;

  qualifications?: string[] | string;

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

  additionalQualification?: string;
  additionalQualifications?: string[] | string;

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

    teachingExperience?: string;
    experienceDetails?: string;

    teachingApproach?: string;
    teachingMethodology?: string;
    teachingMethods?: string[] | string;
  };

  education?: EducationRecord | EducationRecord[];

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

  reviews?: any[];
  testimonials?: any[];

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

  const slug = normalize(safeDecode(rawSlug));
  const nameSlug = normalize(tutor.fullName);

  const id = String(tutor.id).toLowerCase();

  const idWithoutHyphens = id.replace(/-/g, '');

  const idShort = idWithoutHyphens.slice(0, 8);

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
      tutorMatchesSlug(tutor, rawSlug)
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
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [String(value).trim()].filter(Boolean);
}

function uniqueArray(
  values: string[]
): string[] {
  return Array.from(
    new Set(
      values
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

function firstArray(
  ...values: any[]
): string[] {
  for (const value of values) {
    const result = cleanArray(value);

    if (result.length > 0) {
      return uniqueArray(result);
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

  const text = String(value).trim();

  if (
    /year|years|month|months/i.test(text)
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
  const values = cleanArray(mode);

  if (!values.length) {
    return null;
  }

  const normalized =
    values.map((value) =>
      value.toLowerCase().trim()
    );

  const hasHome =
    normalized.some(
      (value) =>
        value === 'home' ||
        value === 'offline' ||
        value === 'home tuition' ||
        value.includes('home tuition')
    );

  const hasOnline =
    normalized.some(
      (value) =>
        value === 'online' ||
        value === 'online tuition' ||
        value.includes('online tuition')
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

function formatRating(
  value?: number | string | null
) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  const number = Number(value);

  if (
    Number.isNaN(number) ||
    number <= 0
  ) {
    return null;
  }

  return number;
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
    <section className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(15,23,42,0.02)]">
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

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-1">
          {label}
        </p>

        <p className="text-base font-semibold text-[#0D1118] leading-6">
          {value}
        </p>
      </div>
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
      tutor.area,
      tutor.locality,
      tutor.personal?.city,
      tutor.personal?.location
    ) || 'Delhi NCR';

  const description =
    firstText(
      tutor.bio,
      tutor.about,
      tutor.aboutTutor,
      tutor.description
    ) ||
    `${name} is a TutorWave tutor available for personalized tuition in ${city}.`;

  return {
    title: `${name} — ${
      subjects.length
        ? subjects.join(', ')
        : 'Home Tuition'
    } Tutor in ${city} | TutorWave`,

    description,

    openGraph: {
      title: `${name} | TutorWave Tutor`,
      description,
      type: 'profile',
      ...(tutor.profilePhoto
        ? {
            images: [
              {
                url: tutor.profilePhoto,
                alt: `${name} - TutorWave Tutor`,
              },
            ],
          }
        : {}),
    },

    robots: {
      index: true,
      follow: true,
    },
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
      <main className="min-h-screen bg-white">
        <Header />

        <section className="min-h-[60vh] flex items-center justify-center px-4">
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
              We couldn't find this tutor profile in the
              TutorWave tutor network. The profile may have
              been removed, unpublished or is still being
              verified.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">

              <Link
                href="/tutors"
                className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
              >
                Browse Tutors
              </Link>

              <Link
                href="/find-a-tutor"
                className="inline-flex items-center justify-center gap-2 bg-[#EEF2F7] text-[#0D1118] font-semibold px-6 py-3 rounded-xl hover:bg-[#E5E7EB] transition-colors"
              >
                Find a Tutor
              </Link>

            </div>

          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    );
  }

  /* =======================================================
     BASIC PROFILE DATA
  ======================================================= */

  const name =
    tutor.fullName ||
    tutor.personal?.fullName ||
    'Tutor';

  const photo =
    tutor.profilePhoto ||
    tutor.personal?.profilePhoto ||
    '';

  /* =======================================================
     SUBJECTS
  ======================================================= */

  const subjects =
    firstArray(
      tutor.subjects,
      tutor.teaching?.primarySubjects,
      tutor.teaching?.secondarySubjects,
      tutor.teaching?.seniorSecondarySubjects
    );

  /* =======================================================
     CLASSES
  ======================================================= */

  const classes =
    firstArray(
      tutor.classes,
      tutor.teaching?.primaryClasses,
      tutor.teaching?.secondaryClasses,
      tutor.teaching?.seniorSecondaryClasses
    );

  /* =======================================================
     BOARDS
  ======================================================= */

  const boards =
    firstArray(
      tutor.boards,
      tutor.teaching?.boards
    );

  /* =======================================================
     LOCATION
  ======================================================= */

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

  /* =======================================================
     LANGUAGES
  ======================================================= */

  const languages =
    firstArray(
      tutor.languages,
      tutor.teachingLanguages,
      tutor.language,
      tutor.spokenLanguages
    );

  /* =======================================================
     EXPERIENCE
  ======================================================= */

  const rawExperience =
    tutor.experienceYears ??
    tutor.experience ??
    tutor.teaching?.experience;

  const experience =
    formatExperience(
      rawExperience
    );

  const experienceDetails =
    firstText(
      tutor.teachingExperience,
      tutor.experienceDetails,
      tutor.teaching?.teachingExperience,
      tutor.teaching?.experienceDetails
    );

  /* =======================================================
     MODE
  ======================================================= */

  const mode =
    formatMode(
      tutor.mode ??
      tutor.teachingMode ??
      tutor.modes ??
      tutor.preferredMode ??
      tutor.preferences?.teachingMode
    );

  /* =======================================================
     EDUCATION
  ======================================================= */

  const educationRecords: EducationRecord[] =
    Array.isArray(tutor.education)
      ? tutor.education
      : tutor.education
        ? [tutor.education]
        : [];

  const educationQualificationValues =
    educationRecords.flatMap(
      (item) =>
        cleanArray(
          item?.highestQualification ??
          item?.qualification ??
          item?.degree
        )
    );

  const educationStreamValues =
    educationRecords.flatMap(
      (item) =>
        cleanArray(
          item?.stream ??
          item?.qualificationStream ??
          item?.educationStream ??
          item?.fieldOfStudy ??
          item?.course ??
          item?.major ??
          item?.specialization
        )
    );

  const qualification =
    firstText(
      tutor.highestQualification,
      tutor.qualification,
      tutor.degree,
      ...educationQualificationValues
    );

  const college =
    firstText(
      tutor.college,
      tutor.university,
      tutor.collegeUniversity,
      tutor.institution,

      ...educationRecords.flatMap(
        (item) =>
          [
            item?.college,
            item?.university,
            item?.institution,
          ].filter(Boolean)
      )
    );

  const specialization =
    firstText(
      tutor.specialization,

      ...educationRecords.flatMap(
        (item) =>
          [
            item?.specialization,
          ].filter(Boolean)
      )
    );

  const qualificationStream =
    firstText(
      ...educationStreamValues,
      tutor.specialization,
      tutor.stream,
      tutor.qualificationStream,
      tutor.educationStream,
      tutor.fieldOfStudy,
      tutor.course,
      tutor.major,
      tutor.qualificationDetails
    );

  /* =======================================================
     ADDITIONAL QUALIFICATIONS
  ======================================================= */

  const additionalQualificationValues: string[] = [];

  additionalQualificationValues.push(
    ...firstArray(
      tutor.education &&
        !Array.isArray(tutor.education)
        ? tutor.education
            ?.additionalQualifications
        : null,

      tutor.education &&
        !Array.isArray(tutor.education)
        ? tutor.education
            ?.additionalQualification
        : null,

      tutor.additionalQualifications,
      tutor.additionalQualification
    )
  );

  for (const education of educationRecords) {
    additionalQualificationValues.push(
      ...firstArray(
        education.additionalQualifications,
        education.additionalQualification
      )
    );

    const qualificationItems =
      Array.isArray(
        education.qualifications
      )
        ? education.qualifications
        : [];

    for (
      const item of qualificationItems
    ) {
      if (
        typeof item === 'string'
      ) {
        additionalQualificationValues.push(
          item
        );

        continue;
      }

      if (
        !item ||
        typeof item !== 'object'
      ) {
        continue;
      }

      const degree =
        firstText(
          item.qualification,
          item.degree,
          item.highestQualification
        );

      const stream =
        firstText(
          item.stream,
          item.qualificationStream,
          item.educationStream,
          item.fieldOfStudy,
          item.specialization
        );

      if (
        degree &&
        stream
      ) {
        additionalQualificationValues.push(
          `${degree} • ${stream}`
        );
      } else if (degree) {
        additionalQualificationValues.push(
          degree
        );
      } else if (stream) {
        additionalQualificationValues.push(
          stream
        );
      }
    }
  }

  additionalQualificationValues.push(
    ...firstArray(
      tutor.qualifications
    )
  );

  const additionalQualifications =
    uniqueArray(
      additionalQualificationValues
    );

  /* =======================================================
     SCHOOL EXPERIENCE
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
     SCHOOLS / INSTITUTIONS TAUGHT FROM
  ======================================================= */

  const schoolsTaught =
    uniqueArray(
      [
        ...firstArray(
          tutor.schoolsTaught,
          tutor.schoolNames,
          tutor.studentsTaughtFromSchools,
          tutor.previousInstitutions,
          tutor.institutions
        ),

        ...firstArray(
          tutor.teaching?.studentsTaughtFrom,
          tutor.teaching?.studentsTaughtFromSchools
        ),
      ]
    );

  /* =======================================================
     STUDENTS TAUGHT
  ======================================================= */

  const studentsTaught =
    formatNumber(
      tutor.studentsTaught ??
      tutor.totalStudents ??
      tutor.studentsCount
    );

  /* =======================================================
     TEACHING APPROACH
  ======================================================= */

  const teachingApproach =
    firstText(
      tutor.teachingApproach,
      tutor.teachingMethodology,
      tutor.approach,
      tutor.teachingMethods,
      tutor.teaching?.teachingApproach,
      tutor.teaching?.teachingMethodology,
      tutor.teaching?.teachingMethods
    );

  /* =======================================================
     ENGLISH FLUENCY
  ======================================================= */

  const englishFluency =
    firstText(
      tutor.teaching?.englishFluency
    );

  /* =======================================================
     AVAILABILITY
  ======================================================= */

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

  /* =======================================================
     STUDENT TYPES
  ======================================================= */

  const studentTypes =
    firstArray(
      tutor.preferences?.studentTypes
    );

  /* =======================================================
     FEES
  ======================================================= */

  const feeRange =
    firstText(
      tutor.feeRange,
      tutor.fees,
      tutor.hourlyRate
    );

  /* =======================================================
     VERIFICATION
  ======================================================= */

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

  /* =======================================================
     RATING
  ======================================================= */

  const rating =
    formatRating(
      tutor.rating ??
      tutor.averageRating
    );

  /* =======================================================
     ACHIEVEMENTS
  ======================================================= */

  const achievements =
    cleanArray(
      tutor.achievements
    );

  /* =======================================================
     CERTIFICATIONS
  ======================================================= */

  const certifications =
    cleanArray(
      tutor.certifications
    );

  /* =======================================================
     BIO
  ======================================================= */

  const bio =
    firstText(
      tutor.bio,
      tutor.about,
      tutor.aboutTutor,
      tutor.description
    );

  /* =======================================================
     PROFILE STRENGTH
  ======================================================= */

  const profileSignals = [
    Boolean(photo),
    subjects.length > 0,
    classes.length > 0,
    boards.length > 0,
    Boolean(experience),
    Boolean(qualification),
    Boolean(college),
    Boolean(mode),
    Boolean(city),
    languages.length > 0,
    schoolsTaught.length > 0,
    Boolean(schoolExperience),
    Boolean(teachingApproach),
    Boolean(availability),
    Boolean(feeRange),
    Boolean(isVerified),
  ];

  const profileCompleteness =
    Math.round(
      (profileSignals.filter(Boolean).length /
        profileSignals.length) *
        100
    );

  /* =======================================================
     STRUCTURED DATA
  ======================================================= */

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(photo
      ? {
          image: photo,
        }
      : {}),
    ...(qualification
      ? {
          hasCredential: {
            '@type': 'EducationalOccupationalCredential',
            credentialCategory:
              qualification,
          },
        }
      : {}),
    ...(city
      ? {
          address: {
            '@type': 'PostalAddress',
            addressLocality: city,
          },
        }
      : {}),
    ...(subjects.length
      ? {
          knowsAbout: subjects,
        }
      : {}),
    ...(languages.length
      ? {
          knowsLanguage: languages,
        }
      : {}),
    ...(bio
      ? {
          description: bio,
        }
      : {}),
  };

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

          <div className="grid grid-cols-1 lg:grid-cols-[190px_minmax(0,1fr)_190px] gap-7 lg:gap-10 items-start">

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

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1118] tracking-tight">
                  {name}
                </h1>

                {isVerified && (
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#E6F7F5] text-[#0C8F81]"
                    title="Verified Tutor"
                    aria-label="Verified Tutor"
                  >
                    <CheckIcon />
                  </span>
                )}

              </div>

              {qualification && (
                <p className="text-base sm:text-lg font-semibold text-[#4B5563] mb-2">
                  {qualification}
                  {qualificationStream
                    ? ` • ${qualificationStream}`
                    : ''}
                </p>
              )}

              {subjects.length > 0 && (
                <p className="text-lg text-[#5F6B7A] mb-6">
                  {subjects.join(' • ')}
                </p>
              )}

              {bio && (
                <p className="text-[#4B5563] leading-7 max-w-3xl mb-6">
                  {bio}
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
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />
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
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                    />
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

                {studentTypes.length > 0 && (
                  <div className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] px-4 py-2.5 rounded-xl text-sm font-medium text-[#374151]">
                    {studentTypes.join(' • ')}
                  </div>
                )}

              </div>

            </div>

            {/* QUICK ACTION / STATS */}

            <div className="space-y-3">

              {rating !== null && (
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4">

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

              {studentsTaught && (
                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl px-5 py-4">

                  <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                    Students Taught
                  </p>

                  <p className="text-2xl font-bold text-[#0D1118]">
                    {studentsTaught}
                  </p>

                </div>
              )}

              {isVerified && (
                <div className="bg-[#E6F7F5] border border-[#CBEDE8] rounded-2xl px-5 py-4">

                  <div className="flex items-center gap-2 text-[#0C8F81]">

                    <CheckIcon />

                    <span className="font-bold text-sm">
                      Verified Tutor
                    </span>

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          MOBILE CTA
      =================================================== */}

      <section className="lg:hidden bg-white border-b border-[#E5E7EB] px-4 py-4 sticky top-0 z-30">

        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-3">

          <Link
            href="/find-a-tutor"
            className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-4 py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
          >
            Request This Tutor
            <span>→</span>
          </Link>

          <Link
            href="/tutors"
            className="inline-flex items-center justify-center bg-[#EEF2F7] text-[#0D1118] font-bold px-4 py-3 rounded-xl hover:bg-[#E5E7EB] transition-colors"
          >
            Other Tutors
          </Link>

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="py-8 sm:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-7 lg:gap-8">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="space-y-6">

              {/* =================================================
                  WHY THIS TUTOR MAY BE A GOOD FIT
              ================================================= */}

              <Section
                title="Why This Tutor May Be a Good Fit"
                eyebrow="Profile highlights"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {experience && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {experience} teaching experience
                      </p>

                    </div>
                  )}

                  {qualification && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {qualification}
                        {qualificationStream
                          ? ` in ${qualificationStream}`
                          : ''}
                      </p>

                    </div>
                  )}

                  {subjects.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        Teaches {subjects.join(', ')}
                      </p>

                    </div>
                  )}

                  {classes.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        Classes: {classes.join(', ')}
                      </p>

                    </div>
                  )}

                  {boards.length > 0 && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        Familiar with {boards.join(', ')}
                      </p>

                    </div>
                  )}

                  {mode && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {mode}
                      </p>

                    </div>
                  )}

                  {schoolExperience && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        School / coaching teaching experience
                      </p>

                    </div>
                  )}

                  {city && (
                    <div className="flex items-start gap-3">

                      <div className="mt-0.5 text-[#0A6FF7]">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        Available in {city}
                      </p>

                    </div>
                  )}

                </div>

              </Section>

              {/* =================================================
                  TUTOR AT A GLANCE
              ================================================= */}

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
                    value={
                      qualification
                        ? qualificationStream
                          ? `${qualification} • ${qualificationStream}`
                          : qualification
                        : qualificationStream
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

                  {feeRange && (
                    <InfoRow
                      label="Fee"
                      value={feeRange}
                      icon={
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path d="M12 1v22" />
                          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7" />
                        </svg>
                      }
                    />
                  )}

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
                            (subject, index) => (
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

                        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                          Classes
                        </p>

                        <div className="flex flex-wrap gap-2.5">
                          {classes.map(
                            (item, index) => (
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

                        <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                          Boards
                        </p>

                        <div className="flex flex-wrap gap-2.5">
                          {boards.map(
                            (board, index) => (
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
                qualificationStream ||
                college ||
                additionalQualifications.length > 0) && (
                <Section
                  title="Education & Qualifications"
                  eyebrow="Academic background"
                >

                  <div className="space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      {(qualification ||
                        qualificationStream) && (
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
                            Qualification
                          </p>

                          {qualification && (
                            <p className="text-base font-semibold text-[#0D1118]">
                              {qualification}
                            </p>
                          )}

                          {qualificationStream && (
                            <div className="mt-2">
                              <p className="text-[11px] uppercase tracking-wider font-bold text-[#6B7280] mb-1">
                                Stream / Field
                              </p>

                              <p className="text-sm font-semibold text-[#0A6FF7] leading-6">
                                {qualificationStream}
                              </p>
                            </div>
                          )}

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

                          <p className="font-semibold text-[#0D1118] leading-6">
                            {college}
                          </p>

                        </div>
                      )}

                    </div>

                    {additionalQualifications.length > 0 && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5">

                        <div className="flex items-center gap-3 mb-4">

                          <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M12 3v18" />
                              <path d="M5 8h14" />
                              <path d="M6 21h12" />
                            </svg>
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280]">
                              Additional Qualifications
                            </p>

                            <p className="text-sm text-[#6B7280] mt-0.5">
                              Other degrees, certifications or professional qualifications
                            </p>
                          </div>

                        </div>

                        <div className="flex flex-wrap gap-2.5">

                          {additionalQualifications.map(
                            (item, index) => (
                              <Tag
                                key={`${item}-${index}`}
                                blue
                              >
                                {item}
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
                  SCHOOL EXPERIENCE
              ================================================= */}

              {schoolExperience && (
                <Section
                  title="School Teaching Experience"
                  eyebrow="School / coaching background"
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
                        <path d="M3 21h18" />
                        <path d="M5 21V9l7-5 7 5v12" />
                        <path d="M9 21v-6h6v6" />
                        <path d="M8 11h2M14 11h2" />
                      </svg>

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
                    This tutor has experience teaching students from:
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

              {(languages.length > 0 ||
                englishFluency) && (
                <Section
                  title="Languages"
                  eyebrow="Communication"
                >

                  <div className="flex flex-wrap gap-2.5">

                    {languages.map(
                      (language, index) => (
                        <Tag
                          key={`${language}-${index}`}
                        >
                          {language}
                        </Tag>
                      )
                    )}

                    {englishFluency && (
                      <Tag blue>
                        English Fluency: {englishFluency}
                      </Tag>
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

                      <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280]">
                        City / Location
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
                          (area, index) => (
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
                availabilityDays.length > 0
              ) && (
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

                        <p className="text-[#374151] font-medium leading-7">
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
                            (day, index) => (
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
                      (certificate, index) => (
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
                  PROFILE COMPLETENESS
              ================================================= */}

              <Section
                title="Profile Information"
                eyebrow="TutorWave profile"
              >

                <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                  <div className="flex items-center justify-between gap-4 mb-3">

                    <div>
                      <p className="font-bold text-[#0D1118]">
                        Profile information available
                      </p>

                      <p className="text-sm text-[#6B7280] mt-1">
                        This profile displays information provided through the TutorWave tutor registration process.
                      </p>
                    </div>

                    {isVerified && (
                      <div className="hidden sm:flex items-center gap-2 text-[#0C8F81] font-bold text-sm whitespace-nowrap">
                        <CheckIcon />
                        Verified
                      </div>
                    )}

                  </div>

                  <div className="h-2 rounded-full bg-[#E5E7EB] overflow-hidden">

                    <div
                      className="h-full rounded-full bg-[#0A6FF7]"
                      style={{
                        width: `${profileCompleteness}%`,
                      }}
                    />

                  </div>

                  <p className="text-xs text-[#6B7280] mt-2">
                    Profile information completeness: {profileCompleteness}%
                  </p>

                </div>

              </Section>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* =================================================
                    REQUEST THIS TUTOR
                ================================================= */}

                <div className="bg-white border border-[#D7E8FF] rounded-3xl p-6 shadow-[0_8px_30px_rgba(10,111,247,0.08)]">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    Interested in this tutor?
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Request {name}
                  </h3>

                  <p className="text-sm text-[#6B7280] leading-6 mb-5">
                    Share your child's requirements and our team can help you proceed with this tutor.
                  </p>

                  <Link
                    href="/find-a-tutor"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
                  >
                    Request This Tutor
                    <span>→</span>
                  </Link>

                  <p className="text-xs text-[#6B7280] text-center mt-3">
                    Parents do not pay to find a tutor.
                  </p>

                </div>

                {/* =================================================
                    PROFILE SUMMARY
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
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

                    {(qualification ||
                      qualificationStream) && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Qualification
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right max-w-[190px]">
                          {qualification &&
                          qualificationStream
                            ? `${qualification} • ${qualificationStream}`
                            : qualification ||
                              qualificationStream}
                        </span>

                      </div>
                    )}

                    {college && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Institution
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right max-w-[190px]">
                          {college}
                        </span>

                      </div>
                    )}

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

                        <span className="text-sm font-semibold text-[#0D1118] text-right max-w-[190px]">
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

                    {feeRange && (
                      <div className="flex justify-between gap-4">

                        <span className="text-sm text-[#6B7280]">
                          Fee
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {feeRange}
                        </span>

                      </div>
                    )}

                  </div>

                </div>

                {/* =================================================
                    VERIFICATION
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-10 h-10 rounded-xl bg-[#E6F7F5] flex items-center justify-center text-[#0C8F81]">
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

                      <span className="text-[#0C8F81] mt-0.5">
                        <CheckIcon />
                      </span>

                      <p className="text-sm text-[#374151] leading-6">
                        Profile information submitted through TutorWave.
                      </p>

                    </div>

                    {qualification && (
                      <div className="flex items-start gap-3">

                        <span className="text-[#0C8F81] mt-0.5">
                          <CheckIcon />
                        </span>

                        <p className="text-sm text-[#374151] leading-6">
                          Qualification information provided.
                        </p>

                      </div>
                    )}

                    {photo && (
                      <div className="flex items-start gap-3">

                        <span className="text-[#0C8F81] mt-0.5">
                          <CheckIcon />
                        </span>

                        <p className="text-sm text-[#374151] leading-6">
                          Profile photo provided.
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

                {/* =================================================
                    FIND DIFFERENT TUTOR
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

                  <p className="text-xs uppercase tracking-wider font-bold text-[#0A6FF7] mb-2">
                    Explore
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Want to Compare More Tutors?
                  </h3>

                  <p className="text-sm text-[#6B7280] leading-6 mb-5">
                    Explore other TutorWave profiles and compare tutors based on your child's requirements.
                  </p>

                  <Link
                    href="/tutors"
                    className="flex items-center justify-center gap-2 w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                  >
                    Find a Different Tutor
                    <span>→</span>
                  </Link>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ===================================================
          HOW IT WORKS
      =================================================== */}

      <section className="bg-[#F6F8FB] py-10 sm:py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="bg-white border border-[#E5E7EB] rounded-3xl px-5 py-7 sm:px-8 sm:py-8 shadow-sm">

            <div className="text-center mb-7 sm:mb-8">

              <p className="text-xs uppercase tracking-[0.14em] font-bold text-[#0A6FF7] mb-2">
                TutorWave
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-[#0D1118]">
                How It Works
              </h2>

              <p className="text-sm text-[#6B7280] mt-2 max-w-2xl mx-auto leading-6">
                Finding the right home tutor is simple. Here is how TutorWave helps you move from requirement to a suitable tutor.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-full bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center text-sm font-bold">
                    1
                  </div>

                  <p className="font-bold text-[#0D1118]">
                    Share your requirement
                  </p>

                </div>

                <p className="text-sm text-[#6B7280] leading-6">
                  Tell us your child's class, subject, location and learning requirements.
                </p>

              </div>

              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-full bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center text-sm font-bold">
                    2
                  </div>

                  <p className="font-bold text-[#0D1118]">
                    We confirm suitability
                  </p>

                </div>

                <p className="text-sm text-[#6B7280] leading-6">
                  Our team reviews your requirement and checks the tutor's suitability.
                </p>

              </div>

              <div className="rounded-2xl border border-[#D7E8FF] bg-[#EBF4FF] p-5">

                <div className="flex items-center gap-3 mb-3">

                  <div className="w-9 h-9 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>

                  <p className="font-bold text-[#0D1118]">
                    Take the next step
                  </p>

                </div>

                <p className="text-sm text-[#4B5563] leading-6">
                  We help you proceed with the selected tutor and move forward with confidence.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#F6F8FB] py-10 sm:py-14">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="rounded-3xl bg-white border border-[#E5E7EB] shadow-sm px-6 py-9 sm:px-10 sm:py-10 text-center">

            <p className="text-[#0A6FF7] text-xs sm:text-sm font-bold uppercase tracking-[0.15em] mb-3">
              TutorWave
            </p>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1118]">
              Interested in this tutor?
            </h2>

            <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto leading-7">
              Tell us your child's class, subject, location and learning requirements. Our team will help you take the next step with a suitable tutor.
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
                className="inline-flex items-center justify-center bg-[#EEF2F7] text-[#0D1118] font-bold px-7 py-3.5 rounded-xl hover:bg-[#E5E7EB] transition-colors"
              >
                Find a Different Tutor
              </Link>

            </div>

            <p className="text-xs text-[#6B7280] mt-4">
              Parents do not pay to find a tutor through TutorWave.
            </p>

          </div>

        </div>

      </section>

      {/* ===================================================
          JSON-LD
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
