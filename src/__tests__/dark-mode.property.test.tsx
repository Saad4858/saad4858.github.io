/**
 * Feature: academic-website, Property 6: Dark mode preference round-trip
 *
 * For any theme value ("light" or "dark"), setting the theme should persist
 * the value to localStorage, and initializing the ThemeProvider should read
 * from localStorage and restore the previously set theme.
 *
 * Validates: Requirements 9.4, 9.5
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import * as fc from 'fast-check';
import { ThemeProvider, useTheme } from '@/app/_components/ThemeProvider';

// Helper component that exposes theme context for testing
function ThemeConsumer({ onTheme }: { onTheme: (theme: string) => void }) {
  const { theme, setTheme } = useTheme();
  onTheme(theme);
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="set-light" onClick={() => setTheme('light')}>
        Light
      </button>
      <button data-testid="set-dark" onClick={() => setTheme('dark')}>
        Dark
      </button>
    </div>
  );
}

// Arbitrary for theme values
const themeArb = fc.constantFrom('light' as const, 'dark' as const);

describe('Feature: academic-website, Property 6: Dark mode preference round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it(
    'persists theme to localStorage when set',
    () => {
      fc.assert(
        fc.property(themeArb, (themeValue) => {
          // Clear state before each iteration
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          let currentTheme = '';
          const { unmount } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={(t) => (currentTheme = t)} />
            </ThemeProvider>
          );

          // Set the theme
          act(() => {
            screen.getByTestId(`set-${themeValue}`).click();
          });

          // Verify localStorage was updated
          const stored = localStorage.getItem('theme');
          expect(stored).toBe(themeValue);

          // Verify the component reflects the theme
          expect(currentTheme).toBe(themeValue);

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'restores theme from localStorage on mount',
    () => {
      fc.assert(
        fc.property(themeArb, (themeValue) => {
          // Clear state and pre-set localStorage
          localStorage.clear();
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', themeValue);

          let currentTheme = '';
          const { unmount } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={(t) => (currentTheme = t)} />
            </ThemeProvider>
          );

          // After mount, the theme should be restored from localStorage
          expect(currentTheme).toBe(themeValue);

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'round-trip: set then restore produces same theme',
    () => {
      fc.assert(
        fc.property(themeArb, (themeValue) => {
          // Clear state
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          // Phase 1: Mount, set theme, unmount
          let phase1Theme = '';
          const { unmount: unmount1 } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={(t) => (phase1Theme = t)} />
            </ThemeProvider>
          );

          act(() => {
            screen.getByTestId(`set-${themeValue}`).click();
          });

          expect(phase1Theme).toBe(themeValue);
          unmount1();

          // Phase 2: Mount fresh provider, verify it reads the persisted theme
          let phase2Theme = '';
          const { unmount: unmount2 } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={(t) => (phase2Theme = t)} />
            </ThemeProvider>
          );

          // The theme should be restored from localStorage
          expect(phase2Theme).toBe(themeValue);

          unmount2();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'applies dark class on document.documentElement when theme is dark',
    () => {
      fc.assert(
        fc.property(themeArb, (themeValue) => {
          // Clear state
          localStorage.clear();
          document.documentElement.classList.remove('dark');

          const { unmount } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={() => {}} />
            </ThemeProvider>
          );

          act(() => {
            screen.getByTestId(`set-${themeValue}`).click();
          });

          if (themeValue === 'dark') {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
          } else {
            expect(document.documentElement.classList.contains('dark')).toBe(false);
          }

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'defaults to light when localStorage has invalid value',
    () => {
      const invalidValues = fc.oneof(
        fc.string().filter((s) => s !== 'light' && s !== 'dark'),
        fc.constant(''),
        fc.constant('DARK'),
        fc.constant('LIGHT'),
        fc.constant('auto')
      );

      fc.assert(
        fc.property(invalidValues, (invalidValue) => {
          // Clear state and set invalid value
          localStorage.clear();
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', invalidValue);

          let currentTheme = '';
          const { unmount } = render(
            <ThemeProvider>
              <ThemeConsumer onTheme={(t) => (currentTheme = t)} />
            </ThemeProvider>
          );

          // Should default to light for invalid values
          expect(currentTheme).toBe('light');

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );
});
