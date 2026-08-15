import React from 'react';
import Link from 'next/link';

const benefits = [
  'Relevant tuition opportunities matched to your subjects',
  'Flexible schedule — home and online options',
  'Grow your profile and teaching career',
  'Dedicated support from the TutorWave team',
];

export default function HomeTutorRecruitment() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#0D1118' }}>
      {/* Subtle glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,111,247,0.1) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(75,194,253,0.06) 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4BC2FD] mb-5">
              For Tutors
            </span>
            <h2
              className="font-sans font-bold text-white mb-5 leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Great Teachers Deserve Great Opportunities.
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-lg">
              Join TutorWave and discover tuition opportunities that match your subjects, experience, location and availability.
            </p>

            <div className="space-y-3 mb-10">
              {benefits?.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0A6FF7]/20 border border-[#0A6FF7]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4BC2FD" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 font-medium leading-snug">{b}</span>
                </div>
              ))}
            </div>

            <Link
              href="/become-a-tutor"
              className="inline-flex items-center gap-2 bg-white text-[#0D1118] font-bold px-8 py-3.5 rounded-xl text-sm hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Become a Tutor
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right — Stats */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: '500+', label: 'Verified Tutors', sub: 'across Delhi NCR' },
              { value: '1,200+', label: 'Students Matched', sub: 'since 2025' },
              { value: '4.9/5', label: 'Average Rating', sub: 'from parent reviews' },
              { value: '24 hrs', label: 'Match Guarantee', sub: 'or we escalate personally' },
            ]?.map((stat) => (
              <div
                key={stat?.label}
                className="rounded-2xl p-6 border border-white/10 bg-white/5"
              >
                <div className="font-sans text-3xl font-bold text-[#4BC2FD] mb-1">{stat?.value}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{stat?.label}</div>
                <div className="text-xs text-white/40">{stat?.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
