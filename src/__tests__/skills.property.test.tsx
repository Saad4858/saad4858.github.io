/**
 * Feature: academic-website, Property 5: Skills section rendering with empty category hiding
 *
 * For any SkillCategory with a non-empty skills array, the rendered output should
 * display the category name as a heading and each skill as a visually distinct element.
 * For any SkillCategory with an empty skills array, the category should not appear
 * in the rendered output.
 *
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, within, cleanup } from '@testing-library/react';
import * as fc from 'fast-check';
import type { SkillCategory } from '@/types';

// Mock the skills data module so we can inject generated data
vi.mock('@/data/skills', () => ({
  skillCategories: [] as SkillCategory[],
}));

// Import the mocked module to mutate it before each render
import * as skillsData from '@/data/skills';
import { Skills } from '@/app/_components/Skills';

// Arbitrary for a non-empty skill string (alphanumeric, 1-20 chars)
const skillArb = fc
  .stringMatching(/^[a-zA-Z][a-zA-Z0-9 ]{0,19}$/)
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

// Arbitrary for a category name (starts with uppercase letter, 3-30 chars)
const categoryNameArb = fc
  .stringMatching(/^[A-Z][a-zA-Z ]{2,29}$/)
  .map((s) => s.trim())
  .filter((s) => s.length >= 3);

// Arbitrary for a non-empty SkillCategory (has at least one skill)
const nonEmptySkillCategoryArb: fc.Arbitrary<SkillCategory> = fc.record({
  id: fc.stringMatching(/^[a-z]{1,10}$/),
  name: categoryNameArb,
  skills: fc.array(skillArb, { minLength: 1, maxLength: 8 }),
});

// Arbitrary for an empty SkillCategory (skills array is empty)
const emptySkillCategoryArb: fc.Arbitrary<SkillCategory> = fc.record({
  id: fc.stringMatching(/^[a-z]{1,10}$/),
  name: categoryNameArb,
  skills: fc.constant([] as string[]),
});

// Arbitrary for a mixed list of categories (some empty, some non-empty)
const skillCategoriesArb: fc.Arbitrary<SkillCategory[]> = fc.array(
  fc.oneof(nonEmptySkillCategoryArb, emptySkillCategoryArb),
  { minLength: 1, maxLength: 6 }
);

describe('Feature: academic-website, Property 5: Skills section rendering with empty category hiding', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it('non-empty categories display their name as a heading', () => {
    fc.assert(
      fc.property(nonEmptySkillCategoryArb, (category) => {
        cleanup();
        // Inject the generated category
        (skillsData as { skillCategories: SkillCategory[] }).skillCategories = [category];

        const { container } = render(<Skills />);
        const view = within(container);

        // The category name should appear as a heading (h3)
        const headings = container.querySelectorAll('h3');
        const found = Array.from(headings).some((h) => h.textContent === category.name);
        expect(found).toBe(true);
      }),
      { numRuns: 100 }
    );
  });

  it('non-empty categories display each skill in the output', () => {
    fc.assert(
      fc.property(nonEmptySkillCategoryArb, (category) => {
        cleanup();
        // Inject the generated category
        (skillsData as { skillCategories: SkillCategory[] }).skillCategories = [category];

        const { container } = render(<Skills />);

        // Each skill should appear in the rendered output as a span
        const spans = container.querySelectorAll('span');
        const spanTexts = Array.from(spans).map((s) => s.textContent);

        for (const skill of category.skills) {
          expect(spanTexts).toContain(skill);
        }
      }),
      { numRuns: 100 }
    );
  });

  it('empty categories are hidden from the rendered output', () => {
    fc.assert(
      fc.property(emptySkillCategoryArb, (emptyCategory) => {
        cleanup();
        // Inject the empty category
        (skillsData as { skillCategories: SkillCategory[] }).skillCategories = [emptyCategory];

        const { container } = render(<Skills />);

        // The category name should NOT appear as a heading
        const headings = container.querySelectorAll('h3');
        const found = Array.from(headings).some((h) => h.textContent === emptyCategory.name);
        expect(found).toBe(false);

        // No skill spans should be rendered
        const spans = container.querySelectorAll('span');
        expect(spans.length).toBe(0);
      }),
      { numRuns: 100 }
    );
  });

  it('mixed categories: only non-empty ones are rendered, empty ones are hidden', () => {
    fc.assert(
      fc.property(skillCategoriesArb, (categories) => {
        cleanup();
        // Inject the generated categories
        (skillsData as { skillCategories: SkillCategory[] }).skillCategories = categories;

        const { container } = render(<Skills />);

        const nonEmpty = categories.filter((c) => c.skills.length > 0);
        const empty = categories.filter((c) => c.skills.length === 0);

        // Count rendered h3 headings — should match number of non-empty categories
        const renderedHeadings = container.querySelectorAll('h3');
        expect(renderedHeadings.length).toBe(nonEmpty.length);

        // All non-empty category names should appear as headings
        const headingTexts = Array.from(renderedHeadings).map((h) => h.textContent);
        for (const category of nonEmpty) {
          expect(headingTexts).toContain(category.name);
        }

        // All empty category names should NOT appear as headings
        for (const category of empty) {
          const nameAlsoInNonEmpty = nonEmpty.some((c) => c.name === category.name);
          if (!nameAlsoInNonEmpty) {
            expect(headingTexts).not.toContain(category.name);
          }
        }
      }),
      { numRuns: 100 }
    );
  });
});
