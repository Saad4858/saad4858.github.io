import { siteConfig } from '@/data/site-config';

export function CVDownloadButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={siteConfig.cvPath}
      download
      aria-label="Download CV (PDF)"
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-3 text-sm font-medium text-white transition-colors hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px] min-w-[44px] ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      Download CV
    </a>
  );
}
