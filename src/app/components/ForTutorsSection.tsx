'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const benefits = [
  'Relevant tuition opportunities',
  'Flexible teaching schedule',
  'Home & online options',
  'Multiple subjects and locations',
  'Across Delhi NCR',
];

export default function ForTutorsSection() {
  const contentRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(24px)';
      contentRef.current.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
      observer.observe(contentRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="tutors" className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#0D1118' }}>
      {/* Subtle wave SVG background */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 200"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: '120px' }}
      >
        <path
          d="M0 100 C360 40, 720 160, 1080 80 C1260 40, 1380 100, 1440 60 L1440 200 L0 200 Z"
          fill="#0A6FF7"
        />
      </svg>
      {/* Glow accents */}
      <div
        className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(10,111,247,0.12) 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(75,194,253,0.07) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — Content */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4BC2FD] mb-5">
              For Tutors
            </span>
            <h2
              className="font-sans font-bold text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              Are you a tutor?
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-lg">
              Join TutorWave and discover tuition opportunities that match your subjects, experience, location and availability.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0A6FF7]/20 border border-[#0A6FF7]/40 flex items-center justify-center flex-shrink-0">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4BC2FD" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white/80 font-medium">{b}</span>
                </div>
              ))}
            </div>

            <Link
              href="/become-a-tutor"
              className="inline-flex items-center gap-2 bg-white text-[#0D1118] font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#F8FAFC] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              Become a Tutor
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Right — Minimal visual */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-64 h-64">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border border-[#0A6FF7]/20"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              {/* Inner glow */}
              <div
                className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{ background: 'radial-gradient(circle, rgba(10,111,247,0.15) 0%, rgba(75,194,253,0.08) 60%, transparent 100%)' }}
              >
                <div className="text-center">
                  <div
                    className="font-sans font-bold text-white leading-none mb-1"
                    style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}
                  >
                    Join
                  </div>
                  <div className="font-display italic text-[#4BC2FD] text-xl">TutorWave</div>
                </div>
              </div>
              {/* Accent dots */}
              <div className="absolute top-4 right-8 w-2.5 h-2.5 rounded-full bg-[#F8AD03] opacity-80" />
              <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-[#4BC2FD] opacity-60" />
              <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 rounded-full bg-[#0C8F81] opacity-70" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}