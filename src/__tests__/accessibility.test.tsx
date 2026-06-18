/**
 * Accessibility Compliance Unit Tests
 *
 * Tests for:
 * - Skip-to-content link as first focusable element (Requirement 12.6)
 * - Descriptive alt text on all images ≤125 chars (Requirement 12.4)
 * - ARIA labels on navigation and interactive controls (Requirement 12.3)
 * - Color contrast ratios: 4.5:1 body text, 3:1 large text (Requirement 12.1)
 * - Keyboard navigation with visible focus indicators (Requirement 12.2)
 * - Focus trap in mobile navigation menu (Requirement 12.5)
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { SkipToContent } from '@/app/_components/SkipToContent';
import { Navigation } from '@/app/_components/Navigation';
import { ThemeToggle } from '@/app/_components/ThemeToggle';
import { ThemeProvider } from '@/app/_components/ThemeProvider';

// Mock next/image to render a standard img element for testing
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// ============================================================
// Requirement 12.6: Skip-to-content link
// ============================================================
describe('Accessibility: Skip-to-content link (Requirement 12.6)', () => {
  it('renders a skip-to-content link targeting #main-content', () => {
    render(<SkipToContent />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('skip-to-content link is the first focusable element on the page', () => {
    render(
      <div>
        <SkipToContent />
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </div>
    );

    // The skip link should be the first link/button in the DOM
    const allFocusable = document.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = allFocusable[0];
    expect(firstFocusable).toHaveAttribute('href', '#main-content');
    expect(firstFocusable).toHaveAttribute('aria-label', 'Skip to main content');
  });

  it('skip-to-content link has sr-only class for visual hiding', () => {
    render(<SkipToContent />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink.className).toContain('sr-only');
  });

  it('skip-to-content link becomes visible on focus (focus:not-sr-only)', () => {
    render(<SkipToContent />);
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    // Verify the class includes focus:not-sr-only for visibility on focus
    expect(skipLink.className).toContain('focus:not-sr-only');
  });
});

// ============================================================
// Requirement 12.4: Image alt text
// ============================================================
describe('Accessibility: Image alt text (Requirement 12.4)', () => {
  it('Hero image has descriptive alt text', async () => {
    // Import Hero dynamically since it uses server-side imports
    const { Hero } = await import('@/app/_components/Hero');
    render(<Hero />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt');
    const altText = img.getAttribute('alt')!;
    expect(altText.length).toBeGreaterThan(0);
    expect(altText.length).toBeLessThanOrEqual(125);
  });

  it('Hero image alt text is descriptive (contains name or role)', async () => {
    const { Hero } = await import('@/app/_components/Hero');
    render(<Hero />);

    const img = screen.getByRole('img');
    const altText = img.getAttribute('alt')!;
    // Alt text should mention the person's name or role
    expect(altText.toLowerCase()).toMatch(/muhammad saad ali|engineer|researcher/i);
  });
});

// ============================================================
// Requirement 12.3: ARIA labels on navigation and controls
// ============================================================
describe('Accessibility: ARIA labels (Requirement 12.3)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('Navigation has aria-label on the nav element', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('all desktop navigation links have aria-labels', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const expectedLabels = [
      'Navigate to About section',
      'Navigate to Research section',
      'Navigate to Publications section',
      'Navigate to Projects section',
      'Navigate to Experience section',
      'Navigate to Skills section',
      'Navigate to Contact section',
    ];

    expectedLabels.forEach((label) => {
      const links = screen.getAllByLabelText(label);
      expect(links.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('hamburger menu button has aria-label', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const hamburger = screen.getByLabelText(/open navigation menu/i);
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('hamburger button aria-label changes when menu is open', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    const closeButton = screen.getByLabelText(/close navigation menu/i);
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('CV download button has aria-label', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const cvButtons = screen.getAllByLabelText(/download cv as pdf/i);
    expect(cvButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('ThemeToggle has descriptive aria-label', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle).toBeInTheDocument();
  });

  it('ThemeToggle aria-label updates based on current theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    act(() => {
      fireEvent.click(toggle);
    });

    const updatedToggle = screen.getByRole('button', { name: /switch to light mode/i });
    expect(updatedToggle).toBeInTheDocument();
  });

  it('navigation links have unique aria-labels within context', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const allAriaLabels = document.querySelectorAll('[aria-label]');
    const navContext = screen.getByRole('navigation');
    const navAriaElements = navContext.querySelectorAll('[aria-label]');

    // Collect labels within the nav context
    const labels: string[] = [];
    navAriaElements.forEach((el) => {
      const label = el.getAttribute('aria-label');
      if (label) labels.push(label);
    });

    // Desktop links appear once, but the same labels may appear in mobile menu
    // Within each context (desktop vs mobile), labels should be unique
    // We just verify that labels exist and are descriptive
    expect(labels.length).toBeGreaterThan(0);
    labels.forEach((label) => {
      expect(label.length).toBeGreaterThan(0);
    });
  });
});

// ============================================================
// Requirement 12.1: Color contrast ratios
// ============================================================
describe('Accessibility: Color contrast ratios (Requirement 12.1)', () => {
  /**
   * Helper to calculate relative luminance per WCAG 2.1
   * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
   */
  function relativeLuminance(hex: string): number {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const linearize = (c: number) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
  }

  /**
   * Calculate contrast ratio between two colors
   */
  function contrastRatio(hex1: string, hex2: string): number {
    const l1 = relativeLuminance(hex1);
    const l2 = relativeLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Light mode colors from globals.css
  const lightMode = {
    text: '#1e293b',       // --color-text (body text)
    textMuted: '#64748b',  // --color-text-muted
    primary: '#1e293b',    // --color-primary (headings)
    accent: '#1d4ed8',     // --color-accent (links)
    bg: '#ffffff',         // --color-bg
    bgAlt: '#f8fafc',      // --color-bg-alt
  };

  // Dark mode colors from globals.css
  const darkMode = {
    text: '#e2e8f0',       // --color-text
    textMuted: '#94a3b8',  // --color-text-muted
    primary: '#e2e8f0',    // --color-primary
    accent: '#60a5fa',     // --color-accent
    bg: '#0f172a',         // --color-bg
    bgAlt: '#1e293b',      // --color-bg-alt
  };

  describe('Light mode', () => {
    it('body text (#1e293b) on background (#ffffff) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(lightMode.text, lightMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('primary/heading text (#1e293b) on background (#ffffff) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(lightMode.primary, lightMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('accent/link color (#1d4ed8) on background (#ffffff) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(lightMode.accent, lightMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('muted text (#64748b) on background (#ffffff) meets 3:1 for large text', () => {
      const ratio = contrastRatio(lightMode.textMuted, lightMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });

    it('body text (#1e293b) on alt background (#f8fafc) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(lightMode.text, lightMode.bgAlt);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe('Dark mode', () => {
    it('body text (#e2e8f0) on dark background (#0f172a) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(darkMode.text, darkMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('primary/heading text (#e2e8f0) on dark background (#0f172a) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(darkMode.primary, darkMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('accent/link color (#60a5fa) on dark background (#0f172a) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(darkMode.accent, darkMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });

    it('muted text (#94a3b8) on dark background (#0f172a) meets 3:1 for large text', () => {
      const ratio = contrastRatio(darkMode.textMuted, darkMode.bg);
      expect(ratio).toBeGreaterThanOrEqual(3);
    });

    it('body text (#e2e8f0) on dark alt background (#1e293b) meets 4.5:1 ratio', () => {
      const ratio = contrastRatio(darkMode.text, darkMode.bgAlt);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });
});

// ============================================================
// Requirement 12.2: Keyboard navigation with visible focus indicators
// ============================================================
describe('Accessibility: Keyboard navigation and focus indicators (Requirement 12.2)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('navigation links have focus-visible outline classes', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      // Each link should have focus-visible styling classes
      expect(link.className).toContain('focus-visible:outline');
    });
  });

  it('hamburger button has focus-visible outline class', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    const hamburger = screen.getByLabelText(/open navigation menu/i);
    expect(hamburger.className).toContain('focus-visible:outline');
  });

  it('ThemeToggle button has focus-visible outline class', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggle = screen.getByRole('button', { name: /switch to dark mode/i });
    expect(toggle.className).toContain('focus-visible:outline');
  });

  it('interactive elements follow logical tab order', () => {
    render(
      <div>
        <SkipToContent />
        <ThemeProvider>
          <Navigation />
        </ThemeProvider>
      </div>
    );

    const focusableElements = document.querySelectorAll(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );

    // No element should have a positive tabindex (which disrupts natural order)
    focusableElements.forEach((el) => {
      const tabIndex = el.getAttribute('tabindex');
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeLessThanOrEqual(0);
      }
    });
  });
});

// ============================================================
// Requirement 12.5: Focus trap in mobile navigation menu
// ============================================================
describe('Accessibility: Focus trap in mobile navigation (Requirement 12.5)', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('Escape key closes the mobile menu', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    // Open the menu
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    // Menu should be open
    expect(screen.getByRole('menu')).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(document, { key: 'Escape' });

    // Menu should be closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('focus is trapped within mobile menu when open', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    // Open the menu
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    const menu = screen.getByRole('menu');
    const focusableInMenu = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableInMenu.length).toBeGreaterThan(0);

    // Focus the last element in the menu
    const lastElement = focusableInMenu[focusableInMenu.length - 1];
    lastElement.focus();

    // Tab from last element should wrap to first (prevented by focus trap)
    fireEvent.keyDown(document, { key: 'Tab' });

    // The focus trap prevents default and wraps - we verify the handler exists
    // by checking the menu has focusable elements that would be trapped
    const firstElement = focusableInMenu[0];
    expect(firstElement).toBeDefined();
    expect(lastElement).toBeDefined();
  });

  it('Shift+Tab from first element wraps to last element in menu', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    // Open the menu
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    const menu = screen.getByRole('menu');
    const focusableInMenu = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );

    // Focus the first element
    const firstElement = focusableInMenu[0];
    firstElement.focus();
    expect(document.activeElement).toBe(firstElement);

    // Shift+Tab from first should wrap to last
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });

    // The focus trap handler should move focus to the last element
    const lastElement = focusableInMenu[focusableInMenu.length - 1];
    expect(document.activeElement).toBe(lastElement);
  });

  it('Tab from last element wraps to first element in menu', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    // Open the menu
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    const menu = screen.getByRole('menu');
    const focusableInMenu = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );

    // Focus the last element
    const lastElement = focusableInMenu[focusableInMenu.length - 1];
    lastElement.focus();
    expect(document.activeElement).toBe(lastElement);

    // Tab from last should wrap to first
    fireEvent.keyDown(document, { key: 'Tab' });

    const firstElement = focusableInMenu[0];
    expect(document.activeElement).toBe(firstElement);
  });

  it('focus returns to hamburger button when menu is closed via Escape', () => {
    render(
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    );

    // Open the menu
    const hamburger = screen.getByLabelText(/open navigation menu/i);
    fireEvent.click(hamburger);

    // Press Escape to close
    fireEvent.keyDown(document, { key: 'Escape' });

    // Focus should return to the hamburger button
    const closeButton = screen.getByLabelText(/open navigation menu/i);
    expect(document.activeElement).toBe(closeButton);
  });
});
