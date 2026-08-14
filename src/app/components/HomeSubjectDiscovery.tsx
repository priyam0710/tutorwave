import React from 'react';
import Link from 'next/link';

const subjects = [
  { label: 'Mathematics', slug: 'maths' },
  { label: 'Science', slug: 'science' },
  { label: 'Physics', slug: 'physics' },
  { label: 'Chemistry', slug: 'chemistry' },
  { label: 'Biology', slug: 'biology' },
  { label: 'English', slug: 'english' },
  { label: 'Hindi', slug: 'hindi' },
  { label: 'Computer Science', slug: 'computer' },
  { label: 'Social Science', slug: 'social' },
  { label: 'Commerce', slug: 'accounts' },
];

export default function HomeSubjectDiscovery() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
            Subjects
          </span>
          <h2
            className="font-sans font-bold text-[#0D1118] leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}
          >
            Find Tutors by Subject
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {subjects?.map((subject) => (
            <Link
              key={subject?.slug}
              href={`/subjects/${subject?.slug}`}
              className="inline-flex items-center gap-2 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-5 py-2.5 text-sm font-medium text-[#0D1118] hover:border-[#BFDBFE] hover:bg-[#EBF4FF] hover:text-[#0A6FF7] transition-all duration-200"
            >
              {subject?.label}
            </Link>
          ))}
          <Link
            href="/subjects"
            className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#0858c8] transition-all duration-200"
          >
            All Subjects
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
