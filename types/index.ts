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

export interface Props {
    params: { id: string };
    searchParams: { [key: string]: string | string[] | undefined };
}