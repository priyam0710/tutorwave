'use client';

import React, { useEffect, useRef } from 'react';
import AppImage from '@/components/ui/AppImage';

const tutorStories = [
  {
    name: 'Vikram Nair',
    location: 'Dwarka, Delhi',
    subject: 'Mathematics · Class 9–12',
    quote:
      'I was teaching only 2 students when I joined TutorWave. Within 3 months I had 7 regular students, all within 4 km of my home. The leads are genuine — parents actually want to meet you.',
    income: '₹38,000/month',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_10c75e62a-1773230407744.png',
  },
  {
    name: 'Anjali Verma',
    location: 'Noida Sector 44',
    subject: 'English & Hindi · Class 6–10',
    quote:
      'As a working professional who teaches in the evenings, TutorWave has been perfect. They only send me leads that match my timing preference. No wasted calls.',
    income: '₹22,000/month',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_15fd617c0-1767747539383.png',
  },
  {
    name: 'Rohit Sharma',
    location: 'Gurugram Sector 56',
    subject: 'Physics & Chemistry · IIT-JEE',
    quote:
      'The verification process gave me credibility with parents. I charge a premium rate and parents trust me because I came through TutorWave. Best decision I made for my teaching career.',
    income: '₹52,000/month',
    image: 'https://img.rocket.new/generatedImages/rocket_gen_img_16d16482f-1768347677431.png',
  },
];

export default function TutorTestimonials() {
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
        el.style.transform = 'translateY(24px)';
        el.style.transition =
          'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-14">
          <span className="section-label mb-4 block">Tutor Stories</span>
          <h2 className="font-display text-section-xl text-[#0D1118]">
            Tutors who made the
            <span className="italic text-[#0A6FF7]"> right move.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tutorStories.map((tutor, i) => (
            <div
              key={tutor.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="bg-white border border-[#E5E7EB] rounded-3xl p-6 md:p-8 flex flex-col gap-5 card-hover"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Income badge */}
              <div className="inline-flex items-center gap-2 bg-[#E6F7F5] border border-[#99E6DF] text-[#0C8F81] text-xs font-bold px-3 py-1.5 rounded-full self-start">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {tutor.income}
              </div>

              <p className="text-sm text-[#25262A] leading-relaxed flex-1">
                &ldquo;{tutor.quote}&rdquo;
              </p>

              <div className="text-xs font-semibold text-[#0A6FF7] bg-[#EBF4FF] px-3 py-1.5 rounded-full self-start">
                {tutor.subject}
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E7EB]">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <AppImage
                    src={tutor.image}
                    alt={`${tutor.name}, TutorWave tutor from ${tutor.location}`}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0D1118]">{tutor.name}</div>
                  <div className="text-xs text-[#6B7280]">{tutor.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}