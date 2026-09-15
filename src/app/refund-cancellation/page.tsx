import Link from "next/link";

export default function RefundCancellationPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[#0D1118]">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-[#0A6FF7]/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#4BC2FD]/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex text-sm text-white/50 transition-colors hover:text-white"
          >
            ← Back to TutorWave
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#4BC2FD]">
              TutorWave
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Refund &amp; Cancellation Policy
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/60 sm:text-lg">
              This policy explains how cancellations, refunds, and
              payment-related requests are handled by TutorWave.
            </p>

            <p className="mt-6 text-sm text-white/40">
              Last Updated: 15 September 2026
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
          <div className="space-y-10 text-gray-700 leading-7">

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                1. About This Policy
              </h2>

              <p>
                TutorWave is a home tuition platform that facilitates
                connections between parents or students and tutors.
              </p>

              <p className="mt-4">
                This Refund &amp; Cancellation Policy explains how TutorWave
                handles payments, cancellations, and refund requests relating
                to services or fees charged directly by TutorWave.
              </p>

              <p className="mt-4">
                This policy should be read together with our{" "}
                <Link
                  href="/terms"
                  className="font-medium text-[#0A6FF7] hover:underline"
                >
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#0A6FF7] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                4. Tuition Fees Paid to Tutors
              </h2>

              <p>
                TutorWave primarily facilitates the connection between parents
                or students and tutors. Unless TutorWave has expressly
                collected a particular tuition payment on behalf of a tutor,
                tuition fees agreed directly between a parent or student and a
                tutor are not payments made to TutorWave.
              </p>

              <p className="mt-4">
                Disputes concerning tuition fees, missed classes, class
                cancellations, replacement classes, or refunds relating to a
                direct parent-tutor arrangement should ordinarily be resolved
                between the relevant parent or student and tutor.
              </p>

              <p className="mt-4">
                TutorWave may assist in facilitating communication where
                reasonably appropriate, but does not automatically guarantee a
                refund of tuition fees paid directly to a tutor.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                6. Cancellation by Parents or Students
              </h2>

              <p>
                Parents or students should inform TutorWave and the relevant
                tutor as soon as possible if a tuition requirement is
                cancelled or changed.
              </p>

              <p className="mt-4">
                Cancellation of a tuition requirement does not automatically
                create a refund entitlement for any payment already made to
                TutorWave. Any refund will depend on the specific service,
                payment terms, and applicable offer.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                7. Refund Eligibility
              </h2>

              <p>
                Refunds are considered according to the terms applicable to the
                specific payment or service.
              </p>

              <p className="mt-4">
                A refund may be considered where:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
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
                  TutorWave determines that a refund is appropriate in the
                  circumstances.
                </li>
              </ul>

              <p className="mt-4">
                Refunds are not guaranteed merely because a user changes their
                mind, does not use a service, or is dissatisfied where the
                applicable service terms do not provide for a refund.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                8. Situations Where a Refund May Not Apply
              </h2>

              <p>
                Unless otherwise stated for a particular offer, refunds may not
                be available where:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  The user has violated TutorWave's Terms &amp; Conditions.
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                9. How to Request a Refund
              </h2>

              <p>
                To request a refund, please contact TutorWave using the
                contact details provided below.
              </p>

              <p className="mt-4">
                A refund request should include:
              </p>

              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Name of the person who made the payment</li>
                <li>Registered mobile number or email address</li>
                <li>Date of payment</li>
                <li>Amount paid</li>
                <li>Reason for the refund request</li>
                <li>
                  Payment or transaction reference, if available
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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
                TutorWave is not responsible for delays caused solely by
                banks, payment gateways, or other third-party financial
                institutions.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                12. Promotional Offers
              </h2>

              <p>
                TutorWave may offer promotional pricing, discounted
                registration fees, refundable registration offers, or other
                special arrangements from time to time.
              </p>

              <p className="mt-4">
                Promotional offers may have specific eligibility requirements,
                validity periods, refund conditions, or other restrictions.
                The terms communicated with the particular offer will apply.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                13. Payment Disputes
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

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                14. Changes to This Policy
              </h2>

              <p>
                TutorWave may update this Refund &amp; Cancellation Policy
                from time to time to reflect changes in our services, payment
                arrangements, business practices, or applicable laws.
              </p>

              <p className="mt-4">
                The "Last Updated" date at the top of this page will indicate
                when the policy was most recently revised.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                15. Contact TutorWave
              </h2>

              <p>
                For refund, cancellation, or payment-related questions, please
                contact TutorWave.
              </p>

              <div className="mt-6 rounded-xl border border-gray-200 bg-[#F8FAFC] p-5">
                <p className="font-semibold text-gray-900">
                  TutorWave
                </p>

                <p className="mt-1 text-gray-600">
                  Delhi NCR, India
                </p>

                <p className="mt-1 text-gray-600">
                  Phone: +91 8588879239
                </p>

                <p className="mt-1 text-gray-600">
                  Email: Please use the official TutorWave contact email.
                </p>
              </div>
            </section>

          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/"
              className="text-sm font-medium text-[#0A6FF7] transition-colors hover:text-[#0759C9]"
            >
              ← Back to TutorWave
            </Link>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/privacy"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
