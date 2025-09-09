# 🚀 Agency OS - Pixel Art Landing Site

A Next.js + Tailwind CSS immersive, retro desktop OS-inspired agency landing page with draggable windows, day/night themes, and pixel art aesthetics.

## ✨ Features

- 🎨 **Pixel Art Aesthetic** - Retro desktop OS interface with authentic 90s styling
- 🪟 **Draggable Windows** - Interactive About and Portfolio windows with full drag functionality  
- 🌅 **Dynamic Day/Night** - Auto-switching backgrounds based on time of day
- ⏰ **Live System Clock** - Real-time clock display in the top corner
- 🎮 **Interactive Desktop** - Clickable desktop icons for window management
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🎯 **TypeScript Ready** - Full TypeScript support for type safety

## 🚀 Quick Start

1. **Install dependencies**
```bash
npm install
```

2. **Run the development server**
```bash
npm run dev
```

3. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see your Agency OS desktop!

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main desktop interface
│   │   ├── layout.tsx        # App layout and metadata
│   │   └── globals.css       # Pixel art styles and retro theme
│   └── components/
│       ├── WindowManager.tsx  # Handles draggable windows
│       ├── AboutWindow.tsx    # Agency info window content
│       └── PortfolioWindow.tsx # Portfolio showcase window
├── public/
│   ├── background-day.svg    # Day theme background placeholder
│   ├── background-night.svg  # Night theme background placeholder
│   └── [other-assets]        # Icons and images
├── tailwind.config.ts        # Pixel art color palette and styling
└── package.json             # Dependencies and scripts
```

## 🎨 Customization Guide

### 1. Replace Background Images
```bash
# Replace these placeholder files with your pixel art:
public/background-day.png    # 800x600 or larger recommended
public/background-night.png  # 800x600 or larger recommended
```

### 2. Update Agency Information

**Edit `src/components/AboutWindow.tsx`:**
- Replace mission statement with your agency's actual mission
- Update services list with your specific offerings  
- Add real team member information
- Update contact information and social links

**Edit `src/components/PortfolioWindow.tsx`:**
- Replace `sampleProjects` array with your actual projects
- Add real project thumbnails and descriptions
- Connect "View Live" and "View Code" buttons to actual URLs
- Include client testimonials and case studies

### 3. Customize Colors & Styling

**Edit `tailwind.config.ts`:**
```typescript
colors: {
  pixel: {
    // Customize your color palette
    'primary': '#YOUR_COLOR',
    'secondary': '#YOUR_COLOR',
    // ... add more colors
  }
}
```

**Edit `src/app/globals.css`:**
- Modify CSS variables for pixel art colors
- Adjust font families and sizing
- Customize retro styling effects

### 4. Add More Desktop Icons

**In `src/app/page.tsx`, add to the desktop icons section:**
```tsx
{/* New desktop icon */}
<div
  onClick={() => openWindow('contact')}
  className="flex flex-col items-center cursor-pointer group hover:bg-white hover:bg-opacity-20 p-2 rounded"
>
  <div className="w-16 h-16 bg-pixel-window-bg border-2 border-pixel-window-border shadow-retro flex items-center justify-center text-2xl group-hover:shadow-retro-inset">
    📧
  </div>
  <span className="text-white font-pixel text-xs mt-1 text-shadow-lg drop-shadow-md">
    Contact
  </span>
</div>
```

### 5. Create New Windows

1. **Create a new window component:**
```bash
touch src/components/ContactWindow.tsx
```

2. **Add window to the windows array in `page.tsx`:**
```typescript
{
  id: 'contact',
  title: 'Contact Us',
  component: <ContactWindow />,
  icon: '📧',
  defaultPosition: { x: 300, y: 200 },
  defaultSize: { width: 400, height: 350 },
  isOpen: false,
  zIndex: 1002,
}
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🎮 Expansion Ideas

Ready to take your Agency OS further? Here are some enhancement ideas:

- **🎵 Audio System** - Add chiptune background music and sound effects
- **🎮 Mini Games** - Implement Snake, Tetris, or other retro games
- **📁 File Manager** - Create a file system browser for project files
- **💬 Chat Widget** - Add a retro-styled chat/support system
- **🌈 Themes** - Multiple color schemes and seasonal themes
- **📊 Analytics** - Visitor tracking with retro-styled dashboard
- **🔒 Login System** - Multi-user functionality with profiles
- **🎪 Easter Eggs** - Hidden features and interactive surprises

## 📦 Dependencies

- **Next.js 15+** - React framework with App Router
- **React 18+** - UI library
- **TypeScript** - Type safety and better DX
- **Tailwind CSS** - Utility-first styling with custom pixel theme
- **react-draggable** - Draggable window functionality

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect to Vercel
npx vercel

# Or use the Vercel dashboard
# Import your GitHub repository at vercel.com
```

### Other Platforms
```bash
# Build the project
npm run build

# The `out` folder contains the static files ready for deployment
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎨 Credits

- Pixel art aesthetic inspired by classic desktop operating systems
- Built with modern web technologies for nostalgic experiences
- Font recommendations: Press Start 2P, Courier New, Monaco

---

**🚀 Ready to create your own pixel-perfect agency experience?**

Start by running `npm install && npm run dev` and begin customizing your Agency OS desktop!
