import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { resources } from '@/lib/data/resources';

export const metadata: Metadata = {
  title: 'Resources — Parent & Student Guides | TutorWave',
  description: 'Helpful guides and articles for parents and students. Learn how to choose the right tutor, understand school boards, and build effective study habits.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/resources`,
  },
  openGraph: {
    type: 'website',
    title: 'Resources — Parent & Student Guides | TutorWave',
    description: 'Helpful guides and articles for parents and students. Learn how to choose the right tutor and build effective study habits.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/resources`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave Resources',
      },
    ],
  },
};

const categoryLabels: Record<string, string> = {
  'parent-guide': 'Parent Guide',
  'student-guide': 'Student Guide',
  'study-tips': 'Study Tips',
  'tutor-guide': 'Tutor Guide',
  'exam-prep': 'Exam Preparation',
  'educational': 'Educational',
};

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-[68px]">
        {/* Hero */}
        <section className="bg-[#F8FAFC] border-b border-[#E5E7EB] py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0D1118] font-medium">Resources</span>
            </nav>
            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">Learning Resources</span>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0D1118] mb-4" style={{ letterSpacing: '-0.02em' }}>
                Guides & Resources
              </h1>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Practical guides for parents and students. From choosing the right tutor to building effective study habits.
              </p>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resources/${resource.slug}`}
                  className="group bg-white rounded-2xl border border-[#E5E7EB] p-6 hover:border-[#0A6FF7] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#0A6FF7] bg-[#EBF4FF] px-2.5 py-1 rounded-full">
                      {categoryLabels[resource.category] || resource.category}
                    </span>
                    <span className="text-xs text-[#6B7280]">{resource.readTime}</span>
                  </div>
                  <h2 className="font-bold text-[#0D1118] text-base mb-3 group-hover:text-[#0A6FF7] transition-colors leading-snug">
                    {resource.title}
                  </h2>
                  <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">{resource.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-[#6B7280]">
                    <span>{resource.author}</span>
                    <span className="text-[#0A6FF7] font-semibold group-hover:underline">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-[#F8FAFC]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <h2 className="text-2xl font-bold text-[#0D1118] mb-3" style={{ letterSpacing: '-0.02em' }}>
              Ready to find a tutor?
            </h2>
            <p className="text-[#6B7280] mb-8">
              Share your child&apos;s learning requirement and we&apos;ll help identify suitable tutor options.
            </p>
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors"
            >
              Find a Tutor
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
