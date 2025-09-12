# The Agency - Coming Soon Landing Page

A beautiful, interactive coming soon page built with Next.js, featuring live weather data, a digital clock, and stunning visual effects inspired by Windows Bliss and modern web design.

![Landing Page](https://github.com/user-attachments/assets/4b4723fc-ede2-4e02-a523-6e72dfb60d8d)

## ✨ Features

- **🌈 Windows Bliss-Inspired Design**: Beautiful gradient backgrounds with rolling hills and cloud effects
- **🕒 Live Digital Clock**: Real-time clock display in 12-hour format with date and timezone
- **🌤️ Weather Widget**: Live weather data based on user's geolocation
- **📱 Responsive Design**: Optimized for all screen sizes
- **🎬 Animated Loading Screen**: Engaging loading experience with progress animation
- **🎨 Modern UI**: Glass morphism effects and smooth animations
- **♿ Accessibility**: Proper semantic HTML and keyboard navigation
- **🔒 Privacy-First**: Geolocation permission handling with fallback options

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/thevisualagencyincorp-prog/my-site-coming-soon.git
   cd my-site-coming-soon
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables (Optional)**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your API keys:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
   INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
   INSTAGRAM_USER_ID=your_instagram_user_id_here
   ```

   #### Instagram API Setup (Optional)
   To display real Instagram posts from @meet_the_agency:

   1. **Create Facebook Developer Account**
      - Go to [Facebook Developers](https://developers.facebook.com/)
      - Create a new app or use existing one

   2. **Set up Instagram Basic Display**
      - Add Instagram Basic Display product to your app
      - Configure OAuth redirect URIs
      - Generate access token for @meet_the_agency account

   3. **Environment Variables**
      - `INSTAGRAM_ACCESS_TOKEN`: Your Instagram access token
      - `INSTAGRAM_USER_ID`: The Instagram user ID for @meet_the_agency

   **Note**: You can only access posts from the Instagram account that owns the access token. For @meet_the_agency, you'll need access to that account's credentials.

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── DigitalClock.tsx   # Live clock component
│   ├── WeatherWidget.tsx  # Weather display component
│   ├── LoadingScreen.tsx  # Animated loading screen
│   └── index.ts          # Component exports
├── hooks/                # Custom React hooks
│   └── useGeolocation.ts # Geolocation management
├── lib/                  # Utility functions
│   └── weather.ts        # Weather API integration
└── types/                # TypeScript type definitions
    └── index.ts
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Customization

#### Changing Colors and Styling

The main design uses Tailwind CSS classes. Key areas to customize:

**Background Gradient** (in `src/app/page.tsx`):
```tsx
<div className="bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
```

**Glass Effect Cards**:
```tsx
<div className="bg-black/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
```

#### Updating Content

**Main Title** (in `src/app/page.tsx`):
```tsx
<h1 className="text-6xl md:text-8xl font-bold text-white mb-4">
  The Agency
</h1>
```

**Subtitle and Description**:
```tsx
<p className="text-white/80 text-lg md:text-xl leading-relaxed">
  Experience the future of digital innovation.
</p>
```

### Weather API Setup

#### Getting an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key
4. Add it to your `.env.local` file

#### Without API Key

The app works without an API key by showing demo weather data. Users can still interact with all other features.

## 🌐 Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add environment variables in Vercel dashboard**
   - Go to your project settings
   - Add `NEXT_PUBLIC_OPENWEATHER_API_KEY`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder**
   - Connect your repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `.next`
   - Add environment variables in Netlify settings

### Other Platforms

The app is a standard Next.js application and can be deployed to any platform that supports Node.js:

- **AWS Amplify**: Connect repository and deploy
- **Railway**: `railway login` → `railway deploy`
- **Heroku**: Add `heroku/nodejs` buildpack
- **DigitalOcean App Platform**: Connect and deploy

## 🎨 Visual Studio Code Setup

### Recommended Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Settings for Optimal Development

Add to your `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

## 🔧 Technical Details

### Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Weather API**: OpenWeatherMap
- **Deployment**: Vercel (recommended)
- **Development**: ESLint, Prettier

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Features

- **Static Site Generation**: Pre-built at build time
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting by Next.js
- **Caching**: Aggressive caching for static assets

## 🐛 Troubleshooting

### Common Issues

**Weather not loading?**
- Check if you have a valid API key in `.env.local`
- Ensure you've allowed location permissions
- Check browser console for errors

**Build failing?**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check for TypeScript errors with `npm run lint`

**Styles not applying?**
- Ensure Tailwind CSS is properly configured
- Check if custom styles conflict with Tailwind
- Verify class names are spelled correctly

### Getting Help

1. Check the browser console for errors
2. Verify all environment variables are set correctly
3. Ensure Node.js version is 18 or higher
4. Try clearing browser cache and hard refresh

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

---

**Made with ❤️ by The Agency**
