import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About TutorWave — Delhi NCR\'s Most Trusted Home Tuition Platform',
  description: 'Learn about TutorWave — our mission, values and how we connect parents with suitable home tutors across Delhi NCR.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
  openGraph: {
    type: 'website',
    title: 'About TutorWave — Delhi NCR\'s Trusted Home Tuition Platform',
    description: 'Learn about TutorWave — our mission, values and how we connect parents with suitable home tutors.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'About TutorWave',
      },
    ],
  },
};

const values = [
  {
    title: 'Trust',
    description: 'We review tutor information before connecting them with parents, ensuring a credible and reliable experience.',
    color: '#0A6FF7',
  },
  {
    title: 'Personalization',
    description: 'Every child learns differently. We consider class, subject, location, schedule and learning preferences when matching.',
    color: '#0C8F81',
  },
  {
    title: 'Accessibility',
    description: 'Quality tutoring should be accessible. We support both home and online learning to fit every family\'s needs.',
    color: '#F8AD03',
  },
  {
    title: 'Growth',
    description: 'We are committed to the long-term academic growth of every student we serve, from Nursery to Class 12 and beyond.',
    color: '#4BC2FD',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">ABOUT TUTORWAVE</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-4" style={{ letterSpacing: '-0.025em' }}>
              Delhi NCR&apos;s trusted home tuition platform
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              TutorWave connects parents and students with suitable home tutors across Delhi NCR. Our mission is to make quality personalized learning accessible to every family.
            </p>
          </div>
        </div>
      </section>
      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">OUR MISSION</p>
              <h2 className="text-3xl font-bold text-[#0D1118] mb-6" style={{ letterSpacing: '-0.02em' }}>
                Making quality tutoring accessible across Delhi NCR
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                TutorWave was built to solve a real problem: parents spend significant time and effort searching for the right tutor, while qualified tutors struggle to find genuine teaching opportunities.
              </p>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                We created a platform that simplifies this process — parents share their requirement once, and TutorWave works to identify suitable tutor options based on their specific needs.
              </p>
            </div>
            <div className="bg-[#F8FAFC] rounded-3xl p-10 border border-[#E5E7EB]">
              <p className="text-sm font-semibold text-[#0A6FF7] italic mb-4">Our tagline</p>
              <p className="text-3xl font-bold text-[#0D1118] leading-tight" style={{ letterSpacing: '-0.02em' }}>
                &ldquo;Ride the Wave with Smart Learning&rdquo;
              </p>
              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#6B7280]">Serving students from</p>
                <p className="text-lg font-bold text-[#0D1118] mt-1">Nursery to Class 12 &amp; Competitive Exams</p>
              </div>
              <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#6B7280]">Our Service Area</p>
                <p className="text-lg font-bold text-[#0D1118] mt-1">Delhi NCR, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Values */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">OUR VALUES</p>
            <h2 className="text-3xl font-bold text-[#0D1118]" style={{ letterSpacing: '-0.02em' }}>
              What we stand for
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values?.map((value) => (
              <div key={value?.title} className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-shadow duration-300">
                <div
                  className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${value?.color}15` }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: value?.color }} />
                </div>
                <h3 className="font-bold text-[#0D1118] mb-2">{value?.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{value?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Who We Serve */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-[#EBF4FF] rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-[#0D1118] mb-4" style={{ letterSpacing: '-0.015em' }}>
                Find the right tutor for your child
              </h3>
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Whether your child needs help with school subjects, board exam preparation, or competitive exam coaching, TutorWave helps you find suitable tutor options.
              </p>
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors text-sm"
              >
                Find a Tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="bg-[#0D1118] rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4" style={{ letterSpacing: '-0.015em' }}>
                Discover genuine tuition opportunities
              </h3>
              <p className="text-white/60 leading-relaxed mb-6">
                Join TutorWave and connect with parents looking for tutors in your subjects, location and availability. Teach on your own terms.
              </p>
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center gap-2 bg-white text-[#0A6FF7] font-bold px-6 py-3 rounded-xl hover:bg-[#EBF4FF] transition-colors text-sm"
              >
                Become a Tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
