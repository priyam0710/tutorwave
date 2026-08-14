import React from 'react';

const trustItems = [
  {
    title: 'Verified Tutors',
    description: 'Every tutor goes through a rigorous verification process before being matched.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Personalized Matching',
    description: 'We match based on class, subject, location and your child\'s learning needs.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Home & Online',
    description: 'Choose the teaching mode that fits your child\'s schedule and preference.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Dedicated Support',
    description: 'Our team is always available to support your learning journey from start to finish.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
];

export default function HomeTrustSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2
            className="font-sans font-bold text-[#0D1118] leading-tight"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.025em' }}
          >
            Why families choose TutorWave
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems?.map((item, i) => (
            <div
              key={item?.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#BFDBFE] hover:shadow-sm transition-all duration-300"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-[#0A6FF7]"
                style={{ background: '#EBF4FF' }}
              >
                {item?.icon}
              </div>
              <h3 className="font-sans font-bold text-sm text-[#0D1118] mb-2 leading-tight">
                {item?.title}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
