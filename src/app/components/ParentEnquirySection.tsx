'use client';

import React, { useState } from 'react';

const classes = [
  'Nursery / KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10',
  'Class 11', 'Class 12', 'College / Graduation', 'Competitive Exam',
];

const subjects = [
  'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'Social Studies', 'Accountancy', 'Economics',
  'Business Studies', 'Computer Science', 'IIT-JEE Preparation', 'NEET Preparation', 'Other',
];

const boards = ['CBSE', 'ICSE', 'IB', 'State Board', 'Other / Not Sure'];

const locations = [
  'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi', 'Dwarka',
  'Rohini', 'Janakpuri', 'Pitampura', 'Lajpat Nagar',
  'Noida', 'Greater Noida', 'Gurugram', 'Faridabad', 'Ghaziabad', 'Other',
];

const days = ['Weekdays', 'Weekends', 'Both'];
const timings = ['Morning (6am–10am)', 'Afternoon (12pm–4pm)', 'Evening (4pm–8pm)', 'Flexible'];
const genderPrefs = ['No Preference', 'Male Tutor', 'Female Tutor'];

interface FormData {
  parentName: string;
  phone: string;
  studentClass: string;
  subject: string;
  board: string;
  location: string;
  mode: string;
  days: string;
  timing: string;
  genderPref: string;
  notes: string;
}

const initial: FormData = {
  parentName: '', phone: '', studentClass: '', subject: '',
  board: '', location: '', mode: '', days: '', timing: '', genderPref: '', notes: '',
};

const trustPoints = [
  'Tutors reviewed before connecting with parents',
  'Matched based on class, subject, location & schedule',
  'Home & online options available',
  'Free matching — no charges to find a tutor',
];

const inputClass = 'w-full px-3.5 py-2.5 text-sm text-[#0D1118] bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10 transition-all duration-200 placeholder:text-[#9CA3AF]';
const labelClass = 'block text-xs font-semibold text-[#374151] mb-1.5';

export default function ParentEnquirySection() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.parentName.trim()) e.parentName = 'Required';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = 'Enter valid 10-digit number';
    if (!form.studentClass) e.studentClass = 'Required';
    if (!form.subject) e.subject = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const set = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section id="enquiry" className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

          {/* Left — Headline + Trust (2/5 width) */}
          <div className="lg:col-span-2 lg:sticky lg:top-24">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
              For Parents
            </span>
            <h2
              className="font-sans font-bold text-[#0D1118] mb-3 leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.025em' }}
            >
              Looking for a tutor?
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed mb-8">
              Tell us what your child needs and we&apos;ll help you find suitable tutor options.
            </p>

            {/* Trust Points */}
            <div className="space-y-3 mb-8">
              {trustPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0C8F81" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-[#374151] leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            {/* Subtle badge */}
            <div className="inline-flex items-center gap-3 bg-white border border-[#E5E7EB] rounded-2xl px-4 py-3">
              <div className="w-8 h-8 rounded-xl bg-[#EBF4FF] flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A6FF7" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0D1118]">Verified Tutor Network</div>
                <div className="text-xs text-[#6B7280]">Delhi NCR</div>
              </div>
            </div>
          </div>

          {/* Right — Form (3/5 width) */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-8 md:p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-[#E6F7F5] flex items-center justify-center mx-auto mb-5">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0C8F81" strokeWidth="2.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-sans font-bold text-xl text-[#0D1118] mb-3">Requirement Received!</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed max-w-sm mx-auto">
                  Our team will review your requirement and reach out to help you find suitable tutor options.
                </p>
              </div>
            ) : (
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Parent Name <span className="text-[#D6041A]">*</span></label>
                      <input
                        type="text"
                        className={`${inputClass} ${errors.parentName ? 'border-[#D6041A] focus:border-[#D6041A] focus:ring-[#D6041A]/10' : ''}`}
                        placeholder="Your name"
                        value={form.parentName}
                        onChange={(e) => set('parentName', e.target.value)}
                      />
                      {errors.parentName && <p className="text-xs text-[#D6041A] mt-1">{errors.parentName}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number <span className="text-[#D6041A]">*</span></label>
                      <input
                        type="tel"
                        className={`${inputClass} ${errors.phone ? 'border-[#D6041A] focus:border-[#D6041A] focus:ring-[#D6041A]/10' : ''}`}
                        placeholder="10-digit mobile"
                        value={form.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        maxLength={10}
                      />
                      {errors.phone && <p className="text-xs text-[#D6041A] mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Row 2: Class + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Student Class <span className="text-[#D6041A]">*</span></label>
                      <select
                        className={`${inputClass} ${errors.studentClass ? 'border-[#D6041A]' : ''}`}
                        value={form.studentClass}
                        onChange={(e) => set('studentClass', e.target.value)}
                      >
                        <option value="">Select class</option>
                        {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      {errors.studentClass && <p className="text-xs text-[#D6041A] mt-1">{errors.studentClass}</p>}
                    </div>
                    <div>
                      <label className={labelClass}>Subject <span className="text-[#D6041A]">*</span></label>
                      <select
                        className={`${inputClass} ${errors.subject ? 'border-[#D6041A]' : ''}`}
                        value={form.subject}
                        onChange={(e) => set('subject', e.target.value)}
                      >
                        <option value="">Select subject</option>
                        {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.subject && <p className="text-xs text-[#D6041A] mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  {/* Row 3: Board + Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Board</label>
                      <select className={inputClass} value={form.board} onChange={(e) => set('board', e.target.value)}>
                        <option value="">Select board</option>
                        {boards.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Location</label>
                      <select className={inputClass} value={form.location} onChange={(e) => set('location', e.target.value)}>
                        <option value="">Select area</option>
                        {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Mode + Days */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Home / Online</label>
                      <select className={inputClass} value={form.mode} onChange={(e) => set('mode', e.target.value)}>
                        <option value="">Select preference</option>
                        <option value="Home">Home Tuition</option>
                        <option value="Online">Online Classes</option>
                        <option value="Both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Preferred Days</label>
                      <select className={inputClass} value={form.days} onChange={(e) => set('days', e.target.value)}>
                        <option value="">Select days</option>
                        {days.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Timing + Gender Pref */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Preferred Time</label>
                      <select className={inputClass} value={form.timing} onChange={(e) => set('timing', e.target.value)}>
                        <option value="">Select timing</option>
                        {timings.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Tutor Gender Preference</label>
                      <select className={inputClass} value={form.genderPref} onChange={(e) => set('genderPref', e.target.value)}>
                        <option value="">Select preference</option>
                        {genderPrefs.map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Additional Requirement */}
                  <div>
                    <label className={labelClass}>Additional Requirement</label>
                    <textarea
                      className={`${inputClass} resize-none`}
                      rows={3}
                      placeholder="Any specific requirements or details..."
                      value={form.notes}
                      onChange={(e) => set('notes', e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-300 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed min-h-[50px]"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get a Tutor
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
