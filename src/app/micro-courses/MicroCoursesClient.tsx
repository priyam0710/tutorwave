'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { courses, CourseCategory } from '@/lib/data/courses';

const CATEGORIES: { label: string; value: CourseCategory | 'All' }[] = [
  { label: 'All Courses', value: 'All' },
  { label: 'School', value: 'School' },
  { label: 'Competitive Exams', value: 'Competitive Exams' },
  { label: 'Skills', value: 'Skills' },
  { label: 'Technology', value: 'Technology' },
  { label: 'Teacher Development', value: 'Teacher Development' },
];

const LEVEL_COLORS: Record<string, string> = {
  beginner: 'text-[#0C8F81] bg-[#E6F7F5]',
  intermediate: 'text-[#0A6FF7] bg-[#EBF4FF]',
  advanced: 'text-[#D6041A] bg-[#FEE8EA]',
};

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function MicroCoursesClient() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory | 'All'>('All');

  const filtered = activeCategory === 'All' ? courses : courses.filter((c) => c.category === activeCategory);

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-[68px]">

        {/* ── HERO ── */}
        <section className="bg-white border-b border-[#E5E7EB] py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <nav className="flex items-center gap-2 text-sm text-[#6B7280] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#0D1118] font-medium">Micro Courses</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
                TutorWave Learning Platform
              </span>
              <h1
                className="text-4xl md:text-5xl font-extrabold text-[#0D1118] mb-3 leading-tight"
                style={{ letterSpacing: '-0.03em' }}
              >
                Micro Courses
              </h1>
              <p
                className="text-xl md:text-2xl font-semibold text-[#0A6FF7] mb-5"
                style={{ letterSpacing: '-0.01em' }}
              >
                Short. Focused. Effective.
              </p>
              <p className="text-[#6B7280] text-lg leading-relaxed max-w-2xl">
                Learn practical concepts and skills through focused courses designed for students, learners and educators.
              </p>
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTERS ── */}
        <section className="bg-[#F8FAFC] border-b border-[#E5E7EB] py-5 sticky top-16 md:top-[68px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.value;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`whitespace-nowrap text-sm font-semibold px-4 py-2 rounded-full border transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#0A6FF7] text-white border-[#0A6FF7] shadow-sm'
                        : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── COURSE GRID ── */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            {/* Result count */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-[#6B7280]">
                <span className="font-semibold text-[#0D1118]">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'course' : 'courses'} available
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#6B7280] text-lg">No courses in this category yet.</p>
                <button
                  onClick={() => setActiveCategory('All')}
                  className="mt-4 text-sm font-semibold text-[#0A6FF7] hover:underline"
                >
                  View all courses
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:border-[#0A6FF7]/40 hover:shadow-[0_4px_24px_rgba(10,111,247,0.10)] transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-video overflow-hidden bg-[#F8FAFC] relative flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={course.thumbnail}
                        alt={course.thumbnailAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category pill overlay */}
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase tracking-wide text-white bg-[#0D1118]/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Level badge */}
                      <span className={`self-start text-[11px] font-semibold capitalize px-2.5 py-0.5 rounded-full mb-3 ${LEVEL_COLORS[course.level]}`}>
                        {course.level}
                      </span>

                      {/* Title */}
                      <h3 className="font-bold text-[#0D1118] text-[15px] leading-snug mb-2 group-hover:text-[#0A6FF7] transition-colors">
                        {course.title}
                      </h3>

                      {/* Instructor */}
                      <div className="flex items-center gap-1.5 text-xs text-[#6B7280] mb-4">
                        <UserIcon />
                        <span>{course.instructor}</span>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-4 text-xs text-[#6B7280] mb-5">
                        <span className="flex items-center gap-1.5">
                          <ClockIcon />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BookIcon />
                          {course.moduleCount} modules
                        </span>
                      </div>

                      {/* Spacer */}
                      <div className="flex-1" />

                      {/* Price + CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
                        <div>
                          {course.price === null ? (
                            <span className="text-sm font-bold text-[#0C8F81]">Free</span>
                          ) : (
                            <span className="text-sm font-bold text-[#0D1118]">
                              ₹{course.price.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        <Link
                          href={`/micro-courses/${course.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:text-[#0858c8] transition-colors"
                        >
                          View Course
                          <ArrowRightIcon />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="py-14 md:py-20 bg-[#0D1118]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4BC2FD] mb-4">
              Personalised Learning
            </span>
            <h2
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              Prefer one-to-one learning?
            </h2>
            <p className="text-white/60 text-base mb-8 leading-relaxed">
              Connect with a verified TutorWave tutor for personalised home or online sessions tailored to your child&apos;s needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl hover:bg-[#0858c8] transition-colors text-sm"
              >
                Find a Tutor
                <ArrowRightIcon />
              </Link>
              <Link
                href="/tutors"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/20"
              >
                Browse Tutors
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
