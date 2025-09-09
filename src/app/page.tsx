"use client";

import { useState, useEffect } from "react";
import {
  DigitalClock,
  WeatherWidget,
  LoadingScreen,
  DigitalClockOnlyDate,
  DigitalClockOnlyTime,
  WeatherWidgetTaskbar,
} from "@/components";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setFadeIn(true), 100); // Small delay to ensure smooth transition
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div
      className={`transition-opacity duration-1000 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="min-h-screen relative overflow-hidden">
        {/* Windows Bliss-inspired background */}
        <div className="absolute inset-0">
          {/* Background image */}
          <img
            src="/images/Background:day.png"
            alt="Background Day"
            className="absolute inset-0 w-full h-full object-cover z-0"
            style={{ pointerEvents: "none" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 opacity-80 z-10" />
          {/* Rolling hills effect */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1200 200" className="w-full h-40 opacity-30">
              <path
                d="M0,100 C150,150 300,50 450,80 C600,110 750,60 900,90 C1050,120 1200,70 1200,70 L1200,200 L0,200 Z"
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
            <svg
              viewBox="0 0 1200 200"
              className="w-full h-32 opacity-20 -mt-8"
            >
              <path
                d="M0,120 C200,160 400,80 600,100 C800,120 1000,90 1200,110 L1200,200 L0,200 Z"
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
          </div>

          {/* Cloud-like shapes */}
          <div className="absolute top-20 left-10 w-32 h-16 bg-white opacity-20 rounded-full blur-sm animate-pulse"></div>
          <div
            className="absolute top-32 right-20 w-24 h-10 bg-white opacity-15 rounded-full blur-sm animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-40 left-1/3 w-40 h-20 bg-white opacity-10 rounded-full blur-md animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="text-8xl mb-4 animate-pulse">🌟</div>
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-wide">
                The Agency
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 font-light tracking-wide drop-shadow-lg">
                Coming Soon
              </p>
            </div>

            {/* Subtitle with scumner.world inspired style */}
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 max-w-2xl mx-auto">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                Experience the future of digital innovation.
                <br />
                <span className="text-white font-medium">
                  Something amazing is on the way.
                </span>
              </p>
            </div>
          </div>

          {/* Time and Weather Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl w-full">
            {/* Clock Section */}
            <div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <DigitalClock />
            </div>

            {/* Weather Section */}
            <div className="flex items-center justify-center">
              <WeatherWidget />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 inline-block">
              <p className="text-white/90 mb-4">Stay tuned for updates</p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Notify Me
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Sections for Multi-Page Feel */}
        <div className="relative z-10 w-full px-8 py-16 space-y-16">
          {/* About Section */}
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              About The Agency
            </h2>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-4">
                We are a cutting-edge digital agency specializing in innovative
                solutions for the modern world. Our team combines creativity
                with technology to deliver exceptional results.
              </p>
              <p className="text-white/60 text-base">
                From web development to branding, we're here to elevate your
                digital presence.
              </p>
            </div>
          </section>

          {/* Services Section */}
          <section className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center drop-shadow-lg">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/30 transition-all duration-300 hover:scale-105 flex flex-col items-center">
                <img
                  src="/images/ai.webp"
                  alt="AI Icon"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Web Development
                </h3>
                <p className="text-white/70">
                  Custom websites and apps built with the latest technologies.
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/30 transition-all duration-300 hover:scale-105 flex flex-col items-center">
                <img
                  src="/images/battery.webp"
                  alt="Battery Icon"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Design & Branding
                </h3>
                <p className="text-white/70">
                  Stunning visuals and brand identities that stand out.
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-black/30 transition-all duration-300 hover:scale-105 flex flex-col items-center">
                <img
                  src="/images/blutooth.webp"
                  alt="Bluetooth Icon"
                  className="w-16 h-16 mb-4"
                />
                <h3 className="text-2xl font-semibold text-white mb-2">
                  Digital Marketing
                </h3>
                <p className="text-white/70">
                  Strategies to grow your online presence and reach.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Get In Touch
            </h2>
            <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <p className="text-white/80 text-lg mb-6">
                Ready to start your project? Let's talk.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 hover:from-purple-600/80 hover:to-pink-600/80 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Ambient animations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.5s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

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
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 shadow-lg transition-all duration-200 focus:outline-none"
            style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.18)" }}
          >
            <img src="/images/folder.webp" alt="Start" className="w-6 h-6" />
          </button>
          {/* Spacer */}
          <div className="flex-1"></div>
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
    </div>
  );
}
