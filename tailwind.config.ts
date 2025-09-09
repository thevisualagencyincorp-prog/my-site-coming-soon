import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Pixel art inspired color palette
      colors: {
        pixel: {
          // Day theme colors
          'sky': '#87CEEB',
          'sun': '#FFD700',
          'grass': '#228B22',
          // Night theme colors
          'night': '#1e1e3f',
          'moon': '#FFFACD',
          'star': '#FFFFFF',
          // Window colors
          'window-bg': '#C0C0C0',
          'window-border': '#808080',
          'window-title': '#000080',
          // Retro OS colors
          'gray-light': '#D4D0C8',
          'gray-dark': '#3C3C3C',
          'blue-win': '#0078D4',
        }
      },
      // Pixel perfect fonts
      fontFamily: {
        'pixel': ['Courier New', 'monospace'],
        'retro': ['Georgia', 'serif'],
      },
      // Custom animations for retro feel
      animation: {
        'window-pop': 'windowPop 0.2s ease-out',
        'cursor-blink': 'cursorBlink 1s infinite',
      },
      keyframes: {
        windowPop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        cursorBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' }
        }
      },
      // Add retro box shadows
      boxShadow: {
        'retro': '2px 2px 0px 0px rgba(0,0,0,0.3)',
        'retro-inset': 'inset 1px 1px 0px rgba(255,255,255,0.5), inset -1px -1px 0px rgba(128,128,128,0.75)',
      },
      // Custom border styles for pixel UI
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
};
export default config;