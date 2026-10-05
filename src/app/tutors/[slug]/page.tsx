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
  primaryAllSubjects?: boolean | string;
  secondaryAllSubjects?: boolean | string;
  seniorSecondaryAllSubjects?: boolean | string;
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

  /*
   * School / teaching background
   */
  schoolsTaught?: string[] | string;
  studentsTaughtFrom?: string | string[] | Record<string, any> | Record<string, any>[];
  schoolName?: string | string[];
  previousInstitutions?: string[] | string;
  institutions?: string[];
  schoolNames?: string[] | string;
  studentsTaughtFromSchools?: string[] | string;

  schoolExperience?: string;
  schoolTeachingExperience?: string;
  schoolExperienceYears?: string | number;
  coachingExperience?: string;
  coachingTeachingExperience?: string;
  coachingExperienceYears?: string | number;
  coachingBackground?: string;

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

  /*
   * Important:
   * The registration form submits these inside `teaching`.
   * Keeping this flexible allows the profile page to read
   * the actual CRM structure without breaking.
   */
  teaching?: {
    experience?: number | string;
    schoolExperience?: string;
    schoolTeachingExperience?: string;
    schoolExperienceYears?: number | string;

    studentsTaughtFrom?: string | string[] | Record<string, any> | Record<string, any>[];
    schoolName?: string | string[];
    coachingExperience?: string;
    coachingTeachingExperience?: string;
    coachingExperienceYears?: string | number;
    coachingBackground?: string;
    studentsTaughtFromSchools?: string | string[] | Record<string, any> | Record<string, any>[];
    schoolsTaught?: string | string[] | Record<string, any> | Record<string, any>[];
    schoolNames?: string | string[] | Record<string, any> | Record<string, any>[];
    previousInstitutions?: string | string[] | Record<string, any> | Record<string, any>[];
    institutions?: string | string[] | Record<string, any> | Record<string, any>[];

    boards?: string[] | string;

    primaryClasses?: string[] | string;
    primarySubjects?: string[] | string;
    primaryAllSubjects?: boolean | string;

    secondaryClasses?: string[] | string;
    secondarySubjects?: string[] | string;
    secondaryAllSubjects?: boolean | string;

    seniorSecondaryClasses?: string[] | string;
    seniorSecondarySubjects?: string[] | string;
    seniorSecondaryAllSubjects?: boolean | string;

    englishFluency?: string;
    stream?: string;
  };

  education?: {
    highestQualification?: string;
    college?: string;
    university?: string;
    stream?: string;
    specialization?: string;
    additionalQualification?: string;
    additionalQualifications?: string[] | string;
    qualificationStream?: string;
    educationStream?: string;
    fieldOfStudy?: string;
    course?: string;
    major?: string;
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

/* =========================================================
   ARRAY / TEXT NORMALIZATION
========================================================= */

/*
 * Converts:
 *
 * ["CBSE", "ICSE"]
 *
 * OR
 *
 * "CBSE, ICSE"
 *
 * OR
 *
 * "CBSE • ICSE"
 *
 * into a clean array.
 */
function cleanArray(value: any): string[] {
  if (value === undefined || value === null) {
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
      .map((item) => String(item).trim())
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

function firstArray(...values: any[]): string[] {
  for (const value of values) {
    const result = cleanArray(value);

    if (result.length > 0) {
      return result;
    }
  }

  return [];
}

/*
 * Removes duplicate values while treating differences in
 * capitalization and surrounding whitespace as the same value.
 * The first clean version is preserved for display.
 */
function uniqueArray(values: string[]): string[] {
  const seen = new Set<string>();

  return values
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .filter((value) => {
      const key = value.replace(/\s+/g, ' ').toLowerCase();

      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    });
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

function isTruthyBoolean(value: any) {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'string') {
    return [
      'true',
      '1',
      'yes',
      'y',
      'all',
      'all subjects',
    ].includes(value.trim().toLowerCase());
  }

  return false;
}

function classNumber(value: string) {
  const text = String(value || '').trim().toLowerCase();

  if (/^(nursery|nurs|pre[- ]?nursery|pre[- ]?n)$/i.test(text)) {
    return 0;
  }

  if (/^(lkg|lower kindergarten)$/i.test(text)) {
    return -2;
  }

  if (/^(ukg|upper kindergarten)$/i.test(text)) {
    return -1;
  }

  const match = text.match(/(?:class|grade|std\.?|standard)?\s*(\d{1,2})\b/i);

  if (!match) {
    return null;
  }

  const number = Number(match[1]);

  return number >= 1 && number <= 12 ? number : null;
}

function classDisplayLabel(value: string) {
  const text = String(value || '').trim();

  if (/^nursery$/i.test(text)) return 'Nursery';
  if (/^(lkg|lower kindergarten)$/i.test(text)) return 'LKG';
  if (/^(ukg|upper kindergarten)$/i.test(text)) return 'UKG';

  const number = classNumber(text);

  return number !== null
    ? `Class ${number}`
    : text;
}

/*
 * Converts the actual selected classes into a parent-friendly
 * range without inventing classes.
 *
 * Examples:
 *   Class 5, 6, 7, 8  -> Class 5–8
 *   Class 9, 10         -> Class 9–10
 *   Class 11, 12        -> Class 11–12
 *   Class 5, Class 7    -> Class 5 • Class 7
 */
function formatTeachingClassRange(values: string[]) {
  const cleaned = uniqueArray(values);

  if (cleaned.length === 0) {
    return null;
  }

  const parsed = cleaned
    .map((value) => ({
      original: value,
      number: classNumber(value),
    }))
    .filter(
      (item): item is {
        original: string;
        number: number;
      } => item.number !== null
    )
    .sort((a, b) => a.number - b.number);

  /*
   * If some values are not standard class labels, retain the
   * original labels instead of silently dropping them.
   */
  if (parsed.length !== cleaned.length) {
    return cleaned.map(classDisplayLabel).join(' • ');
  }

  if (parsed.length === 1) {
    return classDisplayLabel(parsed[0].original);
  }

  const numbers = parsed.map((item) => item.number);
  const uniqueNumbers = [...new Set(numbers)];

  const isContinuous = uniqueNumbers.every(
    (number, index) =>
      index === 0 ||
      number === uniqueNumbers[index - 1] + 1
  );

  if (!isContinuous) {
    return parsed
      .map((item) => classDisplayLabel(item.original))
      .join(' • ');
  }

  const first = uniqueNumbers[0];
  const last = uniqueNumbers[uniqueNumbers.length - 1];

  /*
   * Handle early-school ranges naturally.
   */
  if (first < 1) {
    const firstLabel =
      first === -2
        ? 'LKG'
        : first === -1
          ? 'UKG'
          : 'Nursery';

    if (last === 0) {
      return `${firstLabel} – Nursery`;
    }

    return `${firstLabel} – Class ${last}`;
  }

  return `Class ${first}–${last}`;
}

function buildTeachingLevelSummary(
  label: string,
  classesValue: any,
  subjectsValue: any,
  allSubjectsValue: any
) {
  const classesForLevel = firstArray(classesValue);
  const subjectsForLevel = uniqueArray(
    firstArray(subjectsValue)
  );

  const allSubjects = isTruthyBoolean(allSubjectsValue);

  /*
   * A level should only appear when the tutor actually has
   * something selected for that level.
   */
  if (
    classesForLevel.length === 0 &&
    subjectsForLevel.length === 0 &&
    !allSubjects
  ) {
    return null;
  }

  const classRange =
    formatTeachingClassRange(classesForLevel) ||
    label;

  const subjectText = allSubjects
    ? 'All Subjects'
    : subjectsForLevel.length > 0
      ? subjectsForLevel.join(' · ')
      : null;

  return {
    key: label,
    label: classRange,
    subjects: subjectsForLevel,
    allSubjects,
    subjectText,
  };
}

function formatExperience(value?: number | string | null) {
  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return null;
  }

  const text = String(value).trim();

  /*
   * If the CRM already contains text such as
   * "10+ years", don't append another "years".
   */
  if (
    /year|years|month|months/i.test(text)
  ) {
    return text;
  }

  return `${text} ${
    text === '1' ? 'year' : 'years'
  }`;
}

function formatMode(
  mode?: string | string[] | null
) {
  const values = cleanArray(mode);

  if (values.length === 0) {
    return null;
  }

  const normalized = values.map((value) =>
    value.toLowerCase().trim()
  );

  // The CRM can store the combined mode as "Both".
  // Never expose that internal value to parents.
  const hasBoth =
    normalized.includes('both') ||
    normalized.includes('home & online') ||
    normalized.includes('home and online') ||
    normalized.includes('home + online') ||
    normalized.includes('home/online');

  const hasHome =
    normalized.includes('home') ||
    normalized.includes('offline') ||
    normalized.includes('home tuition') ||
    normalized.includes('home classes');

  const hasOnline =
    normalized.includes('online') ||
    normalized.includes('online tuition') ||
    normalized.includes('online classes');

  if (hasBoth || (hasHome && hasOnline)) {
    return 'Available for Home Tuition & Online Classes';
  }

  if (hasOnline) {
    return 'Available for Online Classes';
  }

  if (hasHome) {
    return 'Available for Home Tuition';
  }

  return values.join(' • ');
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
  icon,
  children,
}: {
  title: string;
  eyebrow?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="group bg-white border border-[#E5E7EB] rounded-[28px] p-6 sm:p-8 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
      <div className="flex items-start gap-4 mb-6">
        {icon && (
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0A6FF7] to-[#2F8EFF] flex items-center justify-center text-white flex-shrink-0 shadow-[0_4px_10px_rgba(10,111,247,0.25)]">
            {icon}
          </div>
        )}

        <div>
          {eyebrow && (
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A6FF7] mb-1.5">
              {eyebrow}
            </p>
          )}

          <h2 className="text-xl sm:text-2xl font-bold text-[#0D1118] leading-tight">
            {title}
          </h2>
        </div>
      </div>

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
      className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
        blue
          ? 'bg-gradient-to-br from-[#EBF4FF] to-[#E3F0FF] text-[#0A6FF7] border border-[#D6E9FF] hover:border-[#0A6FF7]/40'
          : 'bg-[#F8FAFC] border border-[#E5E7EB] text-[#374151] hover:border-[#0A6FF7]/30 hover:bg-[#F2F7FF]'
      }`}
    >
      {blue && <span className="w-1.5 h-1.5 rounded-full bg-[#0A6FF7]" />}
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
    <div className="flex items-start gap-4 p-3 -m-3 rounded-2xl transition-colors hover:bg-[#F8FAFC]">
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
    tutor.fullName ||
    tutor.personal?.fullName ||
    'Tutor';

  const subjects = firstArray(
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
    title: `${name} — ${
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

        <section className="min-h-[60vh] flex items-center justify-center px-4 bg-gradient-to-b from-[#F8FAFC] to-white">
          <div className="text-center max-w-lg">

            <div className="w-20 h-20 mx-auto mb-7 rounded-3xl bg-gradient-to-br from-[#EBF4FF] to-[#DCEBFF] flex items-center justify-center shadow-[0_8px_24px_rgba(10,111,247,0.12)]">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A6FF7"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[#0D1118] mb-3 tracking-tight">
              Tutor Profile Not Found
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-9">
              We couldn't find this tutor profile in the
              TutorWave tutor network. The profile may have
              been removed, unpublished or is still being
              verified.
            </p>

            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors shadow-[0_8px_20px_rgba(10,111,247,0.25)]"
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

  /*
   * "Request This Tutor" / "Interested in this tutor?" CTAs
   * deep-link straight into TutorWave's WhatsApp number with a
   * pre-filled demo-class request naming this specific tutor.
   */
  const tutorWhatsAppHref = `https://wa.me/918588879239?text=${encodeURIComponent(
    `I want demo class with ${name}`
  )}`;

  const photo =
    tutor.profilePhoto ||
    tutor.personal?.profilePhoto ||
    '';

  /*
   * =======================================================
   * TEACHING BY CLASS LEVEL
   *
   * IMPORTANT:
   * Do not merge these into one generic subject list.
   * The registration form stores teaching preferences
   * separately for:
   *
   *   - Nursery / Class 1–8
   *   - Class 9–10
   *   - Class 11–12
   *
   * We preserve those three groups all the way to the
   * public profile so parents can immediately understand
   * what the tutor teaches at each level.
   * =======================================================
   */

  const primaryClasses = firstArray(
    tutor.teaching?.primaryClasses,
    tutor.primaryClasses
  );

  const primarySubjects = uniqueArray(
    firstArray(
      tutor.teaching?.primarySubjects,
      tutor.primarySubjects
    )
  );

  const primaryAllSubjects = isTruthyBoolean(
    tutor.teaching?.primaryAllSubjects ??
    tutor.primaryAllSubjects
  );

  const secondaryClasses = firstArray(
    tutor.teaching?.secondaryClasses,
    tutor.secondaryClasses
  );

  const secondarySubjects = uniqueArray(
    firstArray(
      tutor.teaching?.secondarySubjects,
      tutor.secondarySubjects
    )
  );

  const secondaryAllSubjects = isTruthyBoolean(
    tutor.teaching?.secondaryAllSubjects ??
    tutor.secondaryAllSubjects
  );

  const seniorSecondaryClasses = firstArray(
    tutor.teaching?.seniorSecondaryClasses,
    tutor.seniorSecondaryClasses
  );

  const seniorSecondarySubjects = uniqueArray(
    firstArray(
      tutor.teaching?.seniorSecondarySubjects,
      tutor.seniorSecondarySubjects
    )
  );

  const seniorSecondaryAllSubjects = isTruthyBoolean(
    tutor.teaching?.seniorSecondaryAllSubjects ??
    tutor.seniorSecondaryAllSubjects
  );

  const teachingLevelGroups = [
    buildTeachingLevelSummary(
      'Primary',
      primaryClasses,
      primarySubjects,
      primaryAllSubjects
    ),
    buildTeachingLevelSummary(
      'Secondary',
      secondaryClasses,
      secondarySubjects,
      secondaryAllSubjects
    ),
    buildTeachingLevelSummary(
      'Senior Secondary',
      seniorSecondaryClasses,
      seniorSecondarySubjects,
      seniorSecondaryAllSubjects
    ),
  ].filter(
    (
      group
    ): group is NonNullable<typeof group> =>
      Boolean(group)
  );

  /*
   * Combined values are retained only for legacy summary /
   * metadata uses. They are NOT used to render the main
   * Academic Expertise teaching breakdown.
   */
  const subjects = uniqueArray([
    ...primarySubjects,
    ...secondarySubjects,
    ...seniorSecondarySubjects,
  ]);

  const classes = uniqueArray([
    ...primaryClasses,
    ...secondaryClasses,
    ...seniorSecondaryClasses,
  ]);

  const teachingLevelSummary = teachingLevelGroups
    .map(
      (group) =>
        `${group.label}: ${
          group.allSubjects
            ? 'All Subjects'
            : group.subjectText || 'Subjects not specified'
        }`
    )
    .join(' • ');

  /*
   * Boards
   */
  const boards = firstArray(
    tutor.boards,
    tutor.teaching?.boards
  );

  /*
   * Location
   */
  const city =
    firstText(
      tutor.city,
      tutor.location,
      tutor.area,
      tutor.locality,
      tutor.personal?.city,
      tutor.personal?.location
    ) || 'Delhi NCR';

  /*
   * Areas
   */
  const areas = firstArray(
    tutor.areas,
    tutor.preferences?.offlineAreas
  );

  /*
   * Languages
   */
  const languages = firstArray(
    tutor.languages,
    tutor.teachingLanguages,
    tutor.language,
    tutor.spokenLanguages
  );

  /*
   * Experience
   *
   * IMPORTANT:
   * The registration form stores experience inside:
   *
   * teaching.experience
   */
  const rawExperience =
    tutor.experienceYears ??
    tutor.experience ??
    tutor.teaching?.experience;

  const experience =
    formatExperience(rawExperience);

  /*
   * Teaching mode
   */
  const mode = formatMode(
    tutor.mode ??
    tutor.teachingMode ??
    tutor.modes ??
    tutor.preferredMode ??
    tutor.preferences?.teachingMode
  );

  /*
   * Qualification
   */
  const qualification =
    firstText(
      tutor.highestQualification,
      tutor.qualification,
      tutor.degree,
      tutor.education?.highestQualification
    );

  /*
   * College / university
   */
  const college =
    firstText(
      tutor.college,
      tutor.university,
      tutor.collegeUniversity,
      tutor.institution,
      tutor.education?.college,
      tutor.education?.university
    );

  /*
   * Specialisation
   */
  const specialization =
    firstText(
      tutor.specialization,
      tutor.education?.specialization
    );

  /*
   * Qualification / stream
   *
   * The registration form stores the actual degree/field
   * in education.stream. We keep the fallback fields here
   * so older CRM records continue to display correctly.
   */
  const qualificationStreams =
    uniqueArray(
      firstArray(
        tutor.stream,
        tutor.education?.stream,
        tutor.teaching?.stream,
        tutor.qualificationStream,
        tutor.educationStream,
        tutor.fieldOfStudy,
        tutor.course,
        tutor.major,
        tutor.education?.qualificationStream,
        tutor.education?.educationStream,
        tutor.education?.fieldOfStudy,
        tutor.education?.course,
        tutor.education?.major
      )
    );

  /*
   * Teaching experience details
   */
  const experienceDetails =
    firstText(
      tutor.teachingExperience,
      tutor.experienceDetails
    );

  /*
   * =======================================================
   * SCHOOL TEACHING EXPERIENCE
   *
   * The registration form submits:
   *
   * teaching.schoolExperience
   *
   * so we explicitly read that field.
   * =======================================================
   */

  const schoolExperience =
    firstText(
      tutor.schoolExperience,
      tutor.schoolTeachingExperience,
      tutor.schoolExperienceYears,
      tutor.teaching?.schoolExperience,
      tutor.teaching?.schoolTeachingExperience,
      tutor.teaching?.schoolExperienceYears
    );

  const coachingExperience =
    firstText(
      tutor.coachingExperience,
      tutor.coachingTeachingExperience,
      tutor.coachingExperienceYears,
      tutor.coachingBackground,
      tutor.teaching?.coachingExperience,
      tutor.teaching?.coachingTeachingExperience,
      tutor.teaching?.coachingExperienceYears,
      tutor.teaching?.coachingBackground
    );

  /*
   * =======================================================
   * SCHOOLS / INSTITUTIONS TAUGHT FROM
   *
   * Read both direct and nested CRM fields. In particular,
   * `studentsTaughtFrom` can exist at the top level in the
   * public tutor response.
   * =======================================================
   */

  const schoolSourceValues = [
    tutor.schoolsTaught,
    tutor.schoolNames,
    tutor.schoolName,
    tutor.studentsTaughtFrom,
    tutor.studentsTaughtFromSchools,
    tutor.previousInstitutions,
    tutor.institutions,
    tutor.teaching?.studentsTaughtFrom,
    tutor.teaching?.studentsTaughtFromSchools,
    tutor.teaching?.schoolsTaught,
    tutor.teaching?.schoolNames,
    tutor.teaching?.previousInstitutions,
    tutor.teaching?.institutions,
  ];

  const schoolsTaught = uniqueArray(
    schoolSourceValues.flatMap((value: any) => {
      if (value === undefined || value === null || value === '') return [];

      const items = Array.isArray(value) ? value.flat(Infinity) : [value];

      return items.flatMap((item: any) => {
        if (item === undefined || item === null || item === '') return [];

        if (typeof item === 'object') {
          return cleanArray([
            item.schoolName,
            item.school,
            item.name,
            item.institution,
            item.institutionName,
            item.school_name,
            item.school_name_value,
            item.title,
            item.label,
            item.value,
          ]);
        }

        const text = String(item).trim();

        // Do not expose a boolean/Yes/No as a school name.
        if (/^(yes|no|true|false)$/i.test(text)) return [];

        return cleanArray(text);
      });
    })
  );

  /*
   * Students taught count
   */
  const studentsTaught =
    formatNumber(
      tutor.studentsTaught ??
      tutor.totalStudents ??
      tutor.studentsCount
    );

  /*
   * About
   */
  const bio =
    firstText(
      tutor.bio,
      tutor.about,
      tutor.aboutTutor,
      tutor.description
    ) ||
    `${name} is a TutorWave tutor available for personalized tuition support.`;

  /*
   * Teaching approach
   */
  const teachingApproach =
    firstText(
      tutor.teachingApproach,
      tutor.teachingMethodology,
      tutor.approach,
      tutor.teachingMethods
    );

  /*
   * Availability
   */
  const availability =
    firstText(
      tutor.availability,
      tutor.availableTimings,
      tutor.preferredTiming,
      tutor.timings,
      tutor.preferences?.availability
    );

  const availabilityTime =
    firstText(tutor.availabilityTime);

  const availabilityDays =
    firstArray(tutor.availabilityDays);

  /*
   * Fees
   */
  const feeRange =
    firstText(
      tutor.feeRange,
      tutor.fees,
      tutor.hourlyRate
    );

  /*
   * Achievements
   */
  const achievements =
    cleanArray(tutor.achievements);

  /*
   * Additional Qualifications
   *
   * The CRM may store these under different fields depending
   * on when/how the tutor profile was created. Consolidate all
   * supported fields into ONE clean, de-duplicated list so the
   * profile never shows the same qualification twice.
   */
  const additionalQualifications =
    uniqueArray([
      ...cleanArray(tutor.additionalQualification),
      ...cleanArray(tutor.additionalQualifications),
      ...cleanArray(tutor.education?.additionalQualification),
      ...cleanArray(tutor.education?.additionalQualifications),
      ...cleanArray(tutor.certifications),
    ]);

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

          <div className="flex items-center gap-2 text-sm text-[#6B7280] overflow-x-auto whitespace-nowrap">

            <Link
              href="/"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Home
            </Link>

            <span className="text-[#CBD5E1]">/</span>

            <Link
              href="/tutors"
              className="hover:text-[#0A6FF7] transition-colors"
            >
              Tutors
            </Link>

            <span className="text-[#CBD5E1]">/</span>

            <span className="text-[#0D1118] font-semibold truncate">
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

          <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-7 lg:gap-10 items-start">

            {/* PHOTO */}

            <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-3xl overflow-hidden bg-[#EBF4FF] border border-[#E5E7EB] shadow-sm">

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
            </div>

            {/* MAIN INFORMATION */}

            <div>

              <div className="flex flex-wrap items-center gap-3 mb-3">

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D1118] tracking-tight">
                  {name}
                </h1>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ECFDF5] text-[#059669] text-xs sm:text-sm font-bold border border-[#A7F3D0]">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Verified
                </span>

              </div>

              {experience && (
                <p className="text-base sm:text-lg font-semibold text-[#4B5563] mb-2">
                  {experience} Experience
                </p>
              )}

              {teachingLevelSummary && (
                <p className="text-base sm:text-lg text-[#5F6B7A] mb-6 leading-7">
                  {teachingLevelSummary}
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

          </div>

        </div>

      </section>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="py-8 sm:py-12">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-7 lg:gap-8">

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
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7-5.4-4.7 7.1-.6L12 2z" />
                  </svg>
                }
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {experience && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {experience} teaching experience
                      </p>
                    </div>
                  )}

                  {boards.length > 0 && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {boards.join(' & ')}
                      </p>
                    </div>
                  )}

                  {teachingLevelSummary && (
                    <div className="flex items-start gap-3 sm:col-span-2">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                        <CheckIcon />
                      </div>

                      <p className="text-[#374151] leading-7">
                        {teachingLevelSummary}
                      </p>
                    </div>
                  )}

                  {mode && (
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EBF4FF] flex               {/* =================================================
                  ACADEMIC EXPERTISE
              ================================================= */}

              <Section
                title="Academic Expertise"
                eyebrow="Subjects by class level"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5V6a2 2 0 012-2h13v15H6a2 2 0 00-2 2.5z" />
                    <path d="M19 15H6" />
                  </svg>
                }
              >

                <div className="space-y-5">

                  {teachingLevelGroups.length > 0 ? (
                    teachingLevelGroups.map((group) => (
                      <div
                        key={group.key}
                        className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 sm:p-6"
                      >

                        <h3 className="text-base sm:text-lg font-bold text-[#0D1118] mb-4">
                          {group.label}
                        </h3>

                        <div className="flex flex-wrap gap-2.5">

                          {group.allSubjects ? (
                            <span className="inline-flex items-center px-4 py-2.5 rounded-xl bg-[#EBF4FF] border border-[#D6E9FF] text-[#0A6FF7] text-sm font-bold">
                              All Subjects
                            </span>
                          ) : group.subjects.length > 0 ? (
                            group.subjects.map((subject, index) => (
                              <Tag
                                key={`${group.key}-${subject}-${index}`}
                                blue
                              >
                                {subject}
                              </Tag>
                            ))
                          ) : (
                            <span className="text-sm text-[#6B7280]">
                              Subjects not specified
                            </span>
                          )}

                        </div>

                      </div>
                    ))
                  ) : (
                    <p className="text-[#6B7280] leading-7">
                      Teaching subjects and class levels have not been specified yet.
                    </p>
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
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
                        Specialisation
                      </p>

                      <p className="text-[#374151] leading-7">
                        {specialization}
                      </p>

                    </div>
                  )}

                </div>

              </Section>

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
                        <circle cx="12" cy="10" r="3" />
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
                          <circle cx="9" cy="8" r="3" />
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
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5V6a2 2 0 012-2h13v15H6a2 2 0 00-2 2.5z" />
                    <path d="M19 15H6" />
                  </svg>
                }
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
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                      <p className="text-xs font-bold uppercase tracking-wider text-[#6B7280] mb-2">
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

              {(qualification || qualificationStreams.length > 0 || college) && (
                <Section
                  title="Education & Qualifications"
                  eyebrow="Academic background"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 10l-10-5-10 5 10 5 10-5Z" />
                      <path d="M6 12v5c3 2 9 2 12 0v-5" />
                    </svg>
                  }
                >

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {(qualification || qualificationStreams.length > 0) && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5 transition-colors hover:border-[#0A6FF7]/30">

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

                        {qualification && (
                          <>
                            <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                              Highest Qualification
                            </p>

                            <p className="font-semibold text-[#0D1118]">
                              {qualification}
                            </p>
                          </>
                        )}

                        {qualificationStreams.length > 0 && (
                          <div className={`${qualification ? 'mt-5 pt-5 border-t border-[#E5E7EB]' : ''}`}>

                            <p className="text-xs uppercase tracking-wider font-bold text-[#6B7280] mb-2">
                              Stream
                            </p>

                            <div className="space-y-1">
                              {qualificationStreams.map((stream, index) => (
                                <p
                                  key={`${stream}-${index}`}
                                  className="font-semibold text-[#0D1118]"
                                >
                                  {stream}
                                </p>
                              ))}
                            </div>

                          </div>
                        )}

                      </div>
                    )}

                    {college && (
                      <div className="border border-[#E5E7EB] rounded-2xl p-5 transition-colors hover:border-[#0A6FF7]/30">

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

              {/* =================================================
                  TEACHING EXPERIENCE
              ================================================= */}

              {(experience || experienceDetails) && (
                <Section
                  title="Teaching Experience"
                  eyebrow="Professional experience"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
                      <path d="M3 12h18" />
                    </svg>
                  }
                >

                  <div className="flex gap-5">

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

              {(schoolExperience || coachingExperience) && (
                <Section
                  title={
                    schoolExperience && coachingExperience
                      ? "School & Coaching Teaching Experience"
                      : schoolExperience
                        ? "School Teaching Experience"
                        : "Coaching Teaching Experience"
                  }
                  eyebrow="School / coaching background"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21h18" />
                      <path d="M5 21V9l7-5 7 5v12" />
                      <path d="M9 21v-6h6v6" />
                    </svg>
                  }
                >

                  <div className="space-y-5">

                    {schoolExperience && (
                      <div className="flex items-start gap-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">

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

                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-[#6B7280] mb-1">
                            School Teaching Experience
                          </p>
                          <p className="text-[#374151] leading-8">
                            {schoolExperience}
                          </p>
                        </div>

                      </div>
                    )}

                    {coachingExperience && (
                      <div className="flex items-start gap-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5">

                        <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center flex-shrink-0 text-[#0A6FF7]">

                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path d="M4 19h16" />
                            <path d="M6 17V7h12v10" />
                            <path d="M9 7V5h6v2" />
                            <path d="M8 11h8M8 14h5" />
                          </svg>

                        </div>

                        <div>
                          <p className="text-sm font-semibold uppercase tracking-wide text-[#6B7280] mb-1">
                            Coaching / Institute Teaching Experience
                          </p>
                          <p className="text-[#374151] leading-8">
                            {coachingExperience}
                          </p>
                        </div>

                      </div>
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  STUDENTS TAUGHT FROM
              ================================================= */}

              {schoolsTaught.length > 0 && (
                <Section
                  title="Students Taught From Schools"
                  eyebrow="School / institution exposure"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="8" r="3" />
                      <path d="M3 20c0-3.5 2.5-6 6-6s6 2.5 6 6" />
                      <path d="M16 11c2.5 0 5 1.8 5 5" />
                    </svg>
                  }
                >

                  <p className="text-[#6B7280] mb-5 leading-7">
                    Has taught students from:
                  </p>

                  <div className="flex flex-wrap gap-2.5">

                    {schoolsTaught.map(
                      (school, index) => (
                        <Tag key={`${school}-${index}`}>
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
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                      <path d="M12 8v4l3 2" />
                    </svg>
                  }
                >

                  <div className="bg-gradient-to-br from-[#F8FAFC] to-[#F1F6FF] border border-[#E5E7EB] rounded-2xl p-5">

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
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                    </svg>
                  }
                >

                  <div className="flex flex-wrap gap-2.5">

                    {languages.map(
                      (language, index) => (
                        <Tag key={`${language}-${index}`}>
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
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
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

                        {areas.map(
                          (area, index) => (
                            <Tag key={`${area}-${index}`}>
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
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4M8 3v4M3 11h18" />
                    </svg>
                  }
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
                            (day, index) => (
                              <Tag key={`${day}-${index}`}>
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
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M9 13.5L7 22l5-3 5 3-2-8.5" />
                    </svg>
                  }
                >

                  <div className="space-y-3">

                    {achievements.map(
                      (achievement, index) => (
                        <div
                          key={`${achievement}-${index}`}
                          className="flex items-start gap-3"
                        >

                          <div className="mt-0.5 w-6 h-6 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
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
                  ADDITIONAL QUALIFICATIONS
              ================================================= */}

              {additionalQualifications.length > 0 && (
                <Section
                  title="Additional Qualifications"
                  eyebrow="Certifications & other qualifications"
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 15a6 6 0 100-12 6 6 0 000 12z" />
                      <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" />
                    </svg>
                  }
                >

                  <div className="flex flex-wrap gap-2.5">

                    {additionalQualifications.map(
                      (qualificationItem, index) => (
                        <Tag
                          key={`${qualificationItem}-${index}`}
                        >
                          {qualificationItem}
                        </Tag>
                      )
                    )}

                  </div>

                </Section>
              )}

              {/* =================================================
                  MOBILE CTA
              ================================================= */}

              <div className="lg:hidden bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

                <p className="text-xs uppercase tracking-wider font-bold text-[#0A6FF7] mb-2">
                  TutorWave
                </p>

                <h2 className="text-xl font-bold text-[#0D1118] mb-2">
                  Interested in {name}?
                </h2>

                <p className="text-sm text-[#6B7280] leading-6 mb-5">
                  Tell us about your child's requirements
                  and our team will help you proceed.
                </p>

                <a
                  href={tutorWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
                >
                  Request This Tutor
                  <span>→</span>
                </a>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <aside className="hidden lg:block">

              <div className="sticky top-24 space-y-5">

                {/* =================================================
                    PROFILE SUMMARY
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-5">
                    Profile Summary
                  </h3>

                  <div className="space-y-4">

                    {experience && (
                      <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
                        <span className="text-sm text-[#6B7280]">
                          Experience
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {experience}
                        </span>
                      </div>
                    )}

                    {qualification && (
                      <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
                        <span className="text-sm text-[#6B7280]">
                          Highest Qualification
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right max-w-[190px]">
                          {qualification}
                        </span>
                      </div>
                    )}

                    {subjects.length > 0 && (
                      <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
                        <span className="text-sm text-[#6B7280]">
                          Subjects
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {subjects.length}
                        </span>
                      </div>
                    )}

                    {classes.length > 0 && (
                      <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
                        <span className="text-sm text-[#6B7280]">
                          Classes
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {classes.length}
                        </span>
                      </div>
                    )}

                    {boards.length > 0 && (
                      <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
                        <span className="text-sm text-[#6B7280]">
                          Boards
                        </span>

                        <span className="text-sm font-semibold text-[#0D1118] text-right">
                          {boards.join(', ')}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between gap-4 pb-3 border-b border-[#F1F5F9]">
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

                {/* =================================================
                    BROWSE OTHER TUTORS
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

                  <p className="text-xs uppercase tracking-wider font-bold text-[#0A6FF7] mb-2">
                    Explore
                  </p>

                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Browse Other Tutors
                  </h3>

                  <p className="text-sm text-[#6B7280] leading-6 mb-5">
                    Explore more TutorWave profiles and
                    compare tutors based on your child's
                    requirements.
                  </p>

                  <Link
                    href="/tutors"
                    className="flex items-center justify-center gap-2 w-full bg-[#EBF4FF] text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#DCEBFF] transition-colors"
                  >
                    Browse Tutors
                    <span>→</span>
                  </Link>

                </div>

                {/* =================================================
                    REQUEST CTA
                ================================================= */}

                <div className="bg-white border border-[#E5E7EB] rounded-[28px] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04)]">

                  <p className="text-xs uppercase tracking-[0.12em] font-bold text-[#0A6FF7] mb-2">
                    TutorWave
                  </p>

                  <h2 className="text-2xl font-bold text-[#0D1118]">
                    Interested in this tutor?
                  </h2>

                  <p className="text-sm text-[#6B7280] mt-3 leading-6">
                    Share your tuition requirement and
                    our team will help you proceed.
                  </p>

                  <a
                    href={tutorWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#0A6FF7] text-white font-bold py-4 rounded-xl hover:bg-[#0858c8] transition-colors mt-6"
                  >
                    Request This Tutor
                    <span>→</span>
                  </a>

                  <p className="text-xs text-center text-[#6B7280] mt-3">
                    No obligation to hire.
                  </p>

                </div>

              </div>

            </aside>

          </div>

        </div>

      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="bg-[#F7F9FC] border-t border-[#E5E7EB] py-12 sm:py-16">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">

          <p className="text-[#0A6FF7] text-sm font-bold uppercase tracking-[0.15em] mb-3">
            TutorWave
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1118]">
            Looking for the right tutor for your child?
          </h2>

          <p className="text-[#6B7280] mt-3 max-w-2xl mx-auto leading-7">
            Tell us your child's class, subject, location
            and learning requirements. Our team will help
            you find a suitable tutor.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7">

            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors shadow-[0_10px_24px_rgba(10,111,247,0.25)]"
            >
              Find a Tutor
              <span>→</span>
            </Link>

            <Link
              href="/tutors"
              className="inline-flex items-center justify-center bg-white text-[#0D1118] font-bold px-7 py-3.5 rounded-xl hover:bg-[#F1F5F9] transition-colors border border-[#E5E7EB]"
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
