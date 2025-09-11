"use client";

import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { TopBar } from "@/components/TopBar";
import {
  DesktopWindow,
  DigitalClockOnlyDate,
  DigitalClockOnlyTime,
  WeatherWidgetTaskbar,
  DesktopIcons,
  LoadingScreen,
  StartMenu,
  AOLMessenger,
  MASHGame,
  AboutWindow,
  FAQWindow,
  CreativeWizard,
  MetricsWindow,
  SkeletonDanceWindow,
  FunnyCatWindow,
  VirusAlertWindow,
  BSODWindow,
  StickyNotesWindow,
  ClippyWindow,
  VibeCheckWindow,
  NewsletterWindow,
  MysteryMurderClubWaitlistWindow,
  CoffeeClubWaitlistWindow,
  RetroAdWindow,
  InstagramAdWindow,
  ArchiveWindow,
  MTVWindow,
  BookWindow,
} from "@/components";
import type { WindowKey } from "@/components/StartMenu";

export default function Page() {
  // Boot overlay
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [startOpen, setStartOpen] = useState(false);

  // Window manager state
  const nextZ = useRef<number>(1000);
  type WindowState = {
    open: boolean;
    minimized: boolean;
    maximized: boolean;
    z: number;
    pos: { x: number; y: number };
    size: { w: number; h: number };
  };
  const [windows, setWindows] = useState<Record<WindowKey, WindowState>>(() => ({
    mash: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 120, y: 120 },
      size: { w: 520, h: 420 },
    },
    aol: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      // start roughly centered; openWindow will also center
      pos: { x: 200, y: 160 },
      // larger, chat-friendly default size
      size: { w: 720, h: 520 },
    },
    ads: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 260, y: 200 },
      size: { w: 420, h: 300 },
    },
    contact: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 100, y: 220 },
      size: { w: 420, h: 320 },
    },
    faq: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 120, y: 140 },
      size: { w: 480, h: 360 },
    },
    about: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 140, y: 140 },
      size: { w: 480, h: 360 },
    },
    creative: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 220, y: 140 },
      size: { w: 520, h: 420 },
    },
    metrics: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 180, y: 180 },
      size: { w: 520, h: 360 },
    },
    skeleton: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 260, y: 180 },
      size: { w: 420, h: 300 },
    },
    cat: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 300, y: 180 },
      size: { w: 420, h: 300 },
    },
    virus: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 320, y: 200 },
      size: { w: 420, h: 300 },
    },
    bsod: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 0, y: 0 },
      size: { w: 800, h: 600 },
    },
    notes: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 200, y: 200 },
      size: { w: 380, h: 260 },
    },
    clippy: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 220, y: 220 },
      size: { w: 340, h: 240 },
    },
    vibeCheck: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 240, y: 120 },
      size: { w: 420, h: 320 },
    },
    newsletter: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 260, y: 120 },
      size: { w: 420, h: 320 },
    },
    mysteryClub: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 280, y: 140 },
      size: { w: 420, h: 320 },
    },
    coffeeClub: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 300, y: 160 },
      size: { w: 380, h: 260 },
    },
    trash: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 320, y: 200 },
      size: { w: 480, h: 360 },
    },
    portfolio: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 240, y: 180 },
      size: { w: 640, h: 420 },
    },
    instaAd: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 200, y: 140 },
      size: { w: 360, h: 320 },
    },
    book: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 220, y: 160 },
      size: { w: 520, h: 380 },
    },
      mtv: {
      open: false,
      minimized: false,
      maximized: false,
      z: 0,
      pos: { x: 220, y: 220 },
      size: { w: 560, h: 360 },
    },
  }));

  const bringToFront = (key: WindowKey) => {
    nextZ.current += 1;
    setWindows((w) => ({
      ...w,
      [key]: { ...w[key], z: nextZ.current, minimized: false, open: true },
    }));
  };

  // Pop-up cycle manager (run after loading is complete)
  useEffect(() => {
    if (isLoading) return;
    // Copy of the inspo popup pattern: three popups at 2s, 6s, 10s (relative),
    // auto-close after 5s, and repeat the whole sequence every 30s while the user remains idle.
    const sequence: { key: WindowKey; offset: number }[] = [
      { key: "ads", offset: 2000 },
      { key: "instaAd", offset: 6000 },
      { key: "newsletter", offset: 10000 },
    ];

    const repeatInterval = 30000; // repeat every 30s while idle
    const seqTimers: number[] = [];
    let repeatTimer: number | null = null;
    let idle = true;

    const clearSeq = () => seqTimers.forEach((t) => clearTimeout(t));
    const clearRepeat = () => {
      if (repeatTimer) {
        clearTimeout(repeatTimer);
        repeatTimer = null;
      }
    };

    const runSequence = () => {
      clearSeq();
      sequence.forEach((s) => {
        const t = window.setTimeout(() => {
          if (!idle) return; // only show when still idle
          openWindow(s.key);
          // auto-close after 5s
          window.setTimeout(() => {
            setWindows((w) => ({
              ...w,
              [s.key]: { ...w[s.key], open: false },
            }));
          }, 5000);
        }, s.offset);
        seqTimers.push(t);
      });
    };

    const scheduleRepeat = () => {
      clearRepeat();
      repeatTimer = window.setTimeout(() => {
        if (!idle) return;
        runSequence();
        scheduleRepeat();
      }, repeatInterval);
    };

    const onUserInteract = () => {
      idle = false;
      clearSeq();
      clearRepeat();
      // stop listening after first interaction
      window.removeEventListener("mousemove", onUserInteract);
      window.removeEventListener("keydown", onUserInteract);
    };

    // Start after short initial delay so the page settles
    const initialStart = window.setTimeout(() => {
      runSequence();
      scheduleRepeat();
    }, 2000);

    window.addEventListener("mousemove", onUserInteract, { once: true });
    window.addEventListener("keydown", onUserInteract, { once: true });

    return () => {
      clearTimeout(initialStart);
      clearSeq();
      clearRepeat();
      window.removeEventListener("mousemove", onUserInteract);
      window.removeEventListener("keydown", onUserInteract);
    };
  }, [isLoading]);

  // Global menu/open events
  useEffect(() => {
    const openFAQ = () => openWindow("faq");
    const openBSOD = () => openWindow("bsod");
    const closeBSOD = () => closeWindow("bsod");
    const openSkeleton = () => openWindow("skeleton");
    const openAOL = () => openWindow("aol");
    const openMASH = () => openWindow("mash");
    const openNewsletter = () => openWindow("newsletter");
    const openBook = () => openWindow("book");
    window.addEventListener("openFAQWindow", openFAQ);
    window.addEventListener("openBSODWindow", openBSOD);
    window.addEventListener("closeBSODWindow", closeBSOD);
    window.addEventListener("openSkeletonWindow", openSkeleton);
    window.addEventListener("openAOLWindow", openAOL);
    window.addEventListener("openMASHWindow", openMASH);
    window.addEventListener("openNewsletterWindow", openNewsletter);
    window.addEventListener("openBookWindow", openBook);
    return () => {
      window.removeEventListener("openFAQWindow", openFAQ);
      window.removeEventListener("openBSODWindow", openBSOD);
      window.removeEventListener("closeBSODWindow", closeBSOD);
      window.removeEventListener("openSkeletonWindow", openSkeleton);
      window.removeEventListener("openAOLWindow", openAOL);
      window.removeEventListener("openMASHWindow", openMASH);
      window.removeEventListener("openNewsletterWindow", openNewsletter);
      window.removeEventListener("openBookWindow", openBook);
    };
  }, []);

  const cascadeOffsets = [
    { x: 60, y: 40 },
    { x: 120, y: 80 },
    { x: 180, y: 120 },
    { x: 240, y: 160 },
  ];
  const TASKBAR_HEIGHT = 54;
  const openWindow = (key: WindowKey) => {
    nextZ.current += 1;
    setWindows((w) => {
      const alreadyOpenCount = Object.values(w).filter((v) => v.open).length;
      const offset = cascadeOffsets[alreadyOpenCount % cascadeOffsets.length];
      const base = w[key].pos || { x: 100, y: 100 };
      let desired = { x: base.x + offset.x, y: base.y + offset.y };
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;
      // Center the AOL window on open for better visibility
      if (key === "aol") {
        desired = {
          x: Math.max(0, Math.floor((vw - w[key].size.w) / 2)),
          y: Math.max(0, Math.floor((vh - TASKBAR_HEIGHT - w[key].size.h) / 2)),
        };
      }
      const maxX = Math.max(0, vw - w[key].size.w);
      const maxY = Math.max(0, vh - TASKBAR_HEIGHT - w[key].size.h);
      const clamped = {
        x: Math.min(Math.max(0, desired.x), maxX),
        y: Math.min(Math.max(0, desired.y), maxY),
      };
      return {
        ...w,
        [key]: {
          ...w[key],
          open: true,
          minimized: false,
          z: nextZ.current,
          pos: clamped,
        },
      };
    });
    setStartOpen(false);
  };

  const closeWindow = (key: WindowKey) => {
    setWindows((w) => ({
      ...w,
      [key]: { ...w[key], open: false, minimized: false },
    }));
  };

  const toggleMinimize = (key: WindowKey) => {
    setWindows((w) => ({
      ...w,
      [key]: { ...w[key], minimized: !w[key].minimized },
    }));
  };

  const toggleMaximize = (key: WindowKey) => {
    setWindows((w) => ({
      ...w,
      [key]: { ...w[key], maximized: !w[key].maximized },
    }));
  };

  type WindowLayout = { x: number; y: number; width: number; height: number };
  const updateLayout = (key: WindowKey, layout: WindowLayout) => {
    setWindows((w) => ({
      ...w,
      [key]: {
        ...w[key],
        pos: { x: layout.x, y: layout.y },
        size: { w: layout.width, h: layout.height },
      },
    }));
  };

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // Show Clippy shortly after the desktop loads
  useEffect(() => {
    if (isLoading) return;
    const t = window.setTimeout(() => {
      openWindow("clippy");
    }, 900);
    return () => window.clearTimeout(t);
  }, [isLoading]);

  

  // Auto day/night background selection
  const [bgImage, setBgImage] = useState("/images/Background:day.png");
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 7 && hour < 19;
    setBgImage(
      isDay ? "/images/Background:day.png" : "/images/Background:night.png"
    );
  }, []);

  return (
    <>
      <Head>
        <title>The Agency OS™ — The Agency</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <TopBar />

      <main
        style={{
          fontFamily: "Courier New, monospace",
          paddingTop: isMobile ? 28 : 64,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 400ms ease-in-out",
        }}
        className="min-h-screen bg-black text-white"
      >
        {/* Desktop icons/folders */}
        <DesktopIcons onOpen={(k) => openWindow(k)} />

        {/* Render windows from manager */}

        {/* Dynamic windows opened via StartMenu */}
        {(Object.keys(windows) as WindowKey[]).map((key) => {
          const w = windows[key];
          if (!w.open) return null;
          // Map key to component
          const common = {
            title:
              key === "bsod"
                ? "Blue Screen Prank"
                : key === "skeleton"
                ? "Skeleton Dance Clip"
                : key === "faq"
                ? "FAQ"
                : key === "notes"
                ? "Notes"
                : key === "aol"
                ? "AOL Instant Messenger"
                : key,
            iconSrc: "/images/folder.webp",
            initialPosition: w.pos,
            width: w.size.w,
            height: w.size.h,
            zIndex: w.z || 1000,
            minimized: w.minimized,
            maximized: w.maximized,
            onClick: () => bringToFront(key),
            onClose: () => closeWindow(key),
            onMinimize: () => toggleMinimize(key),
            onMaximize: () => toggleMaximize(key),
            onLayoutChange: (layout: WindowLayout) => updateLayout(key, layout),
            // No auto-dock for popups
            autoDock: false,
          };

          let content = null;
          switch (key) {
            case "mash":
              content = <MASHGame />;
              break;
            case "aol":
              content = <AOLMessenger />;
              break;
            case "ads":
              content = <RetroAdWindow />;
              break;
            case "virus":
              content = <VirusAlertWindow />;
              break;
            case "contact":
            case "about":
              content = <AboutWindow />;
              break;
            case "faq":
              content = <FAQWindow />;
              break;
            case "creative":
              content = <CreativeWizard />;
              break;
            case "metrics":
              content = <MetricsWindow />;
              break;
            case "skeleton":
              content = <SkeletonDanceWindow />;
              break;
            case "cat":
              content = <FunnyCatWindow />;
              break;
            case "bsod":
              content = <BSODWindow />;
              break;
            case "notes":
              content = <StickyNotesWindow />;
              break;
            case "clippy":
              content = <ClippyWindow />;
              break;
            case "vibeCheck":
              content = <VibeCheckWindow />;
              break;
            case "newsletter":
              content = <NewsletterWindow />;
              break;
            case "book":
              content = <BookWindow />;
              break;
            case "mtv":
              content = <MTVWindow />;
              break;
            case "mysteryClub":
              content = <MysteryMurderClubWaitlistWindow />;
              break;
            case "coffeeClub":
              content = <CoffeeClubWaitlistWindow />;
              break;
            case "instaAd":
              content = <InstagramAdWindow />;
              break;
            case "portfolio":
              content = (
                <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ padding: 8, background: "#f9fafb", borderBottom: "1px solid #e5e7eb", fontSize: 12, color: "#374151" }}>
                    If the portfolio doesn’t load in this window, open it in a new tab: {" "}
                    <a href="https://www.the-visual-archive.com" target="_blank" rel="noreferrer" style={{ color: "#2563eb", fontWeight: 600 }}>the-visual-archive.com ↗</a>
                  </div>
                  <iframe
                    src="https://www.the-visual-archive.com"
                    style={{ width: "100%", height: "100%", border: 0 }}
                    title="The Visual Archive"
                  />
                </div>
              );
              break;
            case "trash":
              content = <ArchiveWindow />;
              break;
            default:
              content = <div style={{ padding: 12 }}>Nothing here yet.</div>;
          }

          if (key === "clippy") {
            // Render Clippy as overlay assistant without a window
            return <ClippyWindow key="clippy" />;
          }

          if (key === "bsod") {
            // Render Blue Screen Prank as fullscreen overlay (not a window)
            return <BSODWindow key="bsod" />;
          }

          return (
            <DesktopWindow key={key} {...common}>
              {content}
            </DesktopWindow>
          );
        })}

        {/* Taskbar */}
        <div
          style={{
            position: "fixed",
            bottom: 8,
            left: 12,
            right: 12,
            zIndex: 2000,
          }}
          data-role="taskbar"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setStartOpen((s) => !s)}
                className="px-5 py-2.5 bg-gradient-to-br from-indigo-800/30 to-purple-600/30 text-white rounded-xl border border-white/20 shadow-md hover:from-indigo-700/35 hover:to-purple-500/35 transition-all"
              >
                Start
              </button>
              {/* AOL Dock */}
              <button
                onClick={() => {
                  const w = windows["aol"];
                  if (w?.open && !w.minimized) toggleMinimize("aol");
                  else openWindow("aol");
                }}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white/90 text-xs border border-white/10 hover:bg-white/15"
                title="AOL Chat"
              >
                💬 AOL
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* Minimized/open windows first, tray at the far right */}
              <div className="flex items-center gap-2">
                {Object.keys(windows).filter((k) => !["ads","instaAd","newsletter"].includes(k)).map((k) => {
                  const key = k as WindowKey;
                  const w = windows[key];
                  if (!w.open) return null;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        if (w.minimized) bringToFront(key);
                        else toggleMinimize(key);
                      }}
                      className={`px-2 py-1 rounded bg-white/10 text-white/90 text-xs border border-white/10`}
                      title={key}
                    >
                      {key}
                    </button>
                  );
                })}
              </div>
              {/* Indicators tray (clock/date/weather) pinned to the right */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/5 text-white text-sm">
                <span className="font-mono mr-2">
                  <DigitalClockOnlyTime />
                </span>
                <span className="hidden sm:inline mr-2">
                  <DigitalClockOnlyDate />
                </span>
                {/* Weather in taskbar */}
                <span className="flex items-center gap-1 mr-2">
                  <WeatherWidgetTaskbar />
                </span>
              </div>
            </div>
          </div>
        </div>

        <StartMenu
          open={startOpen}
          onClose={() => setStartOpen(false)}
          onOpenWindow={(k) => openWindow(k as WindowKey)}
        />
      </main>
    </>
  );
}
