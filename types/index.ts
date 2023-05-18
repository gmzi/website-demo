export interface RemoteMetadata {
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

export interface NavbarData {
  author_name?: string, 
  title?: string,
  description?: string,
  social?: Array<{name: string, url: string}>
}

export interface LogoItems {
  author_name: string
  description: string
}

export interface SocialData {
  name: string;
  url: string;
}