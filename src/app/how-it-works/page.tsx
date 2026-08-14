'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const parentSteps = [
  {
    number: '01',
    title: 'Tell us your requirement',
    description: 'Share your child\'s class, subject, board, location and schedule. Takes less than two minutes.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    accent: '#0A6FF7',
    accentBg: '#EBF4FF',
    wide: true,
  },
  {
    number: '02',
    title: 'We identify suitable tutor options',
    description: 'Our team reviews your requirement and shortlists tutors matched to your child\'s class, subject and location.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M11 8v6M8 11h6" />
      </svg>
    ),
    accent: '#0C8F81',
    accentBg: '#E6F7F5',
    wide: false,
  },
  {
    number: '03',
    title: 'Connect with the tutor',
    description: 'We share suitable options with you. Review and connect with the tutor that fits best.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    accent: '#F8AD03',
    accentBg: '#FFF8E6',
    wide: false,
  },
  {
    number: '04',
    title: 'Start learning',
    description: 'Classes begin on your preferred schedule — at home or online. Learning starts on your terms.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    accent: '#0A6FF7',
    accentBg: '#EBF4FF',
    wide: true,
  },
];

const tutorSteps = [
  {
    number: '01',
    title: 'Register',
    description: 'Create your tutor profile — subjects, classes, location and availability.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" y1="8" x2="19" y2="14" />
        <line x1="22" y1="11" x2="16" y2="11" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Get verified',
    description: 'Our team reviews your profile to ensure quality and credibility before you go live.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive relevant opportunities',
    description: 'Get matched with genuine parent enquiries that fit your subjects, location and schedule.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Connect',
    description: 'We introduce you to the parent. Discuss requirements, schedule and expectations directly.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Teach',
    description: 'Start classes on your schedule. Home or online — teach the way that works for you.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
];

type TabType = 'parents' | 'tutors';

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<TabType>('parents');
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tutorCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const refs = activeTab === 'parents' ? cardsRef.current : tutorCardsRef.current;
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
      { threshold: 0.08 }
    );

    refs.forEach((el, i) => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${i * 90}ms`;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [activeTab]);

  return (
    <main className="bg-white min-h-screen">
      <Header />

      {/* ── Hero ── */}
      <section className="pt-28 pb-0 bg-[#F8FAFC] relative overflow-hidden">
        {/* Decorative glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(10,111,247,0.07) 0%, transparent 65%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <nav className="flex items-center gap-2 text-xs text-[#6B7280] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#0D1118] font-medium">How It Works</span>
          </nav>

          <div className="max-w-3xl pb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">How It Works</span>
            <h1
              className="font-bold text-[#0D1118] mb-5 leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              Simple steps to start learning
              <br />
              <span className="italic" style={{ color: '#4BC2FD' }}>or start teaching.</span>
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl">
              Whether you are a parent looking for the right tutor or a tutor looking for genuine opportunities — TutorWave makes it straightforward.
            </p>
          </div>
        </div>

        {/* Tab switcher — anchored to bottom of hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="inline-flex bg-white border border-[#E5E7EB] rounded-2xl p-1.5 shadow-sm">
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'parents' ?'bg-[#0A6FF7] text-white shadow-md' :'text-[#6B7280] hover:text-[#0D1118]'
              }`}
            >
              For Parents
            </button>
            <button
              onClick={() => setActiveTab('tutors')}
              className={`px-7 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === 'tutors' ?'bg-[#0D1118] text-white shadow-md' :'text-[#6B7280] hover:text-[#0D1118]'
              }`}
            >
              For Tutors
            </button>
          </div>
        </div>

        {/* Tab underline strip */}
        <div className="h-px bg-[#E5E7EB] mt-6" />
      </section>

      {/* ── For Parents ── */}
      {activeTab === 'parents' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 bg-[#EBF4FF] text-[#0A6FF7] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                For Parents
              </span>
              <h2
                className="font-bold text-[#0D1118] mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
              >
                Find the right tutor in four steps.
              </h2>
              <p className="text-[#6B7280] max-w-lg">
                Share your requirement once. We handle the matching, verification and introduction.
              </p>
            </div>

            {/* Bento grid — asymmetric */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Step 01 — wide */}
              <div
                ref={(el) => { cardsRef.current[0] = el; }}
                className="md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0A6FF7 0%, #4BC2FD 100%)' }}
              >
                <div
                  className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                    {parentSteps[0].icon}
                  </div>
                  <span className="text-5xl font-bold text-white/15 leading-none select-none">{parentSteps[0].number}</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>{parentSteps[0].title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed max-w-sm">{parentSteps[0].description}</p>
                </div>
              </div>

              {/* Step 02 */}
              <div
                ref={(el) => { cardsRef.current[1] = el; }}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between min-h-[220px] hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#E6F7F5] flex items-center justify-center text-[#0C8F81] flex-shrink-0">
                    {parentSteps[1].icon}
                  </div>
                  <span className="text-4xl font-bold text-[#E5E7EB] leading-none select-none">{parentSteps[1].number}</span>
                </div>
                <div className="mt-5">
                  <h3 className="text-base font-bold text-[#0D1118] mb-2" style={{ letterSpacing: '-0.01em' }}>{parentSteps[1].title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{parentSteps[1].description}</p>
                </div>
              </div>

              {/* Step 03 */}
              <div
                ref={(el) => { cardsRef.current[2] = el; }}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between min-h-[200px] hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF8E6] flex items-center justify-center text-[#B45309] flex-shrink-0">
                    {parentSteps[2].icon}
                  </div>
                  <span className="text-4xl font-bold text-[#E5E7EB] leading-none select-none">{parentSteps[2].number}</span>
                </div>
                <div className="mt-5">
                  <h3 className="text-base font-bold text-[#0D1118] mb-2" style={{ letterSpacing: '-0.01em' }}>{parentSteps[2].title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{parentSteps[2].description}</p>
                </div>
              </div>

              {/* Step 04 — wide */}
              <div
                ref={(el) => { cardsRef.current[3] = el; }}
                className="md:col-span-2 bg-[#0D1118] rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[200px] relative overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(10,111,247,0.15) 0%, transparent 70%)' }}
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#4BC2FD] flex-shrink-0">
                    {parentSteps[3].icon}
                  </div>
                  <span className="text-5xl font-bold text-white/10 leading-none select-none">{parentSteps[3].number}</span>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>{parentSteps[3].title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-sm">{parentSteps[3].description}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex items-center gap-4">
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Find a Tutor
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="text-sm text-[#6B7280]">Free to submit a requirement</span>
            </div>
          </div>
        </section>
      )}

      {/* ── For Tutors ── */}
      {activeTab === 'tutors' && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="mb-14">
              <span className="inline-flex items-center gap-2 bg-[#0D1118] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                For Tutors
              </span>
              <h2
                className="font-bold text-[#0D1118] mb-3 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
              >
                From registration to your first class.
              </h2>
              <p className="text-[#6B7280] max-w-lg">
                Five clear steps to join TutorWave and start receiving genuine teaching opportunities.
              </p>
            </div>

            {/* Tutor steps — 5-card asymmetric bento */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Steps 01 + 02 stacked in col 1 */}
              <div className="flex flex-col gap-5">
                {[tutorSteps[0], tutorSteps[1]].map((step, i) => (
                  <div
                    key={step.number}
                    ref={(el) => { tutorCardsRef.current[i] = el; }}
                    className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] flex-shrink-0">
                        {step.icon}
                      </div>
                      <span className="text-3xl font-bold text-[#E5E7EB] leading-none select-none">{step.number}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#0D1118] mb-1.5" style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              {/* Step 03 — tall featured */}
              <div
                ref={(el) => { tutorCardsRef.current[2] = el; }}
                className="rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
                style={{ background: 'linear-gradient(160deg, #0D1118 0%, #1a2235 100%)', minHeight: '320px' }}
              >
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(10,111,247,0.18) 0%, transparent 70%)' }}
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#4BC2FD] flex-shrink-0">
                    {tutorSteps[2].icon}
                  </div>
                  <span className="text-5xl font-bold text-white/10 leading-none select-none">{tutorSteps[2].number}</span>
                </div>
                <div className="mt-auto pt-8">
                  <div className="inline-flex items-center gap-1.5 bg-[#0A6FF7]/20 border border-[#0A6FF7]/30 text-[#4BC2FD] text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4BC2FD]" />
                    Matched to you
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>{tutorSteps[2].title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{tutorSteps[2].description}</p>
                </div>
              </div>

              {/* Steps 04 + 05 stacked in col 3 */}
              <div className="flex flex-col gap-5">
                {[tutorSteps[3], tutorSteps[4]].map((step, i) => (
                  <div
                    key={step.number}
                    ref={(el) => { tutorCardsRef.current[i + 3] = el; }}
                    className={`rounded-3xl p-7 flex flex-col justify-between hover:shadow-md transition-shadow duration-300 ${
                      i === 1
                        ? 'bg-[#0A6FF7] text-white'
                        : 'bg-white border border-[#E5E7EB]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        i === 1 ? 'bg-white/15 text-white' : 'bg-[#E6F7F5] text-[#0C8F81]'
                      }`}>
                        {step.icon}
                      </div>
                      <span className={`text-3xl font-bold leading-none select-none ${i === 1 ? 'text-white/20' : 'text-[#E5E7EB]'}`}>{step.number}</span>
                    </div>
                    <h3 className={`text-base font-bold mb-1.5 ${i === 1 ? 'text-white' : 'text-[#0D1118]'}`} style={{ letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p className={`text-sm leading-relaxed ${i === 1 ? 'text-white/75' : 'text-[#6B7280]'}`}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex items-center gap-4">
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0D1118] text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#1a2235] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Join TutorWave
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <span className="text-sm text-[#6B7280]">Free to register</span>
            </div>
          </div>
        </section>
      )}

      {/* ── Dual CTA strip ── */}
      <section className="py-20 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parent CTA */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-10 flex flex-col justify-between hover:shadow-md transition-shadow duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7] mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0D1118] mb-2" style={{ letterSpacing: '-0.015em' }}>Looking for a tutor?</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed mb-6">
                  Share your child&apos;s requirement and let us find the right match for you.
                </p>
              </div>
              <Link
                href="/find-a-tutor"
                className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-200 self-start"
              >
                Find a Tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            {/* Tutor CTA */}
            <div className="bg-[#0D1118] rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(75,194,253,0.1) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#4BC2FD] mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>Want to teach?</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">
                  Register as a tutor and start receiving genuine opportunities near you.
                </p>
              </div>
              <Link
                href="/become-a-tutor"
                className="inline-flex items-center gap-2 bg-white text-[#0D1118] font-bold px-6 py-3 rounded-xl text-sm hover:bg-[#F8FAFC] transition-all duration-200 self-start relative z-10"
              >
                Become a Tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
