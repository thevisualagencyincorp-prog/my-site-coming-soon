"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  // Preload image, then run a timed boot so the screen actually shows
  useEffect(() => {
    let interval: any;
    const minShow = 2600; // show at least this long
    const fadeDuration = 800;
    const start = Date.now();

    const img = new Image();
    img.onload = () => {
      setImageReady(true);
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + 2);
          const longEnough = Date.now() - start >= minShow;
          if (next >= 100 && longEnough) {
            clearInterval(interval);
            setFading(true);
            setTimeout(() => onComplete(), fadeDuration);
          }
          return next;
        });
      }, 45);
    };
    img.src = "/images/Loading:boot page.png";

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center relative overflow-hidden transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Solid backdrop to feel like separate boot screen */}
      <div className="absolute inset-0 bg-[#001a8d]" />
      {/* Agency Loading Background Image */}
      <img
        src="/images/Loading:boot page.png"
        alt="Agency Loading Screen"
        className="absolute inset-0 w-full h-full object-cover"
        onLoad={() => setImageReady(true)}
      />
      {/* CRT scanlines + grain overlays */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines animate-crt-flicker" />
      <div className="absolute inset-0 pointer-events-none grain-overlay animate-grain" />
    </div>
  );
}
