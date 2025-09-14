"use client";
import React, { useState } from "react";

interface VideoProject {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  tags: string[];
  views: string;
  likes: string;
  category: string;
  client?: string;
  year: string;
}

export function VideoLibraryWindow() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const videoProjects: VideoProject[] = [
    {
      id: 1,
      title: "Skeleton Dance Party",
      duration: "2:34",
      description: "1920's viral dance video featuring animated skeletons",
      thumbnail: "💀",
      tags: ["Viral", "Animation", "Dance"],
      views: "12.5K",
      likes: "8.2K",
      category: "Entertainment",
      year: "2024",
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
      category: "Corporate",
      year: "2024",
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
      category: "Educational",
      year: "2024",
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
      category: "Branding",
      client: "FinTech Solutions",
      year: "2024",
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
      category: "Web Design",
      client: "ShopLocal Inc",
      year: "2024",
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
      category: "Marketing",
      client: "Urban Lifestyle Co",
      year: "2024",
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
      category: "Development",
      client: "FitTrack Pro",
      year: "2024",
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
      category: "Animation",
      client: "CloudSync Ltd",
      year: "2024",
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
      category: "Photography",
      client: "Global Corp",
      year: "2024",
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
      category: "Strategy",
      client: "ContentFirst Media",
      year: "2024",
    },
    {
      id: 11,
      title: "Logo Animation: Brand Launch",
      duration: "1:30",
      description: "Cinematic logo reveal for new beverage brand",
      thumbnail: "✨",
      tags: ["Animation", "Logo", "Brand Launch"],
      views: "18.2K",
      likes: "15.7K",
      category: "Animation",
      client: "Spark Drinks",
      year: "2024",
    },
    {
      id: 12,
      title: "UI/UX Case Study: Banking App",
      duration: "9:25",
      description: "Redesigning mobile banking for better user experience",
      thumbnail: "🏦",
      tags: ["UX/UI", "Mobile", "Finance"],
      views: "13.4K",
      likes: "10.9K",
      category: "Design",
      client: "SecureBank",
      year: "2024",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(videoProjects.map((p) => p.category))),
  ];

  const filteredProjects = videoProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
      {/* Header */}
      <div
        style={{
          padding: "15px",
          background: "#e6ebf7",
          borderBottom: "1px solid #b8c6e3",
        }}
      >
        <h2
          style={{ margin: "0 0 10px 0", color: "#1e2a4a", fontSize: "18px" }}
        >
          🎬 Agency Video Library
        </h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            style={{
              flex: 1,
              padding: "6px 10px",
              border: "1px solid #cbd5ea",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          />
          <select
            value={selectedCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSelectedCategory(e.target.value)
            }
            style={{
              padding: "6px 10px",
              border: "1px solid #cbd5ea",
              borderRadius: "4px",
              fontSize: "13px",
              background: "#fff",
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          flex: 1,
          padding: "15px",
          overflow: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "15px",
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "#fff",
              borderRadius: "8px",
              border: "1px solid #cbd5ea",
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Thumbnail */}
            <div
              style={{
                height: "120px",
                background: "#f8f9fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                borderBottom: "1px solid #e9ecef",
              }}
            >
              {project.thumbnail}
            </div>

            {/* Content */}
            <div style={{ padding: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    margin: "0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1e2a4a",
                    lineHeight: "1.3",
                  }}
                >
                  {project.title}
                </h3>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#6c7c9b",
                    background: "#e6ebf7",
                    padding: "2px 6px",
                    borderRadius: "10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.year}
                </span>
              </div>

              {project.client && (
                <div
                  style={{
                    fontSize: "12px",
                    color: "#4a5568",
                    marginBottom: "8px",
                    fontWeight: "500",
                  }}
                >
                  Client: {project.client}
                </div>
              )}

              <p
                style={{
                  margin: "0 0 12px 0",
                  color: "#6c7c9b",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  flexWrap: "wrap",
                  marginBottom: "12px",
                }}
              >
                {project.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "3px 8px",
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

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    fontSize: "12px",
                    color: "#6c7c9b",
                  }}
                >
                  <span>👁 {project.views}</span>
                  <span>❤️ {project.likes}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                  ⏱ {project.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Stats */}
      <div
        style={{
          padding: "10px 15px",
          background: "#e6ebf7",
          borderTop: "1px solid #b8c6e3",
          fontSize: "12px",
          color: "#6c7c9b",
          textAlign: "center",
        }}
      >
        Showing {filteredProjects.length} of {videoProjects.length} projects
      </div>
    </div>
  );
}
