"use client";

import { useState, useEffect } from "react";

export function TopBar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleHelpClick = () => {
    const event = new CustomEvent("openFAQWindow");
    window.dispatchEvent(event);
  };
  const handleFileClick = () => {
    window.dispatchEvent(new CustomEvent("openBSODWindow"));
  };
  const handleEditClick = () => {
    window.dispatchEvent(new CustomEvent("openSkeletonWindow"));
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] flex items-center bg-gradient-to-br from-indigo-800/30 to-purple-600/30 border-b border-white/20 shadow-md select-none backdrop-blur-sm ${
        isMobile ? "h-8" : "h-10"
      }`}
      style={{
        fontFamily: "Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: 700,
        color: "#fff",
        textShadow: "1px 1px 0 #000",
      }}
    >
      <span
        className={`tracking-wider ${
          isMobile ? "ml-2 mr-4 text-sm" : "ml-4 mr-8 text-base"
        }`}
      >
        {isMobile ? "Agency OS™" : "The Agency OS™"}
      </span>
      <span
        className={`cursor-pointer ${
          isMobile ? "mr-3 text-sm px-2 py-1" : "mr-6"
        }`}
        role="button"
        tabIndex={0}
        onClick={handleFileClick}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleFileClick()
        }
        title="Open: Blue Screen Prank"
      >
        File
      </span>
      <span
        className={`cursor-pointer ${
          isMobile ? "mr-3 text-sm px-2 py-1" : "mr-6"
        }`}
        role="button"
        tabIndex={0}
        onClick={handleEditClick}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleEditClick()
        }
        title="Open: Skeleton Dance Clip"
      >
        Edit
      </span>
      <span
        className={`cursor-pointer ${
          isMobile ? "mr-3 text-sm px-2 py-1" : "mr-6"
        }`}
        role="button"
        tabIndex={0}
        onClick={handleHelpClick}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && handleHelpClick()
        }
        title="Open: FAQ"
      >
        Help
      </span>
    </div>
  );
}
