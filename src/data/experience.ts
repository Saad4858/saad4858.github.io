import { ExperienceEntry, EducationEntry } from '@/types';

export const experience: ExperienceEntry[] = [
  {
    id: 'apollo',
    title: 'AI Software Engineer',
    organization: 'Apollo Studios',
    startDate: '2024-06',
    endDate: 'Present',
    type: 'work',
  },
  {
    id: 'muawin',
    title: 'Junior Software Engineer',
    organization: 'Muawin',
    startDate: '2023-06',
    endDate: '2024-05',
    type: 'work',
  },
  {
    id: 'ra-lums',
    title: 'Research Assistant',
    organization: 'LUMS',
    startDate: '2023-01',
    endDate: '2023-05',
    type: 'work',
  },
  {
    id: 'ta-lums',
    title: 'Teaching Assistant',
    organization: 'LUMS',
    startDate: '2022-09',
    endDate: '2022-12',
    type: 'work',
    details: [
      { name: 'Introduction to Programming - CS 200 - Head Teaching Assistant', startDate: 'Fall 2024', endDate: ''},
        { name: 'Instructor: Introduction to Programming (Crash Course)', startDate: 'Summer 2023 & 2024', endDate: ''},

      { name: 'Linear Algebra - Math 210', startDate: 'Fall 2023', endDate: '' },
    ],
  },
];

export const education: EducationEntry[] = [
  {
    id: 'msi-umich',
    degree: 'MSI (Master of Science in Information)',
    institution: 'University of Michigan',
    startDate: '2026',
    endDate: '2028',
  },
  {
    id: 'bs-cs',
    degree: 'BS Computer Science',
    institution: 'LUMS',
    startDate: '2021',
    endDate: '2025',
  },
];
