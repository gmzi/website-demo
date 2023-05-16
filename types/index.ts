export interface remoteMetadata {
    title?: string,
    description?: string,
    language?: string,
    site_name?: string, 
    author_name?: string, 
    og_image_url?: string | URL,
    social?: Array<{name: string, url: string}>
    contact_url?: string,
    keywords?: string[]
  }

  export interface navbarItem {
  slug?: string
  title?: string
}

export interface logoItems {
  title: string
  subtitle: string
}

export interface socialItems {
  name: string
  url: string | URL
}