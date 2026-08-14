import React from 'react';
import Link from 'next/link';

export default function HomeFinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#E5E7EB]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-6">
          Get Started
        </span>
        <h2
          className="font-sans font-bold text-[#0D1118] mb-5 leading-tight"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
        >
          Your child&apos;s next learning step starts here.
        </h2>
        <p className="text-base text-[#6B7280] leading-relaxed mb-10 max-w-xl mx-auto">
          Tell us what your child needs and take the first step toward personalized learning with a verified tutor.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/find-a-tutor"
            className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-9 py-4 rounded-xl text-base hover:bg-[#0858c8] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]"
          >
            Find a Tutor
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/become-a-tutor"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#0A6FF7] font-semibold px-9 py-4 rounded-xl text-base border border-[#0A6FF7] hover:bg-[#EBF4FF] transition-all duration-200 min-h-[52px]"
          >
            Become a Tutor
          </Link>
        </div>
        <p className="text-xs text-[#9CA3AF] mt-6">Free matching service · Delhi NCR</p>
      </div>
    </section>
  );
}
