export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue?: string;
  year: number;
  status: 'published' | 'under-review';
  link?: string;
  description?: string;
  pdfPath?: string; // local PDF in /public for inline viewer
}

export interface Project {
  id: string;
  title: string;
  description: string; // max 200 chars, enforced at data level
  startDate: string;   // YYYY-MM format
  endDate: string;     // YYYY-MM format or "Present"
  link?: string;       // external project/demo/repo URL
}

export interface ExperienceEntry {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string; // or "Present"
  type: 'work' | 'education';
  details?: { name: string; startDate: string; endDate: string }[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  institution: string;
  role: string;
  term: string;
  description: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  affiliation: string;
  tagline: string;           // max 150 chars
  email: string;
  linkedIn: string;
  github: string;
  photoPath: string;
  cvPath: string;
  metaTitle: string;         // max 60 chars
  metaDescription: string;   // max 160 chars
  siteUrl: string;
}
