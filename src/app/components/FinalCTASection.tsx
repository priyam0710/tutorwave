'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function FinalCTASection() {
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
      { threshold: 0.2 }
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
    <section className="py-20 md:py-28 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <div ref={contentRef}>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-6">
            Get Started
          </span>
          <h2
            className="font-sans font-bold text-[#0D1118] mb-5 leading-tight"
            style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
          >
            Ready to find the right tutor?
          </h2>
          <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us what your child needs and take the first step toward personalized learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-[#0858c8] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
            >
              Find a Tutor
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/become-a-tutor"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0A6FF7] font-semibold px-8 py-4 rounded-xl text-base border border-[#0A6FF7] hover:bg-[#EBF4FF] transition-all duration-300 min-h-[52px]"
            >
              Become a Tutor
            </Link>
          </div>
          <p className="text-xs text-[#9CA3AF] mt-6">
            Free matching service · Delhi NCR
          </p>
        </div>
      </div>
    </section>
  );
}