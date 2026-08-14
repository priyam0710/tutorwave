import type { Metadata } from 'next';
import MicroCoursesClient from './MicroCoursesClient';

export const metadata: Metadata = {
  title: 'Micro Courses — Short & Focused Learning | TutorWave',
  description: 'Explore focused micro-courses for school students, competitive exam prep, and skill development. Learn practical concepts in short modules.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/micro-courses`,
  },
  openGraph: {
    type: 'website',
    title: 'Micro Courses — Short & Focused Learning',
    description: 'Explore focused micro-courses for school students, competitive exam prep, and skill development.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/micro-courses`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave Micro Courses',
      },
    ],
  },
};

export default function MicroCoursesPage() {
  return <MicroCoursesClient />;
}
