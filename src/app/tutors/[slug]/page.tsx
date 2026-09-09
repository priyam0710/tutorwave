import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors } from '@/lib/data/tutors';

function findTutorBySlug(rawSlug: string) {
  const normalized = decodeURIComponent(rawSlug).trim().toLowerCase();

  return tutors.find(
    (tutor) => tutor.slug.trim().toLowerCase() === normalized
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const tutor = findTutorBySlug(params.slug);
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description:
        'The tutor profile you are looking for does not exist.',
    };
  }

  const title = `${tutor.name} — ${tutor.subjects.join(
    ', '
  )} Tutor in ${tutor.locations[0]} | TutorWave`;

  const description = `${tutor.name} is a ${tutor.subjects.join(
    ', '
  )} tutor in ${tutor.locations[0]} with ${
    tutor.experience
  }+ years of experience. Rating: ${tutor.rating}/5 from ${
    tutor.reviewCount
  } reviews.`;

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
      images: [
        {
          url: tutor.photo,
          width: 1200,
          height: 630,
          alt: tutor.photoAlt,
        },
      ],
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

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />

        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">
            Tutor Not Found
          </h1>

          <p className="text-[#6B7280] mb-8">
            The tutor profile you are looking for does not exist.
          </p>

          <Link
            href="/tutors"
            className="text-[#0A6FF7] font-semibold hover:underline"
          >
            Back to Tutors
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  const modes: string[] = [];

  if (
    tutor.teachingMode.includes('home') ||
    tutor.teachingMode.includes('both')
  ) {
    modes.push('Home');
  }

  if (
    tutor.teachingMode.includes('online') ||
    tutor.teachingMode.includes('both')
  ) {
    modes.push('Online');
  }

  return (
    <main className="bg-white min-h-screen">
      <Header />

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

            <span className="text-[#0D1118] font-medium">
              {tutor.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Main profile */}
            <div className="md:col-span-2">

              {/* Tutor header */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F8FAFC] border border-[#E5E7EB]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={tutor.photo}
                    alt={tutor.photoAlt}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-[#0D1118]">
                      {tutor.name}
                    </h1>

                    {tutor.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2.5 py-1 rounded-full">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
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

                  <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-[#6B7280]">

                    {/* Experience */}
                    <span className="flex items-center gap-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                        />

                        <polyline points="12 6 12 12 16 14" />
                      </svg>

                      {tutor.experience}+ years experience
                    </span>

                    {/* Location */}
                    <span className="flex items-center gap-1.5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        aria-hidden="true"
                      >
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0Z" />
                        <circle
                          cx="12"
                          cy="10"
                          r="3"
                        />
                      </svg>

                      {tutor.locations[0]}
                    </span>
                  </div>

                  {/* Teaching modes */}
                  <div className="flex gap-2 flex-wrap">
                    {modes.map((mode) => (
                      <span
                        key={mode}
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          mode === 'Home'
                            ? 'bg-[#FFF8E6] text-[#B07A00]'
                            : 'bg-[#EBF4FF] text-[#0A6FF7]'
                        }`}
                      >
                        {mode === 'Home' ? (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
                          >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            aria-hidden="true"
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

                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Qualifications */}
              <div className="mb-8 bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <h2 className="text-xl font-bold text-[#0D1118] mb-4">
                  Qualifications
                </h2>

                <div className="flex flex-wrap gap-2">
                  {tutor.qualifications?.length ? (
                    tutor.qualifications.map((qualification) => (
                      <span
                        key={qualification}
                        className="px-3 py-2 bg-[#F3F7FF] text-[#1F3B64] text-sm font-medium rounded-lg"
                      >
                        {qualification}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-[#6B7280]">
                      Qualification details available on request.
                    </p>
                  )}
                </div>
              </div>

              {/* About */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0D1118] mb-4">
                  About
                </h2>

                <p className="text-[#6B7280] leading-relaxed">
                  {tutor.bio}
                </p>
              </div>

              {/* Subjects */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                  Subjects
                </h3>

                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-lg"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classes */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                  Classes
                </h3>

                <p className="text-[#6B7280]">
                  {tutor.classes.join(', ')}
                </p>
              </div>

              {/* Availability */}
              <div>
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">
                  Availability
                </h3>

                <p className="text-[#6B7280]">
                  {tutor.availability}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#0A6FF7]">
                      {tutor.rating}
                    </span>

                    <span className="text-sm text-[#6B7280]">
                      /5
                    </span>
                  </div>

                  <p className="text-xs text-[#6B7280]">
                    {tutor.reviewCount} reviews
                  </p>
                </div>

                <Link
                  href={`/find-a-tutor?tutor=${tutor.slug}`}
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
