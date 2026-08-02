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
        {/* Twin peaks forming an "M" — theme-aware */}
        <rect width="256" height="256" rx="56" fill="currentColor" className="text-foreground" />
        <path
          d="M32,182 L88,76 L144,182 L116,182 L88,129.2 L60,182 Z"
          fill="hsl(var(--background))"
        />
        <path
          d="M112,182 L168,76 L224,182 L196,182 L168,129.2 L140,182 Z"
          fill="hsl(var(--accent))"
        />
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
