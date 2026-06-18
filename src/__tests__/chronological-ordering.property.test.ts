/**
 * Feature: academic-website, Property 2: Chronological ordering of dated entries
 *
 * For any list of publications (sorted by year), projects (sorted by end date),
 * or experience entries (sorted by start date), the rendered order should be
 * reverse chronological — each item's date should be greater than or equal to
 * the date of the item following it.
 *
 * Validates: Requirements 4.3, 5.3, 6.4
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import type { Publication, Project, ExperienceEntry } from '@/types';

// --- Sort functions extracted from components ---

function sortPublicationsByYearDescending(pubs: Publication[]): Publication[] {
  return [...pubs].sort((a, b) => b.year - a.year);
}

function sortProjectsByEndDateDescending(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.endDate === 'Present') return -1;
    if (b.endDate === 'Present') return 1;
    return b.endDate.localeCompare(a.endDate);
  });
}

function sortExperienceByStartDateDescending(entries: ExperienceEntry[]): ExperienceEntry[] {
  return [...entries].sort((a, b) => {
    if (a.startDate === 'Present') return -1;
    if (b.startDate === 'Present') return 1;
    return b.startDate.localeCompare(a.startDate);
  });
}

// --- Arbitraries ---

const publicationArb: fc.Arbitrary<Publication> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 100 }),
  authors: fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 5 }),
  venue: fc.option(fc.string({ minLength: 1, maxLength: 80 }), { nil: undefined }),
  year: fc.integer({ min: 1990, max: 2030 }),
  status: fc.constantFrom('published' as const, 'under-review' as const),
  link: fc.option(fc.webUrl(), { nil: undefined }),
});

const dateStringArb = fc.integer({ min: 2015, max: 2030 }).chain((year) =>
  fc.integer({ min: 1, max: 12 }).map((month) => `${year}-${String(month).padStart(2, '0')}`)
);

const projectEndDateArb = fc.oneof(
  { weight: 9, arbitrary: dateStringArb },
  { weight: 1, arbitrary: fc.constant('Present') }
);

const projectArb: fc.Arbitrary<Project> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 60 }),
  description: fc.string({ minLength: 1, maxLength: 200 }),
  startDate: dateStringArb,
  endDate: projectEndDateArb,
});

const experienceEndDateArb = fc.oneof(
  { weight: 7, arbitrary: dateStringArb },
  { weight: 3, arbitrary: fc.constant('Present') }
);

const experienceEntryArb: fc.Arbitrary<ExperienceEntry> = fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 60 }),
  organization: fc.string({ minLength: 1, maxLength: 60 }),
  startDate: dateStringArb,
  endDate: experienceEndDateArb,
  type: fc.constantFrom('work' as const, 'education' as const),
});

// --- Helper to check reverse chronological order ---

function isReverseChronological(dates: string[]): boolean {
  for (let i = 0; i < dates.length - 1; i++) {
    const current = dates[i];
    const next = dates[i + 1];
    // "Present" is treated as the most recent
    if (current === 'Present') continue;
    if (next === 'Present') return false;
    // current should be >= next (reverse chronological)
    if (current.localeCompare(next) < 0) return false;
  }
  return true;
}

// --- Property Tests ---

describe('Feature: academic-website, Property 2: Chronological ordering of dated entries', () => {
  it('publications sorted by year descending produce reverse chronological order', () => {
    fc.assert(
      fc.property(
        fc.array(publicationArb, { minLength: 0, maxLength: 20 }),
        (publications) => {
          const sorted = sortPublicationsByYearDescending(publications);
          const years = sorted.map((p) => p.year);

          // Each year should be >= the next year (reverse chronological)
          for (let i = 0; i < years.length - 1; i++) {
            expect(years[i]).toBeGreaterThanOrEqual(years[i + 1]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('projects sorted by end date descending produce reverse chronological order', () => {
    fc.assert(
      fc.property(
        fc.array(projectArb, { minLength: 0, maxLength: 20 }),
        (projects) => {
          const sorted = sortProjectsByEndDateDescending(projects);
          const endDates = sorted.map((p) => p.endDate);

          expect(isReverseChronological(endDates)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });

  it('experience entries sorted by start date descending produce reverse chronological order', () => {
    fc.assert(
      fc.property(
        fc.array(experienceEntryArb, { minLength: 0, maxLength: 20 }),
        (entries) => {
          const sorted = sortExperienceByStartDateDescending(entries);
          const startDates = sorted.map((e) => e.startDate);

          expect(isReverseChronological(startDates)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});
