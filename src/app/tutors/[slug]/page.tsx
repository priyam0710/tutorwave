import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors, Tutor } from '@/lib/data/tutors';

type ExtendedTutor = Tutor & {
  age?: number | string;
  gender?: string;
  college?: string;
  schooling?: string;
  school?: string;
  schoolExperience?: string;
  studentsTaught?: string;
  englishFluency?: string;
  specialization?: string | string[];
  experienceYears?: number | string;
  highestQualification?: string;
  mode?: string | string[];
  areas?: string[];
  languages?: string[];
  bio?: string;
  availability?: string;
};

function findTutorBySlug(rawSlug: string): Tutor | undefined {
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase();

  return tutors.find(
    (tutor) => tutor.slug.trim().toLowerCase() === normalized
  );
}

function getExtendedTutor(tutor: Tutor): ExtendedTutor {
  return tutor as ExtendedTutor;
}

function cleanValue(value: unknown): string {
  if (value === undefined || value === null) return '';

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(' • ');
  }

  return String(value).trim();
}

function getModes(tutor: ExtendedTutor): string[] {
  const rawMode = tutor.mode ?? tutor.teachingMode;

  if (Array.isArray(rawMode)) {
    const modes: string[] = [];

    rawMode.forEach((mode) => {
      const value = String(mode).toLowerCase();

      if (
        value.includes('home') ||
        value.includes('offline')
      ) {
        if (!modes.includes('Home Tuition')) {
          modes.push('Home Tuition');
        }
      }

      if (
        value.includes('online')
      ) {
        if (!modes.includes('Online Tuition')) {
          modes.push('Online Tuition');
        }
      }

      if (value.includes('both')) {
        if (!modes.includes('Home Tuition')) {
          modes.push('Home Tuition');
        }

        if (!modes.includes('Online Tuition')) {
          modes.push('Online Tuition');
        }
      }
    });

    return modes;
  }

  const value = String(rawMode ?? '').toLowerCase();

  if (value.includes('both')) {
    return ['Home Tuition', 'Online Tuition'];
  }

  if (value.includes('home') || value.includes('offline')) {
    return ['Home Tuition'];
  }

  if (value.includes('online')) {
    return ['Online Tuition'];
  }

  return [];
}

function Icon({
  name,
  size = 20,
}: {
  name:
    | 'location'
    | 'clock'
    | 'book'
    | 'graduation'
    | 'check'
    | 'language'
    | 'star'
    | 'home'
    | 'online'
    | 'users'
    | 'school'
    | 'briefcase'
    | 'award'
    | 'target'
    | 'calendar'
    | 'arrow';
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (name) {
    case 'location':
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );

    case 'clock':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case 'book':
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
          <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
        </svg>
      );

    case 'graduation':
      return (
        <svg {...common}>
          <path d="m3 9 9-5 9 5-9 5-9-5Z" />
          <path d="M7 11.2V16c3 2 7 2 10 0v-4.8" />
          <path d="M21 10v5" />
        </svg>
      );

    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case 'language':
      return (
        <svg {...common}>
          <path d="M4 5h8" />
          <path d="M8 3v2c0 4-2 7-5 9" />
          <path d="M5 10c1.5 1.5 3 2.5 5 3" />
          <path d="M14 21l4-10 4 10" />
          <path d="M15.5 17h5" />
        </svg>
      );

    case 'star':
      return (
        <svg {...common}>
          <path
            d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );

    case 'home':
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );

    case 'online':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );

    case 'users':
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case 'school':
      return (
        <svg {...common}>
          <path d="m3 9 9-5 9 5-9 5-9-5Z" />
          <path d="M7 11.2V16c3 2 7 2 10 0v-4.8" />
          <path d="M21 10v5" />
        </svg>
      );

    case 'briefcase':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );

    case 'award':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="5" />
          <path d="m8.5 12-1 9 4.5-2.5 4.5 2.5-1-9" />
        </svg>
      );

    case 'target':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );

    case 'calendar':
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      );

    default:
      return null;
  }
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon:
    | 'location'
    | 'clock'
    | 'book'
    | 'graduation'
    | 'language'
    | 'users'
    | 'school'
    | 'briefcase'
    | 'award'
    | 'target'
    | 'calendar';
  label: string;
  value: string;
}) {
  if (!value) return null;

  return (
    <div className="rounded-2xl border border-[#E8EDF3] bg-white p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
          <Icon name={icon} size={19} />
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#7B8794]">
          {label}
        </p>
      </div>

      <p className="text-[14px] font-semibold text-[#172033] leading-relaxed">
        {value}
      </p>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tutor = findTutorBySlug(params.slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description:
        'The tutor profile you are looking for does not exist.',
    };
  }

  const title = `${tutor.name} — ${tutor.subjects.join(
    ', '
  )} Tutor | TutorWave`;

  const description = `${tutor.name} is a ${
    tutor.verified ? 'verified ' : ''
  }TutorWave tutor with ${tutor.experience} years of teaching experience.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/tutors/${tutor.slug}`,
    },
    openGraph: {
      type: 'profile',
      title,
      description,
      url: `${baseUrl}/tutors/${tutor.slug}`,
      images: tutor.photo
        ? [
            {
              url: tutor.photo,
              width: 1200,
              height: 630,
              alt: tutor.photoAlt,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams() {
  return tutors.map((tutor) => ({
    slug: tutor.slug,
  }));
}

export default function TutorDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const tutor = findTutorBySlug(params.slug);

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'http://localhost:3000';

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />

        <section className="py-24 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">
            Tutor Not Found
          </h1>

          <p className="text-[#6B7280] mb-8">
            The tutor profile you are looking for does not exist.
          </p>

          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-[#0A6FF7] font-semibold hover:underline"
          >
            <Icon name="arrow" size={16} />
            Back to Tutors
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  const extendedTutor = getExtendedTutor(tutor);

  const modes = getModes(extendedTutor);

  const locations =
    extendedTutor.areas?.length
      ? extendedTutor.areas
      : extendedTutor.locations ?? [];

  const languages = extendedTutor.languages ?? [];

  const qualification =
    cleanValue(extendedTutor.highestQualification) ||
    extendedTutor.qualifications?.join(' • ') ||
    '';

  const experience =
    cleanValue(extendedTutor.experienceYears) ||
    cleanValue(extendedTutor.experience);

  const specialization = cleanValue(
    extendedTutor.specialization
  );

  const schoolExperience =
    cleanValue(extendedTutor.schoolExperience);

  const studentsTaught =
    cleanValue(extendedTutor.studentsTaught);

  const englishFluency =
    cleanValue(extendedTutor.englishFluency);

  const college = cleanValue(extendedTutor.college);

  const schooling =
    cleanValue(extendedTutor.schooling) ||
    cleanValue(extendedTutor.school);

  const optionalDetails = [
    {
      label: 'Highest Qualification',
      value: qualification,
      icon: 'graduation' as const,
    },
    {
      label: 'College / University',
      value: college,
      icon: 'school' as const,
    },
    {
      label: 'Schooling',
      value: schooling,
      icon: 'school' as const,
    },
    {
      label: 'Teaching Experience',
      value: experience
        ? `${experience} years`
        : '',
      icon: 'briefcase' as const,
    },
    {
      label: 'School Experience',
      value: schoolExperience,
      icon: 'school' as const,
    },
    {
      label: 'Students Taught',
      value: studentsTaught,
      icon: 'users' as const,
    },
    {
      label: 'English Fluency',
      value: englishFluency,
      icon: 'language' as const,
    },
  ].filter((item) => item.value);

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <Header />

      {/* Breadcrumb + Hero */}
      <section className="pt-20 pb-10 bg-white border-b border-[#E8EDF3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <nav
            className="flex items-center gap-2 text-[12px] text-[#7B8794] mb-8"
            aria-label="Breadcrumb"
          >
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
                      name: tutor.name,
                      item: `${baseUrl}/tutors/${tutor.slug}`,
                    },
                  ],
                }),
              }}
            />

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

            <span className="text-[#172033] font-semibold">
              {tutor.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-10 items-center">

            {/* Photo */}
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden bg-[#EEF3F8] border border-[#E3E9F0] shadow-sm">
                {tutor.photo ? (
                  <img
                    src={tutor.photo}
                    alt={tutor.photoAlt || tutor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-[#0A6FF7]">
                    {tutor.name
                      .split(' ')
                      .map((part) => part.charAt(0))
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                )}
              </div>

              {tutor.verified && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-[#0C8F81] text-white rounded-full px-4 py-2 shadow-lg whitespace-nowrap">
                  <Icon name="check" size={13} />
                  <span className="text-[11px] font-bold">
                    Verified Tutor
                  </span>
                </div>
              )}
            </div>

            {/* Main Identity */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D1118]">
                  {tutor.name}
                </h1>

                {tutor.verified && (
                  <span className="inline-flex items-center gap-1.5 bg-[#E6F7F5] text-[#0C8F81] rounded-full px-3 py-1.5 text-[11px] font-bold">
                    <Icon name="check" size={12} />
                    Verified
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#637083] mb-6">

                {experience && (
                  <span className="inline-flex items-center gap-2">
                    <Icon name="briefcase" size={16} />
                    {experience} years experience
                  </span>
                )}

                {locations[0] && (
                  <span className="inline-flex items-center gap-2">
                    <Icon name="location" size={16} />
                    {locations[0]}
                  </span>
                )}

                {extendedTutor.gender && (
                  <span className="capitalize">
                    {extendedTutor.gender}
                  </span>
                )}

              </div>

              {/* Modes */}
              {modes.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {modes.map((mode) => (
                    <span
                      key={mode}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EBF4FF] text-[#0A6FF7] text-[12px] font-bold"
                    >
                      <Icon
                        name={
                          mode === 'Home Tuition'
                            ? 'home'
                            : 'online'
                        }
                        size={14}
                      />
                      {mode}
                    </span>
                  ))}
                </div>
              )}

              {/* Subjects */}
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1.5 rounded-lg bg-[#F3F6F9] border border-[#E5EAF0] text-[#344054] text-[12px] font-semibold"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">

            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E8EDF3] p-5">
              <div className="flex items-center gap-2 text-[#0A6FF7] mb-2">
                <Icon name="briefcase" size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8794]">
                  Experience
                </span>
              </div>
              <p className="text-xl font-bold text-[#172033]">
                {experience ? `${experience} yrs` : '—'}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E8EDF3] p-5">
              <div className="flex items-center gap-2 text-[#0A6FF7] mb-2">
                <Icon name="book" size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8794]">
                  Subjects
                </span>
              </div>
              <p className="text-xl font-bold text-[#172033]">
                {tutor.subjects.length}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E8EDF3] p-5">
              <div className="flex items-center gap-2 text-[#0A6FF7] mb-2">
                <Icon name="graduation" size={18} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8794]">
                  Classes
                </span>
              </div>
              <p className="text-xl font-bold text-[#172033]">
                {tutor.classes.length}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E8EDF3] p-5">
              <div className="flex items-center gap-2 text-[#F4A900] mb-2">
                <Icon name="star" size={17} />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B8794]">
                  Rating
                </span>
              </div>
              <p className="text-xl font-bold text-[#172033]">
                {tutor.rating || '—'}
                {tutor.rating ? '/5' : ''}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Profile */}
      <section className="py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

            {/* Main Content */}
            <div className="space-y-7">

              {/* About */}
              {tutor.bio && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="users" size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                        Profile
                      </p>

                      <h2 className="text-xl font-bold text-[#172033]">
                        About the Tutor
                      </h2>
                    </div>
                  </div>

                  <p className="text-[14px] leading-7 text-[#596579]">
                    {tutor.bio}
                  </p>
                </section>
              )}

              {/* Academic & Professional Details */}
              {optionalDetails.length > 0 && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="graduation" size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                        Background
                      </p>

                      <h2 className="text-xl font-bold text-[#172033]">
                        Academic & Professional Details
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {optionalDetails.map((item) => (
                      <InfoCard
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Teaching Profile */}
              <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-7">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                    <Icon name="book" size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                      Teaching Profile
                    </p>

                    <h2 className="text-xl font-bold text-[#172033]">
                      What This Tutor Teaches
                    </h2>
                  </div>
                </div>

                {/* Subjects */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="book" size={16} />
                    <h3 className="font-bold text-[14px] text-[#172033]">
                      Subjects
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutor.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] text-[12px] font-semibold"
                      >
                        <Icon name="check" size={12} />
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Classes */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="graduation" size={16} />
                    <h3 className="font-bold text-[14px] text-[#172033]">
                      Classes
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutor.classes.map((className) => (
                      <span
                        key={className}
                        className="px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] text-[#344054] text-[12px] font-semibold"
                      >
                        {className}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Boards */}
                {tutor.boards?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="school" size={16} />
                      <h3 className="font-bold text-[14px] text-[#172033]">
                        Boards / Curricula
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tutor.boards.map((board) => (
                        <span
                          key={board}
                          className="px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] text-[#344054] text-[12px] font-semibold"
                        >
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Specialization */}
              {specialization && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="target" size={19} />
                    </div>

                    <h2 className="text-xl font-bold text-[#172033]">
                      Areas of Specialization
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(extendedTutor.specialization)
                      ? extendedTutor.specialization
                      : [extendedTutor.specialization]
                    ).filter(Boolean).map((item) => (
                      <span
                        key={String(item)}
                        className="px-4 py-2.5 rounded-xl bg-[#F3F7FF] text-[#0A6FF7] border border-[#DCEBFF] text-[12px] font-semibold"
                      >
                        {String(item)}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Languages */}
              {languages.length > 0 && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="language" size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                        Communication
                      </p>

                      <h2 className="text-xl font-bold text-[#172033]">
                        Languages
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <span
                        key={language}
                        className="px-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] text-[#344054] text-[12px] font-semibold"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Locations */}
              {locations.length > 0 && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="location" size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                        Service Area
                      </p>

                      <h2 className="text-xl font-bold text-[#172033]">
                        Locations Served
                      </h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {locations.map((location) => (
                      <span
                        key={location}
                        className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] text-[#344054] text-[12px] font-semibold"
                      >
                        <Icon name="location" size={13} />
                        {location}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {/* Availability */}
              {tutor.availability && (
                <section className="bg-white rounded-3xl border border-[#E5EAF0] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                      <Icon name="calendar" size={19} />
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0A6FF7]">
                        Schedule
                      </p>

                      <h2 className="text-xl font-bold text-[#172033]">
                        Availability
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-[#F8FAFC] border border-[#E8EDF3] p-5">
                    <div className="text-[#0A6FF7] mt-0.5">
                      <Icon name="clock" size={19} />
                    </div>

                    <p className="text-[14px] font-medium text-[#4B5565] leading-6">
                      {tutor.availability}
                    </p>
                  </div>
                </section>
              )}

            </div>

            {/* Sidebar */}
            <aside>
              <div className="lg:sticky lg:top-24 space-y-5">

                {/* Rating Card */}
                <div className="bg-white rounded-3xl border border-[#E5EAF0] p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7B8794]">
                        Tutor Rating
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-3xl font-bold text-[#172033]">
                          {tutor.rating || '—'}
                        </span>

                        {tutor.rating && (
                          <span className="text-sm text-[#7B8794]">
                            /5
                          </span>
                        )}
                      </div>
                    </div>

                    {tutor.rating > 0 && (
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] text-[#F4A900] flex items-center justify-center">
                        <Icon name="star" size={22} />
                      </div>
                    )}
                  </div>

                  {tutor.reviewCount > 0 && (
                    <p className="text-[12px] text-[#7B8794]">
                      Based on {tutor.reviewCount}{' '}
                      {tutor.reviewCount === 1
                        ? 'review'
                        : 'reviews'}
                    </p>
                  )}
                </div>

                {/* Quick Profile */}
                <div className="bg-white rounded-3xl border border-[#E5EAF0] p-6">

                  <h3 className="text-[15px] font-bold text-[#172033] mb-5">
                    Tutor Snapshot
                  </h3>

                  <div className="space-y-4">

                    {qualification && (
                      <div className="flex items-start gap-3">
                        <div className="text-[#0A6FF7] mt-0.5">
                          <Icon name="graduation" size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#8A95A5]">
                            Qualification
                          </p>

                          <p className="text-[12px] font-semibold text-[#344054] mt-0.5">
                            {qualification}
                          </p>
                        </div>
                      </div>
                    )}

                    {experience && (
                      <div className="flex items-start gap-3">
                        <div className="text-[#0A6FF7] mt-0.5">
                          <Icon name="briefcase" size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#8A95A5]">
                            Experience
                          </p>

                          <p className="text-[12px] font-semibold text-[#344054] mt-0.5">
                            {experience} years
                          </p>
                        </div>
                      </div>
                    )}

                    {tutor.boards?.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="text-[#0A6FF7] mt-0.5">
                          <Icon name="school" size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#8A95A5]">
                            Boards
                          </p>

                          <p className="text-[12px] font-semibold text-[#344054] mt-0.5">
                            {tutor.boards.join(' • ')}
                          </p>
                        </div>
                      </div>
                    )}

                    {modes.length > 0 && (
                      <div className="flex items-start gap-3">
                        <div className="text-[#0A6FF7] mt-0.5">
                          <Icon name="target" size={17} />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase tracking-wider font-bold text-[#8A95A5]">
                            Teaching Mode
                          </p>

                          <p className="text-[12px] font-semibold text-[#344054] mt-0.5">
                            {modes.join(' • ')}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>

                {/* CTA */}
                <div className="bg-[#0D1118] rounded-3xl p-6 text-white">

                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                    <Icon name="users" size={20} />
                  </div>

                  <h3 className="text-lg font-bold mb-2">
                    Interested in this tutor?
                  </h3>

                  <p className="text-[12px] text-white/65 leading-5 mb-6">
                    Tell us your learning requirements and
                    TutorWave can help you connect with the
                    right tutor.
                  </p>

                  <Link
                    href="/find-a-tutor"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold text-[13px] px-5 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
                  >
                    Request This Tutor
                    <Icon name="arrow" size={15} />
                  </Link>

                  <Link
                    href="/find-a-tutor"
                    className="w-full inline-flex items-center justify-center mt-3 border border-white/15 text-white font-semibold text-[12px] px-5 py-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Submit Your Requirement
                  </Link>
                </div>

                {/* Trust */}
                <div className="rounded-3xl bg-[#EAF8F5] border border-[#CDEDE6] p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#0C8F81] flex items-center justify-center flex-shrink-0">
                      <Icon name="check" size={17} />
                    </div>

                    <div>
                      <p className="text-[13px] font-bold text-[#176B62]">
                        TutorWave Verification
                      </p>

                      <p className="text-[11px] text-[#4B756F] leading-5 mt-1">
                        Verified tutor profiles are reviewed
                        by the TutorWave team before being
                        presented to parents.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="rounded-3xl bg-[#0D1118] px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#60A5FA] mb-2">
                Find the right tutor
              </p>

              <h2 className="text-xl md:text-2xl font-bold text-white">
                Looking for a tutor for your child?
              </h2>

              <p className="text-[12px] text-white/60 mt-2">
                Share your requirements and let TutorWave
                help you find suitable verified tutors.
              </p>
            </div>

            <Link
              href="/find-a-tutor"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold text-[13px] px-6 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Find a Tutor
              <Icon name="arrow" size={16} />
            </Link>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
