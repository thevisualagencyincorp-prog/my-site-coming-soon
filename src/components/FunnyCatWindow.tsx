"use client";
import { useState, useEffect } from "react";

export function FunnyCatWindow() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCat, setCurrentCat] = useState(0);
  const [likes, setLikes] = useState(0);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // Force muted and quick remount on first mount to improve autoplay reliability
  useEffect(() => {
    // Ensure we start muted (autoplay policies require muted autoplay)
    setMuted(true);
    // briefly reset videoReady to force iframe remount
    setVideoReady(false);
    const t = setTimeout(() => setVideoReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Playlist / video controls
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(
    "J---aiyznGQ"
  );
  const [playlistMode, setPlaylistMode] = useState<"curated" | "dance">(
    "curated"
  );
  const [playlistIndex, setPlaylistIndex] = useState(0);

  const curatedVideos = [
    { id: "J---aiyznGQ", title: "Keyboard Cat (Curated)" },
  ];

  const danceOffVideos = [
    { id: "J---aiyznGQ", title: "Keyboard Cat (Dance Off playlist)" },
  ];

  const cats = [
    {
      name: "Raven",
      emoji: "🐈‍⬛",
      action: "Elegant prowls",
      description: "Black cat",
    },
    {
      name: "Juniper",
      emoji: "🐈",
      action: "Window naps",
      description: "Gray/white cat",
    },
    {
      name: "Flower",
      emoji: "🐾",
      action: "Cozy buscit maker",
      description: "Moo Cat",
    },
    {
      name: "Billy",
      emoji: "😺",
      action: "Snack patrol",
      description: "Gray cat",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentCat((prev) => (prev + 1) % cats.length);
      }, 5000); // Change cat every 5 seconds

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const catFacts = [
    "Cats sleep for 16 hours a day",
    "Cats have 230 bones in their body",
    "Cats can jump up to 6 times their length",
    "A group of cats is called a clowder",
    "Cats have 18 toes (5 on each front paw, 4 on each back paw)",
    "Cats can't taste sweetness",
    "Cats have a third eyelid called the haw",
    "Cats can rotate their ears 180 degrees",
    "Cats have a special reflective layer behind their eyes called the tapetum lucidum, which helps them see in low light",
    "Cats have over 20 vocalizations, while dogs only have about 10",
    "The first cat in space was a French cat named Felicette in 1963",
    "Cats have a Jacobson’s organ that allows them to taste smells",
    "A cat's sense of smell is 14 times stronger than a human's",
  ];

  const randomFact = catFacts[Math.floor(Math.random() * catFacts.length)];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#f3f6ff",
        fontFamily: "Tahoma, Verdana, Segoe UI, Arial, sans-serif",
        fontSize: "14px",
        color: "#1e2a4a",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Title moved to window chrome */}

      {/* Video Player Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "15px",
        }}
      >
        {/* Video Display */}
        <div
          style={{
            flex: 1,
            background: "#000",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Playlist controls */}
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 12,
              zIndex: 20,
              display: "flex",
              gap: 8,
            }}
          >
            <button
              onClick={() => {
                setPlaylistMode("curated");
                setPlaylistIndex(0);
                setCurrentVideoId(curatedVideos[0].id);
              }}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background:
                  playlistMode === "curated" ? "#ffefc2" : "#ffffffaa",
              }}
            >
              Curated Cats
            </button>
            <button
              onClick={() => {
                setPlaylistMode("dance");
                setPlaylistIndex(0);
                setCurrentVideoId(danceOffVideos[0].id);
              }}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: playlistMode === "dance" ? "#ffefc2" : "#ffffffaa",
              }}
            >
              Dance Off
            </button>
            <button
              onClick={() => {
                const list =
                  playlistMode === "curated" ? curatedVideos : danceOffVideos;
                const next = Math.max(0, playlistIndex - 1);
                setPlaylistIndex(next);
                setCurrentVideoId(list[next].id);
              }}
              style={{ padding: "6px 8px", borderRadius: 6 }}
            >
              ◀
            </button>
            <button
              onClick={() => {
                const list =
                  playlistMode === "curated" ? curatedVideos : danceOffVideos;
                const next = Math.min(list.length - 1, playlistIndex + 1);
                setPlaylistIndex(next);
                setCurrentVideoId(list[next].id);
              }}
              style={{ padding: "6px 8px", borderRadius: 6 }}
            >
              ▶
            </button>
          </div>

          {/* (mute button removed from video overlay) */}

          {!isPlaying ? (
            <div style={{ textAlign: "center", color: "#fff" }}>
              <div
                style={{
                  fontSize: "80px",
                  marginBottom: "20px",
                  animation: "wiggle 2s infinite",
                }}
              >
                🐱
              </div>
              <div
                style={{
                  fontSize: "24px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                The Agency Kitties
              </div>
              <div style={{ fontSize: "16px", opacity: "0.8" }}>
                Endless loop of feline foolishness!
              </div>
              <button
                onClick={() => setIsPlaying(true)}
                style={{
                  marginTop: "20px",
                  padding: "12px 24px",
                  background: "#ff6b35",
                  border: "2px solid #e55a2b",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                ▶️ START CAT PARTY
              </button>
            </div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                background: "#000",
              }}
            >
              {/* Fade-in wrapper for local/hosted MP4 */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: videoReady ? 1 : 0,
                  transition: "opacity 600ms ease",
                }}
              >
                {/* Embedded YouTube video; mute controlled by state, controls hidden */}
                <iframe
                  key={`${currentVideoId}-${muted}`}
                  title="Agency Kitties"
                  src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=${
                    muted ? 1 : 0
                  }&playsinline=1&loop=1&playlist=${currentVideoId}&controls=0&rel=0&modestbranding=1`}
                  style={{ width: "100%", height: "100%", border: 0 }}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setVideoReady(true)}
                />
              </div>

              {/* Subtle placeholder while loading */}
              {!videoReady && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: 14,
                    opacity: 0.7,
                  }}
                >
                  Loading… 🐱
                </div>
              )}
              {/* External fallback link if local video missing */}
              {!videoReady && (
                <div style={{ position: "absolute", right: 10, bottom: 10 }}>
                  <a
                    href="https://youtu.be/J---aiyznGQ"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      padding: "6px 10px",
                      background: "#ffffff22",
                      border: "1px solid #ffffff33",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: 12,
                      textDecoration: "none",
                    }}
                  >
                    Open on YouTube ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Curated preview (always visible above the cat list) */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <div style={{ fontWeight: 700, color: "#1e2a4a" }}>
              🐱 Curated Cats
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: 12, color: "#6c7c9b" }}>Preview</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMuted((m) => !m);
                  // force iframe to reload briefly for mute change
                  setVideoReady(false);
                  setTimeout(() => setVideoReady(true), 50);
                }}
                style={{
                  padding: "6px 10px",
                  borderRadius: 6,
                  background: muted ? "#ffffffaa" : "#ffefc2",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
            </div>
          </div>
          <div
            style={{
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #e6ebf7",
            }}
          >
            <iframe
              key={`preview-${curatedVideos[0].id}`}
              width={560}
              height={315}
              title="Curated Cats preview"
              src={`https://www.youtube-nocookie.com/embed/${curatedVideos[0].id}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`}
              frameBorder={0}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ width: "100%", height: 180, border: 0 }}
            />
          </div>
        </div>

        {/* Mute control has been relocated beside the preview above */}

        {/* Cats
         Info Panel */}
        <div
          style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "8px",
            border: "1px solid #cbd5ea",
            marginBottom: "15px",
          }}
        >
          <h3
            style={{
              margin: "0 0 15px 0",
              color: "#1e2a4a",
              fontSize: "16px",
            }}
          >
            🐾 The Agency Kitties
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "10px",
            }}
          >
            {cats.map((cat, index) => (
              <div
                key={index}
                onClick={() => setCurrentCat(index)}
                style={{
                  padding: "8px",
                  background: currentCat === index ? "#ffcc00" : "#f8f9fa",
                  borderRadius: "6px",
                  border: "1px solid #e6ebf7",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "3px" }}>
                  {cat.emoji}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#1e2a4a",
                  }}
                >
                  {cat.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fun Cat Facts */}
        <div
          style={{
            background: "#e6ebf7",
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #b8c6e3",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontSize: "13px",
              color: "#6c7c9b",
            }}
          >
            <span>🐱</span>
            <span>
              <strong>Cat Fact:</strong> {randomFact}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        @keyframes catDance {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
          }
          75% {
            transform: scale(1.1) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
}
