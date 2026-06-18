import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { CVDownloadButton } from './CVDownloadButton';

export function Hero() {
  return (
    <section
      id="about"
      className="px-6 py-16 md:py-24 max-w-4xl mx-auto"
      aria-label="About Muhammad Saad Ali"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Professional Photo */}
        <div className="shrink-0">
          <Image
            src={siteConfig.photoPath}
            alt="Muhammad Saad Ali, AI Software Engineer and Researcher"
            width={400}
            height={400}
            priority
            className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-2 border-[var(--color-border)]"
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-primary)]">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-lg text-[var(--color-text-muted)]">
            {siteConfig.title} · {siteConfig.affiliation}
          </p>
          <p className="mt-4 text-[var(--color-text)] max-w-lg">
            {siteConfig.tagline}
          </p>

          {/* Contact Links */}
          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Send email to Muhammad Saad Ali"
              className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px] min-w-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-sm font-medium">Email</span>
            </a>

            <a
              href={siteConfig.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Muhammad Saad Ali's LinkedIn profile"
              className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px] min-w-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </a>

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Muhammad Saad Ali's GitHub profile"
              className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] min-h-[44px] min-w-[44px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>

          {/* CV Download Button */}
          <div className="mt-6">
            <CVDownloadButton />
          </div>
        </div>
      </div>
    </section>
  );
}
