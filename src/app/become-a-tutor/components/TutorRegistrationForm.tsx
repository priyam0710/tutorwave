'use client';

import React, { useState } from 'react';

type FormData = {
  personal: {
    fullName: string;
    age: string;
    gender: string;
    phone: string;
    email: string;
    address: string;
  };

  education: {
    highestQualification: string;
    stream: string;
    schoolingFrom: string;
    college: string;
    additionalQualification: string;
  };

  teaching: {
    experience: string;
    schoolExperience: string;
    studentsTaughtFrom: string;
    boards: string[];

    primaryClasses: string[];
    primaryAllSubjects: boolean;
    primarySubjects: string[];

    secondaryClasses: string[];
    secondarySubjects: string[];

    seniorSecondaryClasses: string[];
    seniorSecondarySubjects: string[];

    englishFluency: string;
  };

  preferences: {
    teachingMode: string[];
    offlineAreas: string;
    availability: string[];
    studentTypes: string[];
  };
};

const initialFormData: FormData = {
  personal: {
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
  },

  education: {
    highestQualification: '',
    stream: '',
    schoolingFrom: '',
    college: '',
    additionalQualification: '',
  },

  teaching: {
    experience: '',
    schoolExperience: '',
    studentsTaughtFrom: '',
    boards: [],

    primaryClasses: [],
    primaryAllSubjects: false,
    primarySubjects: [],

    secondaryClasses: [],
    secondarySubjects: [],

    seniorSecondaryClasses: [],
    seniorSecondarySubjects: [],

    englishFluency: '',
  },

  preferences: {
    teachingMode: [],
    offlineAreas: '',
    availability: [],
    studentTypes: [],
  },
};

const primaryClasses = [
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
];

const secondaryClasses = ['Class 9', 'Class 10'];

const seniorSecondaryClasses = ['Class 11', 'Class 12'];

const primarySubjects = [
  'Mathematics',
  'Science',
  'English',
  'Hindi',
  'Social Science',
  'Environmental Studies',
  'Computer',
  'General Studies',
];

const secondarySubjects = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Hindi',
  'Computer',
];

const seniorSecondarySubjects = [
  'Physics',
  'Chemistry',
  'Mathematics',
  'Biology',
  'English',
  'Accountancy',
  'Economics',
  'Business Studies',
  'Political Science',
  'History',
  'Geography',
  'Psychology',
  'Computer Science',
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

const availabilityOptions = [
  'Morning',
  'Afternoon',
  'Evening',
  'Flexible',
];

const studentTypes = [
  'School Students',
  'College Students',
  'Competitive Exam Students',
];

export default function TutorRegistrationForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] =
    useState<FormData>(initialFormData);

  const totalSteps = 5;

  const updatePersonal = (
    field: keyof FormData['personal'],
    value: string
  ) => {
    let sanitizedValue = value;

    // Age: digits only, no negative sign, no decimals
    if (field === 'age') {
      sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 2);
    }

    // Phone: digits only, capped at 10 digits
    if (field === 'phone') {
      sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: sanitizedValue,
      },
    }));
  };

  const updateEducation = (
    field: keyof FormData['education'],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  const updateTeaching = (
    field: keyof FormData['teaching'],
    value:
      | string
      | boolean
      | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      teaching: {
        ...prev.teaching,
        [field]: value,
      },
    }));
  };

  const updatePreferences = (
    field: keyof FormData['preferences'],
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  const toggleArrayValue = (
    section: 'teaching' | 'preferences',
    field: string,
    value: string
  ) => {
    setFormData((prev) => {
      const currentSection = prev[section] as Record<
        string,
        unknown
      >;

      const currentValues = Array.isArray(
        currentSection[field]
      )
        ? (currentSection[field] as string[])
        : [];

      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(
            (item) => item !== value
          )
        : [...currentValues, value];

      return {
        ...prev,
        [section]: {
          ...currentSection,
          [field]: updatedValues,
        },
      } as FormData;
    });
  };

  const togglePrimaryAllSubjects = () => {
    setFormData((prev) => ({
      ...prev,
      teaching: {
        ...prev.teaching,
        primaryAllSubjects:
          !prev.teaching.primaryAllSubjects,
        primarySubjects:
          !prev.teaching.primaryAllSubjects
            ? []
            : prev.teaching.primarySubjects,
      },
    }));
  };

  const validateStep = () => {
    if (step === 1) {
      const { fullName, age, gender, phone, address } =
        formData.personal;

      if (
        !fullName.trim() ||
        !age.trim() ||
        !gender ||
        !phone.trim() ||
        !address.trim()
      ) {
        alert(
          'Please fill in all required personal details (Full Name, Age, Gender, Phone Number and Address).'
        );
        return false;
      }

      const ageNumber = Number(age);

      if (
        !Number.isFinite(ageNumber) ||
        ageNumber <= 0 ||
        ageNumber < 18
      ) {
        alert(
          'Please enter a valid age. Age must be 18 or above and cannot be negative or zero.'
        );
        return false;
      }

      if (!/^[6-9]\d{9}$/.test(phone.trim())) {
        alert(
          'Please enter a valid 10-digit mobile number (must start with 6, 7, 8 or 9).'
        );
        return false;
      }
    }

    if (step === 2) {
      const {
        highestQualification,
        stream,
        schoolingFrom,
        college,
      } = formData.education;

      if (
        !highestQualification ||
        !stream.trim() ||
        !schoolingFrom.trim() ||
        !college.trim()
      ) {
        alert(
          'Please fill in all required education details (Highest Qualification, Stream, Schooling From and College/University).'
        );
        return false;
      }
    }

    if (step === 3) {
      const t = formData.teaching;

      const hasAnyClass =
        t.primaryClasses.length > 0 ||
        t.secondaryClasses.length > 0 ||
        t.seniorSecondaryClasses.length >
          0;

      const hasAnySubject =
        t.primaryAllSubjects ||
        t.primarySubjects.length > 0 ||
        t.secondarySubjects.length > 0 ||
        t.seniorSecondarySubjects
          .length > 0;

      if (
        !t.experience ||
        !t.englishFluency ||
        !t.schoolExperience ||
        !t.studentsTaughtFrom.trim() ||
        t.boards.length === 0
      ) {
        alert(
          'Please fill in all required teaching profile details (Experience, English Fluency, School/Coaching Experience, Students Taught From and Boards).'
        );
        return false;
      }

      if (!hasAnyClass || !hasAnySubject) {
        alert(
          'Please select at least one class and one subject you can teach.'
        );
        return false;
      }
    }

    if (step === 4) {
      const p = formData.preferences;

      if (
        p.teachingMode.length === 0 ||
        !p.offlineAreas.trim() ||
        p.availability.length === 0 ||
        p.studentTypes.length === 0
      ) {
        alert(
          'Please fill in all required teaching preference details (Teaching Mode, Offline Teaching Areas, Availability and Student Type).'
        );
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < totalSteps) {
      setStep(step + 1);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleSubmit = () => {
    console.log(
      'Tutor Registration:',
      formData
    );

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-sm text-center">
        <div className="w-16 h-16 rounded-full bg-[#E8F7F1] text-[#0C8F81] flex items-center justify-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-[#0D1118] mb-3">
          Profile submitted successfully!
        </h2>

        <p className="text-[#6B7280] leading-relaxed max-w-md mx-auto mb-8">
          Thank you for registering with TutorWave.
          Our team will review your profile and contact
          you regarding suitable tuition opportunities.
        </p>

        <button
          type="button"
          onClick={() => {
            setFormData(initialFormData);
            setStep(1);
            setSubmitted(false);
          }}
          className="px-6 py-3 rounded-xl bg-[#0A6FF7] text-white font-bold hover:opacity-90 transition"
        >
          Register Another Profile
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-3xl shadow-sm overflow-hidden">

      {/* HEADER */}
      <div className="p-6 sm:p-8 border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-1">
              TUTOR REGISTRATION
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0D1118]">
              {step === 1 && 'Personal Details'}
              {step === 2 && 'Education'}
              {step === 3 && 'Teaching Profile'}
              {step === 4 && 'Teaching Preferences'}
              {step === 5 && 'Review & Submit'}
            </h2>
          </div>

          <div className="text-sm text-[#6B7280] font-medium">
            {step} / {totalSteps}
          </div>
        </div>

        <div className="flex gap-2">
          {Array.from({
            length: totalSteps,
          }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full flex-1 ${
                index + 1 <= step
                  ? 'bg-[#0A6FF7]'
                  : 'bg-[#E5E7EB]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* FORM CONTENT */}
      <div className="p-6 sm:p-8">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-[#6B7280]">
              Let&apos;s start with a few basic details
              about you.
            </p>

            <InputField
              label="Full Name"
              required
              placeholder="Enter your full name"
              value={formData.personal.fullName}
              onChange={(value) =>
                updatePersonal(
                  'fullName',
                  value
                )
              }
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InputField
                label="Age"
                required
                type="number"
                min="18"
                placeholder="Your age"
                value={formData.personal.age}
                onChange={(value) =>
                  updatePersonal(
                    'age',
                    value
                  )
                }
              />

              <SelectField
                label="Gender"
                required
                placeholder="Select gender"
                value={formData.personal.gender}
                options={[
                  'Male',
                  'Female',
                ]}
                onChange={(value) =>
                  updatePersonal(
                    'gender',
                    value
                  )
                }
              />
            </div>

            <InputField
              label="Phone Number"
              required
              type="tel"
              maxLength={10}
              placeholder="10-digit mobile number"
              value={formData.personal.phone}
              onChange={(value) =>
                updatePersonal(
                  'phone',
                  value
                )
              }
            />

            <InputField
              label="Email Address"
              type="email"
              placeholder="yourname@example.com"
              value={formData.personal.email}
              onChange={(value) =>
                updatePersonal(
                  'email',
                  value
                )
              }
            />

            <TextAreaField
              label="Current Address"
              required
              placeholder="Enter your current address"
              value={formData.personal.address}
              onChange={(value) =>
                updatePersonal(
                  'address',
                  value
                )
              }
            />
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <p className="text-[#6B7280]">
              Tell us about your academic background.
            </p>

            <SelectField
              label="Highest Qualification"
              required
              placeholder="Select qualification"
              value={
                formData.education
                  .highestQualification
              }
              options={[
                '12th / Senior Secondary',
                'Diploma',
                'Bachelor’s Degree',
                'Master’s Degree',
                'M.Phil.',
                'Ph.D.',
                'Professional Qualification',
                'Other',
              ]}
              onChange={(value) =>
                updateEducation(
                  'highestQualification',
                  value
                )
              }
            />

            <InputField
              label="Qualification / Stream"
              required
              placeholder="e.g. B.Sc. Mathematics, B.Tech CSE"
              value={formData.education.stream}
              onChange={(value) =>
                updateEducation(
                  'stream',
                  value
                )
              }
            />

            <InputField
              label="Schooling From"
              required
              placeholder="School name"
              value={
                formData.education
                  .schoolingFrom
              }
              onChange={(value) =>
                updateEducation(
                  'schoolingFrom',
                  value
                )
              }
            />

            <InputField
              label="College / University"
              required
              placeholder="College or university name"
              value={
                formData.education.college
              }
              onChange={(value) =>
                updateEducation(
                  'college',
                  value
                )
              }
            />

            <TextAreaField
              label="Additional Qualifications"
              placeholder="Certifications, professional courses, competitive exams, etc."
              value={
                formData.education
                  .additionalQualification
              }
              onChange={(value) =>
                updateEducation(
                  'additionalQualification',
                  value
                )
              }
            />
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-8">
            <p className="text-[#6B7280]">
              Tell us exactly what you are comfortable
              teaching.
            </p>

            {/* EXPERIENCE */}
            <div>
              <FieldLabel
                label="Teaching Experience"
                required
              />

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Fresher',
                  '1–2 Years',
                  '3–5 Years',
                  '5–10 Years',
                  '10+ Years',
                ].map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    selected={
                      formData.teaching
                        .experience === item
                    }
                    onClick={() =>
                      updateTeaching(
                        'experience',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* ENGLISH */}
            <div>
              <FieldLabel label="English Fluency" required />

              <div className="grid grid-cols-2 gap-3">
                {[
                  'Basic',
                  'Conversational',
                  'Fluent',
                  'Highly Fluent',
                ].map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    selected={
                      formData.teaching
                        .englishFluency === item
                    }
                    onClick={() =>
                      updateTeaching(
                        'englishFluency',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* SCHOOL EXPERIENCE */}
            <div>
              <FieldLabel label="School / Coaching Experience" required />

              <div className="grid grid-cols-2 gap-3">
                {['Yes', 'No'].map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    selected={
                      formData.teaching
                        .schoolExperience === item
                    }
                    onClick={() =>
                      updateTeaching(
                        'schoolExperience',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <TextAreaField
              label="Students / Schools / Institutes Taught From"
              required
              placeholder="e.g. DPS, Ryan International, Allen, private students..."
              value={
                formData.teaching
                  .studentsTaughtFrom
              }
              onChange={(value) =>
                updateTeaching(
                  'studentsTaughtFrom',
                  value
                )
              }
            />

            {/* BOARDS */}
            <div>
              <FieldLabel label="Boards / Curriculam You Can Teach" required />

              <div className="flex flex-wrap gap-2">
                {boards.map((board) => (
                  <Chip
                    key={board}
                    label={board}
                    selected={formData.teaching.boards.includes(
                      board
                    )}
                    onClick={() =>
                      toggleArrayValue(
                        'teaching',
                        'boards',
                        board
                      )
                    }
                  />
                ))}
              </div>
            </div>

            {/* PRIMARY */}
            <TeachingLevelCard
              title="Nursery – Class 8"
              description="Select the classes and subjects you can teach."
              classes={primaryClasses}
              selectedClasses={
                formData.teaching.primaryClasses
              }
              subjects={primarySubjects}
              selectedSubjects={
                formData.teaching.primarySubjects
              }
              allSubjects={
                formData.teaching
                  .primaryAllSubjects
              }
              onClassToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'primaryClasses',
                  item
                )
              }
              onSubjectToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'primarySubjects',
                  item
                )
              }
              onAllSubjectsToggle={
                togglePrimaryAllSubjects
              }
              showAllSubjects
            />

            {/* SECONDARY */}
            <TeachingLevelCard
              title="Class 9 – Class 10"
              description="Select classes and subjects separately."
              classes={secondaryClasses}
              selectedClasses={
                formData.teaching.secondaryClasses
              }
              subjects={secondarySubjects}
              selectedSubjects={
                formData.teaching.secondarySubjects
              }
              onClassToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'secondaryClasses',
                  item
                )
              }
              onSubjectToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'secondarySubjects',
                  item
                )
              }
            />

            {/* SENIOR SECONDARY */}
            <TeachingLevelCard
              title="Class 11 – Class 12"
              description="Select classes and subjects separately."
              classes={seniorSecondaryClasses}
              selectedClasses={
                formData.teaching
                  .seniorSecondaryClasses
              }
              subjects={seniorSecondarySubjects}
              selectedSubjects={
                formData.teaching
                  .seniorSecondarySubjects
              }
              onClassToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'seniorSecondaryClasses',
                  item
                )
              }
              onSubjectToggle={(item) =>
                toggleArrayValue(
                  'teaching',
                  'seniorSecondarySubjects',
                  item
                )
              }
            />
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="space-y-8">
            <p className="text-[#6B7280]">
              Tell us where, when and how you would
              prefer to teach.
            </p>

            <div>
              <FieldLabel
                label="Teaching Mode"
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  'Home Tuition',
                  'Online',
                  'Both',
                ].map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    selected={formData.preferences.teachingMode.includes(
                      item
                    )}
                    onClick={() =>
                      toggleArrayValue(
                        'preferences',
                        'teachingMode',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <FieldLabel label="Offline Teaching Areas" required />

              <textarea
                value={
                  formData.preferences
                    .offlineAreas
                }
                onChange={(e) =>
                  updatePreferences(
                    'offlineAreas',
                    e.target.value
                  )
                }
                placeholder="e.g. Sector 44, Sector 50, Sector 62, Noida"
                rows={3}
                className="w-full rounded-xl border border-[#DDE2E8] bg-[#F8FAFC] px-4 py-3 text-[#0D1118] outline-none transition focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10 resize-none"
              />

              <p className="text-xs text-[#6B7280] mt-2">
                You can enter multiple areas separated
                by commas.
              </p>
            </div>

            <div>
              <FieldLabel label="Preferred Availability" required />

              <div className="grid grid-cols-2 gap-3">
                {availabilityOptions.map((item) => (
                  <ChoiceButton
                    key={item}
                    label={item}
                    selected={formData.preferences.availability.includes(
                      item
                    )}
                    onClick={() =>
                      toggleArrayValue(
                        'preferences',
                        'availability',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div>
              <FieldLabel label="Preferred Student Type" required />

              <div className="flex flex-wrap gap-2">
                {studentTypes.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    selected={formData.preferences.studentTypes.includes(
                      item
                    )}
                    onClick={() =>
                      toggleArrayValue(
                        'preferences',
                        'studentTypes',
                        item
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {step === 5 && (
          <ReviewSection formData={formData} />
        )}
      </div>

      {/* FOOTER */}
      <div className="px-6 sm:px-8 py-5 bg-[#FAFBFC] border-t border-[#E5E7EB] flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
        {step > 1 ? (
          <button
            type="button"
            onClick={previousStep}
            className="px-5 py-3 rounded-xl border border-[#DDE2E8] bg-white text-[#0D1118] font-bold hover:bg-[#F8FAFC] transition"
          >
            ← Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-3 rounded-xl bg-[#0A6FF7] text-white font-bold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          >
            Continue
            <span>→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="px-7 py-3 rounded-xl bg-[#0A6FF7] text-white font-bold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
          >
            Submit Profile
            <span>→</span>
          </button>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   TEACHING LEVEL CARD
========================================================= */

function TeachingLevelCard({
  title,
  description,
  classes,
  selectedClasses,
  subjects,
  selectedSubjects,
  allSubjects = false,
  showAllSubjects = false,
  onClassToggle,
  onSubjectToggle,
  onAllSubjectsToggle,
}: {
  title: string;
  description: string;
  classes: string[];
  selectedClasses: string[];
  subjects: string[];
  selectedSubjects: string[];
  allSubjects?: boolean;
  showAllSubjects?: boolean;
  onClassToggle: (item: string) => void;
  onSubjectToggle: (item: string) => void;
  onAllSubjectsToggle?: () => void;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-5">
      <h3 className="font-bold text-[#0D1118] mb-1">
        {title}
      </h3>

      <p className="text-sm text-[#6B7280] mb-5">
        {description}
      </p>

      <FieldLabel label="Classes" />

      <div className="flex flex-wrap gap-2 mb-5">
        {classes.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={selectedClasses.includes(
              item
            )}
            onClick={() =>
              onClassToggle(item)
            }
          />
        ))}
      </div>

      <FieldLabel label="Subjects" />

      {showAllSubjects && (
        <div className="mb-4">
          <Chip
            label="All Subjects"
            selected={allSubjects}
            onClick={() =>
              onAllSubjectsToggle?.()
            }
          />
        </div>
      )}

      {!allSubjects && (
        <div className="flex flex-wrap gap-2">
          {subjects.map((item) => (
            <Chip
              key={item}
              label={item}
              selected={selectedSubjects.includes(
                item
              )}
              onClick={() =>
                onSubjectToggle(item)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  min,
  maxLength,
}: {
  label: string;
  required?: boolean;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
      />

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        min={min}
        maxLength={maxLength}
        inputMode={
          type === 'tel' || type === 'number'
            ? 'numeric'
            : undefined
        }
        className="w-full rounded-xl border border-[#DDE2E8] bg-[#F8FAFC] px-4 py-3.5 text-[#0D1118] placeholder:text-[#9AA3AF] outline-none transition focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10"
      />
    </div>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextAreaField({
  label,
  required = false,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
      />

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        rows={3}
        className="w-full rounded-xl border border-[#DDE2E8] bg-[#F8FAFC] px-4 py-3.5 text-[#0D1118] placeholder:text-[#9AA3AF] outline-none transition focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10 resize-none"
      />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  required = false,
  placeholder,
  value,
  options,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <FieldLabel
        label={label}
        required={required}
      />

      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="appearance-none w-full rounded-xl border border-[#DDE2E8] bg-[#F8FAFC] px-4 py-3.5 pr-10 text-[#0D1118] outline-none transition focus:border-[#0A6FF7] focus:ring-2 focus:ring-[#0A6FF7]/10"
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

/* =========================================================
   FIELD LABEL
========================================================= */

function FieldLabel({
  label,
  required = false,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-bold text-[#0D1118] mb-2.5">
      {label}

      {required && (
        <span className="text-[#0A6FF7] ml-1">
          *
        </span>
      )}
    </label>
  );
}

/* =========================================================
   CHOICE BUTTON
========================================================= */

function ChoiceButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition text-left ${
        selected
          ? 'border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7]'
          : 'border-[#DDE2E8] bg-white text-[#4B5563] hover:border-[#AFC9EF]'
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
            selected
              ? 'border-[#0A6FF7] bg-[#0A6FF7]'
              : 'border-[#CBD5E1]'
          }`}
        >
          {selected && (
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          )}
        </span>

        {label}
      </span>
    </button>
  );
}

/* =========================================================
   CHIP
========================================================= */

function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-lg border text-sm transition ${
        selected
          ? 'bg-[#EBF4FF] border-[#0A6FF7] text-[#0A6FF7] font-semibold'
          : 'bg-white border-[#DDE2E8] text-[#4B5563] hover:border-[#AFC9EF]'
      }`}
    >
      {selected && (
        <span className="mr-1">
          ✓
        </span>
      )}

      {label}
    </button>
  );
}

/* =========================================================
   REVIEW
========================================================= */

function ReviewSection({
  formData,
}: {
  formData: FormData;
}) {
  const primaryClassText =
    formData.teaching.primaryClasses.length > 0
      ? formData.teaching.primaryClasses.join(
          ', '
        )
      : 'Not selected';

  const secondaryClassText =
    formData.teaching.secondaryClasses.length > 0
      ? formData.teaching.secondaryClasses.join(
          ', '
        )
      : 'Not selected';

  const seniorClassText =
    formData.teaching.seniorSecondaryClasses
      .length > 0
      ? formData.teaching.seniorSecondaryClasses.join(
          ', '
        )
      : 'Not selected';

  return (
    <div className="space-y-6">
      <p className="text-[#6B7280]">
        Please review your information before
        submitting.
      </p>

      <ReviewCard title="Personal Details">
        <ReviewRow
          label="Name"
          value={formData.personal.fullName}
        />

        <ReviewRow
          label="Age"
          value={formData.personal.age}
        />

        <ReviewRow
          label="Gender"
          value={formData.personal.gender}
        />

        <ReviewRow
          label="Phone"
          value={formData.personal.phone}
        />

        <ReviewRow
          label="Email"
          value={formData.personal.email}
        />

        <ReviewRow
          label="Address"
          value={formData.personal.address}
        />
      </ReviewCard>

      <ReviewCard title="Education">
        <ReviewRow
          label="Highest Qualification"
          value={
            formData.education
              .highestQualification
          }
        />

        <ReviewRow
          label="Stream / Specialisation"
          value={
            formData.education.stream
          }
        />

        <ReviewRow
          label="Schooling"
          value={
            formData.education
              .schoolingFrom
          }
        />

        <ReviewRow
          label="College / University"
          value={
            formData.education.college
          }
        />
      </ReviewCard>

      <ReviewCard title="Teaching Profile">
        <ReviewRow
          label="Experience"
          value={
            formData.teaching.experience
          }
        />

        <ReviewRow
          label="English Fluency"
          value={
            formData.teaching
              .englishFluency
          }
        />

        <ReviewRow
          label="Boards"
          value={
            formData.teaching.boards.join(
              ', '
            )
          }
        />

        <div className="border-t border-[#E5E7EB] pt-4 mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-3">
            Nursery – Class 8
          </p>

          <ReviewRow
            label="Classes"
            value={primaryClassText}
          />

          <ReviewRow
            label="Subjects"
            value={
              formData.teaching
                .primaryAllSubjects
                ? 'All Subjects'
                : formData.teaching
                    .primarySubjects.join(
                      ', '
                    )
            }
          />
        </div>

        <div className="border-t border-[#E5E7EB] pt-4 mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-3">
            Class 9 – Class 10
          </p>

          <ReviewRow
            label="Classes"
            value={secondaryClassText}
          />

          <ReviewRow
            label="Subjects"
            value={
              formData.teaching.secondarySubjects.join(
                ', '
              )
            }
          />
        </div>

        <div className="border-t border-[#E5E7EB] pt-4 mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#6B7280] mb-3">
            Class 11 – Class 12
          </p>

          <ReviewRow
            label="Classes"
            value={seniorClassText}
          />

          <ReviewRow
            label="Subjects"
            value={
              formData.teaching
                .seniorSecondarySubjects.join(
                  ', '
                )
            }
          />
        </div>
      </ReviewCard>

      <ReviewCard title="Teaching Preferences">
        <ReviewRow
          label="Mode"
          value={
            formData.preferences.teachingMode.join(
              ', '
            )
          }
        />

        <ReviewRow
          label="Offline Areas"
          value={
            formData.preferences.offlineAreas
          }
        />

        <ReviewRow
          label="Availability"
          value={
            formData.preferences.availability.join(
              ', '
            )
          }
        />

        <ReviewRow
          label="Student Type"
          value={
            formData.preferences.studentTypes.join(
              ', '
            )
          }
        />
      </ReviewCard>

      <div className="rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] p-4 text-sm text-[#6B7280] leading-relaxed">
        By submitting this profile, you confirm
        that the information provided is accurate
        to the best of your knowledge.
      </div>
    </div>
  );
}

/* =========================================================
   REVIEW CARD
========================================================= */

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-[#E5E7EB] rounded-2xl p-5">
      <h3 className="font-bold text-[#0D1118] mb-4">
        {title}
      </h3>

      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

/* =========================================================
   REVIEW ROW
========================================================= */

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">
      <span className="text-sm text-[#6B7280]">
        {label}
      </span>

      <span className="text-sm font-medium text-[#0D1118] sm:text-right">
        {value || 'Not provided'}
      </span>
    </div>
  );
}
