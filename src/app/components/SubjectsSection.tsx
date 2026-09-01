'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const subjects = [
  { id: 'maths', title: 'Mathematics', classes: 'Class 1 – 12', symbol: '∑' },
  { id: 'science', title: 'Science', classes: 'Class 1 – 10', symbol: '⚗' },
  { id: 'english', title: 'English', classes: 'All Classes', symbol: 'A' },
  { id: 'hindi', title: 'Hindi', classes: 'Class 1 – 12', symbol: 'क' },
  { id: 'physics', title: 'Physics', classes: 'Class 11 – 12', symbol: '⚛' },
  { id: 'chemistry', title: 'Chemistry', classes: 'Class 11 – 12', symbol: '⚗' },
  { id: 'biology', title: 'Biology', classes: 'Class 11 – 12', symbol: '🧬' },
  { id: 'computer', title: 'Computer Science', classes: 'Class 6 – 12', symbol: '{ }' },
  { id: 'social', title: 'Social Science', classes: 'Class 6 – 10', symbol: '🌏' },
  { id: 'accounts', title: 'Accountancy', classes: 'Class 11 – 12', symbol: '₹' },
  { id: 'jee', title: 'IIT-JEE Prep', classes: 'Class 11 – 12', symbol: '🎯' },
  { id: 'neet', title: 'NEET Prep', classes: 'Class 11 – 12', symbol: '🔬' },
];

export default function SubjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0';
      sectionRef.current.style.transform = 'translateY(20px)';
      sectionRef.current.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="subjects" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12" ref={sectionRef}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Subjects</span>
            <h2
              className="font-sans font-bold text-[#0D1118] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              One platform. Multiple learning needs.
            </h2>
          </div>
          <p className="text-sm text-[#6B7280] max-w-xs leading-relaxed">
            CBSE · ICSE · IB · State Board. Nursery to Class 12, competitive exams and college.
          </p>
        </div>

        {/* Subject chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center gap-2.5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-2.5 hover:border-[#BFDBFE] hover:bg-[#EBF4FF] hover:text-[#0A6FF7] transition-all duration-200 cursor-pointer group"
            >
              <span className="text-sm font-medium text-[#0D1118] group-hover:text-[#0A6FF7] transition-colors">{subject.title}</span>
              <span className="text-xs text-[#9CA3AF] group-hover:text-[#0A6FF7]/60 transition-colors">{subject.classes}</span>
            </div>
          ))}

          {/* More subjects chip */}
          <Link
            href="/find-a-tutor"
            className="flex items-center gap-2 bg-[#0A6FF7] text-white rounded-xl px-4 py-2.5 hover:bg-[#0858c8] transition-all duration-200"
          >
            <span className="text-sm font-semibold">+ More subjects</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Bottom CTA */}
        <p className="text-sm text-[#6B7280]">
          Don&apos;t see your subject?{' '}
          <Link href="/find-a-tutor" className="text-[#0A6FF7] font-semibold hover:underline">
            Tell us what you need →
          </Link>
        </p>
      </div>
    </section>
  );
}
