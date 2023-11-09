import { MetadataRoute } from 'next'

const BASE_URL = process.env.BASE_URL;
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/editor/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}