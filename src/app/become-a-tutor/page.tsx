import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Become a Tutor — TutorWave',
  description:
    'Register with TutorWave as a tutor and receive genuine home and online tuition opportunities across Delhi NCR.',
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }/become-a-tutor`,
  },
};

const classes = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const subjects = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Science',
  'Computer Science',
  'Accountancy',
  'Business Studies',
  'Economics',
  'Political Science',
  'History',
  'Geography',
  'Psychology',
  'Sociology',
  'Other',
];

const boards = [
  'CBSE',
  'ICSE',
  'ISC',
  'IB',
  'IGCSE',
  'State Board',
  'Other',
];

const englishLevels = [
  'Basic',
  'Good',
  'Fluent',
  'Very Fluent',
];

export default function BecomeATutorPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              TUTOR REGISTRATION
            </p>

            <h1
              className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-5"
              style={{ letterSpacing: '-0.025em' }}
            >
              Join TutorWave as a tutor.
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed">
              Tell us about your teaching experience, subjects and preferred
              areas. Our team will review your profile and contact you for
              suitable opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">

                <h2
                  className="text-3xl font-bold text-[#0D1118] mb-8"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  How tutor registration works.
                </h2>

                <div className="space-y-8">

                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                      01
                    </div>

                    <div>
                      <h3 className="font-bold text-[#0D1118] mb-1">
                        Create your profile
                      </h3>

                      <p className="text-[#6B7280] leading-relaxed">
                        Tell us about your qualification, teaching experience,
                        subjects and preferred areas.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                      02
                    </div>

                    <div>
                      <h3 className="font-bold text-[#0D1118] mb-1">
                        Submit your details
                      </h3>

                      <p className="text-[#6B7280] leading-relaxed">
                        Our team reviews the information provided in your
                        registration.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                      03
                    </div>

                    <div>
                      <h3 className="font-bold text-[#0D1118] mb-1">
                        Receive suitable opportunities
                      </h3>

                      <p className="text-[#6B7280] leading-relaxed">
                        Once approved, you may receive tuition opportunities
                        matching your profile.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <div className="border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 bg-white shadow-sm">

                {/* Form Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4FF] text-[#0A6FF7] flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <line x1="19" y1="8" x2="19" y2="14" />
                      <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-[#0D1118]">
                      Tutor Registration
                    </h2>

                    <p className="text-sm text-[#6B7280]">
                      Complete your profile to get started.
                    </p>
                  </div>
                </div>

                <form className="space-y-8">

                  {/* =====================================================
                      PERSONAL DETAILS
                  ====================================================== */}

                  <div>
                    <h3 className="text-lg font-bold text-[#0D1118] mb-5">
                      Personal Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* Name */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Phone Number *
                        </label>

                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="10-digit mobile number"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Email Address
                        </label>

                        <input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* Age */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Age
                        </label>

                        <input
                          type="number"
                          name="age"
                          min="16"
                          max="80"
                          placeholder="Your age"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* Address */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Current Location / Address *
                        </label>

                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="Area / Sector / Locality"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                    </div>
                  </div>

                  {/* =====================================================
                      EDUCATION
                  ====================================================== */}

                  <div>
                    <h3 className="text-lg font-bold text-[#0D1118] mb-5">
                      Education
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                      {/* Qualification */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Highest Qualification & Stream *
                        </label>

                        <input
                          type="text"
                          name="qualification"
                          required
                          placeholder="e.g. B.Sc. Mathematics, M.Sc. Physics, B.Tech CSE"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* School */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Schooling From
                        </label>

                        <input
                          type="text"
                          name="schoolingFrom"
                          placeholder="School name"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                      {/* College */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          College / University
                        </label>

                        <input
                          type="text"
                          name="college"
                          placeholder="College / University name"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                    </div>
                  </div>

                  {/* =====================================================
                      TEACHING PROFILE
                  ====================================================== */}

                  <div>
                    <h3 className="text-lg font-bold text-[#0D1118] mb-5">
                      Teaching Profile
                    </h3>

                    <div className="space-y-5">

                      {/* Experience */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Teaching Experience *
                        </label>

                        <textarea
                          name="teachingExperience"
                          required
                          rows={3}
                          placeholder="Tell us briefly about your teaching experience."
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors resize-none"
                        />
                      </div>

                      {/* School Experience */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          School / Coaching Experience
                        </label>

                        <textarea
                          name="schoolExperience"
                          rows={3}
                          placeholder="Mention schools, coaching institutes or academies where you have taught."
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors resize-none"
                        />
                      </div>

                      {/* Students taught */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Students / Schools You Have Taught
                        </label>

                        <input
                          type="text"
                          name="studentsTaughtFrom"
                          placeholder="e.g. DPS, Amity International, Ryan International"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        />
                      </div>

                    </div>
                  </div>

                  {/* =====================================================
                      TEACHING CAPABILITY
                  ====================================================== */}

                  <div>
                    <h3 className="text-lg font-bold text-[#0D1118] mb-2">
                      What can you teach?
                    </h3>

                    <p className="text-sm text-[#6B7280] mb-5">
                      Select all applicable options. You can choose multiple
                      subjects and classes.
                    </p>

                    {/* Classes */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                        Classes You Can Teach *
                      </label>

                      <select
                        name="classes"
                        multiple
                        required
                        className="w-full min-h-[180px] px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                      >
                        {classes.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>

                      <p className="text-xs text-[#6B7280] mt-2">
                        Hold Ctrl (Windows) or Command (Mac) to select multiple
                        classes.
                      </p>
                    </div>

                    {/* Subjects */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                        Subjects You Can Teach *
                      </label>

                      <select
                        name="subjects"
                        multiple
                        required
                        className="w-full min-h-[180px] px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                      >
                        {subjects.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>

                      <p className="text-xs text-[#6B7280] mt-2">
                        Select all subjects you are comfortable teaching.
                      </p>
                    </div>

                    {/* Board */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                        Boards / Curriculum *
                      </label>

                      <select
                        name="boards"
                        multiple
                        required
                        className="w-full min-h-[130px] px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                      >
                        {boards.map((board) => (
                          <option key={board} value={board}>
                            {board}
                          </option>
                        ))}
                      </select>

                      <p className="text-xs text-[#6B7280] mt-2">
                        Select all boards you can teach.
                      </p>
                    </div>

                    {/* English */}
                    <div>
                      <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                        English Fluency
                      </label>

                      <select
                        name="englishFluency"
                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select your English fluency
                        </option>

                        {englishLevels.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* =====================================================
                      LOCATION & MODE
                  ====================================================== */}

                  <div>
                    <h3 className="text-lg font-bold text-[#0D1118] mb-5">
                      Teaching Preferences
                    </h3>

                    <div className="space-y-5">

                      {/* Offline Areas */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Offline Teaching Areas *
                        </label>

                        <textarea
                          name="offlineTeachingAreas"
                          required
                          rows={3}
                          placeholder="e.g. Sector 44, Sector 50, Sector 62, Noida"
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors resize-none"
                        />

                        <p className="text-xs text-[#6B7280] mt-2">
                          Mention the sectors / areas where you are willing to
                          travel for home tuition.
                        </p>
                      </div>

                      {/* Mode */}
                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Preferred Teaching Mode *
                        </label>

                        <select
                          name="teachingMode"
                          required
                          defaultValue=""
                          className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] outline-none focus:border-[#0A6FF7] transition-colors"
                        >
                          <option value="" disabled>
                            Select teaching mode
                          </option>

                          <option value="home">Home Tuition</option>
                          <option value="online">Online Tuition</option>
                          <option value="both">Home + Online</option>
                        </select>
                      </div>

                    </div>
                  </div>

                  {/* =====================================================
                      SUBMIT
                  ====================================================== */}

                  <div className="pt-2">

                    <button
                      type="submit"
                      className="w-full bg-[#0A6FF7] text-white font-bold py-4 px-6 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Submit Tutor Registration
                    </button>

                    <p className="text-center text-xs text-[#6B7280] mt-4">
                      Our team will review your details and contact you after
                      submission.
                    </p>

                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
