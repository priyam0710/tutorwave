'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, Check } from 'lucide-react';

const classOptions = [
  'Select Class',
  'Nursery',
  'KG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
  'IIT-JEE',
  'NEET',
  'other',
];

const subjectOptions = [
  'Select Subject',
  'All Subjects',
  'Mathematics',
  'Science',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'Hindi',
  'Social Science',
  'Computer Science',
  'Economics',
  'Accountancy',
  'other',
];

const locationOptions = [
  'Select Location',
  'Delhi',
  'Noida',
  'Greater Noida',
  'Ghaziabad',
  'Gurugram',
  'Faridabad',
  'other',
];

const modeOptions = [
  'Select Mode',
  'Home Tuition',
  'Online Classes',
  'Both',
];

export default function HomeTutorSearch() {
  const router = useRouter();

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  // Close subject dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        subjectDropdownRef.current &&
        !subjectDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSubjectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Send search requirements to Tutors page
  const handleFind = () => {
    const params = new URLSearchParams();

    // Class
    if (
      selectedClass &&
      selectedClass !== 'Select Class'
    ) {
      params.set('class', selectedClass);
    }

    // Subjects
    if (selectedSubjects.length > 0) {
      params.set('subjects', selectedSubjects.join(','));
    }

    // Location
    if (
      selectedLocation &&
      selectedLocation !== 'Select Location'
    ) {
      params.set('location', selectedLocation);
    }

    // Teaching mode
    if (
      selectedMode &&
      selectedMode !== 'Select Mode'
    ) {
      params.set('mode', selectedMode);
    }

    const queryString = params.toString();

    router.push(
      queryString
        ? `/tutors?${queryString}`
        : '/tutors'
    );
  };

  const selectCls =
    'w-full bg-transparent text-[#0D1118] text-sm font-medium appearance-none outline-none cursor-pointer pr-6';

  return (
    <section className="py-12 bg-[#F8FAFC] border-t border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

        {/* Label */}
        <p className="text-center text-base font-bold text-[#0D1118] mb-6">
          What are you looking for?
        </p>

        <div className="bg-white border border-[#374151] rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.10)] px-6 py-5">
          <div className="flex flex-col md:flex-row gap-3 md:gap-0 items-stretch md:items-center">

            {/* ─────────────────────────────
                CLASS
            ───────────────────────────── */}
            <div className="flex-1 min-w-0 md:px-4">
              <div className="flex flex-col gap-0.5">

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Class
                </span>

                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) =>
                      setSelectedClass(e.target.value)
                    }
                    className={selectCls}
                  >
                    {classOptions.map((opt) => (
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

            {/* ─────────────────────────────
                SUBJECT — MULTI SELECT
            ───────────────────────────── */}
            <div
              className="flex-1 min-w-0 md:px-4"
              ref={subjectDropdownRef}
            >
              <div className="flex flex-col gap-0.5">

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Subject
                </span>

                <div className="relative">

                  {/* Dropdown Trigger */}
                  <button
                    type="button"
                    onClick={() =>
                      setIsSubjectOpen((prev) => !prev)
                    }
                    className="w-full flex items-center justify-between text-left bg-transparent text-[#0D1118] text-sm font-medium outline-none cursor-pointer pr-1"
                  >
                    <span
                      className={
                        selectedSubjects.length > 0
                          ? 'truncate'
                          : 'text-[#0D1118]
                      }
                    >
                      {selectedSubjects.length === 0
                        ? 'Select Subject'
                        : selectedSubjects.length === 1
                          ? selectedSubjects[0]
                          : `${selectedSubjects[0]} +${
                              selectedSubjects.length - 1
                            }`}
                    </span>

                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className={`flex-shrink-0 text-[#6B7280] transition-transform duration-200 ${
                        isSubjectOpen
                          ? 'rotate-180'
                          : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isSubjectOpen && (
                    <div className="absolute z-50 left-0 top-full mt-2 w-full min-w-[220px] bg-white border border-[#E5E7EB] rounded-xl shadow-[0_10px_30px_rgba(15,23,42,0.12)] overflow-hidden">

                      <div className="max-h-64 overflow-y-auto py-2">

                        {subjectOptions
                          .filter(
                            (opt) =>
                              opt !== 'Select Subject'
                          )
                          .map((opt) => {

                            const isSelected =
                              selectedSubjects.includes(
                                opt
                              );

                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => {
                                  setSelectedSubjects(
                                    (prev) =>
                                      isSelected
                                        ? prev.filter(
                                            (subject) =>
                                              subject !==
                                              opt
                                          )
                                        : [
                                            ...prev,
                                            opt,
                                          ]
                                  );
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#0D1118] hover:bg-[#F8FAFC] transition-colors"
                              >

                                {/* Checkbox */}
                                <span
                                  className={`w-4 h-4 flex-shrink-0 rounded border flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-[#0A6FF7] border-[#0A6FF7]'
                                      : 'border-[#D1D5DB] bg-white'
                                  }`}
                                >
                                  {isSelected && (
                                    <Check
                                      size={12}
                                      strokeWidth={3}
                                      className="text-white"
                                    />
                                  )}
                                </span>

                                <span className="truncate">
                                  {opt}
                                </span>

                              </button>
                            );
                          })}

                      </div>

                      {/* Bottom Action */}
                      <div className="border-t border-[#E5E7EB] px-4 py-3 flex items-center justify-between bg-[#FAFAFA]">

                        <span className="text-xs text-[#6B7280]">
                          {selectedSubjects.length === 0
                            ? 'No subjects selected'
                            : `${selectedSubjects.length} ${
                                selectedSubjects.length === 1
                                  ? 'subject'
                                  : 'subjects'
                              } selected`}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setIsSubjectOpen(false)
                          }
                          className="text-xs font-bold text-[#0A6FF7] hover:text-[#0858C8] transition-colors"
                        >
                          Done
                        </button>

                      </div>

                    </div>
                  )}

                </div>

              </div>
            </div>

            <div className="hidden md:block w-px h-10 bg-[#E5E7EB] flex-shrink-0" />

            {/* ─────────────────────────────
                LOCATION
            ───────────────────────────── */}
            <div className="flex-1 min-w-0 md:px-4">
              <div className="flex flex-col gap-0.5">

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Location
                </span>

                <div className="relative">

                  <select
                    value={selectedLocation}
                    onChange={(e) =>
                      setSelectedLocation(
                        e.target.value
                      )
                    }
                    className={selectCls}
                  >
                    {locationOptions.map((opt) => (
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

            {/* ─────────────────────────────
                MODE
            ───────────────────────────── */}
            <div className="flex-1 min-w-0 md:px-4">
              <div className="flex flex-col gap-0.5">

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                  Home / Online
                </span>

                <div className="relative">

                  <select
                    value={selectedMode}
                    onChange={(e) =>
                      setSelectedMode(
                        e.target.value
                      )
                    }
                    className={selectCls}
                  >
                    {modeOptions.map((opt) => (
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

            {/* ─────────────────────────────
                FIND TUTORS
            ───────────────────────────── */}
            <div className="md:pl-4 flex-shrink-0">

              <button
                type="button"
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
