import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Papers', href: '/publications' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'Teaching', href: '/teaching' },
  { label: 'Skills', href: '/skills' },
] as const;

export function PageNav({ active }: { active?: string }) {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0 48px',
        height: '52px',
        background: '#f5f5f5',
      }}
    >
      <Link
        href="/"
        style={{
          fontSize: '1rem',
          fontWeight: 400,
          color: '#1e1e1e',
          textDecoration: 'none',
        }}
      >
        Muhammad Saad Ali
      </Link>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '1rem',
              color: '#1e1e1e',
              textDecoration: 'none',
              fontWeight: active === link.href ? 700 : 400,
              borderBottom: active === link.href ? '2px solid #1e1e1e' : '2px solid transparent',
              paddingBottom: '2px',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
