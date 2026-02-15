# UI Components Rounding Audit

## Current Rounding Standards

### ✅ **Consistent Components (Tactical - rounded-lg/md)**

- **Button**: `rounded-lg` (base), `rounded-md` (sm), `rounded-lg` (lg/icon) ✅
- **Dropdown Menu**: `rounded-xl` (container), `rounded-lg` (items) ✅
- **Select**: `rounded-xl` (trigger & content), `rounded-lg` (items) ✅
- **Tabs**: `rounded-xl` (container), `rounded-lg` (triggers) ✅
- **Tooltip**: `rounded-xl` ✅
- **Sidebar Menu Button**: `rounded-xl` ✅

### ⚠️ **Inconsistent Components (Need Review)**

#### **Too Rounded (rounded-2xl/3xl)**

1. **Card**: `rounded-2xl` - Container component, acceptable for larger surfaces
2. **Alert**: `rounded-2xl` - Notification component, acceptable
3. **Dialog**: `rounded-3xl` - Modal overlay, very rounded (could be reduced)
4. **Skeleton**: `rounded-xl` - Matches most components

#### **Input Components**

5. **Input**: `rounded-xl` - Should match Button/Select consistency

#### **Special Cases (Correct)**

6. **Badge**: `rounded-full` - Pill shape, correct ✅
7. **Avatar**: `rounded-full` - Circle shape, correct ✅
8. **Switch**: `rounded-full` - Toggle shape, correct ✅

#### **Decorative Elements**

9. **Showcase corners**: `rounded-sm` - Tactical corners, correct ✅
10. **Sidebar corners**: `rounded-sm` - Tactical corners, correct ✅

---

## Recommended Rounding Hierarchy

### **Interactive Elements (Tactical Feel)**

- **Small buttons/items**: `rounded-md` (6px)
- **Standard buttons/inputs**: `rounded-lg` (8px)
- **Dropdowns/menus**: `rounded-xl` (12px)

### **Container Elements (Softer Feel)**

- **Cards/Panels**: `rounded-2xl` (16px)
- **Modals/Dialogs**: `rounded-2xl` (16px) - Reduce from `rounded-3xl`

### **Special Elements**

- **Pills/Badges**: `rounded-full`
- **Avatars**: `rounded-full`
- **Tactical corners**: `rounded-sm` (2px)

---

## Components That Need Updates

### 1. **Dialog** (Priority: Medium)

- **Current**: `rounded-3xl` (24px)
- **Recommended**: `rounded-2xl` (16px)
- **Reason**: Too rounded for Cyberpunk theme, should match Cards

### 2. **Input** (Priority: Low)

- **Current**: `rounded-xl` (12px)
- **Recommended**: Keep `rounded-xl` OR reduce to `rounded-lg`
- **Reason**: Currently matches Select, which is good. Could be reduced for more tactical feel.

---

## Summary

**Overall Assessment**: The rounding is mostly consistent with a clear hierarchy:

- Interactive elements: `md` → `lg` → `xl`
- Containers: `2xl`
- Special: `full`

**Main Issue**: Dialog uses `rounded-3xl` which is too soft for the Cyberpunk theme.

**Recommendation**: Reduce Dialog to `rounded-2xl` to match Cards and maintain tactical aesthetic.
