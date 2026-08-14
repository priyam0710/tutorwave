import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import HomeFooter from '@/components/HomeFooter';
import HomeHeroSection from '@/app/components/HomeHeroSection';
import HomeTutorSearch from '@/app/components/HomeTutorSearch';
import HomeTrustSection from '@/app/components/HomeTrustSection';
import HomeFeaturedTutors from '@/app/components/HomeFeaturedTutors';
import HomeSubjectDiscovery from '@/app/components/HomeSubjectDiscovery';
import HomeMicroCourses from '@/app/components/HomeMicroCourses';
import HomeTestimonials from '@/app/components/HomeTestimonials';
import HomeDelhiNCR from '@/app/components/HomeDelhiNCR';
import HomeTutorRecruitment from '@/app/components/HomeTutorRecruitment';
import HomeFinalCTA from '@/app/components/HomeFinalCTA';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Find Verified Home & Online Tutors | TutorWave Delhi NCR',
  description: 'Connect with verified home tutors in Delhi NCR for CBSE, ICSE, IIT-JEE, NEET. Personalized learning for Class 1–12. Home and online classes available.',
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  openGraph: {
    type: 'website',
    title: 'Find Verified Home & Online Tutors | TutorWave',
    description: 'Connect with verified home tutors in Delhi NCR for CBSE, ICSE, IIT-JEE, NEET. Personalized learning for Class 1–12.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave — Verified Home Tutors in Delhi NCR',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      <HomeHeroSection />
      <HomeTutorSearch />
      <HomeTrustSection />
      <HomeFeaturedTutors />
      <HomeSubjectDiscovery />
      <HomeMicroCourses />
      <HomeTestimonials />
      <HomeDelhiNCR />
      <HomeTutorRecruitment />
      <HomeFinalCTA />
      <HomeFooter />
      <WhatsAppButton />
    </main>
  );
}