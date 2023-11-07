import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"

export const metadata: Metadata = {
    title: 'Home',
    description: 'dramaturgo, director, docente y actor',
}

export default async function AboutPage() {

    // if prod env, get data from DB, else get it from /document.json
    const data = await getRemoteOrLocalData("about");

    const text = data?.content_html.content || '<p>/</p>';
    
    const parsedText = parse(text);

    const imageUrl = data?.image_url || '';

    const testing = false;

    return (
        <section className='about'>
            <h1>John Done</h1>
            <div className="heroContainer">
                <Image
                    className="bio-hero-image"
                    src={imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="Picture of the author"
                />
                <div className="paragraphContainer">
                    {parsedText}
                </div>
            </div>
        </section>
    )
}