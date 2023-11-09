import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { SpotifyIcon } from "@/components/shared/icons"
import { ApplePodcastsIcon } from "@/components/shared/icons"
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"

export const metadata: Metadata = {
    title: 'Podcast',
    description: "testigo de la creacion, el podcast de Fernando Ferrer"
}

export default async function PodcastPage() {

    // const data = await getData("podcast");
    const data = await getRemoteOrLocalData("podcast");
    const text = parse(data?.content_html) || '';
    const spotify_url = data?.spotify_url;
    const apple_url = data?.apple_url;


    return (
        <section className="podcast">
            <h1>Podcast</h1>
            <div className='heroContainer'>
                <div>
                    <Image
                        className="max-width"
                        src='/images/podcast.jpeg'
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Picture of a class"
                    />
                    <h2>Testigo de la creación</h2>
                </div>
                <div className='description'>
                    {text}
                </div>
            </div>
            <div className="podcast-links">
                <h3>Escuchar en:</h3>
                <Link href={spotify_url} target="_blank"><SpotifyIcon/></Link>
                <Link href={apple_url} target="_blank"><ApplePodcastsIcon/></Link>
            </div>
        </section>
    )
}