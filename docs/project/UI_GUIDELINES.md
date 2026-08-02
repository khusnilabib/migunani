# UI Guidelines — Toolbox v1.0

> Practical guidelines for building consistent, accessible, and beautiful UI.

## Table of Contents

1. [Component Usage Patterns](#component-usage-patterns)
2. [Button Guidelines](#button-guidelines)
3. [Card Guidelines](#card-guidelines)
4. [Form Guidelines](#form-guidelines)
5. [Empty State Guidelines](#empty-state-guidelines)
6. [Loading Guidelines](#loading-guidelines)
7. [Error Guidelines](#error-guidelines)
8. [Color Usage](#color-usage)
9. [Spacing Patterns](#spacing-patterns)
10. [Interaction Patterns](#interaction-patterns)

---

## Component Usage Patterns

### Page Section

```tsx
<section aria-labelledby="section-title" className="border-b border-border bg-background">
  <PageContainer className="py-16 sm:py-20">
    <SectionHeading
      eyebrow="Eyebrow"
      title="Section Title"
      description="Section description."
    />
    {/* Content */}
  </PageContainer>
</section>
```

### Alternating Backgrounds

Alternate between `bg-background` and `bg-muted/30` for visual rhythm:
- Section 1: `bg-background`
- Section 2: `bg-muted/30`
- Section 3: `bg-background`
- Section 4: `bg-muted/30`

### Card Grid

```tsx
<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {items.map((item) => (
    <li key={item.id}>
      <Card className="card-interactive h-full">
        <CardContent className="p-5">
          {/* Content */}
        </CardContent>
      </Card>
    </li>
  ))}
</ul>
```

---

## Button Guidelines

### Variants

| Variant | Usage | Class |
|---------|-------|-------|
| `default` | Primary action (one per view) | `bg-primary text-primary-foreground` |
| `secondary` | Secondary action | `bg-secondary text-secondary-foreground` |
| `outline` | Tertiary action, alternative to primary | `border border-input bg-background` |
| `ghost` | Subtle action, icon buttons | `hover:bg-accent hover:text-accent-foreground` |
| `destructive` | Dangerous action (delete) | `bg-destructive text-destructive-foreground` |
| `link` | Inline link-style button | `text-primary underline-offset-4` |

### Sizes

| Size | Height | Usage |
|------|--------|-------|
| `sm` | 32px (`h-8`) | Compact UI, table actions |
| `default` | 36px (`h-9`) | Default, forms |
| `lg` | 44px (`h-11`) | Hero CTAs, prominent actions |
| `icon` | 36px (`h-9 w-9`) | Icon-only buttons |

### Rules

1. **One primary action per view** — use `default` variant for the main CTA
2. **Icon-only buttons must have `aria-label`**
3. **Loading state**: Replace icon with `<Loader2 className="animate-spin" />`
4. **Disabled state**: Use `disabled` prop, not custom styling
5. **Button vs Link**: Use `<Button asChild>` when wrapping a `<Link>`

```tsx
// Primary CTA
<Button asChild size="lg">
  <Link href="/tools">
    Browse all tools
    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
  </Link>
</Button>

// Secondary
<Button variant="outline" size="lg">
  Learn more
</Button>

// Icon-only
<Button variant="ghost" size="icon" aria-label="Search">
  <Search className="h-4 w-4" aria-hidden />
</Button>

// Loading
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
  Processing...
</Button>
```

---

## Card Guidelines

### Variants

| Style | Usage | Class |
|-------|-------|-------|
| Default | Static content | `<Card>` |
| Interactive | Clickable, hoverable | `<Card className="card-interactive">` |
| Featured | Highlighted content | `<Card className="bg-gradient-mesh">` |

### Card Structure

```tsx
<Card>
  <CardHeader className="border-b border-border pb-4">
    <CardTitle className="text-base">Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
  <CardFooter className="border-t border-border pt-4">
    {/* Actions */}
  </CardFooter>
</Card>
```

### Rules

1. **Use `card-interactive` for clickable cards** — adds hover lift + shadow
2. **Consistent padding**: `p-5` for small cards, `p-6` for standard
3. **Use `h-full`** when cards are in a grid to ensure equal heights
4. **Pair with `<Link>`** for clickable cards, not `onClick`

---

## Form Guidelines

### Input

```tsx
<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input
    id="email"
    type="email"
    placeholder="you@example.com"
    className="h-11"
  />
  <p className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>
```

### Rules

1. **Always associate label with input** via `htmlFor`/`id`
2. **Use `h-11` for prominent inputs** (hero search, auth forms)
3. **Use `h-9` for compact inputs** (filters, table search)
4. **Placeholder is not a label** — always include a visible label or `aria-label`
5. **Helper text below input** in `text-xs text-muted-foreground`
6. **Error text in `text-xs text-destructive`**

### Search Input

```tsx
<div className="relative">
  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
  <Input
    type="search"
    placeholder="Search..."
    className="h-11 pl-9"
    aria-label="Search"
  />
</div>
```

---

## Empty State Guidelines

```tsx
<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
  icon={<Search className="h-5 w-5" aria-hidden />}
/>
```

### Rules

1. **Always provide an icon** — visual anchor
2. **Clear title** — what's empty
3. **Helpful description** — what to do next
4. **Optional CTA** — if there's a clear next action

---

## Loading Guidelines

### Skeleton (preferred for content)

```tsx
<div className="space-y-3">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-20 w-full" />
</div>
```

### Spinner (for actions)

```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
  Processing...
</Button>
```

### Rules

1. **Use skeletons for page load** — prevents layout shift
2. **Use spinners for user actions** — button submit, file upload
3. **Match skeleton shape to content** — same dimensions
4. **Use `animate-shimmer` for premium feel**

---

## Error Guidelines

### Inline Error

```tsx
<p className="text-xs text-destructive" role="alert">
  Email is required.
</p>
```

### Error State (full)

```tsx
<ErrorState
  error={error}
  retry={handleRetry}
/>
```

### Rules

1. **Never show raw error messages** — always user-friendly
2. **Provide a retry action** when possible
3. **Use `role="alert"` for screen readers**
4. **Destructive color only for errors** — don't overuse

---

## Color Usage

### Semantic Colors

| Color | Usage | Class |
|-------|-------|-------|
| Primary | Main CTAs, key text | `bg-primary text-primary-foreground` |
| Accent | Highlights, links | `text-accent` |
| Destructive | Errors, delete | `text-destructive bg-destructive` |
| Success | Confirmations | `text-success` |
| Warning | Cautions | `text-warning` |
| Muted | Secondary text | `text-muted-foreground` |

### Rules

1. **Monochrome base** — use accent sparingly
2. **Never use raw hex colors** — always use CSS variables
3. **Test in both light and dark themes**
4. **Maintain WCAG AA contrast** (4.5:1 for body text)

---

## Spacing Patterns

### Section Spacing

```tsx
// Standard section
<PageContainer className="py-16 sm:py-20">

// Compact section
<PageContainer className="py-12">

// Hero section
<PageContainer className="py-20 sm:py-28 lg:py-32">
```

### Component Spacing

| Elements | Gap |
|----------|-----|
| Form fields | `space-y-4` (16px) |
| Card grid items | `gap-4` (16px) |
| Button groups | `gap-2` (8px) |
| Nav items | `gap-6` (24px) |
| Footer columns | `gap-10` (40px) |

---

## Interaction Patterns

### Hover

```tsx
// Card lift
<Card className="card-interactive">

// Icon shift
<Link className="group">
  <ArrowUpRight className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
</Link>

// Color change
<Button variant="ghost" className="hover:bg-muted hover:text-foreground">
```

### Focus

All interactive elements automatically get focus rings via `:focus-visible`:
```css
:focus-visible {
  outline: none;
  ring-2 ring-ring ring-offset-2 ring-offset-background;
}
```

### Active

For press feedback:
```tsx
<button className="active:scale-95 transition-transform">
```

### Loading

```tsx
// Button loading
<Button disabled={loading}>
  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />}
  {loading ? 'Processing...' : 'Submit'}
</Button>
```
