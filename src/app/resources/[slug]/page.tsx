import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { resources } from '@/lib/data/resources';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = resources.find((r) => r.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!resource) {
    return {
      title: 'Resource Not Found | TutorWave',
      description: 'The resource you are looking for does not exist.',
    };
  }

  return {
    title: resource.seoTitle,
    description: resource.seoDescription,
    alternates: {
      canonical: `${baseUrl}/resources/${resource.slug}`,
    },
    openGraph: {
      type: 'article',
      title: resource.seoTitle,
      description: resource.seoDescription,
      url: `${baseUrl}/resources/${resource.slug}`,
      publishedTime: resource.publishedAt,
      authors: [resource.author],
      images: [
        {
          url: '/assets/images/app_logo.png',
          width: 1200,
          height: 630,
          alt: resource.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

const categoryLabels: Record<string, string> = {
  'parent-guide': 'Parent Guide',
  'student-guide': 'Student Guide',
  'study-tips': 'Study Tips',
  'tutor-guide': 'Tutor Guide',
  'exam-prep': 'Exam Preparation',
  'educational': 'Educational',
};

export default function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = resources.find((r) => r.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!resource) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">Resource Not Found</h1>
          <p className="text-[#6B7280] mb-8">The resource you are looking for does not exist.</p>
          <Link href="/resources" className="text-[#0A6FF7] font-semibold hover:underline">
            Back to Resources
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
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
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
                      name: 'Resources',
                      item: `${baseUrl}/resources`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: resource.title,
                      item: `${baseUrl}/resources/${resource.slug}`,
                    },
                  ],
                }),
              }}
            />
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/resources" className="hover:text-[#0A6FF7] transition-colors">
              Resources
            </Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">{resource.title}</span>
          </nav>
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              {categoryLabels[resource.category] || resource.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1118] mb-4 leading-tight">
              {resource.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#6B7280]">
              <span>By {resource.author}</span>
              <span>•</span>
              <span>{new Date(resource.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{resource.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          <article className="prose prose-lg max-w-none">
            <div className="text-[#6B7280] leading-relaxed whitespace-pre-wrap">{resource.content}</div>
          </article>
          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <h3 className="text-lg font-bold text-[#0D1118] mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#EBF4FF] text-[#0A6FF7] text-sm font-semibold rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-[#0D1118] mb-4">Ready to find a tutor?</h2>
          <p className="text-[#6B7280] mb-8">Share your child's learning requirement and we'll help identify suitable tutor options.</p>
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

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
