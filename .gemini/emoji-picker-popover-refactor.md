# Emoji Picker Refactor to Popover Component

## Changes Made

### 1. Updated `emoji-picker.tsx`

The emoji picker has been refactored to use the Radix UI Popover component for proper behavior:

**New API:**

```tsx
<EmojiPicker
  open={boolean}
  onOpenChange={(open: boolean) => void}
  trigger={<Button>...</Button>}
  // ... other props (guildId, customEmojis, onSelect, etc.)
/>
```

**Benefits:**

- ✅ Automatic click-outside-to-close
- ✅ Proper focus management
- ✅ Keyboard navigation (ESC to close)
- ✅ Better positioning with Radix Popover
- ✅ Portal rendering (no z-index issues)

### 2. Required Changes in `role-builder.tsx`

#### Remove:

1. `pickerRef` ref and its usage
2. Click-outside event listener (lines 95-107)
3. `pickerRef` from `RoleMappingListProps` interface

#### Update:

Replace the emoji picker usage (around lines 531-590) with:

```tsx
<EmojiPicker
  open={openEmojiPicker === i}
  onOpenChange={(open) => setOpenEmojiPicker(open ? i : null)}
  guildId={guildId}
  isLoadingEmojis={isLoadingEmojis}
  hasFetchedEmojis={hasFetchedEmojis}
  emojiError={emojiError}
  onRefresh={() => fetchEmojis(guildId, true)}
  customEmojis={customEmojis}
  guildIconUrl={guildIconUrl}
  onSelect={(emoji) => {
    const val = emoji.native || emoji.id;
    updateReaction(i, { emoji: val });
    setOpenEmojiPicker(null);
  }}
  trigger={
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "h-11 w-11 shrink-0 bg-zinc-950/50 relative group/emoji",
        "hover:bg-zinc-900 hover:border-cyan-500/30 hover:shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]",
        "transition-all duration-200",
        openEmojiPicker === i &&
          "border-cyan-500/50 bg-zinc-900 shadow-[0_0_20px_-5px_rgba(6,182,212,0.4)]"
      )}
      title="Click to select emoji"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover/emoji:from-cyan-500/5 group-hover/emoji:to-purple-500/5 transition-all duration-300" />

      <div className="text-xl relative z-10 transition-transform group-hover/emoji:scale-110 flex items-center justify-center w-full h-full">
        {r.emoji?.startsWith("<") ? (
          <img
            src={
              serverEmojis.find((e: DiscordEmoji) => e.identifier === r.emoji)
                ?.url
            }
            alt=""
            className="w-6 h-6 object-contain"
          />
        ) : (
          <span>{r.emoji || "🔘"}</span>
        )}
      </div>

      {/* Click indicator */}
      {!r.emoji && (
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse opacity-0 group-hover/emoji:opacity-100 transition-opacity" />
      )}
    </Button>
  }
/>
```

## Next Steps

The user needs to manually update `role-builder.tsx` to remove the old implementation and use the new Popover-based API.
