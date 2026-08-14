'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'Does TutorWave charge tutors any registration fee?',
    a: 'No. Registering on TutorWave is completely free for tutors. We do not charge any upfront fee to join our network or to receive leads.',
  },
  {
    q: 'How does TutorWave make money if it is free?',
    a: 'TutorWave charges a small, transparent service fee on successful tuition placements — only after you have started teaching and the arrangement is confirmed. This is discussed clearly before any placement.',
  },
  {
    q: 'What qualifications do I need to join?',
    a: 'There is no strict minimum qualification, but we do verify all tutors. At minimum you should be a graduate or currently in your final year of graduation. What matters most is your subject knowledge, teaching ability, and commitment to students.',
  },
  {
    q: 'How many students can I expect to get?',
    a: 'This depends on your subject, area, availability, and the demand in your locality. Active tutors in high-demand areas (Maths, Science, IIT-JEE) typically receive 3–8 leads per month. We cannot guarantee a fixed number.',
  },
  {
    q: 'Can I specify which areas I want to teach in?',
    a: 'Yes. During registration you can select your preferred areas within Delhi NCR. We will only send you leads from those specific areas.',
  },
  {
    q: 'What is the verification process like?',
    a: 'After you register, our team will call you for a brief 10–15 minute interview. We will also ask for a copy of your ID and qualification documents. Once verified, your profile is activated.',
  },
  {
    q: 'Can I join if I already have my own students?',
    a: 'Absolutely. Many tutors on TutorWave already have existing students and use us to supplement their income with additional tuitions. There is no exclusivity requirement.',
  },
];

export default function TutorFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#EBF4FF]/40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-3 block">FAQ for Tutors</span>
          <h2 className="font-display text-3xl md:text-4xl text-[#0D1118]">
            Questions tutors
            <span className="italic text-[#0A6FF7]"> usually ask</span>
          </h2>
        </div>

        <div className="space-y-3 mb-12">
          {faqs?.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-[#EBF4FF]/40 transition-colors min-h-[60px]"
                aria-expanded={openIndex === i}
              >
                <span className="font-semibold text-sm md:text-base text-[#0D1118] leading-snug">
                  {faq?.q}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] transition-transform duration-300 ${
                    openIndex === i ? 'rotate-45' : ''
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-400 ease-out ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-5 md:px-6 pb-5 text-sm text-[#6B7280] leading-relaxed">
                  {faq?.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA — Deep Navy */}
        <div className="rounded-3xl p-8 text-center" style={{ backgroundColor: '#0D1118' }}>
          <h3 className="font-display text-2xl text-white mb-3">
            Ready to grow your teaching?
          </h3>
          <p className="text-white/65 text-sm mb-6 max-w-sm mx-auto">
            Join 2,400+ tutors already getting genuine leads through TutorWave across Delhi NCR.
          </p>
          <a href="#register" className="btn-white">
            Register Now — It&apos;s Free
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}