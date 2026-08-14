import React from 'react';

const signals = [
  {
    title: 'Personally Verified Tutors',
    description: 'Every tutor on TutorWave goes through ID verification, qualification check, and a personal interview before being added to our network.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    iconBg: 'bg-[#EBF4FF] text-[#0A6FF7]',
  },
  {
    title: 'Area-Based Matching',
    description: 'We only suggest tutors who live or regularly teach in your specific area of Delhi NCR — no long-distance commutes for your tutor.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    iconBg: 'bg-[#E6F7F5] text-[#0C8F81]',
  },
  {
    title: 'No Charges to Find',
    description: 'TutorWave does not charge parents to find or be matched with a tutor. Our matching service is completely free.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'bg-[#FFF8E6] text-[#B45309]',
  },
  {
    title: 'Satisfaction Guarantee',
    description: 'Not happy with your matched tutor? Tell us and we will find you a better fit — no questions asked, no additional charge.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    iconBg: 'bg-[#FFF1F0] text-[#D6041A]',
  },
];

export default function TrustSignals() {
  return (
    <section className="py-16 md:py-20 bg-[#EBF4FF]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-12">
          <span className="section-label mb-3 block">Our Promise to You</span>
          <h2 className="font-display text-3xl md:text-4xl text-[#0D1118]">
            Why Delhi NCR parents
            <span className="italic text-[#0A6FF7]"> choose TutorWave</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals?.map((s) => (
            <div key={s?.title} className="bg-white border border-[#E5E7EB] rounded-3xl p-6 card-hover">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${s?.iconBg}`}>
                {s?.icon}
              </div>
              <h3 className="font-semibold text-base text-[#0D1118] mb-2">{s?.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{s?.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}