Refactor Role Builder & Page to Default Design

## Completed Actions

1.  **Refactored `role-builder.tsx`**:
    - Removed custom inline styles (e.g., `bg-zinc-950/40`, `border-white/5`, etc.) from `Card`, `Input`, `Select`, and `Button` components.
    - replaced `Select` implementation with standard `SelectTrigger`, `SelectValue`, `SelectContent` pattern.
    - Replaced custom emoji picker trigger button with standard `Button` component.
    - Replaced custom "Selection Mode" buttons with standard `Button` variants (`outline`, `secondary`).
    - Cleaned up `RoleMappingList` to use standard list item styling.

2.  **Refactored `no-server-state.tsx`**:
    - Removed `framer-motion` animations and heavy custom DOM structure.
    - Simplified to a clean "Empty State" design using standard `Button` and text classes.
    - Removed unused imports.

3.  **Verified `page.tsx`**:
    - Confirmed it uses `PageHeader` correctly.
    - Skeleton usage is consistent with standard components.

## Result

The Role Builder page now adheres to the project's default design system without custom overrides, ensuring consistency and easier maintenance. The components now rely on the definitions in `@/components/ui/*`.
