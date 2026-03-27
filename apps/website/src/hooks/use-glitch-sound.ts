"use client";

import { useCallback, useRef } from "react";

const GLITCH_IN_URL = "/sounds/glitch-in.mp3";
const GLITCH_OUT_URL = "/sounds/glitch-out.mp3";

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
    state.masterGain.connect(state.context.destination);

    const load = async (url: string, key: string) => {
      try {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        const decoded = await state.context!.decodeAudioData(buf);
        state.buffers.set(key, decoded);
      } catch (e) {
        console.error(`[Audio] Failed to load ${key}:`, e);
      }
    };

    await Promise.all([load(GLITCH_IN_URL, "in"), load(GLITCH_OUT_URL, "out")]);
    state.isInitialized = true;
  } catch (e) {
    console.error("[Audio] init failed", e);
  } finally {
    state.isInitializing = false;
  }
}

// Global initialization
if (typeof window !== "undefined") {
  const handleInteraction = () => {
    init();
    if (state.context?.state === "suspended") {
      state.context.resume().catch(() => {});
    }
  };
  window.addEventListener("mousedown", handleInteraction, { capture: true });
  window.addEventListener("keydown", handleInteraction, { capture: true });
  window.addEventListener("touchstart", handleInteraction, { capture: true });
}

export function useGlitchSound() {
  // Use a ref for the last play time to debounce within this hook instance
  const lastInRef = useRef(0);
  const lastOutRef = useRef(0);

  const play = useCallback((key: "in" | "out", vol: number) => {
    if (!state.isInitialized) {
      init();
      return;
    }

    if (!state.context || !state.masterGain || !state.buffers.has(key)) return;

    // Strict debounce per-interaction to prevent volume stacking (200ms)
    const now = Date.now();
    if (key === "in") {
      if (now - lastInRef.current < 200) return;
      lastInRef.current = now;
    } else {
      if (now - lastOutRef.current < 200) return;
      lastOutRef.current = now;
    }

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
      console.error("[Audio] playback error", e);
    }
  }, []);

  const playIn = useCallback(() => play("in", 0.5), [play]);
  const playOut = useCallback(() => play("out", 0.45), [play]);

  return { playIn, playOut };
}
