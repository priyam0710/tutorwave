import React from 'react';

interface SectionLabelProps {
  children:   React.ReactNode;
  dark?:      boolean;
  className?: string;
}

/**
 * TutorWave Section Label (overline/eyebrow)
 *
 * Usage:
 *   <SectionLabel>Find a Tutor</SectionLabel>
 *   <SectionLabel dark>For Tutors</SectionLabel>
 */
export default function SectionLabel({ children, dark = false, className }: SectionLabelProps) {
  return (
    <span
      className={`${dark ? 'section-label-dark' : 'section-label'} ${className ?? ''}`}
    >
      {children}
    </span>
  );
}
