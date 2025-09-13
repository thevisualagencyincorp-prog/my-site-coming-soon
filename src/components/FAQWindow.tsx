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
          "The Agency OS™ is our interactive desktop environment showcasing our award-winning creative digital agency services. Experience our unique approach to web development, branding, and digital marketing through this retro Windows-inspired interface.",
      },
      {
        question: "How do I navigate the desktop?",
        answer:
          "Click on any window icon to explore our services, or use the Start menu at the bottom left. You can move windows around by dragging their title bars, and close them with the X button in the top-right corner. It's designed to be intuitive and engaging!",
      },
      {
        question: "Is this a real operating system?",
        answer:
          "No, this is a custom web-based interactive experience designed to showcase our agency's personality and comprehensive digital services in a memorable, engaging way that reflects our creative expertise.",
      },
    ],
    services: [
      {
        question: "What digital agency services do you offer?",
        answer:
          "We offer comprehensive creative digital agency services including custom web development, app development, brand identity design, logo design, website design, e-commerce development, social media marketing, content creation, SEO services, digital advertising, photo/videography, photography services, video production, and complete digital marketing strategies.",
      },
      {
        question: "Do you work with all types of businesses?",
        answer:
          "Absolutely! We work with startups, established businesses, e-commerce brands, non-profits, creative agencies, and individual entrepreneurs. Our approach is tailored to each client's unique needs, industry, and business goals.",
      },
      {
        question: "Do you offer photo/videography services?",
        answer:
          "Yes! We provide professional photography services and video production for brands, including product photography, corporate headshots, event coverage, promotional videos, social media content, and commercial video production. Our photo/videography team captures your brand's story with creativity and technical excellence.",
      },
      {
        question: "Can you develop mobile apps for my business?",
        answer:
          "Absolutely! We specialize in custom mobile app development for iOS and Android platforms. Whether you need a native app, cross-platform solution, or web application, our app development team creates user-friendly, scalable applications that drive engagement and business growth.",
      },
    ],
    process: [
      {
        question: "How long does a typical web development project take?",
        answer:
          "Project timelines vary based on scope and complexity. A simple website design might take 2-4 weeks, while a complex e-commerce development project could take 8-12 weeks. Custom web applications may take 12-16 weeks. Mobile app development typically ranges from 8-20 weeks depending on complexity. We'll provide a detailed timeline during our free consultation.",
      },
      {
        question: "What's your web design and development process like?",
        answer:
          "We follow a proven digital agency process: Discovery & Strategy → Wireframing & UX Design → Visual Design → Development → Testing & QA → Launch & Optimization. We believe in transparent communication, regular check-ins, and collaborative feedback throughout the entire project lifecycle.",
      },
      {
        question: "Do you provide website maintenance and support?",
        answer:
          "Yes! We offer comprehensive website maintenance packages including security updates, performance optimization, content updates, SEO monitoring, and technical support. We also provide training so you can manage your own content.",
      },
    ],
    contact: [
      {
        question: "How can I get a quote for my web development project?",
        answer:
          "You can reach us through our Messenger (click the AOL icon), email us at hello@meettheagency.com, or visit our website at meettheagency.com. We offer free 30-minute discovery calls to discuss your project requirements and provide accurate quotes.",
      },
      {
        question: "Do you offer free consultations for digital marketing?",
        answer:
          "Yes! We offer a free 30-minute strategy session to discuss your digital marketing goals, current challenges, and how our SEO services, social media marketing, digital advertising, photo/videography, and app development expertise can help grow your business.",
      },
      {
        question: "What's your response time for new project inquiries?",
        answer:
          "We typically respond to new project inquiries within 24 hours during business days. For urgent web development, app development, photo/videography, or digital marketing needs, feel free to mention it in your message and we'll prioritize accordingly.",
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
      {/* Title moved to window chrome */}

      {/* Category Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "8px 10px",
          borderBottom: "1px solid #b8c6e3",
          background: "#e6ebf7",
          flexWrap: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
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
