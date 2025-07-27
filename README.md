# Modern Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features interactive 3D elements, smooth animations, and a comprehensive showcase of projects and skills.

## 🚀 Features

- **Modern Design**: Clean, professional design with gradient accents and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Interactive Elements**: 3D animations and interactive components using Framer Motion
- **Dark/Light Mode**: Toggle between dark and light themes
- **AI Chatbot**: Interactive chatbot to answer questions about skills and projects
- **Contact Form**: Functional contact form with form validation
- **Project Showcase**: Detailed project cards with live demos and source code links
- **Skills Visualization**: Interactive skills section with progress bars and 3D elements
- **Experience Timeline**: Professional experience with animated timeline
- **CV Download**: Downloadable CV/Resume functionality

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js (React Three Fiber)
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
│   └── chatbot.tsx       # AI chatbot component
├── hooks/                # Custom React hooks
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

### Styling

- **Colors**: Modify the color scheme in `tailwind.config.ts`
- **Fonts**: Update fonts in `app/layout.tsx`
- **Animations**: Customize animations in individual components

### Content

- **Projects**: Update the `projects` array in `components/projects.tsx`
- **Skills**: Modify the `skillCategories` array in `components/skills-simple.tsx`
- **Experience**: Update the `experiences` array in `components/experience.tsx`

## 🤖 Chatbot

The AI chatbot is configured to answer questions about:
- Skills and technologies
- Project details
- Work experience
- Contact information
- Education background

Customize the responses in `components/chatbot.tsx` by modifying the `generateBotResponse` function.

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
- [Lucide](https://lucide.dev/) for the icon library

---

⭐ Star this repository if you found it helpful!
\`\`\`

```plaintext file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
Thumbs.db
