"use client";
import { useState } from "react";

export function VibeCheckWindow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: "What's your creative energy level today?",
      options: [
        "🔋 FULLY CHARGED",
        "⚡ MOTIVATED",
        "😌 CHILL",
        "😴 NEED COFFEE",
      ],
    },
    {
      question: "How's your workflow vibe?",
      options: [
        "🚀 IN THE ZONE",
        "🎯 FOCUSED",
        "🎨 CREATIVE FLOW",
        "🤔 BRAINSTORMING",
      ],
    },
    {
      question: "What's your current mood?",
      options: ["😊 POSITIVE", "🤩 EXCITED", "😐 NEUTRAL", "😤 FRUSTRATED"],
    },
    {
      question: "How's your productivity?",
      options: ["📈 HIGH", "📊 STEADY", "📉 SLOW", "🔄 VARIABLE"],
    },
    {
      question: "What's your collaboration style?",
      options: [
        "👥 TEAM PLAYER",
        "🎭 SOLO ARTIST",
        "🤝 COLLABORATIVE",
        "🎯 INDEPENDENT",
      ],
    },
  ];

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getVibeResult = () => {
    const creativeCount = answers.filter((a) =>
      [
        "🔋 FULLY CHARGED",
        "🎨 CREATIVE FLOW",
        "😊 POSITIVE",
        "🤩 EXCITED",
        "🚀 IN THE ZONE",
      ].includes(a)
    ).length;
    const chillCount = answers.filter((a) =>
      ["😌 CHILL", "😐 NEUTRAL", "🎯 FOCUSED", "📊 STEADY"].includes(a)
    ).length;
    const intenseCount = answers.filter((a) =>
      ["⚡ MOTIVATED", "😤 FRUSTRATED", "📈 HIGH", "🔄 VARIABLE"].includes(a)
    ).length;

    if (creativeCount >= 3)
      return {
        vibe: "Creative Genius",
        emoji: "🎨",
        color: "#ff6b35",
        description:
          "Your creative energy is off the charts! Perfect time for brainstorming and innovation.",
      };
    if (chillCount >= 3)
      return {
        vibe: "Zen Master",
        emoji: "😌",
        color: "#4ecdc4",
        description:
          "You're in a balanced, focused state. Great for steady work and problem-solving.",
      };
    if (intenseCount >= 3)
      return {
        vibe: "Power Mode",
        emoji: "⚡",
        color: "#ffd93d",
        description:
          "High energy and motivation! Channel this into productive tasks.",
      };
    return {
      vibe: "Balanced Creator",
      emoji: "⚖️",
      color: "#6bcf7f",
      description:
        "You're in a good mix of creativity and focus. Keep that momentum going!",
    };
  };

  const resetVibeCheck = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
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
      {/* Title moved to window chrome */}

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!showResults ? (
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "#e6ebf7",
                borderRadius: "4px",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "#ff6b35",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>

            {/* Question */}
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "30px",
                color: "#1e2a4a",
                lineHeight: "1.4",
              }}
            >
              {questions[currentQuestion].question}
            </div>

            {/* Options */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    padding: "15px 20px",
                    background: "#fff",
                    border: "2px solid #cbd5ea",
                    borderRadius: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1e2a4a",
                    transition: "all 0.2s ease",
                    textAlign: "center",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#f8f9fa";
                    e.currentTarget.style.borderColor = "#ff6b35";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "#cbd5ea";
                  }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Progress Text */}
            <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            {/* Results */}
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
                animation: "bounce 1s ease-in-out",
              }}
            >
              {getVibeResult().emoji}
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: getVibeResult().color,
              }}
            >
              {getVibeResult().vibe}
            </div>

            <div
              style={{
                fontSize: "16px",
                marginBottom: "30px",
                color: "#6c7c9b",
                lineHeight: "1.5",
              }}
            >
              {getVibeResult().description}
            </div>

            {/* Vibe Stats */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #cbd5ea",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1e2a4a",
                }}
              >
                Your Vibe Breakdown:
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                    🎨
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    Creative
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#ff6b35",
                    }}
                  >
                    {
                      answers.filter((a) =>
                        [
                          "🔋 FULLY CHARGED",
                          "🎨 CREATIVE FLOW",
                          "😊 POSITIVE",
                          "🤩 EXCITED",
                          "🚀 IN THE ZONE",
                        ].includes(a)
                      ).length
                    }
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                    ⚖️
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    Balanced
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#4ecdc4",
                    }}
                  >
                    {
                      answers.filter((a) =>
                        [
                          "😌 CHILL",
                          "😐 NEUTRAL",
                          "🎯 FOCUSED",
                          "📊 STEADY",
                        ].includes(a)
                      ).length
                    }
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "20px", marginBottom: "5px" }}>
                    ⚡
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    Energetic
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#ffd93d",
                    }}
                  >
                    {
                      answers.filter((a) =>
                        [
                          "⚡ MOTIVATED",
                          "😤 FRUSTRATED",
                          "📈 HIGH",
                          "🔄 VARIABLE",
                        ].includes(a)
                      ).length
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={resetVibeCheck}
                style={{
                  padding: "10px 20px",
                  background: "#ff6b35",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Take Again
              </button>
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openNewsletterWindow"))
                }
                style={{
                  padding: "10px 20px",
                  background: "#6bcf7f",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Get Tips Newsletter
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -30px, 0);
          }
          70% {
            transform: translate3d(0, -15px, 0);
          }
          90% {
            transform: translate3d(0, -4px, 0);
          }
        }
      `}</style>
    </div>
  );
}
