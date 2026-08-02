// src/shared/components/brand-logo.tsx — Brand logo component.
// Renders the Migunani logo mark + wordmark with consistent sizing.

import Link from 'next/link';
import { routes } from '@/shared/config/routes';
import { cn } from '@/lib/utils';

export interface BrandLogoProps {
  /** Show the wordmark next to the logo mark. Default: true */
  showWordmark?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Wrap in a link to homepage. Default: true */
  asLink?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { mark: 'h-6 w-6', text: 'text-base' },
  md: { mark: 'h-8 w-8', text: 'text-lg' },
  lg: { mark: 'h-10 w-10', text: 'text-2xl' },
};

export function BrandLogo({
  showWordmark = true,
  size = 'md',
  asLink = true,
  className,
}: BrandLogoProps) {
  const sizes = sizeMap[size];

  const content = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      {/* Logo mark — inline SVG for instant render */}
      <svg
        viewBox="0 0 256 256"
        className={sizes.mark}
        aria-hidden="true"
        role="img"
      >
        <rect width="256" height="256" rx="56" fill="currentColor" className="text-foreground" />
        <path
          d="M64 80 L192 80 L192 104 L136 104 L136 192 L120 192 L120 104 L64 104 Z"
          fill="hsl(var(--background))"
        />
        <circle cx="192" cy="80" r="8" fill="hsl(var(--accent))" />
        <rect x="64" y="208" width="128" height="4" rx="2" fill="hsl(var(--accent))" opacity="0.6" />
      </svg>
      {showWordmark && (
        <span className={cn('font-semibold tracking-tight', sizes.text)}>
          Migunani
        </span>
      )}
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href={routes.home}
      className="inline-flex items-center rounded-md transition-opacity hover:opacity-80"
      aria-label="Migunani — homepage"
    >
      {content}
    </Link>
  );
}
