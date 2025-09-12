"use client";

import { useEffect, useMemo, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [imageReady, setImageReady] = useState(false);

  // Preload image, then run a timed boot so the screen actually shows
  useEffect(() => {
    let interval: number | undefined;
    const minShow = 1200; // show briefly, but don't block excessively
    const fadeDuration = 600;
    const start = Date.now();

    const startProgress = () => {
      if (interval) return;
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + 3);
          const longEnough = Date.now() - start >= minShow;
          if (next >= 100 && longEnough) {
            if (interval) window.clearInterval(interval);
            setFading(true);
            setTimeout(() => onComplete(), fadeDuration);
          }
          return next;
        });
      }, 45);
    };

    const img = new Image();
    img.onload = () => {
      setImageReady(true);
      startProgress();
    };
    img.onerror = () => {
      // Fallback: proceed without image
      startProgress();
    };
    // Preload the boot image (file lives at public/Loading:boot page.png)
    img.src = "/Loading:boot page.png";
    // Safety: if image load hangs, start anyway
    const safety = window.setTimeout(startProgress, 300);

    return () => {
      if (interval) window.clearInterval(interval);
      window.clearTimeout(safety);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[3000]"
      style={{
        // Quote the path so spaces render correctly
        backgroundImage: 'url("/Loading:boot page.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        backgroundColor: '#0b1535',
        opacity: fading ? 0 : 1,
        transition: 'opacity 800ms ease',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  );
}
