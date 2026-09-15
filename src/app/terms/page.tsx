import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#0D1118] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#0A6FF7]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4BC2FD]/5 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-white/50 hover:text-white transition-colors mb-8"
          >
            ← Back to TutorWave
          </Link>

          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-[#4BC2FD] mb-4">
              TutorWave
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Terms & Conditions
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
              These terms explain the rules and responsibilities for using
              TutorWave and our tutor-matching services.
            </p>

            <p className="mt-6 text-sm text-white/40">
              Last Updated: 15 September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10 lg:p-12">
          <div className="space-y-10 text-gray-700 leading-7">

            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. About TutorWave
              </h2>

              <p>
                TutorWave is a home tuition platform that facilitates
                connections between parents or students and tutors. TutorWave
                helps parents find suitable tutors and provides tutors with
                relevant tuition opportunities.
              </p>

              <p className="mt-4">
                These Terms & Conditions ("Terms") govern your use of the
                TutorWave website, forms, platform, and related services
                ("Services").
              </p>

              <p className="mt-4">
                By using our Services, submitting an enquiry, registering as a
                tutor, or otherwise interacting with TutorWave, you agree to
                these Terms.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Eligibility and User Information
              </h2>

              <p>
                Users must provide accurate and genuine information when using
                TutorWave.
              </p>

              <p className="mt-4">
                Parents or guardians submitting information on behalf of a
                student must have the appropriate authority to provide that
                information.
              </p>

              <p className="mt-4">
                Tutors must provide truthful information regarding their
                identity, qualifications, teaching experience, subjects,
                availability, and other professional information submitted to
                TutorWave.
              </p>

              <p className="mt-4">
                TutorWave may request additional information or documents where
                reasonably necessary for verification.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Tutor Registration and Verification
              </h2>

              <p>
                Tutors may register with TutorWave to receive relevant tuition
                opportunities.
              </p>

              <p className="mt-4">
                TutorWave may review information provided by tutors and may
                conduct verification checks where applicable.
              </p>

              <p className="mt-4">
                Any verification performed by TutorWave does not constitute an
                absolute guarantee regarding a tutor's conduct, teaching
                quality, qualifications, or future performance.
              </p>

              <p className="mt-4">
                Tutors must immediately inform TutorWave if any important
                information provided during registration changes or becomes
                inaccurate.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Tuition Leads and Tutor Matching
              </h2>

              <p>
                TutorWave may provide tutors with tuition leads based on factors
                such as subject, class, location, teaching mode, availability,
                experience, and the requirements submitted by parents or
                students.
              </p>

              <p className="mt-4">
                Receiving a lead does not guarantee that a tutor will be
                selected by the parent or student or that a tuition arrangement
                will be completed.
              </p>

              <p className="mt-4">
                Similarly, submitting a tuition requirement does not guarantee
                that TutorWave will be able to provide a suitable tutor.
              </p>

              <p className="mt-4">
                TutorWave may determine which tutors receive particular
                opportunities based on relevance, availability, service
                requirements, and operational considerations.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Responsibilities of Parents and Students
              </h2>

              <p>
                Parents and students using TutorWave are responsible for
                providing accurate tuition requirements and communicating
                honestly with tutors and TutorWave.
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  Provide accurate information regarding class, subjects,
                  location, schedule, and learning requirements.
                </li>
                <li>
                  Communicate respectfully with tutors and TutorWave
                  representatives.
                </li>
                <li>
                  Provide a reasonably safe and appropriate environment for
                  home tuition.
                </li>
                <li>
                  Inform TutorWave about significant changes to a tuition
                  requirement.
                </li>
                <li>
                  Make agreed payments to tutors or TutorWave, where
                  applicable, according to the applicable arrangement.
                </li>
              </ul>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Responsibilities of Tutors
              </h2>

              <p>
                Tutors are expected to maintain professional conduct while
                interacting with parents and students.
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide accurate professional information.</li>
                <li>Maintain appropriate punctuality and communication.</li>
                <li>
                  Deliver tuition services professionally and responsibly.
                </li>
                <li>
                  Respect the privacy, safety, and personal boundaries of
                  students and parents.
                </li>
                <li>
                  Avoid inappropriate, abusive, discriminatory, or
                  threatening behaviour.
                </li>
                <li>
                  Inform TutorWave about relevant changes in availability or
                  circumstances.
                </li>
                <li>
                  Not misuse, sell, transfer, or share TutorWave leads for
                  unauthorised purposes.
                </li>
              </ul>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Direct Arrangements Between Parents and Tutors
              </h2>

              <p>
                TutorWave primarily facilitates the introduction and connection
                between parents or students and tutors.
              </p>

              <p className="mt-4">
                Once a parent and tutor establish a tuition arrangement, the
                parties may communicate directly regarding schedules, teaching
                requirements, and other matters relating to the tuition.
              </p>

              <p className="mt-4">
                Parents and tutors are responsible for mutually agreed
                arrangements concerning tuition schedules, fees, cancellations,
                attendance, and other service details unless otherwise agreed
                with TutorWave.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Payments and Fees
              </h2>

              <p>
                Any registration fee, service fee, tuition fee, or other charge
                applicable to a TutorWave service will be communicated to the
                relevant user before the applicable payment is requested.
              </p>

              <p className="mt-4">
                Parents and tutors are responsible for understanding the
                applicable fee arrangement before entering into a paid
                arrangement.
              </p>

              <p className="mt-4">
                Where TutorWave offers a refund, cancellation, or fee-related
                policy, the specific terms communicated for that service will
                apply.
              </p>

              <p className="mt-4">
                TutorWave may update its fees or pricing from time to time.
                Changes will not retrospectively alter an amount already
                agreed for a completed transaction unless otherwise permitted
                by the applicable terms.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Prohibited Activities
              </h2>

              <p>
                Users must not use TutorWave for unlawful, fraudulent,
                misleading, abusive, or harmful purposes.
              </p>

              <p className="mt-4">
                Prohibited activities include, but are not limited to:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Providing false or misleading information.</li>
                <li>
                  Creating duplicate or fraudulent tutor or user profiles.
                </li>
                <li>
                  Misusing, copying, selling, or distributing TutorWave leads.
                </li>
                <li>
                  Attempting to gain unauthorised access to TutorWave systems.
                </li>
                <li>
                  Using the platform to harass, threaten, exploit, or
                  discriminate against another person.
                </li>
                <li>
                  Uploading malicious software or content.
                </li>
                <li>
                  Using TutorWave information for purposes unrelated to the
                  relevant tuition service without authorisation.
                </li>
              </ul>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. TutorWave's Role and Limitations
              </h2>

              <p>
                TutorWave makes reasonable efforts to facilitate suitable
                connections between parents/students and tutors.
              </p>

              <p className="mt-4">
                However, TutorWave does not guarantee that every tutor will
                meet a parent's expectations or that every tuition requirement
                will result in a successful or continuing arrangement.
              </p>

              <p className="mt-4">
                TutorWave is not responsible for circumstances arising from
                the independent conduct, decisions, representations, or actions
                of parents, students, or tutors.
              </p>

              <p className="mt-4">
                Users are responsible for exercising appropriate judgement when
                entering into tuition arrangements with another person.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Safety and Professional Conduct
              </h2>

              <p>
                The safety and wellbeing of students, parents, and tutors is
                important to TutorWave.
              </p>

              <p className="mt-4">
                Parents and guardians are encouraged to take reasonable
                precautions when arranging home tuition, including appropriate
                supervision and communication where necessary.
              </p>

              <p className="mt-4">
                Tutors must maintain professional boundaries with students and
                must not engage in inappropriate conduct.
              </p>

              <p className="mt-4">
                Any serious concern involving safety, misconduct, harassment,
                fraud, or inappropriate behaviour should be reported to
                TutorWave as soon as reasonably possible.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Intellectual Property
              </h2>

              <p>
                Unless otherwise stated, TutorWave's website, branding, logos,
                graphics, text, designs, content, software, and other
                materials are owned by or licensed to TutorWave.
              </p>

              <p className="mt-4">
                Users may not copy, reproduce, modify, distribute, publish,
                sell, or commercially exploit TutorWave's materials without
                prior written permission.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Suspension or Termination
              </h2>

              <p>
                TutorWave may restrict, suspend, or terminate access to its
                Services where reasonably necessary, including where a user:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Violates these Terms.</li>
                <li>Provides false or misleading information.</li>
                <li>Misuses TutorWave's platform or leads.</li>
                <li>Engages in abusive, fraudulent, or unlawful behaviour.</li>
                <li>
                  Creates a risk to the safety, security, or reputation of
                  TutorWave or its users.
                </li>
              </ul>

              <p className="mt-4">
                Where appropriate, TutorWave may also remove or restrict a
                tutor profile or tuition opportunity.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Privacy
              </h2>

              <p>
                TutorWave's collection and use of personal information is
                governed by our Privacy Policy.
              </p>

              <p className="mt-4">
                By using our Services, you should also review and understand
                the TutorWave Privacy Policy, which explains how personal
                information is collected, used, and shared.
              </p>

              <Link
                href="/privacy"
                className="inline-flex mt-4 text-[#0A6FF7] font-medium hover:underline"
              >
                Read our Privacy Policy →
              </Link>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                15. Third-Party Services
              </h2>

              <p>
                TutorWave may use third-party services for hosting,
                communication, analytics, payments, technology, or other
                operational purposes.
              </p>

              <p className="mt-4">
                Third-party services may have their own terms and privacy
                policies. TutorWave is not responsible for the independent
                terms or practices of third-party services.
              </p>
            </section>

            {/* 16 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                16. Changes to These Terms
              </h2>

              <p>
                TutorWave may update these Terms from time to time to reflect
                changes in our Services, business practices, technology, or
                applicable laws.
              </p>

              <p className="mt-4">
                The "Last Updated" date at the top of this page will indicate
                when these Terms were most recently revised.
              </p>

              <p className="mt-4">
                Continued use of the Services after an updated version is
                published may constitute acceptance of the revised Terms,
                subject to applicable law.
              </p>
            </section>

            {/* 17 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                17. Contact Us
              </h2>

              <p>
                If you have questions about these Terms, your TutorWave
                account, tuition leads, or our Services, please contact us.
              </p>

              <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-gray-200 p-5">
                <p className="font-semibold text-gray-900">
                  TutorWave
                </p>

                <p className="text-gray-600 mt-1">
                  Delhi NCR, India
                </p>

                <p className="text-gray-600 mt-1">
                  Phone: +91 8588879239
                </p>

                <p className="text-gray-600 mt-1">
                  Email: teamtutorwave@gmail.com.
                </p>
              </div>
            </section>

          </div>

          {/* Bottom Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <Link
              href="/"
              className="text-sm font-medium text-[#0A6FF7] hover:text-[#0759C9] transition-colors"
            >
              ← Back to TutorWave
            </Link>

            <Link
              href="/privacy"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
