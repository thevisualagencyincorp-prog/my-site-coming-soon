"use client";
import { useMemo } from "react";

export function RetroAdWindow() {
  const ads = [
    {
      title: "BOOK NOW — LIMITED!",
      message:
        "Book now & receive a free 15‑min phone or video consult on us!"
        + " Let’s map next steps for your brand in a friendly, no‑pressure chat.",
      cta: "Book 15‑min Consult",
      color: "#c2185b",
      bg: "#fff0f6",
      icon: "📞",
    },
    {
      title: "YOU LOOK READY ✨",
      message:
        "When taste meets strategy, brands click. Want an iconic look that quietly converts?",
      cta: "Work with The Agency",
      color: "#2b5fb8",
      bg: "#f0f6ff",
      icon: "⭐",
    },
    {
      title: "CREATIVE S.O.S.",
      message:
        "Need a friendly brain to shape your launch visuals? We’ve got you. Zero cringe. All care.",
      cta: "Open Chat",
      color: "#ff6b35",
      bg: "#fff4ef",
      icon: "🛟",
    },
    {
      title: "TASTE UPGRADE INSTALLED",
      message:
        "Site feeling 2012? We’ll refresh it with warmth, clarity, and quiet confidence.",
      cta: "Let’s Talk",
      color: "#28a745",
      bg: "#eefcf2",
      icon: "💾",
    },
  ];

  const pick = useMemo(() => ads[Math.floor(Math.random() * ads.length)], []);

  return (
    <div
      style={{
        background: pick.bg,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          padding: "8px 10px",
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 18 }}>{pick.icon}</span>
        <strong style={{ fontSize: 13, letterSpacing: 0.2 }}>{pick.title}</strong>
      </div>
      <div style={{ padding: 12, fontSize: 13, lineHeight: 1.5 }}>
        {pick.message}
      </div>
      <div style={{ padding: 12, marginTop: "auto", display: "flex", gap: 8 }}>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("openBookWindow"))}
          style={{
            padding: "8px 12px",
            background: pick.color,
            color: "#fff",
            border: "1px solid rgba(0,0,0,0.1)",
            borderRadius: 6,
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {pick.cta}
        </button>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent("openFAQWindow"))}
          style={{
            padding: "8px 12px",
            background: "#fff",
            color: "#111",
            border: "1px solid rgba(0,0,0,0.15)",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
