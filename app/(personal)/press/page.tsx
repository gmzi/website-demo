import type { Metadata } from "next";
import parse from 'html-react-parser'
import { getData } from "@/lib/getData";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import Image from "next/image";
import Link from "next/link";
import type { WrittenPressArticle } from "@/types";
import type { VideoPressArticle } from "@/types";

export const metadata: Metadata = {
    title: 'Prensa',
    description: 'articulos de prensa sobre Tennesee Williams'
}

export default async function PressPage() {

    // const data = await getData('press');
    const data = await getRemoteOrLocalData('press');

    const image_1_url: string = data.image_1_url;

    const written_articles: WrittenPressArticle[] = [...data?.written_press].reverse() || [];

    const video_articles: VideoPressArticle[] = [...data?.video_press].reverse() || [];

    const written_uniqueShows: string[] = [...new Set(written_articles.map((item: { show: string }) => item.show))]

    const video_uniqueShows: string[] = [...new Set(video_articles.map((item: { show: string }) => item.show))]

    return (
        <section className="press">
            <h1>press</h1>
            <div className="imgContainer">
                <Image
                    className="defaultImgStyle"
                    src={image_1_url}
                    alt="press-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </div>

            <h2>Artículos</h2>
            <ul className="years-list">
                {written_uniqueShows.map(show => (
                    <li key={`${show}-key`} className="">
                        <h3 className="show-item">{show}</h3>
                        <ul className="tours-list">
                            {written_articles
                                .filter((item: { show: string }) => item.show === show)
                                .map((item, index) => (
                                    <Link key={index} href={item.article_url} target="_blank" className="press-link">
                                        <li className="">
                                            <blockquote className="review">
                                                <h4>{item.veredict}</h4>
                                                {parse(item.quote)}
                                                <cite>
                                                    <div className="journalist">{item.journalist}</div>
                                                    <div className="media-organization">{item.media_organization}</div>
                                                </cite>
                                            </blockquote>
                                        </li>
                                    </Link>
                                ))
                            }

                        </ul>
                    </li>
                ))}
            </ul>

            <h2>Entrevistas</h2>
            <ul className="videos-list">
                {video_uniqueShows.map((show, i) => (
                    <li key={`${show}-${i}`}>
                        {/* <h3 className="show-item">{show}</h3> */}
                        <ul className="video-embeds">
                            {video_articles
                                .filter((item: { show: string }) => item.show === show)
                                .map((item, index) => (
                                    <li className="press-video-card" key={`${item.video_url}-${index}`}>
                                        <div className="video-container">
                                            <iframe
                                                src={item.video_url}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                title={item.description}
                                            />
                                        </div>
                                        <div className="video-description">
                                            <span>{item.description}</span>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>

                    </li>
                ))}
            </ul>
        </section>
    )
}