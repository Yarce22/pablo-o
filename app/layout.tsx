import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingSocial } from './components/FloatingSocial';

const dumbledor = localFont({
  src: '../public/fonts/dum1.ttf',
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pabloorozco.com'),
  title: {
    default: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    template: '%s | Pablo Orozco',
  },
  description:
    'Portafolio de Pablo Orozco: fotografía, animación, video y contenido visual creativo.',
  keywords: [
    'fotografía',
    'animación',
    'videomaker',
    'portafolio',
    'Pablo Orozco',
    '3D',
    'producción audiovisual',
  ],
  authors: [{ name: 'Pablo Orozco' }],
  creator: 'Pablo Orozco',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://pabloorozco.com',
    siteName: 'Pablo Orozco',
    title: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    description: 'Portafolio de fotografía, animación, video y contenido visual.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    description: 'Portafolio de fotografía, animación, video y contenido visual.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

// Script síncrono para evitar flash del tema incorrecto (FOUC)
const themeScript = `(function(){
  try {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      data-theme="dark"
      className={`${dumbledor.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingSocial />
      </body>
    </html>
  );
}
