import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { courses } from '@/lib/data/courses';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = courses.find((c) => c.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!course) {
    return {
      title: 'Course Not Found | TutorWave',
      description: 'The course you are looking for does not exist.',
    };
  }

  return {
    title: course.seoTitle,
    description: course.seoDescription,
    alternates: {
      canonical: `${baseUrl}/micro-courses/${course.slug}`,
    },
    openGraph: {
      type: 'website',
      title: course.seoTitle,
      description: course.seoDescription,
      url: `${baseUrl}/micro-courses/${course.slug}`,
      images: [
        {
          url: course.thumbnail,
          width: 1200,
          height: 630,
          alt: course.thumbnailAlt,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!course) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">Course Not Found</h1>
          <p className="text-[#6B7280] mb-8">The course you are looking for does not exist.</p>
          <Link href="/micro-courses" className="text-[#0A6FF7] font-semibold hover:underline">
            Back to Courses
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
                      name: 'Micro Courses',
                      item: `${baseUrl}/micro-courses`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: course.title,
                      item: `${baseUrl}/micro-courses/${course.slug}`,
                    },
                  ],
                }),
              }}
            />
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/micro-courses" className="hover:text-[#0A6FF7] transition-colors">
              Micro Courses
            </Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">{course.title}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              {course.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1118] mb-4 leading-tight">
              {course.title}
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl">{course.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-video rounded-2xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB] mb-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={course.thumbnail} alt={course.thumbnailAlt} className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold text-[#0D1118] mb-4">About This Course</h2>
              <p className="text-[#6B7280] leading-relaxed mb-6">{course.description}</p>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">What You'll Learn</h3>
              <ul className="space-y-2 mb-8">
                {course.whatYoullLearn?.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#6B7280]">
                    <span className="text-[#0A6FF7] font-bold mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Course Modules</h3>
              <div className="space-y-3">
                {course.modules.map((module, i) => (
                  <div key={i} className="border border-[#E5E7EB] rounded-xl p-4">
                    <h4 className="font-semibold text-[#0D1118] mb-1">{module.title}</h4>
                    <p className="text-sm text-[#6B7280] mb-2">{module.description}</p>
                    <span className="text-xs text-[#6B7280]">{module.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">
                <h3 className="text-lg font-bold text-[#0D1118] mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] uppercase mb-1">Instructor</p>
                    <p className="text-sm font-semibold text-[#0D1118]">{course.instructor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] uppercase mb-1">Duration</p>
                    <p className="text-sm font-semibold text-[#0D1118]">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] uppercase mb-1">Modules</p>
                    <p className="text-sm font-semibold text-[#0D1118]">{course.moduleCount} modules</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#6B7280] uppercase mb-1">Level</p>
                    <p className="text-sm font-semibold text-[#0D1118] capitalize">{course.level}</p>
                  </div>
                  <div className="pt-4 border-t border-[#E5E7EB]">
                    {course.price === null ? (
                      <p className="text-lg font-bold text-[#0C8F81]">Free</p>
                    ) : (
                      <p className="text-lg font-bold text-[#0D1118]">₹{course.price.toLocaleString('en-IN')}</p>
                    )}
                  </div>
                  <button className="w-full bg-[#0A6FF7] text-white font-bold py-3 rounded-xl hover:bg-[#0858c8] transition-colors mt-4">
                    Enroll Now
                  </button>
                </div>
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
