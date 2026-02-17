"use client";

import { useCallback, useRef } from "react";

// Full SFX Library Mapping
const SOUND_LIBRARY = {
  // Core UI Sounds (Preloaded)
  beep: "/sounds/sfx/beep-electric-3.wav", // Standard Beep
  confirm: "/sounds/sfx/cursor-click-01.wav", // Standard Confirm
  switch: "/sounds/sfx/cursor-click-11.wav", // Standard Switch/Back
  error: "/sounds/sfx/beeps-4.wav", // Standard Error
  "glitch-in": "/sounds/glitch-in.mp3", // Heavy Glitch In
  "glitch-out": "/sounds/glitch-out.mp3", // Heavy Glitch Out
  "ui-switch": "/sounds/ui-switch.mp3", // New requested sound

  // Clicks & Cursors
  "click-01": "/sounds/sfx/cursor-click-01.wav",
  "click-06": "/sounds/sfx/cursor-click-06.wav",
  "click-11": "/sounds/sfx/cursor-click-11.wav",
  "click-18": "/sounds/sfx/cursor-click-18.wav",
  "click-24": "/sounds/sfx/cursor-click-24.wav",

  // Selections / Hovers
  "select-02": "/sounds/sfx/cursor-selection-02.wav",
  "select-07": "/sounds/sfx/cursor-selection-07.wav",
  "select-11": "/sounds/sfx/cursor-selection-11.wav",
  "select-15": "/sounds/sfx/cursor-selection-15.wav",
  "select-16": "/sounds/sfx/cursor-selection-16.wav",

  // Movement
  "move-11": "/sounds/sfx/move-cursor-11.wav",
  "move-13": "/sounds/sfx/move-cursor-13.wav",
  "move-25": "/sounds/sfx/move-cursor-25.wav",

  // Beeps & Alerts
  "beep-button": "/sounds/sfx/beep-button.wav",
  "beep-button-3": "/sounds/sfx/beep-button-3.wav",
  "beep-button-6": "/sounds/sfx/beep-button-6.wav",
  "beep-electric": "/sounds/sfx/beep-electric.wav",
  "beep-electric-2": "/sounds/sfx/beep-electric-2.wav",
  "beep-electric-3": "/sounds/sfx/beep-electric-3.wav",
  "beep-electric-4": "/sounds/sfx/beep-electric-4.wav",
  "type-beep": "/sounds/sfx/type-beep.wav",
  "readout-beep": "/sounds/sfx/readout-beep.wav",

  // Heavy / Ambient
  "device-2": "/sounds/sfx/device-2.wav",
  "device-3": "/sounds/sfx/device-3.wav",
  scanner: "/sounds/sfx/scanner.wav",
  "scanner-3": "/sounds/sfx/scanner-3.wav",
  "alarm-keypad": "/sounds/sfx/alarm-system-keypad.wav",
  vending: "/sounds/sfx/vending-machine-2.wav",
} as const;

export type SoundName = keyof typeof SOUND_LIBRARY;

// Audio state singleton
interface AudioState {
  context: AudioContext | null;
  masterGain: GainNode | null;
  buffers: Map<string, AudioBuffer>;
  isInitialized: boolean;
  isInitializing: boolean;
}

const state: AudioState = {
  context: null,
  masterGain: null,
  buffers: new Map(),
  isInitialized: false,
  isInitializing: false,
};

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

async function loadSound(url: string, key: string) {
  if (!state.context) return;
  try {
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const decoded = await state.context.decodeAudioData(buf);
    state.buffers.set(key, decoded);
  } catch (e) {
    console.warn(`[UI Audio] Failed to load ${key}:`, e);
  }
}

async function init() {
  if (
    state.isInitialized ||
    state.isInitializing ||
    typeof window === "undefined"
  )
    return;
  state.isInitializing = true;

  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;

    state.context = new Ctx();
    state.masterGain = state.context.createGain();
    state.masterGain.gain.value = 0.4; // Slightly louder default
    state.masterGain.connect(state.context.destination);

    // Preload only core sounds to start fast
    const coreSounds: SoundName[] = ["beep", "confirm", "switch", "error"];
    await Promise.all(
      coreSounds.map((key) => loadSound(SOUND_LIBRARY[key], key))
    );

    // Lazy load the rest in background
    Promise.all(
      Object.entries(SOUND_LIBRARY).map(([key, url]) => {
        if (!state.buffers.has(key)) {
          return loadSound(url, key);
        }
        return Promise.resolve();
      })
    );

    state.isInitialized = true;
  } catch (e) {
    console.error("[UI Audio] init failed", e);
  } finally {
    state.isInitializing = false;
  }
}

// Global initialization
if (typeof window !== "undefined") {
  init();
  const resume = () => {
    if (state.context?.state === "suspended") {
      state.context.resume();
    }
  };
  window.addEventListener("mousedown", resume, { capture: true });
  window.addEventListener("keydown", resume, { capture: true });
  window.addEventListener("touchstart", resume, { capture: true });
}

export function useUiSound() {
  const lastPlayRef = useRef<Map<string, number>>(new Map());

  const play = useCallback((name: SoundName, vol: number = 0.5) => {
    if (!state.isInitialized) {
      init();
      // Try to play anyway if context exists
    }

    if (!state.context || !state.masterGain) return;

    // Check if buffer is loaded, if not, try to load it on the fly (async, so won't play this instant but next time)
    if (!state.buffers.has(name)) {
      loadSound(SOUND_LIBRARY[name], name);
      return;
    }

    // Debounce per sound type (80ms - faster for rapid typing/UI)
    const now = Date.now();
    const lastPlay = lastPlayRef.current.get(name) || 0;
    if (now - lastPlay < 80) return;
    lastPlayRef.current.set(name, now);

    if (state.context.state !== "running") {
      state.context.resume();
    }

    try {
      const source = state.context.createBufferSource();
      source.buffer = state.buffers.get(name)!;
      const gain = state.context.createGain();
      gain.gain.value = vol;
      source.connect(gain);
      gain.connect(state.masterGain);
      source.start(0);
    } catch (e) {
      console.error("[UI Audio] playback error", e);
    }
  }, []);

  // Core shortcuts (backward compatibility)
  const playBeep = useCallback(() => play("beep", 0.3), [play]);
  const playConfirm = useCallback(() => play("confirm", 0.4), [play]);
  const playSwitch = useCallback(() => play("switch", 0.3), [play]);
  const playError = useCallback(() => play("error", 0.4), [play]);
  const playGlitchIn = useCallback(() => play("glitch-in", 0.5), [play]);

  return {
    play,
    playBeep,
    playConfirm,
    playSwitch,
    playError,
    playGlitchIn,
    playUiSwitch: useCallback(() => play("ui-switch", 0.4), [play]),
  };
}
