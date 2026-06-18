import { courses } from '@/data/teaching';

export function Teaching() {
  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
      {courses.map((course) => (
        <article
          key={course.id}
          style={{
            marginBottom: '24px',
            padding: '24px',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e6e6e6',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '6px', color: '#1e1e1e' }}>
            {course.code} · {course.title}
          </h3>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#6c6c6c', marginBottom: '12px' }}>
            {course.role} · {course.institution} · {course.term}
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.5, color: '#1e1e1e' }}>
            {course.description}
          </p>
        </article>
      ))}
    </div>
  );
}
