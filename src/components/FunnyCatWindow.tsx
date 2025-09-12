"use client";
import { useState, useEffect } from "react";

export function FunnyCatWindow() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentCat, setCurrentCat] = useState(0);
  const [likes, setLikes] = useState(0);
  const [muted, setMuted] = useState(true);

  const cats = [
    { name: "Raven", emoji: "🐈‍⬛", action: "Elegant prowls", description: "Black cat" },
    { name: "Juniper", emoji: "🐈", action: "Window naps", description: "Gray/white cat" },
    { name: "Huck", emoji: "🐾", action: "Cozy zoomies", description: "Brown cat" },
    { name: "Billy", emoji: "😺", action: "Snack patrol", description: "Gray cat" },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentCat((prev) => (prev + 1) % cats.length);
      }, 3000); // Change cat every 3 seconds

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
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
              {/* YouTube embed of curated cats clip (no controls, autoplay muted) */}
              <iframe
                title="Curated Cats"
                src={
                  "https://www.youtube-nocookie.com/embed/uwmeH6Rnj2E?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1&loop=1&playlist=uwmeH6Rnj2E"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          )}
        </div>

        {/* Cat Info Panel */}
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
