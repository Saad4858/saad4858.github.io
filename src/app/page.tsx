import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';

const NAV_BUTTONS = [
  { label: 'Papers', href: '/publications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Teaching', href: '/teaching' },
  { label: 'Skills', href: '/skills' },
] as const;

export default function Home() {
  return (
    <main
      id="main-content"
      style={{
        maxWidth: 'calc(680px + 48px)',
        margin: '0 auto 0 28%',
        padding: '24px',
        minHeight: 'calc(100dvh - 48px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        {/* Photo */}
        <Image
          src={siteConfig.photoPath}
          alt="Muhammad Saad Ali, AI Software Engineer and Researcher"
          width={130}
          height={130}
          priority
          style={{
            borderRadius: '16px',
            border: '1px solid #e6e6e6',
            objectFit: 'cover',
          }}
        />

        {/* Name */}
        <h1
          style={{
            fontSize: '40px',
            fontWeight: 700,
            lineHeight: '48px',
            marginTop: '8px',
            marginBottom: 0,
            color: '#1e1e1e',
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Bio */}
        <span style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', color: '#1e1e1e' }}>
          I am an incoming M.S. in Information student at the{' '}
          <a href="https://umich.edu" target="_blank" rel="noopener noreferrer" style={{ color: '#00274C', fontWeight: 600, textDecoration: 'none' }}>University of Michigan</a>. I completed my bachelor&apos;s in Computer Science at{' '}
          <a href="https://lums.edu.pk" target="_blank" rel="noopener noreferrer" style={{ color: '#00274C', fontWeight: 600, textDecoration: 'none' }}>LUMS</a>, where I worked with{' '}
          <span style={{ color: '#00274C',fontWeight: 600 }}>Dr. Muhammad Hamad Alizai</span>. My research focuses on{' '}
          <span style={{ color: '#00274C', fontWeight: 600 }}>human-centered AI</span>,{' '}
          <span style={{ color: '#00274C', fontWeight: 600 }}>HCI-driven system design</span>, and{' '}
          <span style={{ color: '#00274C', fontWeight: 600 }}>IoT for underserved communities</span> — building systems that turn complex data into accessible, actionable insights for the people who need them most.
        </span>

        {/* Social icons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#1e1e1e',
          }}
        >
          <a href={siteConfig.cvPath} download title="CV" aria-label="Download CV (PDF)" style={{ display: 'inline-flex', padding: '10px 15px 10px 0', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: 'auto' }}>
              <path d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V8.342a2 2 0 00-.602-1.43l-4.44-4.342A2 2 0 0013.56 2H6A2 2 0 004 4z" />
              <path d="M9 13h6" /><path d="M9 17h3" /><path d="M14 2v4a2 2 0 002 2h4" />
            </svg>
          </a>
          <a href={`mailto:${siteConfig.email}`} title="Email" aria-label="Send email" style={{ display: 'inline-flex', padding: '10px 15px 10px 0', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: 'auto' }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          <a href="https://lums.edu.pk" target="_blank" rel="noopener noreferrer" title="Location" aria-label="LUMS" style={{ display: 'inline-flex', padding: '10px 15px 10px 0', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '1.6rem', height: 'auto' }}>
              <path d="M12 6.5A2.5 2.5 0 0114.5 9 2.5 2.5 0 0112 11.5 2.5 2.5 0 019.5 9 2.5 2.5 0 0112 6.5M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7m0 2A5 5 0 007 9c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 00-5-5z" />
            </svg>
          </a>
          <a href={siteConfig.linkedIn} target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn" style={{ display: 'inline-flex', padding: '10px 15px 10px 0', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: 'auto' }}>
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
            </svg>
          </a>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" title="GitHub" aria-label="GitHub" style={{ display: 'inline-flex', padding: '10px 15px 10px 0', color: 'inherit' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: '1.6rem', height: 'auto' }}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77 5.44 5.44 0 003.5 8.55c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
            </svg>
          </a>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {NAV_BUTTONS.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              style={{
                background: '#ffffff',
                border: '1px solid #e6e6e6',
                borderRadius: '8px',
                margin: '6px 12px 6px 0',
                padding: '10px',
                color: '#000000ff',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,

              }}
            >
              <span style={{ padding: '0 8px' }}>{btn.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
