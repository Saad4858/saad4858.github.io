import type { Metadata } from 'next';
import { Inter, Source_Sans_3 } from 'next/font/google';
import { ThemeProvider } from './_components/ThemeProvider';
import { SkipToContent } from './_components/SkipToContent';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const sourceSansPro = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-source-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muhammadsaadali.com'),
  title: 'Muhammad Saad Ali — AI Engineer & Researcher',
  description:
    'Academic website of Muhammad Saad Ali, AI Software Engineer and Researcher at LUMS, focused on human-centered AI and HCI-driven systems.',
  openGraph: {
    title: 'Muhammad Saad Ali — AI Engineer & Researcher',
    description:
      'Academic website of Muhammad Saad Ali, AI Software Engineer and Researcher at LUMS, focused on human-centered AI and HCI-driven systems.',
    type: 'website',
    images: ['/og-image.png'],
  },
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Saad Ali',
  jobTitle: 'AI Software Engineer & Researcher',
  affiliation: {
    '@type': 'Organization',
    name: 'LUMS',
  },
  url: 'https://muhammadsaadali.com',
  sameAs: [
    'https://linkedin.com/in/muhammadsaadali',
    'https://github.com/muhammadsaadali',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSansPro.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text font-sans">
        <ThemeProvider>
          <SkipToContent />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
