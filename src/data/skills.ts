import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  { id: 'languages', name: 'Programming Languages', skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'Java'] },
  { id: 'web', name: 'Web & App Development', skills: ['React', 'Next.js', 'Node.js', 'Flutter', 'Tailwind CSS'] },
  { id: 'databases', name: 'Database Systems', skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase'] },
  { id: 'ml', name: 'Data Science & ML', skills: ['PyTorch', 'TensorFlow', 'scikit-learn', 'Pandas', 'NumPy'] },
  { id: 'cloud', name: 'Cloud & DevOps', skills: ['AWS', 'Docker', 'GitHub Actions', 'Vercel'] },
  { id: 'other', name: 'Other', skills: ['Git', 'Linux', 'Figma', 'LaTeX'] },
];
