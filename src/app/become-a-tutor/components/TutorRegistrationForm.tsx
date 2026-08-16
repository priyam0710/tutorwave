'use client';

import React, { useState } from 'react';

/* =========================================================
   OPTIONS
========================================================= */

const classLevelOptions = [
  {
    id: 'primary',
    label: 'Nursery – Class 5',
    classes: [
      'Nursery',
      'KG',
      'Class 1',
      'Class 2',
      'Class 3',
      'Class 4',
      'Class 5',
    ],
  },
  {
    id: 'middle',
    label: 'Class 6 – Class 8',
    classes: ['Class 6', 'Class 7', 'Class 8'],
  },
  {
    id: 'secondary',
    label: 'Class 9 – Class 10',
    classes: ['Class 9', 'Class 10'],
  },
  {
    id: 'senior',
    label: 'Class 11 – Class 12',
    classes: ['Class 11', 'Class 12'],
  },
  {
    id: 'competitive',
    label: 'Competitive Exams',
    classes: ['IIT-JEE', 'NEET'],
  },
  {
    id: 'college',
    label: 'College / Graduation',
    classes: ['College / Graduation'],
  },
];

const subjectOptions = [
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Studies',
  'History',
  'Geography',
  'Accountancy',
  'Economics',
  'Business Studies',
  'Computer Science',
  'Coding',
  'IIT-JEE',
  'NEET',
  'Other',
];

const qualificationOptions = [
  'Currently Pursuing Graduation',
  'Graduate (B.A. / B.Sc. / B.Com / BCA)',
  'Post Graduate (M.A. / M.Sc. / M.Com / MCA)',
  'B.Tech / B.E.',
  'M.Tech / M.E.',
  'B.Ed / M.Ed',
  'PhD / Research Scholar',
  'Other Professional Degree',
];

const experienceOptions = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5–10 years',
  'More than 10 years',
];

const englishFluencyOptions = [
  'Basic',
  'Good',
  'Very Good',
  'Fluent',
];

const schoolExperienceOptions = [
  'Yes',
  'No',
];

const boardOptions = [
  'CBSE',
  'ICSE',
  'IB',
  'IGCSE',
  'State Board',
  'Other',
];

const areaOptions = [
  'South Delhi',
  'North Delhi',
  'East Delhi',
  'West Delhi',
  'Central Delhi',
  'Dwarka',
  'Rohini',
  'Pitampura',
  'Janakpuri',
  'Lajpat Nagar',

  'Noida',
  'Greater Noida',
  'Gurugram',
  'Faridabad',
  'Ghaziabad',

  'Other',
];

/* =========================================================
   TYPES
========================================================= */

interface TeachingCombination {
  levelId: string;
  levelLabel: string;
  classes: string[];
  subjects: string[];
  allSubjects: boolean;
}

interface TutorFormData {
  fullName: string;
  phone: string;
  email: string;

  address: string;
  age: string;

  qualification: string;
  stream: string;

  schoolingFrom: string;
  college: string;

  experience: string;

  teachingCombinations: TeachingCombination[];

  boards: string[];

  englishFluency: string;

  schoolExperience: string;
  studentsTaughtFrom: string;

  preferredAreas: string[];

  about: string;
}

interface TeachingRowProps {
  combination: TeachingCombination;
  index: number;
  onChange: (index: number, value: TeachingCombination) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  error?: string;
}

/* =========================================================
   INITIAL DATA
========================================================= */

const createEmptyCombination = (): TeachingCombination => ({
  levelId: '',
  levelLabel: '',
  classes: [],
  subjects: [],
  allSubjects: false,
});

const initialForm: TutorFormData = {
  fullName: '',
  phone: '',
  email: '',

  address: '',
  age: '',

  qualification: '',
  stream: '',

  schoolingFrom: '',
  college: '',

  experience: '',

  teachingCombinations: [createEmptyCombination()],

  boards: [],

  englishFluency: '',

  schoolExperience: '',
  studentsTaughtFrom: '',

  preferredAreas: [],

  about: '',
};

/* =========================================================
   MULTI SELECT
========================================================= */

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
  onChange: (value: string[]) => void;
  error?: string;
}) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div>
      <label className="form-label">
        {label}
      </label>

      <div className="flex flex-wrap gap-2 mt-2">
        {options.map((option) => {
          const selectedValue = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                selectedValue
                  ? 'bg-[#0A6FF7] text-white border-[#0A6FF7]'
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7]'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   TEACHING COMBINATION ROW
========================================================= */

function TeachingCombinationRow({
  combination,
  index,
  onChange,
  onRemove,
  canRemove,
  error,
}: TeachingRowProps) {
  const handleLevelChange = (levelId: string) => {
    const selectedLevel = classLevelOptions.find(
      (level) => level.id === levelId
    );

    if (!selectedLevel) {
      onChange(index, createEmptyCombination());
      return;
    }

    onChange(index, {
      levelId: selectedLevel.id,
      levelLabel: selectedLevel.label,
      classes: selectedLevel.classes,
      subjects: [],
      allSubjects: false,
    });
  };

  const toggleSubject = (subject: string) => {
    const current = combination.subjects;

    const updated = current.includes(subject)
      ? current.filter((item) => item !== subject)
      : [...current, subject];

    onChange(index, {
      ...combination,
      subjects: updated,
      allSubjects: false,
    });
  };

  const toggleAllSubjects = () => {
    onChange(index, {
      ...combination,
      subjects: [],
      allSubjects: !combination.allSubjects,
    });
  };

  return (
    <div className="border border-[#E5E7EB] bg-white rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-[#0D1118]">
            Teaching Level {index + 1}
          </p>

          <p className="text-xs text-[#6B7280] mt-1">
            Select the classes and subjects you can teach together.
          </p>
        </div>

        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-xs font-semibold text-red-500 hover:text-red-600"
          >
            Remove
          </button>
        )}
      </div>

      {/* Class Level */}
      <div className="mb-5">
        <label className="form-label">
          Class Level <span className="text-red-500">*</span>
        </label>

        <select
          className="form-input"
          value={combination.levelId}
          onChange={(e) => handleLevelChange(e.target.value)}
        >
          <option value="">
            Select class level
          </option>

          {classLevelOptions.map((level) => (
            <option
              key={level.id}
              value={level.id}
            >
              {level.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subjects */}
      {combination.levelId && (
        <div>
          <label className="form-label">
            Subjects You Can Teach <span className="text-red-500">*</span>
          </label>

          <div className="flex flex-wrap gap-2 mt-2">
            {/* ALL SUBJECTS */}
            <button
              type="button"
              onClick={toggleAllSubjects}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                combination.allSubjects
                  ? 'bg-[#0C8F81] text-white border-[#0C8F81]'
                  : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0C8F81] hover:text-[#0C8F81]'
              }`}
            >
              All Subjects
            </button>

            {/* INDIVIDUAL SUBJECTS */}
            {subjectOptions.map((subject) => {
              const selected =
                combination.subjects.includes(subject);

              return (
                <button
                  key={subject}
                  type="button"
                  onClick={() => toggleSubject(subject)}
                  disabled={combination.allSubjects}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                    selected
                      ? 'bg-[#0A6FF7] text-white border-[#0A6FF7]'
                      : combination.allSubjects
                      ? 'bg-[#F3F4F6] text-[#9CA3AF] border-[#E5E7EB] cursor-not-allowed'
                      : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#0A6FF7] hover:text-[#0A6FF7]'
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#6B7280] mt-2">
            Choose <strong>All Subjects</strong> if you teach the complete
            range for this class level.
          </p>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TutorRegistrationForm() {
  const [form, setForm] =
    useState<TutorFormData>(initialForm);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  /* =======================================================
     SIMPLE FIELD CHANGE
  ======================================================= */

  const handleChange = (
    field: keyof TutorFormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: '',
      }));
    }
  };

  /* =======================================================
     ARRAY FIELD CHANGE
  ======================================================= */

  const handleArrayChange = (
    field: 'boards' | 'preferredAreas',
    value: string[]
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: '',
      }));
    }
  };

  /* =======================================================
     TEACHING COMBINATION CHANGE
  ======================================================= */

  const updateTeachingCombination = (
    index: number,
    value: TeachingCombination
  ) => {
    setForm((previous) => {
      const combinations = [
        ...previous.teachingCombinations,
      ];

      combinations[index] = value;

      return {
        ...previous,
        teachingCombinations: combinations,
      };
    });

    setErrors((previous) => ({
      ...previous,
      teachingCombinations: '',
    }));
  };

  /* =======================================================
     ADD TEACHING LEVEL
  ======================================================= */

  const addTeachingCombination = () => {
    setForm((previous) => ({
      ...previous,
      teachingCombinations: [
        ...previous.teachingCombinations,
        createEmptyCombination(),
      ],
    }));
  };

  /* =======================================================
     REMOVE TEACHING LEVEL
  ======================================================= */

  const removeTeachingCombination = (index: number) => {
    setForm((previous) => ({
      ...previous,
      teachingCombinations:
        previous.teachingCombinations.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* =======================================================
     VALIDATION
  ======================================================= */

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.fullName.trim()) {
      newErrors.fullName =
        'Please enter your full name';
    }

    if (
      !form.phone.trim() ||
      !/^[6-9]\d{9}$/.test(form.phone.trim())
    ) {
      newErrors.phone =
        'Enter a valid 10-digit Indian mobile number';
    }

    if (!form.address.trim()) {
      newErrors.address =
        'Please enter your address';
    }

    if (!form.age.trim()) {
      newErrors.age =
        'Please enter your age';
    }

    if (!form.qualification) {
      newErrors.qualification =
        'Please select your qualification';
    }

    if (!form.stream.trim()) {
      newErrors.stream =
        'Please enter your stream / specialization';
    }

    if (!form.experience) {
      newErrors.experience =
        'Please select your teaching experience';
    }

    /* Teaching combinations */
    if (form.teachingCombinations.length === 0) {
      newErrors.teachingCombinations =
        'Please add at least one teaching level';
    }

    form.teachingCombinations.forEach(
      (combination, index) => {
        if (!combination.levelId) {
          newErrors[`teaching_${index}`] =
            'Please select a class level';
        } else if (
          !combination.allSubjects &&
          combination.subjects.length === 0
        ) {
          newErrors[`teaching_${index}`] =
            'Please select at least one subject';
        }
      }
    );

    if (form.boards.length === 0) {
      newErrors.boards =
        'Please select at least one board';
    }

    if (!form.englishFluency) {
      newErrors.englishFluency =
        'Please select your English fluency';
    }

    if (!form.schoolExperience) {
      newErrors.schoolExperience =
        'Please select an option';
    }

    if (form.preferredAreas.length === 0) {
      newErrors.preferredAreas =
        'Please select at least one teaching area';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    /*
      IMPORTANT:

      This object is deliberately structured for CRM integration.

      Example:

      teachingCombinations: [
        {
          levelId: "primary",
          levelLabel: "Nursery – Class 5",
          classes: [
            "Nursery",
            "KG",
            "Class 1",
            ...
          ],
          subjects: [],
          allSubjects: true
        },

        {
          levelId: "secondary",
          levelLabel: "Class 9 – Class 10",
          classes: ["Class 9", "Class 10"],
          subjects: ["Mathematics", "Science"],
          allSubjects: false
        }
      ]
    */

    const crmPayload = {
      leadType: 'tutor_registration',

      submittedAt: new Date().toISOString(),

      personalDetails: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        age: form.age.trim(),
      },

      education: {
        qualification: form.qualification,
        stream: form.stream.trim(),
        schoolingFrom: form.schoolingFrom.trim(),
        college: form.college.trim(),
      },

      teachingProfile: {
        experience: form.experience,

        teachingCombinations:
          form.teachingCombinations.map(
            (combination) => ({
              levelId: combination.levelId,
              levelLabel:
                combination.levelLabel,

              classes:
                combination.classes,

              subjects:
                combination.allSubjects
                  ? ['ALL_SUBJECTS']
                  : combination.subjects,

              allSubjects:
                combination.allSubjects,
            })
          ),

        boards: form.boards,

        englishFluency:
          form.englishFluency,

        schoolExperience:
          form.schoolExperience,

        studentsTaughtFrom:
          form.studentsTaughtFrom.trim(),

        preferredAreas:
          form.preferredAreas,
      },

      about: form.about.trim(),

      source: 'TutorWave Website',
    };

    /*
      FOR NOW:
      This is only a temporary mock submission.

      Later replace this section with:

      await fetch('/api/tutors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crmPayload),
      });

      Your CRM/API can then store this exact structure.
    */

    console.log(
      'TutorWave CRM Payload:',
      crmPayload
    );

    await new Promise((resolve) =>
      setTimeout(resolve, 1200)
    );

    setSubmitting(false);
    setSubmitted(true);
  };

  /* =======================================================
     SUCCESS SCREEN
  ======================================================= */

  if (submitted) {
    return (
      <section
        id="register"
        className="py-20 bg-white"
      >
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.5"
            >
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h2 className="font-display text-3xl text-[#0D1118] mb-4">
            Registration received!
          </h2>

          <p className="text-[#6B7280] leading-relaxed mb-6">
            Thank you for registering with TutorWave.
            Our team will review your profile and contact
            you shortly for verification.
          </p>

          <a
            href="https://wa.me/918588879239"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0A6FF7] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Follow up on WhatsApp

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  /* =======================================================
     FORM UI
  ======================================================= */

  return (
    <section
      id="register"
      className="py-12 md:py-20 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* =================================================
              FORM
          ================================================= */}

          <div className="lg:col-span-2">

            <div className="bg-card border border-border rounded-3xl p-6 md:p-10">

              <h2 className="font-display text-2xl text-foreground mb-2">
                Tutor Registration Form
              </h2>

              <p className="text-sm text-muted-foreground mb-8">
                Tell us about yourself and the classes you can teach.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-7"
              >

                {/* =================================================
                    PERSONAL DETAILS
                ================================================= */}

                <div>
                  <h3 className="font-semibold text-lg text-[#0D1118] mb-1">
                    Personal Details
                  </h3>

                  <p className="text-sm text-[#6B7280] mb-5">
                    Basic information for verification and communication.
                  </p>
                </div>

                {/* Name + Phone */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="form-label">
                      Full Name{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. Priya Sharma"
                      value={form.fullName}
                      onChange={(e) =>
                        handleChange(
                          'fullName',
                          e.target.value
                        )
                      }
                    />

                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      Mobile Number{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      className="form-input"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      maxLength={10}
                      onChange={(e) =>
                        handleChange(
                          'phone',
                          e.target.value.replace(
                            /\D/g,
                            ''
                          )
                        )
                      }
                    />

                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                </div>

                {/* Email */}

                <div>
                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      handleChange(
                        'email',
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Address + Age */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                  <div className="sm:col-span-2">
                    <label className="form-label">
                      Current Address{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your current residential address"
                      value={form.address}
                      onChange={(e) =>
                        handleChange(
                          'address',
                          e.target.value
                        )
                      }
                    />

                    {errors.address && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      Age{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="number"
                      min="18"
                      max="80"
                      className="form-input"
                      placeholder="Age"
                      value={form.age}
                      onChange={(e) =>
                        handleChange(
                          'age',
                          e.target.value
                        )
                      }
                    />

                    {errors.age && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.age}
                      </p>
                    )}
                  </div>

                </div>

                {/* =================================================
                    EDUCATION
                ================================================= */}

                <div className="pt-3">

                  <h3 className="font-semibold text-lg text-[#0D1118] mb-1">
                    Education
                  </h3>

                  <p className="text-sm text-[#6B7280] mb-5">
                    Tell us about your academic background.
                  </p>

                </div>

                {/* Qualification + Stream */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="form-label">
                      Highest Qualification{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      className="form-input"
                      value={form.qualification}
                      onChange={(e) =>
                        handleChange(
                          'qualification',
                          e.target.value
                        )
                      }
                    >
                      <option value="">
                        Select qualification
                      </option>

                      {qualificationOptions.map(
                        (qualification) => (
                          <option
                            key={qualification}
                            value={qualification}
                          >
                            {qualification}
                          </option>
                        )
                      )}
                    </select>

                    {errors.qualification && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.qualification}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">
                      Stream / Specialization{' '}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. B.Sc. Mathematics"
                      value={form.stream}
                      onChange={(e) =>
                        handleChange(
                          'stream',
                          e.target.value
                        )
                      }
                    />

                    {errors.stream && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.stream}
                      </p>
                    )}
                  </div>

                </div>

                {/* Schooling + College */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                  <div>
                    <label className="form-label">
                      Schooling From
                    </label>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="School name"
                      value={form.schoolingFrom}
                      onChange={(e) =>
                        handleChange(
                          'schoolingFrom',
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      College / University
                    </label>

                    <input
                      type="text"
                      className="form-input"
                      placeholder="College / University name"
                      value={form.college}
                      onChange={(e) =>
                        handleChange(
                          'college',
                          e.target.value
                        )
                      }
                    />
                  </div>

                </div>

                {/* =================================================
                    TEACHING PROFILE
                ================================================= */}

                <div className="pt-3">

                  <h3 className="font-semibold text-lg text-[#0D1118] mb-1">
                    Teaching Profile
                  </h3>

                  <p className="text-sm text-[#6B7280] mb-5">
                    Tell us exactly what you can teach.
                  </p>

                </div>

                {/* Experience */}

                <div>
                  <label className="form-label">
                    Teaching Experience{' '}
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    className="form-input"
                    value={form.experience}
                    onChange={(e) =>
                      handleChange(
                        'experience',
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select experience
                    </option>

                    {experienceOptions.map(
                      (experience) => (
                        <option
                          key={experience}
                          value={experience}
                        >
                          {experience}
                        </option>
                      )
                    )}
                  </select>

                  {errors.experience && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* =================================================
                    TEACHING COMBINATIONS
                ================================================= */}

                <div>

                  <div className="flex items-start justify-between gap-4 mb-4">

                    <div>
                      <label className="form-label mb-1">
                        Classes & Subjects You Teach{' '}
                        <span className="text-red-500">*</span>
                      </label>

                      <p className="text-xs text-[#6B7280]">
                        Add each teaching level separately.
                        This helps us match you accurately with
                        parent requirements.
                      </p>
                    </div>

                  </div>

                  <div className="space-y-4">

                    {form.teachingCombinations.map(
                      (combination, index) => (
                        <TeachingCombinationRow
                          key={index}
                          combination={combination}
                          index={index}
                          onChange={
                            updateTeachingCombination
                          }
                          onRemove={
                            removeTeachingCombination
                          }
                          canRemove={
                            form.teachingCombinations
                              .length > 1
                          }
                          error={
                            errors[
                              `teaching_${index}`
                            ]
                          }
                        />
                      )
                    )}

                  </div>

                  <button
                    type="button"
                    onClick={
                      addTeachingCombination
                    }
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0A6FF7] hover:text-[#085dcc]"
                  >
                    <span className="w-6 h-6 rounded-full border border-[#0A6FF7] flex items-center justify-center">
                      +
                    </span>

                    Add another teaching level
                  </button>

                  {errors.teachingCombinations && (
                    <p className="text-xs text-red-500 mt-2">
                      {errors.teachingCombinations}
                    </p>
                  )}

                </div>

                {/* Boards */}

                <MultiSelect
                  label={
                    <>
                      Boards / Curriculum You Can Teach{' '}
                      <span className="text-red-500">*</span>
                    </>
                  }
                  options={boardOptions}
                  selected={form.boards}
                  onChange={(value) =>
                    handleArrayChange(
                      'boards',
                      value
                    )
                  }
                  error={errors.boards}
                />

                {/* English */}

                <div>

                  <label className="form-label">
                    English Fluency{' '}
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    className="form-input"
                    value={form.englishFluency}
                    onChange={(e) =>
                      handleChange(
                        'englishFluency',
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select fluency level
                    </option>

                    {englishFluencyOptions.map(
                      (level) => (
                        <option
                          key={level}
                          value={level}
                        >
                          {level}
                        </option>
                      )
                    )}
                  </select>

                  {errors.englishFluency && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.englishFluency}
                    </p>
                  )}

                </div>

                {/* School Experience */}

                <div>

                  <label className="form-label">
                    School Teaching Experience{' '}
                    <span className="text-red-500">*</span>
                  </label>

                  <select
                    className="form-input"
                    value={form.schoolExperience}
                    onChange={(e) =>
                      handleChange(
                        'schoolExperience',
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select an option
                    </option>

                    {schoolExperienceOptions.map(
                      (option) => (
                        <option
                          key={option}
                          value={option}
                        >
                          {option}
                        </option>
                      )
                    )}
                  </select>

                </div>

                {/* School Names */}

                <div>

                  <label className="form-label">
                    Schools / Institutions You Have Taught At
                  </label>

                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. DPS Noida, Ryan International School"
                    value={form.studentsTaughtFrom}
                    onChange={(e) =>
                      handleChange(
                        'studentsTaughtFrom',
                        e.target.value
                      )
                    }
                  />

                  <p className="text-xs text-[#6B7280] mt-1">
                    Mention school or coaching institute names, if applicable.
                  </p>

                </div>

                {/* =================================================
                    LOCATION
                ================================================= */}

                <div className="pt-3">

                  <h3 className="font-semibold text-lg text-[#0D1118] mb-1">
                    Teaching Location
                  </h3>

                  <p className="text-sm text-[#6B7280] mb-5">
                    Select the areas where you are available for offline teaching.
                  </p>

                </div>

                <MultiSelect
                  label={
                    <>
                      Preferred Offline Teaching Areas{' '}
                      <span className="text-red-500">*</span>
                    </>
                  }
                  options={areaOptions}
                  selected={form.preferredAreas}
                  onChange={(value) =>
                    handleArrayChange(
                      'preferredAreas',
                      value
                    )
                  }
                  error={errors.preferredAreas}
                />

                {/* About */}

                <div>

                  <label className="form-label">
                    Brief Introduction
                  </label>

                  <textarea
                    className="form-input resize-none"
                    rows={4}
                    placeholder="Tell us briefly about your teaching style, strengths or any other relevant experience..."
                    value={form.about}
                    onChange={(e) =>
                      handleChange(
                        'about',
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center text-base"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>

                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Registration

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to TutorWave&apos;s
                  terms. Your information is kept confidential.
                </p>

              </form>

            </div>
          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div className="space-y-5">

            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6">

              <h3 className="font-display text-lg text-[#0D1118] mb-4">
                What happens after you register?
              </h3>

              <ol className="space-y-5">

                {[
                  {
                    step: '01',
                    text: 'Our team reviews your profile within 24–48 hours',
                  },
                  {
                    step: '02',
                    text: 'We contact you for a brief verification process',
                  },
                  {
                    step: '03',
                    text: 'Your verified profile is added to our tutor network',
                  },
                  {
                    step: '04',
                    text: 'We share relevant tuition opportunities based on your teaching profile',
                  },
                ].map((item) => (
                  <li
                    key={item.step}
                    className="flex gap-4"
                  >
                    <span className="font-display text-lg font-bold text-[#0A6FF7] flex-shrink-0 w-8">
                      {item.step}
                    </span>

                    <span className="text-sm text-[#6B7280] leading-relaxed">
                      {item.text}
                    </span>
                  </li>
                ))}

              </ol>

            </div>

            <div
              className="rounded-3xl p-6 text-white"
              style={{
                backgroundColor: '#0D1118',
              }}
            >

              <div className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                Questions?
              </div>

              <p className="text-sm text-white/75 leading-relaxed mb-5">
                Prefer to talk first? Message us on WhatsApp
                and our team will help you with the registration process.
              </p>

              <a
                href="https://wa.me/918588879239"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full gap-2 bg-white text-[#0A6FF7] rounded-xl py-3 font-semibold text-sm hover:bg-[#F8FAFC] transition-colors"
              >
                Chat on WhatsApp

                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
