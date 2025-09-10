"use client";
import { useState } from "react";

export function FAQWindow() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { key: "getting-started", label: "Getting Started" },
    { key: "services", label: "Our Services" },
    { key: "process", label: "Our Process" },
    { key: "contact", label: "Contact & Support" },
  ];

  const faqs = {
    "getting-started": [
      {
        question: "What is The Agency OS™?",
        answer:
          "The Agency OS™ is our interactive desktop environment where you can explore our services, learn about our team, and connect with us. It's designed to give you a fun, retro Windows experience while showcasing our creative work.",
      },
      {
        question: "How do I navigate the desktop?",
        answer:
          "Click on any window icon to open it, or use the Start menu at the bottom left. You can move windows around by dragging their title bars, and close them with the X button in the top-right corner.",
      },
      {
        question: "Is this a real operating system?",
        answer:
          "No, this is a web-based interactive experience designed to showcase our agency's personality and services in a fun, memorable way!",
      },
    ],
    services: [
      {
        question: "What services do you offer?",
        answer:
          "We offer comprehensive creative services including brand identity design, website development, social media strategy, content creation, photography, and digital marketing solutions.",
      },
      {
        question: "Do you work with all types of businesses?",
        answer:
          "Absolutely! We work with startups, established businesses, non-profits, and creative individuals. Our approach is tailored to each client's unique needs and goals.",
      },
      {
        question: "Can you help with both digital and print design?",
        answer:
          "Yes! We handle everything from digital assets (websites, social media graphics) to print materials (business cards, brochures, packaging, etc.).",
      },
    ],
    process: [
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary based on scope and complexity. A simple logo design might take 1-2 weeks, while a full website could take 4-8 weeks. We'll give you a detailed timeline during our initial consultation.",
      },
      {
        question: "What's your design process like?",
        answer:
          "We follow a collaborative process: Discovery → Strategy → Design → Feedback → Refinement → Delivery. We believe in transparent communication and regular check-ins throughout the project.",
      },
      {
        question: "Do you provide revisions?",
        answer:
          "Yes! We include a set number of revisions in each project. Additional revisions can be accommodated for a small fee if needed.",
      },
    ],
    contact: [
      {
        question: "How can I get in touch?",
        answer:
          "You can reach us through our Messenger (click the AOL icon), email us at hello@meettheagency.com, or visit our website at meettheagency.com.",
      },
      {
        question: "Do you offer free consultations?",
        answer:
          "Yes! We offer free 30-minute discovery calls to discuss your project and see if we're a good fit for each other.",
      },
      {
        question: "What's your response time?",
        answer:
          "We typically respond to inquiries within 24 hours during business days. For urgent matters, feel free to mention it in your message.",
      },
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
        Help & FAQ - The Agency OS™
      </div>

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          padding: "8px 10px",
          borderBottom: "1px solid #b8c6e3",
          background: "#e6ebf7",
          flexWrap: "wrap",
        }}
      >
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveCategory(category.key)}
            style={{
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid #8aa1c5",
              background: activeCategory === category.key ? "#ffcc00" : "#fff",
              color: "#1e2a4a",
              borderColor:
                activeCategory === category.key ? "#caa002" : "#8aa1c5",
              fontSize: "12px",
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* FAQ Content */}
      <div style={{ flex: 1, overflow: "auto", padding: "10px" }}>
        <div style={{ marginBottom: "15px" }}>
          <h3
            style={{
              margin: "0 0 10px 0",
              color: "#1e2a4a",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {categories.find((cat) => cat.key === activeCategory)?.label}
          </h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                border: "1px solid #cbd5ea",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() =>
                  setExpandedFAQ(expandedFAQ === index ? null : index)
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "none",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#1e2a4a",
                }}
              >
                <span>{faq.question}</span>
                <span
                  style={{
                    fontSize: "12px",
                    transform:
                      expandedFAQ === index ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                >
                  ▼
                </span>
              </button>

              {expandedFAQ === index && (
                <div
                  style={{
                    padding: "0 12px 12px 12px",
                    borderTop: "1px solid #e6ebf7",
                    color: "#4a5568",
                    lineHeight: "1.6",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            background: "#e6ebf7",
            border: "1px solid #b8c6e3",
            borderRadius: "6px",
            textAlign: "center",
          }}
        >
          <h4 style={{ margin: "0 0 8px 0", color: "#1e2a4a" }}>
            Still have questions?
          </h4>
          <p
            style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#6c7c9b" }}
          >
            We&apos;re here to help! Send us a message through our Messenger or
            email us directly.
          </p>
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openAOLWindow"))
            }
            style={{
              padding: "8px 16px",
              background: "#ffcc00",
              border: "1px solid #caa002",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              color: "#1e2a4a",
            }}
          >
            💬 Open Messenger
          </button>
        </div>
      </div>
    </div>
  );
}
