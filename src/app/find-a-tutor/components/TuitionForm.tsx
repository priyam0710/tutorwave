'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';

const classOptions = [
  'Nursery',
  'KG',
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
  'IIT-JEE',
  'NEET',
  'Other',
];

const subjectOptions = [
  'All Subjects',
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Science',
  'Computer Science',
  'Economics',
  'Accountancy',
  'Business Studies',
  'Political Science',
  'History',
  'Geography',
  'Other',
];

const boardOptions = [
  'CBSE',
  'ICSE',
  'IB',
  'IGCSE',
  'State Board',
  'NIOS',
  'Other',
];

const modeOptions = [
  'Home Tuition',
  'Online Classes',
  'Both',
];

const genderOptions = [
  'Any',
  'Male',
  'Female',
];

const classesPerWeekOptions = [
  '2 classes',
  '3 classes',
  '4 classes',
  '5 classes',
  '6 classes',
];

const timeOptions = [
  'Morning',
  'Afternoon',
  'Evening',
  'Flexible',
];

export default function FindATutorPage() {
  const [step, setStep] = useState(1);

  // -----------------------------
  // STEP 1 — STUDENT DETAILS
  // -----------------------------

  const [studentClass, setStudentClass] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [board, setBoard] = useState('');

  // -----------------------------
  // STEP 2 — LEARNING REQUIREMENTS
  // -----------------------------

  const [location, setLocation] = useState('');
  const [mode, setMode] = useState('');
  const [preferredGender, setPreferredGender] = useState('');
  const [classesPerWeek, setClassesPerWeek] = useState('');
  const [preferredTime, setPreferredTime] = useState('');

  // -----------------------------
  // STEP 3 — PARENT CONTACT
  // -----------------------------

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // --------------------------------
  // SUBJECT MULTI SELECT
  // --------------------------------

  const toggleSubject = (subject: string) => {
    setSubjects((current) => {
      if (current.includes(subject)) {
        return current.filter((item) => item !== subject);
      }

      return [...current, subject];
    });
  };

  // --------------------------------
  // STEP VALIDATION
  // --------------------------------

  const handleStepOne = () => {
    setError('');

    if (!studentClass) {
      setError('Please select the student’s class.');
      return;
    }

    if (subjects.length === 0) {
      setError('Please select at least one subject.');
      return;
    }

    setStep(2);
  };

  const handleStepTwo = () => {
    setError('');

    if (!location.trim()) {
      setError('Please enter your location.');
      return;
    }

    if (!mode) {
      setError('Please select your preferred learning mode.');
      return;
    }

    setStep(3);
  };

  // --------------------------------
  // FINAL SUBMISSION
  // --------------------------------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!parentName.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    /*
     * THIS IS YOUR CRM-READY DATA OBJECT.
     *
     * Keep these field names fixed.
     * Later, this exact object can be sent to:
     * - Your CRM
     * - MongoDB
     * - Supabase
     * - Google Sheets
     * - WhatsApp automation
     * - Your own API
     */

    const enquiryData = {
      studentClass,
      subjects,
      board,

      location,
      mode,
      preferredGender,
      classesPerWeek,
      preferredTime,

      parentName,
      phone,
      email,
      additionalRequirements,

      // Useful for CRM tracking
      source: 'website',
      enquiryType: 'parent_tutor_requirement',

      // Timestamp
      submittedAt: new Date().toISOString(),
    };

    console.log('TUTORWAVE ENQUIRY:', enquiryData);

    /*
     * LATER:
     *
     * Replace the console.log above with:
     *
     * await fetch('/api/enquiries', {
     *   method: 'POST',
     *   headers: {
     *     'Content-Type': 'application/json',
     *   },
     *   body: JSON.stringify(enquiryData),
     * });
     */

    setSubmitted(true);
  };

  // --------------------------------
  // SUCCESS SCREEN
  // --------------------------------

  if (submitted) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <section className="py-24 px-4">
          <div className="max-w-xl mx-auto text-center">

            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#EBF4FF] flex items-center justify-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#0A6FF7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0D1118] mb-4">
              Your requirement has been received
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              Thank you for choosing TutorWave. Our team will review your
              requirement and get in touch with you shortly.
            </p>

            <a
              href="/"
              className="inline-flex items-center justify-center bg-[#0A6FF7] text-white font-bold px-7 py-3 rounded-xl hover:bg-[#0858C8] transition"
            >
              Back to Home
            </a>

          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* HERO */}
    
      {/* FORM */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_400px] gap-10">

            {/* MAIN FORM */}
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-6 sm:p-10">

              {/* PROGRESS */}
              <div className="flex items-center mb-10">

                {[1, 2, 3].map((item) => (
                  <React.Fragment key={item}>

                    <div className="flex flex-col items-center">

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                          step >= item
                            ? 'bg-[#0A6FF7] text-white'
                            : 'bg-[#E5E7EB] text-[#6B7280]'
                        }`}
                      >
                        {item}
                      </div>

                      <span
                        className={`mt-2 text-xs ${
                          step >= item
                            ? 'text-[#0A6FF7] font-medium'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        {item === 1
                          ? 'Student Details'
                          : item === 2
                          ? 'Learning Requirements'
                          : 'Parent Contact'}
                      </span>

                    </div>

                    {item !== 3 && (
                      <div
                        className={`flex-1 h-px mx-4 ${
                          step > item
                            ? 'bg-[#0A6FF7]'
                            : 'bg-[#E5E7EB]'
                        }`}
                      />
                    )}

                  </React.Fragment>
                ))}

              </div>

              {/* ERROR */}
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* -------------------------------- */}
              {/* STEP 1 */}
              {/* -------------------------------- */}

              {step === 1 && (
                <div>

                  <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                    Student Details
                  </h2>

                  <p className="text-[#6B7280] mb-8">
                    Tell us about the student who needs tuition.
                  </p>

                  {/* CLASS */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Student&apos;s Class <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl text-[#0D1118] outline-none focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10"
                    >
                      <option value="">Select class</option>

                      {classOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* SUBJECTS */}
                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Subject(s) Needed <span className="text-red-500">*</span>
                    </label>

                    <p className="text-xs text-[#6B7280] mb-3">
                      Select all subjects you need help with.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

                      {subjectOptions.map((subject) => {

                        const selected = subjects.includes(subject);

                        return (
                          <button
                            key={subject}
                            type="button"
                            onClick={() => toggleSubject(subject)}
                            className={`text-left px-3 py-2.5 rounded-lg border text-sm transition ${
                              selected
                                ? 'border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7] font-medium'
                                : 'border-[#D9DEE7] bg-white text-[#374151] hover:border-[#0A6FF7]'
                            }`}
                          >
                            {selected ? '✓ ' : ''}
                            {subject}
                          </button>
                        );
                      })}

                    </div>

                  </div>

                  {/* BOARD */}
                  <div className="mb-8">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Board / Curriculum
                    </label>

                    <select
                      value={board}
                      onChange={(e) => setBoard(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl text-[#0D1118] outline-none focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10"
                    >
                      <option value="">Select board</option>

                      {boardOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>

                  </div>

                  <button
                    type="button"
                    onClick={handleStepOne}
                    className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858C8] transition"
                  >
                    Continue
                    <span>→</span>
                  </button>

                </div>
              )}

              {/* -------------------------------- */}
              {/* STEP 2 */}
              {/* -------------------------------- */}

              {step === 2 && (
                <div>

                  <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                    Learning Requirements
                  </h2>

                  <p className="text-[#6B7280] mb-8">
                    Help us understand where and when you need classes.
                  </p>

                  {/* LOCATION */}
                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Sector 137, Noida"
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10"
                    />

                  </div>

                  {/* MODE */}
                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Preferred Mode <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                      {modeOptions.map((item) => (

                        <button
                          type="button"
                          key={item}
                          onClick={() => setMode(item)}
                          className={`px-4 py-3 rounded-xl border text-sm font-medium transition ${
                            mode === item
                              ? 'border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7]'
                              : 'border-[#D9DEE7] bg-white text-[#374151]'
                          }`}
                        >
                          {item}
                        </button>

                      ))}

                    </div>

                  </div>

                  {/* GENDER */}
                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Preferred Tutor Gender
                    </label>

                    <select
                      value={preferredGender}
                      onChange={(e) => setPreferredGender(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    >
                      <option value="">No preference</option>

                      {genderOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}

                    </select>

                  </div>

                  {/* CLASSES PER WEEK */}
                  <div className="mb-6">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Classes per Week
                    </label>

                    <select
                      value={classesPerWeek}
                      onChange={(e) => setClassesPerWeek(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    >
                      <option value="">Select frequency</option>

                      {classesPerWeekOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}

                    </select>

                  </div>

                  {/* TIME */}
                  <div className="mb-8">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Preferred Time
                    </label>

                    <select
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    >
                      <option value="">Select preferred time</option>

                      {timeOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3.5 rounded-xl border border-[#D9DEE7] bg-white font-semibold text-[#374151]"
                    >
                      Back
                    </button>

                    <button
                      type="button"
                      onClick={handleStepTwo}
                      className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold px-7 py-3.5 rounded-xl hover:bg-[#0858C8] transition"
                    >
                      Continue
                      <span>→</span>
                    </button>

                  </div>

                </div>
              )}

              {/* -------------------------------- */}
              {/* STEP 3 */}
              {/* -------------------------------- */}

              {step === 3 && (
                <form onSubmit={handleSubmit}>

                  <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                    Your Contact Details
                  </h2>

                  <p className="text-[#6B7280] mb-8">
                    Where can our team reach you?
                  </p>

                  {/* NAME */}
                  <div className="mb-5">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    />

                  </div>

                  {/* PHONE */}
                  <div className="mb-5">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                      }
                      placeholder="10-digit mobile number"
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    />

                  </div>

                  {/* EMAIL */}
                  <div className="mb-5">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none focus:border-[#0A6FF7]"
                    />

                  </div>

                  {/* ADDITIONAL REQUIREMENTS */}
                  <div className="mb-8">

                    <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                      Anything else we should know?
                    </label>

                    <textarea
                      value={additionalRequirements}
                      onChange={(e) =>
                        setAdditionalRequirements(e.target.value)
                      }
                      placeholder="Optional — e.g. specific tutor requirement, exam preparation, etc."
                      rows={4}
                      className="w-full px-4 py-3.5 bg-white border border-[#D9DEE7] rounded-xl outline-none resize-none focus:border-[#0A6FF7]"
                    />

                  </div>

                  <div className="flex gap-3">

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3.5 rounded-xl border border-[#D9DEE7] bg-white font-semibold text-[#374151]"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#0858C8] transition"
                    >
                      Submit Requirement
                      <span>→</span>
                    </button>

                  </div>

                </form>
              )}

            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">

              <div className="bg-[#EBF4FF] border border-[#C8DEFF] rounded-3xl p-7">

                <h2 className="text-xl font-bold text-[#0D1118] mb-5">
                  Why parents trust us
                </h2>

                <div className="space-y-4">

                  {[
                    'Tutors reviewed before connecting with parents',
                    'Matched based on class, subject, area & schedule',
                    'Free matching — no charges to find a tutor',
                    'Home & online options available',
                    'Support throughout the tuition process',
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex gap-3 text-[#6B7280]"
                    >
                      <span className="text-[#0A6FF7] font-bold">
                        ✓
                      </span>

                      <span className="text-sm leading-relaxed">
                        {item}
                      </span>
                    </div>

                  ))}

                </div>

              </div>

              <div className="bg-[#0D1118] rounded-3xl p-7">

                <p className="text-xs font-bold tracking-widest text-[#9CA3AF] mb-3">
                  PREFER WHATSAPP?
                </p>

                <p className="text-white leading-relaxed mb-6">
                  Message us directly and our team will help you with your requirement.
                </p>

                <a
                  href="https://wa.me/918588879239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-[#0A6FF7] font-bold py-3.5 rounded-xl hover:bg-[#F8FAFC] transition"
                >
                  Chat on WhatsApp
                </a>

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
