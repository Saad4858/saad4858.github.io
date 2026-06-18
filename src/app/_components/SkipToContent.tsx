export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-accent"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
}
