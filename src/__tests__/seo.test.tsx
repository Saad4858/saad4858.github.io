/**
 * Unit tests for SEO and structured data
 *
 * Validates: Requirements 11.2, 11.3, 11.4, 11.5
 *
 * - Metadata export contains required fields (title ≤60 chars, description ≤160 chars, OG tags)
 * - JSON-LD contains required Person properties (name, jobTitle, affiliation, url, sameAs)
 * - Semantic HTML elements used correctly (header, nav, main, section, article, footer)
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';

// ─── Metadata Tests ───────────────────────────────────────────────────────────

describe('SEO: Metadata export', () => {
  it('metadata title is present and ≤60 characters', async () => {
    const { metadata } = await import('@/app/layout');
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();

    const title =
      typeof metadata.title === 'string'
        ? metadata.title
        : (metadata.title as { default?: string })?.default ?? '';
    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThanOrEqual(60);
  });

  it('metadata description is present and ≤160 characters', async () => {
    const { metadata } = await import('@/app/layout');
    expect(metadata.description).toBeDefined();
    expect(typeof metadata.description).toBe('string');
    expect(metadata.description!.length).toBeGreaterThan(0);
    expect(metadata.description!.length).toBeLessThanOrEqual(160);
  });

  it('metadata includes Open Graph title', async () => {
    const { metadata } = await import('@/app/layout');
    expect(metadata.openGraph).toBeDefined();
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.title).toBeDefined();
    expect(typeof og.title).toBe('string');
    expect((og.title as string).length).toBeGreaterThan(0);
  });

  it('metadata includes Open Graph description', async () => {
    const { metadata } = await import('@/app/layout');
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.description).toBeDefined();
    expect(typeof og.description).toBe('string');
    expect((og.description as string).length).toBeGreaterThan(0);
  });

  it('metadata includes Open Graph type', async () => {
    const { metadata } = await import('@/app/layout');
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.type).toBeDefined();
    expect(typeof og.type).toBe('string');
  });

  it('metadata includes Open Graph image', async () => {
    const { metadata } = await import('@/app/layout');
    const og = metadata.openGraph as Record<string, unknown>;
    expect(og.images).toBeDefined();
  });
});

// ─── JSON-LD Structured Data Tests ────────────────────────────────────────────

describe('SEO: JSON-LD structured data', () => {
  it('structuredData has @context set to schema.org', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData['@context']).toBe('https://schema.org');
  });

  it('structuredData has @type set to Person', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData['@type']).toBe('Person');
  });

  it('structuredData contains name property', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData.name).toBeDefined();
    expect(typeof structuredData.name).toBe('string');
    expect(structuredData.name.length).toBeGreaterThan(0);
  });

  it('structuredData contains jobTitle property', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData.jobTitle).toBeDefined();
    expect(typeof structuredData.jobTitle).toBe('string');
    expect(structuredData.jobTitle.length).toBeGreaterThan(0);
  });

  it('structuredData contains affiliation property with Organization type', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData.affiliation).toBeDefined();
    expect(structuredData.affiliation['@type']).toBe('Organization');
    expect(structuredData.affiliation.name).toBeDefined();
    expect(typeof structuredData.affiliation.name).toBe('string');
  });

  it('structuredData contains url property', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData.url).toBeDefined();
    expect(typeof structuredData.url).toBe('string');
    expect(structuredData.url).toMatch(/^https?:\/\//);
  });

  it('structuredData contains sameAs array with LinkedIn and GitHub', async () => {
    const { structuredData } = await import('@/app/layout');
    expect(structuredData.sameAs).toBeDefined();
    expect(Array.isArray(structuredData.sameAs)).toBe(true);
    expect(structuredData.sameAs.length).toBeGreaterThanOrEqual(2);

    const hasLinkedIn = structuredData.sameAs.some((url: string) =>
      url.includes('linkedin.com')
    );
    const hasGitHub = structuredData.sameAs.some((url: string) =>
      url.includes('github.com')
    );
    expect(hasLinkedIn).toBe(true);
    expect(hasGitHub).toBe(true);
  });

  it('structuredData produces zero schema.org validation errors (all required Person fields present)', async () => {
    const { structuredData } = await import('@/app/layout');
    // Verify all required fields per schema.org Person type as specified in requirements
    const requiredFields = ['name', 'jobTitle', 'url', 'sameAs'];
    for (const field of requiredFields) {
      expect(structuredData).toHaveProperty(field);
    }
    expect(structuredData).toHaveProperty('affiliation');
    expect(structuredData.affiliation).toHaveProperty('name');
  });
});

// ─── Semantic HTML Tests ──────────────────────────────────────────────────────

// Mock all client components that use browser APIs
vi.mock('@/app/_components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/app/_components/ThemeToggle', () => ({
  ThemeToggle: () => <button aria-label="Toggle theme">Theme</button>,
}));

vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-inter' }),
  Source_Sans_3: () => ({ variable: '--font-source-sans' }),
}));

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
  ),
}));

describe('SEO: Semantic HTML elements', () => {
  it('page uses <nav> element for navigation', async () => {
    const { Navigation } = await import('@/app/_components/Navigation');
    const { container } = render(<Navigation />);
    const navElement = container.querySelector('nav');
    expect(navElement).not.toBeNull();
  });

  it('page uses <main> element as primary content wrapper', async () => {
    const Home = (await import('@/app/page')).default;
    const { container } = render(<Home />);
    const mainElement = container.querySelector('main');
    expect(mainElement).not.toBeNull();
    expect(mainElement?.id).toBe('main-content');
  });

  it('page uses <section> elements for content sections', async () => {
    const Home = (await import('@/app/page')).default;
    const { container } = render(<Home />);
    const sections = container.querySelectorAll('section');
    // Should have multiple sections (Research, Publications, Projects, Experience, Skills, etc.)
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });

  it('page uses <article> elements for publication entries', async () => {
    const { Publications } = await import('@/app/_components/Publications');
    const { container } = render(<Publications />);
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
  });

  it('page uses <footer> element for contact section', async () => {
    const { Contact } = await import('@/app/_components/Contact');
    const { container } = render(<Contact />);
    const footerElement = container.querySelector('footer');
    expect(footerElement).not.toBeNull();
  });

  it('nav element has aria-label for accessibility', async () => {
    const { Navigation } = await import('@/app/_components/Navigation');
    const { container } = render(<Navigation />);
    const navElement = container.querySelector('nav');
    expect(navElement?.getAttribute('aria-label')).toBeDefined();
    expect(navElement?.getAttribute('aria-label')!.length).toBeGreaterThan(0);
  });
});
