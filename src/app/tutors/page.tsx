'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/app/components/WhatsAppButton';
import { tutors, Tutor } from '@/lib/data/tutors';
// ─── Filter Options ────────────────────────────────────────────────────────────
const SUBJECT_OPTIONS = ['All Subjects', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Hindi', 'Computer Science', 'Science', 'Social Science','Accounts','Economics'];
const CLASS_OPTIONS = ['All Classes', 'Nursery–UKG', 'Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12','IIT-JEE', 'NEET'];
const BOARD_OPTIONS = ['All Boards', 'CBSE', 'ICSE','State Board','NIOS'];
const LOCATION_OPTIONS = ['All Locations', 'Delhi', 'Noida', 'Greater Noida', 'Gurgaon', 'Ghaziabad', 'Faridabad'];
const MODE_OPTIONS = ['All Modes', 'Home', 'Online'];
const EXPERIENCE_OPTIONS = ['Any Experience', '1+ Years', '3+ Years', '5+ Years', '8+ Years','10+ Years','15+ Years' ];

// ─── Verified Badge ────────────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0C8F81] bg-[#E6F7F5] px-2 py-0.5 rounded-full">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <circle cx="6" cy="6" r="6" fill="#0C8F81" />
        <path d="M3.5 6l1.8 1.8 3.2-3.2" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Verified
    </span>
  );
}

// ─── Teaching Mode Pill ────────────────────────────────────────────────────────
function ModePill({ mode }: { mode: string }) {
  const isHome = mode === 'Home';
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
      isHome ? 'bg-[#FFF8E6] text-[#B07A00]' : 'bg-[#EBF4FF] text-[#0A6FF7]'
    }`}>
      {isHome ? (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ) : (
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      )}
      {mode}
    </span>
  );
}

// ─── Tutor Card ────────────────────────────────────────────────────────────────
function TutorCard({ tutor }: { tutor: Tutor }) {
  const modes: string[] = [];
  if (tutor.teachingMode.includes('home') || tutor.teachingMode.includes('both')) modes.push('Home');
  if (tutor.teachingMode.includes('online') || tutor.teachingMode.includes('both')) modes.push('Online');

  return (
    <article className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:border-[#0A6FF7]/40 hover:shadow-[0_8px_32px_rgba(10,111,247,0.08)] transition-all duration-300 flex flex-col">
      {/* Card Top: Photo + Info */}
      <div className="p-5 pb-4 flex gap-4">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#F8FAFC] border border-[#E5E7EB]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tutor.photo}
              alt={tutor.photoAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name + Badges + Meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h2 className="font-bold text-[#0D1118] text-[15px] leading-tight">
              {tutor.name}
            </h2>
            {tutor.verified && <VerifiedBadge />}
          </div>

          {/* Experience + Location */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#6B7280] mb-2">
            <span className="flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {tutor.experience} yrs exp
            </span>
            <span className="flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {tutor.locations[0]}
            </span>
          </div>

          {/* Teaching Modes */}
          <div className="flex gap-1.5 flex-wrap">
            {modes.map((m) => <ModePill key={m} mode={m} />)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-[#F0F2F5]" />

      {/* Subjects */}
      <div className="px-5 py-3">
        <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Subjects</p>
        <div className="flex flex-wrap gap-1.5">
          {tutor.subjects.slice(0, 3).map((s) => (
            <span key={s} className="text-[12px] font-medium px-2.5 py-1 bg-[#F8FAFC] text-[#0D1118] rounded-lg border border-[#E5E7EB]">
              {s}
            </span>
          ))}
          {tutor.subjects.length > 3 && (
            <span className="text-[12px] font-medium px-2.5 py-1 bg-[#F8FAFC] text-[#6B7280] rounded-lg border border-[#E5E7EB]">
              +{tutor.subjects.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Classes */}
      <div className="px-5 pb-3">
        <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2">Classes</p>
        <p className="text-[12px] text-[#0D1118]">
          {tutor.classes.slice(0, 4).join(', ')}{tutor.classes.length > 4 ? ` +${tutor.classes.length - 4} more` : ''}
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="px-5 pb-5 pt-3 border-t border-[#F0F2F5] flex gap-2.5">
        <Link
          href={`/tutors/${tutor.slug}`}
          className="flex-1 text-center text-[13px] font-semibold text-[#0A6FF7] bg-[#EBF4FF] hover:bg-[#D6EAFF] px-4 py-2.5 rounded-xl transition-colors"
        >
          View Profile
        </Link>
        <Link
          href={`/find-a-tutor?tutor=${tutor.slug}`}
          className="flex-1 text-center text-[13px] font-semibold text-white bg-[#0A6FF7] hover:bg-[#0858c8] px-4 py-2.5 rounded-xl transition-colors"
        >
          Request Tutor
        </Link>
      </div>
    </article>
  );
}

// ─── Filter Sidebar ────────────────────────────────────────────────────────────
interface FilterState {
  subject: string;
  classRange: string;
  board: string;
  location: string;
  mode: string;
  experience: string;
}

function FilterSidebar({ filters, onChange }: { filters: FilterState; onChange: (key: keyof FilterState, value: string) => void }) {
  const filterGroups: { label: string; key: keyof FilterState; options: string[] }[] = [
    { label: 'Subject', key: 'subject', options: SUBJECT_OPTIONS },
    { label: 'Class', key: 'classRange', options: CLASS_OPTIONS },
    { label: 'Board', key: 'board', options: BOARD_OPTIONS },
    { label: 'Location', key: 'location', options: LOCATION_OPTIONS },
    { label: 'Teaching Mode', key: 'mode', options: MODE_OPTIONS },
    { label: 'Experience', key: 'experience', options: EXPERIENCE_OPTIONS },
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden sticky top-[84px]">
        <div className="px-5 py-4 border-b border-[#F0F2F5]">
          <h3 className="text-[13px] font-bold text-[#0D1118] uppercase tracking-wider">Filters</h3>
        </div>
        <div className="divide-y divide-[#F0F2F5]">
          {filterGroups.map(({ label, key, options }) => (
            <div key={key} className="px-5 py-4">
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider mb-3">{label}</p>
              <div className="flex flex-col gap-1.5">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => onChange(key, opt)}
                    className={`text-left text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      filters[key] === opt
                        ? 'bg-[#EBF4FF] text-[#0A6FF7] font-semibold'
                        : 'text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#0D1118]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    subject: 'All Subjects',
    classRange: 'All Classes',
    board: 'All Boards',
    location: 'All Locations',
    mode: 'All Modes',
    experience: 'Any Experience',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tutor.name.toLowerCase().includes(q);
        const matchesSubject = tutor.subjects.some((s) => s.toLowerCase().includes(q));
        const matchesLocation = tutor.locations.some((l) => l.toLowerCase().includes(q));
        if (!matchesName && !matchesSubject && !matchesLocation) return false;
      }

      // Subject filter
      if (filters.subject !== 'All Subjects') {
        if (!tutor.subjects.includes(filters.subject)) return false;
      }

      // Board filter
      if (filters.board !== 'All Boards') {
        if (!tutor.boards.includes(filters.board)) return false;
      }

      // Location filter
      if (filters.location !== 'All Locations') {
        const loc = filters.location.toLowerCase();
        if (!tutor.locations.some((l) => l.toLowerCase().includes(loc))) return false;
      }

      // Mode filter
      if (filters.mode !== 'All Modes') {
        const modeKey = filters.mode.toLowerCase() as 'home' | 'online';
        if (!tutor.teachingMode.includes(modeKey) && !tutor.teachingMode.includes('both')) return false;
      }

      // Experience filter
      if (filters.experience !== 'Any Experience') {
        const minYears = parseInt(filters.experience);
        if (tutor.experience < minYears) return false;
      }

      // Class filter
      if (filters.classRange !== 'All Classes') {
        const classMap: Record<string, string[]> = {
          'Nursery–UKG': ['Nursery', 'LKG', 'UKG'],
          'Class 1–5': ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'],
          'Class 6–8': ['Class 6', 'Class 7', 'Class 8'],
          'Class 9–10': ['Class 9', 'Class 10'],
          'Class 11–12': ['Class 11', 'Class 12'],
        };
        const targetClasses = classMap[filters.classRange] || [];
        if (!tutor.classes.some((c) => targetClasses.includes(c))) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const hasActiveFilters = Object.values(filters).some((v) =>
    !['All Subjects', 'All Classes', 'All Boards', 'All Locations', 'All Modes', 'Any Experience'].includes(v)
  ) || searchQuery.trim() !== '';

  const clearFilters = () => {
    setFilters({ subject: 'All Subjects', classRange: 'All Classes', board: 'All Boards', location: 'All Locations', mode: 'All Modes', experience: 'Any Experience' });
    setSearchQuery('');
  };

  return (
    <>
      <Header />
      <main className="pt-16 md:pt-[68px]">

        {/* ── Page Header ─────────────────────────────────────────────────── */}
        <section className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 md:py-14">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-[13px] text-[#6B7280] mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#0A6FF7] transition-colors">Home</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-[#0D1118] font-medium">Tutors</span>
            </nav>

            <div className="max-w-2xl mb-8">
              <h1 className="text-3xl md:text-[2.5rem] font-extrabold text-[#0D1118] mb-3 leading-tight" style={{ letterSpacing: '-0.025em' }}>
                Find a Tutor
              </h1>
              <p className="text-[#6B7280] text-lg leading-relaxed">
                Explore verified tutors for home and online learning.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tutor name, subject or location…"
                className="w-full pl-11 pr-4 py-3.5 text-[15px] text-[#0D1118] bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0A6FF7]/20 focus:border-[#0A6FF7] transition-all placeholder:text-[#9CA3AF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-4 flex items-center text-[#9CA3AF] hover:text-[#6B7280]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ── Content Area ────────────────────────────────────────────────── */}
        <section className="bg-[#F8FAFC] py-10 md:py-14 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-5 flex items-center justify-between">
              <p className="text-[13px] text-[#6B7280]">
                <span className="font-bold text-[#0D1118]">{filteredTutors.length}</span> tutors found
              </p>
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 text-[13px] font-semibold text-[#0D1118] bg-white border border-[#E5E7EB] px-4 py-2 rounded-xl hover:border-[#0A6FF7] transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="8" y1="12" x2="20" y2="12" />
                  <line x1="12" y1="18" x2="20" y2="18" />
                </svg>
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-[#0A6FF7] rounded-full" />
                )}
              </button>
            </div>

            <div className="flex gap-8 items-start">
              {/* Sidebar — desktop always visible, mobile conditional */}
              <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
                <FilterSidebar filters={filters} onChange={handleFilterChange} />
              </div>

              {/* Results */}
              <div className="flex-1 min-w-0">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-[17px] font-bold text-[#0D1118]">
                      Tutors available for your learning needs
                    </h2>
                    <p className="text-[13px] text-[#6B7280] mt-0.5">
                      {filteredTutors.length} {filteredTutors.length === 1 ? 'tutor' : 'tutors'} found
                      {hasActiveFilters && ' · Filters applied'}
                    </p>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-[13px] font-semibold text-[#0A6FF7] hover:text-[#0858c8] transition-colors whitespace-nowrap"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Tutor Grid */}
                {filteredTutors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredTutors.map((tutor) => (
                      <TutorCard key={tutor.id} tutor={tutor} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl border border-[#E5E7EB] p-12 text-center">
                    <div className="w-12 h-12 bg-[#F8FAFC] rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#0D1118] mb-2">No tutors found</h3>
                    <p className="text-[13px] text-[#6B7280] mb-5">Try adjusting your filters or search query.</p>
                    <button
                      onClick={clearFilters}
                      className="text-[13px] font-semibold text-[#0A6FF7] hover:text-[#0858c8] transition-colors"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-10 bg-[#0D1118] rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-[17px] font-bold text-white mb-1">Can&apos;t find the right tutor?</h3>
                    <p className="text-[13px] text-[#9CA3AF] leading-relaxed">
                      Share your requirement and we&apos;ll identify suitable tutor options for your child.
                    </p>
                  </div>
                  <Link
                    href="/find-a-tutor"
                    className="flex-shrink-0 inline-flex items-center gap-2 bg-[#0A6FF7] text-white font-bold text-[14px] px-6 py-3 rounded-xl hover:bg-[#0858c8] transition-colors whitespace-nowrap"
                  >
                    Find a Tutor
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
