import './globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { Inter } from 'next/font/google'
import { getMetadata } from '@/lib/getMetadata'
import { getLetterAfterSlash } from '@/lib/getLetterAfterSlash'
import {local} from '../metadata-source.js'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = process.env.BASE_URL;

const ogImgUrlValue: string | URL = local?.og_image_url!

const twitterUrl = local?.social?.find(platf => platf.name === "twitter")?.url|| "//twitter";
const twitterHandle = getLetterAfterSlash(twitterUrl)

// APPROACH 1: export metadata object:
// export const metadata: Metadata = {
//   title: local?.title,
//     description: local?.description,
//     openGraph: {
//       title: local?.title,
//       description: local?.description,
//       url: BASE_URL,
//       images: [
//         {
//           url: `${BASE_URL}${ogImgUrlValue}`, 
//         }
//       ],
//       siteName: local?.site_name,
//       locale: 'en-US', 
//       type: 'website'
//     },
//     generator: 'Next.js',
//     applicationName: local?.site_name,
//     referrer: 'origin-when-cross-origin',
//     keywords: local?.keywords,
//     authors: [{ name: local?.author_name, url: BASE_URL}],
//     creator: 'gmzi',
//     publisher: 'gmzi',
//     formatDetection: {
//       email: false,
//       address: false,
//       telephone: false,
//     },
//     robots: {
//       index: false,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: false,
//         noimageindex: true,
//         'max-video-preview': -1,
//         'max-image-preview': 'large',
//         'max-snippet': -1,
//       },
//     },
//     icons: {
//       icon: '/favicon.ico',
//       shortcut: '',
//       apple: '',
//       other: {
//         rel: '',
//         url: '',
//       },
//     },
//     // colorScheme: 'dark',
//     themeColor: [
//       { media: '(prefers-color-scheme: light)', color: 'ghostwhite' },
//       { media: '(prefers-color-scheme: dark)', color: 'black' },
//     ],
//     // TODO
//     // manifest: '../public/manifest.json',
//     twitter: {
//       card: 'summary_large_image',
//       title: local?.title,
//       description: local?.description,
//       siteId: '',
//       creator: twitterHandle,
//       creatorId: '',
//       images: [ogImgUrlValue],
//     },
//     verification: {
//       google: 'google',
//       yandex: 'yandex',
//       yahoo: 'yahoo',
//       other: {
//         me: ['', ''],
//       },
//     },
//     alternates: {
//       canonical: BASE_URL,
//       languages: {
//         'en-US': BASE_URL,
//         // TODO:
//         // 'es-ES': `${BASE_URL}/es`,
//       }
//     },
//     category: local?.keywords?.[0] || "arts"
//   }

// export async function generateMetadata(){
//   return {
//       title: "my title",
//       description: "my description"
//   }
// }

export async function generateMetadata(){

  const local = await getMetadata()
  
  // const ogImgUrlValue: string | URL = local?.og_image_url!

  const twitterUrl = local?.social?.find(platf => platf.name === "twitter")?.url|| "//twitter";
  const twitterHandle = getLetterAfterSlash(twitterUrl)

  return {
    title: local?.title,
    description: local?.description,

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
      title: local?.title,
      description: local?.description,
      url: BASE_URL,
      images: [
        {
          url: '/api/og', 
        }
      ],
      siteName: local?.site_name,
      locale: 'en-US', 
      type: 'website'
    },

    generator: 'Next.js',
    applicationName: local?.site_name,
    referrer: 'origin-when-cross-origin',
    keywords: local?.keywords,
    authors: [{ name: local?.author_name, url: BASE_URL}],
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
      title: local?.title,
      description: local?.description,
      siteId: '',
      creator: twitterHandle,
      creatorId: '',
      images: ['/api/og'],
    },

    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: ['', ''],
      },
    },

    category: local?.keywords?.[0] || "arts"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='text-[#2f2f2f] bg-[#f8f8ff] dark:text-[#eaeaeae6] dark:bg-[#303032]'>
      <body 
      // className={inter.className}
      >
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}