'use client';

import { useState, useEffect } from 'react';
import { publications } from '@/data/publications';
import type { Publication } from '@/types';

export function Publications() {
  const sorted = [...publications].sort((a, b) => b.year - a.year);
  const [active, setActive] = useState<Publication | null>(null);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const open = (pub: Publication) => {
    if (pub.pdfPath) setActive(pub);
    else if (pub.link) window.open(pub.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '24px' }}>
        {sorted.map((pub) => (
          <article
            key={pub.id}
            onClick={() => open(pub)}
            style={{
              marginBottom: '24px',
              padding: '24px',
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e6e6e6',
              cursor: pub.pdfPath || pub.link ? 'pointer' : 'default',
              transition: 'all .15s ease-in-out',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e6efe8';
              e.currentTarget.style.borderColor = '#4a7c59';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ffffff';
              e.currentTarget.style.borderColor = '#e6e6e6';
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.3, marginBottom: '16px', color: '#1e1e1e' }}>
              {pub.title}
            </h3>
            {pub.description && (
              <p style={{ fontSize: '1rem', lineHeight: 1.5, color: '#6c6c6c', marginBottom: '16px' }}>
                {pub.description}
              </p>
            )}
            <p style={{ fontSize: '1rem', lineHeight: 1.5, color: '#1e1e1e' }}>
              {pub.venue ? `${pub.venue}, ` : ''}{pub.year} · {pub.authors.join(', ')}
            </p>
          </article>
        ))}
      </div>

      {/* Lightbox modal */}
      {active && active.pdfPath && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3vh 2vw',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            animation: 'pdfBackdropIn 0.2s ease-out',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(960px, 94vw)',
              height: '94vh',
              display: 'flex',
              flexDirection: 'column',
              background: '#ffffff',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 24px 70px rgba(0,0,0,0.4)',
              animation: 'pdfModalIn 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
            }}
          >
            {/* macOS title bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                background: 'linear-gradient(#f6f6f6, #ececec)',
                borderBottom: '1px solid #dcdcdc',
                flexShrink: 0,
              }}
            >
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="pdf-traffic-light"
                  style={{ background: '#ff5f57' }}
                />
                <span className="pdf-traffic-light" style={{ background: '#febc2e', cursor: 'default' }} aria-hidden="true" />
                <span className="pdf-traffic-light" style={{ background: '#28c840', cursor: 'default' }} aria-hidden="true" />
              </div>

              {/* Title */}
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#3a3a3a',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flex: 1,
                  textAlign: 'center',
                  padding: '0 8px',
                }}
              >
                {active.title}
              </span>

              {/* Download */}
              <a
                href={active.pdfPath}
                download
                aria-label="Download PDF"
                style={{ color: '#6c6c6c', display: 'inline-flex', flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>

              {/* Open in new tab */}
              <a
                href={active.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open in new tab"
                style={{ color: '#6c6c6c', display: 'inline-flex', flexShrink: 0 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* PDF */}
            <iframe
              src={`${active.pdfPath}#view=FitH`}
              title={active.title}
              style={{ flex: 1, width: '100%', border: 'none', background: '#525659' }}
            />
          </div>
        </div>
      )}
    </>
  );
}
