'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    'Initializing...',
    'Loading components...',
    'Connecting to services...',
    'Preparing your experience...',
    'Almost ready...',
  ];

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds
    const stepDuration = totalDuration / 100;
    let currentProgress = 0;

    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);
      
      // Update step based on progress
      const stepIndex = Math.floor((currentProgress / 100) * loadingSteps.length);
      setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete, loadingSteps.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Loading content */}
      <div className="text-center z-10">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
            <div 
              className="absolute inset-0 border-4 border-white border-t-transparent rounded-full animate-spin"
              style={{ animationDuration: '1s' }}
            ></div>
            <div className="absolute inset-2 flex items-center justify-center">
              <span className="text-2xl">🌟</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">The Agency</h1>
          <p className="text-white/80">Coming Soon</p>
        </div>

        {/* Progress bar */}
        <div className="w-80 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/90 text-sm">{Math.round(progress)}%</div>
        </div>

        {/* Loading step */}
        <div className="text-white/90 text-lg font-medium animate-pulse">
          {loadingSteps[currentStep]}
        </div>
      </div>
    </div>
  );
}