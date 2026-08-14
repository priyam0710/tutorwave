'use client';

import React, { useEffect, useRef } from 'react';

const benefits = [
  {
    title: 'Genuine, Pre-Qualified Leads',
    description:
      'Every parent enquiry we share with you has already been verified — real name, real phone number, confirmed subject and area. No cold leads.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    stat: '100%',
    statLabel: 'Verified parent leads',
    featured: true,
  },
  {
    title: 'Teach Near Home',
    description:
      'We match you only with students in your preferred localities — shorter commutes, more time teaching.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    stat: '5 km',
    statLabel: 'Average tutor-student distance',
    featured: false,
    iconBg: 'bg-[#E6F7F5] text-[#0C8F81]',
  },
  {
    title: 'Your Schedule, Your Rules',
    description:
      'Set your own availability. Mornings, evenings, weekends — teach when it works for you.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: 'Flexible',
    statLabel: 'Timing control',
    featured: false,
    iconBg: 'bg-[#FFF8E6] text-[#B45309]',
  },
  {
    title: 'Build Stable Monthly Income',
    description:
      'Active tutors on TutorWave earn a consistent, growing income from home tuitions. Many earn more from tuitions than from their primary job.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    stat: '₹15K–₹50K',
    statLabel: 'Monthly income range',
    featured: false,
    iconBg: 'bg-[#FFF8E6] text-[#F8AD03]',
  },
  {
    title: 'Ongoing Support from Our Team',
    description:
      'We stay involved — helping you resolve scheduling issues, parent communication, and ensuring a smooth ongoing tuition.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    stat: 'Always',
    statLabel: 'Team support available',
    featured: false,
    iconBg: 'bg-[#EBF4FF] text-[#0A6FF7]',
  },
];

export default function TutorBenefits() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    cardsRef.current.forEach((el) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition =
          'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC] grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-2xl mb-14">
          <span className="section-label mb-4 block">Why Tutors Choose TutorWave</span>
          <h2 className="font-display text-section-xl text-[#0D1118] mb-4">
            More students.
            <span className="italic text-[#0A6FF7]"> Better opportunities.</span>
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed">
            We built TutorWave to make home tuition work better for tutors — not just parents. Here is what sets us apart.
          </p>
        </div>

        {/* Bento grid: 3-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Featured card — spans 2 cols, Deep Navy */}
          <div
            ref={(el) => { cardsRef.current[0] = el; }}
            className="md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px]"
            style={{
              background: 'linear-gradient(135deg, #0A6FF7 0%, #4BC2FD 100%)',
              transitionDelay: '0ms',
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                {benefits[0].icon}
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-white">{benefits[0].stat}</div>
                <div className="text-xs text-white/70 font-medium">{benefits[0].statLabel}</div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-display text-xl font-semibold text-white mb-2">{benefits[0].title}</h3>
              <p className="text-sm text-white/75 leading-relaxed">{benefits[0].description}</p>
            </div>
          </div>

          {/* Single col cards */}
          {benefits.slice(1).map((b, i) => (
            <div
              key={b.title}
              ref={(el) => { cardsRef.current[i + 1] = el; }}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8 flex flex-col justify-between card-hover"
              style={{ transitionDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${b.iconBg}`}>
                  {b.icon}
                </div>
                <div className="text-right">
                  <div className="font-display text-xl font-bold text-[#0A6FF7]">{b.stat}</div>
                  <div className="text-xs text-[#6B7280]">{b.statLabel}</div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#0D1118] mb-2">{b.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}