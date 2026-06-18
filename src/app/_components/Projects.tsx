'use client';

import { projects } from '@/data/projects';

function formatDate(date: string): string {
  if (date === 'Present') return 'Present';
  const [year, month] = date.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

function sortByEndDateDescending(a: { endDate: string }, b: { endDate: string }): number {
  if (a.endDate === 'Present') return -1;
  if (b.endDate === 'Present') return 1;
  return b.endDate.localeCompare(a.endDate);
}

export function Projects() {
  const sortedProjects = [...projects].sort(sortByEndDateDescending);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
      {sortedProjects.map((project) => (
        <article
          key={project.id}
          onClick={() => {
            if (project.link) window.open(project.link, '_blank', 'noopener,noreferrer');
          }}
          style={{
            marginBottom: '24px',
            padding: '24px',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e6e6e6',
            cursor: project.link ? 'pointer' : 'default',
            transition: 'all .15s ease-in-out',
          }}
          onMouseEnter={(e) => {
            if (project.link) {
              e.currentTarget.style.background = '#e6efe8';
              e.currentTarget.style.borderColor = '#4a7c59';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ffffff';
            e.currentTarget.style.borderColor = '#e6e6e6';
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '12px', color: '#1e1e1e' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.5, color: '#6c6c6c', marginBottom: '12px' }}>
            {project.description}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.5, color: '#6c6c6c' }}>
            {formatDate(project.startDate)} – {formatDate(project.endDate)}
          </p>
        </article>
      ))}
    </div>
  );
}
