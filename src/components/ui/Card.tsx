import React from 'react';

// ── Types ─────────────────────────────────────────────────────

type CardVariant = 'base' | 'interactive' | 'elevated' | 'dark';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?:   CardVariant;
  padding?:   CardPadding;
  className?: string;
  children:   React.ReactNode;
  onClick?:   () => void;
  as?:        'div' | 'article' | 'section' | 'li';
}

// ── Class Builder ─────────────────────────────────────────────

function buildClasses(
  variant: CardVariant,
  padding: CardPadding,
  className?: string,
): string {
  const variantClass: Record<CardVariant, string> = {
    base:        'card',
    interactive: 'card-interactive',
    elevated:    'card-elevated',
    dark:        'card-dark',
  };

  const paddingClass: Record<CardPadding, string> = {
    none: '!p-0',
    sm:   '!p-4',
    md:   '!p-6',
    lg:   '!p-8',
  };

  return [
    variantClass[variant],
    padding !== 'md' ? paddingClass[padding] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

// ── Component ─────────────────────────────────────────────────

/**
 * TutorWave Card
 *
 * Usage:
 *   <Card>Content</Card>
 *   <Card variant="interactive" onClick={handleClick}>Clickable card</Card>
 *   <Card variant="elevated" padding="lg">Spacious card</Card>
 *   <Card variant="dark">Dark section card</Card>
 */
export default function Card({
  variant = 'base',
  padding = 'md',
  className,
  children,
  onClick,
  as: Tag = 'div',
}: CardProps) {
  const classes = buildClasses(variant, padding, className);

  const TagComponent = Tag as React.ElementType;

  return (
    <TagComponent className={classes} onClick={onClick}>
      {children}
    </TagComponent>
  );
}
