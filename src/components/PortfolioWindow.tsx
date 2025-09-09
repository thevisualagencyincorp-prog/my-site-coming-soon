'use client';

import React, { useState } from 'react';

// Sample project data structure
interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'concept';
  thumbnail?: string;
}

// Sample portfolio data - replace with your actual projects
const sampleProjects: Project[] = [
  {
    id: 'retro-ecommerce',
    title: '🛒 RetroShop OS',
    description: 'A nostalgic e-commerce platform designed as a retro desktop OS interface with draggable product windows.',
    category: 'E-commerce',
    year: '2024',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Pixel Art'],
    status: 'completed',
  },
  {
    id: 'pixel-portfolio',
    title: '🎨 PixelArt Portfolio',
    description: 'Interactive portfolio site featuring pixel art animations and retro game-inspired navigation.',
    category: 'Portfolio',
    year: '2024',
    technologies: ['TypeScript', 'Framer Motion', 'Canvas API'],
    status: 'completed',
  },
  {
    id: 'desktop-crm',
    title: '📊 Desktop CRM Suite',
    description: 'A customer relationship management system designed with classic Windows 95 aesthetics.',
    category: 'Business App',
    year: '2023',
    technologies: ['Vue.js', 'Node.js', 'SQLite', 'Retro UI'],
    status: 'completed',
  },
  {
    id: 'game-launcher',
    title: '🎮 Retro Game Launcher',
    description: 'A web-based game launcher that emulates classic arcade machine interfaces.',
    category: 'Gaming',
    year: '2024',
    technologies: ['WebGL', 'JavaScript', 'Pixel Shaders'],
    status: 'in-progress',
  },
  {
    id: 'ai-assistant',
    title: '🤖 Clippy 2.0',
    description: 'Modern AI assistant with retro personality and pixel art animations.',
    category: 'AI/ML',
    year: '2024',
    technologies: ['OpenAI API', 'React', 'Lottie Animations'],
    status: 'concept',
  },
];

// Portfolio window content component
const PortfolioWindow: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(sampleProjects.map(p => p.category)))];

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? sampleProjects 
    : sampleProjects.filter(p => p.category === selectedCategory);

  // Status color mapping
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'concept': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="font-pixel text-sm h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-4 border-b-2 border-pixel-window-border pb-2">
        <h2 className="text-lg font-bold text-pixel-blue-win">
          💼 Our Portfolio
        </h2>
        <p className="text-xs text-pixel-gray-dark mt-1">
          Pixel-Perfect Projects • Retro Innovation
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-4 border-b border-pixel-window-border pb-3">
        <p className="text-xs font-bold mb-2">📁 Filter by Category:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-3 py-1 text-xs border border-pixel-window-border shadow-retro
                ${selectedCategory === category 
                  ? 'bg-pixel-blue-win text-white shadow-retro-inset' 
                  : 'bg-pixel-window-bg hover:bg-pixel-gray-light'
                }
              `}
            >
              {category === 'all' ? '🗂️ All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Project Grid */}
      <div className="flex-1 overflow-auto">
        {selectedProject ? (
          // Project Detail View
          <div className="space-y-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-xs text-pixel-blue-win hover:underline mb-2"
            >
              ← Back to Portfolio
            </button>
            
            <div className="bg-pixel-gray-light p-4 border border-pixel-window-border shadow-retro-inset">
              <h3 className="font-bold text-base mb-2">{selectedProject.title}</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold">📅 Year:</p>
                  <p className="text-xs">{selectedProject.year}</p>
                </div>
                <div>
                  <p className="text-xs font-bold">📂 Category:</p>
                  <p className="text-xs">{selectedProject.category}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-bold mb-1">📝 Description:</p>
                <p className="text-xs leading-relaxed">{selectedProject.description}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-bold mb-2">⚙️ Technologies:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map(tech => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-white border border-pixel-window-border text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-xs font-bold mb-1">🔄 Status:</p>
                <span className={`px-2 py-1 text-xs border border-pixel-window-border ${getStatusColor(selectedProject.status)}`}>
                  {selectedProject.status.toUpperCase()}
                </span>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 bg-pixel-blue-win text-white border border-pixel-window-border text-xs font-bold hover:bg-blue-600">
                  🔗 View Live
                </button>
                <button className="px-3 py-1 bg-pixel-gray-dark text-white border border-pixel-window-border text-xs font-bold hover:bg-gray-600">
                  💻 View Code
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Project List View
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-pixel-gray-light p-3 border border-pixel-window-border shadow-retro hover:shadow-retro-inset cursor-pointer transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-sm text-pixel-blue-win">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs border border-pixel-window-border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
                
                <p className="text-xs text-pixel-gray-dark mb-2 leading-relaxed">
                  {project.description.substring(0, 100)}...
                </p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-pixel-gray-dark">📂 {project.category}</span>
                  <span className="text-pixel-gray-dark">📅 {project.year}</span>
                </div>
              </div>
            ))}
            
            {filteredProjects.length === 0 && (
              <div className="text-center text-pixel-gray-dark py-8">
                <p>🔍 No projects found in this category</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 border-t border-pixel-window-border pt-3">
        <div className="flex justify-center gap-2">
          <button className="px-4 py-2 bg-green-500 text-white border border-pixel-window-border text-xs font-bold shadow-retro hover:bg-green-600">
            💬 Discuss Your Project
          </button>
          <button className="px-4 py-2 bg-pixel-blue-win text-white border border-pixel-window-border text-xs font-bold shadow-retro hover:bg-blue-600">
            📧 Request Quote
          </button>
        </div>
        
        <p className="text-center text-xs text-pixel-gray-dark mt-2">
          ⭐ Click any project to view details
        </p>
      </div>

      {/* Customization slots - commented for easy expansion */}
      {/*
        CUSTOMIZATION SLOTS:
        
        1. Replace sampleProjects with your actual project data
        2. Add real project thumbnails/screenshots
        3. Connect "View Live" and "View Code" buttons to actual URLs
        4. Add project filtering by technology
        5. Include client testimonials for each project
        6. Add project case studies
        7. Include project metrics (performance, results, etc.)
        8. Add image galleries for each project
        
        Example expansion areas:
        - Connect to CMS or API for dynamic project data
        - Add search functionality
        - Include project timeline/process
        - Add client logos and testimonials
        - Include analytics and results data
        - Add video demos or interactive previews
      */}
    </div>
  );
};

export default PortfolioWindow;