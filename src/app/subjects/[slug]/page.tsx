import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { subjects } from '@/lib/data/subjects';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const subject = subjects.find((s) => s.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!subject) {
    return {
      title: 'Subject Not Found | TutorWave',
      description: 'The subject you are looking for does not exist.',
    };
  }

  return {
    title: subject.seoTitle,
    description: subject.seoDescription,
    alternates: {
      canonical: `${baseUrl}/subjects/${subject.slug}`,
    },
    openGraph: {
      type: 'website',
      title: subject.seoTitle,
      description: subject.seoDescription,
      url: `${baseUrl}/subjects/${subject.slug}`,
      images: [
        {
          url: '/assets/images/app_logo.png',
          width: 1200,
          height: 630,
          alt: subject.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return subjects.map((subject) => ({
    slug: subject.slug,
  }));
}

export default function SubjectDetailPage({ params }: { params: { slug: string } }) {
  const subject = subjects.find((s) => s.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!subject) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">Subject Not Found</h1>
          <p className="text-[#6B7280] mb-8">The subject you are looking for does not exist.</p>
          <Link href="/subjects" className="text-[#0A6FF7] font-semibold hover:underline">
            Back to Subjects
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

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
                      name: 'Subjects',
                      item: `${baseUrl}/subjects`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: subject.name,
                      item: `${baseUrl}/subjects/${subject.slug}`,
                    },
                  ],
                }),
              }}
            />
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/subjects" className="hover:text-[#0A6FF7] transition-colors">
              Subjects
            </Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">{subject.name}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              Subject
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1118] mb-4 leading-tight">
              {subject.icon} {subject.name}
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl">{subject.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0D1118] mb-4">About {subject.name}</h2>
              <p className="text-[#6B7280] leading-relaxed mb-8">{subject.description}</p>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Classes Covered</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {subject.classes.map((cls) => (
                  <span key={cls} className="px-3 py-1.5 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-lg">
                    {cls}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Boards Supported</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {subject.boards.map((board) => (
                  <span key={board} className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] text-sm font-semibold rounded-lg">
                    {board}
                  </span>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {subject.faqs.map((faq, i) => (
                  <div key={i} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-4">
                    <h4 className="font-semibold text-[#0D1118] mb-2">{faq.question}</h4>
                    <p className="text-sm text-[#6B7280]">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">
                <h3 className="text-lg font-bold text-[#0D1118] mb-4">Find a {subject.name} Tutor</h3>
                <p className="text-sm text-[#6B7280] mb-6">Connect with verified {subject.name} tutors in Delhi NCR for personalized learning.</p>
                <Link
                  href="/find-a-tutor"
                  className="block w-full text-center bg-[#0A6FF7] text-white font-bold py-3 rounded-xl hover:bg-[#0858c8] transition-colors"
                >
                  Find a Tutor
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
