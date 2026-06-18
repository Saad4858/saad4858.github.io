/**
 * Feature: academic-website, Property 4: Experience and Education entry rendering correctness
 *
 * For any valid ExperienceEntry, the rendered output should contain the job title,
 * organization name, and date range. For any entry where endDate is "Present",
 * the rendered output should display the literal text "Present" as the end date.
 *
 * Validates: Requirements 6.1, 6.2, 6.3
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import * as fc from 'fast-check';
import type { ExperienceEntry, EducationEntry } from '@/types';

// Mock the data imports so we can inject generated data
vi.mock('@/data/experience', () => ({
  experience: [] as ExperienceEntry[],
  education: [] as EducationEntry[],
}));

import * as experienceData from '@/data/experience';
import { Experience } from '@/app/_components/Experience';

// Arbitrary for YYYY-MM date strings
const dateArb = fc.tuple(
  fc.integer({ min: 2000, max: 2030 }),
  fc.integer({ min: 1, max: 12 })
).map(([year, month]) => `${year}-${String(month).padStart(2, '0')}`);

// Arbitrary for non-empty trimmed strings (titles, organizations)
const nonEmptyStringArb = fc
  .string({ minLength: 1, maxLength: 50 })
  .filter((s) => s.trim().length > 0)
  .map((s) => s.trim());

// Arbitrary for endDate: either a YYYY-MM date or "Present"
const endDateArb = fc.oneof(dateArb, fc.constant('Present'));

// Arbitrary for ExperienceEntry
const experienceEntryArb = fc.record({
  id: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
  title: nonEmptyStringArb,
  organization: nonEmptyStringArb,
  startDate: dateArb,
  endDate: endDateArb,
  type: fc.constantFrom('work' as const, 'education' as const),
});

describe('Feature: academic-website, Property 4: Experience and Education entry rendering correctness', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rendered output contains the job title for any ExperienceEntry', () => {
    fc.assert(
      fc.property(experienceEntryArb, (entry) => {
        // Inject generated entry into the mocked module
        (experienceData as { experience: ExperienceEntry[] }).experience = [entry];
        (experienceData as { education: EducationEntry[] }).education = [];

        const { container, unmount } = render(<Experience />);
        const text = container.textContent || '';

        expect(text).toContain(entry.title);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('rendered output contains the organization name for any ExperienceEntry', () => {
    fc.assert(
      fc.property(experienceEntryArb, (entry) => {
        (experienceData as { experience: ExperienceEntry[] }).experience = [entry];
        (experienceData as { education: EducationEntry[] }).education = [];

        const { container, unmount } = render(<Experience />);
        const text = container.textContent || '';

        expect(text).toContain(entry.organization);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('rendered output contains the date range (startDate – endDate) for any ExperienceEntry', () => {
    fc.assert(
      fc.property(experienceEntryArb, (entry) => {
        (experienceData as { experience: ExperienceEntry[] }).experience = [entry];
        (experienceData as { education: EducationEntry[] }).education = [];

        const { container, unmount } = render(<Experience />);
        const text = container.textContent || '';

        // The component renders: {startDate} – {endDate}
        expect(text).toContain(entry.startDate);
        expect(text).toContain(entry.endDate);

        unmount();
      }),
      { numRuns: 100 }
    );
  });

  it('when endDate is "Present", the literal text "Present" appears in the output', () => {
    const presentEntryArb = fc.record({
      id: fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
      title: nonEmptyStringArb,
      organization: nonEmptyStringArb,
      startDate: dateArb,
      endDate: fc.constant('Present'),
      type: fc.constantFrom('work' as const, 'education' as const),
    });

    fc.assert(
      fc.property(presentEntryArb, (entry) => {
        (experienceData as { experience: ExperienceEntry[] }).experience = [entry];
        (experienceData as { education: EducationEntry[] }).education = [];

        const { container, unmount } = render(<Experience />);
        const text = container.textContent || '';

        expect(text).toContain('Present');

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
