/**
 * Feature: academic-website, Property 3: Project card rendering correctness
 *
 * For any valid Project object with a description of at most 200 characters,
 * the rendered project card should contain the project title, the full
 * description, and the date range (start and end).
 *
 * Validates: Requirements 5.1
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import { ProjectCard } from '@/app/_components/ProjectCard';
import { Project } from '@/types';

// Helper to format a date string the same way the component does
function formatDate(date: string): string {
  if (date === 'Present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

// Arbitrary for YYYY-MM date strings
const yearArb = fc.integer({ min: 2000, max: 2030 });
const monthArb = fc.integer({ min: 1, max: 12 });
const dateArb = fc.tuple(yearArb, monthArb).map(
  ([y, m]) => `${y}-${String(m).padStart(2, '0')}`
);

// Arbitrary for end date: either a YYYY-MM string or "Present"
const endDateArb = fc.oneof(dateArb, fc.constant('Present'));

// Arbitrary for non-empty printable strings (for title and id)
const nonEmptyStringArb = fc.string({ minLength: 1, maxLength: 50 }).filter(
  (s) => s.trim().length > 0
);

// Arbitrary for description: non-empty string up to 200 chars
const descriptionArb = fc.string({ minLength: 1, maxLength: 200 }).filter(
  (s) => s.trim().length > 0
);

// Arbitrary for a valid Project object
const projectArb: fc.Arbitrary<Project> = fc.record({
  id: nonEmptyStringArb,
  title: nonEmptyStringArb,
  description: descriptionArb,
  startDate: dateArb,
  endDate: endDateArb,
});

describe('Feature: academic-website, Property 3: Project card rendering correctness', () => {
  it(
    'rendered card contains the project title',
    () => {
      fc.assert(
        fc.property(projectArb, (project) => {
          const { container, unmount } = render(<ProjectCard project={project} />);
          const text = container.textContent ?? '';
          expect(text).toContain(project.title);
          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'rendered card contains the full description text',
    () => {
      fc.assert(
        fc.property(projectArb, (project) => {
          const { container, unmount } = render(<ProjectCard project={project} />);
          const text = container.textContent ?? '';
          expect(text).toContain(project.description);
          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );

  it(
    'rendered card contains the formatted date range',
    () => {
      fc.assert(
        fc.property(projectArb, (project) => {
          const { container, unmount } = render(<ProjectCard project={project} />);
          const text = container.textContent ?? '';

          const formattedStart = formatDate(project.startDate);
          const formattedEnd = formatDate(project.endDate);

          expect(text).toContain(formattedStart);
          expect(text).toContain(formattedEnd);
          unmount();
        }),
        { numRuns: 100 }
      );
    }
  );
});
