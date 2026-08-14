'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Dwarka, Delhi',
    text: 'Within 2 days of submitting my requirement, TutorWave matched us with an excellent Maths tutor for my daughter who is in Class 10 CBSE. Her marks improved from 62 to 84 in one term.',
    subject: 'Mathematics · Class 10 CBSE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_186b140f0-1764664898796.png',
    stars: 5,
  },
  {
    name: 'Rajiv Mehta',
    location: 'Noida Sector 62',
    text: 'I was skeptical at first, but the tutor they found for my son\'s IIT-JEE preparation is genuinely knowledgeable. The verification process gave me confidence.',
    subject: 'Physics & Chemistry · IIT-JEE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1694be8c8-1778487567939.png',
    stars: 5,
  },
  {
    name: 'Sunita Agarwal',
    location: 'Gurugram Sector 49',
    text: 'My younger one needed help with Hindi and English both. TutorWave found a single tutor who handles both subjects. Very convenient and the tutor comes on time every day.',
    subject: 'Hindi & English · Class 6 ICSE',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_152ed782c-1774873611952.png',
    stars: 5,
  },
  {
    name: 'Amit Chaudhary',
    location: 'Rohini, Delhi',
    text: 'Fast response, professional approach. The tutor they sent for NEET coaching has a strong track record. Highly recommend TutorWave to any parent in Delhi.',
    subject: 'Biology · NEET Preparation',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1760e7716-1785730607805.png',
    stars: 5,
  },
];

const platformStats = [
  { value: '2,400+', label: 'Verified Tutors', sub: 'across Delhi NCR' },
  { value: '8,500+', label: 'Students Matched', sub: 'since 2022' },
  { value: '4.8 / 5', label: 'Average Rating', sub: 'from parent reviews' },
  { value: '24 hrs', label: 'Match Guarantee', sub: 'or we escalate personally' },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F8AD03" stroke="none">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProofSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    [...cardsRef.current, ...statsRef.current].forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 md:py-28 bg-[#EBF4FF]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">What Parents Say</span>
          <h2 className="font-display text-section-xl text-[#0D1118] mb-4">
            Real families.
            <span className="italic text-[#0A6FF7]"> Real results.</span>
          </h2>
          <p className="text-base text-[#6B7280] max-w-md mx-auto">
            Parents across Delhi, Noida, and Gurugram trust TutorWave to find the right tutor for their child.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`bg-white border border-[#E5E7EB] rounded-3xl p-6 flex flex-col gap-4 card-hover ${i === 1 || i === 3 ? 'lg:mt-6' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <StarRating count={t.stars} />
              <p className="text-sm text-[#25262A] leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="text-xs font-semibold text-[#0A6FF7] bg-[#EBF4FF] px-3 py-1.5 rounded-full self-start">
                {t.subject}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-[#E5E7EB]">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={t.image}
                    alt={`${t.name}, parent from ${t.location}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0D1118]">{t.name}</div>
                  <div className="text-xs text-[#6B7280]">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {platformStats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statsRef.current[i] = el; }}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8 text-center"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-sans text-3xl md:text-4xl font-bold text-[#0A6FF7] mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-sm text-[#0D1118] mb-1">{stat.label}</div>
              <div className="text-xs text-[#6B7280]">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
