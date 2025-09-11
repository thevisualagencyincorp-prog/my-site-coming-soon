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
    const minShow = 1800; // show at least this long
    const fadeDuration = 800;
    const start = Date.now();

    const img = new Image();
    img.onload = () => {
      setImageReady(true);
      interval = window.setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(100, prev + 2);
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
    // Use site's loading image (uploaded to public/images)
    img.src = "/images/Loading:boot page.png";

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[3000]"
      style={{
        backgroundImage: 'url(/images/Loading:boot page.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 800ms ease',
        pointerEvents: 'none',
      }}
      aria-hidden
    />
  );
}
