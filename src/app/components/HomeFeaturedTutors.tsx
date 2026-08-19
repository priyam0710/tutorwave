import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

const featuredTutors = [
  {
    name: 'Priyanshu Singh',
    slug: 'priyanshu-singh',
    photo: 'https://img.rocket.new/generatedImages/rocket_gen_img_15d2cf196-1786689836288.png',
    photoAlt: 'Priyanshu singh, Maths and Science tutor in Noida',
    subjects: 'Mathematics, Science','Physics','Chemistry',
    classes: 'Classes 9–12'& 'IIT JEE',
    experience: '5+ Years',
    location: 'Noida',
    mode: 'Online',
    verified: true,
  },
  }];

export default function HomeFeaturedTutors() {
  return (
    <section className="py-16 md:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              Our Tutors
            </span>
            <h2
              className="font-sans font-bold text-[#0D1118] leading-tight"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', letterSpacing: '-0.025em' }}
            >
              Meet Our Tutors
            </h2>
            <p className="text-sm text-[#6B7280] mt-2 max-w-md">
              Explore tutors across subjects, classes and locations.
            </p>
          </div>
          <Link
            href="/tutors"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A6FF7] hover:underline whitespace-nowrap"
          >
            View All Tutors
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredTutors?.map((tutor) => (
            <div
              key={tutor?.slug}
              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#BFDBFE] hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Photo */}
              <div className="relative aspect-[3/3.2] overflow-hidden bg-[#F8FAFC]">
                <AppImage
                  src={tutor?.photo}
                  alt={tutor?.photoAlt}
                  width={240}
                  height={260}
                  className="w-full h-full object-cover"
                />
                {tutor?.verified && (
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="2.5">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-[10px] font-bold text-[#0A6FF7]">Verified</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-sans font-bold text-sm text-[#0D1118] mb-1 leading-tight">{tutor?.name}</h3>
                <p className="text-xs text-[#6B7280] mb-1">{tutor?.subjects}</p>
                <p className="text-xs text-[#6B7280] mb-3">{tutor?.classes}</p>

                <div className="flex items-center gap-3 mb-3 text-xs text-[#6B7280]">
                  <div className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                    </svg>
                    {tutor?.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                    {tutor?.location}
                  </div>
                </div>

                <div className="mb-4">
                  <span
                    className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: '#EBF4FF', color: '#0A6FF7' }}
                  >
                    {tutor?.mode}
                  </span>
                </div>

                <div className="mt-auto">
                  <Link
                    href={`/tutors/${tutor?.slug}`}
                    className="block w-full text-center text-xs font-bold text-[#0A6FF7] border border-[#0A6FF7] rounded-xl py-2.5 hover:bg-[#EBF4FF] transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="mt-10 text-center">
          <Link
            href="/tutors"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A6FF7] border border-[#0A6FF7] px-7 py-3 rounded-xl hover:bg-[#EBF4FF] transition-colors"
          >
            View All Tutors
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
