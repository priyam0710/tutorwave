'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

/*
 * TutorWave Reviews Page
 *
 * IMPORTANT:
 * These testimonials are currently draft/sample content.
 * Replace them with verified customer feedback before presenting
 * them as verified testimonials or Google reviews.
 */

const parentTestimonials = [
  {
    id: 'p1',
    quote:
      'We were looking for a Maths tutor for our daughter in Class 10 CBSE. TutorWave matched us with someone who understood her learning pace. The process was smooth and the tutor has been consistent.',
    name: 'Parent, Noida',
    subject: 'Mathematics',
    classLevel: 'Class 10 CBSE',
    mode: 'Home Tuition',
  },
  {
    id: 'p2',
    quote:
      'Our son needed focused preparation for his Class 12 boards in Physics and Chemistry. TutorWave helped us find a qualified tutor within a few days. Very happy with the support.',
    name: 'Parent, South Delhi',
    subject: 'Physics & Chemistry',
    classLevel: 'Class 12',
    mode: 'Home Tuition',
  },
  {
    id: 'p3',
    quote:
      'Finding a reliable tutor for primary classes can be difficult. TutorWave made it straightforward. The tutor they suggested has been patient and our child looks forward to the sessions.',
    name: 'Parent, Gurugram',
    subject: 'English & Hindi',
    classLevel: 'Class 5',
    mode: 'Online',
  },
  {
    id: 'p4',
    quote:
      'We needed a tutor who could handle both Science and Maths for our Class 8 child. TutorWave understood our requirement and the match has worked out well.',
    name: 'Parent, Ghaziabad',
    subject: 'Science & Mathematics',
    classLevel: 'Class 8',
    mode: 'Home Tuition',
  },
];

const studentTestimonials = [
  {
    id: 's1',
    quote:
      'I was struggling with Organic Chemistry before my board exams. The tutor I found through TutorWave explained concepts in a way that finally made sense to me.',
    name: 'Student, Class 12',
    subject: 'Chemistry',
    classLevel: 'Class 12 CBSE',
    mode: 'Online',
  },
  {
    id: 's2',
    quote:
      'I needed help with Mathematics for my competitive exam preparation. The sessions were structured and the tutor was always well-prepared.',
    name: 'Student, Delhi',
    subject: 'Mathematics',
    classLevel: 'JEE Preparation',
    mode: 'Home Tuition',
  },
  {
    id: 's3',
    quote:
      'Online sessions through TutorWave were convenient and effective. I could schedule sessions around my school timetable without any hassle.',
    name: 'Student, Noida',
    subject: 'Physics',
    classLevel: 'Class 11',
    mode: 'Online',
  },
];

const tutorStories = [
  {
    id: 't1',
    quote:
      'TutorWave connected me with families in my area who were genuinely looking for a committed tutor. The platform made it easy to communicate my availability and subjects.',
    name: 'Tutor, Mathematics & Science',
    location: 'Dwarka, Delhi',
    experience: '4 years',
    subjects: 'Mathematics, Physics',
  },
  {
    id: 't2',
    quote:
      'I joined TutorWave to find home tuition opportunities near me. The enquiries I received were relevant to my subject expertise and the families were serious about learning.',
    name: 'Tutor, English & Hindi',
    location: 'Noida Sector 18',
    experience: '6 years',
    subjects: 'English, Hindi',
  },
  {
    id: 't3',
    quote:
      'As a tutor specialising in NEET and board preparation, TutorWave helped me reach students who needed focused coaching. The process of listing my profile was simple.',
    name: 'Tutor, Biology & Chemistry',
    location: 'Gurugram',
    experience: '5 years',
    subjects: 'Biology, Chemistry',
  },
];

/* -------------------------------------------------------------
   QUOTE ICON
------------------------------------------------------------- */

function QuoteIcon() {
  return (
    <svg
      width="28"
      height="20"
      viewBox="0 0 28 20"
      fill="none"
      className="text-[#0A6FF7]/15 flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M0 20V12.667C0 5.667 4.444 1.333 13.333 0l1.334 2.667C10.222 3.778 7.778 6 7.111 9.333H12V20H0zm16 0V12.667C16 5.667 20.444 1.333 29.333 0l1.334 2.667C26.222 3.778 23.778 6 23.111 9.333H28V20H16z"
        fill="currentColor"
      />
    </svg>
  );
}

/* -------------------------------------------------------------
   PARENT REVIEW CARD
------------------------------------------------------------- */

interface ParentCardProps {
  quote: string;
  name: string;
  subject: string;
  classLevel: string;
  mode: string;
  accent?: boolean;
}

function ParentCard({
  quote,
  name,
  subject,
  classLevel,
  mode,
  accent = false,
}: ParentCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col gap-4 h-full transition-shadow hover:shadow-md ${
        accent
          ? 'bg-[#0A6FF7] border-[#0858C8] text-white'
          : 'bg-white border-[#E5E7EB]'
      }`}
    >
      <QuoteIcon />

      <p
        className={`text-sm leading-relaxed flex-1 ${
          accent ? 'text-white/90' : 'text-[#374151]'
        }`}
      >
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex flex-wrap gap-2">
        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
            accent
              ? 'bg-white/20 text-white'
              : 'bg-[#EBF4FF] text-[#0A6FF7]'
          }`}
        >
          {subject}
        </span>

        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
            accent
              ? 'bg-white/20 text-white'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}
        >
          {classLevel}
        </span>

        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
            accent
              ? 'bg-white/20 text-white'
              : 'bg-[#F3F4F6] text-[#6B7280]'
          }`}
        >
          {mode}
        </span>
      </div>

      <div
        className={`pt-4 border-t ${
          accent ? 'border-white/20' : 'border-[#E5E7EB]'
        }`}
      >
        <p
          className={`text-xs font-semibold ${
            accent ? 'text-white/80' : 'text-[#6B7280]'
          }`}
        >
          — {name}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   TUTOR STORY CARD
------------------------------------------------------------- */

interface TutorStoryCardProps {
  quote: string;
  name: string;
  location: string;
  experience: string;
  subjects: string;
}

function TutorStoryCard({
  quote,
  name,
  location,
  experience,
  subjects,
}: TutorStoryCardProps) {
  return (
    <div className="bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-4 h-full hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#0D1118] flex items-center justify-center flex-shrink-0">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div>
          <p className="text-xs font-bold text-[#0D1118]">{name}</p>
          <p className="text-[10px] text-[#6B7280]">{location}</p>
        </div>
      </div>

      <QuoteIcon />

      <p className="text-sm text-[#374151] leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      <div className="flex flex-wrap gap-2">
        <span className="text-[10px] font-semibold bg-[#0C8F81]/10 text-[#0C8F81] px-2.5 py-1 rounded-full">
          {subjects}
        </span>

        <span className="text-[10px] font-semibold bg-[#F3F4F6] text-[#6B7280] px-2.5 py-1 rounded-full">
          {experience} experience
        </span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   PAGE
------------------------------------------------------------- */

export default function ReviewsPage() {
  return (
    <>
      <Header />

      <main className="pt-16 md:pt-[68px] bg-white">

        {/* HERO */}
        <section className="bg-[#F8FAFC] border-b border-[#E5E7EB] py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            <nav
              className="flex items-center gap-2 text-sm text-[#6B7280] mb-8"
              aria-label="Breadcrumb"
            >
              <Link
                href="/"
                className="hover:text-[#0A6FF7] transition-colors"
              >
                Home
              </Link>

              <span>/</span>

              <span className="text-[#0D1118] font-medium">
                Reviews
              </span>
            </nav>

            <div className="max-w-2xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
                Parent &amp; Student Experiences
              </span>

              <h1
                className="font-bold text-[#0D1118] mb-5 leading-tight"
                style={{
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Experiences with TutorWave
              </h1>

              <p className="text-[#6B7280] text-lg leading-relaxed max-w-xl">
                Explore feedback and experiences from parents, students and
                tutors around home and online tuition.
              </p>
            </div>
          </div>
        </section>

        {/* PARENTS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            <div className="mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
                Parents
              </span>

              <h2
                className="font-bold text-[#0D1118] leading-tight"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                What Parents Say
              </h2>

              <p className="text-[#6B7280] mt-2 max-w-lg">
                Feedback around finding suitable tutors for different classes,
                subjects and learning requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

              <ParentCard
                {...parentTestimonials[0]}
                accent={true}
              />

              <ParentCard
                {...parentTestimonials[1]}
              />

              <ParentCard
                {...parentTestimonials[2]}
              />

              <div className="lg:col-span-3 md:col-span-2">
                <div className="max-w-lg">
                  <ParentCard
                    {...parentTestimonials[3]}
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* STUDENTS */}
        <section className="py-16 md:py-24 bg-[#F8FAFC] border-y border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            <div className="mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
                Students
              </span>

              <h2
                className="font-bold text-[#0D1118] leading-tight"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                Student Experiences
              </h2>

              <p className="text-[#6B7280] mt-2 max-w-lg">
                Experiences covering school subjects, board preparation and
                competitive exam support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              {studentTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`bg-white rounded-2xl border border-[#E5E7EB] p-6 flex flex-col gap-4 hover:shadow-md transition-shadow ${
                    index === 1 ? 'md:mt-6' : ''
                  }`}
                >
                  <QuoteIcon />

                  <p className="text-sm text-[#374151] leading-relaxed flex-1">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-semibold bg-[#EBF4FF] text-[#0A6FF7] px-2.5 py-1 rounded-full">
                      {testimonial.subject}
                    </span>

                    <span className="text-[10px] font-semibold bg-[#F3F4F6] text-[#6B7280] px-2.5 py-1 rounded-full">
                      {testimonial.classLevel}
                    </span>

                    <span className="text-[10px] font-semibold bg-[#F3F4F6] text-[#6B7280] px-2.5 py-1 rounded-full">
                      {testimonial.mode}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <p className="text-xs font-semibold text-[#6B7280]">
                      — {testimonial.name}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* TUTORS */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            <div className="mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0C8F81] mb-3">
                Tutors
              </span>

              <h2
                className="font-bold text-[#0D1118] leading-tight"
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  letterSpacing: '-0.025em',
                }}
              >
                Tutor Experiences
              </h2>

              <p className="text-[#6B7280] mt-2 max-w-lg">
                Experiences from educators connecting with families and
                students across Delhi NCR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tutorStories.map((story) => (
                <TutorStoryCard
                  key={story.id}
                  {...story}
                />
              ))}
            </div>

            {/* TUTOR CTA */}
            <div className="mt-10 bg-[#0D1118] rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-2">
                  For Tutors
                </p>

                <h3
                  className="text-xl font-bold text-white leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Great teachers deserve great opportunities.
                </h3>

                <p className="text-[#9CA3AF] text-sm mt-2 max-w-md">
                  Join TutorWave and connect with families looking for
                  qualified tutors across Delhi NCR.
                </p>
              </div>

              <Link
                href="/become-a-tutor"
                className="inline-flex items-center gap-2 bg-white text-[#0D1118] font-bold px-6 py-3 rounded-xl hover:bg-[#F8FAFC] transition-colors flex-shrink-0 text-sm"
              >
                Become a Tutor

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>

            </div>
          </div>
        </section>

        {/* SHARE YOUR STORY */}
        <section className="py-12 md:py-16 bg-[#F8FAFC] border-t border-[#E5E7EB]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              Your Experience
            </span>

            <h2
              className="font-bold text-[#0D1118] mb-4"
              style={{
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Have you used TutorWave?
            </h2>

            <p className="text-[#6B7280] mb-8 max-w-md mx-auto leading-relaxed">
              We would love to hear about your experience. Share your feedback
              and help other families understand the TutorWave experience.
            </p>

            <a
              href="https://g.page/r/CfHuPfj4_Z9-EAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#E5E7EB] bg-white text-[#0D1118] font-semibold px-6 py-3 rounded-xl hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-colors text-sm"
            >
              Share Your Story

              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </a>

          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 md:py-20 bg-[#0A6FF7]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

            <h2
              className="font-bold text-white mb-4 leading-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                letterSpacing: '-0.025em',
              }}
            >
              Ready to find the right tutor?
            </h2>

            <p className="text-white/80 mb-8 text-lg">
              Find suitable home and online tutors for your learning
              requirements across Delhi NCR.
            </p>

            <Link
              href="/find-a-tutor"
              className="inline-flex items-center gap-2 bg-white text-[#0A6FF7] font-bold px-8 py-4 rounded-xl hover:bg-[#F8FAFC] transition-colors text-base"
            >
              Find a Tutor

              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
