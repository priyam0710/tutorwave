import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const sampleCourses = [
{
  title: 'Mathematics Foundations',
  subtitle: 'Class 9 & 10 · CBSE',
  duration: '40 hours',
  level: 'Intermediate',
  thumbnail: "https://img.rocket.new/generatedImages/rocket_gen_img_17a7a1b76-1786690587036.png",
  thumbnailAlt: 'Mathematics textbook and notebook for Class 9 and 10 students',
  slug: 'mathematics-foundations-class-9-10',
  tag: 'Coming Soon'
},
{
  title: 'Physics Essentials',
  subtitle: 'Class 11 & 12 · CBSE / JEE',
  duration: '50 hours',
  level: 'Advanced',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_189a2b9f1-1774546673012.png',
  thumbnailAlt: 'Physics equations and diagrams for Class 11 and 12 students',
  slug: 'physics-essentials-class-11-12',
  tag: 'Coming Soon'
},
{
  title: 'English Communication & Writing',
  subtitle: 'Class 6–10 · All Boards',
  duration: '20 hours',
  level: 'Beginner',
  thumbnail: 'https://img.rocket.new/generatedImages/rocket_gen_img_1ca2da390-1773116692593.png',
  thumbnailAlt: 'Open book and pen on a desk for English writing course',
  slug: 'english-communication-writing',
  tag: 'Coming Soon'
}];


export default function HomeMicroCourses() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              Micro Courses
            </span>
            <h2
              className="font-sans font-bold text-[#0D1118] leading-tight"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}>
              
              Learn More. In Less Time.
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-lg">
              Short, focused learning experiences designed to help students build useful skills and strengthen their fundamentals.
            </p>
          </div>
          <Link
            href="/micro-courses"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:underline whitespace-nowrap">
            
            Explore Micro Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Course cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {sampleCourses?.map((course) =>
          <div
            key={course?.slug}
            className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#BFDBFE] hover:shadow-md transition-all duration-300 flex flex-col">
            
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-[#F8FAFC]">
                <AppImage
                src={course?.thumbnail}
                alt={course?.thumbnailAlt}
                width={400}
                height={225}
                className="w-full h-full object-cover" />
              
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FFF8E6] text-[#F8AD03] border border-[#F8AD03]/20">
                    {course?.tag}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-sans font-bold text-sm text-[#0D1118] mb-1 leading-tight">
                  {course?.title}
                </h3>
                <p className="text-xs text-[#6B7280] mb-3">{course?.subtitle}</p>
                <div className="flex items-center gap-3 text-xs text-[#9CA3AF] mb-4">
                  <span>{course?.duration}</span>
                  <span>·</span>
                  <span>{course?.level}</span>
                </div>
                <div className="mt-auto">
                  <Link
                  href={`/micro-courses/${course?.slug}`}
                  className="block w-full text-center text-xs font-bold text-[#0A6FF7] border border-[#0A6FF7] rounded-xl py-2.5 hover:bg-[#EBF4FF] transition-colors">
                  
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/micro-courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A6FF7] border border-[#0A6FF7] px-7 py-3 rounded-xl hover:bg-[#EBF4FF] transition-colors">
            
            Explore Micro Courses
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>);

}