"use client";
import { useState, useEffect } from "react";
export function DigitalClockOnlyDate() {
  const [date, setDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      if (isMobile) {
        // Simplified format for mobile: "Dec 16"
        setDate(
          now.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        );
      } else {
        // Full format for desktop: "Mon, Dec 16, 2024"
        setDate(
          now.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        );
      }
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, [isMobile]);
  return <span>{date}</span>;
}
