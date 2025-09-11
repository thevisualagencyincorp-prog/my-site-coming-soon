"use client";
import { useState, useRef } from "react";

export function SkeletonDanceWindow() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentVideo, setCurrentVideo] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);

  const videoLibrary = [
    {
      id: 1,
      title: "Skeleton Dance Party",
      duration: "2:34",
      description:
        "Our signature viral dance video featuring animated skeletons",
      thumbnail: "💀",
      tags: ["Viral", "Animation", "Dance"],
      views: "12.5K",
      likes: "8.2K",
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
    },
  ];

  const currentVideoData = videoLibrary[currentVideo];
  const videoRef = useRef<HTMLVideoElement>(null);

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
        The Agency Video Previewer 🎬
      </div>

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
        <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
          {currentVideoData.title} • {currentVideoData.duration}
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
                    setTimeout(() => videoRef.current?.play().catch(() => {}), 50);
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
              <div style={{ width: "100%", height: "100%" }}>
                <video
                  ref={videoRef}
                  controls
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  poster="/images/Background:night.png"
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                >
                  {/* Replace the src below with an actual open-source/public-domain skeleton clip URL */}
                  <source
                    src={
                      process.env.NEXT_PUBLIC_SKELETON_VIDEO_URL ||
                      "https://archive.org/download/TheSkeletonDance1929/TheSkeletonDance1929_512kb.mp4"
                    }
                    type="video/mp4"
                  />
                </video>
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
                  onClick={() => {
                    setCurrentVideo(index);
                    setIsPlaying(false);
                  }}
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
        @keyframes dance {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          25% {
            transform: scale(1.1) rotate(5deg);
          }
          50% {
            transform: scale(1.2) rotate(-5deg);
          }
          75% {
            transform: scale(1.1) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
}
