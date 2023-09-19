import type { Metadata } from "next"
import Link from "next/link"
import { SpotifyIcon } from "@/components/shared/icons"
import { ApplePodcastsIcon } from "@/components/shared/icons"
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'

export const metadata: Metadata = {
    title: 'Podcast',
    description: "testigo de la creación, el podcast de Fernando Ferrer"
}

export default async function PodcastPage() {

    const data = await getData("podcast");
    const text = parse(data?.content_html) || '';
    const spotify_url = data?.spotify_url;
    const apple_url = data?.apple_url;


    return (
        <section>
            <div className="podcast-page">
                <h1>Podcast</h1>
                <h2>Testigo de la creaci&#243;n</h2>
                {text}
                <div className="links">
                    <h3>Escuchar en:</h3>
                    <Link href={spotify_url} target="_blank"><SpotifyIcon/></Link>
                    <Link href={apple_url} target="_blank"><ApplePodcastsIcon/></Link>
                </div>
            </div>
        </section>
    )
}