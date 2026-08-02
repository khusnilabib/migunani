# Brand Guidelines — Toolbox v1.0

> The visual identity of a browser-first productivity ecosystem.

## Brand Essence

**Toolbox** is a browser-first productivity platform that respects user privacy. Our brand embodies:

- **Privacy-first** — Your data never leaves your device
- **Speed** — Instant results, no waiting
- **Craft** — Thoughtful, consistent, well-made
- **Trust** — Transparent, no dark patterns
- **Accessibility** — For everyone, on any device

## Brand Voice

### Tone

| Do | Don't |
|----|-------|
| Clear and direct | Marketing fluff |
| Confident but humble | Boastful |
| Technical when needed | Jargon-heavy |
| Warm and human | Cold and corporate |
| Privacy-conscious | Surveillance-friendly |

### Voice Examples

**Headline:**
- ✅ "Browser-first tools. Private by default."
- ❌ "The Ultimate Productivity Suite for Modern Professionals"

**Description:**
- ✅ "Resize images, merge PDFs, format JSON — all running locally in your browser."
- ❌ "Leverage our cutting-edge cloud-native architecture for unparalleled performance."

**Error message:**
- ✅ "Could not reach the authentication service. Please try again."
- ❌ "Error 500: Internal Server Error. Please contact support."

## Logo

### Logo Mark

The Toolbox logo is a geometric "T" mark representing:
1. **Tools** — The "T" stands for Toolbox
2. **Construction** — Overlapping bars suggest building/assembling
3. **Precision** — Sharp angles convey accuracy
4. **Modernity** — Minimalist geometric form

### Logo Variants

1. **Primary (Dark)** — For light backgrounds
   - Background: `#0A0A0A` (deep ink)
   - Mark: `#FAFAFA` (off-white)
   - Accent: `#3B82F6` (blue)

2. **Light variant** — For dark backgrounds
   - Background: `#FAFAFA`
   - Mark: `#0A0A0A`
   - Accent: `#3B82F6`

3. **App icon** — Full-bleed for PWA
   - No padding, mark fills the frame

4. **Favicon** — Simplified for small sizes
   - Reduced detail, thicker strokes

### Logo Usage

- **Minimum size**: 24px (mark only), 32px (with wordmark)
- **Clear space**: Equal to the height of the accent dot on all sides
- **Don't stretch, rotate, or recolor**
- **Don't place on busy backgrounds** without sufficient contrast
- **Don't add effects** (shadows, gradients, bevels)

### Wordmark

- Font: Inter
- Weight: 600 (Semibold)
- Letter-spacing: -0.025em
- Always paired with the mark, except in favicons

## Color Palette

### Primary Palette

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Ink | `240 10% 3.9%` | `#0A0A0A` | Primary text, dark backgrounds |
| Paper | `0 0% 100%` | `#FFFFFF` | Light backgrounds |
| Off-White | `0 0% 98%` | `#FAFAFA` | Card backgrounds (dark mode) |
| Gray-50 | `240 4.8% 95.9%` | `#F4F4F5` | Muted backgrounds |
| Gray-500 | `240 3.8% 46.1%` | `#71717A` | Muted text |
| Gray-900 | `240 10% 3.9%` | `#0A0A0A` | Same as Ink |

### Accent Palette

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Blue | `221 83% 53%` | `#2563EB` | Accent (light theme) |
| Blue-Bright | `217 91% 60%` | `#3B82F6` | Accent (dark theme) |

### Semantic Palette

| Name | HSL | Hex | Usage |
|------|-----|-----|-------|
| Red | `0 84.2% 60.2%` | `#EF4444` | Destructive, errors |
| Green | `142 71% 45%` | `#22C55E` | Success |
| Amber | `38 92% 50%` | `#F59E0B` | Warning |

### Color Rules

1. **Monochrome base** — 90% of the UI is grayscale
2. **Accent is rare** — Use blue for < 5% of visual elements
3. **Semantic colors only for their purpose** — Don't use red for decoration
4. **Never use pure black** (`#000000`) — Use Ink (`#0A0A0A`) instead
5. **Test both themes** — Every design must work in light and dark

## Typography

### Primary Font: Inter

Inter is a variable font designed for computer screens. We use it for:
- Body text
- Headings
- UI elements
- Buttons
- Navigation

**Why Inter?**
- Excellent legibility at all sizes
- Variable weight (100-900) in one file
- Open source (SIL OFL)
- Designed for screens
- Extensive language support

### Monospace Font: JetBrains Mono

Used for:
- Code blocks
- Technical data
- File names
- Version numbers
- API responses

**Why JetBrains Mono?**
- Designed for code
- Excellent character distinction (0/O, 1/l/I)
- Ligatures support
- Open source

### Type Hierarchy

```
Display:    60px / 700 / -0.025em  (Hero headlines)
H1:         48px / 700 / -0.025em  (Page titles)
H2:         36px / 700 / -0.025em  (Section titles)
H3:         30px / 600 / -0.025em  (Subsection titles)
H4:         24px / 600 / -0.025em  (Card titles)
Body:       16px / 400 / 0          (Default text)
Body Small: 14px / 400 / 0          (Secondary text)
Caption:    12px / 400 / 0          (Labels, metadata)
```

## Iconography

### Icon Set: Lucide

We use [Lucide Icons](https://lucide.dev/) exclusively. Lucide is:
- Open source (ISC)
- Consistent stroke width (2px)
- 24x24 grid
- Rounded line caps
- Tree-shakeable

### Icon Style

- **Stroke width**: 2px (default)
- **Line caps**: Round
- **Line joins**: Round
- **Grid**: 24x24
- **Style**: Outline (not filled)

### Icon Categories

| Category | Examples |
|----------|----------|
| Navigation | ArrowRight, ChevronDown, Menu, X |
| Actions | Search, Filter, Download, Share |
| Status | CheckCircle, AlertCircle, XCircle |
| Content | File, Image, Code, Type |
| People | User, Users, UserPlus |
| System | Settings, Shield, Zap |

### Custom Icons

We avoid custom icons. If absolutely necessary:
1. Follow Lucide's 24x24 grid
2. Use 2px stroke width
3. Use round line caps and joins
4. Match Lucide's visual weight
5. Document in the Design System

## Illustration Style

### Empty States

Empty states use:
- **Monochrome icons** (Lucide, 32px)
- **Generous whitespace**
- **Clear hierarchy**: Icon → Title → Description → CTA
- **No illustrations** — keep it minimal

### Hero Decorations

Hero sections use:
- **Background grid** (subtle, masked)
- **Accent glow** (radial gradient, blurred)
- **No characters or mascots**
- **No stock photos**

## Motion

### Principles

1. **Motion with purpose** — Every animation communicates something
2. **Subtle, not flashy** — Users shouldn't notice the motion unless they look for it
3. **Fast, not instant** — 150-250ms for most interactions
4. **Respectful** — Honor `prefers-reduced-motion`

### Motion Library

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| fade-in | 250ms | ease-out | Page enter |
| fade-in-up | 250ms | ease-out | Content reveal |
| scale-in | 150ms | spring | Modal open |
| slide-down | 250ms | ease-out | Dropdown |
| hover-lift | 150ms | ease-out | Card hover |
| shimmer | 1500ms | linear | Loading skeleton |

## Photography

We don't use photography. The brand is:
- **Geometric** — shapes, patterns, grids
- **Abstract** — no literal objects
- **Monochrome** — black, white, gray
- **Accent-enhanced** — blue highlights only

## Tone of Voice

### Principles

1. **Clear over clever** — If a user has to think, we failed
2. **Short over long** — Every word must earn its place
3. **Active over passive** — "Resize images" not "Images can be resized"
4. **Specific over vague** — "23 tools" not "many tools"
5. **Honest over hype** — "Free" not "Revolutionary"

### Microcopy

| Element | Example |
|---------|---------|
| Button | "Browse all tools" (not "Click Here") |
| Error | "Could not reach the authentication service. Please try again." |
| Empty | "No results found. Try adjusting your search." |
| Success | "Signed in successfully." |
| Loading | "Processing..." (not "Please wait...") |
| Tooltip | "Open command palette (⌘K)" |

## Brand Don'ts

1. **Don't use emoji** in UI (except in user-generated content)
2. **Don't use stock photos** of people
3. **Don't use gradients** as backgrounds (except subtle mesh)
4. **Don't use multiple accent colors** — blue is the only accent
5. **Don't use comic sans, papyrus, or other novelty fonts**
6. **Don't rotate or distort the logo**
7. **Don't use the logo on busy backgrounds** without sufficient contrast
8. **Don't use raw hex colors** — always use design tokens
9. **Don't animate essential information** — motion is decorative
10. **Don't use dark patterns** — be honest and transparent

---

## Conclusion

The Toolbox brand is built on restraint. We use:
- One accent color (blue)
- Two fonts (Inter + JetBrains Mono)
- One icon set (Lucide)
- A monochrome base with sparse accent

This restraint creates a consistent, professional, and trustworthy identity that matches our privacy-first mission.
