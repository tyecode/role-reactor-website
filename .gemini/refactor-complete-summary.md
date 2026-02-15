Comprehensive Refactor of Role Builder, No Server State, and Discord Preview

## Completed Actions

1.  **Refactored `role-builder.tsx`**:
    - **Removed Custom Styles**: Stripped all custom styles (`bg-zinc-900/40`, `border-white/5`, `backdrop-blur-xl`, etc.) from `Card`, `Input`, `Select`, `Button`, and various wrappers.
    - **Standardized Components**:
      - Replaced custom `section headers` with simple `h3` tags or standard `Card` structure.
      - Replaced custom `textarea` with a newly created standard `Textarea` component (in `components/ui/textarea.tsx`).
      - Simplified `DiscordPreview` wrapping to remove double-card nesting.
      - Refactored `PreviewInfo` to use a standard `muted` style instead of custom blue borders.
    - **Fixed Duplication**: Resolved a code duplication issue introduced during the refactor.
    - **Cleaned Imports**: Removed unused imports (`CardHeader`, `CardTitle`, `Settings2`, `Type`, `AlignLeft`, `Palette`).

2.  **Refactored `no-server-state.tsx`**:
    - Confirmed it uses the default design (Standard Card, Button, no custom Framer Motion animations).

3.  **Reviewed `discord-preview.tsx`**:
    - Confirmed that while it uses custom colors (`#313338`), this is intentional to mimic the Discord UI and is appropriate for a "Preview" component.

4.  **Created `components/ui/textarea.tsx`**:
    - Added a standard `Textarea` component based on `shadcn/ui` patterns to ensure consistent form styling.

## Result

The Role Builder feature now fully adheres to the application's default design system. Components are clean, reusable, and free of ad-hoc tailwind overrides. The codebase passes linting.
