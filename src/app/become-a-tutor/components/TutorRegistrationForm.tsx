'use client';

import React, { useState } from 'react';

const subjectOptions = [
  'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'Social Studies / History / Geography',
  'Accountancy', 'Economics', 'Business Studies',
  'Computer Science / Coding', 'IIT-JEE', 'NEET', 'Other',
];

const classOptions = [
  'Nursery – Class 5 (Primary)', 'Class 6 – Class 8 (Middle)',
  'Class 9 – Class 10 (Secondary)', 'Class 11 – Class 12 (Senior Secondary)',
  'Competitive Exams (IIT-JEE / NEET)', 'College / Graduation',
];

const qualificationOptions = [
  'Currently Pursuing Graduation', 'Graduate (B.A. / B.Sc. / B.Com / BCA)',
  'Post Graduate (M.A. / M.Sc. / M.Com / MCA)', 'B.Tech / B.E.',
  'M.Tech / M.E.', 'B.Ed / M.Ed', 'PhD / Research Scholar',
  'Other Professional Degree',
];

const areaOptions = [
  'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi',
  'Dwarka', 'Rohini', 'Pitampura', 'Janakpuri', 'Lajpat Nagar',
  'Noida (Sector 1–50)', 'Noida (Sector 51–100)', 'Greater Noida',
  'Gurugram', 'Faridabad', 'Ghaziabad', 'Other',
];

const experienceOptions = [
  'Less than 1 year', '1–2 years', '3–5 years', '5–10 years', 'More than 10 years',
];

interface TutorFormData {
  fullName: string;
  phone: string;
  email: string;
  qualification: string;
  experience: string;
  subjects: string[];
  classLevels: string[];
  preferredAreas: string[];
  about: string;
}

const initialForm: TutorFormData = {
  fullName: '',
  phone: '',
  email: '',
  qualification: '',
  experience: '',
  subjects: [],
  classLevels: [],
  preferredAreas: [],
  about: '',
};

function MultiSelect({
  label,
  options,
  selected,
  onChange,
  error,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
  error?: string;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 min-h-[36px] ${
              selected.includes(opt)
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:border-primary hover:text-primary'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default function TutorRegistrationForm() {
  const [form, setForm] = useState<TutorFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof TutorFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TutorFormData, string>> = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone.trim()))
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number';
    if (!form.qualification) newErrors.qualification = 'Please select your qualification';
    if (!form.experience) newErrors.experience = 'Please select your experience';
    if (form.subjects.length === 0) newErrors.subjects = 'Please select at least one subject';
    if (form.classLevels.length === 0) newErrors.classLevels = 'Please select at least one class level';
    if (form.preferredAreas.length === 0) newErrors.preferredAreas = 'Please select at least one area';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof TutorFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleMultiChange = (field: keyof TutorFormData, value: string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    // Mock submit — connect to CRM / Google Sheets / WhatsApp API here
    await new Promise((res) => setTimeout(res, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="register" className="py-20 bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="font-display text-3xl text-foreground mb-4">
            Registration received!
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-md mx-auto">
            Thank you, <strong className="text-foreground">{form.fullName}</strong>. Our team will review your profile and contact you at <strong className="text-foreground">{form.phone}</strong> within 24–48 hours to complete your verification.
          </p>
          <a
            href={`https://wa.me/919999000000?text=Hi%20TutorWave%2C%20I%20just%20registered%20as%20a%20tutor.%20My%20name%20is%20${encodeURIComponent(form.fullName)}`}
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
    <section id="register" className="py-12 md:py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-3xl p-6 md:p-10">
              <h2 className="font-display text-2xl text-foreground mb-2">Tutor Registration Form</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill in your details and our team will get in touch to complete your verification.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Vikram Nair"
                      value={form.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="form-label">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      maxLength={10}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">Email Address (optional)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>

                {/* Qualification + Experience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">
                      Highest Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="form-input"
                      value={form.qualification}
                      onChange={(e) => handleChange('qualification', e.target.value)}
                    >
                      <option value="">Select qualification</option>
                      {qualificationOptions.map((q) => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                    {errors.qualification && <p className="text-xs text-red-500 mt-1">{errors.qualification}</p>}
                  </div>
                  <div>
                    <label className="form-label">
                      Teaching Experience <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="form-input"
                      value={form.experience}
                      onChange={(e) => handleChange('experience', e.target.value)}
                    >
                      <option value="">Select experience</option>
                      {experienceOptions.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience}</p>}
                  </div>
                </div>

                {/* Subjects */}
                <MultiSelect
                  label={
                    <>
                      Subjects You Teach <span className="text-red-500">*</span>
                    </> as unknown as string
                  }
                  options={subjectOptions}
                  selected={form.subjects}
                  onChange={(v) => handleMultiChange('subjects', v)}
                  error={errors.subjects}
                />

                {/* Class Levels */}
                <MultiSelect
                  label={
                    <>
                      Class Levels You Teach <span className="text-red-500">*</span>
                    </> as unknown as string
                  }
                  options={classOptions}
                  selected={form.classLevels}
                  onChange={(v) => handleMultiChange('classLevels', v)}
                  error={errors.classLevels}
                />

                {/* Preferred Areas */}
                <MultiSelect
                  label={
                    <>
                      Preferred Teaching Areas in Delhi NCR <span className="text-red-500">*</span>
                    </> as unknown as string
                  }
                  options={areaOptions}
                  selected={form.preferredAreas}
                  onChange={(v) => handleMultiChange('preferredAreas', v)}
                  error={errors.preferredAreas}
                />

                {/* About */}
                <div>
                  <label className="form-label">Brief Introduction (optional)</label>
                  <textarea
                    className="form-input resize-none"
                    rows={3}
                    placeholder="Tell us a bit about your teaching style, strengths, and experience..."
                    value={form.about}
                    onChange={(e) => handleChange('about', e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center text-base"
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
                      Submit Registration
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to TutorWave&apos;s terms. Your information is kept confidential.
                </p>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">
              <h3 className="font-display text-lg text-[#0D1118] mb-4">What happens after you register?</h3>
              <ol className="space-y-5">
                {[
                  { step: '01', text: 'Our team reviews your profile within 24–48 hours' },
                  { step: '02', text: 'We call you to complete a brief verification interview' },
                  { step: '03', text: 'Your profile is activated in our tutor network' },
                  { step: '04', text: 'We start sending you relevant parent enquiries in your area' },
                ].map((item) => (
                  <li key={item.step} className="flex gap-4">
                    <span className="font-display text-lg font-bold text-[#0A6FF7] flex-shrink-0 w-8">{item.step}</span>
                    <span className="text-sm text-[#6B7280] leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl p-6 text-white" style={{ backgroundColor: '#0D1118' }}>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">Questions?</div>
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                Prefer to talk first? Message us on WhatsApp and we will answer all your questions.
              </p>
              <a
                href="https://wa.me/919999000000?text=Hi%20TutorWave%2C%20I%20am%20interested%20in%20joining%20as%20a%20tutor"
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

            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">
              <div className="font-display text-2xl font-bold text-[#0A6FF7] mb-1">2,400+</div>
              <div className="text-sm font-semibold text-[#0D1118] mb-1">Tutors already on TutorWave</div>
              <div className="text-xs text-[#6B7280]">across Delhi, Noida, Gurugram, Faridabad and Ghaziabad</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}