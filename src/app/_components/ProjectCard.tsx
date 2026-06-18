'use client';

import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

function formatDate(date: string): string {
  if (date === 'Present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      tabIndex={0}
      className="rounded-lg border border-border bg-bg-alt p-6 min-h-[44px] min-w-[44px] transition-all duration-200 ease-in-out hover:scale-[1.03] hover:shadow-lg focus-visible:scale-[1.03] focus-visible:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={`Project: ${project.title}`}
    >
      <h3 className="text-lg font-semibold text-primary mb-2">
        {project.title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed mb-3">
        {project.description}
      </p>
      <p className="text-xs text-text-muted">
        {formatDate(project.startDate)} – {formatDate(project.endDate)}
      </p>
    </article>
  );
}
