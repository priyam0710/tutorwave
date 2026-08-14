'use client';

import React from 'react';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white' | 'ghost';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  className?: string;
  children:  React.ReactNode;
  disabled?: boolean;
  loading?:  boolean;
  icon?:     React.ReactNode;
  iconPosition?: 'left' | 'right';
}

interface ButtonAsButtonProps extends ButtonBaseProps {
  as?: 'button';
  href?: never;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: 'link';
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// ── Class Builder ─────────────────────────────────────────────

function buildClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
  disabled?: boolean,
): string {
  const variantClass: Record<ButtonVariant, string> = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    outline:   'btn-outline',
    white:     'btn-white',
    ghost:     'btn-ghost',
  };

  const sizeClass: Record<ButtonSize, string> = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  };

  const classes = [
    variantClass[variant],
    sizeClass[size],
    disabled ? 'opacity-50 pointer-events-none' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return classes;
}

// ── Component ─────────────────────────────────────────────────

/**
 * TutorWave Button
 *
 * Usage:
 *   <Button variant="primary">Find a Tutor</Button>
 *   <Button variant="secondary" size="lg">Become a Tutor</Button>
 *   <Button as="link" href="/find-a-tutor" variant="primary">Find a Tutor</Button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  loading,
  icon,
  iconPosition = 'right',
  ...rest
}: ButtonProps) {
  const classes = buildClasses(variant, size, className, disabled || loading);

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </>
  );

  if ((rest as ButtonAsLinkProps).as === 'link') {
    const { href } = rest as ButtonAsLinkProps;
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const { onClick, type = 'button' } = rest as ButtonAsButtonProps;
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
