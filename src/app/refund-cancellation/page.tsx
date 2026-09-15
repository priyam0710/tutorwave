import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund & Cancellation Policy | TutorWave",
  description:
    "Read TutorWave's Refund & Cancellation Policy covering tutor registration, verification charges, promotional registration offers and tuition placement services.",
};

export default function RefundCancellationPage() {
  return (
    <>
      <Header />

      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#F7FAFF] border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-[#EAF3FF] px-4 py-2 mb-5">
                <span className="text-sm font-semibold text-[#0A6FF7]">
                  TutorWave Policies
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#111827] tracking-tight">
                Refund &amp; Cancellation Policy
              </h1>

              <p className="mt-5 text-lg md:text-xl text-gray-600 leading-relaxed">
                At TutorWave, we believe in keeping our registration and
                service terms clear, transparent and easy to understand.
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Last Updated: 15 September 2026
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  1. About This Policy
                </h2>

                <p className="text-gray-600 leading-8">
                  This Refund &amp; Cancellation Policy explains the refund
                  conditions applicable to tutors who register with TutorWave
                  for verification, KYC and tuition opportunities.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  TutorWave provides home tuition, group tuition, institute
                  opportunities and school job opportunities across Delhi NCR.
                  This policy should be read together with TutorWave&apos;s
                  Terms &amp; Conditions.
                </p>
              </section>

              {/* Standard Registration Fee */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  2. Standard Tutor Registration Fee
                </h2>

                <p className="text-gray-600 leading-8">
                  TutorWave charges a one-time registration fee of{" "}
                  <strong className="text-gray-900">₹499</strong> for tutor
                  verification and KYC purposes.
                </p>

                <div className="mt-6 rounded-2xl border border-[#DCEAFF] bg-[#F7FAFF] p-6">
                  <h3 className="text-lg font-semibold text-[#111827] mb-4">
                    Standard Registration Terms
                  </h3>

                  <ul className="space-y-3 text-gray-600 leading-7">
                    <li className="flex gap-3">
                      <span className="text-[#0A6FF7] font-bold">•</span>
                      <span>
                        The standard registration fee is{" "}
                        <strong className="text-gray-900">₹499</strong>.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span className="text-[#0A6FF7] font-bold">•</span>
                      <span>
                        It is a one-time fee for tutor verification and KYC
                        purposes.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span className="text-[#0A6FF7] font-bold">•</span>
                      <span>
                        The registration remains valid for{" "}
                        <strong className="text-gray-900">one year</strong>.
                      </span>
                    </li>

                    <li className="flex gap-3">
                      <span className="text-[#0A6FF7] font-bold">•</span>
                      <span>
                        Refund eligibility is subject to the conditions
                        described below.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Refund Eligibility */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  3. Refund Eligibility for the ₹499 Registration Fee
                </h2>

                <p className="text-gray-600 leading-8">
                  A tutor who pays the standard ₹499 registration fee will be
                  eligible for a full refund if the tutor does{" "}
                  <strong className="text-gray-900">
                    not receive any demo class through TutorWave within one
                    year
                  </strong>{" "}
                  from the date of registration.
                </p>

                <div className="mt-6 rounded-2xl bg-[#0D1118] p-6 md:p-8">
                  <p className="text-white text-lg md:text-xl font-semibold leading-8">
                    No demo class through TutorWave within one year =
                    <span className="text-[#4BC2FD]">
                      {" "}
                      100% refund of the standard ₹499 registration fee.
                    </span>
                  </p>
                </div>

                <p className="mt-5 text-gray-600 leading-8">
                  Refund requests will be subject to verification of the
                  tutor&apos;s registration details and TutorWave records.
                </p>
              </section>

              {/* Promotional Charges */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  4. Promotional &amp; Discounted Registration Charges
                </h2>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                  <p className="text-gray-700 leading-8">
                    TutorWave may offer discounted or promotional registration
                    charges from time to time as part of special campaigns,
                    limited-period offers or other promotional activities.
                  </p>

                  <p className="mt-4 text-gray-700 leading-8 font-semibold">
                    Any registration fee paid under a promotional or discounted
                    offer is strictly non-refundable.
                  </p>

                  <p className="mt-4 text-gray-600 leading-8">
                    Promotional registration charges are not eligible for the
                    standard ₹499 refund described in this policy, even if the
                    tutor does not receive a demo class during the promotional
                    registration period.
                  </p>
                </div>
              </section>

              {/* Cancellation */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  5. Cancellation of Tutor Registration
                </h2>

                <p className="text-gray-600 leading-8">
                  A tutor may choose to discontinue their association with
                  TutorWave at any time. However, cancellation of registration
                  does not by itself create an automatic right to a refund.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  For the standard ₹499 registration fee, refund eligibility
                  will be determined according to the one-year no-demo
                  condition stated in this policy.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  Promotional or discounted registration charges remain
                  non-refundable as specified above.
                </p>
              </section>

              {/* Class Placement Charges */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  6. Tutor Placement &amp; First-Month Fee
                </h2>

                <p className="text-gray-600 leading-8">
                  If TutorWave provides a tuition opportunity to a tutor and
                  the tutor receives a class through TutorWave, TutorWave will
                  charge{" "}
                  <strong className="text-gray-900">
                    50% of the total first-month fee
                  </strong>{" "}
                  for the class provided.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  TutorWave charges this amount only for the first month. The
                  subsequent monthly tuition amounts belong to the tutor,
                  subject to the applicable arrangement with the student or
                  parent.
                </p>

                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-gray-700 leading-8">
                    <strong className="text-gray-900">
                      Example:
                    </strong>{" "}
                    If the agreed monthly tuition fee is ₹10,000, the
                    applicable TutorWave charge for the first month would be
                    ₹5,000. The remaining amount would be payable to the tutor
                    according to the agreed arrangement.
                  </p>
                </div>
              </section>

              {/* Demo / Class */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  7. Demo Classes &amp; Refund Eligibility
                </h2>

                <p className="text-gray-600 leading-8">
                  The refund condition for the standard ₹499 registration fee
                  is linked to whether a tutor receives a demo class through
                  TutorWave within the one-year registration period.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  Once a demo class has been provided through TutorWave within
                  the applicable registration period, the tutor will not
                  qualify for the full ₹499 refund under the specific
                  no-demo-within-one-year condition.
                </p>
              </section>

              {/* Refund Process */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  8. Refund Request &amp; Verification
                </h2>

                <p className="text-gray-600 leading-8">
                  Eligible tutors may contact TutorWave to request a refund.
                  Before processing a refund, TutorWave may verify the
                  following information:
                </p>

                <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>Tutor&apos;s registered name</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>Registered mobile number</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>Registration date</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>Verification/KYC records</span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>
                      TutorWave records regarding demo classes and tuition
                      opportunities
                    </span>
                  </li>
                </ul>

                <p className="mt-5 text-gray-600 leading-8">
                  Refund requests may be declined where the tutor does not
                  satisfy the applicable refund conditions or where the
                  registration was made under a promotional/non-refundable
                  offer.
                </p>
              </section>

              {/* Tutor Responsibilities */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  9. Tutor Responsibilities
                </h2>

                <p className="text-gray-600 leading-8">
                  Tutors are expected to remain reachable and keep their
                  information updated so that TutorWave can communicate
                  relevant opportunities.
                </p>

                <ul className="mt-5 space-y-3 text-gray-600 leading-7">
                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>
                      Tutors should remain updated on WhatsApp, as TutorWave
                      may communicate tuition leads through WhatsApp.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>
                      Tutors should inform TutorWave promptly if their address
                      or contact details change.
                    </span>
                  </li>

                  <li className="flex gap-3">
                    <span className="text-[#0A6FF7] font-bold">•</span>
                    <span>
                      Tutors may be required to provide appropriate identity
                      proof to clients when requested.
                    </span>
                  </li>
                </ul>
              </section>

              {/* Referral */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  10. Tutor Referral Program
                </h2>

                <p className="text-gray-600 leading-8">
                  TutorWave may provide a referral benefit to tutors who refer
                  student leads to TutorWave.
                </p>

                <div className="mt-6 rounded-2xl border border-[#DCEAFF] bg-[#F7FAFF] p-6">
                  <p className="text-gray-700 leading-8">
                    If a tutor provides a student lead to TutorWave and the
                    lead is successfully converted, TutorWave provides the
                    referring tutor with{" "}
                    <strong className="text-gray-900">
                      20% of the first-month fee
                    </strong>
                    .
                  </p>
                </div>

                <p className="mt-4 text-gray-600 leading-8">
                  The referral benefit is separate from the tutor registration
                  fee and its refund conditions.
                </p>
              </section>

              {/* No Automatic Refund */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  11. No Automatic Refund
                </h2>

                <p className="text-gray-600 leading-8">
                  Payment of a registration fee does not guarantee a specific
                  number of tuition leads, demos, students or classes.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  Refund eligibility is determined solely according to the
                  applicable terms of this policy and the TutorWave Terms &amp;
                  Conditions.
                </p>
              </section>

              {/* Acceptance */}
              <section>
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4">
                  12. Acceptance of This Policy
                </h2>

                <p className="text-gray-600 leading-8">
                  By submitting the TutorWave online Tutor Registration Form,
                  the tutor confirms that the information and documents
                  submitted are true and correct and agrees to comply with
                  TutorWave&apos;s terms and conditions.
                </p>
              </section>

              {/* Contact */}
              <section className="rounded-2xl bg-[#0D1118] p-7 md:p-9">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Questions About Refunds?
                </h2>

                <p className="text-white/60 leading-7 mb-6">
                  If you believe you are eligible for a refund or need
                  clarification regarding your registration, please contact
                  TutorWave with your registered details.
                </p>

                <a
                  href="https://wa.me/918588879239"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Contact TutorWave on WhatsApp
                </a>
              </section>

              {/* Related Policies */}
              <section className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-[#111827] mb-4">
                  Related Policies
                </h3>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/privacy"
                    className="text-sm font-medium text-[#0A6FF7] hover:underline"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms"
                    className="text-sm font-medium text-[#0A6FF7] hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>

                  <Link
                    href="/contact"
                    className="text-sm font-medium text-[#0A6FF7] hover:underline"
                  >
                    Contact TutorWave
                  </Link>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
