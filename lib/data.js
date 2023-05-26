const BASE_URL = process.env.NEXT_PUBLIC_URL;
import languages from './languages.json'

export const data = {
    // Current languages support: 'EN' for english, 'ES' for spanish.
    language: 'ES',
    site_name: "reflexión en música",
    author_name: "",
    title: "reflexión en música",
    description: "ensayos, artículos, conferencias, notas sobre estética musical ",
    // ogImage: `${BASE_URL}/og-image5.png`,
    ogImage: 'https://res.cloudinary.com/imagesgmzi/image/upload/v1648494033/rem-logo2_n0rybw.png',
    social: [
        { name: "email", url: "mailto:reflexionenmusica@gmail.com" },
        { name: "chat", url: "https://discord.gg/FsvK9twEuk" },
        // { name: "instagram", url: "https://www.instagram.com" },
        // { name: "youtube", url: "https://www.youtube.com" },
        // { name: "facebook", url: "https://www.facebook.com" },
        // { name: "twitter", url: "https://www.twitter.com" }
    ],
    profiles: {
      twitter: "",
  },
    contactUrl: "https://discord.gg/FsvK9twEuk"
}

export const text = languages[data.language] || languages.EN;
