import React from 'react';
import Link from 'next/link';

export default function FindTutorHero() {
  return (
    <section className="pt-20 pb-6 md:pt-24 md:pb-8 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0D1118] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">Find a Tutor</span>
          </nav>
          {/* Eyebrow */}
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
            Find a Tutor
          </span>
          {/* Headline */}
          <h1 className="font-sans font-bold text-[#0D1118] mb-3 leading-tight" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.025em' }}>
            Tell Us What Your Child Needs
          </h1>
          {/* Supporting copy */}
          <p className="text-base text-[#6B7280] leading-relaxed max-w-xl">
            Share a few details about your child&apos;s learning requirements and we&apos;ll help identify suitable tutor options.
          </p>
        </div>
      </div>
    </section>
  );
}