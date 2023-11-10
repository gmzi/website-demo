import '../globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import {
  Space_Mono,
  Inter,
  Lusitana,
} from 'next/font/google';
import { Navbar } from '../../components/global/Navbar'
import { Footer } from '@/components/global/Footer'
import { Analytics } from '@vercel/analytics/react'

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'ghostwhite' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: '400'
});

const BASE_URL = process.env.BASE_URL;

export const metadata: Metadata = {
  title: 'Tennesee Williams',
  // description: 'Sitio oficial de Tennesee Williams, dramaturgo, director, docente, actor',
  metadataBase: new URL(`${BASE_URL}`),
  generator: 'Tennesee Williams',
  applicationName: 'Tennesee Williams',
  referrer: 'origin-when-cross-origin',
  keywords: ['tennessee', 'williams', 'theater', 'drama', 'acting', 'art', 'culture'],
  authors: [{ name: 'Tennesee Williams', url: `${BASE_URL}` }, { name: 'gmzi', url: 'https://twitter.com/spiritusliteram' }],
  creator: 'Tennesee Williams',
  publisher: 'Tennesee Williams',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Tennesee Williams',
    description: 'website about Tennesee Williams',
    url: `${BASE_URL}`,
    siteName: 'Tennesee Williams',
    // images: '/og-image.png',
    images: [{ url: '/server/og' }],
    locale: 'es-ES',
    type: 'website',
  },
  robots: {
    index: true,
    follow: false,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icons/favicon.ico',
    apple: "/icons/icon-96.png",
  },
  manifest: '/manifest.json',
  twitter: {
    card: 'summary_large_image',
    title: 'Tennesee Williams',
    description: 'sitio oficial',
    siteId: '',
    creator: '',
    creatorId: '',
    images: [`${BASE_URL}/server/og`],
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
  },
  archives: [`${BASE_URL}/shows`],
  bookmarks: [`${BASE_URL}`],
  category: 'arts',
};


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="es">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
          {children}
          {/* <Analytics/> */}
        </main>
        <Footer />
      </body>
    </html>
  )
}
