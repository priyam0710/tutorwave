'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Find a Tutor', href: '/find-a-tutor' },
  { label: 'Tutors', href: '/tutors' },
  { label: 'Subjects', href: '/subjects' },
  { label: 'Micro Courses', href: '/micro-courses' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Resources', href: '/resources' },
  { label: 'Become a Tutor', href: '/become-a-tutor' },
];

const moreLinks = [
  { label: 'Locations', href: '/locations' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 bg-white transition-all duration-300 ${
          scrolled ? 'border-b border-[#E5E7EB] shadow-sm' : 'border-b border-[#F0F0F0]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[68px]">

            {/* Logo Lockup */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9 flex-shrink-0 rounded-xl overflow-hidden bg-white border border-[#E5E7EB]">
                <Image
                  src="/assets/images/TutorWave_logo-1786512070481.webp"
                  alt="TutorWave logo"
                  width={36}
                  height={36}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <span
                className="font-sans font-bold text-[1.1rem] text-[#0D1118] tracking-tight group-hover:text-[#0A6FF7] transition-colors duration-200"
                style={{ letterSpacing: '-0.025em' }}
              >
                TutorWave
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0">
              {navLinks?.map((link) => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  className={`text-[13px] font-medium px-2.5 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-[#0A6FF7] bg-[#EBF4FF]'
                      : 'text-[#6B7280] hover:text-[#0D1118] hover:bg-[#F8FAFC]'
                  }`}
                >
                  {link?.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-2 ml-2">
              <Link
                href="/find-a-tutor"
                className="text-sm font-bold text-white bg-[#0A6FF7] px-5 py-2 rounded-xl hover:bg-[#0858c8] transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap min-h-[38px] flex items-center gap-1.5"
              >
                Find a Tutor
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-lg hover:bg-[#F8FAFC] transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span className={`block w-5 h-0.5 bg-[#0D1118] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#0D1118] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-[#0D1118] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0D1118]/20 backdrop-blur-sm xl:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 bg-white shadow-2xl transform transition-transform duration-300 ease-out xl:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl overflow-hidden bg-white border border-[#E5E7EB]">
                <Image
                  src="/assets/images/TutorWave_logo-1786512070481.webp"
                  alt="TutorWave"
                  width={32}
                  height={32}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-sans font-bold text-base text-[#0D1118]" style={{ letterSpacing: '-0.02em' }}>
                TutorWave
              </span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F8FAFC] transition-colors text-[#6B7280]"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-0.5 mb-4 flex-1 overflow-y-auto">
            {navLinks?.map((link) => (
              <Link
                key={link?.label}
                href={link?.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium px-4 py-3 rounded-xl transition-colors min-h-[48px] flex items-center ${
                  isActive(link.href)
                    ? 'text-[#0A6FF7] bg-[#EBF4FF]'
                    : 'text-[#0D1118] hover:text-[#0A6FF7] hover:bg-[#EBF4FF]'
                }`}
              >
                {link?.label}
              </Link>
            ))}
            <div className="border-t border-[#E5E7EB] my-2" />
            {moreLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-medium px-4 py-2.5 rounded-xl transition-colors min-h-[44px] flex items-center ${
                  isActive(link.href)
                    ? 'text-[#0A6FF7] bg-[#EBF4FF]'
                    : 'text-[#6B7280] hover:text-[#0A6FF7] hover:bg-[#EBF4FF]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <Link
              href="/find-a-tutor"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-[#0A6FF7] text-white font-bold px-6 py-3.5 rounded-xl text-sm hover:bg-[#0858c8] transition-colors"
            >
              Find a Tutor
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/become-a-tutor"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-white text-[#0A6FF7] font-semibold px-6 py-3.5 rounded-xl text-sm border border-[#0A6FF7] hover:bg-[#EBF4FF] transition-colors"
            >
              Become a Tutor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}