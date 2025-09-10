"use client";
import { useState } from "react";

export function CoffeeClubWaitlistWindow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coffeePreference: "",
    skills: [] as string[],
    goals: "",
    availability: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);

  const coffeeOptions = [
    "☕ Black Coffee",
    "🥛 Latte/Latte Art",
    "🧊 Cold Brew/Iced Coffee",
    "🫘 Pour Over/Specialty",
    "🍵 Tea (Various Types)",
    "🧋 Specialty Drinks",
  ];

  const skillOptions = [
    "💻 Web Development",
    "🎨 Graphic Design",
    "📱 UI/UX Design",
    "📊 Data Analysis",
    "📝 Content Writing",
    "📈 Digital Marketing",
    "🎬 Video Production",
    "📸 Photography",
    "🎵 Audio/Music Production",
    "🤝 Business Development",
  ];

  const availabilityOptions = [
    "🌅 Saturday Mornings (9-11 AM)",
    "🌞 Saturday Afternoons (1-3 PM)",
    "🌆 Sunday Mornings (10 AM-12 PM)",
    "🌙 Sunday Afternoons (2-4 PM)",
    "📅 Weekday Evenings (6-8 PM)",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleAvailabilityToggle = (time: string) => {
    setFormData((prev) => ({
      ...prev,
      availability: prev.availability.includes(time)
        ? prev.availability.filter((a) => a !== time)
        : [...prev.availability, time],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.skills.length > 0 &&
      formData.availability.length > 0
    ) {
      setSubmitted(true);
      // In a real app, this would send the data to your backend
    }
  };

  const eventDetails = {
    title: "Coffee Club - Cowork & Network",
    duration: "2 Hours",
    format: "In-Person at Local Coffee Shops",
    frequency: "Weekly Sessions",
    price: "$15 per session (coffee included)",
    whatToExpect: [
      "☕ Premium coffee and snacks provided",
      "💻 Dedicated cowork space",
      "🤝 Professional networking",
      "🎯 Productivity challenges",
      "💡 Skill-sharing sessions",
      "📚 Resource recommendations",
    ],
  };

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
        ☕ Coffee Club Waitlist - The Agency OS™
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
        {!submitted ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "25px" }}>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "15px",
                  animation: "coffeeSteam 2s infinite",
                }}
              >
                ☕
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1e2a4a",
                }}
              >
                Join The Coffee Club
              </h2>
              <p style={{ color: "#6c7c9b", lineHeight: "1.5" }}>
                Work on your projects, meet fellow creatives, and enjoy premium
                coffee at local coffee shops. Perfect for focused work sessions
                and meaningful connections.
              </p>
            </div>

            {/* Event Preview */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #cbd5ea",
                marginBottom: "25px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: "#1e2a4a",
                }}
              >
                💼 Event Details
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      color: "#1e2a4a",
                    }}
                  >
                    ⏱️ Duration
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {eventDetails.duration}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      color: "#1e2a4a",
                    }}
                  >
                    📍 Format
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {eventDetails.format}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      color: "#1e2a4a",
                    }}
                  >
                    🔄 Frequency
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {eventDetails.frequency}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: "600",
                      fontSize: "13px",
                      color: "#1e2a4a",
                    }}
                  >
                    💰 Price
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {eventDetails.price}
                  </div>
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "13px",
                    color: "#1e2a4a",
                    marginBottom: "8px",
                  }}
                >
                  🎯 What to Expect:
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {eventDetails.whatToExpect.map((item, index) => (
                    <div
                      key={index}
                      style={{ fontSize: "12px", color: "#6c7c9b" }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Waitlist Form */}
            <form
              onSubmit={handleSubmit}
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              {/* Name */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#1e2a4a",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #cbd5ea",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#1e2a4a",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #cbd5ea",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Phone */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#1e2a4a",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #cbd5ea",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Coffee Preference */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#1e2a4a",
                  }}
                >
                  Coffee Preference
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {coffeeOptions.map((coffee, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px",
                        background:
                          formData.coffeePreference === coffee
                            ? "#e6ebf7"
                            : "#fff",
                        border: `2px solid ${
                          formData.coffeePreference === coffee
                            ? "#ff6b35"
                            : "#cbd5ea"
                        }`,
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="radio"
                        name="coffee"
                        value={coffee}
                        checked={formData.coffeePreference === coffee}
                        onChange={(e) =>
                          handleInputChange("coffeePreference", e.target.value)
                        }
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid #cbd5ea",
                          borderRadius: "50%",
                          background:
                            formData.coffeePreference === coffee
                              ? "#ff6b35"
                              : "transparent",
                        }}
                      />
                      {coffee}
                    </label>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#1e2a4a",
                  }}
                >
                  Your Skills & Expertise *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "6px",
                  }}
                >
                  {skillOptions.map((skill, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px",
                        background: formData.skills.includes(skill)
                          ? "#e6ebf7"
                          : "#fff",
                        border: `2px solid ${
                          formData.skills.includes(skill)
                            ? "#ff6b35"
                            : "#cbd5ea"
                        }`,
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "11px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={() => handleSkillToggle(skill)}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "10px",
                          height: "10px",
                          border: "2px solid #cbd5ea",
                          borderRadius: "2px",
                          background: formData.skills.includes(skill)
                            ? "#ff6b35"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {formData.skills.includes(skill) && (
                          <span style={{ color: "#fff", fontSize: "8px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "6px",
                    color: "#1e2a4a",
                  }}
                >
                  What are your goals for joining?
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => handleInputChange("goals", e.target.value)}
                  placeholder="e.g., Network with other creatives, find collaborators, work on personal projects..."
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "2px solid #cbd5ea",
                    borderRadius: "6px",
                    fontSize: "14px",
                    outline: "none",
                    boxSizing: "border-box",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Availability */}
              <div style={{ marginBottom: "25px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    marginBottom: "10px",
                    color: "#1e2a4a",
                  }}
                >
                  Preferred Time Slots *
                </label>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {availabilityOptions.map((time, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px",
                        background: formData.availability.includes(time)
                          ? "#e6ebf7"
                          : "#fff",
                        border: `2px solid ${
                          formData.availability.includes(time)
                            ? "#ff6b35"
                            : "#cbd5ea"
                        }`,
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.availability.includes(time)}
                        onChange={() => handleAvailabilityToggle(time)}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid #cbd5ea",
                          borderRadius: "3px",
                          background: formData.availability.includes(time)
                            ? "#ff6b35"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {formData.availability.includes(time) && (
                          <span style={{ color: "#fff", fontSize: "12px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      {time}
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  !formData.name ||
                  !formData.email ||
                  formData.skills.length === 0 ||
                  formData.availability.length === 0
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    !formData.name ||
                    !formData.email ||
                    formData.skills.length === 0 ||
                    formData.availability.length === 0
                      ? "#cbd5ea"
                      : "#ff6b35",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor:
                    !formData.name ||
                    !formData.email ||
                    formData.skills.length === 0 ||
                    formData.availability.length === 0
                      ? "not-allowed"
                      : "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                Join the Coffee Club Waitlist
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
              ☕
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#1e2a4a",
              }}
            >
              Welcome to the Coffee Club!
            </h2>
            <p
              style={{
                color: "#6c7c9b",
                lineHeight: "1.5",
                marginBottom: "20px",
                maxWidth: "400px",
                margin: "0 auto 20px",
              }}
            >
              Thanks for joining our Coffee Club waitlist! We&apos;ll notify you
              when we launch our first cowork sessions. Get ready for productive
              mornings/afternoons with great coffee and amazing company!
            </p>

            {/* Summary */}
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #cbd5ea",
                maxWidth: "400px",
                margin: "0 auto",
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
                Your Profile:
              </div>
              <div style={{ textAlign: "left", fontSize: "14px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Name:</strong> {formData.name}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Coffee Preference:</strong>{" "}
                  {formData.coffeePreference || "Not specified"}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Skills:</strong> {formData.skills.join(", ")}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Goals:</strong> {formData.goals || "Not specified"}
                </div>
                <div>
                  <strong>Available Times:</strong>{" "}
                  {formData.availability.join(", ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes coffeeSteam {
          0%,
          100% {
            transform: scale(1) translateY(0);
          }
          50% {
            transform: scale(1.05) translateY(-5px);
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
