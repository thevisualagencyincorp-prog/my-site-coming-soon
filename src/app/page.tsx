'use client';

import React, { useState, useEffect } from 'react';
import WindowManager, { WindowData } from '@/components/WindowManager';
import AboutWindow from '@/components/AboutWindow';
import PortfolioWindow from '@/components/PortfolioWindow';

export default function Home() {
  // State for day/night mode
  const [isDayTime, setIsDayTime] = useState(true);
  
  // State for current time display
  const [currentTime, setCurrentTime] = useState(new Date());

  // Initialize windows - customize these for your needs
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: 'about',
      title: 'About Agency',
      component: <AboutWindow />,
      icon: '🏢',
      defaultPosition: { x: 100, y: 100 },
      defaultSize: { width: 450, height: 400 },
      isOpen: false,
      zIndex: 1000,
    },
    {
      id: 'portfolio', 
      title: 'Portfolio',
      component: <PortfolioWindow />,
      icon: '💼',
      defaultPosition: { x: 200, y: 150 },
      defaultSize: { width: 500, height: 450 },
      isOpen: false,
      zIndex: 1001,
    },
  ]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto day/night based on time (or manual toggle)
  useEffect(() => {
    const hour = currentTime.getHours();
    setIsDayTime(hour >= 6 && hour < 18); // Day from 6 AM to 6 PM
  }, [currentTime]);

  // Handle window open/close
  const handleWindowClose = (windowId: string) => {
    setWindows(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, isOpen: false } : win
      )
    );
  };

  const handleWindowOpen = (windowId: string) => {
    setWindows(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, isOpen: true } : win
      )
    );
  };

  // Desktop icon click handlers
  const openWindow = (windowId: string) => {
    handleWindowOpen(windowId);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className={`
          absolute inset-0 desktop-bg transition-all duration-1000 ease-in-out
          ${isDayTime 
            ? 'bg-gradient-to-b from-blue-300 via-blue-200 to-green-300' 
            : 'bg-gradient-to-b from-gray-900 via-blue-900 to-gray-800'
          }
        `}
        style={{
          backgroundImage: isDayTime 
            ? `url('/background-day.svg')` 
            : `url('/background-night.svg')`,
        }}
      >
        {/* Day time elements */}
        {isDayTime && (
          <>
            <div className="absolute top-10 right-20 w-16 h-16 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
            <div className="absolute top-20 left-1/4 w-20 h-8 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-32 right-1/3 w-16 h-6 bg-white rounded-full opacity-70"></div>
          </>
        )}
        
        {/* Night time elements */}
        {!isDayTime && (
          <>
            <div className="absolute top-16 left-20 w-12 h-12 bg-yellow-100 rounded-full shadow-lg"></div>
            {/* Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 40}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              ></div>
            ))}
          </>
        )}
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-8 left-8 space-y-6 z-30">
        {/* Agency Info Icon */}
        <div
          onClick={() => openWindow('about')}
          className="flex flex-col items-center cursor-pointer group hover:bg-white hover:bg-opacity-20 p-2 rounded"
        >
          <div className="w-16 h-16 bg-pixel-window-bg border-2 border-pixel-window-border shadow-retro flex items-center justify-center text-2xl group-hover:shadow-retro-inset">
            🏢
          </div>
          <span className="text-white font-pixel text-xs mt-1 text-shadow-lg drop-shadow-md">
            About
          </span>
        </div>

        {/* Portfolio Icon */}
        <div
          onClick={() => openWindow('portfolio')}
          className="flex flex-col items-center cursor-pointer group hover:bg-white hover:bg-opacity-20 p-2 rounded"
        >
          <div className="w-16 h-16 bg-pixel-window-bg border-2 border-pixel-window-border shadow-retro flex items-center justify-center text-2xl group-hover:shadow-retro-inset">
            💼
          </div>
          <span className="text-white font-pixel text-xs mt-1 text-shadow-lg drop-shadow-md">
            Portfolio
          </span>
        </div>

        {/* Day/Night Toggle Icon */}
        <div
          onClick={() => setIsDayTime(!isDayTime)}
          className="flex flex-col items-center cursor-pointer group hover:bg-white hover:bg-opacity-20 p-2 rounded"
          title="Toggle Day/Night"
        >
          <div className="w-16 h-16 bg-pixel-window-bg border-2 border-pixel-window-border shadow-retro flex items-center justify-center text-2xl group-hover:shadow-retro-inset">
            {isDayTime ? '🌙' : '☀️'}
          </div>
          <span className="text-white font-pixel text-xs mt-1 text-shadow-lg drop-shadow-md">
            {isDayTime ? 'Night' : 'Day'}
          </span>
        </div>

        {/* Add more desktop icons here for expansion */}
        {/*
          EXPANSION SLOTS - Add more desktop icons:
          
          - 🎮 Games folder
          - 📧 Contact form
          - 📊 Analytics dashboard  
          - 🛠️ Settings/Preferences
          - 📁 File manager
          - 🎨 Design tools
          - 💬 Chat/Support
        */}
      </div>

      {/* System Clock */}
      <div className="absolute top-4 right-4 bg-pixel-gray-dark bg-opacity-80 text-white px-3 py-1 border border-pixel-window-border font-pixel text-xs">
        {currentTime.toLocaleTimeString()} | {currentTime.toLocaleDateString()}
      </div>

      {/* Welcome Message */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <div className="bg-pixel-window-bg bg-opacity-95 border-2 border-pixel-window-border shadow-retro p-8 max-w-md">
          <h1 className="font-pixel-title text-pixel-blue-win mb-4">
            🚀 AGENCY OS v1.0
          </h1>
          <p className="font-pixel text-sm text-pixel-gray-dark mb-4 leading-relaxed">
            Welcome to our immersive agency experience. Click desktop icons to explore our services and portfolio.
          </p>
          <div className="flex gap-2 justify-center">
            <button 
              onClick={() => openWindow('about')}
              className="btn-retro"
            >
              Learn More
            </button>
            <button 
              onClick={() => openWindow('portfolio')}
              className="btn-retro"
            >
              View Work
            </button>
          </div>
        </div>
      </div>

      {/* Window Manager - handles all draggable windows */}
      <WindowManager
        windows={windows}
        onWindowClose={handleWindowClose}
        onWindowOpen={handleWindowOpen}
        className="z-20"
      />

      {/* Footer Info */}
      <div className="absolute bottom-16 left-4 text-white font-pixel text-xs bg-black bg-opacity-50 px-2 py-1 rounded">
        <p>🎨 Built with Next.js + Tailwind CSS</p>
        <p className="mt-1">
          {isDayTime ? '🌅 Day Mode' : '🌙 Night Mode'} | 
          <span className="ml-2 animate-cursor-blink">█</span>
        </p>
      </div>

      {/*
        CUSTOMIZATION NOTES:
        
        1. Replace placeholder backgrounds in /public with your pixel art
        2. Update window content in AboutWindow and PortfolioWindow components  
        3. Add more desktop icons by expanding the icons array
        4. Customize colors in tailwind.config.ts
        5. Add sound effects for authentic retro feel
        6. Implement additional windows (Contact, Games, etc.)
        7. Add loading screens and boot-up sequences
        8. Connect to real APIs for dynamic content
        
        EXPANSION IDEAS:
        - Add file manager with project files
        - Implement retro games (Snake, Tetris, etc.)
        - Add music player with chiptune tracks
        - Create settings panel for customization
        - Add screensaver functionality
        - Implement multi-user/visitor tracking
        - Add easter eggs and hidden features
      */}
    </div>
  );
}
