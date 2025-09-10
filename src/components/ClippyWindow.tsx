"use client";
import { useState, useEffect } from "react";

export function ClippyWindow() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const messages = [
    {
      text: "Hi! I'm Clippy, your digital assistant! 👋",
      type: "greeting",
    },
    {
      text: "I see you're exploring The Agency OS™! Would you like some help?",
      type: "help",
    },
    {
      text: "Try clicking on different windows to see what they do!",
      type: "tip",
    },
    {
      text: "Did you know? The Agency specializes in creative design and digital solutions!",
      type: "fact",
    },
    {
      text: "Need to get in touch? Use the AOL Messenger to send us a message!",
      type: "contact",
    },
    {
      text: "Fun fact: This desktop is built with Next.js and React! 🚀",
      type: "tech",
    },
    {
      text: "Want to see something cool? Try the MASH Game for project inspiration!",
      type: "suggestion",
    },
    {
      text: "Remember: Great design solves problems and tells stories! 📖",
      type: "wisdom",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentMessage((prev) => (prev + 1) % messages.length);
          setIsTyping(false);
        }, 2000);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTyping]);

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
        width: "100%",
        height: "100%",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
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
            }}
            onMouseDown={handleMouseDown}
          >
            {/* Clippy SVG */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              style={{
                filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {/* Clippy Body */}
              <ellipse cx="60" cy="80" rx="35" ry="25" fill="#0078d4" />

              {/* Clippy Head */}
              <circle cx="60" cy="45" r="25" fill="#0078d4" />

              {/* Eyes */}
              <circle cx="52" cy="42" r="3" fill="#fff" />
              <circle cx="68" cy="42" r="3" fill="#fff" />
              <circle cx="52" cy="42" r="1.5" fill="#000" />
              <circle cx="68" cy="42" r="1.5" fill="#000" />

              {/* Mouth */}
              <path
                d="M55 50 Q60 55 65 50"
                stroke="#000"
                strokeWidth="2"
                fill="none"
              />

              {/* Paperclip */}
              <rect x="35" y="75" width="50" height="8" rx="4" fill="#c0c0c0" />
              <rect x="40" y="70" width="40" height="8" rx="4" fill="#c0c0c0" />
              <circle cx="45" cy="74" r="3" fill="#808080" />
              <circle cx="75" cy="74" r="3" fill="#808080" />

              {/* Feet */}
              <ellipse cx="45" cy="95" rx="8" ry="5" fill="#0078d4" />
              <ellipse cx="75" cy="95" rx="8" ry="5" fill="#0078d4" />
            </svg>
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

          {/* Control Panel */}
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
          </div>
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
