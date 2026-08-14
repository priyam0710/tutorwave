import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { locations } from '@/lib/data/locations';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const location = locations.find((l) => l.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!location) {
    return {
      title: 'Location Not Found | TutorWave',
      description: 'The location you are looking for does not exist.',
    };
  }

  return {
    title: location.seoTitle,
    description: location.seoDescription,
    alternates: {
      canonical: `${baseUrl}/locations/${location.slug}`,
    },
    openGraph: {
      type: 'website',
      title: location.seoTitle,
      description: location.seoDescription,
      url: `${baseUrl}/locations/${location.slug}`,
      images: [
        {
          url: '/assets/images/app_logo.png',
          width: 1200,
          height: 630,
          alt: location.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return locations.map((location) => ({
    slug: location.slug,
  }));
}

export default function LocationDetailPage({ params }: { params: { slug: string } }) {
  const location = locations.find((l) => l.slug === params.slug);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  if (!location) {
    return (
      <main className="bg-white min-h-screen">
        <Header />
        <section className="py-20 text-center">
          <h1 className="text-3xl font-bold text-[#0D1118] mb-4">Location Not Found</h1>
          <p className="text-[#6B7280] mb-8">The location you are looking for does not exist.</p>
          <Link href="/locations" className="text-[#0A6FF7] font-semibold hover:underline">
            Back to Locations
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
                      name: 'Locations',
                      item: `${baseUrl}/locations`,
                    },
                    {
                      '@type': 'ListItem',
                      position: 3,
                      name: location.name,
                      item: `${baseUrl}/locations/${location.slug}`,
                    },
                  ],
                }),
              }}
            />
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-[#0A6FF7] transition-colors">
              Locations
            </Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">{location.name}</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              Location
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D1118] mb-4 leading-tight">
              Home Tutors in {location.name}
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-2xl">{location.description}</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-[#0D1118] mb-4">About {location.name}</h2>
              <p className="text-[#6B7280] leading-relaxed mb-8">{location.description}</p>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Areas Covered</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {location.areas.map((area) => (
                  <div key={area} className="px-4 py-2 bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] text-sm font-medium rounded-lg">
                    {area}
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-bold text-[#0D1118] mb-4">Why Choose TutorWave in {location.name}</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[#6B7280]">
                  <span className="text-[#0A6FF7] font-bold mt-1">✓</span>
                  <span>Verified tutors with proven teaching experience</span>
                </li>
                <li className="flex items-start gap-3 text-[#6B7280]">
                  <span className="text-[#0A6FF7] font-bold mt-1">✓</span>
                  <span>Personalized matching based on your child's needs</span>
                </li>
                <li className="flex items-start gap-3 text-[#6B7280]">
                  <span className="text-[#0A6FF7] font-bold mt-1">✓</span>
                  <span>Home and online learning options available</span>
                </li>
                <li className="flex items-start gap-3 text-[#6B7280]">
                  <span className="text-[#0A6FF7] font-bold mt-1">✓</span>
                  <span>Support for all boards and competitive exams</span>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 sticky top-20">
                <h3 className="text-lg font-bold text-[#0D1118] mb-4">Find a Tutor in {location.name}</h3>
                <p className="text-sm text-[#6B7280] mb-6">Connect with verified tutors in {location.name} for personalized learning.</p>
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
