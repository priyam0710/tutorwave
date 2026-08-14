'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    title: 'Share Your Requirement',
    description: 'Tell us about your child\'s learning needs — class, subject, location and schedule.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Find Suitable Tutors',
    description: 'TutorWave reviews the requirement and identifies relevant tutor options based on your needs.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Start Learning',
    description: 'Connect with a suitable tutor and begin your classes — at home or online, on your schedule.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    stepsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">How It Works</span>
          <h2
            className="font-sans font-bold text-[#0D1118] mb-4 leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em' }}
          >
            Three simple steps to find the right tutor.
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed">
            Share your requirement once and let TutorWave help with the tutor discovery process.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-[#E5E7EB] z-0" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="relative z-10 flex flex-col items-start md:items-center text-left md:text-center px-0 md:px-8 pb-10 md:pb-0"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Step number + icon */}
              <div className="flex items-center gap-4 md:flex-col md:gap-3 mb-5 md:mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center shadow-sm text-[#0A6FF7]">
                    {step.icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0A6FF7] flex items-center justify-center"
                  >
                    <span className="text-white text-[10px] font-bold">{step.number}</span>
                  </div>
                </div>
              </div>

              <h3 className="font-sans font-semibold text-base text-[#0D1118] mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-start md:justify-center">
          <Link
            href="/find-a-tutor"
            className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            Find a Tutor
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}