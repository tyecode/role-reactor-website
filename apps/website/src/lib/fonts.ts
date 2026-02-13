import { Audiowide, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const audiowide = Audiowide({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
