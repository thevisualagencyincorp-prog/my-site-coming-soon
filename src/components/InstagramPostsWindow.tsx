"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: "image" | "video" | "carousel";
  permalink?: string;
}

// Realistic Instagram posts mockup data
const mockPosts: InstagramPost[] = [
  {
    id: "1",
    image: "/images/instagram-placeholder.svg",
    caption:
      "🚀 Just launched an incredible brand identity for a tech startup! From concept to execution, we transformed their vision into a cohesive visual story that captures their innovative spirit. The color palette reflects their forward-thinking approach, while the typography conveys trust and modernity.\n\nWhat do you think makes a brand identity truly memorable? Share below! 👇\n\n#BrandIdentity #GraphicDesign #CreativeAgency #StartupLife #VisualStorytelling",
    likes: 247,
    comments: 34,
    timestamp: "3h ago",
    type: "carousel",
    permalink: "#",
  },
  {
    id: "2",
    image: "/images/instagram-placeholder.svg",
    caption:
      "🎨 EDUCATIONAL THREAD: The Psychology of Color in Web Design\n\nDid you know that 90% of snap judgments about products are based on color alone? Here's what different colors communicate:\n\n🔴 RED = Energy, passion, urgency\n🔵 BLUE = Trust, stability, professionalism\n🟢 GREEN = Growth, harmony, health\n🟡 YELLOW = Optimism, creativity, warmth\n🟣 PURPLE = Luxury, creativity, wisdom\n🟠 ORANGE = Confidence, friendliness, success\n\nWhat's your brand's color personality? 🎯\n\n#WebDesign #ColorPsychology #UXDesign #DigitalMarketing #CreativeTips",
    likes: 189,
    comments: 28,
    timestamp: "8h ago",
    type: "image",
    permalink: "#",
  },
  {
    id: "3",
    image: "/images/instagram-placeholder.svg",
    caption:
      "✨ \"The best way to predict the future is to create it.\" - Peter Drucker\n\nIn a world that's constantly changing, remember that you have the power to shape your own destiny. Whether you're an entrepreneur, creative, or just someone chasing their dreams - your vision matters.\n\nTake that first step today. Your future self will thank you. 🌟\n\n#Motivation #Entrepreneurship #SelfCare #CreativeLife #Inspiration #Mindfulness",
    likes: 312,
    comments: 45,
    timestamp: "1d ago",
    type: "image",
    permalink: "#",
  },
  {
    id: "4",
    image: "/images/instagram-placeholder.svg",
    caption:
      "🎬 BEHIND THE SCENES: Creating a viral social media campaign for our client! Watch how we transformed their product launch into an engaging story that drove 300% engagement increase.\n\nFrom strategy to execution, here's the full creative process:\n• Research & insights gathering\n• Content strategy development\n• Visual concept creation\n• Copywriting & messaging\n• Multi-platform distribution\n• Performance tracking & optimization\n\nThe results? 📈 50K+ impressions, 8K+ engagements, and a 25% conversion rate!\n\n#SocialMediaMarketing #ContentCreation #DigitalStrategy #CampaignSuccess #MarketingTips",
    likes: 156,
    comments: 22,
    timestamp: "2d ago",
    type: "video",
    permalink: "#",
  },
  {
    id: "5",
    image: "/images/instagram-placeholder.svg",
    caption:
      "💡 QUICK TIP: The 5-Second Rule for Creative Blocks\n\nEver feel stuck in a creative rut? Try this:\n\n1️⃣ Set a 5-second timer\n2️⃣ Brain dump EVERY idea (no judgment)\n3️⃣ Pick the most interesting one\n4️⃣ Start creating immediately\n5️⃣ Refine as you go\n\nCreativity isn't about perfection - it's about momentum! Sometimes you just need to start to find your flow. 🎨✨\n\nWhat's your go-to technique for overcoming creative blocks? Share in the comments!\n\n#CreativeTips #DesignTips #Productivity #CreativeProcess #EntrepreneurTips",
    likes: 278,
    comments: 41,
    timestamp: "3d ago",
    type: "image",
    permalink: "#",
  },
];

export function InstagramPostsWindow() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch real Instagram posts
    const loadPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/instagram");
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          // Fallback to mock data if API fails
          setPosts(mockPosts);
        }
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setPosts(mockPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

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
        📸 Instagram Feed - The Agency OS™
      </div>

      {/* Header */}
      <div
        style={{
          padding: "10px",
          background: "#e6ebf7",
          borderBottom: "1px solid #b8c6e3",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background:
              "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          📸
        </div>
        <div>
          <div style={{ fontWeight: "bold", color: "#1e2a4a" }}>
            @meet_the_agency
          </div>
          <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
            The Agency OS™ • Digital Agency
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button
            style={{
              padding: "4px 8px",
              background: "#ff6b35",
              border: "none",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Follow
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              color: "#6c7c9b",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "40px",
                  marginBottom: "10px",
                  animation: "spin 1s linear infinite",
                }}
              >
                📸
              </div>
              <div>Loading Instagram feed...</div>
            </div>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                style={{
                  background: "#fff",
                  borderRadius: "12px",
                  border: "1px solid #cbd5ea",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                {/* Post Header */}
                <div
                  style={{
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background:
                        "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "16px",
                    }}
                  >
                    📸
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        color: "#1e2a4a",
                      }}
                    >
                      meet_the_agency
                    </div>
                    <div style={{ fontSize: "11px", color: "#6c7c9b" }}>
                      {post.timestamp}
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", fontSize: "16px" }}>⋯</div>
                </div>

                {/* Post Image */}
                <div
                  style={{
                    height: "200px",
                    background: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={post.image}
                    alt="Instagram post"
                    width={400}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      (e.target as HTMLImageElement).src =
                        "/images/instagram-placeholder.svg";
                    }}
                  />
                  {post.type === "video" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      ▶️ VIDEO
                    </div>
                  )}
                  {post.type === "carousel" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(0,0,0,0.7)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      📸 1/3
                    </div>
                  )}
                </div>

                {/* Post Actions */}
                <div
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      marginBottom: "8px",
                    }}
                  >
                    <button
                      style={{
                        fontSize: "20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#ed4956",
                      }}
                    >
                      ❤️
                    </button>
                    <button
                      style={{
                        fontSize: "20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      💬
                    </button>
                    <button
                      style={{
                        fontSize: "20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      📤
                    </button>
                    <div style={{ marginLeft: "auto" }}>
                      <button
                        style={{
                          fontSize: "20px",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        🔖
                      </button>
                    </div>
                  </div>

                  {/* Likes and Comments */}
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#1e2a4a",
                      fontWeight: "600",
                    }}
                  >
                    {post.likes.toLocaleString()} likes
                  </div>
                </div>

                {/* Post Caption */}
                <div style={{ padding: "12px" }}>
                  <div style={{ fontSize: "13px", lineHeight: "1.4" }}>
                    <span style={{ fontWeight: "600", marginRight: "8px" }}>
                      TheAgencyOS
                    </span>
                    {post.caption}
                  </div>
                  {post.comments > 0 && (
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#6c7c9b",
                        marginTop: "8px",
                        cursor: "pointer",
                      }}
                    >
                      View all {post.comments} comments
                    </div>
                  )}
                </div>
              </div>
            ))}
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
      `}</style>
    </div>
  );
}
