'use client';

import React, { useState, ReactNode } from 'react';
import Draggable from 'react-draggable';

// Window data structure
export interface WindowData {
  id: string;
  title: string;
  component: ReactNode;
  icon?: string;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  isOpen: boolean;
  zIndex: number;
}

// Props for individual window
interface WindowProps {
  window: WindowData;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMinimize?: (id: string) => void;
}

// Individual draggable window component
const Window: React.FC<WindowProps> = ({ window, onClose, onFocus, onMinimize }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (onMinimize) {
      onMinimize(window.id);
    }
  };

  if (!window.isOpen) return null;

  return (
    <Draggable
      handle=".window-header"
      defaultPosition={window.defaultPosition || { x: 100, y: 100 }}
      bounds="parent"
    >
      <div
        className={`
          absolute bg-pixel-window-bg border-3 border-pixel-window-border
          shadow-retro animate-window-pop font-pixel
          ${isMinimized ? 'h-8' : 'min-h-48'}
        `}
        style={{
          width: window.defaultSize?.width || 400,
          height: isMinimized ? 32 : (window.defaultSize?.height || 300),
          zIndex: window.zIndex,
        }}
        onClick={() => onFocus(window.id)}
      >
        {/* Window Header / Title Bar */}
        <div className="window-header bg-pixel-blue-win text-white px-2 py-1 cursor-move flex items-center justify-between border-b border-pixel-window-border">
          <div className="flex items-center gap-2">
            {window.icon && (
              <span className="text-sm">{window.icon}</span>
            )}
            <span className="text-sm font-bold select-none">{window.title}</span>
          </div>
          
          {/* Window Controls */}
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleMinimize();
              }}
              className="w-4 h-4 bg-pixel-gray-light border border-pixel-window-border text-xs hover:bg-white flex items-center justify-center"
              title="Minimize"
            >
              _
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(window.id);
              }}
              className="w-4 h-4 bg-red-500 border border-pixel-window-border text-white text-xs hover:bg-red-600 flex items-center justify-center"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Window Content */}
        {!isMinimized && (
          <div className="p-4 overflow-auto" style={{ height: 'calc(100% - 32px)' }}>
            {window.component}
          </div>
        )}
      </div>
    </Draggable>
  );
};

// Props for WindowManager
interface WindowManagerProps {
  windows: WindowData[];
  onWindowClose: (id: string) => void;
  onWindowOpen: (id: string) => void;
  className?: string;
}

// Main WindowManager component
const WindowManager: React.FC<WindowManagerProps> = ({
  windows,
  onWindowClose,
  onWindowOpen,
  className = "",
}) => {
  const [windowStates, setWindowStates] = useState<WindowData[]>(windows);
  const [highestZIndex, setHighestZIndex] = useState(1000);

  // Handle bringing window to front
  const handleWindowFocus = (windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setWindowStates(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, zIndex: newZIndex } : win
      )
    );
  };

  // Handle closing window
  const handleWindowClose = (windowId: string) => {
    setWindowStates(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, isOpen: false } : win
      )
    );
    onWindowClose(windowId);
  };

  // Handle opening window
  const handleWindowOpen = (windowId: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setWindowStates(prev =>
      prev.map(win =>
        win.id === windowId ? { ...win, isOpen: true, zIndex: newZIndex } : win
      )
    );
    onWindowOpen(windowId);
  };

  // Sync with parent component updates
  React.useEffect(() => {
    setWindowStates(windows);
  }, [windows]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {windowStates.map(window => (
        <Window
          key={window.id}
          window={window}
          onClose={handleWindowClose}
          onFocus={handleWindowFocus}
        />
      ))}
      
      {/* Taskbar - Simple bottom bar showing window icons */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-pixel-gray-light border-t-2 border-pixel-window-border flex items-center gap-2 px-4">
        {windowStates
          .filter(win => !win.isOpen)
          .map(window => (
            <button
              key={window.id}
              onClick={() => handleWindowOpen(window.id)}
              className="px-3 py-1 bg-pixel-window-bg border border-pixel-window-border shadow-retro hover:shadow-retro-inset font-pixel text-sm flex items-center gap-2"
              title={`Open ${window.title}`}
            >
              {window.icon && <span>{window.icon}</span>}
              {window.title}
            </button>
          ))}
        
        {/* Start button placeholder */}
        <div className="ml-auto">
          <button className="px-4 py-2 bg-pixel-blue-win text-white border border-pixel-window-border shadow-retro font-pixel text-sm font-bold">
            🚀 Agency OS
          </button>
        </div>
      </div>
    </div>
  );
};

export default WindowManager;