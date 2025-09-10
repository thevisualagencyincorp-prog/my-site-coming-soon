"use client";
import { useState } from "react";

export function NewsletterWindow() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const topics = [
    {
      id: "design",
      label: "🎨 Design Trends",
      description: "Latest design trends and inspiration",
    },
    {
      id: "tech",
      label: "💻 Tech Updates",
      description: "Web development and tech news",
    },
    {
      id: "marketing",
      label: "📈 Marketing Tips",
      description: "Digital marketing strategies",
    },
    {
      id: "creative",
      label: "🎭 Creative Process",
      description: "Behind-the-scenes creative insights",
    },
    {
      id: "business",
      label: "💼 Business Growth",
      description: "Agency management and growth tips",
    },
  ];

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && selectedTopics.length > 0) {
      setSubscribed(true);
      // In a real app, this would send the subscription to your backend
    }
  };

  const currentTips = [
    {
      title: "🎨 Color Psychology in Web Design",
      content:
        "Understanding how colors affect user behavior and conversion rates.",
      date: "This Month",
    },
    {
      title: "⚡ Optimizing Page Load Speed",
      content:
        "5 quick wins to improve your website's performance and user experience.",
      date: "Last Week",
    },
    {
      title: "📱 Mobile-First Design Evolution",
      content:
        "How mobile design principles are shaping modern web experiences.",
      date: "2 Weeks Ago",
    },
  ];

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
        📧 Monthly Tips & Trends - The Agency OS™
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
        {!subscribed ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "15px",
                  animation: "newsletterPulse 2s infinite",
                }}
              >
                📧
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1e2a4a",
                }}
              >
                Stay Ahead of the Curve
              </h2>
              <p style={{ color: "#6c7c9b", lineHeight: "1.5" }}>
                Get monthly insights on design trends, tech updates, and
                creative strategies delivered straight to your inbox.
              </p>
            </div>

            {/* Subscription Form */}
            <form
              onSubmit={handleSubscribe}
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              {/* Email Input */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "8px",
                    color: "#1e2a4a",
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "2px solid #cbd5ea",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Topic Selection */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "12px",
                    color: "#1e2a4a",
                  }}
                >
                  What interests you? (Select all that apply)
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {topics.map((topic) => (
                    <label
                      key={topic.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "10px",
                        background: selectedTopics.includes(topic.id)
                          ? "#e6ebf7"
                          : "#fff",
                        border: `2px solid ${
                          selectedTopics.includes(topic.id)
                            ? "#ff6b35"
                            : "#cbd5ea"
                        }`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTopics.includes(topic.id)}
                        onChange={() => handleTopicToggle(topic.id)}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #cbd5ea",
                          borderRadius: "4px",
                          background: selectedTopics.includes(topic.id)
                            ? "#ff6b35"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {selectedTopics.includes(topic.id) && (
                          <span style={{ color: "#fff", fontSize: "12px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", fontSize: "13px" }}>
                          {topic.label}
                        </div>
                        <div style={{ fontSize: "11px", color: "#6c7c9b" }}>
                          {topic.description}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                disabled={!email || selectedTopics.length === 0}
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    !email || selectedTopics.length === 0
                      ? "#cbd5ea"
                      : "#ff6b35",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor:
                    !email || selectedTopics.length === 0
                      ? "not-allowed"
                      : "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                Subscribe to Newsletter
              </button>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            {/* Success Message */}
            <div
              style={{
                fontSize: "60px",
                marginBottom: "20px",
                animation: "successBounce 1s ease-in-out",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#1e2a4a",
              }}
            >
              Welcome to The Agency OS™ Newsletter!
            </h2>
            <p
              style={{
                color: "#6c7c9b",
                lineHeight: "1.5",
                marginBottom: "30px",
                maxWidth: "400px",
                margin: "0 auto 30px",
              }}
            >
              Thanks for subscribing! You&apos;ll receive our monthly newsletter
              with the latest tips, trends, and insights from the creative
              industry.
            </p>

            {/* Selected Topics Summary */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #cbd5ea",
                marginBottom: "20px",
                maxWidth: "400px",
                margin: "0 auto 20px",
              }}
            >
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: "#1e2a4a",
                }}
              >
                Your Interests:
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {selectedTopics.map((topicId) => {
                  const topic = topics.find((t) => t.id === topicId);
                  return (
                    <span
                      key={topicId}
                      style={{
                        padding: "6px 12px",
                        background: "#e6ebf7",
                        borderRadius: "20px",
                        fontSize: "12px",
                        color: "#4a5568",
                      }}
                    >
                      {topic?.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Current Tips Preview */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #cbd5ea",
          }}
        >
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#1e2a4a",
            }}
          >
            💡 Latest Tips & Trends
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {currentTips.map((tip, index) => (
              <div
                key={index}
                style={{
                  padding: "15px",
                  background: "#f8f9fa",
                  borderRadius: "8px",
                  border: "1px solid #e6ebf7",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1e2a4a",
                    }}
                  >
                    {tip.title}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#6c7c9b",
                      background: "#e6ebf7",
                      padding: "2px 8px",
                      borderRadius: "10px",
                    }}
                  >
                    {tip.date}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6c7c9b",
                    lineHeight: "1.4",
                  }}
                >
                  {tip.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes newsletterPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes successBounce {
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
