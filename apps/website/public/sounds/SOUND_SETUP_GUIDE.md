# Cyberpunk UI Sound Effects - Setup Guide

The UI sound files currently exist but are empty placeholders. You need to add actual sound effects.

## Quick Solution: Download Free Sounds

### Recommended Sources:

1. **Freesound.org** (Free, requires account)
   - Search for: "sci-fi beep", "tech click", "UI confirm", "error beep"
   - Filter by: Short duration (0.1-0.5s), License: CC0 or CC-BY

2. **Zapsplat.com** (Free with attribution)
   - Category: Sci-Fi > UI
   - Look for: Interface beeps, confirmation tones, error sounds

3. **Mixkit.co** (Free, no attribution required)
   - Category: Sound Effects > Sci-Fi

### What to Look For:

**ui-beep.mp3** (Button clicks, navigation)

- Duration: 0.1-0.2 seconds
- Style: Short, sharp beep or click
- Pitch: Mid to high
- Example search: "UI click", "button beep", "interface tap"

**ui-confirm.mp3** (Successful actions, payments)

- Duration: 0.3-0.5 seconds
- Style: Pleasant ascending tone or "success" sound
- Pitch: Rising or positive
- Example search: "success beep", "confirm tone", "positive UI"

**ui-switch.mp3** (Tab changes, view transitions)

- Duration: 0.2-0.3 seconds
- Style: Whoosh or transition sound
- Pitch: Mid range
- Example search: "UI transition", "tab switch", "interface whoosh"

**ui-error.mp3** (Errors, warnings)

- Duration: 0.2-0.4 seconds
- Style: Descending tone or buzzer
- Pitch: Lower, more harsh
- Example search: "error beep", "warning tone", "negative UI"

## Quick Setup Steps:

1. Download 4 sound files matching the descriptions above
2. Convert to MP3 if needed (use online converter like cloudconvert.com)
3. Rename them to match:
   - ui-beep.mp3
   - ui-confirm.mp3
   - ui-switch.mp3
   - ui-error.mp3
4. Replace the files in: `apps/website/public/sounds/`
5. Test in the pricing dialog

## Alternative: Generate with AI

Use AI sound generation tools:

- **ElevenLabs** (Sound Effects)
- **Soundraw.io**
- Describe: "Short cyberpunk UI beep sound, 0.2 seconds"

## Testing

After adding sounds, test by:

1. Opening the pricing dialog
2. Clicking between packages (should hear switch sound)
3. Clicking payment methods (should hear beep)
4. Confirming payment (should hear confirm sound)

## Current Integration

The sounds are already integrated in the code:

- ✅ Hook created: `use-cyberpunk-sound.ts`
- ✅ Triggers added to pricing dialog
- ⏳ Need actual sound files

Volume levels are set to 20-30% to be subtle and professional.
