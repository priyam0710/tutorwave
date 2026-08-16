import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import TutorRegistrationForm from '@/app/become-a-tutor/components/TutorRegistrationForm';

export const metadata: Metadata = {
  title: 'Become a Tutor — TutorWave',
  description:
    'Join TutorWave as a tutor and discover genuine home and online tuition opportunities across Delhi NCR.',
  alternates: {
    canonical: `${
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }/become-a-tutor`,
  },
  openGraph: {
    type: 'website',
    title: 'Become a Tutor — TutorWave',
    description:
      'Create your tutor profile and receive suitable tuition opportunities from TutorWave.',
    url: `${
      process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }/become-a-tutor`,
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Become a Tutor with TutorWave',
      },
    ],
  },
};

export default function BecomeATutorPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-[#F8FAFC] pt-12 pb-16 sm:pt-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-start">

            {/* LEFT SIDE */}
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-widest text-[#0A6FF7] mb-4">
                TUTOR REGISTRATION
              </p>

              <h1
                className="text-4xl sm:text-5xl font-bold text-[#0D1118] mb-5"
                style={{ letterSpacing: '-0.03em' }}
              >
                Build your TutorWave profile.
              </h1>

              <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl mb-10">
                Tell us about your qualifications, teaching experience and
                preferences. We&apos;ll use your profile to match you with
                suitable tuition opportunities.
              </p>

              <div className="space-y-7">

                {/* STEP 1 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                    01
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1118] mb-1">
                      Personal details
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      Basic information to create your tutor profile.
                    </p>
                  </div>
                </div>

                {/* STEP 2 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                    02
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1118] mb-1">
                      Education
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      Share your academic background and qualifications.
                    </p>
                  </div>
                </div>

                {/* STEP 3 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                    03
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1118] mb-1">
                      Teaching profile
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      Tell us exactly which classes, subjects and boards you
                      can teach.
                    </p>
                  </div>
                </div>

                {/* STEP 4 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                    04
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1118] mb-1">
                      Teaching preferences
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      Choose your preferred mode, areas and availability.
                    </p>
                  </div>
                </div>

                {/* STEP 5 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-[#0A6FF7] text-white flex items-center justify-center font-bold flex-shrink-0">
                    05
                  </div>

                  <div>
                    <h3 className="font-bold text-[#0D1118] mb-1">
                      Review & submit
                    </h3>
                    <p className="text-[#6B7280] leading-relaxed">
                      Review your information before submitting your profile.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT SIDE */}
            <TutorRegistrationForm />

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
