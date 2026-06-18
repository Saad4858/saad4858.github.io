# Requirements Document

## Introduction

A standard academic personal website for Muhammad Saad Ali, built from scratch using Next.js, React, Tailwind CSS, and TypeScript. The website serves as a professional academic presence showcasing research interests, publications, education, projects, experience, and skills. The site replaces the existing Next.js project with a clean, theme-driven academic design that supports a professional photo, downloadable CV, and clear navigation across content sections.

## Glossary

- **Website**: The academic personal website application built with Next.js, React, Tailwind CSS, and TypeScript
- **Visitor**: Any person accessing the website through a web browser
- **Navigation_Bar**: The persistent navigation component allowing access to all major sections of the website
- **Hero_Section**: The landing area of the homepage displaying the name, title, photo, and brief introduction
- **Publications_Section**: The section displaying academic publications with proper citation formatting
- **Projects_Section**: The section listing research and professional projects with descriptions
- **Theme_System**: The visual design system controlling colors, typography, spacing, and overall aesthetic of the website
- **CV_Download**: The functionality allowing visitors to download the academic CV as a PDF file
- **Responsive_Layout**: The layout system that adapts the website display across desktop, tablet, and mobile screen sizes

## Requirements

### Requirement 1: Site Structure and Navigation

**User Story:** As a visitor, I want a clear navigation structure, so that I can easily find information about the academic's background, research, and work.

#### Acceptance Criteria

1. THE Website SHALL display a Navigation_Bar with links to the following sections: About, Research, Publications, Projects, Experience, and Contact
2. WHEN a Visitor clicks a navigation link, THE Website SHALL scroll smoothly to the corresponding section on the page within 500 milliseconds
3. WHILE the Visitor scrolls the page, THE Navigation_Bar SHALL remain fixed at the top of the viewport
4. IF the viewport width is less than 768px, THEN THE Navigation_Bar SHALL collapse its links into a hamburger menu icon
5. WHEN a Visitor clicks the hamburger menu icon, THE Website SHALL display the navigation links in a vertical dropdown menu
6. WHEN a Visitor clicks a navigation link in the mobile dropdown menu, THE Website SHALL close the dropdown menu and scroll to the corresponding section
7. WHEN a Visitor clicks the hamburger menu icon while the dropdown menu is open, THE Website SHALL close the dropdown menu

### Requirement 2: Hero Section and Introduction

**User Story:** As a visitor, I want to immediately see who this academic is and what they do, so that I can quickly understand their professional identity.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the academic's full name, current title, institutional affiliation, and a photo rendered at a maximum display size of 400x400 pixels with appropriate alt text
2. THE Hero_Section SHALL display a tagline of no more than 150 characters summarizing the academic's research focus
3. THE Hero_Section SHALL display contact links for email, LinkedIn, and GitHub, each represented with a recognizable icon and accessible label
4. WHEN a Visitor clicks a LinkedIn or GitHub contact link, THE Website SHALL open the corresponding external page in a new browser tab
5. WHEN a Visitor clicks the email contact link, THE Website SHALL open the visitor's default email client with the academic's email address pre-filled in the recipient field

### Requirement 3: Research Interests Section

**User Story:** As a visitor, I want to read about the academic's research interests, so that I can understand their intellectual focus and potential for collaboration.

#### Acceptance Criteria

1. THE Website SHALL display a Research Interests section with a visible heading and a descriptive paragraph of the academic's research focus areas
2. THE Website SHALL display each key research theme — human-centered AI, HCI-driven system design, IoT integration, and AI for underserved communities — as a visually distinct element separate from the descriptive paragraph, so that each theme is individually identifiable by the Visitor
3. WHEN a Visitor navigates to the Research Interests section, THE Website SHALL display all research themes without requiring additional interaction such as clicking or expanding

### Requirement 4: Publications Section

**User Story:** As a visitor, I want to see a list of academic publications, so that I can evaluate the academic's research output and find relevant papers.

#### Acceptance Criteria

1. THE Publications_Section SHALL display each publication with authors, title, venue, year, and a link to the paper when available
2. THE Publications_Section SHALL distinguish between published papers and papers under review by displaying a status label of either "Published" or "Under Review" next to each entry
3. THE Publications_Section SHALL list publications in reverse chronological order by year
4. IF a publication is under review and has no venue, THEN THE Publications_Section SHALL display the title, authors, year, and status label without a venue field

### Requirement 5: Projects Section

**User Story:** As a visitor, I want to browse the academic's projects, so that I can understand the breadth and depth of their technical work.

#### Acceptance Criteria

1. THE Projects_Section SHALL display each project with a title, a description of no more than 200 characters, and a date range indicating start and end period
2. THE Projects_Section SHALL present projects in a card-based grid layout
3. THE Projects_Section SHALL list projects in reverse chronological order based on end date
4. WHEN a Visitor hovers over a project card, THE Website SHALL display a visible change in the card's elevation or scale to indicate interactivity
5. WHEN a project card receives keyboard focus, THE Website SHALL display the same visual emphasis effect as the hover state

### Requirement 6: Education and Experience Section

**User Story:** As a visitor, I want to see the academic's education and professional experience, so that I can understand their background and qualifications.

#### Acceptance Criteria

1. THE Website SHALL display an Education section listing each degree entry with the degree name, institution name, and date range in reverse chronological order
2. THE Website SHALL display an Experience section listing each position with job title, organization name, and date range
3. IF a position is currently held, THEN THE Website SHALL display "Present" as the end date in the date range
4. THE Website SHALL present experience entries in reverse chronological order using a timeline-style layout with a visible vertical connector between entries
5. THE Website SHALL visually separate the Education section and Experience section with distinct headings

### Requirement 7: Skills Section

**User Story:** As a visitor, I want to see the academic's technical skills, so that I can assess their technical capabilities.

#### Acceptance Criteria

1. THE Website SHALL display a "Skills" section heading followed by skills grouped into the following categories: Programming Languages, Web & App Development, Database Systems, Data Science & ML, Cloud & DevOps, and Other
2. THE Website SHALL display a visible category heading for each skill group to distinguish it from the skill items within that group
3. THE Website SHALL present each skill as a visually distinct inline element with a visible boundary (bordered or filled container) within its category group
4. IF a skill category contains no skills, THEN THE Website SHALL hide that category group from display

### Requirement 8: CV Download

**User Story:** As a visitor, I want to download the academic's CV, so that I can review their full credentials offline.

#### Acceptance Criteria

1. THE Website SHALL display a download button labeled with text indicating CV download, positioned with sufficient size and contrast to be distinguishable from surrounding content
2. WHEN a Visitor clicks the CV download button, THE Website SHALL initiate a download of the PDF file named "Saad-CurriculumVitae.pdf"
3. THE Website SHALL display a functional CV download button in both the Hero_Section and the Navigation_Bar
4. IF the CV PDF file fails to load or is unavailable, THEN THE Website SHALL display an error message indicating the file could not be downloaded

### Requirement 9: Theme and Visual Design

**User Story:** As a visitor, I want the website to have a professional academic aesthetic, so that the content is presented in a credible and visually appealing manner.

#### Acceptance Criteria

1. THE Theme_System SHALL use a clean, minimal color palette appropriate for academic websites with a primary accent color and neutral backgrounds
2. THE Theme_System SHALL use professional serif or sans-serif typography with clear hierarchy for headings, subheadings, and body text
3. THE Theme_System SHALL provide consistent spacing and alignment across all sections
4. THE Website SHALL support a dark mode toggle allowing the Visitor to switch between light and dark color schemes
5. WHEN a Visitor toggles dark mode, THE Theme_System SHALL persist the preference in the browser's local storage

### Requirement 10: Responsive Design

**User Story:** As a visitor, I want the website to display correctly on any device, so that I can access the content from my phone, tablet, or desktop.

#### Acceptance Criteria

1. THE Responsive_Layout SHALL adapt content at viewport widths of 320px, 768px, and 1280px such that no elements overlap, no content is clipped or truncated, and all interactive elements remain visible and reachable
2. WHILE the viewport width is less than 768px, THE Responsive_Layout SHALL stack content vertically in a single-column layout
3. THE Website SHALL render all body text at a minimum of 16px font size and all interactive elements at a minimum touch target size of 44x44px on viewports narrower than 768px
4. THE Website SHALL ensure all text remains readable without horizontal scrolling on any supported viewport width, with no content extending beyond the viewport boundary

### Requirement 11: Performance and SEO

**User Story:** As a visitor, I want the website to load quickly and be discoverable through search engines, so that I can find and access the content efficiently.

#### Acceptance Criteria

1. THE Website SHALL achieve a Largest Contentful Paint (LCP) of 2 seconds or less when tested on a simulated 10 Mbps connection with 40ms round-trip latency
2. THE Website SHALL include a meta title (maximum 60 characters), a meta description (maximum 160 characters), and Open Graph tags for og:title, og:description, og:type, and og:image on every page
3. THE Website SHALL use semantic HTML elements including `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` to structure page content for search engine indexing
4. THE Website SHALL include structured data (JSON-LD) conforming to the schema.org Person type with at minimum the following properties: name, jobTitle, affiliation, url, and sameAs (linking to LinkedIn and GitHub profiles)
5. THE Website SHALL produce zero errors when the structured data is validated against the schema.org Person schema specification

### Requirement 12: Accessibility

**User Story:** As a visitor with accessibility needs, I want the website to be navigable with assistive technologies, so that I can access all content regardless of ability.

#### Acceptance Criteria

1. THE Website SHALL achieve a minimum color contrast ratio of 4.5:1 for all body text and 3:1 for large text (18px or above) against its background in both light and dark modes
2. THE Website SHALL support keyboard navigation across all interactive elements such that each element receives a visible focus indicator, elements follow a logical tab order matching the visual reading order, and all actions are operable using Enter or Space keys
3. THE Website SHALL include ARIA labels on all navigation elements and interactive controls that describe the element's purpose or destination, and each label SHALL be unique within its navigation context
4. THE Website SHALL provide non-empty, descriptive alt text of no more than 125 characters for all images including the professional photo
5. IF keyboard focus enters the mobile navigation menu or any modal overlay, THEN THE Website SHALL constrain focus within that component until the Visitor explicitly closes it via the Escape key or a close control
6. THE Website SHALL provide a skip-to-content link as the first focusable element on the page, allowing keyboard users to bypass the Navigation_Bar
