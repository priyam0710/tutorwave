import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors } from '@/lib/data/tutors';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tutor = tutors.find((t) => t.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!tutor) {
    return {
      title: 'Tutor Not Found | TutorWave',
      description: 'The tutor profile you are looking for does not exist.',
    };
  }

  const title = `${tutor.name} — ${tutor.subjects.join(', ')} Tutor in ${tutor.locations[0]} | TutorWave`;
  const description = `${tutor.name} is a verified ${tutor.subjects.join(', ')} tutor in ${tutor.locations[0]} with ${tutor.experience} years of experience. Rating: ${tutor.rating}/5 from ${tutor.reviewCount} reviews.`;

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

export default function TutorDetailPage({ params }: { params: { slug: string } }) {
  const tutor = tutors.find((t) => t.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!tutor) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">Tutor Not Found</h1>
          <p className="text-[#6B7280] mb-8">The tutor profile you are looking for does not exist.</p>
          <Link href="/tutors" className="text-[#0A6FF7] font-semibold hover:underline">
            Back to Tutors
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const modes: string[] = [];
  if (tutor.teachingMode.includes('home') || tutor.teachingMode.includes('both')) modes.push('Home');
  if (tutor.teachingMode.includes('online') || tutor.teachingMode.includes('both')) modes.push('Online');

  return (
    <main className="bg-white min-h-screen">
      <Header />
      <section className="pt-20 pb-12 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-8" aria-label="Breadcrumb">
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
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/tutors" className="hover:text-[#0A6FF7] transition-colors">
              Tutors
            </Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">{tutor.name}</span>
          </nav>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 bg-[#F8FAFC] border border-[#E5E7EB]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tutor.photo} alt={tutor.photoAlt} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-[#0D1118]">{tutor.name}</h1>
                    {tutor.verified && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2.5 py-1 rounded-full">
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <circle cx="6" cy="6" r="6" fill="#0C8F81" />
                          <path d="M3.5 6l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {tutor.experience} years experience
                    </span>
                    <span className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {tutor.locations[0]}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {modes.map((m) => (
                      <span key={m} className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                        m === 'Home' ? 'bg-[#FFF8E6] text-[#B07A00]' : 'bg-[#EBF4FF] text-[#0A6FF7]'
                      }`}>
                        {m === 'Home' ? (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                          </svg>
                        ) : (
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                          </svg>
                        )}
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#0D1118] mb-4">About</h2>
                <p className="text-[#6B7280] leading-relaxed">{tutor.bio}</p>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((s) => (
                    <span key={s} className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">Classes</h3>
                <p className="text-[#6B7280]">{tutor.classes.join(', ')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0D1118] mb-4">Availability</h3>
                <p className="text-[#6B7280]">{tutor.availability}</p>
              </div>
            </div>
            <div className="md:col-span-1">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-[#0A6FF7]">{tutor.rating}</span>
                    <span className="text-sm text-[#6B7280]">/5</span>
                  </div>
                  <p className="text-xs text-[#6B7280]">{tutor.reviewCount} reviews</p>
                </div>
                <button className="w-full bg-[#0A6FF7] text-white font-bold py-3 rounded-xl hover:bg-[#0858c8] transition-colors mb-3">
                  Request Tutor
                </button>
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
