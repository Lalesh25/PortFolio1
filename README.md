# Modern Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features interactive 3D elements, smooth animations, voice navigation, and a comprehensive showcase of projects and skills.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: 3D animations and interactive components using Framer Motion
- **Dark/Light Mode**: Toggle between dark and light themes
- **Voice Navigation**: Navigate the website using voice commands
- **AI Chatbot**: Interactive chatbot to answer questions about skills and projects
- **Contact Form**: Functional contact form with form validation
- **Project Showcase**: Detailed project cards with live demos and source code links
- **Skills Visualization**: Interactive skills section with progress bars and 3D elements
- **Experience Timeline**: Professional experience with animated timeline
- **CV Download**: Downloadable CV/Resume functionality

## 🎤 Voice Navigation

The website includes advanced voice navigation capabilities:

### Available Voice Commands:
- **Navigation**: "Go to projects", "Show contact form", "Navigate to skills"
- **Theme Control**: "Toggle theme", "Dark mode", "Light mode"
- **Actions**: "Download CV", "Open GitHub", "Open LinkedIn"
- **Help**: "Help", "Voice commands", "What can you do"

### How to Use:
1. Click the microphone button in the bottom-left corner
2. Speak clearly when the button turns red (listening mode)
3. The system will provide audio feedback for successful commands
4. Say "help" to see all available commands

### Browser Support:
- Chrome/Chromium browsers (recommended)
- Edge
- Safari (limited support)
- Firefox (limited support)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (React Three Fiber)
- **Voice Recognition**: Web Speech API
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📦 Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/YourUsername/portfolio-website.git
cd portfolio-website
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect it's a Next.js project and deploy it

### Deploy on Netlify

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy the `out` folder to Netlify

### Deploy on GitHub Pages

1. Install gh-pages:
\`\`\`bash
npm install --save-dev gh-pages
\`\`\`

2. Add to package.json scripts:
\`\`\`json
{
  "scripts": {
    "deploy": "gh-pages -d out"
  }
}
\`\`\`

3. Deploy:
\`\`\`bash
npm run build
npm run deploy
\`\`\`

## 📁 Project Structure

\`\`\`
portfolio-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects section
│   ├── experience.tsx    # Experience section
│   ├── skills-simple.tsx # Skills section
│   ├── contact.tsx       # Contact section
│   ├── footer.tsx        # Footer component
│   ├── navigation.tsx    # Navigation component
│   ├── chatbot.tsx       # AI chatbot component
│   └── voice-navigation.tsx # Voice navigation component
├── hooks/                # Custom React hooks
│   └── use-voice-navigation.ts # Voice navigation hook
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── images/          # Project images
│   └── cv/              # CV/Resume files
├── styles/              # Additional styles
└── README.md           # Project documentation
\`\`\`

## 🎨 Customization

### Personal Information

Update the following files with your personal information:

1. **components/hero.tsx** - Name, title, and social links
2. **components/projects.tsx** - Your projects and GitHub repositories
3. **components/experience.tsx** - Your work experience
4. **components/contact.tsx** - Contact information
5. **public/cv/** - Replace with your CV/resume
6. **hooks/use-voice-navigation.ts** - Update GitHub/LinkedIn URLs

### Voice Commands

Customize voice commands in `hooks/use-voice-navigation.ts`:

\`\`\`typescript
const voiceCommands: VoiceCommand[] = [
  {
    patterns: ['your custom command', 'alternative phrase'],
    action: 'your:action',
    description: 'Description of what this command does'
  }
]
\`\`\`

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Fonts**: Update fonts in `app/layout.tsx`
- **Animations**: Customize animations in individual components

### Content

- **Projects**: Update the `projects` array in `components/projects.tsx`
- **Skills**: Modify the `skillCategories` array in `components/skills-simple.tsx`
- **Experience**: Update the `experiences` array in `components/experience.tsx`

## 🤖 AI Features

### Chatbot
The AI chatbot is configured to answer questions about:
- Skills and technologies
- Project details
- Work experience
- Contact information
- Education background

### Voice Navigation
The voice navigation system supports:
- Natural language processing for commands
- Audio feedback for successful actions
- Help system with command examples
- Real-time transcript display
- Cross-browser compatibility

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment variables:

\`\`\`env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
\`\`\`

### Next.js Configuration

The project includes optimized Next.js configuration in `next.config.mjs`:
- Image optimization
- Bundle optimization
- Performance optimizations

## 🌐 Browser Compatibility

### Voice Navigation Support:
- ✅ Chrome/Chromium (Full support)
- ✅ Edge (Full support)
- ⚠️ Safari (Limited support)
- ⚠️ Firefox (Limited support)

### General Website Support:
- ✅ All modern browsers
- ✅ Mobile browsers
- ✅ Progressive Web App features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/YourUsername/portfolio-website/issues).

## 📞 Contact

- **Email**: laleshpawar2025@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/feed/)
- **GitHub**: [Your GitHub Profile](https://github.com/YourUsername)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Three.js](https://threejs.org/) for 3D graphics
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for voice recognition
- [Lucide](https://lucide.dev/) for the icon library

---

⭐ Star this repository if you found it helpful!

🎤 Try the voice navigation by saying "Go to projects" or "Help"!
