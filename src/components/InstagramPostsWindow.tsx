"use client";
import { useState, useEffect } from "react";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
  type: "image" | "video" | "carousel";
}

export function InstagramPostsWindow() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock Instagram posts data (in a real app, this would fetch from Instagram API)
  const mockPosts: InstagramPost[] = [
    {
      id: "1",
      image: "📸",
      caption:
        "Behind the scenes of our latest creative project! 🎨✨ #DigitalAgency #CreativeProcess",
      likes: 127,
      comments: 23,
      timestamp: "2h ago",
      type: "image",
    },
    {
      id: "2",
      image: "🎬",
      caption:
        "New video content dropping soon! Stay tuned for our agency culture series 📹 #AgencyLife #ComingSoon",
      likes: 89,
      comments: 15,
      timestamp: "5h ago",
      type: "video",
    },
    {
      id: "3",
      image: "💻",
      caption:
        "Web development magic happening in our studio! 🚀 #WebDev #TechLife",
      likes: 156,
      comments: 31,
      timestamp: "1d ago",
      type: "image",
    },
    {
      id: "4",
      image: "🎨",
      caption:
        "Brand identity work for an exciting new client! Can't wait to share the results 🎯 #Branding #Design",
      likes: 203,
      comments: 45,
      timestamp: "2d ago",
      type: "carousel",
    },
    {
      id: "5",
      image: "☕",
      caption:
        "Coffee-fueled brainstorming session! What's your go-to productivity hack? 💡 #WorkLife #Creativity",
      likes: 94,
      comments: 28,
      timestamp: "3d ago",
      type: "image",
    },
  ];

  useEffect(() => {
    // Simulate API call
    const loadPosts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPosts(mockPosts);
      setLoading(false);
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
            @TheAgencyOS
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
                      The Agency OS™
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
                    fontSize: "60px",
                    position: "relative",
                  }}
                >
                  {post.image}
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
