"use client";
import { useState } from "react";

export function CreativeWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    timeline: "",
    goals: "",
    brand: "",
    audience: "",
    references: "",
    contact: "",
    name: "",
    email: "",
    company: "",
  });

  const totalSteps = 4;

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = () => {
    // In a real app, this would send the data to a server
    alert(
      "Thank you! Your creative project setup has been submitted. We'll be in touch soon!"
    );
    // Reset form
    setFormData({
      projectType: "",
      budget: "",
      timeline: "",
      goals: "",
      brand: "",
      audience: "",
      references: "",
      contact: "",
      name: "",
      email: "",
      company: "",
    });
    setCurrentStep(1);
  };

  const projectTypes = [
    "Brand Identity",
    "Website Design",
    "Social Media",
    "Photography",
    "Video Production",
    "Print Design",
    "Digital Marketing",
    "E-commerce",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000+",
    "Not sure yet",
  ];

  const timelineOptions = [
    "ASAP (Rush)",
    "1-2 weeks",
    "2-4 weeks",
    "1-2 months",
    "2-3 months",
    "3+ months",
    "Flexible",
  ];

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

      {/* Progress Bar */}
      <div
        style={{
          padding: "10px",
          background: "#e6ebf7",
          borderBottom: "1px solid #b8c6e3",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#6c7c9b" }}>
            Step {currentStep} of {totalSteps}
          </span>
          <div
            style={{
              flex: 1,
              height: "4px",
              background: "#cbd5ea",
              borderRadius: "2px",
            }}
          >
            <div
              style={{
                width: `${(currentStep / totalSteps) * 100}%`,
                height: "100%",
                background: "#ffcc00",
                borderRadius: "2px",
                transition: "width 0.3s ease",
              }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "15px" }}>
        {currentStep === 1 && (
          <div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              🎯 What kind of project are you dreaming of?
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Project Type *
              </label>
              <select
                value={formData.projectType}
                onChange={(e) => updateFormData("projectType", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              >
                <option value="">Select a project type...</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => updateFormData("budget", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              >
                <option value="">Select your budget range...</option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => updateFormData("timeline", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              >
                <option value="">When do you need this completed?</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              🎨 Tell us about your vision
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Project Goals & Objectives
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => updateFormData("goals", e.target.value)}
                placeholder="What do you want to achieve with this project?"
                rows={4}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Brand/Company Name
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => updateFormData("brand", e.target.value)}
                placeholder="Your brand or company name"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Target Audience
              </label>
              <input
                type="text"
                value={formData.audience}
                onChange={(e) => updateFormData("audience", e.target.value)}
                placeholder="Who is your ideal customer?"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              💡 Inspiration & References
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Style Preferences & References
              </label>
              <textarea
                value={formData.references}
                onChange={(e) => updateFormData("references", e.target.value)}
                placeholder="Describe your style preferences, favorite brands, websites, or anything that inspires you..."
                rows={6}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                  resize: "vertical",
                }}
              />
            </div>

            <div
              style={{
                background: "#e6ebf7",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #b8c6e3",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#6c7c9b",
                  lineHeight: "1.5",
                }}
              >
                <strong>💡 Pro Tip:</strong> The more details you share about
                your vision, the better we can create something amazing for you!
              </p>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 style={{ margin: "0 0 15px 0", color: "#1e2a4a" }}>
              📞 Let&apos;s get in touch!
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Your Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="Your full name"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                placeholder="your.email@example.com"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Company/Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData("company", e.target.value)}
                placeholder="Your company or organization"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                Preferred Contact Method
              </label>
              <select
                value={formData.contact}
                onChange={(e) => updateFormData("contact", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #cbd5ea",
                  borderRadius: "4px",
                  fontSize: "14px",
                  background: "#fff",
                }}
              >
                <option value="">How would you like us to contact you?</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
                <option value="messenger">Messenger (in this app)</option>
              </select>
            </div>

            <div
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "6px",
                border: "1px solid #cbd5ea",
              }}
            >
              <h3 style={{ margin: "0 0 10px 0", color: "#1e2a4a" }}>
                Ready to submit?
              </h3>
              <p
                style={{
                  margin: "0",
                  fontSize: "13px",
                  color: "#6c7c9b",
                  lineHeight: "1.5",
                }}
              >
                We&apos;ll review your project details and get back to you
                within 24 hours with a personalized proposal and next steps.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          padding: "15px",
          background: "#e6ebf7",
          borderTop: "1px solid #b8c6e3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          style={{
            padding: "8px 16px",
            background: currentStep === 1 ? "#ccc" : "#fff",
            border: "1px solid #cbd5ea",
            borderRadius: "4px",
            cursor: currentStep === 1 ? "not-allowed" : "pointer",
            fontSize: "14px",
            color: "#1e2a4a",
          }}
        >
          ← Previous
        </button>

        <div style={{ fontSize: "12px", color: "#6c7c9b" }}>
          Step {currentStep} of {totalSteps}
        </div>

        {currentStep < totalSteps ? (
          <button
            onClick={nextStep}
            disabled={!formData.projectType && currentStep === 1}
            style={{
              padding: "8px 16px",
              background:
                !formData.projectType && currentStep === 1 ? "#ccc" : "#ffcc00",
              border: "1px solid #caa002",
              borderRadius: "4px",
              cursor:
                !formData.projectType && currentStep === 1
                  ? "not-allowed"
                  : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1e2a4a",
            }}
          >
            Next →
          </button>
        ) : (
          <button
            onClick={submitForm}
            disabled={!formData.name || !formData.email}
            style={{
              padding: "8px 16px",
              background:
                !formData.name || !formData.email ? "#ccc" : "#28a745",
              border: "1px solid #1e7e34",
              borderRadius: "4px",
              cursor:
                !formData.name || !formData.email ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            🚀 Submit Project
          </button>
        )}
      </div>
    </div>
  );
}
