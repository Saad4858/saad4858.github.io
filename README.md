# Academic Website

A clean, minimal academic personal website for **Muhammad Saad Ali**, built with Next.js and TypeScript. Inspired by the understated, content-first aesthetic of modern academic homepages — system fonts, generous whitespace, a single sage/green accent, and a macOS-style PDF viewer for papers.

## Overview

The site is a statically-rendered single-page-per-section app. The landing page introduces who I am, with quick links to focused sub-pages for Papers, Projects, Experience, Teaching, and Skills.

- **Home** — photo, bio, social links, and navigation
- **Papers** — publications with an inline macOS Preview-style PDF lightbox
- **Projects** — selected technical and research projects
- **Experience** — education and work history on a timeline
- **Teaching** — courses taught as instructor and teaching assistant
- **Skills** — technical skills grouped by category

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Vitest](https://vitest.dev) + [fast-check](https://github.com/dubzzz/fast-check) for property-based testing

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── globals.css           # Theme tokens and global styles
│   ├── publications/         # Papers route
│   ├── projects/             # Projects route
│   ├── experience/           # Experience route
│   ├── teaching/             # Teaching route
│   ├── skills/               # Skills route
│   └── _components/          # Shared UI components
├── data/                     # Content (papers, projects, experience, teaching, skills)
└── types/                    # Shared TypeScript interfaces
```

## Editing Content

All content lives as typed data in `src/data/` — no CMS required. Update the relevant file to change what's displayed:

- `site-config.ts` — name, title, contact links, metadata
- `publications.ts` — papers (add a PDF to `public/papers/` to enable the inline viewer)
- `projects.ts` — projects
- `experience.ts` — education and work history
- `teaching.ts` — courses
- `skills.ts` — skill categories

## License

Personal project. Content © Muhammad Saad Ali.
