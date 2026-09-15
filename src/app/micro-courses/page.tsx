import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Micro Courses | TutorWave",
  description:
    "TutorWave Micro Courses are coming soon. Stay tuned for practical and focused learning experiences.",
};

export default function MicroCoursesPage() {
  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-white flex items-center">
        <section className="w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3FF] px-5 py-2 mb-7">
              <span className="w-2 h-2 rounded-full bg-[#0A6FF7] animate-pulse"></span>

              <span className="text-sm font-semibold text-[#0A6FF7]">
                Coming Soon
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#111827] tracking-tight">
              Micro Courses
              <br />
              <span className="text-[#0A6FF7]">Are Coming Soon</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-8">
              We&apos;re working on a collection of focused, practical and
              easy-to-learn courses designed to help students build useful
              skills beyond the classroom.
            </p>

            <p className="mt-4 max-w-xl mx-auto text-sm sm:text-base text-gray-500 leading-7">
              Stay connected with TutorWave for updates when our Micro Courses
              officially launch.
            </p>

            {/* Visual */}
            <div className="mt-10 flex justify-center">
              <div className="relative w-28 h-28 rounded-3xl bg-[#F1F6FF] flex items-center justify-center">

                <div className="absolute inset-3 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 3L14.09 8.26L20 9.27L15.5 13.97L16.54 20L12 17.27L7.46 20L8.5 13.97L4 9.27L9.91 8.26L12 3Z"
                      stroke="#0A6FF7"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-[#0A6FF7] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0862DD] transition-colors"
              >
                Back to Home
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3.5 text-sm font-semibold text-gray-700 hover:border-[#0A6FF7] hover:text-[#0A6FF7] transition-colors"
              >
                Contact TutorWave
              </Link>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
