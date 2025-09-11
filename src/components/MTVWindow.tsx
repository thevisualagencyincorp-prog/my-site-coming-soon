"use client";
import { useRef, useState } from "react";

export function MTVWindow() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const src =
    "https://ia800500.us.archive.org/18/items/mtv-00s-non-stop-y-2-ks-1h-03112023/MTV%2000s%20-%20Non-Stop%20Y2KS%20%281h%29%2803112023%29.mp4";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0b0b0b",
        color: "#fff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          background: "linear-gradient(90deg,#ff00cc,#3333ff)",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontWeight: 800, letterSpacing: 0.5 }}>MTV 00s — Non‑Stop Y2K</span>
        <span style={{ marginLeft: "auto", fontSize: 12, opacity: 0.85 }}>
          Archive.org stream
        </span>
      </div>
      <div style={{ flex: 1, position: "relative", background: "#000" }}>
        <video
          ref={ref}
          src={src}
          autoPlay
          muted={muted}
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", bottom: 10, left: 10, display: "flex", gap: 8 }}>
          <button
            onClick={() => setMuted((m) => !m)}
            style={{ padding: "6px 10px", background: "#ffffff22", border: "1px solid #ffffff33", borderRadius: 6 }}
          >
            {muted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
    </div>
  );
}
