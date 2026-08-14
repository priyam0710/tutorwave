import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';
import { locations } from '@/lib/data/locations';

export const metadata: Metadata = {
  title: 'Home Tutor Locations in Delhi NCR — TutorWave',
  description:
    'TutorWave provides verified home tutors across Delhi NCR — Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad. Find a tutor near you.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/locations`,
  },
  openGraph: {
    type: 'website',
    title: 'Home Tutor Locations in Delhi NCR — TutorWave',
    description:
      'TutorWave provides verified home tutors across Delhi NCR — Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/locations`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave Locations',
      },
    ],
  },
};

const locationMeta: Record<string, { tagline: string; highlight: string }> = {
  delhi: { tagline: 'South Delhi, Dwarka, Rohini & more', highlight: 'Largest coverage area' },
  noida: { tagline: 'Sectors 18, 50, 62, 76, 100 & more', highlight: 'Growing tutor network' },
  'greater-noida': { tagline: 'Greater Noida West, Knowledge Park & more', highlight: 'Expanding coverage' },
  ghaziabad: { tagline: 'Indirapuram, Vaishali, Raj Nagar & more', highlight: 'Active tutor network' },
  gurugram: { tagline: 'DLF, Sohna Road, Golf Course Road & more', highlight: 'Premium locations' },
  faridabad: { tagline: 'Sector 15, 21, NIT Faridabad & more', highlight: 'Home tuition available' },
};

export default function LocationsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-14 bg-[#F8FAFC] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">Locations</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">DELHI NCR</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-4 leading-tight" style={{ letterSpacing: '-0.025em' }}>
              Home tutors across Delhi NCR
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              TutorWave has a growing tutor network across Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad. Find a verified tutor near your home.
            </p>
          </div>
        </div>
      </section>

      {/* Location cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {locations.map((location) => {
              const meta = locationMeta[location.slug] ?? { tagline: location.areas.slice(0, 2).join(', '), highlight: '' };
              return (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="group bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#0A6FF7] hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-[#EBF4FF] rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    {meta.highlight && (
                      <span className="text-xs font-semibold text-[#0A6FF7] bg-[#EBF4FF] px-2.5 py-1 rounded-full">
                        {meta.highlight}
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-[#0D1118] group-hover:text-[#0A6FF7] transition-colors mb-1">
                    {location.name}
                  </h2>
                  <p className="text-sm text-[#6B7280] mb-4">{meta.tagline}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {location.areas.slice(0, 4).map((area) => (
                      <span key={area} className="text-xs px-2.5 py-1 bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] rounded-full">
                        {area}
                      </span>
                    ))}
                    {location.areas.length > 4 && (
                      <span className="text-xs px-2.5 py-1 bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] rounded-full">
                        +{location.areas.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#0A6FF7] group-hover:gap-2 transition-all">
                    Find tutors in {location.name}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage note */}
      <section className="py-10 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <p className="text-[#6B7280] text-sm leading-relaxed">
            Don&apos;t see your area listed? Submit your tuition requirement and mention your location. Our team will work to find suitable tutor options near you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0D1118]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            Find a tutor near you
          </h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Share your location and requirement. TutorWave will help identify suitable tutor options in your area.
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
