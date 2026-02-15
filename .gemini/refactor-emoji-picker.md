Refactored Emoji Picker into Reusable Component

## Completed Actions

1.  **Created `components/ui/emoji-picker.tsx`**:
    - Moved all Emoji Picker logic (wrapper, styles, interfaces) to a standalone reusable component.
    - Exposed standard props: `onSelect`, `onRefresh`, `isLoadingEmojis`, `customEmojis`, etc.

2.  **Refactored `role-builder.tsx`**:
    - Replaced the inline `EmojiPickerWrapper` with the imported `<EmojiPicker />`.
    - Cleaned up imports and removed 200+ lines of duplicate code.
    - Ensured `RoleBuilderSkeleton` and `PreviewInfo` were preserved.

## Result

The Emoji Picker is now a shared UI component, reducing code duplication and making it available for use in other parts of the dashboard (e.g., future auto-response or onboarding features). The codebase is lint-free.
