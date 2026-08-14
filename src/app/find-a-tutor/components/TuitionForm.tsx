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

const timings = ['Morning (6am–10am)', 'Afternoon (12pm–4pm)', 'Evening (4pm–8pm)', 'Flexible'];
const genderPrefs = ['No Preference', 'Male Tutor', 'Female Tutor'];

interface Step1 { studentClass: string; subject: string; board: string; }
interface Step2 { location: string; mode: string; timing: string; genderPref: string; notes: string; }
interface Step3 { parentName: string; phone: string; }

type FormData = Step1 & Step2 & Step3;

const initial: FormData = {
  studentClass: '', subject: '', board: '',
  location: '', mode: '', timing: '', genderPref: '', notes: '',
  parentName: '', phone: '',
};

const steps = [
  { label: 'Student Details', step: 1 },
  { label: 'Learning Requirements', step: 2 },
  { label: 'Parent Contact', step: 3 },
];

function ProgressBar({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        {steps.map((s, i) => (
          <React.Fragment key={s.step}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  current > s.step
                    ? 'bg-[#0C8F81] text-white'
                    : current === s.step
                    ? 'bg-[#0A6FF7] text-white'
                    : 'bg-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                {current > s.step ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                ) : (
                  s.step
                )}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${current === s.step ? 'text-[#0A6FF7]' : 'text-[#6B7280]'}`}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 rounded-full overflow-hidden bg-[#E5E7EB]">
                <div
                  className="h-full bg-[#0A6FF7] transition-all duration-500"
                  style={{ width: current > s.step ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="text-xs text-[#6B7280] text-center sm:hidden">{steps[current - 1]?.label}</p>
    </div>
  );
}

export default function TuitionForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.studentClass) e.studentClass = 'Please select a class';
    if (!form.subject) e.subject = 'Please select a subject';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<FormData> = {};
    if (!form.location) e.location = 'Please select your area';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Partial<FormData> = {};
    if (!form.parentName.trim()) e.parentName = 'Please enter your name';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      e.phone = 'Enter a valid 10-digit Indian mobile number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-[#E6F7F5] flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0C8F81" strokeWidth="2.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-sans font-bold text-2xl text-[#0D1118] mb-4">
            Requirement Submitted!
          </h2>
          <p className="text-base text-[#6B7280] leading-relaxed mb-8 max-w-md mx-auto">
            Our team will review your requirement and reach out to help you find suitable tutor options. You can also reach us directly on WhatsApp.
          </p>
          <a
            href={`https://wa.me/919999000000?text=Hi%20TutorWave%2C%20I%20just%20submitted%20a%20tuition%20requirement%20for%20${encodeURIComponent(form.subject)}%20in%20${encodeURIComponent(form.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Follow up on WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-3xl p-6 md:p-10">
              <ProgressBar current={step} />

              <form onSubmit={handleSubmit} noValidate>
                {/* Step 1: Student Details */}
                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-[#0D1118] mb-1">Student Details</h3>
                      <p className="text-sm text-[#6B7280] mb-6">Tell us about the student who needs tuition.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Student&apos;s Class <span className="text-[#D6041A]">*</span></label>
                        <select className={`form-input ${errors.studentClass ? 'border-[#D6041A]' : ''}`} value={form.studentClass} onChange={(e) => set('studentClass', e.target.value)}>
                          <option value="">Select class</option>
                          {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.studentClass && <p className="text-xs text-[#D6041A] mt-1">{errors.studentClass}</p>}
                      </div>
                      <div>
                        <label className="form-label">Subject Needed <span className="text-[#D6041A]">*</span></label>
                        <select className={`form-input ${errors.subject ? 'border-[#D6041A]' : ''}`} value={form.subject} onChange={(e) => set('subject', e.target.value)}>
                          <option value="">Select subject</option>
                          {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.subject && <p className="text-xs text-[#D6041A] mt-1">{errors.subject}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Board / Curriculum</label>
                      <select className="form-input" value={form.board} onChange={(e) => set('board', e.target.value)}>
                        <option value="">Select board</option>
                        {boards.map((b) => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div className="pt-2">
                      <button type="button" onClick={handleNext} className="btn-primary">
                        Continue
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Learning Requirements */}
                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-[#0D1118] mb-1">Learning Requirements</h3>
                      <p className="text-sm text-[#6B7280] mb-6">Help us understand your location and schedule preferences.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Your Area in Delhi NCR <span className="text-[#D6041A]">*</span></label>
                        <select className={`form-input ${errors.location ? 'border-[#D6041A]' : ''}`} value={form.location} onChange={(e) => set('location', e.target.value)}>
                          <option value="">Select area</option>
                          {locations.map((l) => <option key={l} value={l}>{l}</option>)}
                        </select>
                        {errors.location && <p className="text-xs text-[#D6041A] mt-1">{errors.location}</p>}
                      </div>
                      <div>
                        <label className="form-label">Home / Online</label>
                        <select className="form-input" value={form.mode} onChange={(e) => set('mode', e.target.value)}>
                          <option value="">Select preference</option>
                          <option value="Home">Home Tuition</option>
                          <option value="Online">Online Classes</option>
                          <option value="Both">Both</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Preferred Time</label>
                        <select className="form-input" value={form.timing} onChange={(e) => set('timing', e.target.value)}>
                          <option value="">Select timing</option>
                          {timings.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Tutor Gender Preference</label>
                        <select className="form-input" value={form.genderPref} onChange={(e) => set('genderPref', e.target.value)}>
                          <option value="">Select preference</option>
                          {genderPrefs.map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Additional Requirement</label>
                      <textarea
                        className="form-input resize-none"
                        rows={3}
                        placeholder="Any specific requirements, e.g. weak in algebra, prefer evenings..."
                        value={form.notes}
                        onChange={(e) => set('notes', e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={handleBack} className="btn-secondary">
                        Back
                      </button>
                      <button type="button" onClick={handleNext} className="btn-primary">
                        Continue
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Parent Contact */}
                {step === 3 && (
                  <div className="space-y-5">
                    <div>
                      <h3 className="font-sans font-semibold text-lg text-[#0D1118] mb-1">Parent Contact</h3>
                      <p className="text-sm text-[#6B7280] mb-6">We&apos;ll reach out to share suitable tutor options.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Your Name <span className="text-[#D6041A]">*</span></label>
                        <input
                          type="text"
                          className={`form-input ${errors.parentName ? 'border-[#D6041A]' : ''}`}
                          placeholder="e.g. Priya Sharma"
                          value={form.parentName}
                          onChange={(e) => set('parentName', e.target.value)}
                        />
                        {errors.parentName && <p className="text-xs text-[#D6041A] mt-1">{errors.parentName}</p>}
                      </div>
                      <div>
                        <label className="form-label">Mobile Number <span className="text-[#D6041A]">*</span></label>
                        <input
                          type="tel"
                          className={`form-input ${errors.phone ? 'border-[#D6041A]' : ''}`}
                          placeholder="10-digit mobile number"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          maxLength={10}
                        />
                        {errors.phone && <p className="text-xs text-[#D6041A] mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={handleBack} className="btn-secondary">
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Tuition Requirement
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-[#6B7280]">
                      By submitting, you agree to be contacted by TutorWave. We never share your details.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Sidebar Trust */}
          <div className="space-y-5">
            <div className="bg-[#EBF4FF]/60 border border-[#BFDBFE] rounded-3xl p-6">
              <h3 className="font-sans font-semibold text-base text-[#0D1118] mb-4">Why parents trust us</h3>
              <ul className="space-y-3">
                {[
                  'Tutors reviewed before connecting with parents',
                  'Matched based on class, subject, area & schedule',
                  'Free matching — no charges to find a tutor',
                  'Home & online options available',
                  'Support throughout the tuition process',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="text-[#0A6FF7] font-bold flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-[#6B7280]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl p-6 text-white" style={{ backgroundColor: '#0D1118' }}>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Prefer WhatsApp?</div>
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                Message us directly and we&apos;ll help you find the right tutor in a conversation.
              </p>
              <a
                href="https://wa.me/919999000000?text=Hi%20TutorWave%2C%20I%20need%20a%20home%20tutor%20in%20Delhi%20NCR"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white text-sm justify-center w-full"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}