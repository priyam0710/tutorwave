'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function HomeHeroSection() {
  return (
    <section className="relative bg-white pt-16 overflow-hidden">
      {/* Subtle background tint on right */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 80% 90% at 90% 50%, rgba(75,194,253,0.08) 0%, rgba(10,111,247,0.04) 55%, transparent 100%)'
        }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-bold uppercase tracking-widest border"
            style={{ background: '#EBF4FF', color: '#0A6FF7', borderColor: '#BFDBFE' }}>
              Personalized Learning &bull; Delhi NCR
            </div>

            {/* Headline */}
            <h1
              className="font-sans font-extrabold text-[#0D1118] leading-[1.06] mb-5"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', letterSpacing: '-0.03em' }}>
              
              Find the Right Tutor
              <br />
              for Your Child.
            </h1>

            {/* Supporting text */}
            <p className="text-base md:text-lg text-[#6B7280] leading-relaxed mb-9 max-w-[500px]">
              Connect with suitable tutors for home and online learning based on your child&apos;s class, subject, location and schedule.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-9">
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-8 py-3.5 rounded-xl text-base hover:bg-[#0858c8] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[52px]">
                
                Find a Tutor
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0D1118] font-semibold px-8 py-3.5 rounded-xl text-base border border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-all duration-200 min-h-[52px]">
                
                Become a Tutor
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {[
              { label: 'Verified Tutors' },
              { label: 'Home & Online Learning' },
              { label: 'Classes NUR–12 & MORE' },
              { label: 'Delhi NCR' }]?.
              map((item) =>
              <div key={item?.label} className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0C8F81" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium text-[#374151]">{item?.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Premium image */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[460px]">
              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/4.6' }}>
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_1b2a9e395-1765662897711.png"
                  alt="Indian tutor helping a student with personalised home learning in Delhi NCR"
                  width={460}
                  height={530}
                  className="w-full h-full object-cover"
                  priority />
                
                {/* Subtle bottom gradient */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-28"
                  style={{ background: 'linear-gradient(to top, rgba(13,17,24,0.4) 0%, transparent 100%)' }} />
                
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0C8F81]" />
                    <span className="text-xs font-semibold text-white">Professional Home Tutoring · Delhi NCR</span>
                  </div>
                </div>
              </div>

              {/* Floating card — Maths */}
              <div className="absolute -right-4 top-10 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#EBF4FF', color: '#0A6FF7' }}>
                    ∑
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">Maths</div>
                    <div className="text-[10px] text-[#6B7280]">Classes NUR–12 & more</div>
                  </div>
                </div>
              </div>

              {/* Floating card — Physics */}
              <div className="absolute -right-6 top-[44%] bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#E6F7F5', color: '#0C8F81' }}>
                    ⚛
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">Physics</div>
                    <div className="text-[10px] text-[#6B7280]">JEE / NEET</div>
                  </div>
                </div>
              </div>

              {/* Floating card — Home & Online */}
              <div className="absolute -right-4 bottom-20 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: '#FFF8E6', color: '#F8AD03' }}>
                    ⌂
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">Home & Online</div>
                    <div className="text-[10px] text-[#6B7280]">Flexible Learning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>);

}
