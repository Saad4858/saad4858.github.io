# Implementation Plan: Academic Website

## Overview

Rebuild the existing Next.js project from scratch as a single-page static academic website for Muhammad Saad Ali. The implementation follows a bottom-up approach: set up the project foundation (theme, types, data), build individual section components, wire them together on the page, and add interactivity (navigation, dark mode). Testing validates correctness properties and accessibility throughout.

## Tasks

- [x] 1. Set up project foundation and clean existing code
  - [x] 1.1 Clean existing project files and set up directory structure
    - Remove existing `src/app/_components/` files (DoodleBackground.tsx, Prompt.tsx, TerminalWindow.tsx)
    - Remove default public assets (file.svg, globe.svg, next.svg, vercel.svg, window.svg)
    - Create directory structure: `src/app/_components/`, `src/data/`, `src/types/`
    - Keep `Saad-CurriculumVitae.pdf` in the project root (will be served from public or referenced directly)
    - _Requirements: 8.2_

  - [x] 1.2 Define TypeScript interfaces and types
    - Create `src/types/index.ts` with interfaces: Publication, Project, ExperienceEntry, EducationEntry, SkillCategory, SiteConfig
    - Ensure Publication has optional `venue` and `link` fields, required `status` field with union type
    - Ensure Project `description` is typed as string (max 200 chars enforced at data level)
    - Ensure SiteConfig includes all meta fields with character constraints documented in comments
    - _Requirements: 4.1, 4.2, 4.4, 5.1, 6.1, 6.2, 7.1, 11.2_

  - [x] 1.3 Configure globals.css with Tailwind CSS 4 theme tokens
    - Set up `@import 'tailwindcss'` and `@theme` block with CSS custom properties
    - Define color tokens: primary (slate-800), accent (blue-700), bg, bg-alt, text, text-muted, border
    - Define font tokens: `--font-sans` (Inter), `--font-heading` (Source Sans Pro)
    - Add `.dark` class overrides for all color tokens
    - Add `scroll-behavior: smooth` on html
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 1.4 Configure root layout with fonts, metadata, and structured data
    - Update `src/app/layout.tsx` with Inter and Source Sans Pro via `next/font/google` with `display: swap`
    - Add metadata export with meta title (≤60 chars), meta description (≤160 chars), and Open Graph tags (og:title, og:description, og:type, og:image)
    - Embed JSON-LD structured data (schema.org Person) with name, jobTitle, affiliation, url, sameAs
    - Wrap children with ThemeProvider
    - Include SkipToContent component as first element in body
    - Use semantic `<html>` and `<body>` elements
    - _Requirements: 11.2, 11.3, 11.4, 11.5, 12.6_

- [x] 2. Create data layer
  - [x] 2.1 Create site-config.ts with personal information
    - Define `siteConfig` constant with name, title, affiliation, tagline (≤150 chars), email, LinkedIn, GitHub URLs, photo path, CV path, meta fields
    - _Requirements: 2.1, 2.2, 2.3, 11.2_

  - [x] 2.2 Create publications.ts with publication entries
    - Define `publications` array sorted by year descending
    - Include entries with proper status labels ('published' | 'under-review')
    - Include optional venue and link fields
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 2.3 Create projects.ts with project entries
    - Define `projects` array with all 8 projects from design
    - Include title, description (≤200 chars), startDate, endDate
    - Sort by end date descending
    - _Requirements: 5.1, 5.3_

  - [x] 2.4 Create experience.ts with experience and education entries
    - Define `experience` array with work entries including "Present" for current roles
    - Define `education` array with degree entries
    - Sort both in reverse chronological order
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 2.5 Create skills.ts with categorized skills
    - Define `skillCategories` array with 6 categories: Programming Languages, Web & App Development, Database Systems, Data Science & ML, Cloud & DevOps, Other
    - Each category has id, name, and skills array
    - _Requirements: 7.1, 7.2_

- [x] 3. Implement theme and accessibility foundation
  - [x] 3.1 Implement ThemeProvider client component
    - Create `src/app/_components/ThemeProvider.tsx` as a Client Component
    - Read initial theme from localStorage (wrapped in try/catch for unavailable storage)
    - Default to "light" if no stored value or invalid value
    - Apply/remove `dark` class on `<html>` element
    - Persist theme changes to localStorage
    - Provide theme context to children
    - _Requirements: 9.4, 9.5_

  - [x] 3.2 Implement ThemeToggle client component
    - Create `src/app/_components/ThemeToggle.tsx` as a Client Component
    - Render a button with sun/moon icon based on current theme
    - Include ARIA label describing the toggle action
    - Consume ThemeProvider context to read/set theme
    - _Requirements: 9.4, 12.3_

  - [x] 3.3 Implement SkipToContent component
    - Create `src/app/_components/SkipToContent.tsx`
    - Render a visually-hidden link that becomes visible on focus
    - Link targets `#main-content` anchor
    - Must be the first focusable element on the page
    - _Requirements: 12.6_

  - [x] 3.4 Write property test for dark mode round-trip
    - **Property 6: Dark mode preference round-trip**
    - Generate arbitrary theme values ("light" or "dark"), verify localStorage persistence and restoration
    - **Validates: Requirements 9.4, 9.5**

- [x] 4. Implement Navigation component
  - [x] 4.1 Implement Navigation client component with desktop and mobile views
    - Create `src/app/_components/Navigation.tsx` as a Client Component
    - Render fixed-position nav bar with links: About, Research, Publications, Projects, Experience, Skills, Contact
    - Include CV download button in nav bar
    - At viewport <768px, collapse links into hamburger menu icon
    - On hamburger click, show vertical dropdown; on link click, close dropdown and scroll to section
    - On hamburger click while open, close the dropdown
    - Implement focus trap within mobile menu (Escape key closes)
    - Include ARIA labels on all navigation elements and controls
    - Ensure visible focus indicators on all interactive elements
    - Ensure logical tab order matching visual reading order
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 8.3, 12.2, 12.3, 12.5_

- [x] 5. Checkpoint - Verify foundation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Hero section
  - [x] 6.1 Implement Hero server component
    - Create `src/app/_components/Hero.tsx` as a Server Component
    - Display full name, current title, institutional affiliation
    - Render professional photo using Next.js `<Image>` at max 400x400px with descriptive alt text (≤125 chars)
    - Display tagline (≤150 chars)
    - Display contact links (email, LinkedIn, GitHub) with recognizable icons and accessible labels
    - Email link uses `mailto:` href; LinkedIn/GitHub open in new tab with `target="_blank"` and `rel="noopener noreferrer"`
    - Include CV download button
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 8.1, 8.3, 12.4_

  - [x] 6.2 Implement CVDownloadButton component
    - Create `src/app/_components/CVDownloadButton.tsx`
    - Render a download link/button with clear label indicating CV download
    - Link to `/Saad-CurriculumVitae.pdf` with `download` attribute
    - Ensure sufficient size and contrast to be distinguishable
    - Minimum touch target 44x44px on mobile
    - _Requirements: 8.1, 8.2, 8.3, 10.3_

- [x] 7. Implement Research section
  - [x] 7.1 Implement Research server component
    - Create `src/app/_components/Research.tsx` as a Server Component
    - Display section heading "Research Interests"
    - Display descriptive paragraph of research focus areas
    - Display each research theme (human-centered AI, HCI-driven system design, IoT integration, AI for underserved communities) as visually distinct elements (e.g., styled tags/cards)
    - All themes visible without additional interaction
    - Use semantic `<section>` element with id for navigation
    - _Requirements: 3.1, 3.2, 3.3_

- [x] 8. Implement Publications section
  - [x] 8.1 Implement Publications server component
    - Create `src/app/_components/Publications.tsx` as a Server Component
    - Import and render publications from data file
    - Display each publication with: authors, title, venue (when available), year, link (when available)
    - Display status badge ("Published" or "Under Review") for each entry
    - List in reverse chronological order by year
    - Hide venue field for under-review publications without a venue
    - Use semantic `<section>` and `<article>` elements
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 11.3_

  - [x] 8.2 Write property test for publication rendering correctness
    - **Property 1: Publication rendering correctness**
    - Generate arbitrary Publication objects, verify rendered output contains title, all authors, year, correct status label, conditional venue display
    - **Validates: Requirements 4.1, 4.2, 4.4**

  - [x] 8.3 Write property test for chronological ordering
    - **Property 2: Chronological ordering of dated entries**
    - Generate lists of publications with random years, verify sort produces reverse chronological order
    - **Validates: Requirements 4.3, 5.3, 6.4**

- [x] 9. Implement Projects section
  - [x] 9.1 Implement Projects server component and ProjectCard client component
    - Create `src/app/_components/Projects.tsx` as a Server Component
    - Create `src/app/_components/ProjectCard.tsx` as a Client Component
    - Render card-based grid layout with projects sorted by end date descending
    - Each card displays: title, description (≤200 chars), date range
    - ProjectCard implements hover scale/elevation effect
    - Same visual effect on keyboard focus (`:focus-visible`)
    - Minimum touch target 44x44px on mobile
    - Use semantic `<section>` element
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 10.3, 12.2_

  - [x] 9.2 Write property test for project card rendering
    - **Property 3: Project card rendering correctness**
    - Generate arbitrary Project objects with description ≤200 chars, verify card contains title, full description, date range
    - **Validates: Requirements 5.1**

- [x] 10. Implement Experience and Education section
  - [x] 10.1 Implement Experience server component with timeline layout
    - Create `src/app/_components/Experience.tsx` as a Server Component
    - Display Education section with degree, institution, date range in reverse chronological order
    - Display Experience section with job title, organization, date range in reverse chronological order
    - Display "Present" as end date for current positions
    - Use timeline-style layout with visible vertical connector between experience entries
    - Visually separate Education and Experience with distinct headings
    - Use semantic `<section>` elements
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 11.3_

  - [x] 10.2 Write property test for experience entry rendering
    - **Property 4: Experience and Education entry rendering correctness**
    - Generate ExperienceEntry objects (including "Present" end dates), verify rendered output contains title, organization, date range with "Present" literal
    - **Validates: Requirements 6.1, 6.2, 6.3**

- [x] 11. Implement Skills section
  - [x] 11.1 Implement Skills server component
    - Create `src/app/_components/Skills.tsx` as a Server Component
    - Display "Skills" section heading
    - Group skills by category with visible category headings
    - Render each skill as a visually distinct inline element with visible boundary (bordered/filled container)
    - Hide categories with empty skills arrays
    - Use semantic `<section>` element
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 11.2 Write property test for skills rendering with empty category hiding
    - **Property 5: Skills section rendering with empty category hiding**
    - Generate SkillCategory objects (including empty ones), verify non-empty categories render with heading and skill tags, empty categories are hidden
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4**

- [x] 12. Implement Contact/Footer section
  - [x] 12.1 Implement Contact server component
    - Create `src/app/_components/Contact.tsx` as a Server Component
    - Display contact information with email, LinkedIn, GitHub links
    - Use semantic `<footer>` element
    - Include ARIA labels on all links
    - _Requirements: 2.3, 2.4, 2.5, 11.3, 12.3_

- [x] 13. Checkpoint - Verify all sections render correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Compose page and wire everything together
  - [x] 14.1 Compose main page with all sections
    - Update `src/app/page.tsx` to import and render all section components in order: Navigation, Hero, Research, Publications, Projects, Experience, Skills, Contact
    - Add `id` attributes to each section for anchor navigation
    - Add `id="main-content"` to the `<main>` element for skip-to-content link
    - Use semantic `<main>` wrapper
    - Ensure single-column stacked layout on mobile (<768px)
    - Ensure proper spacing and alignment across all sections
    - _Requirements: 1.1, 1.2, 10.2, 11.3, 12.6_

  - [x] 14.2 Implement responsive layout and verify breakpoints
    - Ensure content adapts at 320px, 768px, and 1280px viewports
    - No overlapping elements, no clipped/truncated content, all interactive elements visible
    - Body text minimum 16px, interactive elements minimum 44x44px touch target on mobile
    - No horizontal scrolling on any supported viewport
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

  - [x] 14.3 Move CV PDF to public directory and verify download
    - Move or copy `Saad-CurriculumVitae.pdf` to `public/` directory so it's served at `/Saad-CurriculumVitae.pdf`
    - Verify download link works correctly
    - _Requirements: 8.2_

- [x] 15. Accessibility and SEO verification
  - [x] 15.1 Write unit tests for accessibility compliance
    - Test skip-to-content link is first focusable element
    - Test all images have descriptive alt text (≤125 chars)
    - Test ARIA labels present on navigation and interactive controls
    - Test color contrast ratios meet 4.5:1 for body text, 3:1 for large text
    - Test keyboard navigation with visible focus indicators
    - Test focus trap in mobile navigation menu
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [x] 15.2 Write unit tests for SEO and structured data
    - Test metadata export contains required fields (title ≤60 chars, description ≤160 chars, OG tags)
    - Test JSON-LD contains required Person properties (name, jobTitle, affiliation, url, sameAs)
    - Test semantic HTML elements used correctly (header, nav, main, section, article, footer)
    - _Requirements: 11.2, 11.3, 11.4, 11.5_

- [x] 16. Final checkpoint - Ensure all tests pass and build succeeds
  - Run `npm run build` to verify static generation succeeds
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The project uses Next.js 16 App Router — consult `node_modules/next/dist/docs/` for any API changes
- All section components are Server Components by default; only Navigation, ThemeProvider, ThemeToggle, and ProjectCard are Client Components
- Data is hardcoded in TypeScript files — no CMS or database needed

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 3, "tasks": ["3.1", "3.2", "3.3"] },
    { "id": 4, "tasks": ["3.4", "4.1", "6.1", "6.2", "7.1"] },
    { "id": 5, "tasks": ["8.1", "9.1", "10.1", "11.1", "12.1"] },
    { "id": 6, "tasks": ["8.2", "8.3", "9.2", "10.2", "11.2"] },
    { "id": 7, "tasks": ["14.1", "14.3"] },
    { "id": 8, "tasks": ["14.2"] },
    { "id": 9, "tasks": ["15.1", "15.2"] }
  ]
}
```
