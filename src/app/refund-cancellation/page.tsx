```tsx
import Link from "next/link";

export default function RefundCancellationPage() {
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
              Refund & Cancellation Policy
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed">
              This policy explains how cancellations, refunds, and
              payment-related requests are handled by TutorWave.
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
                1. About This Policy
              </h2>

              <p>
                TutorWave is a home tuition platform that facilitates
                connections between parents or students and tutors.
              </p>

              <p className="mt-4">
                This Refund & Cancellation Policy explains how TutorWave
                handles payments, cancellations, and refund requests relating
                to services or fees charged directly by TutorWave.
              </p>

              <p className="mt-4">
                This policy should be read together with the TutorWave{" "}
                <Link
                  href="/terms"
                  className="text-[#0A6FF7] hover:underline font-medium"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#0A6FF7] hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Types of Payments
              </h2>

              <p>
                Depending on the service being used, TutorWave may receive
                certain payments from users, including applicable tutor
                registration fees, service fees, or other charges that are
                clearly communicated before payment.
              </p>

              <p className="mt-4">
                Any applicable fee, payment amount, refund condition, or
                promotional offer will be communicated to the relevant user
                before payment is requested.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Tutor Registration Fees
              </h2>

              <p>
                Where TutorWave charges a tutor registration or onboarding fee,
                the applicable fee and any refund conditions will be clearly
                communicated at the time of registration.
              </p>

              <p className="mt-4">
                If a specific registration offer states that the fee is
                refundable subject to certain conditions, the refund will be
                assessed according to those conditions.
              </p>

              <p className="mt-4">
                A tutor's eligibility for a refund may depend on compliance
                with the applicable registration terms, the accuracy of the
                information provided, and the specific offer under which the
                payment was made.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Tuition Fees Paid to Tutors
              </h2>

              <p>
                TutorWave primarily facilitates the connection between parents
                or students and tutors. Unless TutorWave has expressly
                collected a particular tuition payment on behalf of a tutor,
                tuition fees agreed directly between a parent/student and a
                tutor are not payments made to TutorWave.
              </p>

              <p className="mt-4">
                Accordingly, disputes concerning tuition fees, missed classes,
                class cancellations, replacement classes, or refunds relating
                to a direct parent-tutor arrangement should ordinarily be
                resolved between the relevant parent/student and tutor.
              </p>

              <p className="mt-4">
                TutorWave may assist in facilitating communication where
                reasonably appropriate, but does not automatically guarantee a
                refund of tuition fees paid directly to a tutor.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Cancellation by Tutors
              </h2>

              <p>
                Tutors should inform TutorWave as soon as reasonably possible
                if they are unable to continue with a tuition opportunity or
                are no longer available for a particular lead.
              </p>

              <p className="mt-4">
                Repeated cancellations, failure to attend agreed classes,
                misleading information, or other conduct that negatively
                affects parents or students may result in the tutor being
                restricted from receiving future opportunities.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                6. Cancellation by Parents or Students
              </h2>

              <p>
                Parents or students should inform TutorWave and the relevant
                tutor as soon as possible if a tuition requirement is cancelled
                or changed.
              </p>

              <p className="mt-4">
                Cancellation of a tuition requirement does not automatically
                create a refund entitlement for any payment already made to
                TutorWave. Any refund will depend on the specific service,
                payment terms, and applicable offer.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                7. Refund Eligibility
              </h2>

              <p>
                Refunds are considered according to the terms applicable to the
                specific payment or service.
              </p>

              <p className="mt-4">
                A refund may be considered where:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  TutorWave has expressly offered a refundable service or
                  registration plan.
                </li>
                <li>
                  A user satisfies the conditions attached to a particular
                  refund offer.
                </li>
                <li>
                  TutorWave has received a payment in error or an incorrect
                  amount.
                </li>
                <li>
                  A refund is required under applicable law.
                </li>
                <li>
                  TutorWave determines, at its reasonable discretion, that a
                  refund is appropriate in the circumstances.
                </li>
              </ul>

              <p className="mt-4">
                Refunds are not guaranteed merely because a user changes their
                mind, does not use a service, or is dissatisfied where the
                applicable service terms do not provide for a refund.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                8. Non-Refundable Situations
              </h2>

              <p>
                Unless otherwise stated for a particular offer, refunds may not
                be available where:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  The user has violated TutorWave's Terms & Conditions.
                </li>
                <li>
                  False, misleading, or incomplete information was provided.
                </li>
                <li>
                  The service has already been substantially provided.
                </li>
                <li>
                  The user has already received the benefit of the applicable
                  service or opportunity.
                </li>
                <li>
                  The refund request does not satisfy the conditions of a
                  specific promotional or refundable offer.
                </li>
              </ul>

              <p className="mt-4">
                This section does not limit any refund or consumer rights that
                cannot legally be excluded under applicable law.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                9. How to Request a Refund
              </h2>

              <p>
                To request a refund, please contact TutorWave using the contact
                details provided below.
              </p>

              <p className="mt-4">
                A refund request should include:
              </p>

              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Name of the person who made the payment</li>
                <li>Registered mobile number or email address</li>
                <li>Date of payment</li>
                <li>Amount paid</li>
                <li>Reason for the refund request</li>
                <li>
                  Any relevant payment or transaction reference, if available
                </li>
              </ul>

              <p className="mt-4">
                TutorWave may request additional information reasonably
                necessary to verify the payment and assess the request.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                10. Refund Processing
              </h2>

              <p>
                Once a refund is approved, TutorWave will generally initiate
                the refund using the original payment method where reasonably
                possible.
              </p>

              <p className="mt-4">
                The time taken for the refunded amount to appear in the user's
                account may depend on the payment gateway, bank, card issuer,
                or other financial institution involved.
              </p>

              <p className="mt-4">
                TutorWave is not responsible for delays caused solely by banks,
                payment gateways, or other third-party financial institutions.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                11. Duplicate or Incorrect Payments
              </h2>

              <p>
                If you believe that you have accidentally made a duplicate
                payment or have been charged an incorrect amount, please
                contact TutorWave as soon as possible.
              </p>

              <p className="mt-4">
                After verifying the transaction, TutorWave may process an
                appropriate adjustment or refund where applicable.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                12. Promotional Offers
              </h2>

              <p>
                From time to time, TutorWave may offer promotional pricing,
                discounted registration fees, refundable registration offers,
                or other special arrangements.
              </p>

              <p className="mt-4">
                Promotional offers may have specific eligibility requirements,
                validity periods, refund conditions, or other restrictions.
                The terms communicated with the particular offer will apply.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                13. Disputes and Payment Concerns
              </h2>

              <p>
                If you have a concern regarding a payment, cancellation, or
                refund, we encourage you to contact TutorWave first so that we
                can review the matter and attempt to resolve it fairly.
              </p>

              <p className="mt-4">
                Nothing in this policy is intended to remove or restrict any
                rights available to consumers under applicable law.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                14. Changes to This Policy
              </h2>

              <p>
                TutorWave may update this Refund & Cancellation Policy from
                time to time to reflect changes in our services, payment
                arrangements, business practices, or applicable laws.
              </p>

              <p className="mt-4">
                The "Last Updated" date at the top of this page will indicate
                when the policy was most recently revised.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                15. Contact TutorWave
              </h2>

              <p>
                For refund, cancellation, or payment-related questions, please
                contact TutorWave.
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
                  Email: Please use the official TutorWave contact email.
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

            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```
