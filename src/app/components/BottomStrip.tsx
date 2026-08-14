'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const presenceLocations = ['Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad'];

export default function BottomStrip() {
  return (
    <section className="bg-[#EBF4FF]/40 border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">

          {/* Why TutorWave? */}
          <div className="lg:col-span-1">
            <h3 className="font-sans font-bold text-[#0D1118] text-base mb-4">Why TutorWave?</h3>
            <ul className="flex flex-col gap-2.5">
              {[
              'Verified & Experienced Tutors',
              'Personalized Matching',
              'Safe & Reliable',
              'End to End Support']?.
              map((item) =>
              <li key={item} className="flex items-start gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-[#25262A] leading-snug">{item}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Micro Courses */}
          <div className="lg:col-span-1">
            <h3 className="font-sans font-bold text-[#0D1118] text-base mb-1">Micro Courses</h3>
            <p className="text-xs font-semibold text-[#0A6FF7] mb-3">Short. Focused. Effective.</p>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
              Learn from expert tutors through our specially designed micro courses for school subjects and competitive exams.
            </p>
            <div className="flex items-center justify-center rounded-xl overflow-hidden bg-[#0D1118] aspect-video mb-4">
              <div className="flex flex-col items-center gap-2 p-4">
                <div className="w-10 h-10 rounded-full bg-[#0A6FF7] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-medium text-center">Video Micro Courses</span>
              </div>
            </div>
            <Link
              href="/micro-courses"
              className="inline-flex items-center justify-center w-full bg-[#0A6FF7] text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#0858c8] transition-colors">
              
              Explore Courses
            </Link>
          </div>

          {/* For Parents */}
          <div className="lg:col-span-1">
            <h3 className="font-sans font-bold text-[#0D1118] text-base mb-3">For Parents</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
              Easy tutor search, personalized matching and constant support to ensure your child&apos;s academic success.
            </p>
            <div className="rounded-xl overflow-hidden bg-[#F0F9FF] aspect-video flex items-center justify-center mb-4">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1f2cf8722-1766874244753.png"
                alt="Indian parent and student learning together at home"
                width={200}
                height={120}
                className="w-full h-full object-cover" />
              
            </div>
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center w-full bg-white border border-[#0A6FF7] text-[#0A6FF7] text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#EBF4FF] transition-colors">
              
              Find a Tutor
            </Link>
          </div>

          {/* For Tutors */}
          <div className="lg:col-span-1">
            <h3 className="font-sans font-bold text-[#0D1118] text-base mb-3">For Tutors</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed mb-4">
              Discover genuine teaching opportunities, grow your profile and build a long-term teaching career.
            </p>
            <div className="rounded-xl overflow-hidden bg-[#F0F9FF] aspect-video flex items-center justify-center mb-4">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_1dae7c182-1786689836185.png"
                alt="Professional tutor teaching a student at home"
                width={200}
                height={120}
                className="w-full h-full object-cover" />
              
            </div>
            <Link
              href="/become-a-tutor"
              className="inline-flex items-center justify-center w-full bg-white border border-[#0A6FF7] text-[#0A6FF7] text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-[#EBF4FF] transition-colors">
              
              Become a Tutor
            </Link>
          </div>

          {/* Our Presence */}
          <div className="lg:col-span-1">
            <h3 className="font-sans font-bold text-[#0D1118] text-base mb-4">Our Presence</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {presenceLocations?.map((loc) =>
              <Link
                key={loc}
                href={`/locations/${loc?.toLowerCase()?.replace(/\s+/g, '-')}`}
                className="text-center text-xs font-semibold text-[#0D1118] bg-white border border-[#E5E7EB] rounded-lg px-2 py-2 hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-colors">
                
                  {loc}
                </Link>
              )}
            </div>
            <p className="text-xs text-[#6B7280]">
              Expanding across{' '}
              <Link href="/locations" className="text-[#0A6FF7] font-semibold hover:underline">
                Delhi NCR
              </Link>{' '}
              and beyond.
            </p>
          </div>

        </div>
      </div>
    </section>);

}