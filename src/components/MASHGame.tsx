"use client";
import { useState, useEffect } from "react";

export function MASHGame() {
  const [gameState, setGameState] = useState<"setup" | "playing" | "result">(
    "setup"
  );
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);
  const [currentResult, setCurrentResult] = useState<string>("");

  const [userInputs, setUserInputs] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    style: "",
  });

  const mashOptions = {
    projectType: [
      "Brand Identity Package",
      "Website Redesign",
      "Social Media Campaign",
      "Photography Session",
      "Video Production",
      "Print Design Suite",
      "Digital Marketing Strategy",
      "E-commerce Store",
    ],
    budget: [
      "$5,000 - $10,000",
      "$10,000 - $25,000",
      "$25,000 - $50,000",
      "$50,000 - $100,000",
      "$100,000+",
      "Custom Quote",
      "Phase 1 Budget Only",
      "Full Campaign Budget",
    ],
    timeline: [
      "2-4 Weeks",
      "1-2 Months",
      "2-3 Months",
      "3-6 Months",
      "6+ Months",
      "Rush Project (2 Weeks)",
      "Flexible Timeline",
      "Phase-Based Delivery",
    ],
    style: [
      "Minimalist & Clean",
      "Bold & Vibrant",
      "Retro & Nostalgic",
      "Modern & Sleek",
      "Playful & Fun",
      "Luxury & Elegant",
      "Streetwear Inspired",
      "Corporate Professional",
    ],
  };

  const spinWheel = async () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setGameState("playing");

    // Simulate spinning animation
    const totalSpins = 20 + Math.random() * 30;
    let currentSpin = 0;

    const spinInterval = setInterval(() => {
      currentSpin++;
      setSpinCount(currentSpin);

      // Random result for each category
      const randomType =
        mashOptions.projectType[
          Math.floor(Math.random() * mashOptions.projectType.length)
        ];
      const randomBudget =
        mashOptions.budget[
          Math.floor(Math.random() * mashOptions.budget.length)
        ];
      const randomTimeline =
        mashOptions.timeline[
          Math.floor(Math.random() * mashOptions.timeline.length)
        ];
      const randomStyle =
        mashOptions.style[Math.floor(Math.random() * mashOptions.style.length)];

      setCurrentResult(
        `${randomType}\n${randomBudget}\n${randomTimeline}\n${randomStyle}`
      );

      if (currentSpin >= totalSpins) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setGameState("result");
      }
    }, 100);
  };

  const resetGame = () => {
    setGameState("setup");
    setSpinCount(0);
    setCurrentResult("");
    setUserInputs({
      projectType: "",
      budget: "",
      timeline: "",
      style: "",
    });
  };

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
      {/* Window Title Bar */}
      <div
        style={{
          padding: "6px 10px",
          background: "linear-gradient(#5f88d8, #3c67c2)",
          color: "#fff",
          fontWeight: "700",
          borderBottom: "1px solid #254e9a",
          textShadow: "0 1px 0 rgba(0,0,0,.25)",
        }}
      >
        MASH Game - Agency Destiny Generator
      </div>

      {/* Game Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
        {gameState === "setup" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
                animation: "bounce 2s infinite",
              }}
            >
              🎯
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Welcome to MASH!
            </h2>
            <p
              style={{
                margin: "0 0 20px 0",
                lineHeight: "1.6",
                color: "#6c7c9b",
              }}
            >
              The Agency Destiny Generator will randomly select your perfect
              creative project combination. Think of your dream project and
              click &quot;SPIN&quot; to see what the universe has in store!
            </p>

            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #cbd5ea",
                margin: "20px 0",
              }}
            >
              <h3 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
                How to Play:
              </h3>
              <ol
                style={{
                  textAlign: "left",
                  margin: "0",
                  paddingLeft: "20px",
                  lineHeight: "1.8",
                  color: "#4a5568",
                }}
              >
                <li>Think about your ideal creative project</li>
                <li>Click the big SPIN button</li>
                <li>Watch as destiny decides your project fate!</li>
                <li>Get inspired by your randomly generated combination</li>
              </ol>
            </div>

            <button
              onClick={spinWheel}
              disabled={isSpinning}
              style={{
                padding: "15px 30px",
                fontSize: "18px",
                fontWeight: "bold",
                background: "#ffcc00",
                border: "2px solid #caa002",
                borderRadius: "25px",
                cursor: isSpinning ? "not-allowed" : "pointer",
                color: "#1e2a4a",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                transform: "scale(1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSpinning) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              🎲 SPIN THE WHEEL OF DESTINY 🎲
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
                animation: "spin 0.5s linear infinite",
              }}
            >
              🎡
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Spinning the Wheel of Destiny...
            </h2>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ff6b35",
                marginBottom: "20px",
              }}
            >
              {spinCount}
            </div>
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                border: "2px solid #cbd5ea",
                fontFamily: "monospace",
                fontSize: "16px",
                whiteSpace: "pre-line",
                minHeight: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentResult || "Determining your creative destiny..."}
            </div>
          </div>
        )}

        {gameState === "result" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "20px",
              }}
            >
              ✨
            </div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              Your Creative Destiny Awaits!
            </h2>

            <div
              style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "12px",
                border: "2px solid #ffcc00",
                margin: "20px 0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#1e2a4a",
                  whiteSpace: "pre-line",
                  lineHeight: "1.8",
                }}
              >
                {currentResult}
              </div>
            </div>

            <div
              style={{
                background: "#e6ebf7",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #b8c6e3",
                margin: "20px 0",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#1e2a4a",
                }}
              >
                🎉 Congratulations!
              </p>
              <p
                style={{
                  margin: "0",
                  color: "#6c7c9b",
                  lineHeight: "1.6",
                }}
              >
                This could be the start of something amazing! Ready to turn this
                destiny into reality? Let&apos;s discuss how we can bring your
                creative vision to life.
              </p>
            </div>

            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openAOLWindow"))
                }
                style={{
                  padding: "12px 20px",
                  background: "#ffcc00",
                  border: "1px solid #caa002",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                💬 Let&apos;s Talk About This
              </button>
              <button
                onClick={resetGame}
                style={{
                  padding: "12px 20px",
                  background: "#fff",
                  border: "1px solid #cbd5ea",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                🔄 Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}
