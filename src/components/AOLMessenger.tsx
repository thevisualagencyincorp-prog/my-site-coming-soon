"use client";
import { useState, useEffect, useRef } from "react";

export function AOLMessenger() {
  const [activeTab, setActiveTab] = useState("taylor");
  const [messages, setMessages] = useState<
    Record<
      string,
      Array<{ who: string; text: string; me: boolean; timestamp: number }>
    >
  >({
    taylor: [],
    sabrina: [],
    tyler: [],
    olivia: [],
    xo: [],
    brief: [],
  });
  const [typingStates, setTypingStates] = useState<Record<string, boolean>>({
    taylor: false,
    sabrina: false,
    tyler: false,
    olivia: false,
    xo: false,
    brief: false,
  });
  const [nowPlayingIndex, setNowPlayingIndex] = useState(0);
  const [briefFields, setBriefFields] = useState({
    brand: "your business",
    project: "a project",
    vibe: "[describe vibe]",
    goals: "[goal]",
    timeline: "[timeline]",
    budget: "[budget]",
    name: "[name]",
    email: "[email]",
  });

  const tracks = [
    "Taylor Swift — Fortnight",
    "Sabrina Carpenter — Please Please Please",
    "Tyler, the Creator — WUSYANAME",
    "Olivia Rodrigo — bad idea right?",
    "The Weeknd — Blinding Lights",
  ];

  const inputRefs = useRef<Record<string, HTMLInputElement>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setNowPlayingIndex((prev) => (prev + 1) % tracks.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [tracks.length]);

  const formatTime = (ts: number = Date.now()) => {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).format(new Date(ts));
  };

  const addMessage = (
    chatKey: string,
    who: string,
    text: string,
    me: boolean = false
  ) => {
    setMessages((prev) => ({
      ...prev,
      [chatKey]: [...prev[chatKey], { who, text, me, timestamp: Date.now() }],
    }));
  };

  const simulateReply = (chatKey: string, who: string) => {
    setTypingStates((prev) => ({ ...prev, [chatKey]: true }));

    setTimeout(() => {
      setTypingStates((prev) => ({ ...prev, [chatKey]: false }));
      addMessage(chatKey, who, "Thanks bestie! Got it 💫");

      setTimeout(() => {
        addMessage(chatKey, who, "Going away for now 👋");
        setTypingStates((prev) => ({ ...prev, [chatKey]: false }));
        // Mark buddy as away
        if (chatKey !== "brief") {
          // This would normally update the buddy status
        }
      }, 4000);
    }, 2000 + Math.random() * 1000);
  };

  const handleSendMessage = (chatKey: string) => {
    const input = inputRefs.current[chatKey];
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    addMessage(chatKey, "You", message, true);
    input.value = "";

    if (chatKey !== "brief") {
      simulateReply(
        chatKey,
        chatKey.charAt(0).toUpperCase() + chatKey.slice(1)
      );
    }
  };

  const handleBriefSend = () => {
    addMessage(
      "brief",
      "System",
      "Yay, friend! You're officially on our books. We'll send more info within 1 business day. This message will self-destruct in 5…4…3…2…1."
    );

    setTimeout(() => {
      setMessages((prev) => ({
        ...prev,
        brief: prev.brief.slice(0, -1), // Remove the last message
      }));
    }, 5000);
  };

  const updateBriefPreview = () => {
    // This would normally update a preview element
  };

  const getBuddyStatus = (tab: string) => {
    if (tab === "taylor" || tab === "sabrina" || tab === "tyler")
      return "online";
    return "away";
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#d4d9e7",
        font: "14px Tahoma,Verdana,Segoe UI,Arial,sans-serif",
        overflow: "hidden",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Window Bar */}
      <div
        style={{
          padding: "6px 10px",
          background: "linear-gradient(#5f88d8,#3c67c2)",
          color: "#fff",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #254e9a",
          textShadow: "0 1px 0 rgba(0,0,0,.25)",
        }}
      >
        AOL Instant Messenger — The Agency OS™
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          padding: "8px 10px",
          borderBottom: "1px solid #b8c6e3",
          background: "#e6ebf7",
        }}
      >
        {["taylor", "sabrina", "tyler", "olivia", "xo", "brief"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #8aa1c5",
              background: activeTab === tab ? "#ffcc00" : "#fff",
              color: "#1e2a4a",
              borderColor: activeTab === tab ? "#caa002" : "#8aa1c5",
            }}
          >
            {tab === "taylor"
              ? "Taylor Nation"
              : tab === "sabrina"
              ? "Sabrina Team"
              : tab === "tyler"
              ? "Tyler"
              : tab === "olivia"
              ? "Olivia Team"
              : tab === "xo"
              ? "XO Team"
              : "Brief Us"}
          </button>
        ))}
      </div>

      {/* Main Panels */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Buddy List */}
        <aside
          style={{
            width: "180px",
            background: "#f3f6ff",
            borderRight: "1px solid #cbd5ea",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
          }}
        >
          {["taylor", "sabrina", "tyler", "olivia", "xo", "brief"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  width: "100%",
                  background: activeTab === tab ? "#fff" : "transparent",
                  border: activeTab === tab ? "1px solid #8aa1c5" : "0",
                  padding: "6px 8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background:
                      getBuddyStatus(tab) === "online" ? "#36c275" : "#ffd166",
                  }}
                ></span>
                {tab === "taylor"
                  ? "Taylor"
                  : tab === "sabrina"
                  ? "Sabrina"
                  : tab === "tyler"
                  ? "Tyler"
                  : tab === "olivia"
                  ? "Olivia"
                  : tab === "xo"
                  ? "XO"
                  : "Brief Us"}
              </button>
            )
          )}
        </aside>

        {/* Chat Stack */}
        <div style={{ position: "relative", flex: 1 }}>
          {["taylor", "sabrina", "tyler", "olivia", "xo", "brief"].map(
            (tab) => (
              <div
                key={tab}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: activeTab === tab ? "flex" : "none",
                  flexDirection: "column",
                }}
              >
                {tab === "brief" ? (
                  <>
                    {/* Brief Us Panel */}
                    <div
                      style={{
                        flex: 1,
                        padding: "12px",
                        background: "#fffef6",
                        borderTop: "1px dashed #cbd5ea",
                        lineHeight: "1.8",
                      }}
                    >
                      We&apos;re{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            brand: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.brand}
                      </span>
                      , and we&apos;d love help with{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            project: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.project}
                      </span>
                      . We want it to feel{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            vibe: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.vibe}
                      </span>
                      , so that we can{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            goals: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.goals}
                      </span>
                      . We&apos;re aiming to share this around{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            timeline: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.timeline}
                      </span>
                      , with a budget of{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            budget: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.budget}
                      </span>
                      . Contact:{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            name: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.name}
                      </span>{" "}
                      —
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "60px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            email: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.email}
                      </span>
                      .
                    </div>
                    <div
                      style={{
                        padding: "10px",
                        background: "#f7f9ff",
                        borderTop: "1px solid #cbd5ea",
                      }}
                    >
                      <div>
                        <strong>Quick Read:</strong> {briefFields.brand} needs{" "}
                        {briefFields.project} that feels {briefFields.vibe} to{" "}
                        {briefFields.goals}. Launching {briefFields.timeline},
                        budget {briefFields.budget}. Contact: {briefFields.name}{" "}
                        ({briefFields.email}).
                      </div>
                      <button
                        onClick={handleBriefSend}
                        style={{
                          marginTop: "8px",
                          padding: "6px 12px",
                          background: "#ffcc00",
                          border: "1px solid #caa002",
                          borderRadius: "3px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Send Brief
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Chat Panel */}
                    <div
                      style={{
                        flex: 1,
                        padding: "10px",
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        background: "#fff",
                        borderTop: "1px solid #b8c6e3",
                        borderBottom: "1px solid #b8c6e3",
                      }}
                    >
                      {messages[tab].map((msg, index) => (
                        <div
                          key={index}
                          style={{
                            maxWidth: "80%",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            background: msg.me ? "#d6ecff" : "#eef3ff",
                            alignSelf: msg.me ? "flex-end" : "flex-start",
                          }}
                        >
                          <span style={{ fontWeight: "700" }}>{msg.who}</span>:{" "}
                          {msg.text}
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#6c7c9b",
                              marginLeft: "6px",
                            }}
                          >
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Composer */}
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        padding: "8px",
                        background: "#e6ebf7",
                        borderTop: "1px solid #b8c6e3",
                      }}
                    >
                      <input
                        ref={(el) => {
                          if (el) inputRefs.current[tab] = el;
                        }}
                        placeholder={`Message ${
                          tab.charAt(0).toUpperCase() + tab.slice(1)
                        }...`}
                        disabled={getBuddyStatus(tab) === "away"}
                        style={{
                          flex: 1,
                          padding: "6px",
                          border: "1px solid #8aa1c5",
                          borderRadius: "3px",
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage(tab);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleSendMessage(tab)}
                        disabled={getBuddyStatus(tab) === "away"}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "3px",
                          background: "#ffcc00",
                          border: "1px solid #caa002",
                          fontWeight: "700",
                          cursor:
                            getBuddyStatus(tab) === "away"
                              ? "not-allowed"
                              : "pointer",
                          opacity: getBuddyStatus(tab) === "away" ? 0.5 : 1,
                        }}
                      >
                        Send
                      </button>
                      {typingStates[tab] && (
                        <span
                          style={{
                            fontSize: "12px",
                            color: "#6c7c9b",
                            marginLeft: "10px",
                            alignSelf: "center",
                          }}
                        >
                          {tab.charAt(0).toUpperCase() + tab.slice(1)} is
                          typing…
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {/* Now Playing */}
      <div
        style={{
          padding: "6px 10px",
          fontSize: "12px",
          background: "#f3f6ff",
          borderTop: "1px solid #cbd5ea",
          color: "#444",
        }}
      >
        Now Playing: {tracks[nowPlayingIndex]}
      </div>
    </div>
  );
}
