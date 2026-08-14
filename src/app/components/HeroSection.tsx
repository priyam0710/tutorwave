'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const floatingCards = [
{
  subject: 'Maths',
  level: 'Classes 6–12',
  icon: '∑',
  color: '#0A6FF7',
  bg: '#EBF4FF',
  position: 'top-right'
},
{
  subject: 'Physics',
  level: 'JEE / NEET',
  icon: '⚛',
  color: '#0C8F81',
  bg: '#E6F7F5',
  position: 'mid-right'
},
{
  subject: 'Home & Online',
  level: 'Flexible Learning',
  icon: '◎',
  color: '#F8AD03',
  bg: '#FFF8E6',
  position: 'bottom-right'
}];


export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [leftRef?.current, rightRef?.current];
    elements?.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = i === 0 ? 'translateY(28px)' : 'translateY(16px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 80 + i * 160);
    });
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] pt-16">
      {/* Subtle blue glow behind right visual */}
      <div
        className="absolute top-0 right-0 w-[50%] h-full pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 70% 80% at 85% 40%, rgba(75,194,253,0.13) 0%, rgba(10,111,247,0.06) 50%, transparent 100%)'
        }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}
          <div ref={leftRef}>
            {/* Eyebrow badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-xs font-bold uppercase tracking-widest"
              style={{ background: '#EBF4FF', color: '#0A6FF7', border: '1px solid #BFDBFE' }}>
              
              Delhi NCR&apos;s Trusted Tutor Network
            </div>

            {/* Headline */}
            <h1
              className="font-sans font-extrabold text-[#0D1118] mb-4 leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}>
              
              Find the Right Tutor
              <br />
              for Your Child.
            </h1>

            {/* Accent line */}
            <p
              className="font-sans font-bold mb-5"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)', color: '#0A6FF7', letterSpacing: '-0.01em' }}>
              
              Personalized Learning. Better Outcomes.
            </p>

            {/* Supporting copy */}
            <p className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-[480px]">
              Connect with verified home and online tutors for Classes 1–12, all subjects and competitive exams.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl text-base hover:bg-[#0858c8] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 min-h-[50px]">
                
                Find a Tutor
              </Link>
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0D1118] font-semibold px-7 py-3.5 rounded-xl text-base border border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-all duration-200 min-h-[50px]">
                
                Become a Tutor
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {[
              { icon: '✓', label: 'Verified Tutors' },
              { icon: '⌂', label: 'Home & Online' },
              { icon: '◈', label: 'Classes 1–12' },
              { icon: '◉', label: 'All Subjects' }]?.
              map((item) =>
              <div key={item?.label} className="flex items-center gap-1.5">
                  <span className="text-[#0C8F81] text-xs font-bold">{item?.icon}</span>
                  <span className="text-xs font-medium text-[#6B7280]">{item?.label}</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Visual composition */}
          <div ref={rightRef} className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] mx-auto">

              {/* Main image card */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-xl"
                style={{ aspectRatio: '4/4.5', maxHeight: '460px' }}>
                
                <AppImage
                  src="https://img.rocket.new/generatedImages/rocket_gen_img_122832cbc-1772559860627.png"
                  alt="Indian tutor helping a student with one-to-one home learning"
                  width={420}
                  height={460}
                  className="w-full h-full object-cover" />
                
                {/* Subtle overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24"
                  style={{ background: 'linear-gradient(to top, rgba(13,17,24,0.35) 0%, transparent 100%)' }} />
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0C8F81]" />
                    <span className="text-xs font-semibold text-white">Professional Home Tutoring · Delhi NCR</span>
                  </div>
                </div>
              </div>

              {/* Floating card 1 — Maths, top right */}
              <div
                className="absolute -right-4 top-8 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10"
                style={{ animation: 'floatCard 4s ease-in-out infinite', animationDelay: '0s' }}>
                
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: floatingCards?.[0]?.bg, color: floatingCards?.[0]?.color }}>
                    
                    {floatingCards?.[0]?.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">{floatingCards?.[0]?.subject}</div>
                    <div className="text-[10px] text-[#6B7280]">{floatingCards?.[0]?.level}</div>
                  </div>
                </div>
              </div>

              {/* Floating card 2 — Physics, mid right */}
              <div
                className="absolute -right-6 top-[45%] bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10"
                style={{ animation: 'floatCard 4.8s ease-in-out infinite', animationDelay: '0.5s' }}>
                
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: floatingCards?.[1]?.bg, color: floatingCards?.[1]?.color }}>
                    
                    {floatingCards?.[1]?.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">{floatingCards?.[1]?.subject}</div>
                    <div className="text-[10px] text-[#6B7280]">{floatingCards?.[1]?.level}</div>
                  </div>
                </div>
              </div>

              {/* Floating card 3 — Home & Online, bottom right */}
              <div
                className="absolute -right-4 bottom-16 bg-white rounded-2xl px-4 py-3 shadow-lg border border-[#E5E7EB] z-10"
                style={{ animation: 'floatCard 5.2s ease-in-out infinite', animationDelay: '1s' }}>
                
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: floatingCards?.[2]?.bg, color: floatingCards?.[2]?.color }}>
                    
                    {floatingCards?.[2]?.icon}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0D1118] leading-none mb-0.5">{floatingCards?.[2]?.subject}</div>
                    <div className="text-[10px] text-[#6B7280]">{floatingCards?.[2]?.level}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <style jsx>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </section>);

}