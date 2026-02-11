"use client";

import { useCallback, useRef } from "react";

// Cyberpunk UI sound URLs
const UI_BEEP_URL = "/sounds/ui-beep.mp3";
const UI_CONFIRM_URL = "/sounds/ui-confirm.wav";
const UI_SWITCH_URL = "/sounds/ui-switch.mp3";
const UI_ERROR_URL = "/sounds/ui-error.wav";

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
    state.masterGain.gain.value = 0.3; // Lower volume for UI sounds
    state.masterGain.connect(state.context.destination);

    const load = async (url: string, key: string) => {
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        const decoded = await state.context!.decodeAudioData(buf);
        state.buffers.set(key, decoded);
      } catch (e) {
        console.warn(`[UI Audio] Failed to load ${key}:`, e);
      }
    };

    await Promise.all([
      load(UI_BEEP_URL, "beep"),
      load(UI_CONFIRM_URL, "confirm"),
      load(UI_SWITCH_URL, "switch"),
      load(UI_ERROR_URL, "error"),
    ]);
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

  const play = useCallback(
    (key: "beep" | "confirm" | "switch" | "error", vol: number = 0.3) => {
      if (!state.isInitialized) {
        init();
        return;
      }

      if (!state.context || !state.masterGain || !state.buffers.has(key))
        return;

      // Debounce per sound type (150ms)
      const now = Date.now();
      const lastPlay = lastPlayRef.current.get(key) || 0;
      if (now - lastPlay < 150) return;
      lastPlayRef.current.set(key, now);

      if (state.context.state !== "running") {
        state.context.resume();
      }

      try {
        const source = state.context.createBufferSource();
        source.buffer = state.buffers.get(key)!;
        const gain = state.context.createGain();
        gain.gain.value = vol;
        source.connect(gain);
        gain.connect(state.masterGain);
        source.start(0);
      } catch (e) {
        console.error("[UI Audio] playback error", e);
      }
    },
    []
  );

  const playBeep = useCallback(() => play("beep", 0.25), [play]);
  const playConfirm = useCallback(() => play("confirm", 0.3), [play]);
  const playSwitch = useCallback(() => play("switch", 0.2), [play]);
  const playError = useCallback(() => play("error", 0.35), [play]);

  return { playBeep, playConfirm, playSwitch, playError };
}
