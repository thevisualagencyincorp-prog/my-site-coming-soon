"use client";
import React, { useState, useRef, useEffect } from "react";

export function SkeletonDanceWindow() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [ready, setReady] = useState(false);

  const videoLibrary = [
    {
      id: 1,
      title: "Skeleton Dance Party",
      duration: "2:34",
      description: "1920's viral dance video featuring animated skeletons",
      thumbnail: "💀",
      tags: ["Viral", "Animation", "Dance"],
      views: "12.5K",
      likes: "8.2K",
      videoUrl:
        "https://archive.org/download/the-skeleton-dance_1929/the-skeleton-dance_1929.mp4",
    },
    {
      id: 2,
      title: "Agency Behind the Scenes",
      duration: "4:12",
      description: "A day in the life at The Agency OS™",
      thumbnail: "🎬",
      tags: ["Behind the Scenes", "Team", "Culture"],
      views: "5.8K",
      likes: "3.1K",
      videoUrl: "/videos/agency-bts.mp4", // Placeholder - would need actual video
    },
    {
      id: 3,
      title: "Creative Process Demo",
      duration: "3:45",
      description: "How we turn ideas into amazing digital experiences",
      thumbnail: "🎨",
      tags: ["Process", "Design", "Development"],
      views: "9.2K",
      likes: "6.7K",
      videoUrl: "/videos/creative-process.mp4", // Placeholder - would need actual video
    },
    {
      id: 4,
      title: "Brand Identity: Tech Startup",
      duration: "5:20",
      description: "Complete brand transformation for a fintech company",
      thumbnail: "🚀",
      tags: ["Branding", "Logo Design", "Identity"],
      views: "15.3K",
      likes: "12.1K",
      videoUrl: "/videos/brand-identity.mp4", // Placeholder - would need actual video
    },
    {
      id: 5,
      title: "Website Redesign: E-commerce",
      duration: "6:15",
      description: "UX/UI overhaul that increased conversions by 40%",
      thumbnail: "🛒",
      tags: ["Web Design", "UX/UI", "E-commerce"],
      views: "8.7K",
      likes: "7.2K",
      videoUrl: "/videos/website-redesign.mp4", // Placeholder - would need actual video
    },
    {
      id: 6,
      title: "Social Media Campaign",
      duration: "4:30",
      description: "Viral marketing campaign for a lifestyle brand",
      thumbnail: "📱",
      tags: ["Social Media", "Marketing", "Campaign"],
      views: "22.1K",
      likes: "18.5K",
      videoUrl: "/videos/social-campaign.mp4", // Placeholder - would need actual video
    },
    {
      id: 7,
      title: "Mobile App Development",
      duration: "7:45",
      description: "From concept to launch: fitness tracking app",
      thumbnail: "📱",
      tags: ["Mobile", "Development", "App"],
      views: "11.4K",
      likes: "9.8K",
      videoUrl: "/videos/mobile-app.mp4", // Placeholder - would need actual video
    },
    {
      id: 8,
      title: "Motion Graphics: Product Demo",
      duration: "3:20",
      description: "Animated explainer video for SaaS platform",
      thumbnail: "🎥",
      tags: ["Motion Graphics", "Animation", "Demo"],
      views: "14.6K",
      likes: "11.3K",
      videoUrl: "/videos/motion-graphics.mp4", // Placeholder - would need actual video
    },
    {
      id: 9,
      title: "Photography: Corporate Headshots",
      duration: "2:50",
      description: "Professional headshot session for executive team",
      thumbnail: "📸",
      tags: ["Photography", "Corporate", "Headshots"],
      views: "6.9K",
      likes: "5.4K",
      videoUrl: "/videos/photography.mp4", // Placeholder - would need actual video
    },
    {
      id: 10,
      title: "Content Strategy Workshop",
      duration: "8:10",
      description: "How we developed a 12-month content calendar",
      thumbnail: "📝",
      tags: ["Content", "Strategy", "Workshop"],
      views: "7.8K",
      likes: "6.1K",
      videoUrl: "/videos/content-strategy.mp4", // Placeholder - would need actual video
    },
  ];

  const currentVideoData = videoLibrary[currentVideo];
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video switching
  const switchVideo = (index: number) => {
    setCurrentVideo(index);
    setIsPlaying(false);
    setReady(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Auto-play on mount
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        videoRef.current?.play().catch(() => {});
      } catch {}
    }, 200);
    return () => clearTimeout(t);
  }, []);

  // Reload video when currentVideo changes
  useEffect(() => {
    if (videoRef.current) {
      setReady(false);
      videoRef.current.load();
    }
  }, [currentVideo]);

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
      {/* Toolbar */}
      <div
        style={{
          padding: "8px 10px",
          background: "#e6ebf7",
          borderBottom: "1px solid #b8c6e3",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setShowPlaylist(!showPlaylist)}
          style={{
            padding: "4px 8px",
            background: showPlaylist ? "#ffcc00" : "#fff",
            border: "1px solid #cbd5ea",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          📋 Playlist
        </button>
        <button
          onClick={() => switchVideo(Math.max(0, currentVideo - 1))}
          disabled={currentVideo === 0}
          style={{
            padding: "4px 8px",
            background: "#fff",
            border: "1px solid #cbd5ea",
            borderRadius: "4px",
            cursor: currentVideo === 0 ? "not-allowed" : "pointer",
            fontSize: "12px",
            opacity: currentVideo === 0 ? 0.5 : 1,
          }}
        >
          ⏮️ Prev
        </button>
        <button
          onClick={() =>
            switchVideo(Math.min(videoLibrary.length - 1, currentVideo + 1))
          }
          disabled={currentVideo === videoLibrary.length - 1}
          style={{
            padding: "4px 8px",
            background: "#fff",
            border: "1px solid #cbd5ea",
            borderRadius: "4px",
            cursor:
              currentVideo === videoLibrary.length - 1
                ? "not-allowed"
                : "pointer",
            fontSize: "12px",
            opacity: currentVideo === videoLibrary.length - 1 ? 0.5 : 1,
          }}
        >
          Next ⏭️
        </button>
        <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
          {currentVideoData.title} • {currentVideoData.duration} •{" "}
          {currentVideo + 1}/{videoLibrary.length}
        </span>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Video Player */}
        <div
          style={{
            flex: showPlaylist ? 2 : 1,
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
                    animation: "pulse 2s infinite",
                  }}
                >
                  {currentVideoData.thumbnail}
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    marginBottom: "10px",
                    fontWeight: "bold",
                  }}
                >
                  {currentVideoData.title}
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    opacity: "0.8",
                    marginBottom: "20px",
                  }}
                >
                  {currentVideoData.description}
                </div>
                <button
                  onClick={() => {
                    setIsPlaying(true);
                    setTimeout(
                      () => videoRef.current?.play().catch(() => {}),
                      50
                    );
                  }}
                  style={{
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
                  ▶️ PLAY VIDEO
                </button>
              </div>
            ) : (
              <div
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: ready ? 1 : 0,
                    transition: "opacity 600ms ease",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      // Epilepsy-friendly filters: reduce contrast, brightness, and saturation
                      filter:
                        "brightness(0.7) contrast(0.6) saturate(0.5) blur(0.3px)",
                      // Additional safety: limit animation intensity
                      animation: "none",
                    }}
                    poster="/images/Background:night.png"
                    onLoadedData={() => setReady(true)}
                    onCanPlay={() => setReady(true)}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                  >
                    <source src={currentVideoData.videoUrl} type="video/mp4" />
                    {/* Fallback sources for skeleton dance */}
                    {currentVideo === 0 &&
                      !currentVideoData.videoUrl.includes("archive.org") && (
                        <>
                          <source src="/videos/skeleton.mp4" type="video/mp4" />
                          <source
                            src="https://archive.org/download/the-skeleton-dance_1929/the-skeleton-dance_1929.mp4"
                            type="video/mp4"
                          />
                        </>
                      )}
                  </video>
                </div>
                {!ready && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      opacity: 0.7,
                      fontSize: 14,
                    }}
                  >
                    Loading… 💀
                  </div>
                )}
                {!ready && (
                  <div style={{ position: "absolute", right: 10, bottom: 10 }}>
                    <a
                      href={
                        currentVideoData.videoUrl ||
                        "https://archive.org/download/the-skeleton-dance_1929/the-skeleton-dance_1929.mp4"
                      }
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: "6px 10px",
                        background: "#ffffff22",
                        border: "1px solid #ffffff33",
                        borderRadius: 6,
                        color: "#fff",
                        fontSize: 12,
                        textDecoration: "none",
                      }}
                    >
                      Open video ↗
                    </a>
                  </div>
                )}
                {/* System volume controls video playback */}
              </div>
            )}
          </div>

          {/* Video Info */}
          <div
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "8px",
              border: "1px solid #cbd5ea",
            }}
          >
            <h3
              style={{
                margin: "0 0 10px 0",
                color: "#1e2a4a",
                fontSize: "16px",
              }}
            >
              {currentVideoData.title}
            </h3>
            <p
              style={{
                margin: "0 0 10px 0",
                color: "#6c7c9b",
                lineHeight: "1.5",
              }}
            >
              {currentVideoData.description}
            </p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {currentVideoData.tags.map((tag, index) => (
                <span
                  key={index}
                  style={{
                    padding: "4px 8px",
                    background: "#e6ebf7",
                    borderRadius: "12px",
                    fontSize: "11px",
                    color: "#4a5568",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Playlist Sidebar */}
        {showPlaylist && (
          <div
            style={{
              width: "300px",
              background: "#fff",
              borderLeft: "1px solid #cbd5ea",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                padding: "10px",
                background: "#e6ebf7",
                borderBottom: "1px solid #b8c6e3",
                fontWeight: "bold",
                color: "#1e2a4a",
              }}
            >
              📋 Video Library
            </div>
            <div style={{ flex: 1, overflow: "auto" }}>
              {videoLibrary.map((video, index) => (
                <div
                  key={video.id}
                  onClick={() => switchVideo(index)}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #f0f0f0",
                    cursor: "pointer",
                    background:
                      currentVideo === index ? "#ffcc00" : "transparent",
                    transition: "background 0.2s",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div style={{ fontSize: "24px" }}>{video.thumbnail}</div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#1e2a4a",
                          marginBottom: "2px",
                        }}
                      >
                        {video.title}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#6c7c9b",
                        }}
                      >
                        {video.duration} • {video.views} views
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}
