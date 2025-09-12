'use client';

import { useState, useEffect } from 'react';
import { TimeData } from '@/types';

export function DigitalClock() {
  const [timeData, setTimeData] = useState<TimeData>({
    time: '',
    date: '',
    timezone: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time in 12-hour format
      const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      
      // Format date
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      
      // Get timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      
      setTimeData({
        time: now.toLocaleTimeString('en-US', timeOptions),
        date: now.toLocaleDateString('en-US', dateOptions),
        timezone: timezone.replace('_', ' '),
      });
    };

    // Update immediately
    updateTime();
    
    // Update every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center space-y-2">
      <div className="text-6xl md:text-8xl font-bold text-white font-mono tracking-wider drop-shadow-lg">
        {timeData.time}
      </div>
      <div className="text-xl md:text-2xl text-white/90 font-medium">
        {timeData.date}
      </div>
      <div className="text-sm md:text-base text-white/70">
        {timeData.timezone}
      </div>
    </div>
  );
}