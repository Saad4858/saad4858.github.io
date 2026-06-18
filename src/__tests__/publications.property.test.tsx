/**
 * Feature: academic-website, Property 1: Publication rendering correctness
 *
 * For any valid Publication object, rendering it should produce output containing
 * the title, all authors, year, and the correct status label ("Published" or
 * "Under Review"). If the publication has status "published" and a venue, the
 * venue should appear. If the publication has status "under-review" and no venue,
 * no venue field should be rendered.
 *
 * Validates: Requirements 4.1, 4.2, 4.4
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import type { Publication } from '@/types';

// Mock the publications data module so we can inject generated data
vi.mock('@/data/publications', () => ({
  publications: [] as Publication[],
}));

// Import the mocked module so we can mutate it per test iteration
import * as publicationsModule from '@/data/publications';
import { Publications } from '@/app/_components/Publications';

// Arbitrary for generating valid Publication objects
const publicationArb: fc.Arbitrary<Publication> = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }).map((s) => s.replace(/\s/g, '-') || 'id'),
  title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
  authors: fc.array(
    fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
    { minLength: 1, maxLength: 5 }
  ),
  venue: fc.option(
    fc.string({ minLength: 1, maxLength: 80 }).filter((s) => s.trim().length > 0),
    { nil: undefined }
  ),
  year: fc.integer({ min: 1990, max: 2030 }),
  status: fc.constantFrom('published' as const, 'under-review' as const),
  link: fc.option(
    fc.webUrl(),
    { nil: undefined }
  ),
});

describe('Feature: academic-website, Property 1: Publication rendering correctness', () => {
  it(
    'rendered output contains the title',
    () => {
      fc.assert(
        fc.property(publicationArb, (pub) => {
          // Inject the generated publication
          (publicationsModule as { publications: Publication[] }).publications = [pub];

          const { container, unmount } = render(<Publications />);
          const text = container.textContent || '';

          expect(text).toContain(pub.title);

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'rendered output contains all authors',
    () => {
      fc.assert(
        fc.property(publicationArb, (pub) => {
          (publicationsModule as { publications: Publication[] }).publications = [pub];

          const { container, unmount } = render(<Publications />);
          const text = container.textContent || '';

          // The component joins authors with ', '
          for (const author of pub.authors) {
            expect(text).toContain(author);
          }

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'rendered output contains the year',
    () => {
      fc.assert(
        fc.property(publicationArb, (pub) => {
          (publicationsModule as { publications: Publication[] }).publications = [pub];

          const { container, unmount } = render(<Publications />);
          const text = container.textContent || '';

          expect(text).toContain(String(pub.year));

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'status badge shows "Published" for published, "Under Review" for under-review',
    () => {
      fc.assert(
        fc.property(publicationArb, (pub) => {
          (publicationsModule as { publications: Publication[] }).publications = [pub];

          const { container, unmount } = render(<Publications />);
          const text = container.textContent || '';

          if (pub.status === 'published') {
            expect(text).toContain('Published');
          } else {
            expect(text).toContain('Under Review');
          }

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'if status is "published" and venue exists, venue appears in output',
    () => {
      // Generate only publications that are published with a venue
      const publishedWithVenueArb = publicationArb.filter(
        (pub) => pub.status === 'published' && pub.venue !== undefined
      );

      fc.assert(
        fc.property(publishedWithVenueArb, (pub) => {
          (publicationsModule as { publications: Publication[] }).publications = [pub];

          const { container, unmount } = render(<Publications />);
          const text = container.textContent || '';

          expect(text).toContain(pub.venue!);

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'if status is "under-review" and no venue, no venue field rendered',
    () => {
      // Generate only publications that are under-review without a venue
      const underReviewNoVenueArb = fc.record({
        id: fc.string({ minLength: 1, maxLength: 20 }).map((s) => s.replace(/\s/g, '-') || 'id'),
        title: fc.string({ minLength: 1, maxLength: 100 }).filter((s) => s.trim().length > 0),
        authors: fc.array(
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s.trim().length > 0),
          { minLength: 1, maxLength: 5 }
        ),
        year: fc.integer({ min: 1990, max: 2030 }),
        status: fc.constant('under-review' as const),
        link: fc.option(fc.webUrl(), { nil: undefined }),
      });

      fc.assert(
        fc.property(underReviewNoVenueArb, (pub) => {
          const publication: Publication = { ...pub, venue: undefined };
          (publicationsModule as { publications: Publication[] }).publications = [publication];

          const { container, unmount } = render(<Publications />);

          // Verify no italic venue element is rendered
          const italicElements = container.querySelectorAll('span.italic');
          expect(italicElements.length).toBe(0);

          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );
});
