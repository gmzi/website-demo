import './globals.css'
import { Metadata, ResolvingMetadata } from 'next'
import { Inter } from 'next/font/google'
import { getMetadata } from '@/lib/getMetadata'
import { getLetterAfterSlash } from '@/lib/getLetterAfterSlash'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = process.env.BASE_URL;

type Props = {
  params: {id: string};
  searchParams: {[key: string]:string | string[] | undefined};
}

export async function generateMetadata(
  // DOCS: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  {params, searchParams}: Props, 
  parent?: ResolvingMetadata,
) : Promise<Metadata> {
  const id = params.id
  const remote = await getMetadata()

  const previousImages = (await parent)?.openGraph?.images || [];

  const ogImgUrlValue: string | URL = remote?.og_image_url!

  const twitterUrl = remote?.social?.find(platf => platf.name === "twitter")?.url|| "//twitter";
  const twitterHandle = getLetterAfterSlash(twitterUrl)

  return {
    title: remote?.title,
    description: remote?.description,

    // FIX OPENGERAPH, THEN KEEP GOING, YOU'RE DOING GOOD HAVE SOME FAITH4
    openGraph: {
      title: remote?.title,
      description: remote?.description,
      url: BASE_URL,
      images: [
        {
          url: ogImgUrlValue, 
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
    colorScheme: 'dark',
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
      images: [ogImgUrlValue],
    },
    verification: {
      google: 'google',
      yandex: 'yandex',
      yahoo: 'yahoo',
      other: {
        me: ['', ''],
      },
    },
    alternates: {
      canonical: BASE_URL,
      languages: {
        'en-US': BASE_URL,
        // TODO:
        // 'es-ES': `${BASE_URL}/es`,
      }
    },
    category: remote?.keywords?.[0] || "arts"
  }
}  
// export const metadata: Metadata = {
//   title: "this is my title",
//   description: "this is my description"
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
