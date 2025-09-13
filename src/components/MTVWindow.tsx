"use client";
import { useRef, useState } from "react";

export function MTVWindow() {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);
  const src =
    "https://ia800500.us.archive.org/18/items/mtv-00s-non-stop-y-2-ks-1h-03112023/MTV%2000s%20-%20Non-Stop%20Y2KS%20%281h%29%2803112023%29.mp4";

  const handleVideoError = () => {
    setError(true);
    setReady(false);
  };

  const handleVideoLoad = () => {
    setReady(true);
    setError(false);
  };

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
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: ready ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
        >
          <video
            ref={ref}
            src={src}
            autoPlay
            muted={muted}
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            onError={handleVideoError}
          />
        </div>
        {!ready && !error && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              opacity: 0.7,
              fontSize: 14,
            }}
          >
            Loading… 📺
          </div>
        )}
        {error && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              opacity: 0.8,
              fontSize: 14,
              textAlign: "center",
              padding: "20px",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 10 }}>📺</div>
            <div>MTV Video Unavailable</div>
            <div style={{ fontSize: 12, marginTop: 10, opacity: 0.7 }}>
              The video stream may be temporarily unavailable.<br />
              Please try again later.
            </div>
            <button
              onClick={() => {
                setError(false);
                setReady(false);
                if (ref.current) {
                  ref.current.load();
                }
              }}
              style={{
                marginTop: 15,
                padding: "8px 16px",
                background: "#ffffff22",
                border: "1px solid #ffffff33",
                borderRadius: 6,
                color: "#fff",
                cursor: "pointer",
                fontSize: 12,
              }}
            >
              Retry
            </button>
          </div>
        )}
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
