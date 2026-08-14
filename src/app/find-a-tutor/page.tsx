import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FindTutorHero from '@/app/find-a-tutor/components/FindTutorHero';
import TuitionForm from '@/app/find-a-tutor/components/TuitionForm';
import TrustSignals from '@/app/find-a-tutor/components/TrustSignals';
import ParentFAQ from '@/app/find-a-tutor/components/ParentFAQ';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Find a Home Tutor in Delhi NCR — TutorWave',
  description: 'Submit your tuition requirement and get matched with a verified home tutor in Delhi NCR within 24 hours. CBSE, ICSE, IIT-JEE, NEET and more.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/find-a-tutor`,
  },
  openGraph: {
    type: 'website',
    title: 'Find a Home Tutor in Delhi NCR — TutorWave',
    description: 'Submit your tuition requirement and get matched with a verified home tutor in Delhi NCR within 24 hours.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/find-a-tutor`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Find a Home Tutor',
      },
    ],
  },
};

export default function FindATutorPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <FindTutorHero />
      <TuitionForm />
      <TrustSignals />
      <ParentFAQ />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}