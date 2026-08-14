import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

export default function BecomeTutorHero() {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <AppImage
          src="https://img.rocket.new/generatedImages/rocket_gen_img_15c682add-1786512411998.png"
          alt="A confident tutor explaining concepts to a student at a home study table in Delhi with books and natural light"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(13,17,24,0.72) 0%, rgba(13,17,24,0.50) 50%, #F8FAFC 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-20 pb-32 md:pb-40">
        <nav className="flex items-center gap-2 text-xs text-white/60 mb-10" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white/80 font-medium">Become a Tutor</span>
        </nav>

        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-xs font-semibold tracking-wide mb-8">
            <span className="w-2 h-2 rounded-full wave-float inline-block" style={{ backgroundColor: '#F8AD03' }} />
            Now accepting tutors across Delhi NCR
          </span>

          <h1 className="font-display text-hero-xl text-white mb-6">
            Turn your knowledge
            <br />
            <span className="italic" style={{ color: '#4BC2FD' }}>into a career.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-10 max-w-xl">
            Join TutorWave&apos;s verified tutor network in Delhi NCR. Get genuine leads, teach near your home, and build a stable teaching income on your schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#register" className="btn-white">
              Register as a Tutor
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://wa.me/919999000000?text=Hi%20TutorWave%2C%20I%20am%20interested%20in%20joining%20as%20a%20tutor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white border border-white/40 hover:border-white/70 hover:bg-white/10 transition-all duration-300 min-h-[52px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}