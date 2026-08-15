import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact TutorWave — Delhi NCR Home Tuition',
  description: 'Get in touch with TutorWave. Submit a tuition enquiry, register as a tutor, or contact us for any questions about home tutoring in Delhi NCR.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
  },
  openGraph: {
    type: 'website',
    title: 'Contact TutorWave — Delhi NCR Home Tuition',
    description: 'Get in touch with TutorWave. Submit a tuition enquiry, register as a tutor, or contact us for questions.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/contact`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact TutorWave',
      },
    ],
  },
};

const contactOptions = [
  {
    title: 'Find a Tutor',
    description: 'Submit your tuition requirement and our team will help you find suitable tutor options.',
    cta: 'Submit Requirement',
    href: '/find-a-tutor',
    color: '#0A6FF7',
    bg: '#EBF4FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Become a Tutor',
    description: 'Register as a tutor and discover genuine tuition opportunities in Delhi NCR.',
    cta: 'Register Now',
    href: '/become-a-tutor',
    color: '#0C8F81',
    bg: '#F0FDF9',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">CONTACT</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-4" style={{ letterSpacing: '-0.025em' }}>
              Get in touch
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Whether you&apos;re looking for a tutor or want to join TutorWave as a tutor, we&apos;re here to help.
            </p>
          </div>
        </div>
      </section>
      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contactOptions?.map((option) => (
              <div
                key={option?.title}
                className="border border-[#E5E7EB] rounded-2xl p-8 hover:shadow-md transition-shadow duration-300"
                style={{ backgroundColor: option?.bg }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${option?.color}20`, color: option?.color }}
                >
                  {option?.icon}
                </div>
                <h2 className="text-xl font-bold text-[#0D1118] mb-2" style={{ letterSpacing: '-0.015em' }}>
                  {option?.title}
                </h2>
                <p className="text-[#6B7280] mb-6 leading-relaxed">{option?.description}</p>
                <Link
                  href={option?.href}
                  className="inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all duration-200 text-sm text-white hover:opacity-90"
                  style={{ backgroundColor: option?.color }}
                >
                  {option?.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* General Contact Info */}
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0D1118] mb-6" style={{ letterSpacing: '-0.015em' }}>
              Other ways to reach us
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4 p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3>
  <a
    href="https://wa.me/918588879239"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[#0A6FF7] transition-colors"
  >
    WhatsApp
  </a>
</h3>
                  <p className="text-[#6B7280] text-sm">Send us a message on WhatsApp for quick enquiries.</p>
  <h3>
  <a
    href="mailto:your-email@example.com"
    className="hover:text-[#0A6FF7] transition-colors"
  >
  </a>
</h3>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#0D1118] text-sm mb-0.5">Email</p>
                  <p className="text-[#6B7280] text-sm">Reach out to us by email for detailed enquiries.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-[#0D1118] text-sm mb-0.5">Location</p>
                  <p className="text-[#6B7280] text-sm">Shop no.-5, Defence Enclave, Sec -44 Noida(U.P.)</p>
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
