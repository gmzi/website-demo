export interface Tour {
  id: string;
  show_title: string;
  year: string;
  title_or_place: string;
  city: string;
  country: string;
  press_url: string;
  image_url: string;
}

export interface WrittenPressArticle {
  veredict: string;
  quote: string;
  media_organization: string;
  journalist: string;
  date: string;
  article_url: string;
  image_url: string;
  show: string;
  id: string;
}

export interface VideoPressArticle {
  id: string;
  show: string;
  video_url: string;
  title: string;
  description: string;
  source_organization: string;
}

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

export interface About {
  contentHtml: string;
  imageUrl: string;
}

export interface Bio {
  contentHtml: string;
  image1Url: string;
  image2url: string;
  image3Url: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
}

export interface Review{
  id: string;
  content: string;
  author: string;
}

export interface Goals {
  illustration: string[];
  FAQ: string;
}

export interface Logistics {
  title: string;
  image_url: string;
  content_html: string;
}

export interface Testimonial {
  id: string;
  content: string;
  author: string;
}

export interface Data {
  content_html: string;
}

export interface Show {
  id: string;
  title: string;
  slug: string;
  opening_date: string;
  image_1_url: string;
  image_2_url: string;
  image_3_url: string;
  theatre: string;
  sinopsis: string;
  cast: NameAndRole[];
  creative: NameAndRole[];
  musicians: NameAndRole[];
  dancers: NameAndRole[];
}

export interface NameAndRole {
  role: string;
  name: string;
}