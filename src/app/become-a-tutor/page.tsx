import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Become a Tutor — TutorWave',
  description: 'Join TutorWave as a verified tutor. Teach what you love, grow your income, and connect with genuine students across Delhi NCR.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/become-a-tutor`,
  },
  openGraph: {
    type: 'website',
    title: 'Become a Tutor — TutorWave',
    description: 'Join TutorWave as a verified tutor. Teach what you love, grow your income, and connect with genuine students.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/become-a-tutor`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Become a Tutor',
      },
    ],
  },
};

const whyItems = [
  {
    title: 'Genuine, pre-qualified leads',
    description: 'Every parent enquiry we share has been verified — real contact, confirmed subject and area. No cold leads, no wasted time.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    accent: '#0A6FF7',
    accentBg: '#EBF4FF',
    stat: '100%',
    statLabel: 'Verified leads',
    wide: true,
  },
  {
    title: 'Teach near your home',
    description: 'We match you with students in your preferred localities — shorter commutes, more time teaching.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    accent: '#0C8F81',
    accentBg: '#E6F7F5',
    stat: 'Local',
    statLabel: 'Matched students',
    wide: false,
  },
  {
    title: 'Flexible schedule',
    description: 'Set your own availability. Mornings, evenings, weekends — teach when it works for you.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: '#B45309',
    accentBg: '#FFF8E6',
    stat: 'Flexible',
    statLabel: 'Timing control',
    wide: false,
  },
  {
    title: 'Stable monthly income',
    description: 'Active tutors on TutorWave build a consistent, growing income from home tuitions.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: '#F8AD03',
    accentBg: '#FFF8E6',
    stat: '₹15K–₹50K',
    statLabel: 'Monthly income range',
    wide: false,
  },
];

const registrationSteps = [
  {
    number: '01',
    title: 'Create your profile',
    description: 'Tell us your subjects, classes, preferred locations and availability.',
  },
  {
    number: '02',
    title: 'Submit your details',
    description: 'Provide your qualifications and teaching experience for our team to review.',
  },
  {
    number: '03',
    title: 'Profile goes live',
    description: 'Once approved, your profile is active and you start receiving matched opportunities.',
  },
];

const verificationPoints = [
  'Identity and contact verification',
  'Qualification review',
  'Subject and class confirmation',
  'Location and availability check',
  'Profile quality assessment',
];

const teachingModes = [
  {
    title: 'Home Teaching',
    description: 'Visit students at their homes in your preferred localities. Build a personal, trusted relationship with families.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    bg: 'bg-[#EBF4FF]',
    color: 'text-[#0A6FF7]',
  },
  {
    title: 'Online Teaching',
    description: 'Teach from anywhere via video call. Reach students beyond your immediate locality.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    bg: 'bg-[#E6F7F5]',
    color: 'text-[#0C8F81]',
  },
];

const flexibleItems = [
  'Choose your own subjects and classes',
  'Set your preferred teaching locations',
  'Define your available hours',
  'Accept or decline opportunities',
  'Teach home, online, or both',
  'Scale up or down as needed',
];

export default function BecomeTutorPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* ── Hero ── */}
      <section className="relative pt-28 pb-0 overflow-hidden bg-[#0D1118]">
        {/* Background glow layers */}
        <div
          className="absolute top-0 left-0 w-[700px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(10,111,247,0.14) 0%, transparent 65%)' }}
        />
        <div
          className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(75,194,253,0.08) 0%, transparent 65%)' }}
        />
        {/* Accent dots */}
        <div className="absolute top-20 right-24 w-3 h-3 rounded-full bg-[#F8AD03] opacity-60 pointer-events-none" />
        <div className="absolute top-40 right-64 w-2 h-2 rounded-full bg-[#4BC2FD] opacity-40 pointer-events-none" />
        <div className="absolute bottom-20 left-16 w-2.5 h-2.5 rounded-full bg-[#0C8F81] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-white/40 mb-10" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60 font-medium">Become a Tutor</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end pb-20 md:pb-28">
            {/* Left — headline */}
            <div>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full text-white text-xs font-semibold tracking-wide mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F8AD03] animate-pulse" />
                Now accepting tutors across Delhi NCR
              </span>

              <h1
                className="font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', letterSpacing: '-0.03em' }}
              >
                Teach What You Love.
                <br />
                <span className="italic" style={{ color: '#4BC2FD' }}>Grow With TutorWave.</span>
              </h1>

              <p className="text-lg text-white/65 leading-relaxed mb-10 max-w-lg">
                Join TutorWave&apos;s verified tutor network in Delhi NCR. Get genuine leads, teach near your home, and build a stable teaching income on your schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="#register"
                  className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-4 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Join TutorWave
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/8 transition-all duration-300 text-sm"
                >
                  How it works
                </Link>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: '₹15K–₹50K', label: 'Monthly income range', sub: 'for active tutors', color: '#F8AD03' },
                { value: 'Verified', label: 'Tutor badge', sub: 'after profile review', color: '#4BC2FD' },
                { value: 'Local', label: 'Student matching', sub: 'in your preferred area', color: '#0C8F81' },
                { value: 'Flexible', label: 'Teaching schedule', sub: 'you set your hours', color: '#0A6FF7' },
              ]?.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/6 border border-white/10 rounded-2xl p-5 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: stat?.color, letterSpacing: '-0.02em' }}>
                    {stat?.value}
                  </div>
                  <div className="text-sm font-semibold text-white mb-0.5">{stat?.label}</div>
                  <div className="text-xs text-white/45">{stat?.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade to white */}
        <div className="h-16 bg-gradient-to-b from-[#0D1118] to-white" />
      </section>
      {/* ── Why TutorWave ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Why TutorWave</span>
            <h2
              className="font-bold text-[#0D1118] mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              More students.
              <span className="italic text-[#0A6FF7]"> Better opportunities.</span>
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              We built TutorWave to make home tuition work better for tutors — not just parents.
            </p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Featured — wide */}
            <div
              className="md:col-span-2 rounded-3xl p-8 md:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0A6FF7 0%, #4BC2FD 100%)' }}
            >
              <div
                className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'rgba(255,255,255,0.08)' }}
              />
              <div className="flex items-start justify-between gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
                  {whyItems?.[0]?.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-white" style={{ letterSpacing: '-0.02em' }}>{whyItems?.[0]?.stat}</div>
                  <div className="text-xs text-white/65 font-medium">{whyItems?.[0]?.statLabel}</div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-2" style={{ letterSpacing: '-0.015em' }}>{whyItems?.[0]?.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed max-w-sm">{whyItems?.[0]?.description}</p>
              </div>
            </div>

            {/* Single cards */}
            {whyItems?.slice(1)?.map((item) => (
              <div
                key={item?.title}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-7 flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: item?.accentBg, color: item?.accent }}>
                    {item?.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold" style={{ color: item?.accent, letterSpacing: '-0.015em' }}>{item?.stat}</div>
                    <div className="text-xs text-[#6B7280]">{item?.statLabel}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#0D1118] mb-2">{item?.title}</h3>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{item?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── How Tutor Registration Works ── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Registration</span>
              <h2
                className="font-bold text-[#0D1118] mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
              >
                How tutor registration works.
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-10">
                Getting started is straightforward. Three steps and you are ready to receive opportunities.
              </p>

              <div className="space-y-6">
                {registrationSteps?.map((step, i) => (
                  <div key={step?.number} className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-[#0A6FF7] flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{step?.number}</span>
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold text-[#0D1118] mb-1">{step?.title}</h3>
                      <p className="text-sm text-[#6B7280] leading-relaxed">{step?.description}</p>
                    </div>
                    {i < registrationSteps?.length - 1 && (
                      <div className="absolute ml-5 mt-10 w-px h-6 bg-[#E5E7EB]" style={{ position: 'relative', left: '-100%', marginLeft: '-100%' }} />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="#register"
                  className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Start Registration
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Visual card */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0D1118]">Tutor Registration</div>
                  <div className="text-xs text-[#6B7280]">Free to join</div>
                </div>
              </div>

              {[
                { label: 'Full Name', placeholder: 'Your name' },
                { label: 'Subjects', placeholder: 'e.g. Mathematics, Physics' },
                { label: 'Classes', placeholder: 'e.g. Class 9–12' },
                { label: 'Location', placeholder: 'Your preferred area' },
              ]?.map((field) => (
                <div key={field?.label} className="mb-4">
                  <div className="text-xs font-semibold text-[#6B7280] mb-1.5">{field?.label}</div>
                  <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl px-4 py-3 text-sm text-[#9CA3AF]">
                    {field?.placeholder}
                  </div>
                </div>
              ))}

              <div className="mt-6 bg-[#0A6FF7] rounded-xl px-4 py-3 text-center text-white text-sm font-bold">
                Submit Registration
              </div>
              <p className="text-xs text-[#9CA3AF] text-center mt-3">Our team will review and contact you within 24–48 hours</p>
            </div>
          </div>
        </div>
      </section>
      {/* ── Tutor Verification ── */}
      <section className="py-20 bg-[#0D1118] relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(10,111,247,0.12) 0%, transparent 65%)' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Verification visual */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#0A6FF7]/20 flex items-center justify-center text-[#4BC2FD]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Verified Tutor Badge</div>
                  <div className="text-xs text-white/45">Awarded after review</div>
                </div>
              </div>

              <div className="space-y-3">
                {verificationPoints?.map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#0A6FF7]/20 border border-[#0A6FF7]/40 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4BC2FD" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/75 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="inline-flex items-center gap-2 bg-[#0A6FF7]/15 border border-[#0A6FF7]/25 text-[#4BC2FD] text-xs font-semibold px-4 py-2 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4BC2FD]" />
                  Verified tutors receive priority matching
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#4BC2FD] mb-4">Verification</span>
              <h2
                className="font-bold text-white mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
              >
                Why we verify every tutor.
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Parents trust TutorWave because we take verification seriously. Every tutor profile is reviewed by our team before going live.
              </p>
              <p className="text-white/60 leading-relaxed">
                Verification is not just a formality — it ensures that the opportunities you receive are from genuine, committed parents, and that parents can trust the tutors we connect them with.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ── Teaching Opportunities ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Teaching Opportunities</span>
            <h2
              className="font-bold text-[#0D1118] mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              Opportunities matched to you.
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              We do not send you a generic list of leads. Every opportunity we share is matched to your subjects, location and availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: 'Subject-matched leads',
                description: 'Only receive enquiries for subjects you teach. No irrelevant leads.',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
                bg: '#EBF4FF',
                color: '#0A6FF7',
              },
              {
                title: 'Location-based matching',
                description: 'Students near your home or in your preferred teaching areas.',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                bg: '#E6F7F5',
                color: '#0C8F81',
              },
              {
                title: 'Schedule-compatible',
                description: 'Opportunities that align with the availability you have set.',
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                bg: '#FFF8E6',
                color: '#B45309',
              },
            ]?.map((item) => (
              <div
                key={item?.title}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-7 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 flex-shrink-0" style={{ backgroundColor: item?.bg, color: item?.color }}>
                  {item?.icon}
                </div>
                <h3 className="font-semibold text-base text-[#0D1118] mb-2">{item?.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{item?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Home & Online Teaching ── */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mb-14">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Teaching Modes</span>
            <h2
              className="font-bold text-[#0D1118] mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
            >
              Home teaching. Online teaching.
              <span className="italic text-[#0A6FF7]"> Your choice.</span>
            </h2>
            <p className="text-[#6B7280] leading-relaxed">
              TutorWave supports both home and online teaching. You decide which mode works best for you — or do both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teachingModes?.map((mode) => (
              <div
                key={mode?.title}
                className="bg-white border border-[#E5E7EB] rounded-3xl p-8 md:p-10 hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${mode?.bg} ${mode?.color} flex items-center justify-center mb-6`}>
                  {mode?.icon}
                </div>
                <h3 className="text-xl font-bold text-[#0D1118] mb-3" style={{ letterSpacing: '-0.015em' }}>{mode?.title}</h3>
                <p className="text-[#6B7280] leading-relaxed">{mode?.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ── Flexible Opportunities ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">Flexibility</span>
              <h2
                className="font-bold text-[#0D1118] mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', letterSpacing: '-0.025em' }}
              >
                Teaching that fits around your life.
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-8">
                TutorWave is built for tutors who want control over their work. You set the terms — we handle the matching.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flexibleItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EBF4FF] border border-[#0A6FF7]/20 flex items-center justify-center flex-shrink-0">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="3">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[#0D1118] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-8 md:p-10">
              <div className="text-xs font-bold uppercase tracking-widest text-[#6B7280] mb-6">Your teaching profile</div>
              {[
                { label: 'Teaching mode', value: 'Home + Online', color: '#0A6FF7' },
                { label: 'Subjects', value: 'Mathematics, Physics', color: '#0C8F81' },
                { label: 'Classes', value: 'Class 9–12', color: '#B45309' },
                { label: 'Availability', value: 'Evenings & Weekends', color: '#0A6FF7' },
                { label: 'Preferred areas', value: 'Noida, Greater Noida', color: '#0C8F81' },
              ]?.map((row) => (
                <div key={row?.label} className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0">
                  <span className="text-sm text-[#6B7280]">{row?.label}</span>
                  <span className="text-sm font-semibold" style={{ color: row?.color }}>{row?.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── Final CTA ── */}
      <section id="register" className="py-24 bg-[#0D1118] relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-[700px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, rgba(10,111,247,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(75,194,253,0.07) 0%, transparent 65%)' }}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8AD03] animate-pulse" />
            Free to register
          </span>
          <h2
            className="font-bold text-white mb-5 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em' }}
          >
            Ready to teach what you love?
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Join TutorWave today. Register your profile and start receiving genuine teaching opportunities near you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/become-a-tutor#register"
              className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#0858c8] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              Join TutorWave
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/tutors"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border border-white/25 hover:border-white/50 hover:bg-white/8 transition-all duration-300"
            >
              Browse Tutors
            </Link>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}