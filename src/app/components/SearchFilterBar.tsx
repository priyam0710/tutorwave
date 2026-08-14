'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const classOptions = [
  'Select Class', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  'IIT-JEE', 'NEET', 'Other',
];

const subjectOptions = [
  'Select Subject', 'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'Social Science', 'Computer Science', 'Economics', 'Accountancy',
  'History', 'Geography', 'Political Science', 'Sanskrit', 'French', 'All Subjects',
];

const locationOptions = [
  'Select Location', 'Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad',
];

const modeOptions = ['Home / Online', 'Home Tuition', 'Online Classes', 'Both'];

export default function SearchFilterBar() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  const handleFind = () => {
    const params = new URLSearchParams();
    if (selectedClass && selectedClass !== 'Select Class') params?.set('class', selectedClass);
    if (selectedSubject && selectedSubject !== 'Select Subject') params?.set('subject', selectedSubject);
    if (selectedLocation && selectedLocation !== 'Select Location') params?.set('location', selectedLocation);
    if (selectedMode && selectedMode !== 'Home / Online') params?.set('mode', selectedMode);
    router?.push(`/tutors${params?.toString() ? '?' + params?.toString() : ''}`);
  };

  const selectClass = 'w-full bg-transparent text-white text-sm font-medium appearance-none outline-none cursor-pointer';

  return (
    <section className="relative z-20 -mt-1 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div
          className="rounded-2xl px-6 py-5 shadow-xl"
          style={{ background: '#0D1118' }}
        >
          {/* Label */}
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">
            What are you looking for?
          </p>

          <div className="flex flex-col md:flex-row gap-3 md:gap-2 items-stretch md:items-center">
            {/* Class / Level */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Class / Level</span>
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e?.target?.value)}
                  className={selectClass}
                  style={{ background: 'transparent' }}
                >
                  {classOptions?.map((opt) => (
                    <option key={opt} value={opt} style={{ background: '#0D1118', color: '#fff' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10 flex-shrink-0" />

            {/* Subject */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Subject</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e?.target?.value)}
                  className={selectClass}
                  style={{ background: 'transparent' }}
                >
                  {subjectOptions?.map((opt) => (
                    <option key={opt} value={opt} style={{ background: '#0D1118', color: '#fff' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10 flex-shrink-0" />

            {/* Location */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Location</span>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e?.target?.value)}
                  className={selectClass}
                  style={{ background: 'transparent' }}
                >
                  {locationOptions?.map((opt) => (
                    <option key={opt} value={opt} style={{ background: '#0D1118', color: '#fff' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-white/10 flex-shrink-0" />

            {/* Mode */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-0.5">
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-wider">Home / Online</span>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e?.target?.value)}
                  className={selectClass}
                  style={{ background: 'transparent' }}
                >
                  {modeOptions?.map((opt) => (
                    <option key={opt} value={opt} style={{ background: '#0D1118', color: '#fff' }}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleFind}
              className="flex-shrink-0 bg-[#0A6FF7] text-white font-bold px-7 py-3 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-200 hover:shadow-lg whitespace-nowrap min-h-[46px]"
            >
              Find Tutors
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
