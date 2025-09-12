"use client";

interface BootImageProps {
  progress: number;
  step: string;
}

export function BootImage({ progress, step }: BootImageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <img
        src="/images/Loading:boot page.png"
        alt="Booting..."
        className="w-[min(90vw,420px)] h-auto mb-8 rounded border border-green-700 shadow-2xl"
        style={{ imageRendering: "pixelated", background: "#111", padding: 8 }}
      />
      <div className="w-[min(90vw,420px)] max-w-full bg-green-900/60 rounded h-4 overflow-hidden mb-3 border border-green-400/60 shadow-inner">
        <div
          className="bg-green-400 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div
        className="text-green-400 text-base mt-4 animate-pulse font-mono tracking-widest"
        style={{ fontFamily: "IBM Plex Mono, monospace", letterSpacing: 2 }}
      >
        {step}
      </div>
    </div>
  );
}
