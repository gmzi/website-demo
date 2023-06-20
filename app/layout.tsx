import './globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { Inter } from 'next/font/google'
import { getMetadata } from '@/lib/getMetadata'
import { getLetterAfterSlash } from '@/lib/getLetterAfterSlash'
import { Analytics } from '@vercel/analytics/react';
import {metadata} from '../metadata'

// const inter = Inter({ subsets: ['latin'] })

const BASE_URL = process.env.BASE_URL;

// APPROACH 1: 
// import {local} from '../metadata-source.js'
// and then:
// export const metadata: Metadata = {
//    title: local.title
// }
export async function generateMetadata(){

  // const remote = await getMetadata()

  // LOCAL METADATA , REMOVE THIS AND UNCOMMENT ABOVE TO GET METADATA FROM DB
  const remote = metadata;


  const twitterUrl = remote?.social?.find(platf => platf.name === "twitter")?.url|| "//twitter";
  const twitterHandle = getLetterAfterSlash(twitterUrl)

  return {
    title: remote?.title,
    description: remote?.description,

    metadataBase: new URL(`${BASE_URL}`),

    alternates: {
      canonical: '/',
      languages: {
        'en-US': '/',
        // TODO:
        // 'es-ES': `/es`,
      }
    },

    openGraph: {
      title: remote?.title,
      description: remote?.description,
      url: BASE_URL,
      images: [
        {
          url: '/server/og', 
        }
      ],
      siteName: remote?.site_name,
      locale: 'en-US', 
      type: 'website'
    },

    generator: 'Next.js',
    applicationName: remote?.site_name,
    referrer: 'origin-when-cross-origin',
    keywords: remote?.keywords,
    authors: [{ name: remote?.author_name, url: BASE_URL}],
    creator: 'gmzi',
    publisher: 'gmzi',

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    icons: {
      icon: './favicon.ico',
      shortcut: '',
      apple: '',
      other: {
        rel: '',
        url: '',
      },
    },

    // colorScheme: 'dark',
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'ghostwhite' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],

    // TODO
    // manifest: '../public/manifest.json',
    twitter: {
      card: 'summary_large_image',
      title: remote?.title,
      description: remote?.description,
      siteId: '',
      creator: twitterHandle,
      creatorId: '',
      images: ['/server/og'],
    },

    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: ['', ''],
      },
    },

    category: remote?.keywords?.[0] || "arts"
  }
}

const prodEnv = process.env.NODE_ENV === "production" ? true : false;

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body 
      // className={inter.className}
      >
        {children}
        {/* UNCOMMENT BELOW TO ENABLE ANALYTICS */}
        {/* {prodEnv && <Analytics/>} */}
      </body>
    </html>
  )
}