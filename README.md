<div align="center">
  <img src="/public/favicon.svg" width="80" alt="EcoDream logo" />
  <h1>EcoDream — Sustainable Luxury Real Estate</h1>
  <p>Premium eco-residences, green architecture, and smart home loans — experienced through immersive, animated storytelling.</p>

  <p>
    <a href="#features">Features</a> ·
    <a href="#tech-stack">Tech Stack</a> ·
    <a href="#getting-started">Getting Started</a> ·
    <a href="#project-structure">Project Structure</a> ·
    <a href="#scripts">Scripts</a> ·
    <a href="#contributing">Contributing</a> ·
    <a href="#license">License</a>
  </p>
</div>

---

## Features

- **Immersive, cinematic landing experience** — full-page hero with preloader, scroll progress, cursor spotlight, and GSAP + Lenis powered reveal animations.
- **Interactive property hotspots** — clickable markers over residence imagery that expose eco metrics like net-zero solar, greywater recycling, and passive climate control.
- **Featured eco residences** — a curated portfolio of sustainable luxury listings with pricing, ratings, and location details.
- **Sustainable materials library** — carbon-credit and thermal-performance data for engineered bamboo, recycled carbon aerogel, and low-E glass.
- **Green home loans** — transparent eco-loan options with competitive rates and low down-payment plans.
- **Expert advisor team** — specialist profiles spanning bio-architecture, materials science, and biophilic interiors.
- **Testimonials & trust** — verified partner ecosystem and resident reviews.
- **Fully responsive** with fluid typography, lazy-loaded images, and design-system-first components.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [React 19](https://react.dev) |
| Build Tool | [Vite 6](https://vitejs.dev) |
| Language | TypeScript 5.8 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) + `@tailwindcss/vite` |
| Animation | [GSAP](https://gsap.com) · [Motion](https://motion.dev) · [Lenis](https://lenis.darkroom.engineering) |
| Icons | [lucide-react](https://lucide.dev) |
| Components | [shadcn/ui](https://ui.shadcn.com) |
| Runtime | Node.js (Bun-compatible) |

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org) (or [Bun](https://bun.sh))

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

> Note: Vite serves the dev server on port `3000` by default (see `package.json`).

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # Reusable UI components (Marquee, TiltCard, Modals, Navbar, …)
│   ├── lib/              # Utility helpers
│   ├── data.ts           # Featured listings, hotspots, loans, materials, team
│   ├── types.ts          # Shared TypeScript types
│   ├── App.tsx           # Application root
│   └── main.tsx          # Entry point
├── public/               # Public static files (favicon, etc.)
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production-ready build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check the codebase with `tsc --noEmit` |
| `npm run clean` | Remove build output |

## Contributing

Contributions are welcome! Please open an [issue](https://github.com/devwithnizam/ecodream-sustainable-living/issues) or submit a pull request.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/my-feature`).
3. Commit your changes (`git commit -m 'Add a great feature'`).
4. Push to the branch (`git push origin feat/my-feature`).
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).