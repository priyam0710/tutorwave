import Link from "next/link";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
              Your privacy matters to us. This policy explains how TutorWave
              collects, uses, and protects information when you use our
              website and services.
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
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. About This Policy
              </h2>

              <p>
                TutorWave ("TutorWave", "we", "us", or "our") is a home tuition
                platform that helps parents and students connect with suitable
                tutors and helps tutors find relevant tuition opportunities.
              </p>

              <p className="mt-4">
                This Privacy Policy explains what information we may collect,
                why we collect it, how we use it, and the choices available to
                you when you use the TutorWave website, forms, and services.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Information We Collect
              </h2>

              <p>
                Depending on how you interact with TutorWave, we may collect
                information that you voluntarily provide to us.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Parents and Students
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Parent or guardian name</li>
                <li>Student name, where provided</li>
                <li>Mobile or telephone number</li>
                <li>Email address</li>
                <li>City, locality, sector, or general location</li>
                <li>Student's class or grade</li>
                <li>Subjects required</li>
                <li>Preferred tuition mode</li>
                <li>Preferred schedule or availability</li>
                <li>Learning requirements shared with us</li>
                <li>Other information necessary to fulfil a tuition enquiry</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Tutors
              </h3>

              <ul className="list-disc pl-6 space-y-2">
                <li>Full name</li>
                <li>Mobile number</li>
                <li>Email address</li>
                <li>City and locality</li>
                <li>Subjects taught</li>
                <li>Classes or grades taught</li>
                <li>Teaching experience</li>
                <li>Educational qualifications</li>
                <li>Preferred teaching mode</li>
                <li>Availability</li>
                <li>Profile photograph, where provided</li>
                <li>Professional information and teaching preferences</li>
                <li>
                  Information or documents submitted for verification, where
                  applicable
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
                Technical Information
              </h3>

              <p>
                We may also collect limited technical information when you use
                our website, such as browser type, device information, pages
                visited, approximate usage information, and information
                necessary for website security and performance.
              </p>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. How We Use Your Information
              </h2>

              <p>
                We use information provided to us for purposes connected with
                operating TutorWave and providing our services, including:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Responding to tuition enquiries</li>
                <li>Understanding a student's tuition requirements</li>
                <li>Identifying suitable tutors</li>
                <li>Providing tutors with relevant tuition opportunities</li>
                <li>Creating and managing tutor profiles</li>
                <li>Communicating with parents, students, and tutors</li>
                <li>Scheduling calls, discussions, or demonstrations</li>
                <li>Verifying tutor information where applicable</li>
                <li>Improving our website and services</li>
                <li>Maintaining business and service records</li>
                <li>Preventing fraud, misuse, spam, or unauthorised activity</li>
                <li>Maintaining website and platform security</li>
                <li>Sending service-related communications</li>
                <li>
                  Sending relevant promotional communications where permitted
                </li>
                <li>Complying with applicable legal requirements</li>
              </ul>
            </section>

            {/* Parent Tutor Connection */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Connecting Parents and Tutors
              </h2>

              <p>
                TutorWave's primary purpose is to facilitate connections
                between parents or students and tutors.
              </p>

              <p className="mt-4">
                When a parent submits a tuition requirement, we may use the
                information provided to identify and contact suitable tutors.
                Relevant information may be shared with a tutor when reasonably
                necessary to facilitate the tuition connection.
              </p>

              <p className="mt-4">
                Similarly, information provided by tutors may be used to
                identify suitable tuition opportunities.
              </p>

              <p className="mt-4">
                We aim to share only information reasonably necessary for
                facilitating the relevant tuition connection.
              </p>
            </section>

            {/* Sharing */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. When We Share Information
              </h2>

              <p>
                TutorWave does not sell personal information as a commercial
                product.
              </p>

              <p className="mt-4">
                Information may be shared when reasonably necessary to provide
                our services, including:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  With suitable tutors or parents when facilitating a tuition
                  connection
                </li>
                <li>
                  With trusted service providers that help us operate our
                  website or services
                </li>
                <li>
                  With technical, hosting, communication, analytics, or
                  security service providers where necessary
                </li>
                <li>
                  When required or permitted by applicable law or legal
                  process
                </li>
                <li>
                  When reasonably necessary to protect the security, rights,
                  or safety of TutorWave or others
                </li>
              </ul>
            </section>

            {/* Communication */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Calls, WhatsApp and Other Communication
              </h2>

              <p>
                TutorWave may contact users through phone calls, WhatsApp,
                email, SMS, or other communication channels using the contact
                information provided by the user.
              </p>

              <p className="mt-4">
                Such communication may relate to tuition enquiries, tutor
                opportunities, registrations, service updates, support, or
                relevant promotional information.
              </p>

              <p className="mt-4">
                Users may request that promotional communications be stopped.
                Essential communications relating to an ongoing enquiry or
                service may still be sent where necessary.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Cookies and Website Analytics
              </h2>

              <p>
                TutorWave may use cookies and similar technologies to improve
                website functionality, understand website usage, remember
                preferences, maintain security, and measure the effectiveness
                of our marketing.
              </p>

              <p className="mt-4">
                You may be able to control cookies through your browser
                settings. Disabling certain cookies may affect some website
                functionality.
              </p>
            </section>

            {/* Security and Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Data Security and Retention
              </h2>

              <p>
                TutorWave takes reasonable measures to protect personal
                information against unauthorised access, misuse, loss,
                alteration, or disclosure.
              </p>

              <p className="mt-4">
                However, no online service or electronic storage system can be
                guaranteed to be completely secure.
              </p>

              <p className="mt-4">
                We retain personal information only for as long as reasonably
                necessary for providing our services, maintaining records,
                resolving disputes, preventing misuse, and complying with
                applicable legal requirements.
              </p>
            </section>

            {/* Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. Your Privacy Choices
              </h2>

              <p>
                Subject to applicable law, you may have rights concerning your
                personal information, including requesting access, correction,
                deletion, or withdrawal of consent where applicable.
              </p>

              <p className="mt-4">
                If you would like to make a privacy-related request or raise a
                concern regarding your personal information, please contact
                TutorWave using the contact details provided below.
              </p>

              <p className="mt-4">
                We may need to verify your identity before processing certain
                requests to protect your information.
              </p>
            </section>

            {/* Children */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Children's Privacy
              </h2>

              <p>
                TutorWave's services may involve students who are minors.
                Parents or legal guardians should provide information relating
                to a minor where they are authorised to do so.
              </p>

              <p className="mt-4">
                TutorWave does not intentionally seek unnecessary personal
                information directly from children.
              </p>
            </section>

            {/* Third Party */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Third-Party Services
              </h2>

              <p>
                Our website may use or link to third-party services such as
                hosting providers, analytics services, communication platforms,
                payment services, or social media platforms.
              </p>

              <p className="mt-4">
                Third-party services operate under their own privacy policies
                and terms. TutorWave is not responsible for the privacy
                practices of third-party websites or services.
              </p>
            </section>

            {/* Changes */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our services, technology, business practices, or
                applicable laws.
              </p>

              <p className="mt-4">
                The "Last Updated" date at the top of this page will be
                updated whenever this policy is revised.
              </p>
            </section>

            {/* Contact */}
            <section className="border-t border-gray-200 pt-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Contact TutorWave
              </h2>

              <p>
                If you have any questions, privacy concerns, or requests
                regarding your personal information, please contact us.
              </p>

              <div className="mt-6 rounded-xl bg-[#F8FAFC] border border-gray-200 p-5">
                <p className="font-semibold text-gray-900">TutorWave</p>
                <p className="text-gray-600 mt-1">Delhi NCR, India</p>
                <p className="text-gray-600 mt-1">
                  Phone: +91 8588879239
                </p>
                <p className="text-gray-600 mt-1">
                  Email: teamtutorwave@gmail.com
                </p>
              </div>
            </section>

            {/* Consent */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Consent
              </h2>

              <p>
                When you voluntarily submit your personal information through
                TutorWave's website or forms, we may use that information for
                the purposes described in this Privacy Policy and to provide
                the services or respond to the enquiry for which the
                information was submitted.
              </p>

              <p className="mt-4">
                Where applicable law requires consent, TutorWave will obtain
                consent through an appropriate mechanism.
              </p>
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
              href="/terms"
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms & Conditions →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
