import '../../globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import {
  Space_Mono,
  Inter,
  Lusitana,
} from 'next/font/google';
import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';
import { EditorNavbar } from "@/components/global/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import e from '@/app/(editor)/editor/editor.module.css'
import { Footer } from "@/components/global/Footer";

interface EditorProps {
  children?: React.ReactNode
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'ghostwhite' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

const inter = Inter({ subsets: ['latin'] });

const lusitana = Lusitana({
  subsets: ['latin'],
  weight: '400'
});

const BASE_URL = process.env.BASE_URL;


export const metadata: Metadata = {
  title: 'EDITOR',
  description: 'editor',
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
    title: 'Editor -',
    description: 'editor',
    url: `${BASE_URL}/editor`,
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
    icon: '/icons/editor-favicon.ico',
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
  archives: [`${BASE_URL}/editor`],
  bookmarks: [`${BASE_URL}/editor`],
  category: 'arts',
};

export default async function Layout({ children }: EditorProps) {

  // const { orgRole } = auth();
  const orgRole = 'admin'

  if (orgRole !== 'admin') {
    return (
      <html>
        <body>
          <ClerkProvider allowedRedirectOrigins={[`${BASE_URL}/editor`]}>
            <header>
              <UserButton afterSignOutUrl="/editor" />
              <SignOutButton />
            </header>
            <main>
              <section>
                <div className="alert">
                  <p>you are an unauthorized user to edit this page, please sign out from your
                    current account and sign back in as an authorized user</p>
                </div>
              </section>
            </main>
          </ClerkProvider>
        </body>
      </html>
    )
  }

  return (
    <html lang="es">
      <body>
        <ClerkProvider allowedRedirectOrigins={[`${BASE_URL}/editor`]}>
          <header>
            {orgRole && <EditorNavbar orgRole={orgRole} />}
          </header>
          {/* <main className={e.editorMain}> */}
          <main>
            {children}
          </main>
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  )
}

