"use client";
import { useState, useEffect } from "react";

export function ClippyWindow() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [clippySrc, setClippySrc] = useState<string | null>(null);
  const [visibleOnce, setVisibleOnce] = useState(false);
  const [avgThreshold, setAvgThreshold] = useState<number>(() => {
    if (typeof window === "undefined") return 190; // tuned default
    const v = Number(localStorage.getItem("clippy_avg") || "190");
    return Number.isFinite(v) ? v : 190;
  });
  const [chromaThreshold, setChromaThreshold] = useState<number>(() => {
    if (typeof window === "undefined") return 60; // tuned default
    const v = Number(localStorage.getItem("clippy_chroma") || "60");
    return Number.isFinite(v) ? v : 60;
  });
  // Hide controls for users by default
  const SHOW_CONTROLS = process.env.NEXT_PUBLIC_CLIPPY_CONTROLS === "1";

  const messages = [
    { text: "Hey friend — I’m Clippy! 👋 I’ll be your gentle guide to The Agency OS™.", type: "greeting" },
    { text: "Start opens the menu. Desktop icons open windows. Everything’s draggable — go play! ✨", type: "tip" },
    { text: "Try MASH to manifest your future: home, partner, career, car, kids, pets, wealth. It saves a cute share card. #theagencyMASH", type: "suggestion" },
    { text: "Need us? Pop open AOL Chat — we’re basically besties around here. 💬", type: "contact" },
    { text: "Quick tip: Put the promise in the first 3 words of your headline. Hooks win hearts. 💡", type: "tip" },
    { text: "Another tip: Make the CTA specific — ‘Get the playlist’ > ‘Learn more’. 🎯", type: "tip" },
    { text: "Joke break: I tried to design a logo with no curves… too many edgy comments. 😅", type: "fun" },
    { text: "Want an overview? The Help/FAQ has bite‑size answers. I can open it.", type: "help" },
    { text: "We love cozy cowork vibes. Check Coffee Club — open to all careers, good energy only. ☕", type: "suggestion" },
    { text: "Pro move: Share your MASH card and tag us. We’ll hype you up. 📣", type: "suggestion" },
  ];

  // Slow down message cadence a bit so Clippy feels chill
  const TYPE_DURATION = 3500; // ms that simulated typing runs
  const MESSAGE_INTERVAL = 12000; // ms between message cycles
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length);
          setIsTyping(false);
        }, TYPE_DURATION);
      }
    }, MESSAGE_INTERVAL);

    return () => clearInterval(interval);
  }, [isTyping]);

  const processImage = (src: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Flood-fill from edges to remove background similar to white/off-white,
        // preserving internal whites (eyes) that are not edge-connected.
        const w = imageData.width;
        const h = imageData.height;
        const data = imageData.data;
        const idx = (x: number, y: number) => (y * w + x) * 4;
        const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
        // Sample corners to determine background reference colors
        const samples: number[][] = [];
        const patch = 6;
        const addPatch = (sx: number, sy: number) => {
          let rr = 0, gg = 0, bb = 0, count = 0;
          for (let y = sy; y < sy + patch; y++) {
            for (let x = sx; x < sx + patch; x++) {
              const p = idx(clamp(x, 0, w - 1), clamp(y, 0, h - 1));
              rr += data[p];
              gg += data[p + 1];
              bb += data[p + 2];
              count++;
            }
          }
          samples.push([rr / count, gg / count, bb / count]);
        };
        addPatch(0, 0);
        addPatch(w - patch, 0);
        addPatch(0, h - patch);
        addPatch(w - patch, h - patch);
        const dist2 = (c1: number[], c2: number[]) => {
          const dr = c1[0] - c2[0];
          const dg = c1[1] - c2[1];
          const db = c1[2] - c2[2];
          return dr * dr + dg * dg + db * db;
        };
        // Derive a tolerance from controls (mapped to 0..140 roughly)
        const tol = clamp(chromaThreshold + (avgThreshold - 150), 12, 160);
        const tol2 = tol * tol;
        const isBg = (x: number, y: number) => {
          const p = idx(x, y);
          const c = [data[p], data[p + 1], data[p + 2]];
          for (const s of samples) if (dist2(c, s) <= tol2) return true;
          return false;
        };
        const visited = new Uint8Array(w * h);
        const q: number[] = [];
        const pushIf = (x: number, y: number) => {
          if (x < 0 || y < 0 || x >= w || y >= h) return;
          const id = y * w + x;
          if (visited[id]) return;
          if (!isBg(x, y)) return;
          visited[id] = 1;
          q.push(x, y);
        };
        // Seed with border pixels
        for (let x = 0; x < w; x++) { pushIf(x, 0); pushIf(x, h - 1); }
        for (let y = 0; y < h; y++) { pushIf(0, y); pushIf(w - 1, y); }
        // BFS
        while (q.length) {
          const y = q.pop() as number;
          const x = q.pop() as number;
          const p = idx(x, y);
          data[p + 3] = 0; // make transparent
          pushIf(x + 1, y);
          pushIf(x - 1, y);
          pushIf(x, y + 1);
          pushIf(x, y - 1);
        }
        ctx.putImageData(imageData, 0, 0);
        setClippySrc(canvas.toDataURL("image/png"));
      } catch (e) {
        // Fallback to original if processing fails
        setClippySrc(src);
      }
    };
    img.onerror = () => setClippySrc(src);
    img.src = src;
  };

  // Load clippy image and remove background; prefer pre-cut PNG if present
  useEffect(() => {
    const envSrc = process.env.NEXT_PUBLIC_CLIPPY_IMAGE;
    if (envSrc) {
      if (/\.(png|webp|gif)$/i.test(envSrc)) setClippySrc(envSrc);
      else processImage(envSrc);
      return;
    }
    // Try preferred candidates in order
    const candidates = [
      "/images/Clippy-1.png",
      "/images/clippy.png",
      "/images/icons/Clippy-1.png",
      "/images/icons/clippy-1.png",
      "/images/icons/clippy.svg",
    ];
    const tryNext = (i: number) => {
      if (i >= candidates.length) {
        processImage("/images/clippy.jpg");
        return;
      }
      const img = new Image();
      img.onload = () => setClippySrc(candidates[i]);
      img.onerror = () => tryNext(i + 1);
      img.src = candidates[i];
    };
    tryNext(0);
  }, []);

  // Persist thresholds and re-process when adjusted
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("clippy_avg", String(avgThreshold));
      localStorage.setItem("clippy_chroma", String(chromaThreshold));
    }
    const src = process.env.NEXT_PUBLIC_CLIPPY_IMAGE || "/images/clippy.jpg";
    if (!/\.(png|webp|gif)$/i.test(src)) {
      processImage(src);
    } else {
      setClippySrc(src);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avgThreshold, chromaThreshold]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const currentMsg = messages[currentMessage];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "transparent",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 3000,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {isVisible && (
        <>
          {/* Clippy Character */}
          <div
            style={{
              position: "absolute",
              left: position.x,
              top: position.y,
              width: "120px",
              height: "120px",
              cursor: isDragging ? "grabbing" : "grab",
              zIndex: 1000,
              pointerEvents: "auto",
            }}
            onMouseDown={handleMouseDown}
          >
            {/* Processed Clippy image with transparent background */}
            {clippySrc ? (
              <img
                src={clippySrc}
                alt="Clippy Assistant"
                width={120}
                height={120}
                style={{
                  width: 120,
                  height: 120,
                  filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
                  animation:
                    (visibleOnce ? "" : "bounceIn 500ms ease-out both, ") +
                    "float 3s ease-in-out infinite, wave 2s ease-in-out infinite",
                  imageRendering: "auto",
                  pointerEvents: "none",
                }}
                onAnimationEnd={() => setVisibleOnce(true)}
              />
            ) : (
              <div style={{ width: 120, height: 120, background: "#0078d4", borderRadius: 12 }} />
            )}
          </div>

          {/* Speech Bubble */}
          <div
            style={{
              position: "absolute",
              left: position.x + 130,
              top: position.y - 10,
              background: "#fff",
              border: "2px solid #0078d4",
              borderRadius: "10px",
              padding: "12px",
              maxWidth: "250px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              zIndex: 999,
              animation: "bubble 0.3s ease-out",
              pointerEvents: "auto",
            }}
          >
            {/* Speech Bubble Tail */}
            <div
              style={{
                position: "absolute",
                left: "-10px",
                top: "20px",
                width: "0",
                height: "0",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "10px solid #0078d4",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "-8px",
                top: "20px",
                width: "0",
                height: "0",
                borderTop: "8px solid transparent",
                borderBottom: "8px solid transparent",
                borderRight: "10px solid #fff",
              }}
            />

            <div
              style={{ fontSize: "13px", color: "#1e2a4a", lineHeight: "1.4" }}
            >
              {isTyping ? (
                <span>
                  {currentMsg.text.substring(
                    0,
                    Math.floor(Date.now() / 100) % (currentMsg.text.length + 1)
                  )}
                  <span style={{ animation: "blink 1s infinite" }}>▊</span>
                </span>
              ) : (
                currentMsg.text
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: "10px", display: "flex", gap: "6px" }}>
              {currentMsg.type === "help" && (
                <>
                  <button
                    onClick={() =>
                      window.dispatchEvent(new CustomEvent("openFAQWindow"))
                    }
                    style={{
                      padding: "4px 8px",
                      background: "#0078d4",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      color: "#fff",
                    }}
                  >
                    Yes!
                  </button>
                  <button
                    onClick={() =>
                      setCurrentMessage((currentMessage + 1) % messages.length)
                    }
                    style={{
                      padding: "4px 8px",
                      background: "#6c757d",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontSize: "11px",
                      color: "#fff",
                    }}
                  >
                    Maybe later
                  </button>
                </>
              )}
              {currentMsg.type === "contact" && (
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openAOLWindow"))
                  }
                  style={{
                    padding: "4px 8px",
                    background: "#28a745",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: "#fff",
                  }}
                >
                  Open Messenger
                </button>
              )}
              {currentMsg.type === "suggestion" && (
                <button
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("openMASHWindow"))
                  }
                  style={{
                    padding: "4px 8px",
                    background: "#ffcc00",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "11px",
                    color: "#000",
                  }}
                >
                  Let&apos;s Play!
                </button>
              )}
            </div>
          </div>

          {/* Control Panel (hidden unless NEXT_PUBLIC_CLIPPY_CONTROLS=1) */}
          {SHOW_CONTROLS && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "rgba(0,0,0,0.8)",
              color: "#fff",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "11px",
              zIndex: 1001,
            }}
          >
            <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Clippy Controls
            </div>
            <button
              onClick={() => setIsVisible(false)}
              style={{
                padding: "4px 8px",
                background: "#dc3545",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "10px",
                color: "#fff",
                marginRight: "5px",
              }}
            >
              Hide
            </button>
            <button
              onClick={() =>
                setCurrentMessage((currentMessage + 1) % messages.length)
              }
              style={{
                padding: "4px 8px",
                background: "#0078d4",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
                fontSize: "10px",
                color: "#fff",
              }}
            >
              Next Tip
            </button>
            <div style={{ marginTop: 8 }}>
              <div style={{ opacity: 0.8, marginBottom: 4 }}>BG Avg: {avgThreshold}</div>
              <input
                type="range"
                min={160}
                max={255}
                value={avgThreshold}
                onChange={(e) => setAvgThreshold(Number(e.currentTarget.value))}
                style={{ width: 160 }}
              />
              <div style={{ opacity: 0.8, margin: "6px 0 4px" }}>Chroma: {chromaThreshold}</div>
              <input
                type="range"
                min={0}
                max={80}
                value={chromaThreshold}
                onChange={(e) => setChromaThreshold(Number(e.currentTarget.value))}
                style={{ width: 160 }}
              />
            </div>
          </div>
          )}
        </>
      )}

      {/* Show Clippy Button */}
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            background: "#0078d4",
            border: "none",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "12px",
            color: "#fff",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            pointerEvents: "auto",
          }}
        >
          📎 Show Clippy
        </button>
      )}

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg) translateY(0); }
          25% { transform: rotate(3deg) translateY(-1px); }
          50% { transform: rotate(-3deg) translateY(0); }
          75% { transform: rotate(2deg) translateY(1px); }
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.9); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes bubble {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes blink {
          0%,
          50% {
            opacity: 1;
          }
          51%,
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
