'use client';

import { useState } from 'react';
import { DigitalClock, WeatherWidget, LoadingScreen } from '@/components';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Windows Bliss-inspired background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
        {/* Rolling hills effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 200" className="w-full h-40 opacity-30">
            <path
              d="M0,100 C150,150 300,50 450,80 C600,110 750,60 900,90 C1050,120 1200,70 1200,70 L1200,200 L0,200 Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
          <svg viewBox="0 0 1200 200" className="w-full h-32 opacity-20 -mt-8">
            <path
              d="M0,120 C200,160 400,80 600,100 C800,120 1000,90 1200,110 L1200,200 L0,200 Z"
              fill="rgba(255,255,255,0.1)"
            />
          </svg>
        </div>
        
        {/* Cloud-like shapes */}
        <div className="absolute top-20 left-10 w-32 h-16 bg-white opacity-20 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-10 bg-white opacity-15 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 left-1/3 w-40 h-20 bg-white opacity-10 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }}></div>
        
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
              <span className="text-white font-medium">Something amazing is on the way.</span>
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

      {/* Ambient animations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  );
}
