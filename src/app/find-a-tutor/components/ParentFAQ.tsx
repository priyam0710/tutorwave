'use client';

import React, { useState } from 'react';

const faqs = [
  {
    q: 'How long does it take to find a tutor?',
    a: 'In most cases, our team calls you back within a few hours of receiving your requirement. We typically suggest 2–3 suitable tutors within 24 hours. In some cases it may take slightly longer depending on the subject and area.',
  },
  {
    q: 'Does TutorWave charge parents any fee?',
    a: "No. TutorWave's matching service is completely free for parents and students. We do not charge any registration or finder's fee. Tutor fees are agreed directly between you and the tutor.",
  },
  {
    q: 'How are tutors verified?',
    a: 'Every tutor on TutorWave goes through a verification process that includes ID proof check, qualification document verification, and a personal interview with our team. We do not add tutors who do not meet our quality standards.',
  },
  {
    q: 'What if I am not satisfied with the tutor?',
    a: 'If you are not satisfied with a matched tutor for any reason, simply let us know and we will find you a better alternative at no extra charge. Your satisfaction is our responsibility.',
  },
  {
    q: 'Can I request a female or male tutor specifically?',
    a: 'Absolutely. You can specify your preference for a male or female tutor in the additional details section of the form, or mention it when our team calls you.',
  },
  {
    q: 'Do you cover all areas in Delhi NCR?',
    a: 'We currently serve Delhi (all major areas), Noida, Greater Noida, Gurugram, Faridabad, and Ghaziabad. If you are in a less central area, tutor availability may vary — our team will advise you when they call.',
  },
  {
    q: 'What subjects and classes do you cover?',
    a: "We cover all major subjects from Nursery to Class 12 (CBSE, ICSE, IB, State Board), competitive exam preparation (IIT-JEE, NEET, NDA, CA Foundation), and select college-level subjects. If you don't see your subject listed, contact us anyway — we will try to help.",
  },
];

export default function ParentFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="section-label mb-3 block">Frequently Asked Questions</span>
          <h2 className="font-display text-3xl md:text-4xl text-[#0D1118]">
            Questions parents
            <span className="italic text-[#0A6FF7]"> often ask</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs?.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden"
            >
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
      </div>
    </section>
  );
}