"use client";
import { useState, useEffect, useRef } from "react";

export function AOLMessenger() {
  const [activeTab, setActiveTab] = useState("taylor");
  const initialMessages: Record<
    string,
    Array<{ who: string; text: string; me: boolean; timestamp: number }>
  > = {
    taylor: [
      {
        who: "Taylor Nation",
        text: "BTW, Trav LOVED the engagement location suggestion, the moodboards were genius! He said yes to all the florals!✨",
        me: false,
        timestamp: new Date(2025, 8, 10).getTime() - 1000 * 60 * 120,
      },
      {
        who: "You",
        text: "OMG YAY!! SO happy to hear that! We can't wait to see the pics 🥹💖 Britt's crying, I want to see the ring he had made!",
        me: true,
        timestamp: new Date(2025, 8, 10).getTime() - 1000 * 60 * 118,
      },
      {
        who: "Taylor Nation",
        text: "Heyyy our fav engaged lady wanted us to reach out about a playful microsite + (possible) tour visuals for Life of A Showgirl. Something only your creative brains can do...",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 115,
      },
      {
        who: "You",
        text: "YASSS we got you/her.. we will send a mini brief + mood sparks by EOD!",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 112,
      },
      {
        who: "Taylor Nation",
        text: "Perfect you ladies are the literal best! We love your enthusiasm, fresh perspectives, and taste, that's exactly why we come to you.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 110,
      },
    ],
    sabrina: [
      {
        who: "Sabrina Team",
        text: "Heyyy Besties! We need cheeky visuals for that secret thing we talked about last week...fun, flirty, elevated. You know how we do.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 90,
      },
      {
        who: "You",
        text: "Yall are too kind! We do what we can for our girl Brina! For this top secret project, we were thinking glossy type + motion stickers + candy color palette?",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 88,
      },
      {
        who: "Sabrina Team",
        text: "YASSSSSSS, this is why we always run ideas by the best, you just get it.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 86,
      },
    ],
    tyler: [
      {
        who: "Tyler",
        text: "Yo fam... I need a weird‑cool landing for a coming drop...obviously you’re my people.",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 75,
      },
      {
        who: "You",
        text: "Heyyyy Ty of course bro! Let’s make it playful but intentional. Send your constraints + timing.",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 74,
      },
      {
        who: "Tyler",
        text: "Constraints: none 😂 Timing: soon. Love your energy can't wait to see what yall create, send when you can. Love yall!",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 72,
      },
    ],
    olivia: [
      {
        who: "Olivia Team",
        text: "Hey besties, quick question: can you mock a zine‑style lyric page by the end of this week?",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 60,
      },
      {
        who: "You",
        text: "We got you! Sketching ideas as we speak and will send in the AM. Let's set a video call tomorrow to chat through it all!",
        me: true,
        timestamp: Date.now() - 1000 * 60 * 59,
      },
    ],
    xo: [
      {
        who: "XO Team",
        text: "Hey Ash! Hey Britt! Since you’re our go‑to for concept decks, concert visuals, and merch can we get on your books for a October sprint?",
        me: false,
        timestamp: Date.now() - 1000 * 60 * 48,
      },
      {
        who: "You",
        text: "Absolutely friend sending a cal link now! We’ve got fresh ideas queued, the mario games & the coffee ready.",
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
    // Intake (top)
    brand: "your business / artist",
    name: "[your name]",
    email: "[email]",
    phone: "",
    website: "",
    instagram: "",
    tiktok: "",
    xhandle: "",
    // Project basics
    project: "a project",
    goals: "[goal]",
    timeline: "[timeline]",
    budget: "[budget]",
    // Creative Lab (middle)
    vibe: "warm, modern, playful",
    brandVoice: "friendly / best‑friend energy",
    audiences: "creatives, founders",
    deliverables: "landing page hero, social set (IG + TT)",
    palette: "butter yellow, deep indigo, warm white",
    typography: "retro‑modern grotesk + cute serif",
    references: "",
    constraints: "",
    competitor: "[competitor]",
    pinterest: "[pinterest board link]",
    // Mad Lib (end)
    madlibWho: "we",
    madlibDo: "help [audience] [outcome]",
    madlibWhy: "so they can [benefit]",
  });

  const tracks = [
    "Taylor Swift — Fortnight",
    "Sabrina Carpenter — Manchild",
    "Tyler, the Creator — STOP Playing With Me",
    "Olivia Rodrigo — Bad Idea Right?",
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
      "OMG, you guys are absolute geniuses! We always come to you first because your vibes are unmatched — can't wait to see what you create!",
      "YASSS, this is why we love working with you! Your energy is everything, and you just get it. Let's make magic happen!",
      "Besties, you're our go-to for a reason — your fresh perspectives and killer taste always blow us away. Sending love and excitement!",
      "Heard loud and clear! We rave about you to everyone because you're the best at turning ideas into iconic vibes. Let's chat deets soon!",
      "Ahh, you're the dream team! We come running to you first for your enthusiasm and brilliance — can't wait for the sparks to fly!",
    ];
    const first = lines[Math.floor(Math.random() * lines.length)];
    const second = "Cool if we hop on a call later today?";

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
    const summary = `Brief received!\nBrand: ${briefFields.brand}\nProject: ${
      briefFields.project
    }\nVibe: ${briefFields.vibe}\nGoals: ${briefFields.goals}\nTimeline: ${
      briefFields.timeline
    }\nBudget: ${briefFields.budget}\nCompetitor: ${
      briefFields.competitor || "[competitor]"
    }\nPinterest: ${briefFields.pinterest || "[board link]"}`;
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

      {/* Now Playing (retro ticker) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 10px",
          background: "#0b2a5e",
          color: "#fff",
          borderBottom: "1px solid #1b3a73",
          fontSize: 12,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "#27c93f",
            boxShadow: "0 0 6px #27c93f",
          }}
        />
        <span style={{ opacity: 0.9, marginRight: 6 }}>Now Playing:</span>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            flex: 1,
            height: 16,
          }}
        >
          <div className="aol-ticker">
            <span className="aol-tick">{tracks[nowPlayingIndex]} • </span>
            <span className="aol-tick" aria-hidden>
              {tracks[nowPlayingIndex]} •
            </span>
            <span className="aol-tick" aria-hidden>
              {tracks[nowPlayingIndex]} •
            </span>
          </div>
        </div>
      </div>

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
                    {/* Intake: name, contact, links */}
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #cbd5ea",
                        borderRadius: 8,
                        padding: 12,
                        margin: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          marginBottom: 8,
                          color: "#1e2a4a",
                        }}
                      >
                        Intake
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        }}
                      >
                        <input
                          placeholder="Business / Artist Name"
                          value={briefFields.brand}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              brand: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Your Name"
                          value={briefFields.name}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Email"
                          type="email"
                          value={briefFields.email}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              email: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Phone"
                          value={briefFields.phone}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              phone: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Website"
                          value={briefFields.website}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              website: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Instagram"
                          value={briefFields.instagram}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              instagram: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="TikTok"
                          value={briefFields.tiktok}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              tiktok: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="X / Twitter"
                          value={briefFields.xhandle}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              xhandle: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                      </div>
                    </div>

                    {/* Creative Lab: strategy cues */}
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #cbd5ea",
                        borderRadius: 8,
                        padding: 12,
                        margin: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          marginBottom: 8,
                          color: "#1e2a4a",
                        }}
                      >
                        Creative Lab
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 8,
                        }}
                      >
                        <input
                          placeholder="Project"
                          value={briefFields.project}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              project: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Primary Goal"
                          value={briefFields.goals}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              goals: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Timeline"
                          value={briefFields.timeline}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              timeline: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Budget"
                          value={briefFields.budget}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              budget: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Audience(s)"
                          value={briefFields.audiences}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              audiences: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Vibe / adjectives"
                          value={briefFields.vibe}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              vibe: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Brand voice"
                          value={briefFields.brandVoice}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              brandVoice: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Deliverables"
                          value={briefFields.deliverables}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              deliverables: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Palette"
                          value={briefFields.palette}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              palette: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Typography"
                          value={briefFields.typography}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              typography: e.target.value,
                            }))
                          }
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="References (links)"
                          value={briefFields.references}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              references: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                        <input
                          placeholder="Constraints / must‑haves"
                          value={briefFields.constraints}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              constraints: e.target.value,
                            }))
                          }
                          style={{
                            gridColumn: "1 / -1",
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                          }}
                        />
                      </div>
                    </div>

                    {/* Mad Libs (fun outro) */}
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #cbd5ea",
                        borderRadius: 8,
                        padding: 12,
                        margin: "10px 12px",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          marginBottom: 8,
                          color: "#1e2a4a",
                        }}
                      >
                        Mad Lib
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          flexWrap: "wrap",
                          alignItems: "center",
                        }}
                      >
                        <input
                          value={briefFields.madlibWho}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              madlibWho: e.target.value,
                            }))
                          }
                          placeholder="We / I / Brand"
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                            width: 120,
                          }}
                        />
                        <span style={{ color: "#6c7c9b" }}>exist to</span>
                        <input
                          value={briefFields.madlibDo}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              madlibDo: e.target.value,
                            }))
                          }
                          placeholder="help [audience] [outcome]"
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                            minWidth: 240,
                          }}
                        />
                        <span style={{ color: "#6c7c9b" }}>so they can</span>
                        <input
                          value={briefFields.madlibWhy}
                          onChange={(e) =>
                            setBriefFields((p) => ({
                              ...p,
                              madlibWhy: e.target.value,
                            }))
                          }
                          placeholder="[benefit]"
                          style={{
                            padding: 8,
                            border: "1px solid #8aa1c5",
                            borderRadius: 6,
                            minWidth: 200,
                          }}
                        />
                        <span style={{ color: "#6c7c9b" }}>. ✨</span>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        padding: "12px",
                        background:
                          "#fffef6 url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#fffef6'/><path d='M0 20 H200' stroke='#e7e1c5' stroke-width='1'/><path d='M0 40 H200' stroke='#e7e1c5' stroke-width='1'/><path d='M40 0 V200' stroke='#eec1c1' stroke-width='2'/></svg>') repeat",
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
                      . . We&apos;re aiming to share this around{" "}
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
                        ({briefFields.email}). Voice: {briefFields.brandVoice}.
                        Audience: {briefFields.audiences}. Deliverables:{" "}
                        {briefFields.deliverables}. Mad Lib:{" "}
                        {briefFields.madlibWho} {briefFields.madlibDo} so they
                        can {briefFields.madlibWhy}.
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
                          href={(() => {
                            const subject = encodeURIComponent(
                              "Brief Us — The Agency OS"
                            );
                            const bodyRaw = [
                              `Business/Artist: ${briefFields.brand}`,
                              `Contact: ${briefFields.name} <${
                                briefFields.email
                              }> ${
                                briefFields.phone
                                  ? " | " + briefFields.phone
                                  : ""
                              }`,
                              `Website: ${briefFields.website}`,
                              `Socials: IG ${briefFields.instagram}  TT ${briefFields.tiktok}  X ${briefFields.xhandle}`,
                              ``,
                              `Project: ${briefFields.project}`,
                              `Goals: ${briefFields.goals}`,
                              `Timeline: ${briefFields.timeline}`,
                              `Budget: ${briefFields.budget}`,
                              `Audience(s): ${briefFields.audiences}`,
                              `Vibe: ${briefFields.vibe}`,
                              `Voice: ${briefFields.brandVoice}`,
                              `Deliverables: ${briefFields.deliverables}`,
                              `Palette: ${briefFields.palette}`,
                              `Typography: ${briefFields.typography}`,
                              `References: ${briefFields.references}`,
                              `Constraints: ${briefFields.constraints}`,
                              `Competitor: ${briefFields.competitor}`,
                              `Pinterest: ${briefFields.pinterest}`,
                              ``,
                              `Mad Lib: ${briefFields.madlibWho} ${briefFields.madlibDo} so they can ${briefFields.madlibWhy}.`,
                              ``,
                              `(Generated from the Brief Us panel in The Agency OS)`,
                            ].join("\n");
                            const body = encodeURIComponent(bodyRaw);
                            return `mailto:hello@meettheagency.com?subject=${subject}&body=${body}`;
                          })()}
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
                      <div
                        ref={(el) => {
                          if (el) endRefs.current[tab] = el;
                        }}
                      />
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

      {/* Footer spacer removed (ticker moved to header) */}
      <style jsx>{`
        .aol-ticker {
          display: inline-block;
          white-space: nowrap;
          will-change: transform;
          animation: aol-marquee 18s linear infinite;
          padding-left: 4px;
        }
        @keyframes aol-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
