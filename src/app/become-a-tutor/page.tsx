"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/app/components/WhatsAppButton";

type TeachingCombination = {
  classes: string;
  subjects: string[];
};

const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const subjectOptions = [
  "Mathematics",
  "Science",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Hindi",
  "Social Science",
  "Accountancy",
  "Business Studies",
  "Economics",
  "Computer Science",
  "Political Science",
  "History",
  "Geography",
  "Psychology",
  "Sociology",
  "French",
  "Sanskrit",
  "Other",
];

const boardOptions = [
  "CBSE",
  "ICSE",
  "ISC",
  "IB",
  "IGCSE",
  "State Board",
  "NIOS",
  "Other",
];

const experienceOptions = [
  "Fresher",
  "Less than 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
];

const fluencyOptions = [
  "Basic",
  "Good",
  "Very Good",
  "Fluent",
];

export default function BecomeATutorPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    age: "",
    address: "",
    qualification: "",
    stream: "",
    schoolingFrom: "",
    college: "",
    teachingExperience: "",
    schoolExperience: "",
    studentsTaughtFrom: "",
    boards: [] as string[],
    englishFluency: "",
    offlineAreas: "",
    onlineAvailable: false,
    homeTuitionAvailable: true,
  });

  const [teachingCombinations, setTeachingCombinations] = useState<
    TeachingCombination[]
  >([
    {
      classes: "",
      subjects: [],
    },
  ]);

  const updateField = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleBoard = (board: string) => {
    setFormData((prev) => ({
      ...prev,
      boards: prev.boards.includes(board)
        ? prev.boards.filter((item) => item !== board)
        : [...prev.boards, board],
    }));
  };

  const updateCombination = (
    index: number,
    field: "classes" | "subjects",
    value: string | string[]
  ) => {
    setTeachingCombinations((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item
      )
    );
  };

  const toggleSubject = (index: number, subject: string) => {
    setTeachingCombinations((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;

        return {
          ...item,
          subjects: item.subjects.includes(subject)
            ? item.subjects.filter((s) => s !== subject)
            : [...item.subjects, subject],
        };
      })
    );
  };

  const addCombination = () => {
    setTeachingCombinations((prev) => [
      ...prev,
      {
        classes: "",
        subjects: [],
      },
    ]);
  };

  const removeCombination = (index: number) => {
    setTeachingCombinations((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    if (!formData.age.trim()) {
      alert("Please enter your age.");
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    const validCombination = teachingCombinations.some(
      (item) => item.classes && item.subjects.length > 0
    );

    if (!validCombination) {
      alert(
        "Please add at least one class and subject combination."
      );
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    setStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      setStep(2);
      return;
    }

    setSubmitting(true);

    const payload = {
      ...formData,
      teachingCombinations,
      source: "TutorWave Website",
      formType: "Tutor Registration",
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/tutor-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while submitting your registration. Please try again or contact us on WhatsApp."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-white">
        <Header />

        <section className="min-h-[70vh] flex items-center justify-center px-6 py-20 bg-[#F8FAFC]">
          <div className="max-w-xl w-full bg-white border border-[#E5E7EB] rounded-3xl p-10 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#EBF4FF] flex items-center justify-center text-[#0A6FF7]">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-[#0D1118] mb-4">
              Registration submitted
            </h1>

            <p className="text-[#6B7280] leading-relaxed mb-8">
              Thank you for registering with TutorWave. Our team will review
              your profile and contact you regarding suitable tuition
              opportunities.
            </p>

            <a
              href="https://wa.me/918588879239"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#0A6FF7] text-white font-semibold hover:opacity-90 transition"
            >
              Contact TutorWave on WhatsApp
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

      <section className="bg-[#F8FAFC] pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-3">
              TUTOR REGISTRATION
            </p>

            <h1
              className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-5"
              style={{ letterSpacing: "-0.025em" }}
            >
              Join TutorWave as a tutor.
            </h1>

            <p className="text-lg text-[#6B7280] leading-relaxed">
              Tell us about yourself, the classes and subjects you teach, and
              the areas where you are available.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 items-start">

            {/* LEFT INFORMATION */}
            <div className="space-y-8">

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                  01
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Create your profile
                  </h3>

                  <p className="text-[#6B7280] leading-relaxed">
                    Share your basic information and teaching preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                  02
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Tell us what you teach
                  </h3>

                  <p className="text-[#6B7280] leading-relaxed">
                    Add different class and subject combinations. For example,
                    Classes 1–8 → All Subjects and Classes 9–10 → Mathematics
                    & Science.
                  </p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                  03
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0D1118] mb-2">
                    Get matched with opportunities
                  </h3>

                  <p className="text-[#6B7280] leading-relaxed">
                    Our team reviews your profile and contacts you when
                    suitable tuition opportunities are available.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB]">
                <h3 className="font-bold text-[#0D1118] mb-4">
                  What we collect
                </h3>

                <ul className="space-y-3 text-sm text-[#6B7280]">
                  <li>✓ Your academic and teaching background</li>
                  <li>✓ Classes and subjects you can teach</li>
                  <li>✓ Preferred teaching areas</li>
                  <li>✓ Board and language preferences</li>
                  <li>✓ Home and online teaching availability</li>
                </ul>
              </div>
            </div>

            {/* FORM */}
            <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm">

              {/* Progress */}
              <div className="flex items-center mb-10">
                {[1, 2, 3].map((number) => (
                  <React.Fragment key={number}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                        step >= number
                          ? "bg-[#0A6FF7] text-white"
                          : "bg-[#E5E7EB] text-[#6B7280]"
                      }`}
                    >
                      {number}
                    </div>

                    {number < 3 && (
                      <div
                        className={`flex-1 h-[2px] ${
                          step > number
                            ? "bg-[#0A6FF7]"
                            : "bg-[#E5E7EB]"
                        }`}
                      />
                    )}
                  </React.Fragment>
                )}
              </div>

              <form onSubmit={handleSubmit}>

                {/* STEP 1 */}
                {step === 1 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                      Basic details
                    </h2>

                    <p className="text-sm text-[#6B7280] mb-7">
                      Let&apos;s start with a few basic details.
                    </p>

                    <div className="space-y-5">

                      <Field
                        label="Full Name"
                        required
                        value={formData.fullName}
                        placeholder="Enter your full name"
                        onChange={(value) =>
                          updateField("fullName", value)
                        }
                      />

                      <Field
                        label="Phone Number"
                        required
                        type="tel"
                        value={formData.phone}
                        placeholder="10-digit mobile number"
                        onChange={(value) =>
                          updateField("phone", value)
                        }
                      />

                      <Field
                        label="Email"
                        type="email"
                        value={formData.email}
                        placeholder="Your email address"
                        onChange={(value) =>
                          updateField("email", value)
                        }
                      />

                      <Field
                        label="Age"
                        required
                        type="number"
                        value={formData.age}
                        placeholder="Your age"
                        onChange={(value) =>
                          updateField("age", value)
                        }
                      />

                      <Field
                        label="Current Address"
                        value={formData.address}
                        placeholder="Area / locality"
                        onChange={(value) =>
                          updateField("address", value)
                        }
                      />

                    </div>

                    <button
                      type="button"
                      onClick={nextStep}
                      className="w-full mt-7 py-4 rounded-xl bg-[#0A6FF7] text-white font-bold hover:opacity-90 transition"
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                      Teaching profile
                    </h2>

                    <p className="text-sm text-[#6B7280] mb-7">
                      Select exactly what you are comfortable teaching.
                    </p>

                    <div className="space-y-6">

                      {teachingCombinations.map((combination, index) => (
                        <div
                          key={index}
                          className="p-5 bg-[#F8FAFC] border border-[#E5E7EB] rounded-2xl"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#0D1118]">
                              Teaching combination {index + 1}
                            </h3>

                            {teachingCombinations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeCombination(index)}
                                className="text-sm text-red-500 hover:underline"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                            Classes
                          </label>

                          <select
                            value={combination.classes}
                            onChange={(e) =>
                              updateCombination(
                                index,
                                "classes",
                                e.target.value
                              )
                            }
                            className="w-full h-12 rounded-xl border border-[#E5E7EB] px-4 bg-white text-[#0D1118] outline-none focus:border-[#0A6FF7]"
                          >
                            <option value="">
                              Select class range
                            </option>
                            <option value="Nursery–UKG">
                              Nursery–UKG
                            </option>
                            <option value="Class 1–5">
                              Class 1–5
                            </option>
                            <option value="Class 1–8">
                              Class 1–8
                            </option>
                            <option value="Class 6–8">
                              Class 6–8
                            </option>
                            <option value="Class 9–10">
                              Class 9–10
                            </option>
                            <option value="Class 11–12">
                              Class 11–12
                            </option>
                            <option value="Class 1–10">
                              Class 1–10
                            </option>
                            <option value="Class 1–12">
                              Class 1–12
                            </option>
                          </select>

                          <label className="block text-sm font-semibold text-[#0D1118] mt-5 mb-2">
                            Subjects
                          </label>

                          <div className="grid grid-cols-2 gap-2">
                            {subjectOptions.map((subject) => (
                              <button
                                key={subject}
                                type="button"
                                onClick={() =>
                                  toggleSubject(index, subject)
                                }
                                className={`text-left px-3 py-2.5 rounded-lg border text-sm transition ${
                                  combination.subjects.includes(subject)
                                    ? "border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7] font-semibold"
                                    : "border-[#E5E7EB] bg-white text-[#6B7280]"
                                }`}
                              >
                                {combination.subjects.includes(subject)
                                  ? "✓ "
                                  : ""}
                                {subject}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={addCombination}
                        className="w-full py-3 rounded-xl border border-dashed border-[#0A6FF7] text-[#0A6FF7] font-semibold hover:bg-[#EBF4FF] transition"
                      >
                        + Add another class & subject combination
                      </button>

                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-3">
                          Boards you can teach
                        </label>

                        <div className="grid grid-cols-2 gap-2">
                          {boardOptions.map((board) => (
                            <button
                              type="button"
                              key={board}
                              onClick={() => toggleBoard(board)}
                              className={`px-3 py-2.5 rounded-lg border text-sm ${
                                formData.boards.includes(board)
                                  ? "border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7] font-semibold"
                                  : "border-[#E5E7EB] text-[#6B7280]"
                              }`}
                            >
                              {formData.boards.includes(board)
                                ? "✓ "
                                : ""}
                              {board}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                    <div className="flex gap-3 mt-7">
                      <button
                        type="button"
                        onClick={previousStep}
                        className="w-1/3 py-4 rounded-xl border border-[#E5E7EB] font-semibold text-[#0D1118]"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 py-4 rounded-xl bg-[#0A6FF7] text-white font-bold"
                      >
                        Continue →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <div>
                    <h2 className="text-2xl font-bold text-[#0D1118] mb-2">
                      Experience & availability
                    </h2>

                    <p className="text-sm text-[#6B7280] mb-7">
                      A few final details to help us match you with suitable
                      opportunities.
                    </p>

                    <div className="space-y-5">

                      <Field
                        label="Qualification"
                        value={formData.qualification}
                        placeholder="e.g. B.Sc. Mathematics"
                        onChange={(value) =>
                          updateField("qualification", value)
                        }
                      />

                      <Field
                        label="Stream / Specialisation"
                        value={formData.stream}
                        placeholder="e.g. Mathematics, Physics"
                        onChange={(value) =>
                          updateField("stream", value)
                        }
                      />

                      <Field
                        label="Schooling From"
                        value={formData.schoolingFrom}
                        placeholder="School name"
                        onChange={(value) =>
                          updateField("schoolingFrom", value)
                        }
                      />

                      <Field
                        label="College / University"
                        value={formData.college}
                        placeholder="College / University name"
                        onChange={(value) =>
                          updateField("college", value)
                        }
                      />

                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          Teaching Experience
                        </label>

                        <select
                          value={formData.teachingExperience}
                          onChange={(e) =>
                            updateField(
                              "teachingExperience",
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-xl border border-[#E5E7EB] px-4 bg-white"
                        >
                          <option value="">
                            Select experience
                          </option>

                          {experienceOptions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Field
                        label="School Teaching Experience"
                        value={formData.schoolExperience}
                        placeholder="School / coaching experience, if any"
                        onChange={(value) =>
                          updateField("schoolExperience", value)
                        }
                      />

                      <Field
                        label="Students / Schools Taught From"
                        value={formData.studentsTaughtFrom}
                        placeholder="Optional"
                        onChange={(value) =>
                          updateField(
                            "studentsTaughtFrom",
                            value
                          )
                        }
                      />

                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-2">
                          English Fluency
                        </label>

                        <select
                          value={formData.englishFluency}
                          onChange={(e) =>
                            updateField(
                              "englishFluency",
                              e.target.value
                            )
                          }
                          className="w-full h-12 rounded-xl border border-[#E5E7EB] px-4 bg-white"
                        >
                          <option value="">
                            Select level
                          </option>

                          {fluencyOptions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Field
                        label="Preferred Offline Teaching Areas"
                        value={formData.offlineAreas}
                        placeholder="e.g. Sector 44, Sector 50, Noida"
                        onChange={(value) =>
                          updateField("offlineAreas", value)
                        }
                      />

                      <div>
                        <label className="block text-sm font-semibold text-[#0D1118] mb-3">
                          Teaching Mode
                        </label>

                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                "homeTuitionAvailable",
                                !formData.homeTuitionAvailable
                              )
                            }
                            className={`flex-1 py-3 rounded-xl border ${
                              formData.homeTuitionAvailable
                                ? "border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7] font-semibold"
                                : "border-[#E5E7EB]"
                            }`}
                          >
                            🏠 Home Tuition
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              updateField(
                                "onlineAvailable",
                                !formData.onlineAvailable
                              )
                            }
                            className={`flex-1 py-3 rounded-xl border ${
                              formData.onlineAvailable
                                ? "border-[#0A6FF7] bg-[#EBF4FF] text-[#0A6FF7] font-semibold"
                                : "border-[#E5E7EB]"
                            }`}
                          >
                            💻 Online
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="flex gap-3 mt-7">
                      <button
                        type="button"
                        onClick={previousStep}
                        className="w-1/3 py-4 rounded-xl border border-[#E5E7EB] font-semibold text-[#0D1118]"
                      >
                        Back
                      </button>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-4 rounded-xl bg-[#0A6FF7] text-white font-bold disabled:opacity-60"
                      >
                        {submitting
                          ? "Submitting..."
                          : "Submit Registration →"}
                      </button>
                    </div>

                    <p className="text-xs text-center text-[#9CA3AF] mt-4">
                      Our team will review your profile and contact you
                      regarding suitable opportunities.
                    </p>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}


/* Reusable input component */

function Field({
  label,
  value,
  placeholder,
  onChange,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#0D1118] mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-xl border border-[#E5E7EB] px-4 text-[#0D1118] placeholder:text-[#9CA3AF] outline-none focus:border-[#0A6FF7] focus:ring-1 focus:ring-[#0A6FF7]"
      />
    </div>
  );
}
