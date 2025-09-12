"use client";
import { useState, useEffect, useRef } from "react";

export function AOLMessenger() {
  const [activeTab, setActiveTab] = useState("taylor");
  const initialMessages: Record<string, Array<{ who: string; text: string; me: boolean; timestamp: number }>> = {
    taylor: [
      {
        who: "Taylor Nation",
        text: "Happy Sept ’25! We’ve been raving about your OS site — it feels like we’re chatting with best friends ✨",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 120,
      },
      {
        who: "You",
        text: "We adore you back! What are you dreaming up?",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 118,
      },
      {
        who: "Taylor Nation",
        text: "We want a playful microsite + tour visuals refresh — something only your creative brain could do.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 115,
      },
      {
        who: "You",
        text: "We’ll bring the sparkle. Sending a mini brief + mood sparks in a sec.",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 112,
      },
      {
        who: "Taylor Nation",
        text: "Perfect — your enthusiasm and taste are exactly why we come to you.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 110,
      },
    ],
    sabrina: [
      {
        who: "Sabrina Team",
        text: "Besties! We need cheeky visuals for September 2025 promos — fun, flirty, elevated.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 90,
      },
      {
        who: "You",
        text: "Say less. Think glossy type + motion stickers + candy‑color palette?",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 88,
      },
      {
        who: "Sabrina Team",
        text: "Exactly. This is why we always ping you first — you get it.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 86,
      },
    ],
    tyler: [
      {
        who: "Tyler",
        text: "Yo fam — need a weird‑cool landing for a drop. You’re our people.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 75,
      },
      {
        who: "You",
        text: "Let’s make it playful but intentional. Send constraints + timing.",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 74,
      },
      {
        who: "Tyler",
        text: "Constraints: none 😂 Timing: soon. Love your energy.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 72,
      },
    ],
    olivia: [
      {
        who: "Olivia Team",
        text: "Hey besties — quick question: can you mock a zine‑style lyric page this week?",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 60,
      },
      {
        who: "You",
        text: "Yes yes yes. We’ll sketch ideas tonight and send in the AM.",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 59,
      },
    ],
    xo: [
      {
        who: "XO Team",
        text: "Team! You’re our go‑to for concept decks — can we book you for a September sprint?",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 48,
      },
      {
        who: "You",
        text: "Locked. We’ve got fresh ideas queued and coffee ready.",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 47,
      },
    ],
    brief: [],
  };
  const [messages, setMessages] = useState(initialMessages);
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
    competitor: "[competitor]",
    pinterest: "[pinterest board link]",
  });

  const tracks = [
    "Taylor Swift — Fortnight",
    "Sabrina Carpenter — Please Please Please",
    "Tyler, the Creator — WUSYANAME",
    "Olivia Rodrigo — bad idea right?",
    "The Weeknd — Blinding Lights",
  ];

  const inputRefs = useRef<Record<string, HTMLInputElement>>({});
  const endRefs = useRef<Record<string, HTMLDivElement>>({});

  useEffect(() => {
    // Load history
    try {
      const raw = localStorage.getItem("aol_messages");
      if (raw) setMessages(JSON.parse(raw));
    } catch {}
    const interval = setInterval(() => {
      setNowPlayingIndex((prev) => (prev + 1) % tracks.length);
    }, 20000);
    return () => clearInterval(interval);
  }, [tracks.length]);

  useEffect(() => {
    try {
      localStorage.setItem("aol_messages", JSON.stringify(messages));
    } catch {}
  }, [messages]);

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
    setTimeout(() => {
      endRefs.current[chatKey]?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const simulateReply = (chatKey: string, who: string) => {
    setTypingStates((prev) => ({ ...prev, [chatKey]: true }));

    const lines = [
      "Love this direction — feels very you. We’ll sketch a cute path forward.",
      "Heard. What’s the heartbeat here — timeline, must‑haves, any no‑gos?",
      "We can prototype this week and keep it playful but intentional.",
      "Saving inspo to the deck right now — want a mini mood later today?",
      "Noted, bestie. We’ll spin up options and make it feel iconic.",
    ];
    const first = lines[Math.floor(Math.random() * lines.length)];
    const second = "Cool if we hop on a 10‑min call later today?";

    setTimeout(() => {
      setTypingStates((prev) => ({ ...prev, [chatKey]: false }));
      addMessage(chatKey, who, first);

      setTimeout(() => {
        addMessage(chatKey, who, second);
        setTypingStates((prev) => ({ ...prev, [chatKey]: false }));
      }, 2500 + Math.random() * 1500);
    }, 1500 + Math.random() * 1200);
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
    const summary = `Brief received!\nBrand: ${briefFields.brand}\nProject: ${briefFields.project}\nVibe: ${briefFields.vibe}\nGoals: ${briefFields.goals}\nTimeline: ${briefFields.timeline}\nBudget: ${briefFields.budget}\nCompetitor: ${briefFields.competitor || "[competitor]"}\nPinterest: ${briefFields.pinterest || "[board link]"}`;
    addMessage("brief", "System", summary);
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
        // Fill the DesktopWindow content area without escaping it
        position: "relative",
        height: "100%",
        background: "#d4d9e7",
        font: "14px Tahoma,Verdana,Segoe UI,Arial,sans-serif",
        overflow: "hidden",
        color: "#0f172a",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Title bar moved to DesktopWindow; remove internal header */}

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "8px 10px",
          borderBottom: "1px solid #b8c6e3",
          background: "#e6ebf7",
          WebkitOverflowScrolling: "touch",
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
                        background: "#fffef6 url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><rect width=\'100%\' height=\'100%\' fill=\'#fffef6\'/><path d=\'M0 20 H200\' stroke=\'#e7e1c5\' stroke-width=\'1\'/><path d=\'M0 40 H200\' stroke=\'#e7e1c5\' stroke-width=\'1\'/><path d=\'M40 0 V200\' stroke=\'#eec1c1\' stroke-width=\'2\'/></svg>') repeat",
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
                      . A top competitor is{" "}
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
                            competitor: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.competitor}
                      </span>
                      , and we love pins like{" "}
                      <span
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          borderBottom: "1px dashed #aaa",
                          minWidth: "120px",
                          display: "inline-block",
                        }}
                        onInput={(e) =>
                          setBriefFields((prev) => ({
                            ...prev,
                            pinterest: e.currentTarget.textContent || "",
                          }))
                        }
                      >
                        {briefFields.pinterest}
                      </span>
                      .
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
                      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                        <button
                          onClick={handleBriefSend}
                          style={{
                            padding: "6px 12px",
                            background: "#ffcc00",
                            border: "1px solid #caa002",
                            borderRadius: "3px",
                            fontWeight: "700",
                            cursor: "pointer",
                          }}
                        >
                          Save Brief
                        </button>
                        <a
                          href={
                            (() => {
                              const subject = encodeURIComponent("Brief Us — The Agency OS");
                              const body = encodeURIComponent(
                                `Brand: ${briefFields.brand}\nProject: ${briefFields.project}\nVibe: ${briefFields.vibe}\nGoals: ${briefFields.goals}\nTimeline: ${briefFields.timeline}\nBudget: ${briefFields.budget}\nContact: ${briefFields.name} <${briefFields.email}>\n\n(Generated from the Brief Us panel)`
                              );
                              return `mailto:hello@meettheagency.com?subject=${subject}&body=${body}`;
                            })()
                          }
                          style={{
                            padding: "6px 12px",
                            background: "#2b5fb8",
                            border: "1px solid #1b3a73",
                            borderRadius: "3px",
                            fontWeight: 700,
                            color: "#fff",
                            textDecoration: "none",
                          }}
                        >
                          Email Brief
                        </a>
                      </div>
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
                      <div ref={(el) => { if (el) endRefs.current[tab] = el; }} />
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
