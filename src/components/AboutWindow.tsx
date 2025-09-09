'use client';

import React from 'react';

// About window content component
const AboutWindow: React.FC = () => {
  return (
    <div className="font-pixel text-sm leading-relaxed">
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-pixel-window-border pb-2">
        <h2 className="text-lg font-bold text-pixel-blue-win">
          🏢 About Our Agency
        </h2>
        <p className="text-xs text-pixel-gray-dark mt-1">
          Digital Innovation • Creative Excellence
        </p>
      </div>

      {/* Main content */}
      <div className="space-y-4">
        {/* Mission section */}
        <div className="bg-pixel-gray-light p-3 border border-pixel-window-border shadow-retro-inset">
          <h3 className="font-bold text-pixel-blue-win mb-2">🎯 Our Mission</h3>
          <p className="text-xs">
            We craft pixel-perfect digital experiences that blend retro aesthetics 
            with cutting-edge technology. Our agency specializes in creating immersive, 
            nostalgic interfaces that capture the magic of classic computing while 
            delivering modern functionality.
          </p>
        </div>

        {/* Services section */}
        <div className="bg-pixel-gray-light p-3 border border-pixel-window-border shadow-retro-inset">
          <h3 className="font-bold text-pixel-blue-win mb-2">⚙️ Services</h3>
          <ul className="text-xs space-y-1">
            <li>• 🎨 Pixel Art & Retro Design</li>
            <li>• 💻 Custom Web Development</li>
            <li>• 🎮 Interactive Experiences</li>
            <li>• 📱 Responsive UI/UX Design</li>
            <li>• 🚀 Brand Identity & Strategy</li>
          </ul>
        </div>

        {/* Team section */}
        <div className="bg-pixel-gray-light p-3 border border-pixel-window-border shadow-retro-inset">
          <h3 className="font-bold text-pixel-blue-win mb-2">👥 Our Team</h3>
          <div className="text-xs space-y-2">
            <div className="border-l-2 border-pixel-blue-win pl-2">
              <strong>Creative Director</strong><br />
              Pixel art enthusiast with 10+ years in digital design
            </div>
            <div className="border-l-2 border-green-500 pl-2">
              <strong>Lead Developer</strong><br />
              Full-stack wizard specializing in retro web experiences
            </div>
            <div className="border-l-2 border-purple-500 pl-2">
              <strong>UX Designer</strong><br />
              Expert in nostalgic user interfaces and interaction design
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-pixel-blue-win text-white p-3 border border-pixel-window-border shadow-retro">
          <p className="text-xs font-bold">Ready to create something amazing?</p>
          <div className="mt-2 space-x-2">
            <button className="px-3 py-1 bg-white text-pixel-blue-win border border-pixel-window-border text-xs font-bold hover:bg-pixel-gray-light">
              📧 Contact Us
            </button>
            <button className="px-3 py-1 bg-green-500 text-white border border-pixel-window-border text-xs font-bold hover:bg-green-600">
              💼 View Portfolio
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-xs text-pixel-gray-dark border-t border-pixel-window-border pt-2">
          <p>🎮 Powered by nostalgia & caffeine since 2024</p>
          <p className="mt-1">
            <span className="animate-cursor-blink">█</span> Ready for your next project
          </p>
        </div>
      </div>

      {/* Customization slots - commented for easy expansion */}
      {/*
        CUSTOMIZATION SLOTS:
        
        1. Replace mission text with your actual agency mission
        2. Update services list with your specific offerings
        3. Add real team member information and photos
        4. Update contact information and links
        5. Add your agency's founding year
        6. Include testimonials or awards section
        7. Add social media links
        8. Include company stats or achievements
        
        Example expansion areas:
        - Add image gallery
        - Include client testimonials
        - Add interactive elements
        - Include company timeline
        - Add awards/certifications section
      */}
    </div>
  );
};

export default AboutWindow;