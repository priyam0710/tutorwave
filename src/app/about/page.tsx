import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About TutorWave — Delhi NCR Home Tuition Platform',
  description:
    'Learn about TutorWave, founded by Priyanshu Singh, an IIT Patna graduate and Harvard-certified professional, with a vision to make quality education more accessible through technology and personalized tutoring.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
  },
  openGraph: {
    type: 'website',
    title: 'About TutorWave — Delhi NCR Home Tuition Platform',
    description:
      'Discover the story, mission and vision behind TutorWave and its founder Priyanshu Singh.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/about`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'About TutorWave',
      },
    ],
  },
};

const values = [
  {
    title: 'Trust',
    description:
      'We review tutor information before connecting them with parents, helping create a credible and reliable tutoring experience.',
    color: '#0A6FF7',
  },
  {
    title: 'Personalization',
    description:
      'Every student learns differently. We consider class, subject, location, schedule and learning requirements when identifying suitable tutor options.',
    color: '#0C8F81',
  },
  {
    title: 'Accessibility',
    description:
      'Quality education should be accessible to more students and families. We support both home and online learning to make tutoring more convenient.',
    color: '#F8AD03',
  },
  {
    title: 'Innovation',
    description:
      'We believe technology can simplify education and improve how students, parents and tutors connect with each other.',
    color: '#4BC2FD',
  },
];

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              ABOUT TUTORWAVE
            </p>

            <h1
              className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-6"
              style={{ letterSpacing: '-0.025em' }}
            >
              Making quality education more accessible through better tutoring
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed mb-5">
              TutorWave is a home tuition platform built to make finding
              suitable academic support simpler, more transparent and more
              accessible for students and families across Delhi NCR.
            </p>

            <p className="text-lg text-[#6B7280] leading-relaxed">
              We connect parents with verified and suitable tutors for
              personalized home and online tuition, covering students from
              Nursery to Class 12 as well as learners preparing for
              competitive examinations.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Founder Introduction */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
                MEET THE FOUNDER
              </p>

              <h2
                className="text-3xl sm:text-4xl font-bold text-[#0D1118] mb-5"
                style={{ letterSpacing: '-0.02em' }}
              >
                Built with a belief that education can be better connected
              </h2>

              <p className="text-[#6B7280] leading-relaxed mb-5">
                TutorWave was founded by{' '}
                <strong className="text-[#0D1118]">
                  Priyanshu Singh
                </strong>,
                an education entrepreneur and technology-focused professional
                with an academic background from{' '}
                <strong className="text-[#0D1118]">IIT Patna</strong> and
                certification from{' '}
                <strong className="text-[#0D1118]">
                  Harvard University
                </strong>
                .
              </p>

              <p className="text-[#6B7280] leading-relaxed mb-5">
                His interest lies at the intersection of{' '}
                <strong className="text-[#0D1118]">
                  education, technology and innovation
                </strong>
                . Through TutorWave, the goal is to use technology and a
                personalized approach to address a simple but important
                problem: helping families find suitable learning support
                without making the process unnecessarily complicated.
              </p>

              <p className="text-[#6B7280] leading-relaxed">
                The vision behind TutorWave is not simply to build another
                tuition service, but to create an accessible and technology-led
                education platform where students can find the right guidance,
                tutors can discover genuine teaching opportunities, and
                families can make more informed choices about their child's
                learning.
              </p>
            </div>

            {/* Founder Credentials Card */}
            <div className="bg-[#F8FAFC] rounded-3xl p-8 sm:p-10 border border-[#E5E7EB]">
              <p className="text-sm font-semibold text-[#0A6FF7] uppercase tracking-wider mb-6">
                Founder
              </p>

              <h3 className="text-3xl font-bold text-[#0D1118] mb-2">
                Priyanshu Singh
              </h3>

              <p className="text-[#6B7280] mb-8">
                Founder, TutorWave
              </p>

              <div className="space-y-5">
                <div className="pb-5 border-b border-[#E5E7EB]">
                  <p className="text-sm text-[#6B7280] mb-1">
                    Academic Background
                  </p>
                  <p className="text-lg font-bold text-[#0D1118]">
                    IIT Patna
                  </p>
                </div>

                <div className="pb-5 border-b border-[#E5E7EB]">
                  <p className="text-sm text-[#6B7280] mb-1">
                    Professional Certification
                  </p>
                  <p className="text-lg font-bold text-[#0D1118]">
                    Harvard University
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#6B7280] mb-1">
                    Areas of Focus
                  </p>
                  <p className="text-lg font-bold text-[#0D1118]">
                    Education · Technology · Innovation
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
                OUR MISSION
              </p>

              <h2
                className="text-3xl font-bold text-[#0D1118] mb-6"
                style={{ letterSpacing: '-0.02em' }}
              >
                Making quality tutoring accessible across Delhi NCR
              </h2>

              <p className="text-[#6B7280] leading-relaxed mb-4">
                TutorWave was built around a real problem: parents often spend
                considerable time searching for suitable tutors, while
                qualified tutors can struggle to find genuine teaching
                opportunities.
              </p>

              <p className="text-[#6B7280] leading-relaxed mb-4">
                We created a platform that simplifies this process. Parents
                share their tuition requirement, and TutorWave works to
                identify suitable tutor options based on their academic,
                location and scheduling needs.
              </p>

              <p className="text-[#6B7280] leading-relaxed">
                Our long-term mission is to make personalized learning more
                accessible by combining human teaching with thoughtful use of
                technology.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-[#E5E7EB]">
              <p className="text-sm font-semibold text-[#0A6FF7] italic mb-4">
                Our tagline
              </p>

              <p
                className="text-3xl font-bold text-[#0D1118] leading-tight"
                style={{ letterSpacing: '-0.02em' }}
              >
                &ldquo;Ride the Wave with Smart Learning&rdquo;
              </p>

              <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#6B7280]">
                  Serving students from
                </p>

                <p className="text-lg font-bold text-[#0D1118] mt-1">
                  Nursery to Class 12 &amp; Competitive Exams
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                <p className="text-sm text-[#6B7280]">
                  Our Service Area
                </p>

                <p className="text-lg font-bold text-[#0D1118] mt-1">
                  Delhi NCR, India
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Innovation & Accessibility */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              OUR APPROACH
            </p>

            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0D1118] mb-5"
              style={{ letterSpacing: '-0.02em' }}
            >
              Where education meets innovation
            </h2>

            <p className="text-[#6B7280] leading-relaxed text-lg">
              We believe technology should make education simpler, not more
              complicated. TutorWave is being built with a focus on
              accessibility, personalization and efficient connections between
              parents and tutors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#EBF4FF] rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0A6FF7"
                  strokeWidth="2"
                >
                  <path d="M12 2v20M2 12h20" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#0D1118] mb-3">
                Accessibility
              </h3>

              <p className="text-[#6B7280] leading-relaxed">
                We want quality academic support to be easier for families to
                discover, access and arrange according to their needs.
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-3xl p-8 border border-[#E5E7EB]">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#0C8F81"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#0D1118] mb-3">
                Personalization
              </h3>

              <p className="text-[#6B7280] leading-relaxed">
                Students have different learning requirements. Our approach
                focuses on finding tutor options around the individual student.
              </p>
            </div>

            <div className="bg-[#0D1118] rounded-3xl p-8">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4BC2FD"
                  strokeWidth="2"
                >
                  <path d="M12 3v18M3 12h18" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Innovation
              </h3>

              <p className="text-white/60 leading-relaxed">
                We are continuously exploring how technology can improve the
                way students, parents and tutors discover and connect with
                each other.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              OUR VALUES
            </p>

            <h2
              className="text-3xl font-bold text-[#0D1118]"
              style={{ letterSpacing: '-0.02em' }}
            >
              What we stand for
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border border-[#E5E7EB] rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
                  style={{
                    backgroundColor: `${value.color}15`,
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: value.color,
                    }}
                  />
                </div>

                <h3 className="font-bold text-[#0D1118] mb-2">
                  {value.title}
                </h3>

                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="bg-[#EBF4FF] rounded-3xl p-8">
              <h3
                className="text-2xl font-bold text-[#0D1118] mb-4"
                style={{ letterSpacing: '-0.015em' }}
              >
                Find the right tutor for your child
              </h3>

              <p className="text-[#6B7280] leading-relaxed mb-6">
                Whether your child needs help with school subjects, board
                examination preparation or competitive examinations, TutorWave
                helps you find suitable tutor options.
              </p>

              <Link
                href="/find-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors text-sm"
              >
                Find a Tutor

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="bg-[#0D1118] rounded-3xl p-8">
              <h3
                className="text-2xl font-bold text-white mb-4"
                style={{ letterSpacing: '-0.015em' }}
              >
                Discover genuine tuition opportunities
              </h3>

              <p className="text-white/60 leading-relaxed mb-6">
                Join TutorWave and connect with parents looking for tutors in
                your subjects, location and availability. Teach on your own
                terms.
              </p>

              <Link
                href="/become-a-tutor"
                className="inline-flex items-center gap-2 bg-white text-[#0A6FF7] font-bold px-6 py-3 rounded-xl hover:bg-[#EBF4FF] transition-colors text-sm"
              >
                Become a Tutor

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
