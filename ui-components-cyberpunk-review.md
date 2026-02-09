# UI Components Cyberpunk Theme Review

## Overview

This document reviews all UI components in `apps/website/src/components/ui` to determine which should be redesigned to match the cyberpunk aesthetic established in `pricing-dialog.tsx` and `premium-guard.tsx`.

---

## Cyberpunk Design System Reference

### Key Design Elements:

- **Colors**: Cyan (#06B6D4) primary accent, zinc-950 backgrounds, white/10 borders
- **Typography**: Audiowide font for headers, uppercase tracking-widest text
- **Effects**: Drop shadows with cyan glow, radial gradients, backdrop-blur
- **Borders**: rounded-2xl to rounded-3xl, subtle ring effects
- **Animations**: Hover effects, glowing transitions, pulse animations

---

## Components Review

### ✅ Already Cyberpunk-Styled

1. **pricing-dialog.tsx** - ✅ Reference implementation
2. **pricing-benefits.tsx** - ✅ Has tech grid, neon glows, cyan accents
3. **pricing-cards.tsx** - ✅ Matches the theme
4. **premium-guard.tsx** - ✅ Recently updated
5. **button.tsx** - ✅ Recently updated with cursor-pointer

---

### 🔄 NEEDS REDESIGN (High Priority)

#### 1. **dialog.tsx** - CRITICAL

**Current State**: Generic shadcn/ui styling
**Issues**:

- Uses generic `bg-background` and `border`
- `sm:rounded-2xl` is okay but lacks cyberpunk flair
- No glowing effects or cyan accents
- Close button is basic

**Recommended Changes**:

```tsx
// Add to DialogContent default classes:
- bg-zinc-950 border-cyan-500/10
- shadow-[0_0_50px_rgba(6,182,212,0.2)]
- backdrop-blur-2xl ring-1 ring-cyan-500/5
- rounded-3xl (consistent with premium-guard)

// Close button:
- Add cyan hover effects
- Glowing ring on focus
```

---

#### 2. **card.tsx** - HIGH PRIORITY

**Current State**: Basic card with `rounded-lg border bg-card`
**Issues**:

- Too generic, doesn't match premium feel
- No glowing effects
- Basic borders

**Recommended Changes**:

```tsx
// Card base:
- bg-zinc-950/40 border-white/5
- rounded-2xl backdrop-blur-md
- Add optional glow variant for premium cards

// CardTitle:
- Option for Audiowide font
- Uppercase tracking-wider for cyberpunk style
```

---

#### 3. **input.tsx** - HIGH PRIORITY

**Current State**: Standard input with `border-input bg-background`
**Issues**:

- No cyberpunk styling
- Focus ring is generic

**Recommended Changes**:

```tsx
- bg-zinc-900/40 border-white/5
- focus:border-cyan-500/30 focus:ring-cyan-500/20
- rounded-xl (more modern)
- placeholder:text-zinc-600
- Add subtle glow on focus
```

---

#### 4. **tabs.tsx** - MEDIUM PRIORITY

**Current State**: Basic muted background tabs
**Issues**:

- `bg-muted` doesn't match cyberpunk theme
- Active state is too subtle

**Recommended Changes**:

```tsx
// TabsList:
- bg-zinc-900/50 border border-white/5
- rounded-2xl

// TabsTrigger active state:
- data-[state=active]:bg-zinc-800
- data-[state=active]:text-cyan-400
- Add glow effect on active
```

**Note**: This is already implemented in pricing-dialog! Can extract as default.

---

#### 5. **badge.tsx** - MEDIUM PRIORITY

**Current State**: Generic rounded-full badges
**Issues**:

- No cyberpunk variants
- Missing glow effects

**Recommended Changes**:

```tsx
// Add new variants:
- premium: cyan background with glow
- pro: gradient with animation
- status: with pulsing dot

// Example:
premium: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.3)]"
```

---

#### 6. **select.tsx** - MEDIUM PRIORITY

**Current State**: Standard dropdown
**Issues**:

- Generic styling
- Dropdown content lacks premium feel

**Recommended Changes**:

```tsx
// SelectTrigger:
- bg-zinc-900/40 border-white/5
- focus:border-cyan-500/30

// SelectContent:
- bg-zinc-950 border-cyan-500/10
- backdrop-blur-xl
- shadow-[0_0_30px_rgba(6,182,212,0.2)]

// SelectItem:
- hover:bg-cyan-500/10 hover:text-cyan-400
```

---

#### 7. **switch.tsx** - LOW PRIORITY

**Current State**: Basic toggle switch
**Issues**:

- Generic primary color
- No glow effect

**Recommended Changes**:

```tsx
// Checked state:
- data-[state=checked]:bg-cyan-500
- Add glow: shadow-[0_0_8px_rgba(6,182,212,0.5)]
- Animate the glow on toggle
```

---

### ✨ OPTIONAL ENHANCEMENTS

#### 8. **alert.tsx** - OPTIONAL

**Current State**: Basic alert component
**Recommendation**: Add cyberpunk variants

```tsx
// New variants:
- info: cyan border with glow
- warning: yellow/orange with glow
- success: emerald with glow
```

---

#### 9. **tooltip.tsx** - OPTIONAL

**Current State**: Basic tooltip
**Recommendation**: Add subtle cyberpunk styling

```tsx
- bg-zinc-950 border-cyan-500/20
- backdrop-blur-xl
- text-xs uppercase tracking-wider
```

---

### ⚪ NO CHANGES NEEDED

10. **accordion.tsx** - Context-dependent, override when needed
11. **avatar.tsx** - Generic component, fine as-is
12. **bubble-background.tsx** - Decorative, already has effects
13. **dropdown-menu.tsx** - Can be styled per-usage
14. **label.tsx** - Simple text, fine as-is
15. **separator.tsx** - Simple divider, fine as-is
16. **sheet.tsx** - Side panel, context-dependent
17. **sidebar.tsx** - Large component, already customized
18. **skeleton.tsx** - Loading state, fine as-is
19. **user-menu.tsx** - Already customized

---

## Implementation Priority

### Phase 1: Critical (Do First)

1. ✅ **dialog.tsx** - Used everywhere, highest impact
2. ✅ **card.tsx** - Core component for dashboard
3. ✅ **input.tsx** - Forms need premium feel

### Phase 2: High Impact

4. **tabs.tsx** - Extract from pricing-dialog
5. **badge.tsx** - Add premium variants
6. **select.tsx** - Dropdowns are common

### Phase 3: Polish

7. **switch.tsx** - Settings toggles
8. **alert.tsx** - Add cyberpunk variants
9. **tooltip.tsx** - Subtle enhancement

---

## Design Tokens to Standardize

Create a shared cyberpunk design system:

```tsx
// colors
export const cyberpunkColors = {
  accent: "cyan-500",
  accentGlow: "rgba(6,182,212,0.3)",
  background: "zinc-950",
  backgroundSubtle: "zinc-950/40",
  border: "white/5",
  borderAccent: "cyan-500/10",
  text: "zinc-300",
  textBright: "white",
};

// effects
export const cyberpunkEffects = {
  glow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
  glowStrong: "shadow-[0_0_40px_rgba(6,182,212,0.5)]",
  blur: "backdrop-blur-xl",
  ring: "ring-1 ring-cyan-500/5",
};

// typography
export const cyberpunkText = {
  header: "font-black uppercase tracking-widest",
  subtext: "text-xs uppercase tracking-wider font-bold",
};
```

---

## Conclusion

**Total Components**: 22

- **Already Styled**: 5 ✅
- **Need Redesign**: 7 🔄
- **Optional**: 2 ✨
- **No Changes**: 8 ⚪

**Recommended Action**:
Start with Phase 1 (dialog, card, input) as they have the highest impact across the application. These three components are used extensively and will immediately improve the overall cyberpunk aesthetic consistency.
