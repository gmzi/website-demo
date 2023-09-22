import type { Metadata } from "next";
import { getData } from "@/lib/getData";
import Image from "next/image";

export interface WrittenPressArticle {
    veredict: string;
    quote: string;
    media_organizaon: string;
    journalist: string;
    date: string;
    article_url: string;
    show: string;
}

export interface VideoPressArticle {
    show_title: string;
    video_url: string;
    description: string;
    source_organization: string;
}

export const metadata: Metadata = {
    title: 'Prensa',
    description: 'articulos de prensa'
}

export default async function PressPage() {

    const data = await getData('press');

    const hero_image_url = data.hero_image_url;

    const written_articles = data.written_press;

    const video_articles = data.video_press;

    return (
        <section>
            <h1>Prensa</h1>
            <h2>Artículos</h2>
            <h2>Entrevistas</h2>
        </section>
    )
}