"use client";

import React, { useEffect, useState, useRef } from "react";
import { TopBar } from "@/components/TopBar";
import {
  DesktopWindow,
  DesktopIcons,
  LoadingScreen,
  StartMenu,
  AOLMessenger,
  Game,
  AboutWindow,
  MySpaceWindow,
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
  SocialAdMakerWindow,
  VideoLibraryWindow,
  DigitalClockOnlyTime,
  DigitalClockOnlyDate,
  WeatherWidgetTaskbar,
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
  const [windows, setWindows] = useState<Record<WindowKey, WindowState>>(
    () => ({
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
        size: { w: 780, h: 640 },
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
      myspace: {
        open: false,
        minimized: false,
        maximized: false,
        z: 0,
        pos: { x: 160, y: 160 },
        size: { w: 520, h: 480 },
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
      adMaker: {
        open: false,
        minimized: false,
        maximized: false,
        z: 0,
        pos: { x: 220, y: 160 },
        size: { w: 720, h: 560 },
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
      videoLibrary: {
        open: false,
        minimized: false,
        maximized: false,
        z: 0,
        pos: { x: 200, y: 200 },
        size: { w: 800, h: 600 },
      },
    })
  );

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
    // Always show one initial promo after boot so it’s visible at least once
    const firstPromo = window.setTimeout(() => {
      openWindow("ads");
      window.setTimeout(
        () => setWindows((w) => ({ ...w, ads: { ...w.ads, open: false } })),
        8000
      );
    }, 1500);
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
      clearTimeout(firstPromo);
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
      const isMobileView = vw < 768;

      // Center windows on mobile for better usability
      if (isMobileView) {
        desired = {
          x: Math.max(0, Math.floor((vw - w[key].size.w) / 2)),
          y: Math.max(0, Math.floor((vh - TASKBAR_HEIGHT - w[key].size.h) / 2)),
        };
      }
      // Center the AOL window on open for better visibility (both mobile and desktop)
      else if (key === "aol") {
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

  // Notify global listeners (e.g., Clippy) of how many windows are open
  useEffect(() => {
    try {
      const openCount = Object.entries(windows).reduce((acc, [k, v]) => {
        // exclude overlay helpers
        if (k === "clippy" || k === "bsod") return acc;
        return acc + (v.open ? 1 : 0);
      }, 0);
      window.dispatchEvent(
        new CustomEvent("windowsOpenCount", { detail: openCount })
      );
    } catch {}
  }, [windows]);

  // Show Clippy shortly after the desktop loads (after loading screen completes)
  useEffect(() => {
    if (isLoading) return;
    const t = window.setTimeout(() => {
      openWindow("clippy");
    }, 900);
    return () => window.clearTimeout(t);
  }, [isLoading]);

  // Auto day/night background selection (live switch at 06:00 and 19:00)
  const [bgImage, setBgImage] = useState("/images/Background:day.png");
  useEffect(() => {
    const setByClock = () => {
      const hour = new Date().getHours();
      const isDay = hour >= 7 && hour < 19;
      setBgImage(
        isDay ? "/images/Background:day.png" : "/images/Background:night.png"
      );
    };
    const scheduleNextFlip = (): number => {
      const now = new Date();
      const next = new Date(now.getTime());
      if (now.getHours() < 7) {
        next.setHours(7, 0, 0, 0);
      } else if (now.getHours() < 19) {
        next.setHours(19, 0, 0, 0);
      } else {
        next.setDate(next.getDate() + 1);
        next.setHours(7, 0, 0, 0);
      }
      const ms = Math.max(1000, next.getTime() - now.getTime());
      return window.setTimeout(() => {
        setByClock();
        // chain another flip
        timer = scheduleNextFlip();
      }, ms);
    };

    setByClock();
    let timer = scheduleNextFlip();
    return () => window.clearTimeout(timer);
  }, []);

  // Dynamic meta tags based on active window
  useEffect(() => {
    const openWindows = Object.entries(windows).filter(
      ([_, w]) => w.open && !w.minimized
    );

    if (openWindows.length === 0) {
      // Reset to default when no windows are open
      document.title =
        "Creative Digital Agency | Custom Web Development & App Development Experts";
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          "content",
          "Award-winning creative digital agency specializing in custom web development, mobile app development, brand identity design, and professional photo/videography services. Get a free quote for your next project."
        );
      }
      return;
    }

    // Find the active window (highest z-index)
    const activeWindow = openWindows.reduce((max, [key, window]) =>
      window.z > max[1].z ? [key, window] : max
    );
    const serviceMetaTags = {
      about: {
        title: "About The Agency OS™ | Creative Digital Agency Services",
        description:
          "Meet our award-winning creative digital agency in Kern County, CA. We specialize in web development, app development, branding, photo/videography, and comprehensive social media management serving Tehachapi, Lancaster, Bakersfield, Bear Valley Springs, Stallion Springs, Sand Canyon, and beyond.",
      },
      myspace: {
        title: "MySpace Profile | The Agency OS™ Creative Digital Agency",
        description:
          "Check out our MySpace-style profile featuring our creative services, fun facts, and ways to connect. Award-winning digital agency specializing in web development, app development, branding, and photo/videography services.",
      },
      faq: {
        title: "FAQ | Digital Agency Services & Process | The Agency OS™",
        description:
          "Learn about our web development process, app development services, branding expertise, photo/videography capabilities, and social media management strategies. Serving Kern County, CA and surrounding areas including Tehachapi, Lancaster, Bakersfield, and more.",
      },
      aol: {
        title: "Contact Us | Get a Free Quote | The Agency OS™",
        description:
          "Ready to start your project? Contact our Kern County, CA creative digital agency for a free consultation on web development, app development, branding, or social media management services. Serving Tehachapi, Lancaster, Bakersfield, Bear Valley Springs, Stallion Springs, Sand Canyon, and beyond.",
      },
      mash: {
        title: "MASH Game | Fun Interactive Experience | The Agency OS™",
        description:
          "Take our fun MASH personality quiz while exploring our creative digital agency services and portfolio.",
      },
      newsletter: {
        title: "Newsletter Signup | Stay Updated | The Agency OS™",
        description:
          "Subscribe to our newsletter for the latest updates on web development trends, app development tips, and creative digital agency insights.",
      },
      creativeWizard: {
        title: "Creative Wizard | Project Planning Tool | The Agency OS™",
        description:
          "Use our interactive creative wizard to plan your next web development, app development, branding, or social media management project with our Kern County, CA digital agency. Serving Tehachapi, Lancaster, Bakersfield, Bear Valley Springs, Stallion Springs, Sand Canyon, and beyond.",
      },
      metrics: {
        title: "Agency Metrics & Results | The Agency OS™",
        description:
          "View our digital agency performance metrics, client success stories, and proven results in web development and app development.",
      },
      skeleton: {
        title: "Skeleton Dance | Fun Animation | The Agency OS™",
        description:
          "Enjoy our fun skeleton dance animation while learning about our creative digital agency services.",
      },
      funnyCat: {
        title: "Funny Cat Videos | Entertainment | The Agency OS™",
        description:
          "Watch hilarious cat videos and memes while exploring our web development and app development services.",
      },
      virus: {
        title: "Virus Alert | Security Demo | The Agency OS™",
        description:
          "Experience our interactive virus alert demo showcasing our expertise in secure web development and app development.",
      },
      bsod: {
        title: "BSOD Simulator | Retro Experience | The Agency OS™",
        description:
          "Experience the classic Windows BSOD while learning about our modern web development and app development services.",
      },
      stickyNotes: {
        title: "Sticky Notes | Project Planning | The Agency OS™",
        description:
          "Use our interactive sticky notes to plan your web development, app development, or branding project.",
      },
      clippy: {
        title: "Clippy Assistant | Help & Support | The Agency OS™",
        description:
          "Get help from our friendly Clippy assistant for web development, app development, and digital agency services.",
      },
      vibeCheck: {
        title: "Vibe Check | Brand Assessment | The Agency OS™",
        description:
          "Take our vibe check quiz to assess your brand's digital presence and discover our web development services.",
      },
      coffeeClub: {
        title: "Coffee Club Waitlist | Community | The Agency OS™",
        description:
          "Join our coffee club community and connect with fellow entrepreneurs, web developers, and creative professionals.",
      },
      mysteryMurder: {
        title: "Mystery Murder Club | Entertainment | The Agency OS™",
        description:
          "Join our mystery murder club for fun interactive stories while learning about our digital agency services.",
      },
      retroAd: {
        title: "Retro Advertising | Nostalgia | The Agency OS™",
        description:
          "Experience retro advertising styles while exploring our modern web development and app development expertise.",
      },
      instaAd: {
        title: "Instagram Ads | Social Media Marketing | The Agency OS™",
        description:
          "Learn about our Instagram advertising services and social media marketing expertise for your brand.",
      },
    };
  }, [windows]);

  return (
    <div>
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
          position: "relative",
        }}
        className="min-h-screen bg-black text-white"
      >
        {/* Subtle overlay for better text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-blue-900/10 pointer-events-none"
          style={{ zIndex: 1 }}
        ></div>
        {/* Desktop icons/folders */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <DesktopIcons onOpen={(k) => openWindow(k)} />
        </div>

        {/* Render windows from manager */}
        <div style={{ position: "relative", zIndex: 10 }}>
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
                  : key === "videoLibrary"
                  ? "Video Library"
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
              onLayoutChange: (layout: WindowLayout) =>
                updateLayout(key, layout),
              // No auto-dock for popups
              autoDock: false,
            };

            let content = null;
            switch (key) {
              case "mash":
                content = <Game />;
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
                content = <CreativeWizard />;
                break;
              case "about":
                content = (
                  <AboutWindow onOpenContact={() => openWindow("contact")} />
                );
                break;
              case "myspace":
                content = <MySpaceWindow />;
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
              case "videoLibrary":
                content = <VideoLibraryWindow />;
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
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        padding: 8,
                        background: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                        fontSize: 12,
                        color: "#374151",
                      }}
                    >
                      If the portfolio doesn’t load in this window, open it in a
                      new tab:{" "}
                      <a
                        href="https://www.the-visual-archive.com"
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#2563eb", fontWeight: 600 }}
                      >
                        the-visual-archive.com ↗
                      </a>
                    </div>
                    <iframe
                      src="https://www.the-visual-archive.com"
                      style={{ width: "100%", height: "100%", border: 0 }}
                      title="The Visual Archive"
                    />
                  </div>
                );
                break;
              case "adMaker":
                content = <SocialAdMakerWindow />;
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
        </div>

        {/* Taskbar */}
        <div
          style={{
            position: "fixed",
            bottom: 8,
            left: 12,
            right: 12,
            zIndex: 2000,
            transform: isMobile ? "scale(0.85)" : "scale(1)",
            transformOrigin: isMobile ? "center bottom" : "center bottom",
            transition: "transform 0.3s ease",
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
                {Object.keys(windows)
                  .filter((k) => !["ads", "instaAd", "newsletter"].includes(k))
                  .map((k) => {
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
              {/* Indicators tray (clock/date/weather + static wifi/battery) pinned to the right */}
              <div className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-md border border-white/5 text-white text-sm">
                {/* WiFi indicator */}
                <span
                  className="inline-flex items-center"
                  title="Wi‑Fi Connected"
                >
                  <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden>
                    <path
                      d="M1 4c4-4 10-4 14 0"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      opacity="0.4"
                    />
                    <path
                      d="M3 6c3-3 7-3 10 0"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.7"
                    />
                    <path
                      d="M5 8c2-2 4-2 6 0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    <circle cx="8" cy="10" r="1" fill="currentColor" />
                  </svg>
                </span>
                {/* Battery indicator */}
                <span className="inline-flex items-center" title="Battery 78%">
                  <svg width="22" height="12" viewBox="0 0 22 12" aria-hidden>
                    <rect
                      x="1"
                      y="2"
                      width="18"
                      height="8"
                      rx="2"
                      ry="2"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1"
                    />
                    <rect
                      x="2.5"
                      y="3.5"
                      width="13.5"
                      height="5"
                      rx="1"
                      fill="currentColor"
                      opacity="0.85"
                    />
                    <rect
                      x="19.5"
                      y="4"
                      width="2"
                      height="4"
                      rx="1"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="ml-1 text-xs">78%</span>
                </span>
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
    </div>
  );
}
