"use client";
import { useState } from "react";

export function MysteryMurderClubWaitlistWindow() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    interests: [] as string[],
    availability: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const experienceLevels = [
    "🕵️‍♀️ Complete Beginner",
    "🔍 Casual Mystery Fan",
    "🎭 Experienced Player",
    "🎪 Game Master Experience",
  ];

  const interestOptions = [
    "🕵️ Detective Work",
    "🎭 Role-Playing",
    "🤝 Networking",
    "🍷 Social Events",
    "🎨 Creative Problem Solving",
    "💼 Professional Development",
  ];

  const availabilityOptions = [
    "🌅 Weekends Only",
    "📅 Weeknights",
    "🎯 Flexible Schedule",
    "⭐ Anytime Available",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.interests.length > 0) {
      setSubmitted(true);
      // In a real app, this would send the data to your backend
    }
  };

  const eventDetails = {
    title: "Mystery/Murder Club Networking Event",
    date: "Coming Soon - Fall 2025",
    duration: "2 Hours",
    format: "In-Person + Virtual Options",
    whatToExpect: [
      "🎭 Immersive murder mystery experience",
      "🤝 Professional networking opportunities",
      "🍷 Themed cocktails and appetizers",
      "🎨 Creative problem-solving challenges",
      "💼 Industry connections and collaborations",
      "🏆 Prizes for best detective work",
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
      {/* Title moved to window chrome */}

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
                  animation: "mysteryPulse 2s infinite",
                }}
              >
                🕵️‍♀️
              </div>
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                  color: "#1e2a4a",
                }}
              >
                Join The Mystery/Murder Club
              </h2>
              <p style={{ color: "#6c7c9b", lineHeight: "1.5" }}>
                Be the first to know when our immersive murder mystery
                networking events launch! Solve crimes, make connections, and
                have fun with fellow creatives.
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
              {/* Optional hero image */}
              <img
                src="/images/mystery-hero.jpg"
                alt="Mystery/Murder Club"
                onError={(e) => ((e.currentTarget.style.display = 'none'))}
                style={{ width: '100%', borderRadius: 8, marginBottom: 12, objectFit: 'cover', maxHeight: 220 }}
              />
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                  color: "#1e2a4a",
                }}
              >
                🎭 Event Details
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
                    📅 Date
                  </div>
                  <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
                    {eventDetails.date}
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
                {/* Price intentionally omitted */}
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

              {/* Experience Level */}
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
                  Mystery Experience Level
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {experienceLevels.map((level, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px",
                        background:
                          formData.experience === level ? "#e6ebf7" : "#fff",
                        border: `2px solid ${
                          formData.experience === level ? "#ff6b35" : "#cbd5ea"
                        }`,
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={level}
                        checked={formData.experience === level}
                        onChange={(e) =>
                          handleInputChange("experience", e.target.value)
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
                            formData.experience === level
                              ? "#ff6b35"
                              : "transparent",
                        }}
                      />
                      {level}
                    </label>
                  ))}
                </div>
              </div>

              {/* Interests */}
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
                  What interests you most? *
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {interestOptions.map((interest, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px",
                        background: formData.interests.includes(interest)
                          ? "#e6ebf7"
                          : "#fff",
                        border: `2px solid ${
                          formData.interests.includes(interest)
                            ? "#ff6b35"
                            : "#cbd5ea"
                        }`,
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestToggle(interest)}
                        style={{ display: "none" }}
                      />
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          border: "2px solid #cbd5ea",
                          borderRadius: "3px",
                          background: formData.interests.includes(interest)
                            ? "#ff6b35"
                            : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {formData.interests.includes(interest) && (
                          <span style={{ color: "#fff", fontSize: "10px" }}>
                            ✓
                          </span>
                        )}
                      </div>
                      {interest}
                    </label>
                  ))}
                </div>
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
                  Preferred Availability
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {availabilityOptions.map((option, index) => (
                    <label
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px",
                        background:
                          formData.availability === option ? "#e6ebf7" : "#fff",
                        border: `2px solid ${
                          formData.availability === option
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
                        name="availability"
                        value={option}
                        checked={formData.availability === option}
                        onChange={(e) =>
                          handleInputChange("availability", e.target.value)
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
                            formData.availability === option
                              ? "#ff6b35"
                              : "transparent",
                        }}
                      />
                      {option}
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
                  formData.interests.length === 0
                }
                style={{
                  width: "100%",
                  padding: "14px",
                  background:
                    !formData.name ||
                    !formData.email ||
                    formData.interests.length === 0
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
                    formData.interests.length === 0
                      ? "not-allowed"
                      : "pointer",
                  transition: "background 0.2s ease",
                }}
              >
                Join the Waitlist
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
              🎭
            </div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "15px",
                color: "#1e2a4a",
              }}
            >
              You&apos;re on the List!
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
              Thanks for joining our Mystery/Murder Club waitlist! We&apos;ll
              notify you as soon as we have dates and details for our first
              event. Get ready for an unforgettable experience of crime-solving
              and networking!
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
                  <strong>Experience:</strong>{" "}
                  {formData.experience || "Not specified"}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <strong>Interests:</strong> {formData.interests.join(", ")}
                </div>
                <div>
                  <strong>Availability:</strong>{" "}
                  {formData.availability || "Not specified"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes mysteryPulse {
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
