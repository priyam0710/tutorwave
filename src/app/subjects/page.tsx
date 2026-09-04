import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';
import { subjects } from '@/lib/data/subjects';

export const metadata: Metadata = {
  title: 'Subjects — Find a Tutor by Subject | TutorWave Delhi NCR',
  description:
    'Browse tutors by subject across Delhi NCR. Mathematics, Science, Physics, Chemistry, Biology, English, Hindi, Social Science, Computer Science, Commerce and Economics.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/subjects`,
  },
  openGraph: {
    type: 'website',
    title: 'Subjects — Find a Tutor by Subject | TutorWave',
    description:
      'Browse tutors by subject across Delhi NCR. Mathematics, Science, Physics, Chemistry, Biology, English, Hindi and more.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/subjects`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave Subjects',
      },
    ],
  },
};

const categoryOrder = [
  { key: 'core', label: 'Core School Subjects' },
  { key: 'language', label: 'Languages' },
  { key: 'senior-secondary', label: 'Senior Secondary (Class 11–12)' },
  { key: 'commerce', label: 'Commerce' },
];

export default function SubjectsPage() {
  const grouped = categoryOrder?.map((cat) => ({
    ...cat,
    items: subjects?.filter((s) => s?.category === cat?.key),
  }))?.filter((g) => g?.items?.length > 0);

  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* Hero */}
      <section className="pt-28 pb-14 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">Subjects</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">SUBJECT DISCOVERY</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-4 leading-tight" style={{ letterSpacing: '-0.025em' }}>
              Find tutors by subject
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              TutorWave connects students with verified tutors across core school subjects, languages, senior secondary and competitive exam preparation — for home and online learning across Delhi NCR.
            </p>
          </div>
        </div>
      </section>
      {/* Boards strip */}
      <section className="py-5 border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-[#6B7280]">Boards covered:</span>
            {['CBSE', 'ICSE', 'IB','NIOS', 'State Board']?.map((board) => (
              <span key={board} className="px-3 py-1 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-full">
                {board}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* Subject groups */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-16">
            {grouped?.map((group) => (
              <div key={group?.key}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1 h-6 rounded-full bg-[#0A6FF7]" />
                  <h2 className="text-xl font-bold text-[#0D1118]" style={{ letterSpacing: '-0.015em' }}>
                    {group?.label}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group?.items?.map((subject) => (
                    <Link
                      key={subject?.slug}
                      href={`/subjects/${subject?.slug}`}
                      className="group bg-white border border-[#E5E7EB] rounded-2xl p-5 hover:border-[#0A6FF7] hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-2xl flex-shrink-0">{subject?.icon}</span>
                        <div className="min-w-0">
                          <p className="font-bold text-[#0D1118] group-hover:text-[#0A6FF7] transition-colors leading-tight">
                            {subject?.name}
                          </p>
                          <p className="text-xs text-[#6B7280] mt-0.5">{subject?.classes?.join(', ')}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2">{subject?.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#0A6FF7] group-hover:gap-2 transition-all">
                        Find tutors
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-20 bg-[#0D1118]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Don&apos;t see your subject?
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Submit your tuition requirement and our team will work to find suitable tutor options for your specific needs.
          </p>
          <Link
            href="/find-a-tutor"
            className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0858c8] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Find a Tutor
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
