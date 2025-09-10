"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import {
  DigitalClockOnlyDate,
  DigitalClockOnlyTime,
  WeatherWidgetTaskbar,
  DesktopWindow,
  StartMenu,
  AOLMessenger,
  AboutWindow,
  FAQWindow,
  MASHGame,
  MetricsWindow,
  SkeletonDanceWindow,
  FunnyCatWindow,
  VirusAlertWindow,
  BSODWindow,
  StickyNotesWindow,
  ClippyWindow,
  InstagramPostsWindow,
  VibeCheckWindow,
  NewsletterWindow,
  MysteryMurderClubWaitlistWindow,
  CoffeeClubWaitlistWindow,
  CreativeWizard,
  LoadingScreen,
} from "@/components";

type WindowKey =
  | "mash"
  | "aol"
  | "instagram"
  | "ads"
  | "contact"
  | "faq"
  | "about"
  | "creative"
  | "metrics"
  | "skeleton"
  | "cat"
  | "virus"
  | "bsod"
  | "notes"
  | "clippy"
  | "instagramPosts"
  | "vibeCheck"
  | "newsletter"
  | "mysteryClub"
  | "coffeeClub";
const taskbarWindows: { key: WindowKey; icon: string; label: string }[] = [
  { key: "mash", icon: "/images/cd.webp", label: "MASH Game" },
  { key: "aol", icon: "/images/ai.webp", label: "AOL Messenger" },
  { key: "instagram", icon: "/images/battery.webp", label: "Instagram" },
  { key: "ads", icon: "/images/blutooth.webp", label: "Ads" },
  { key: "contact", icon: "/images/ai.webp", label: "Contact" },
  { key: "faq", icon: "/images/ai.webp", label: "FAQ" },
  { key: "about", icon: "/images/ai.webp", label: "About Us" },
  { key: "creative", icon: "/images/ai.webp", label: "Creative Wizard" },
  { key: "metrics", icon: "/images/ai.webp", label: "Agency Metrics" },
  { key: "skeleton", icon: "/images/ai.webp", label: "Skeleton Dance" },
  { key: "cat", icon: "/images/ai.webp", label: "Funny Cats" },
  { key: "virus", icon: "/images/ai.webp", label: "Virus Alert" },
  { key: "bsod", icon: "/images/ai.webp", label: "BSOD" },
  { key: "notes", icon: "/images/ai.webp", label: "Sticky Notes" },
  { key: "clippy", icon: "/images/ai.webp", label: "Clippy" },
  {
    key: "instagramPosts",
    icon: "/images/battery.webp",
    label: "Instagram Posts",
  },
  { key: "vibeCheck", icon: "/images/ai.webp", label: "Vibe Check" },
  { key: "newsletter", icon: "/images/ai.webp", label: "Newsletter" },
  { key: "mysteryClub", icon: "/images/ai.webp", label: "Mystery Club" },
  { key: "coffeeClub", icon: "/images/ai.webp", label: "Coffee Club" },
];

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openWindows, setOpenWindows] = useState<Record<WindowKey, boolean>>({
    mash: false,
    aol: false,
    instagram: false,
    ads: false,
    contact: false,
    faq: false,
    about: false,
    creative: false,
    metrics: false,
    skeleton: false,
    cat: false,
    virus: false,
    bsod: false,
    notes: false,
    clippy: false,
    instagramPosts: false,
    vibeCheck: false,
    newsletter: false,
    mysteryClub: false,
    coffeeClub: false,
  });

  const [minimizedWindows, setMinimizedWindows] = useState<Record<WindowKey, boolean>>({
    mash: false,
    aol: false,
    instagram: false,
    ads: false,
    contact: false,
    faq: false,
    about: false,
    creative: false,
    metrics: false,
    skeleton: false,
    cat: false,
    virus: false,
    bsod: false,
    notes: false,
    clippy: false,
    instagramPosts: false,
    vibeCheck: false,
    newsletter: false,
    mysteryClub: false,
    coffeeClub: false,
  });

  const [maximizedWindows, setMaximizedWindows] = useState<Record<WindowKey, boolean>>({
    mash: false,
    aol: false,
    instagram: false,
    ads: false,
    contact: false,
    faq: false,
    about: false,
    creative: false,
    metrics: false,
    skeleton: false,
    cat: false,
    virus: false,
    bsod: false,
    notes: false,
    clippy: false,
    instagramPosts: false,
    vibeCheck: false,
    newsletter: false,
    mysteryClub: false,
    coffeeClub: false,
  });

  const handleOpenWindow = (key: WindowKey) => {
    setOpenWindows((prev) => ({ ...prev, [key]: true }));
    setMinimizedWindows((prev) => ({ ...prev, [key]: false })); // Restore if minimized
  };

  const handleCloseWindow = (key: WindowKey) => {
    setOpenWindows((prev) => ({ ...prev, [key]: false }));
    setMinimizedWindows((prev) => ({ ...prev, [key]: false }));
    setMaximizedWindows((prev) => ({ ...prev, [key]: false }));
  };

  const handleMinimizeWindow = (key: WindowKey) => {
    setMinimizedWindows((prev) => ({ ...prev, [key]: true }));
  };

  const handleMaximizeWindow = (key: WindowKey) => {
    setMaximizedWindows((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const handleOpenFAQ = () => {
      setOpenWindows((prev) => ({ ...prev, faq: true }));
    };

    const handleOpenAOL = () => {
      setOpenWindows((prev) => ({ ...prev, aol: true }));
    };

    const handleOpenMASH = () => {
      setOpenWindows((prev) => ({ ...prev, mash: true }));
    };

    const handleOpenAbout = () => {
      setOpenWindows((prev) => ({ ...prev, about: true }));
    };

    const handleOpenCreative = () => {
      setOpenWindows((prev) => ({ ...prev, creative: true }));
    };

    const handleOpenMetrics = () => {
      setOpenWindows((prev) => ({ ...prev, metrics: true }));
    };

    const handleOpenSkeleton = () => {
      setOpenWindows((prev) => ({ ...prev, skeleton: true }));
    };

    const handleOpenCat = () => {
      setOpenWindows((prev) => ({ ...prev, cat: true }));
    };

    const handleOpenVirus = () => {
      setOpenWindows((prev) => ({ ...prev, virus: true }));
    };

    const handleOpenBSOD = () => {
      setOpenWindows((prev) => ({ ...prev, bsod: true }));
    };

    const handleCloseBSOD = () => {
      setOpenWindows((prev) => ({ ...prev, bsod: false }));
    };

    const handleOpenNotes = () => {
      setOpenWindows((prev) => ({ ...prev, notes: true }));
    };

    const handleOpenClippy = () => {
      setOpenWindows((prev) => ({ ...prev, clippy: true }));
    };

    const handleOpenInstagramPosts = () => {
      setOpenWindows((prev) => ({ ...prev, instagramPosts: true }));
    };

    const handleOpenVibeCheck = () => {
      setOpenWindows((prev) => ({ ...prev, vibeCheck: true }));
    };

    const handleOpenNewsletter = () => {
      setOpenWindows((prev) => ({ ...prev, newsletter: true }));
    };

    const handleOpenMysteryClub = () => {
      setOpenWindows((prev) => ({ ...prev, mysteryClub: true }));
    };

    const handleOpenCoffeeClub = () => {
      setOpenWindows((prev) => ({ ...prev, coffeeClub: true }));
    };

    // Set fadeIn to true after component mounts
    setFadeIn(true);

    window.addEventListener("openFAQWindow", handleOpenFAQ);
    window.addEventListener("openAOLWindow", handleOpenAOL);
    window.addEventListener("openMASHWindow", handleOpenMASH);
    window.addEventListener("openAboutWindow", handleOpenAbout);
    window.addEventListener("openCreativeWindow", handleOpenCreative);
    window.addEventListener("openMetricsWindow", handleOpenMetrics);
    window.addEventListener("openSkeletonWindow", handleOpenSkeleton);
    window.addEventListener("openCatWindow", handleOpenCat);
    window.addEventListener("openVirusWindow", handleOpenVirus);
    window.addEventListener("openBSODWindow", handleOpenBSOD);
    window.addEventListener("closeBSODWindow", handleCloseBSOD);
    window.addEventListener("openNotesWindow", handleOpenNotes);
    window.addEventListener("openClippyWindow", handleOpenClippy);
    window.addEventListener(
      "openInstagramPostsWindow",
      handleOpenInstagramPosts
    );
    window.addEventListener("openVibeCheckWindow", handleOpenVibeCheck);
    window.addEventListener("openNewsletterWindow", handleOpenNewsletter);
    window.addEventListener("openMysteryClubWindow", handleOpenMysteryClub);
    window.addEventListener("openCoffeeClubWindow", handleOpenCoffeeClub);

    return () => {
      window.removeEventListener("openFAQWindow", handleOpenFAQ);
      window.removeEventListener("openAOLWindow", handleOpenAOL);
      window.removeEventListener("openMASHWindow", handleOpenMASH);
      window.removeEventListener("openAboutWindow", handleOpenAbout);
      window.removeEventListener("openCreativeWindow", handleOpenCreative);
      window.removeEventListener("openMetricsWindow", handleOpenMetrics);
      window.removeEventListener("openSkeletonWindow", handleOpenSkeleton);
      window.removeEventListener("openCatWindow", handleOpenCat);
      window.removeEventListener("openVirusWindow", handleOpenVirus);
      window.removeEventListener("openBSODWindow", handleOpenBSOD);
      window.removeEventListener("closeBSODWindow", handleCloseBSOD);
      window.removeEventListener("openNotesWindow", handleOpenNotes);
      window.removeEventListener("openClippyWindow", handleOpenClippy);
      window.removeEventListener(
        "openInstagramPostsWindow",
        handleOpenInstagramPosts
      );
      window.removeEventListener("openVibeCheckWindow", handleOpenVibeCheck);
      window.removeEventListener("openNewsletterWindow", handleOpenNewsletter);
      window.removeEventListener(
        "openMysteryClubWindow",
        handleOpenMysteryClub
      );
      window.removeEventListener("openCoffeeClubWindow", handleOpenCoffeeClub);
    };
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Head>
        <title>
          The Agency OS™ | Digital Agency, Web Development, Branding, Creative,
          Marketing, SEO
        </title>
        <meta
          name="description"
          content="The Agency OS™ is a retro Windows-inspired digital agency landing page. Web development, branding, creative, marketing, SEO, social media, Instagram, AOL, MASH, Y2K, Windows 98, coming soon, contact, advertising, FAQ, help, best digital agency, top creative agency, web design, UI/UX, interactive, immersive, mobile optimized, responsive, modern, innovative."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="keywords"
          content="digital agency, web development, branding, creative agency, marketing, SEO, social media, Instagram, AOL, MASH, retro web design, Y2K, Windows 98, coming soon, contact, advertising, FAQ, help, best digital agency, top creative agency, web design, UI/UX, interactive, immersive, mobile optimized, responsive, modern, innovative, The Agency OS"
        />
      </Head>
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Background Image */}
        <img
          src="/images/Background:day.png"
          alt="Desktop Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: "none" }}
        />
        {/* SEO: Hidden keywords for user search terms */}
        <div style={{ display: "none" }}>
          digital agency, web development, branding, creative agency, marketing,
          SEO, social media, Instagram, AOL, MASH, retro web design, Y2K,
          Windows 98, coming soon, contact, advertising, FAQ, help, best digital
          agency, top creative agency, web design, UI/UX, interactive,
          immersive, mobile optimized, responsive, modern, innovative, The
          Agency OS
        </div>
        {/* Desktop App Windows */}
        {openWindows.mash && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="MASH Game - Agency Destiny Generator"
              initialPosition={{ x: 120, y: 80 }}
              width={500}
              height={400}
              zIndex={20}
              onClose={() => handleCloseWindow("mash")}
              onMinimize={() => handleMinimizeWindow("mash")}
              onMaximize={() => handleMaximizeWindow("mash")}
              minimized={minimizedWindows.mash}
              maximized={maximizedWindows.mash}
            >
              <MASHGame />
            </DesktopWindow>
          </div>
        )}
        {openWindows.aol && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="AOL Instant Messenger"
              initialPosition={{ x: 600, y: 120 }}
              width={800}
              height={500}
              zIndex={21}
              onClose={() => handleCloseWindow("aol")}
              onMinimize={() => handleMinimizeWindow("aol")}
              onMaximize={() => handleMaximizeWindow("aol")}
              minimized={minimizedWindows.aol}
              maximized={maximizedWindows.aol}
            >
              <AOLMessenger />
            </DesktopWindow>
          </div>
        )}
        {openWindows.instagram && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Instagram"
              initialPosition={{ x: 900, y: 180 }}
              width={340}
              height={300}
              zIndex={22}
              onClose={() => handleCloseWindow("instagram")}
              onMinimize={() => handleMinimizeWindow("instagram")}
              onMaximize={() => handleMaximizeWindow("instagram")}
              minimized={minimizedWindows.instagram}
              maximized={maximizedWindows.instagram}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/images/battery.webp"
                  alt="Instagram"
                  className="w-12 h-12 mb-2"
                />
                <h2 className="text-lg font-bold mb-2">Instagram</h2>
                <p className="text-sm text-center">
                  Instagram feed or content goes here.
                </p>
              </div>
            </DesktopWindow>
          </div>
        )}
        {openWindows.ads && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Ads"
              initialPosition={{ x: 320, y: 400 }}
              width={320}
              height={180}
              zIndex={23}
              onClose={() => handleCloseWindow("ads")}
              onMinimize={() => handleMinimizeWindow("ads")}
              onMaximize={() => handleMaximizeWindow("ads")}
              minimized={minimizedWindows.ads}
              maximized={maximizedWindows.ads}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <img
                  src="/images/blutooth.webp"
                  alt="Ads"
                  className="w-12 h-12 mb-2"
                />
                <h2 className="text-lg font-bold mb-2">Ads</h2>
                <p className="text-sm text-center">
                  Ad content or banners go here.
                </p>
              </div>
            </DesktopWindow>
          </div>
        )}
        {openWindows.contact && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Contact"
              initialPosition={{ x: 1200, y: 320 }}
              width={800}
              height={500}
              zIndex={25}
              onClose={() => handleCloseWindow("contact")}
              onMinimize={() => handleMinimizeWindow("contact")}
              onMaximize={() => handleMaximizeWindow("contact")}
              minimized={minimizedWindows.contact}
              maximized={maximizedWindows.contact}
            >
              <AOLMessenger />
            </DesktopWindow>
          </div>
        )}
        {openWindows.faq && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Help & FAQ - The Agency OS™"
              initialPosition={{ x: 800, y: 200 }}
              width={500}
              height={450}
              zIndex={26}
              onClose={() => handleCloseWindow("faq")}
              onMinimize={() => handleMinimizeWindow("faq")}
              onMaximize={() => handleMaximizeWindow("faq")}
              minimized={minimizedWindows.faq}
              maximized={maximizedWindows.faq}
            >
              <FAQWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.about && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="About The Agency OS™"
              initialPosition={{ x: 150, y: 150 }}
              width={450}
              height={400}
              zIndex={27}
              onClose={() => handleCloseWindow("about")}
              onMinimize={() => handleMinimizeWindow("about")}
              onMaximize={() => handleMaximizeWindow("about")}
              minimized={minimizedWindows.about}
              maximized={maximizedWindows.about}
            >
              <AboutWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.creative && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Creative Wizard - Project Setup Assistant"
              initialPosition={{ x: 250, y: 100 }}
              width={550}
              height={500}
              zIndex={28}
              onClose={() => handleCloseWindow("creative")}
              onMinimize={() => handleMinimizeWindow("creative")}
              onMaximize={() => handleMaximizeWindow("creative")}
              minimized={minimizedWindows.creative}
              maximized={maximizedWindows.creative}
            >
              <CreativeWizard />
            </DesktopWindow>
          </div>
        )}
        {openWindows.metrics && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Agency Metrics Dashboard"
              initialPosition={{ x: 350, y: 200 }}
              width={500}
              height={450}
              zIndex={29}
            >
              <MetricsWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.skeleton && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Skeleton Dance Party 🎭💀"
              initialPosition={{ x: 450, y: 250 }}
              width={450}
              height={400}
              zIndex={30}
            >
              <SkeletonDanceWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.cat && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Funny Cat Video Loop 🐱📹"
              initialPosition={{ x: 550, y: 300 }}
              width={450}
              height={400}
              zIndex={31}
              onClose={() => handleCloseWindow("cat")}
              onMinimize={() => handleMinimizeWindow("cat")}
              onMaximize={() => handleMaximizeWindow("cat")}
              minimized={minimizedWindows.cat}
              maximized={maximizedWindows.cat}
            >
              <FunnyCatWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.virus && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="⚠️ Security Alert - System Compromised"
              initialPosition={{ x: 650, y: 350 }}
              width={450}
              height={400}
              zIndex={32}
              onClose={() => handleCloseWindow("virus")}
              onMinimize={() => handleMinimizeWindow("virus")}
              onMaximize={() => handleMaximizeWindow("virus")}
              minimized={minimizedWindows.virus}
              maximized={maximizedWindows.virus}
            >
              <VirusAlertWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.bsod && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Windows - System Error"
              initialPosition={{ x: 750, y: 400 }}
              width={600}
              height={400}
              zIndex={33}
              onClose={() => handleCloseWindow("bsod")}
              onMinimize={() => handleMinimizeWindow("bsod")}
              onMaximize={() => handleMaximizeWindow("bsod")}
              minimized={minimizedWindows.bsod}
              maximized={maximizedWindows.bsod}
            >
              <BSODWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.notes && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Sticky Notes - Digital Notepad"
              initialPosition={{ x: 850, y: 450 }}
              width={600}
              height={500}
              zIndex={34}
              onClose={() => handleCloseWindow("notes")}
              onMinimize={() => handleMinimizeWindow("notes")}
              onMaximize={() => handleMaximizeWindow("notes")}
              minimized={minimizedWindows.notes}
              maximized={maximizedWindows.notes}
            >
              <StickyNotesWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.clippy && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Clippy - Your Digital Assistant"
              initialPosition={{ x: 950, y: 500 }}
              width={400}
              height={300}
              zIndex={35}
              onClose={() => handleCloseWindow("clippy")}
              onMinimize={() => handleMinimizeWindow("clippy")}
              onMaximize={() => handleMaximizeWindow("clippy")}
              minimized={minimizedWindows.clippy}
              maximized={maximizedWindows.clippy}
            >
              <ClippyWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.instagramPosts && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Instagram Posts - Latest Feed"
              initialPosition={{ x: 200, y: 150 }}
              width={600}
              height={500}
              zIndex={36}
              onClose={() => handleCloseWindow("instagramPosts")}
              onMinimize={() => handleMinimizeWindow("instagramPosts")}
              onMaximize={() => handleMaximizeWindow("instagramPosts")}
              minimized={minimizedWindows.instagramPosts}
              maximized={maximizedWindows.instagramPosts}
            >
              <InstagramPostsWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.vibeCheck && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Vibe Check - Creative Energy Assessment"
              initialPosition={{ x: 300, y: 200 }}
              width={500}
              height={450}
              zIndex={37}
              onClose={() => handleCloseWindow("vibeCheck")}
              onMinimize={() => handleMinimizeWindow("vibeCheck")}
              onMaximize={() => handleMaximizeWindow("vibeCheck")}
              minimized={minimizedWindows.vibeCheck}
              maximized={maximizedWindows.vibeCheck}
            >
              <VibeCheckWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.newsletter && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Monthly Tips & Trends Newsletter"
              initialPosition={{ x: 400, y: 250 }}
              width={550}
              height={500}
              zIndex={38}
              onClose={() => handleCloseWindow("newsletter")}
              onMinimize={() => handleMinimizeWindow("newsletter")}
              onMaximize={() => handleMaximizeWindow("newsletter")}
              minimized={minimizedWindows.newsletter}
              maximized={maximizedWindows.newsletter}
            >
              <NewsletterWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.mysteryClub && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Mystery/Murder Club Waitlist"
              initialPosition={{ x: 500, y: 300 }}
              width={600}
              height={550}
              zIndex={39}
              onClose={() => handleCloseWindow("mysteryClub")}
              onMinimize={() => handleMinimizeWindow("mysteryClub")}
              onMaximize={() => handleMaximizeWindow("mysteryClub")}
              minimized={minimizedWindows.mysteryClub}
              maximized={maximizedWindows.mysteryClub}
            >
              <MysteryMurderClubWaitlistWindow />
            </DesktopWindow>
          </div>
        )}
        {openWindows.coffeeClub && (
          <div
            className={`animate-desktop-pop ${
              fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } transition-all duration-700`}
          >
            <DesktopWindow
              title="Coffee Club Waitlist - Cowork & Network"
              initialPosition={{ x: 600, y: 350 }}
              width={600}
              height={550}
              zIndex={40}
              onClose={() => handleCloseWindow("coffeeClub")}
              onMinimize={() => handleMinimizeWindow("coffeeClub")}
              onMaximize={() => handleMaximizeWindow("coffeeClub")}
              minimized={minimizedWindows.coffeeClub}
              maximized={maximizedWindows.coffeeClub}
            >
              <CoffeeClubWaitlistWindow />
            </DesktopWindow>
          </div>
        )}
        {/* Windows-style Taskbar */}

        {/* Windows-style Taskbar */}
        <div
          className="fixed bottom-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2"
          style={{
            background: "rgba(24, 24, 28, 0.85)",
            borderTop: "1.5px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 16px 0 rgba(0,0,0,0.25)",
            height: "54px",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Start Button */}
          <button
            className="flex items-center gap-3 px-6 h-12 rounded-l-xl rounded-r-3xl bg-gradient-to-b from-[#4CAF50] to-[#357A38] border-2 border-[#1B5E20] shadow-xl hover:brightness-110 active:brightness-90 transition-all duration-200 focus:outline-none select-none"
            style={{
              fontFamily: "Tahoma, Geneva, Verdana, sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: 0.5,
              boxShadow: "0 4px 12px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
              background: "linear-gradient(180deg, #4CAF50 0%, #357A38 100%)",
            }}
            onClick={() => setStartOpen((v) => !v)}
            aria-label="Open Start Menu"
          >
            <img
              src="/images/ai.webp"
              alt="Start logo"
              className="w-7 h-7 drop-shadow"
              style={{ filter: "drop-shadow(0 1px 0 #fff)" }}
            />
            <span
              style={{
                color: "#fff",
                textShadow: "1px 1px 0 #000, 0 1px 0 #000",
                fontSize: "16px",
              }}
            >
              Start
            </span>
          </button>
          {/* Start Menu */}
          <StartMenu
            open={startOpen}
            onClose={() => setStartOpen(false)}
            onOpenWindow={handleOpenWindow}
          />
          {/* Taskbar Icons */}
          <div className="flex-1 flex items-center gap-2 ml-4">
            {/* Use custom icons for each window */}
            {taskbarWindows.map((item) => (
              <button
                key={item.key}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition border border-transparent focus:outline-none ${
                  openWindows[item.key] && !minimizedWindows[item.key]
                    ? "bg-white/20 border-white/30"
                    : openWindows[item.key] && minimizedWindows[item.key]
                    ? "bg-white/10 border-white/20 opacity-60"
                    : "hover:bg-white/10"
                }`}
                aria-label={item.label}
                onClick={() => {
                  if (openWindows[item.key]) {
                    // If window is open, toggle minimize/restore
                    if (minimizedWindows[item.key]) {
                      // Restore minimized window
                      setMinimizedWindows((prev) => ({ ...prev, [item.key]: false }));
                    } else {
                      // Minimize window
                      setMinimizedWindows((prev) => ({ ...prev, [item.key]: true }));
                    }
                  } else {
                    // Open window
                    handleOpenWindow(item.key);
                  }
                }}
              >
                <img src={item.icon} alt={item.label} className="w-6 h-6" />
              </button>
            ))}
          </div>
          {/* System Tray: Date, Weather, Time */}
          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-4 py-1 border border-white/10 shadow-sm">
            {/* Date */}
            <div className="hidden md:block text-white/90 text-xs font-mono px-2">
              <DigitalClockOnlyDate />
            </div>
            {/* Weather */}
            <div className="flex items-center gap-1 text-white/90 text-xs px-2">
              <WeatherWidgetTaskbar />
            </div>
            {/* Time */}
            <div className="text-white/90 text-base font-mono px-2">
              <DigitalClockOnlyTime />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
