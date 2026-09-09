'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const quickLinks = [
  {
    label: 'Find a Tutor',
    href: '/find-a-tutor',
    description: 'Share your requirement and get matched within 24 hours.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    label: 'Browse Tutors',
    href: '/tutors',
    description: 'Explore verified tutor profiles across Delhi NCR.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Subjects',
    href: '/subjects',
    description: 'From Mathematics to Sanskrit — find a tutor by subject.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
  },
  {
    label: 'Locations',
    href: '/locations',
    description: 'See where TutorWave has a tutor network near you.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function NotFound() {
  const handleGoBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <main className="bg-white min-h-screen">
      <Header />

      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <span
            className="block font-sans font-extrabold leading-none mb-4 select-none"
            style={{
              fontSize: 'clamp(4.5rem, 14vw, 8rem)',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #0A6FF7 0%, #4BC2FD 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </span>

          <h1
            className="text-3xl sm:text-4xl font-bold text-[#0D1118] mb-4 leading-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            We couldn&apos;t find that page
          </h1>

          <p className="text-lg text-[#6B7280] leading-relaxed mb-10 max-w-xl mx-auto">
            The page you&apos;re looking for may have moved or no longer exists.
            Let&apos;s get you back to finding the right tutor.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Back to Home
            </Link>

            <button
              type="button"
              onClick={handleGoBack}
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0D1118] font-semibold px-7 py-3.5 rounded-xl text-sm border border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-all duration-200 min-h-[52px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-6 text-center">
            Or try one of these
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-5 hover:border-[#0A6FF7] hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="w-11 h-11 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A6FF7] group-hover:text-white transition-colors duration-200">
                  {link.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#0D1118] group-hover:text-[#0A6FF7] transition-colors mb-1">
                    {link.label}
                  </h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
