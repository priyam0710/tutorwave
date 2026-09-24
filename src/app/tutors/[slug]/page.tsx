"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Languages,
  MapPin,
  MessageCircle,
  Monitor,
  School,
  Star,
  UserRound,
  Users,
  Video,
  Clock3,
  ShieldCheck,
  Target,
  Award,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
| KEEP YOUR EXISTING:
|
| - API call
| - route handling
| - params / tutorId logic
| - loading state
| - error state
| - conditional rendering
| - tutor fetching logic
|
| This component structure only changes the UI.
|
| Your existing fetched `tutor` object should be passed/used below.
|--------------------------------------------------------------------------
*/

export default function TutorProfilePage({ tutor }: { tutor: any }) {
  /*
   * -----------------------------------------------------------------------
   * SAFE HELPERS
   * -----------------------------------------------------------------------
   * These prevent empty sections from appearing if a tutor has not supplied
   * a particular field.
   */

  const hasValue = (value: any) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.trim().length > 0;
    if (typeof value === "number") return true;
    if (typeof value === "boolean") return true;
    return value !== null && value !== undefined;
  };

  const firstValue = (...values: any[]) => {
    return values.find((value) => hasValue(value));
  };

  const asArray = (value: any): string[] => {
    if (!hasValue(value)) return [];

    if (Array.isArray(value)) {
      return value
        .filter(Boolean)
        .map((item) =>
          typeof item === "string"
            ? item
            : item?.name || item?.label || item?.title || ""
        )
        .filter(Boolean);
    }

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  /*
   * -----------------------------------------------------------------------
   * NORMALIZED DISPLAY DATA
   * -----------------------------------------------------------------------
   * These read common existing field names without changing your API.
   */

  const tutorName =
    firstValue(
      tutor?.name,
      tutor?.fullName,
      tutor?.tutorName,
      tutor?.profile?.name
    ) || "Tutor";

  const photo =
    firstValue(
      tutor?.photo,
      tutor?.photoUrl,
      tutor?.profilePhoto,
      tutor?.profileImage,
      tutor?.image,
      tutor?.imageUrl,
      tutor?.avatar,
      tutor?.profile?.photo
    ) || "/placeholder-tutor.jpg";

  const subjects = asArray(
    firstValue(
      tutor?.subjects,
      tutor?.subject,
      tutor?.teachingSubjects,
      tutor?.profile?.subjects
    )
  );

  const classes = asArray(
    firstValue(
      tutor?.classes,
      tutor?.classLevels,
      tutor?.teachingClasses,
      tutor?.grades,
      tutor?.profile?.classes
    )
  );

  const boards = asArray(
    firstValue(
      tutor?.boards,
      tutor?.board,
      tutor?.teachingBoards,
      tutor?.profile?.boards
    )
  );

  const experience = firstValue(
    tutor?.experience,
    tutor?.teachingExperience,
    tutor?.yearsExperience,
    tutor?.profile?.experience
  );

  const qualification = firstValue(
    tutor?.qualification,
    tutor?.highestQualification,
    tutor?.degree,
    tutor?.profile?.qualification
  );

  const university = firstValue(
    tutor?.university,
    tutor?.college,
    tutor?.collegeUniversity,
    tutor?.institution,
    tutor?.profile?.university
  );

  const location = firstValue(
    tutor?.location,
    tutor?.city,
    tutor?.area,
    tutor?.locality,
    tutor?.profile?.location
  );

  const teachingMode = asArray(
    firstValue(
      tutor?.teachingMode,
      tutor?.modes,
      tutor?.mode,
      tutor?.preferredMode
    )
  );

  const bio = firstValue(
    tutor?.bio,
    tutor?.about,
    tutor?.aboutTutor,
    tutor?.description,
    tutor?.profile?.bio
  );

  const age = firstValue(tutor?.age, tutor?.profile?.age);

  const languages = asArray(
    firstValue(
      tutor?.languages,
      tutor?.language,
      tutor?.spokenLanguages,
      tutor?.profile?.languages
    )
  );

  const schoolExperience = firstValue(
    tutor?.schoolExperience,
    tutor?.schoolTeachingExperience,
    tutor?.schoolExperienceYears
  );

  const schoolsTaught = asArray(
    firstValue(
      tutor?.schoolsTaught,
      tutor?.schools,
      tutor?.schoolNames,
      tutor?.studentsTaughtFromSchools
    )
  );

  const studentsTaught = firstValue(
    tutor?.studentsTaught,
    tutor?.totalStudents,
    tutor?.studentsCount
  );

  const availability = firstValue(
    tutor?.availability,
    tutor?.availableTimings,
    tutor?.preferredTiming,
    tutor?.timings
  );

  const teachingApproach = asArray(
    firstValue(
      tutor?.teachingApproach,
      tutor?.approach,
      tutor?.teachingMethods
    )
  );

  const isVerified =
    tutor?.verified === true ||
    tutor?.isVerified === true ||
    tutor?.verificationStatus === "verified" ||
    tutor?.status === "verified";

  const rating = firstValue(tutor?.rating, tutor?.averageRating);

  const placements = firstValue(
    tutor?.placements,
    tutor?.placementCount,
    tutor?.successfulPlacements
  );

  /*
   * -----------------------------------------------------------------------
   * PARENT-FRIENDLY SUMMARY ITEMS
   * -----------------------------------------------------------------------
   */

  const snapshotItems = [
    {
      icon: Clock3,
      label: "Teaching Experience",
      value: experience ? `${experience} years` : null,
    },
    {
      icon: BookOpen,
      label: "Subjects",
      value: subjects.length
        ? `${subjects.length} subject${subjects.length > 1 ? "s" : ""}`
        : null,
    },
    {
      icon: GraduationCap,
      label: "Classes",
      value: classes.length
        ? `${classes.length} class level${classes.length > 1 ? "s" : ""}`
        : null,
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
    },
    {
      icon: Monitor,
      label: "Teaching Mode",
      value: teachingMode.length ? teachingMode.join(" / ") : null,
    },
    {
      icon: Award,
      label: "Qualification",
      value: qualification,
    },
  ].filter((item) => hasValue(item.value));

  /*
   * -----------------------------------------------------------------------
   * REUSABLE UI COMPONENTS
   * -----------------------------------------------------------------------
   */

  const Section = ({
    eyebrow,
    title,
    icon: Icon,
    children,
  }: {
    eyebrow?: string;
    title: string;
    icon?: any;
    children: React.ReactNode;
  }) => (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm">
      <div className="mb-6">
        {eyebrow && (
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
            {eyebrow}
          </div>
        )}

        <div className="flex items-center gap-3">
          {Icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon size={20} />
            </div>
          )}

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {title}
          </h2>
        </div>
      </div>

      {children}
    </section>
  );

  const Pills = ({
    items,
    color = "blue",
  }: {
    items: string[];
    color?: "blue" | "slate";
  }) => {
    if (!items.length) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={
              color === "blue"
                ? "rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                : "rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            }
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: any;
    label: string;
    value: React.ReactNode;
  }) => {
    if (!hasValue(value)) return null;

    return (
      <div className="flex gap-4 border-b border-slate-100 py-5 last:border-0">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </div>

          <div className="text-[15px] font-medium leading-6 text-slate-900">
            {value}
          </div>
        </div>
      </div>
    );
  };

  /*
   * -----------------------------------------------------------------------
   * UI
   * -----------------------------------------------------------------------
   */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ================================================================
          BACK NAVIGATION
      ================================================================= */}

      <div className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        <Link
          href="/tutors"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to Tutors
        </Link>
      </div>

      {/* ================================================================
          HERO
      ================================================================= */}

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
              {/* PHOTO */}

              <div className="relative shrink-0">
                <div className="relative h-44 w-44 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 md:h-52 md:w-52">
                  <Image
                    src={photo}
                    alt={`${tutorName} - TutorWave Tutor`}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>

                {isVerified && (
                  <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-200">
                    <BadgeCheck size={15} />
                    Verified Tutor
                  </div>
                )}
              </div>

              {/* MAIN INTRO */}

              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
                    {tutorName}
                  </h1>

                  {isVerified && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 size={16} />
                      Verified Tutor
                    </span>
                  )}
                </div>

                {subjects.length > 0 && (
                  <p className="mb-5 text-lg text-slate-600">
                    {subjects.slice(0, 5).join(" • ")}
                  </p>
                )}

                <div className="flex flex-wrap gap-3">
                  {experience && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                      <Clock3 size={17} className="text-blue-600" />
                      {experience} years experience
                    </span>
                  )}

                  {location && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                      <MapPin size={17} className="text-blue-600" />
                      {location}
                    </span>
                  )}

                  {teachingMode.length > 0 && (
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">
                      <Monitor size={17} className="text-blue-600" />
                      {teachingMode.join(" / ")}
                    </span>
                  )}
                </div>
              </div>

              {/* QUICK CTA */}

              <div className="w-full lg:w-64">
                <div className="rounded-2xl bg-blue-50 p-5">
                  <div className="mb-2 text-sm font-semibold text-blue-700">
                    Looking for this kind of tutor?
                  </div>

                  <p className="mb-4 text-sm leading-5 text-slate-600">
                    Tell TutorWave what your child needs and we can help you
                    proceed with this tutor.
                  </p>

                  <Link
                    href={`/find-a-tutor?tutor=${encodeURIComponent(tutorName)}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    Request This Tutor
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 pb-16 md:px-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {/* ============================================================
              1. TUTOR AT A GLANCE
          ============================================================= */}

          {snapshotItems.length > 0 && (
            <Section
              eyebrow="Quick Overview"
              title="Tutor at a Glance"
              icon={UserRound}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {snapshotItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={`${item.label}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Icon size={19} />
                      </div>

                      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {item.label}
                      </div>

                      <div className="text-base font-bold text-slate-900">
                        {item.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Section>
          )}

          {/* ============================================================
              2. ABOUT THE TUTOR
          ============================================================= */}

          {hasValue(bio) && (
            <Section
              eyebrow="Tutor Introduction"
              title={`About ${tutorName}`}
              icon={UserRound}
            >
              <p className="max-w-4xl text-base leading-8 text-slate-600">
                {bio}
              </p>
            </Section>
          )}

          {/* ============================================================
              3. ACADEMIC EXPERTISE
          ============================================================= */}

          {(subjects.length > 0 ||
            classes.length > 0 ||
            boards.length > 0) && (
            <Section
              eyebrow="Academic Expertise"
              title="What Can This Tutor Teach?"
              icon={BookOpen}
            >
              <div className="space-y-7">
                {subjects.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                      Subjects
                    </h3>

                    <Pills items={subjects} color="blue" />
                  </div>
                )}

                {classes.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                      Classes
                    </h3>

                    <Pills items={classes} color="slate" />
                  </div>
                )}

                {boards.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
                      Boards
                    </h3>

                    <Pills items={boards} color="slate" />
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* ============================================================
              4. EDUCATION
          ============================================================= */}

          {(hasValue(qualification) || hasValue(university)) && (
            <Section
              eyebrow="Academic Background"
              title="Education & Qualifications"
              icon={GraduationCap}
            >
              <div className="grid gap-4 md:grid-cols-2">
                {hasValue(qualification) && (
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <GraduationCap size={20} />
                    </div>

                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Highest Qualification
                    </div>

                    <div className="text-lg font-bold text-slate-900">
                      {qualification}
                    </div>
                  </div>
                )}

                {hasValue(university) && (
                  <div className="rounded-2xl border border-slate-200 p-5">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <School size={20} />
                    </div>

                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      College / University
                    </div>

                    <div className="text-lg font-bold text-slate-900">
                      {university}
                    </div>
                  </div>
                )}
              </div>
            </Section>
          )}

          {/* ============================================================
              5. TEACHING EXPERIENCE
          ============================================================= */}

          {(hasValue(experience) ||
            hasValue(schoolExperience) ||
            schoolsTaught.length > 0 ||
            hasValue(studentsTaught)) && (
            <Section
              eyebrow="Professional Experience"
              title="Teaching Experience"
              icon={Briefcase}
            >
              <div className="space-y-1">
                {hasValue(experience) && (
                  <InfoRow
                    icon={Briefcase}
                    label="Overall Teaching Experience"
                    value={`${experience} years`}
                  />
                )}

                {hasValue(schoolExperience) && (
                  <InfoRow
                    icon={School}
                    label="School Teaching Experience"
                    value={`${schoolExperience} years`}
                  />
                )}

                {hasValue(studentsTaught) && (
                  <InfoRow
                    icon={Users}
                    label="Students Taught"
                    value={studentsTaught}
                  />
                )}
              </div>

              {schoolsTaught.length > 0 && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                    Schools / Institutions Associated With
                  </h3>

                  <Pills items={schoolsTaught} color="slate" />
                </div>
              )}
            </Section>
          )}

          {/* ============================================================
              6. TEACHING APPROACH
          ============================================================= */}

          {teachingApproach.length > 0 && (
            <Section
              eyebrow="Learning Experience"
              title="Teaching Approach"
              icon={Target}
            >
              <div className="grid gap-3 md:grid-cols-2">
                {teachingApproach.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <span className="text-sm font-medium leading-6 text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* ============================================================
              7. LANGUAGES
          ============================================================= */}

          {languages.length > 0 && (
            <Section
              eyebrow="Communication"
              title="Languages"
              icon={Languages}
            >
              <Pills items={languages} color="slate" />
            </Section>
          )}

          {/* ============================================================
              8. AVAILABILITY
          ============================================================= */}

          {hasValue(availability) && (
            <Section
              eyebrow="Scheduling"
              title="Availability"
              icon={CalendarDays}
            >
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <CalendarDays size={20} />
                  </div>

                  <div>
                    <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Preferred / Available Timing
                    </div>

                    <div className="text-base font-semibold leading-7 text-slate-900">
                      {typeof availability === "string"
                        ? availability
                        : JSON.stringify(availability)}
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {/* ============================================================
              9. VERIFICATION
          ============================================================= */}

          <Section
            eyebrow="TutorWave Trust"
            title="Verification"
            icon={ShieldCheck}
          >
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
                  <BadgeCheck size={25} />
                </div>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-slate-900">
                    {isVerified
                      ? "TutorWave Verified Tutor"
                      : "Tutor profile under review"}
                  </h3>

                  <p className="text-sm leading-6 text-slate-600">
                    {isVerified
                      ? "This tutor profile has been reviewed by the TutorWave team. Verification helps parents identify profiles that have gone through TutorWave's verification process."
                      : "TutorWave is reviewing this tutor profile. Verification status will be updated once the required checks are completed."}
                  </p>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* ================================================================
            RIGHT SIDEBAR — PARENT DECISION PANEL
        ================================================================= */}

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          {/* REQUEST CARD */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-600">
              TutorWave Assistance
            </div>

            <h2 className="mb-3 text-2xl font-bold text-slate-900">
              Interested in {tutorName}?
            </h2>

            <p className="mb-6 text-sm leading-6 text-slate-600">
              Share your child's class, subject, location and learning
              requirement. Our team can help you proceed with this tutor.
            </p>

            <Link
              href={`/find-a-tutor?tutor=${encodeURIComponent(tutorName)}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Request This Tutor
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/find-a-tutor"
              className="mt-3 flex w-full items-center justify-center rounded-xl bg-blue-50 px-5 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
            >
              Find a Different Tutor
            </Link>
          </div>

          {/* WHY TRUST */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="mb-5 text-lg font-bold text-slate-900">
              Why Parents Use TutorWave
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Verified Tutor Profiles",
                  text: "TutorWave reviews tutor profiles before presenting verified tutors.",
                },
                {
                  icon: Target,
                  title: "Requirement-Based Matching",
                  text: "We consider the child's class, subject, location and learning requirement.",
                },
                {
                  icon: MessageCircle,
                  title: "Human Support",
                  text: "Our team remains available to help parents through the tutor selection process.",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex gap-3 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Icon size={18} />
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {item.title}
                      </div>

                      <div className="mt-1 text-xs leading-5 text-slate-500">
                        {item.text}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PROFILE SUMMARY */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-bold text-slate-900">
              Profile Summary
            </h3>

            <div className="space-y-4">
              {hasValue(age) && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Age</span>
                  <span className="font-semibold text-slate-900">
                    {age} years
                  </span>
                </div>
              )}

              {hasValue(location) && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Location</span>
                  <span className="text-right font-semibold text-slate-900">
                    {location}
                  </span>
                </div>
              )}

              {hasValue(experience) && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Experience</span>
                  <span className="font-semibold text-slate-900">
                    {experience} years
                  </span>
                </div>
              )}

              {rating !== undefined && rating !== null && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Rating</span>

                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900">
                    {rating}
                    <Star
                      size={15}
                      className="fill-current text-amber-500"
                    />
                  </span>
                </div>
              )}

              {placements !== undefined && placements !== null && (
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">Placements</span>
                  <span className="font-semibold text-slate-900">
                    {placements}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE/SECONDARY CTA */}

          <div className="rounded-3xl bg-slate-900 p-6 text-white">
            <div className="mb-2 text-sm font-semibold text-blue-300">
              Need help deciding?
            </div>

            <h3 className="mb-3 text-xl font-bold">
              Not sure if this tutor is the right fit?
            </h3>

            <p className="mb-5 text-sm leading-6 text-slate-300">
              Tell TutorWave about your child's requirements and our team can
              help you explore suitable options.
            </p>

            <Link
              href="/find-a-tutor"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              Tell Us Your Requirement
              <ArrowRight size={17} />
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
