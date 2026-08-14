import React from 'react';

// ── Types ─────────────────────────────────────────────────────

type BadgeVariant = 'blue' | 'navy' | 'yellow' | 'teal' | 'coral' | 'neutral';

interface BadgeProps {
  variant?:   BadgeVariant;
  className?: string;
  children:   React.ReactNode;
  icon?:      React.ReactNode;
}

// ── Component ─────────────────────────────────────────────────

/**
 * TutorWave Badge
 *
 * Usage:
 *   <Badge variant="blue">Verified</Badge>
 *   <Badge variant="teal" icon={<CheckIcon />}>Home & Online</Badge>
 *
 * Colour rule: blue/navy for primary info, yellow/teal/coral as rare accents only.
 */
export default function Badge({
  variant = 'neutral',
  className,
  children,
  icon,
}: BadgeProps) {
  const variantClass: Record<BadgeVariant, string> = {
    blue:    'badge badge-blue',
    navy:    'badge badge-navy',
    yellow:  'badge badge-yellow',
    teal:    'badge badge-teal',
    coral:   'badge badge-coral',
    neutral: 'badge badge-neutral',
  };

  return (
    <span className={`${variantClass[variant]} ${className ?? ''}`}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
