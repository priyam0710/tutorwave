'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

const classOptions = [
  'Select Class', 'Nursery', 'KG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
  'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12',
  'IIT-JEE', 'NEET','other',
];

const subjectOptions = [
  'Select Subject', 'All Subjects','Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
  'English', 'Hindi', 'Social Science', 'Computer Science', 'Economics', 'Accountancy','other',
];

const locationOptions = [
  'Select Location', 'Delhi', 'Noida', 'Greater Noida', 'Ghaziabad', 'Gurugram', 'Faridabad','other',
];

const modeOptions = ['Select Mode', 'Home Tuition', 'Online Classes', 'Both'];

export default function HomeTutorSearch() {
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
    if (selectedMode && selectedMode !== 'Select Mode') params?.set('mode', selectedMode);
    router?.push(`/tutors${params?.toString() ? '?' + params?.toString() : ''}`);
  };

  const selectCls = 'w-full bg-transparent text-[#0D1118] text-sm font-medium appearance-none outline-none cursor-pointer pr-6';

  return (
    <section className="py-12 bg-[#F8FAFC] border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Label */}
        <p className="text-center text-base font-bold text-[#0D1118] mb-6">
          What are you looking for?
        </p>

        <div className="bg-white border border-[#374151] rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.10)] px-6 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-stretch md:items-center">

 {/* Class */}
<div className="flex-1 min-w-0 md:px-4">
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
      Class
    </span>

    <div className="relative">
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e?.target?.value)}
        className={selectCls}
      >
        {classOptions?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  </div>
</div>

            <div className="hidden md:block w-px h-10 bg-[#E5E7EB] flex-shrink-0" />

            {/* Subject */}
<div className="flex-1 min-w-0 md:px-4">
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
      Subject
    </span>

    <div className="relative">
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e?.target?.value)}
        className={selectCls}
      >
        {subjectOptions?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  </div>
</div>
            <div className="hidden md:block w-px h-10 bg-[#E5E7EB] flex-shrink-0" />

     {/* Location */}
<div className="flex-1 min-w-0 md:px-4">
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
      Location
    </span>

    <div className="relative">
      <select
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e?.target?.value)}
        className={selectCls}
      >
        {locationOptions?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  </div>
</div>

            <div className="hidden md:block w-px h-10 bg-[#E5E7EB] flex-shrink-0" />

     {/* Mode */}
<div className="flex-1 min-w-0 md:px-4">
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
      Home / Online
    </span>

    <div className="relative">
      <select
        value={selectedMode}
        onChange={(e) => setSelectedMode(e?.target?.value)}
        className={selectCls}
      >
        {modeOptions?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        strokeWidth={2}
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#6B7280]"
      />
    </div>
  </div>
</div>
            <div className="hidden md:block w-px h-10 bg-[#E5E7EB] flex-shrink-0 md:ml-2" />

            {/* CTA */}
            <div className="md:pl-4 flex-shrink-0">
              <button
                onClick={handleFind}
                className="w-full md:w-auto bg-[#0A6FF7] text-white font-bold px-8 py-3 rounded-xl text-sm hover:bg-[#0858c8] transition-all duration-200 hover:shadow-md whitespace-nowrap min-h-[46px]"
              >
                Find Tutors
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
