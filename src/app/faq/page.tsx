import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ — TutorWave Home Tuition Delhi NCR',
  description: 'Frequently asked questions about TutorWave — how to find a tutor, tutor registration, fees, subjects, locations and more.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`,
  },
  openGraph: {
    type: 'website',
    title: 'FAQ — TutorWave Home Tuition Delhi NCR',
    description: 'Frequently asked questions about TutorWave — how to find a tutor, tutor registration, fees, subjects, locations and more.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/faq`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'TutorWave FAQ',
      },
    ],
  },
};

const faqCategories = [
  {
    category: 'For Parents',
    faqs: [
      {
        q: 'How do I find a tutor on TutorWave?',
        a: 'Submit your tuition requirement using the "Find a Tutor" form. Share details about your child\'s class, subject, location and schedule. Our team will review your requirement and contact you with suitable tutor options.',
      },
      {
        q: 'Is there a fee to find a tutor?',
        a: 'Submitting a tuition requirement on TutorWave is free for parents. Our team will contact you with suitable options.',
      },
      {
        q: 'How long does it take to find a tutor?',
        a: 'After you submit your requirement, our team reviews it and works to identify suitable options. The time may vary based on your specific requirements and location.',
      },
      {
        q: 'Can I choose between home and online tutoring?',
        a: 'Yes. TutorWave supports both home and online learning. You can specify your preference when submitting your requirement.',
      },
      {
        q: 'What classes and subjects are covered?',
        a: 'TutorWave covers Nursery to Class 12 across all major subjects including Mathematics, Science, English, Physics, Chemistry, Biology, Computer Science and more. We also support competitive exam preparation for IIT-JEE, NEET and Olympiads.',
      },
      {
        q: 'Which boards are supported?',
        a: 'We support CBSE, ICSE, IB, IGCSE and State Board students.',
      },
      {
        q: 'Which areas in Delhi NCR do you cover?',
        a: 'TutorWave has a growing tutor network across Delhi, Noida, Gurgaon, Faridabad and Ghaziabad. Visit our Locations page for a detailed list of areas.',
      },
    ],
  },
  {
    category: 'For Tutors',
    faqs: [
      {
        q: 'How do I register as a tutor on TutorWave?',
        a: 'Visit the "Become a Tutor" page and fill in the registration form. Share your subjects, experience, location and availability. Our team will review your profile.',
      },
      {
        q: 'Is tutor registration free?',
        a: 'Yes, registering as a tutor on TutorWave is free.',
      },
      {
        q: 'What subjects can I teach?',
        a: 'You can register for any subjects you are qualified to teach, from school subjects to competitive exam preparation.',
      },
      {
        q: 'Can I teach both home and online?',
        a: 'Yes. You can specify your preference for home tutoring, online tutoring or both when registering.',
      },
      {
        q: 'How will I receive tuition leads?',
        a: 'Once your profile is reviewed, our team will contact you when a suitable tuition requirement matches your subjects, location and availability.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">FAQ</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-4" style={{ letterSpacing: '-0.025em' }}>
              Frequently asked questions
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Everything you need to know about TutorWave — for parents and tutors.
            </p>
          </div>
        </div>
      </section>
      {/* FAQ Categories */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
          {faqCategories?.map((cat) => (
            <div key={cat?.category} className="mb-16">
              <h2 className="text-2xl font-bold text-[#0D1118] mb-8 pb-4 border-b border-[#E5E7EB]" style={{ letterSpacing: '-0.015em' }}>
                {cat?.category}
              </h2>
              <div className="flex flex-col gap-4">
                {cat?.faqs?.map((faq, i) => (
                  <div key={i} className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl p-6 hover:border-[#0A6FF7]/30 transition-colors duration-200">
                    <h3 className="font-semibold text-[#0D1118] mb-2">{faq?.q}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{faq?.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Still have questions */}
      <section className="py-16 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-2xl font-bold text-[#0D1118] mb-3" style={{ letterSpacing: '-0.015em' }}>
            Still have questions?
          </h2>
          <p className="text-[#6B7280] mb-8">
            Contact us and our team will be happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors text-sm"
            >
              Contact Us
            </Link>
            <Link
              href="/find-a-tutor"
              className="inline-flex items-center justify-center gap-2 border border-[#0A6FF7] text-[#0A6FF7] font-semibold px-6 py-3 rounded-xl hover:bg-[#EBF4FF] transition-colors text-sm"
            >
              Find a Tutor
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
