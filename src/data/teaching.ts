import { Course } from '@/types';

export const courses: Course[] = [
  {
    id: 'intro-programming-crash',
    code: 'Crash Course',
    title: 'Introduction to Programming',
    institution: 'LUMS',
    role: 'Instructor',
    term: 'Summer 2023 & 2024',
    description:
      'Taught an intensive 8-week beginner course for around 100 students with no prior coding experience, covering core programming concepts and data structures through lectures and hands-on lab sessions.',
  },
  {
    id: 'cs200',
    code: 'CS-200',
    title: 'Introduction to Computing',
    institution: 'LUMS',
    role: 'Teaching Assistant',
    term: 'Fall 2022',
    description:
      'Core programming and computational thinking course. Held tutorials, designed and graded assignments, and supported students through foundational topics in problem solving and software development.',
  },
  {
    id: 'linear-algebra',
    code: 'MATH-120',
    title: 'Linear Algebra',
    institution: 'LUMS',
    role: 'Teaching Assistant',
    term: 'Spring 2022',
    description:
      'Undergraduate linear algebra covering vector spaces, matrices, eigenvalues, and applications. Ran recitations, clarified proofs and problem sets, and helped students build intuition for core concepts.',
  },
];
