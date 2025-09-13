"use client";

import { useEffect, useState } from "react";

interface ClippyAnimationProps {
  onComplete?: () => void;
  duration?: number;
}

export function ClippyAnimation({
  onComplete,
  duration = 4000,
}: ClippyAnimationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  useEffect(() => {
    // Show speech bubble after bounce animation completes
    const bubbleTimer = setTimeout(() => {
      setShowBubble(true);
    }, 1200);

    return () => clearTimeout(bubbleTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#1a1a1a] flex justify-center items-center overflow-hidden">
      <div className="relative flex flex-col items-center">
        {/* Speech Bubble */}
        {showBubble && (
          <div className="speech-bubble mb-4 animate-fade-in">
            <div className="speech-bubble-content">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Welcome to The Agency OS! 👋
              </p>
              <div className="text-xs text-gray-700 space-y-1">
                <p>
                  • <strong>Hire Us</strong> - Let's build something amazing
                </p>
                <p>
                  • <strong>Vibe Check</strong> - See if we're a good fit
                </p>
                <p>
                  • <strong>Explore</strong> - Discover our creative work
                </p>
                <p>
                  • <strong>Contact</strong> - Get in touch today!
                </p>
              </div>
            </div>
            {/* Speech bubble pointer */}
            <div className="speech-bubble-pointer"></div>
          </div>
        )}

        <img
          src="/images/clippy-2.png"
          alt="Clippy"
          className="w-48 opacity-0"
          style={{
            animation:
              "bounceIn 1.2s ease-out forwards, wiggle 3s infinite 1.2s",
            width: "200px",
          }}
        />
      </div>
    </div>
  );
}
