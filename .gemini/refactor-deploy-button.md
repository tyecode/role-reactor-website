Fixed 'Deploy to Discord' Button

## Completed Actions

1.  **Refactored 'Deploy to Discord' Button**:
    - Removed custom inline styles (e.g., `bg-blue-600`, `shadow-lg`, etc.).
    - Replaced with standard `Button` component: `size="lg"`, `className="w-full font-bold"`, and reliance on `disabled` prop for state.

2.  **Lint Cleanup**:
    - Removed unused imports: `Type`, `AlignLeft`, `Palette` from `role-builder.tsx`.
    - Removed unused `Activity` import from `page.tsx`.

## Result

The 'Deploy to Discord' button now adheres to the project's default design system, and the affected files are free of lint errors.
