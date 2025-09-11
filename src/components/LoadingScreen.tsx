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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {useMemo(() => {
          const particles = Array.from({ length: 20 }, () => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            animationDelay: Math.random() * 2,
            animationDuration: 2 + Math.random() * 2,
          }));
          return particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.animationDelay}s`,
                animationDuration: `${particle.animationDuration}s`,
              }}
            />
          ));
        }, [])}
      </div>

      {/* Loading content */}
      <div className="text-center z-10">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
            <div
              className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: "1s" }}
            ></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">The Agency</h1>
          <p className="text-white/80">Coming Soon</p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/90 text-sm">{Math.round(progress)}%</div>
        </div>
      </div>
    </div>
  );
}
