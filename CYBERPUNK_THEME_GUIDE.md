# Cyberpunk Theme CSS Variables Guide

## Overview

All cyberpunk theme colors and effects are now defined as CSS variables in `global.css`. **Always use these variables instead of hardcoding colors** to maintain consistency and make theme updates easier.

---

## How to Use CSS Variables

### In Tailwind Classes

Use the `[hsl(var(--variable-name))]` syntax:

```tsx
// ✅ CORRECT - Using CSS variables
<div className="bg-[hsl(var(--cyber-bg-base))]">

// ❌ WRONG - Hardcoded colors
<div className="bg-zinc-950">
```

### For Border Radius

Use the `[var(--variable-name)]` syntax:

```tsx
// ✅ CORRECT
<div className="rounded-[var(--cyber-radius-md)]">

// ❌ WRONG
<div className="rounded-2xl">
```

### For Shadows

Use the `[var(--variable-name)]` syntax:

```tsx
// ✅ CORRECT
<div className="shadow-[var(--cyber-shadow-xl)]">

// ❌ WRONG
<div className="shadow-[0_0_50px_rgba(6,182,212,0.2)]">
```

---

## Available CSS Variables

### 🎨 Colors

#### Accent Colors

```css
--cyber-accent: 188 91% 43% /* Cyan-500 primary accent */
  --cyber-accent-foreground: 0 0% 0% /* Black text on cyan */;
```

**Usage:**

```tsx
<div className="bg-[hsl(var(--cyber-accent))] text-[hsl(var(--cyber-accent-foreground))]">
```

---

#### Background Colors

```css
--cyber-bg-base: 240 10% 3.9% /* zinc-950 - Main background */
  --cyber-bg-subtle: 240 10% 3.9% / 0.4 /* zinc-950/40 - Cards, overlays */
  --cyber-bg-elevated: 240 5.9% 10% /* zinc-900 - Elevated surfaces */
  --cyber-bg-elevated-subtle: 240 5.9% 10% / 0.4 /* zinc-900/40 */
  --cyber-bg-input: 240 5.9% 10% / 0.4 /* zinc-900/40 - Input backgrounds */;
```

**Usage:**

```tsx
// Main background
<div className="bg-[hsl(var(--cyber-bg-base))]">

// Card background
<div className="bg-[hsl(var(--cyber-bg-subtle))]">

// Input background
<input className="bg-[hsl(var(--cyber-bg-input))]" />
```

---

#### Border Colors

```css
--cyber-border-subtle: 0 0% 100% / 0.05 /* white/5 - Subtle borders */
  --cyber-border-accent: 188 91% 43% / 0.1 /* cyan-500/10 - Accent borders */
  --cyber-border-accent-hover: 188 91% 43% / 0.3 /* cyan-500/30 - Hover state */;
```

**Usage:**

```tsx
// Default border
<div className="border border-[hsl(var(--cyber-border-subtle))]">

// Accent border
<div className="border border-[hsl(var(--cyber-border-accent))]">

// Hover state
<div className="hover:border-[hsl(var(--cyber-border-accent-hover))]">
```

---

#### Text Colors

```css
--cyber-text-primary: 0 0% 100% /* white */ --cyber-text-secondary: 240 5% 84%
  /* zinc-300 */ --cyber-text-muted: 240 5% 65% /* zinc-400 */
  --cyber-text-subtle: 240 5% 45% /* zinc-500 */ --cyber-text-placeholder: 240
  5% 45% /* zinc-600 */;
```

**Usage:**

```tsx
// Primary text (white)
<h1 className="text-[hsl(var(--cyber-text-primary))]">

// Secondary text
<p className="text-[hsl(var(--cyber-text-secondary))]">

// Muted text
<span className="text-[hsl(var(--cyber-text-muted))]">

// Placeholder
<input placeholder="..." className="placeholder:text-[hsl(var(--cyber-text-placeholder))]" />
```

---

#### Focus/Ring Colors

```css
--cyber-ring: 188 91% 43% / 0.5 /* cyan-500/50 - Focus rings */
  --cyber-ring-offset: 240 10% 3.9% /* zinc-950 - Ring offset color */;
```

**Usage:**

```tsx
<button className="focus:ring-2 focus:ring-[hsl(var(--cyber-ring))] focus:ring-offset-2 focus:ring-offset-[hsl(var(--cyber-ring-offset))]">
```

---

### ✨ Effects

#### Glow Effects

```css
--cyber-glow-sm: 0 0 8px rgb(6 182 212 / 0.3) --cyber-glow-md: 0 0 20px
  rgb(6 182 212 / 0.3) --cyber-glow-lg: 0 0 40px rgb(6 182 212 / 0.3)
  --cyber-glow-xl: 0 0 50px rgb(6 182 212 / 0.3);
```

**Usage:**

```tsx
// Small glow
<div className="shadow-[var(--cyber-glow-sm)]">

// Large glow
<div className="shadow-[var(--cyber-glow-xl)]">
```

---

#### Shadow Effects

```css
--cyber-shadow-sm:
  0 0 10px rgb(0 0 0 / 0.5) --cyber-shadow-md: 0 0 20px rgb(0 0 0 / 0.7)
    --cyber-shadow-lg: 0 0 50px rgb(0 0 0 / 1) --cyber-shadow-xl: 0 0 100px
    rgb(6 182 212 / 0.3),
  0 0 50px rgb(0 0 0 / 1);
```

**Usage:**

```tsx
// Standard shadow
<div className="shadow-[var(--cyber-shadow-lg)]">

// Premium shadow with glow
<div className="shadow-[var(--cyber-shadow-xl)]">
```

---

### 📐 Border Radius

```css
--cyber-radius-sm: 0.75rem /* 12px - rounded-xl */ --cyber-radius-md: 1rem
  /* 16px - rounded-2xl */ --cyber-radius-lg: 1.5rem /* 24px - rounded-3xl */
  --cyber-radius-xl: 2.5rem /* 40px - rounded-[2.5rem] */;
```

**Usage:**

```tsx
// Small radius (inputs, buttons)
<input className="rounded-[var(--cyber-radius-sm)]" />

// Medium radius (cards)
<div className="rounded-[var(--cyber-radius-md)]">

// Large radius (dialogs)
<div className="rounded-[var(--cyber-radius-lg)]">

// Extra large radius (special dialogs)
<div className="rounded-[var(--cyber-radius-xl)]">
```

---

### 🎯 Status Colors

```css
--cyber-success: 142 71% 45% /* emerald-500 */ --cyber-warning: 38 92% 50%
  /* amber-500 */ --cyber-error: 0 72% 51% /* red-500 */ --cyber-info: 188 91%
  43% /* cyan-500 */;
```

**Usage:**

```tsx
// Success state
<div className="bg-[hsl(var(--cyber-success))]">

// Error state
<div className="text-[hsl(var(--cyber-error))]">
```

---

### 👑 Premium/Pro Colors

```css
--cyber-premium: 45 93% 47% /* yellow-500 for premium */ --cyber-pro: 188 91%
  43% /* cyan-500 for pro */;
```

**Usage:**

```tsx
// Premium badge
<span className="bg-[hsl(var(--cyber-premium))]">PREMIUM</span>

// Pro badge
<span className="bg-[hsl(var(--cyber-pro))]">PRO</span>
```

---

## Common Patterns

### Card Component

```tsx
<div
  className="
  rounded-[var(--cyber-radius-md)]
  border border-[hsl(var(--cyber-border-subtle))]
  bg-[hsl(var(--cyber-bg-subtle))]
  backdrop-blur-md
  shadow-lg
"
>
  <h2 className="text-[hsl(var(--cyber-text-primary))]">Title</h2>
  <p className="text-[hsl(var(--cyber-text-secondary))]">Content</p>
</div>
```

### Input Component

```tsx
<input
  className="
    rounded-[var(--cyber-radius-sm)]
    border border-[hsl(var(--cyber-border-subtle))]
    bg-[hsl(var(--cyber-bg-input))]
    text-[hsl(var(--cyber-text-primary))]
    placeholder:text-[hsl(var(--cyber-text-placeholder))]
    focus:ring-2 focus:ring-[hsl(var(--cyber-ring))]
    focus:border-[hsl(var(--cyber-border-accent-hover))]
  "
/>
```

### Button with Glow

```tsx
<button
  className="
  bg-[hsl(var(--cyber-accent))]
  text-[hsl(var(--cyber-accent-foreground))]
  rounded-[var(--cyber-radius-sm)]
  shadow-[var(--cyber-glow-md)]
  hover:shadow-[var(--cyber-glow-lg)]
"
>
  Click Me
</button>
```

### Dialog

```tsx
<div
  className="
  rounded-[var(--cyber-radius-lg)]
  border border-[hsl(var(--cyber-border-accent))]
  bg-[hsl(var(--cyber-bg-base))]
  shadow-[var(--cyber-shadow-xl)]
  backdrop-blur-2xl
  ring-1 ring-[hsl(var(--cyber-border-accent))]
"
>
  Dialog content
</div>
```

---

## Benefits of Using CSS Variables

1. **Consistency**: All components use the same color values
2. **Maintainability**: Change theme colors in one place (global.css)
3. **Type Safety**: Easier to spot typos in variable names
4. **Theme Switching**: Easy to add light mode or alternate themes later
5. **Documentation**: Variables are self-documenting with clear names

---

## Migration Checklist

When updating existing components:

- [ ] Replace `bg-zinc-950` → `bg-[hsl(var(--cyber-bg-base))]`
- [ ] Replace `bg-zinc-950/40` → `bg-[hsl(var(--cyber-bg-subtle))]`
- [ ] Replace `bg-zinc-900/40` → `bg-[hsl(var(--cyber-bg-input))]`
- [ ] Replace `border-white/5` → `border-[hsl(var(--cyber-border-subtle))]`
- [ ] Replace `border-cyan-500/10` → `border-[hsl(var(--cyber-border-accent))]`
- [ ] Replace `text-white` → `text-[hsl(var(--cyber-text-primary))]`
- [ ] Replace `text-zinc-300` → `text-[hsl(var(--cyber-text-secondary))]`
- [ ] Replace `rounded-2xl` → `rounded-[var(--cyber-radius-md)]`
- [ ] Replace `rounded-3xl` → `rounded-[var(--cyber-radius-lg)]`
- [ ] Replace hardcoded shadows → `shadow-[var(--cyber-shadow-*)]`

---

## Need Help?

If you're unsure which variable to use, refer to the comments in `global.css` or check the existing implementations in:

- `dialog.tsx`
- `card.tsx`
- `input.tsx`
- `premium-guard.tsx`
- `pricing-dialog.tsx`
