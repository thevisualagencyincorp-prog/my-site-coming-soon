"use client";
import { useEffect } from "react";

interface BootScreenProps {
  onComplete: () => void;
}

const installMessages = [
  "Installing: Visionary Pixels...",
  "Extracting: Creative Assets...",
  "Configuring: Digital Synergy...",
  "Optimizing: Agency OS Kernel...",
  "Finalizing: The Agency Experience...",
  "Welcome to The Agency OS!",
];

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  // Pick a random install message for fun
  const msg =
    installMessages[Math.floor(Math.random() * installMessages.length)];

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none">
      <img
        src="/images/Loading:boot page.png"
        alt="Booting..."
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ imageRendering: "pixelated", zIndex: 1 }}
      />
      {/* Animated dino overlay - using CSS animation instead of separate image */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 animate-bounce-dino">
        <div className="w-32 h-32 bg-green-400 rounded-full flex items-center justify-center text-6xl">
          🦕
        </div>
      </div>
      {/* Install message */}
      <div
        className="relative z-20 text-green-400 font-mono text-xl text-center drop-shadow-lg"
        style={{ textShadow: "0 0 6px #0f0" }}
      >
        {msg}
      </div>
      <div
        className="absolute bottom-8 left-0 w-full text-center text-green-700 text-xs opacity-70"
        style={{ color: "#00FF00", fontFamily: "IBM Plex Mono, monospace" }}
      >
        © 2025 The Agency. All rights reserved.{" "}
        <span className="ml-2">Agency OS v1.0</span>
      </div>
    </div>
  );
}
