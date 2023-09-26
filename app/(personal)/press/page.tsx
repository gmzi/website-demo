import type { Metadata } from "next";
import { getData } from "@/lib/getData";
import Image from "next/image";
import Link from "next/link";

export interface WrittenPressArticle {
    veredict: string;
    quote: string;
    media_organization: string;
    journalist: string;
    date: string;
    article_url: string;
    show: string;
    id: string;
}

export interface VideoPressArticle {
    show: string;
    video_url: string;
    title: string;
    description: string;
    source_organization: string;
}

export const metadata: Metadata = {
    title: 'Prensa',
    description: 'articulos de prensa'
}

export default async function PressPage() {

    const data = await getData('press');

    const hero_image_url: string = data.hero_image_url;

    const written_articles: WrittenPressArticle[] = data.written_press;

    const video_articles: VideoPressArticle[] = data.video_press;

    const written_uniqueShows: string[] = [...new Set(written_articles.map((item: { show: string }) => item.show))]

    const video_uniqueShows: string[] = [...new Set(video_articles.map((item: { show: string }) => item.show))]

    return (
        <section>
            <h1>Prensa</h1>
            <Image
                src={hero_image_url}
                alt="press-image"
                width={0}
                height={0}
                sizes="100vw"
                style={{
                    width: '70%',
                    height: 'auto',
                    borderRadius: '5px',
                    marginBottom: '.5em'
                }}
            />
            <h2>Artículos</h2>
            {written_uniqueShows.map(show => (
                <div key={show}>
                    <h3>{show}</h3>
                    {written_articles
                        .filter((item: { show: string }) => item.show === show)
                        .map((item, index) => (
                            <Link key={index} href={item.article_url}>
                                <div className="press-card">
                                    <div className="press-card-header">
                                        <h4>{item.veredict}</h4>
                                    </div>
                                    <div>
                                        <p>{item.quote}</p>
                                        <div>
                                            <span>{item.journalist}</span>
                                        </div>
                                        <div>
                                            <span>{item.media_organization}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            ))}

            <h2>Entrevistas</h2>

            {video_uniqueShows.map(show => (
                <div key={show}>
                    <h3>{show}</h3>
                    {video_articles
                        .filter((item: { show: string }) => item.show === show)
                        .map((item, index) => (
                            <div className="press-video-card" key={item.video_url}>
                                <iframe
                                    width="398"
                                    height="248"
                                    src={item.video_url}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                />
                                <div>
                                    <span>{item.description}</span>
                                </div>  
                            </div>
                        ))
                    }
                </div>
            ))}
        </section>
    )
}