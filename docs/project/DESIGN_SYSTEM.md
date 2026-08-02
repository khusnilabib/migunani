# Design System — Toolbox v1.0

> Premium SaaS visual identity for the browser-first productivity ecosystem.

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing Scale](#spacing-scale)
5. [Border Radius](#border-radius)
6. [Elevation System](#elevation-system)
7. [Motion System](#motion-system)
8. [Icon Guidelines](#icon-guidelines)
9. [Component Catalog](#component-catalog)
10. [Layout Guidelines](#layout-guidelines)
11. [Accessibility Guidelines](#accessibility-guidelines)
12. [Responsive Breakpoints](#responsive-breakpoints)

---

## Brand Identity

### Logo

The Toolbox logo is a geometric "T" mark formed by overlapping tool shapes, set against a rounded square background.

- **Primary**: Dark background with light mark (for light themes)
- **Light variant**: Light background with dark mark (for dark themes)
- **App icon**: Full-bleed version for PWA/mobile

**Usage:**
```tsx
import { BrandLogo } from '@/shared/components/brand-logo';

<BrandLogo size="md" />          // Logo + wordmark
<BrandLogo size="sm" showWordmark={false} />  // Logo only
```

### Logo Mark

The mark consists of:
1. A rounded square container (56px radius at 256px)
2. A stylized "T" formed by vertical and horizontal bars
3. A small accent dot (blue) in the top-right
4. A subtle accent line at the bottom

### Wordmark

- Font: Inter (or system sans-serif fallback)
- Weight: 600 (semibold)
- Letter-spacing: -0.025em (tracking-tight)
- Size variants: sm (16px), md (18px), lg (24px)

### Accent Color

A single restrained blue accent (`hsl(221 83% 53%)`) is used sparingly for:
- Interactive element highlights
- Active states
- Key data points
- Brand emphasis

---

## Color System

### Light Theme

| Token | HSL | Usage |
|-------|-----|-------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `240 10% 3.9%` | Primary text |
| `--card` | `0 0% 100%` | Card backgrounds |
| `--primary` | `240 10% 3.9%` | Primary actions (deep ink) |
| `--primary-foreground` | `0 0% 98%` | Text on primary |
| `--secondary` | `240 4.8% 95.9%` | Secondary surfaces |
| `--muted` | `240 4.8% 95.9%` | Muted backgrounds |
| `--muted-foreground` | `240 3.8% 46.1%` | Muted text |
| `--accent` | `221 83% 53%` | Accent (blue) |
| `--accent-foreground` | `0 0% 98%` | Text on accent |
| `--destructive` | `0 84.2% 60.2%` | Error states |
| `--success` | `142 71% 45%` | Success states |
| `--warning` | `38 92% 50%` | Warning states |
| `--border` | `240 5.9% 90%` | Borders |
| `--ring` | `240 10% 3.9%` | Focus rings |
| `--input` | `240 5.9% 90%` | Input borders |

### Dark Theme

| Token | HSL | Usage |
|-------|-----|-------|
| `--background` | `240 10% 3.9%` | Page background (deep ink) |
| `--foreground` | `0 0% 98%` | Primary text |
| `--card` | `240 10% 5.5%` | Card backgrounds (slightly elevated) |
| `--primary` | `0 0% 98%` | Primary actions (inverted) |
| `--secondary` | `240 3.7% 15.9%` | Secondary surfaces |
| `--muted` | `240 3.7% 15.9%` | Muted backgrounds |
| `--muted-foreground` | `240 5% 64.9%` | Muted text |
| `--accent` | `217 91% 60%` | Accent (brighter blue for dark) |

### Chart Colors

Five-step monochrome scale with accent:
- `--chart-1`: Accent blue
- `--chart-2` through `--chart-5`: Grayscale progression

---

## Typography

### Font Families

| Family | Variable | Usage |
|--------|----------|-------|
| Inter | `--font-geist-sans` | Body, headings, UI |
| JetBrains Mono | `--font-geist-mono` | Code, monospace data |

### Type Scale

| Level | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Display | 3.75rem (60px) | 700 | 1.1 | -0.025em | Hero headlines |
| H1 | 3rem (48px) | 700 | 1.1 | -0.025em | Page titles |
| H2 | 2.25rem (36px) | 700 | 1.2 | -0.025em | Section titles |
| H3 | 1.875rem (30px) | 600 | 1.3 | -0.025em | Subsection titles |
| H4 | 1.5rem (24px) | 600 | 1.4 | -0.025em | Card titles |
| H5 | 1.25rem (20px) | 600 | 1.4 | -0.025em | Small headings |
| H6 | 1.125rem (18px) | 600 | 1.5 | -0.025em | Smallest headings |
| Body | 1rem (16px) | 400 | 1.5 | 0 | Default text |
| Body Small | 0.875rem (14px) | 400 | 1.5 | 0 | Secondary text |
| Caption | 0.75rem (12px) | 400 | 1.5 | 0 | Labels, metadata |
| Code | 0.875rem (14px) | 400 | 1.5 | 0 | Monospace code |

### Typography Features

- `-webkit-font-smoothing: antialiased` (crisp rendering)
- `text-rendering: optimizeLegibility` (ligatures)
- `font-feature-settings: "rlig" 1, "calt" 1, "ss01" 1, "cv11" 1` (Inter stylistic sets)
- `text-wrap: balance` for headings (better line breaks)
- `text-wrap: pretty` for paragraphs (orphan control)

---

## Spacing Scale

4px base unit, consistent across the system.

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 0.25rem (4px) | Icon gaps, tight spacing |
| `--spacing-sm` | 0.5rem (8px) | Button padding, list gaps |
| `--spacing-md` | 1rem (16px) | Default spacing, card padding |
| `--spacing-lg` | 1.5rem (24px) | Section internal spacing |
| `--spacing-xl` | 2rem (32px) | Section gaps |
| `--spacing-2xl` | 3rem (48px) | Large section gaps |
| `--spacing-3xl` | 4rem (64px) | Hero vertical padding |
| `--spacing-4xl` | 6rem (96px) | Max section padding |

Tailwind equivalents: `gap-1`, `gap-2`, `gap-4`, `gap-6`, `gap-8`, `gap-12`, `gap-16`, `gap-24`.

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `calc(0.75rem - 4px)` = 8px | Small elements, badges |
| `--radius-md` | `calc(0.75rem - 2px)` = 10px | Inputs, buttons |
| `--radius-lg` | `0.75rem` = 12px | Cards, panels |
| `--radius-xl` | `calc(0.75rem + 4px)` = 16px | Large cards, modals |
| `--radius-2xl` | `calc(0.75rem + 8px)` = 20px | Hero sections |
| `--radius-3xl` | `calc(0.75rem + 16px)` = 28px | Full-bleed elements |

Tailwind: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-3xl`.

---

## Elevation System

Six-level shadow scale for depth perception.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px 0 rgb(0 0 0 / 0.04)` | Subtle borders |
| `--shadow-sm` | `0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)` | Cards at rest |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)` | Cards on hover |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05)` | Dropdowns, popovers |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.10), 0 8px 10px -6px rgb(0 0 0 / 0.05)` | Modals, dialogs |
| `--shadow-2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.15)` | Overlays, command palette |

Tailwind: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`.

---

## Motion System

### Duration

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Hover, focus, micro-interactions |
| `--duration-normal` | 250ms | Page transitions, modals |
| `--duration-slow` | 400ms | Complex animations |

### Easing

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default (entering) |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Bidirectional |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful (scale-in) |

### Animation Utilities

```css
.animate-page-enter    /* Page fade-in-up */
.animate-fade-in       /* Simple opacity */
.animate-fade-in-up    /* Opacity + translateY */
.animate-scale-in      /* Opacity + scale (spring) */
.animate-slide-down    /* Opacity + translateY (down) */
.animate-shimmer       /* Loading skeleton */
```

### Interaction Utilities

```css
.hover-lift        /* translateY(-2px) on hover */
.hover-grow        /* scale(1.02) on hover (spring) */
.card-interactive  /* Combined: translateY + shadow-md on hover */
```

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Icon Guidelines

### Icon Library

We use [Lucide Icons](https://lucide.dev/) — a consistent, open-source icon set.

### Icon Sizes

| Size | Class | Usage |
|------|-------|-------|
| 12px | `h-3 w-3` | Inline, captions |
| 14px | `h-3.5 w-3.5` | Small UI, badges |
| 16px | `h-4 w-4` | Default, buttons |
| 20px | `h-5 w-5` | Medium, cards |
| 24px | `h-6 w-6` | Large, feature icons |
| 32px | `h-8 w-8` | Hero, empty states |

### Icon Usage Rules

1. **Always include `aria-hidden`** for decorative icons
2. **Always include `aria-label`** for interactive icon-only buttons
3. Use `currentColor` for icon stroke (automatic with Lucide)
4. Pair icons with text labels whenever possible
5. Use consistent sizing within a section

```tsx
// Correct
<Button>
  <Search className="h-4 w-4" aria-hidden />
  Search
</Button>

// Icon-only button
<Button variant="ghost" size="icon" aria-label="Search">
  <Search className="h-4 w-4" aria-hidden />
</Button>
```

---

## Component Catalog

### Layout Components

| Component | Path | Usage |
|-----------|------|-------|
| `PageContainer` | `src/shared/components/page-container.tsx` | Max-width container |
| `SectionHeading` | `src/shared/components/section-heading.tsx` | Section title + eyebrow + description |
| `ToolLayout` | `src/shared/components/tool-layout.tsx` | Universal tool page layout |
| `SiteHeader` | `src/shared/components/site-header.tsx` | Sticky navbar with mega menu |
| `SiteFooter` | `src/shared/components/site-footer.tsx` | Multi-column footer |
| `BrandLogo` | `src/shared/components/brand-logo.tsx` | Logo + wordmark |

### Home Section Components

| Component | Path |
|-----------|------|
| `HomeHero` | `src/shared/components/home/home-hero.tsx` |
| `FeaturedTools` | `src/shared/components/home/featured-tools.tsx` |
| `PopularCategories` | `src/shared/components/home/popular-categories.tsx` |
| `WhyChooseUs` | `src/shared/components/home/why-choose-us.tsx` |
| `HowItWorks` | `src/shared/components/home/how-it-works.tsx` |
| `ToolCollections` | `src/shared/components/home/tool-collections.tsx` |
| `RecentlyAdded` | `src/shared/components/home/recently-added.tsx` |
| `Testimonials` | `src/shared/components/home/testimonials.tsx` |
| `FaqSection` | `src/shared/components/home/faq-section.tsx` |
| `Newsletter` | `src/shared/components/home/newsletter.tsx` |

### State Components

| Component | Path | Usage |
|-----------|------|-------|
| `EmptyState` | `src/shared/components/empty-state.tsx` | No data placeholder |
| `ErrorState` | `src/shared/components/error-state.tsx` | Error display |
| `Loading` | `src/shared/components/loading.tsx` | Loading spinner |
| `Skeleton` | `src/shared/components/skeleton.tsx` | Shimmer placeholder |

### shadcn/ui Components (28)

All in `src/components/ui/`:
accordion, alert-dialog, avatar, badge, breadcrumb, button, calendar, card, chart, checkbox, command, dialog, drawer, dropdown-menu, form, hover-card, input, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, sheet, sidebar, slider, sonner, switch, table, tabs, text, textarea, toast, toaster, toggle, toggle-group, tooltip.

---

## Layout Guidelines

### Page Structure

```
<SiteHeader />           // Sticky, h-16
<main>                   // flex-1
  <section>              // Hero
  <section>              // Content
  ...
</main>
<SiteFooter />           // mt-auto
```

### Container Widths

| Class | Max Width | Usage |
|-------|-----------|-------|
| `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` | 80rem (1280px) | Default page |
| `max-w-4xl mx-auto` | 56rem (896px) | Article-style |
| `max-w-3xl mx-auto` | 48rem (768px) | Narrow content |
| `max-w-2xl mx-auto` | 42rem (672px) | Text-focused |

### Section Padding

| Breakpoint | Vertical Padding |
|------------|-------------------|
| Mobile | `py-12` (48px) |
| Tablet | `py-16` (64px) |
| Desktop | `py-20` (80px) |

### Grid System

- 12-column grid (Tailwind default)
- Gap: `gap-4` (16px) default, `gap-6` (24px) for larger layouts
- Breakpoints: `sm:grid-cols-2`, `lg:grid-cols-3`, `xl:grid-cols-4`

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

1. **Color Contrast**
   - Body text: ≥ 4.5:1 against background
   - Large text (≥ 24px): ≥ 3:1
   - Interactive elements: ≥ 3:1

2. **Focus Management**
   - All interactive elements have visible focus rings
   - `:focus-visible` uses `ring-2 ring-ring ring-offset-2`
   - Skip link at top of every page

3. **Keyboard Navigation**
   - All interactive elements reachable via Tab
   - Custom components implement proper ARIA roles
   - Escape closes modals/drawers

4. **Screen Reader Support**
   - Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`)
   - ARIA labels for icon-only buttons
   - `aria-hidden` for decorative icons
   - `aria-label` for nav sections
   - `aria-expanded` for collapsible elements

5. **Reduced Motion**
   - All animations respect `prefers-reduced-motion: reduce`
   - No essential information conveyed by motion alone

### Skip Link

Every page includes:
```html
<a href="#main-content" class="sr-only focus:not-sr-only ...">
  Skip to content
</a>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `xs` (default) | 0-639px | Mobile portrait |
| `sm` | 640px+ | Mobile landscape, small tablet |
| `md` | 768px+ | Tablet |
| `lg` | 1024px+ | Laptop, small desktop |
| `xl` | 1280px+ | Desktop |
| `2xl` | 1536px+ | Large desktop, ultrawide |

### Responsive Rules

1. **Mobile-first**: Base styles target mobile, enhance upward
2. **Touch targets**: Minimum 44px on mobile (`h-11` for buttons)
3. **Navigation**: Desktop shows full nav; mobile uses Sheet/drawer
4. **Grids**: Single column on mobile, multi-column on larger screens
5. **Typography**: Fluid scaling via Tailwind's `sm:text-5xl lg:text-6xl`
6. **No overflow**: Use `overflow-x-hidden` on main containers
7. **No layout shift**: Reserve space for async content with skeletons

### Viewport Meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
```
