# DESIGN SYSTEM

Design tokens, patterns, and visual guidelines for TecNews.

## Color System

### Radix Palette Reference

The full Radix Colors palette (all scales, including dark and alpha variants) is documented in:
- `docs/COLORSCHEME.md`

Use this as the source of truth for hex values when you need exact palette steps.

### Base Colors

**Pure Black & White**
- `pureBlack`: `#000000` - Primary text and UI elements in light mode
- `pureWhite`: `#f2efe6` - Background and UI elements in dark mode

These are the foundation colors. All other colors are accents or semantic variations.

### Accent Colors

**Turquoise/Mint/Teal Palette**

Primary accent colors for interactive elements, highlights, and brand moments:

- **Teal-11** (Radix UI): Primary accent for text highlights, borders, and indicators
- **Mint-11** (Radix UI): Secondary accent for buttons, links, and interactive states
- **Light Mode Accent**: `#0bd8b6` - Bright turquoise for buttons and CTAs
- **Dark Mode Accent**: `#0aa88f` - Darker turquoise variant for dark mode

**Usage Guidelines**
- Use teal-11/mint-11 for text highlights and subtle accents
- Use `#0bd8b6` / `#0aa88f` for primary buttons and CTAs
- Accent colors should be used sparingly—they are highlights, not dominant colors
- Always ensure sufficient contrast ratios for accessibility

### Gray Scale

Uses Radix UI gray palette (gray-1 through gray-12) for:
- Borders: `gray-6` (light mode), `gray-9` (dark mode)
- Muted text: `gray-10`, `gray-11`, `gray-12`
- Backgrounds: `gray-8` (light mode), `gray-4` (dark mode)

### Opacity Patterns

Common opacity values for overlays and subtle elements:
- `/10` - Very subtle borders and dividers
- `/20` - Light overlays
- `/40` - Placeholder text
- `/50` - Muted text
- `/60` - Secondary text
- `/80` - Primary text with slight transparency

## Typography

### Font Families

**Headline Fonts**
- `font-clash-regular` / `font-clash` - Primary display font (Clash Display)
- `font-cabinet` - Secondary display font (Cabinet Grotesk)
- `font-prata` - Serif headline option
- `font-baskerville` - Classic serif for elegant moments
- `zalando-sans-expanded` - Expanded sans for impact

**Body Fonts**
- `font-manrope` - Primary body font
- `font-now` - Monospace/technical feel
- `space-grotesk-regular` - Secondary body option

**Font Usage**
- Headlines: Use Clash or Cabinet for primary headlines
- Body: Use Manrope for readable body text
- Accents: Use Now or Space Grotesk for labels and metadata

### Typography Scale

Responsive typography using `clamp()`:
- Hero headlines: `clamp(2.6rem, 9vw, 4.8rem)` to `clamp(3.5rem, 10vw, 9rem)`
- Section headlines: `clamp(1.75rem, 7vw, 8rem)`
- Body text: `clamp(1rem, 2vw, 1.5rem)`
- Small text: `text-xs` to `text-sm`

### Letter Spacing

- `tracking-widest` - Uppercase labels and metadata
- `tracking-tight` - Headlines and display text
- Default - Body text

### Font Weights

- `font-light` (300) - Subtle emphasis
- `font-normal` (400) - Default body
- `font-medium` (500) - Emphasis
- `font-semibold` (600) - Strong emphasis
- `font-bold` (700) - Headlines

## Spacing & Layout

### Spacing Scale

Uses UnoCSS/Tailwind spacing scale (0.25rem increments):
- Small gaps: `gap-2` to `gap-4` (0.5rem - 1rem)
- Medium gaps: `gap-6` to `gap-8` (1.5rem - 2rem)
- Large gaps: `gap-12` to `gap-24` (3rem - 6rem)

### UnoCSS Over Inline Styles

Prefer UnoCSS arbitrary values over inline `:style` attributes for better maintainability, consistency, and performance.

**Exception (allowed inline styles)**
- `clip-path`/`mask` bindings that require `url(#id)` or SVG `clipPath` references
- Dynamic CSS variables where UnoCSS cannot express the runtime value cleanly

**Avoid inline styles**
```vue
<!-- ❌ Bad: Using inline style attribute -->
<div :style="{ left: 'calc(50% - 50vw)', width: '100vw' }">
```

**Prefer UnoCSS arbitrary values**
```vue
<!-- ✅ Good: Using UnoCSS arbitrary values -->
<div class="left-[calc(50%-50vw)] w-screen">
```

Benefits:
- Consistent with utility-first approach
- Better performance (CSS classes are optimized)
- Easier to maintain and refactor
- Works with UnoCSS's JIT compiler
- Supports responsive variants: `md:left-[calc(50%-50vw)]`

### Container Patterns

- Max width containers: `max-w-4xl`, `max-w-6xl`, `max-w-7xl`
- Full width with padding: `px-6`, `px-8` (mobile-first)
- Section spacing: `py-6`, `py-12`, `py-24`

### Grid & Flexbox

- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (mobile-first)
- Flex: `flex flex-col md:flex-row` (responsive direction)
- Alignment: `items-center`, `justify-between`, `justify-center`

## Visual Effects

### Glassmorphism

Glass-like backgrounds with backdrop blur:
```css
backdrop-filter: blur(20px);
border: 1px solid rgba(0, 0, 0, 0.08); /* light mode */
border: 1px solid rgba(255, 255, 255, 0.1); /* dark mode */
```

**Usage**
- Navigation bars
- Cards and overlays
- Modal backgrounds

Avoid vendor-prefixed `-webkit-backdrop-filter` in new work unless a tested Safari-only fix is required.

### Shadows

**Light Mode**
- Subtle: `0 8px 32px rgba(0, 0, 0, 0.06)`
- Medium: `0 12px 40px rgba(0, 0, 0, 0.08)`
- Inset: `inset 0 1px 0 0 rgba(255, 255, 255, 0.3)`

**Dark Mode**
- Subtle: `0 8px 32px rgba(0, 0, 0, 0.2)`
- Medium: `0 12px 40px rgba(0, 0, 0, 0.3)`
- Inset: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1)`

### Borders

- Subtle: `border-pureBlack/10` (light), `border-pureWhite/10` (dark)
- Medium: `border-pureBlack/20` (light), `border-pureWhite/20` (dark)
- Accent: `border-teal-11` or `border-mint-11`

## Animation & Motion

### Easing Functions

**Primary Easing**
- `cubic-bezier(0.33, 1, 0.68, 1)` - Smooth, natural feel
- `cubic-bezier(0.625, 0.05, 0, 1)` - Osmo-style easing

**Duration**
- Fast: `0.2s` - Hover states, micro-interactions
- Medium: `0.3s` - Standard transitions
- Slow: `0.6s` - Page transitions, complex animations

### Animation Patterns

**Subtle Fades**
- Opacity transitions: `transition-opacity duration-300`
- Transform: `transition-transform duration-300`

**Character Animations**
- Staggered character reveals
- Text generation effects
- Hover character shifts

**Motion Library**
- Uses `motion-v` (Vue Motion) for complex animations
- Prefer CSS transitions for simple state changes

### Motion Principles

- Motion should be subtle and purposeful
- Avoid bouncy or overshoot animations
- Performance over flashy effects
- Prefer opacity and transform for performance

## Components Patterns

### Buttons

**Primary Button**
- Background: `#0bd8b6` (light) / `#0aa88f` (dark)
- Text: `pureBlack` (light) / `pureWhite` (dark)
- Border radius: `0.125em`
- Hover: Slight scale down (`scale(0.98)`)

**Secondary Button**
- Transparent background with border
- Hover: Background fill with accent color

### Cards

- Border: `border-pureBlack/10` (light) / `border-pureWhite/10` (dark)
- Border radius: `rounded-3xl` (1.5rem)
- Padding: `p-8`
- Background: `bg-pureWhite` (light) / `bg-pureBlack` (dark)

### Navigation

- Glassmorphism background
- Fixed positioning with backdrop blur
- Responsive: Collapses to mobile menu
- Accent color for active states

## Dark Mode

### Implementation

- Uses Nuxt Color Mode with cookie storage
- Default: Dark mode (`preference: 'dark'`)
- Toggle available in header

### Color Adaptations

- Pure colors invert: `pureBlack` ↔ `pureWhite`
- Accent colors adjust: `#0bd8b6` → `#0aa88f`
- Gray scale inverts: Light grays become dark grays
- Opacity values remain consistent

### Dark Mode Guidelines

- Maintain sufficient contrast ratios
- Use softer borders and shadows
- Accent colors should be slightly muted in dark mode
- Test readability in both modes

## Responsive Design

### Breakpoints

Uses Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Use `md:`, `lg:`, `xl:` prefixes for responsive styles

### Typography Responsiveness

- Always use `clamp()` for fluid typography
- Test at multiple viewport sizes
- Ensure readability on small screens

## Accessibility

### Color Contrast

- Text on background: Minimum 4.5:1 (WCAG AA)
- Large text: Minimum 3:1 (WCAG AA)
- Interactive elements: Clear focus states

### Focus States

- Visible focus indicators required
- Use accent colors for focus: `focus-visible:color-mint-11`
- Keyboard navigation must work throughout

### Semantic HTML

- Use proper heading hierarchy
- Semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`
- ARIA labels where needed

## Design Principles

1. **Minimalism First**: Clean, uncluttered interfaces
2. **Subtle Accents**: Accent colors are highlights, not dominant
3. **Consistent Spacing**: Use the spacing scale consistently
4. **Performance**: Prefer CSS over JavaScript for animations
5. **Accessibility**: Design for all users from the start
6. **Dark Mode**: Equal attention to both light and dark modes
