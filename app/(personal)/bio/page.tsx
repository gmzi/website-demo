import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { type } from "os"

export const metadata: Metadata = {
    title: 'Bio',
    description: 'dramaturgo, director, docente y actor',
}

export default async function BioPage() {
    
    const data = await getData("bio");

    // const text = parse(data?.content_html) || '';
    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';

    const paragraphs = data?.content_html.split(/<\/?p>/).filter(Boolean);

    const midpoint = Math.floor(paragraphs.length / 2);

    const array_1 = paragraphs.slice(0, midpoint)
    const array_2 = paragraphs.slice(midpoint)

    const html_1 = array_1.join("")
    const html_2 = array_2.join("")
    
    const text_1 = parse(html_1)
    const text_2 = parse(html_2)


    return (
        <section className='sectionBio'>
            <h1>Bio</h1>
            <div>
                <Image
                    src={image1Url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '40%', 
                        height: 'auto', 
                        borderRadius: '5px',
                        float: 'left',
                        marginRight: '1em',
                    }}
                    alt="Picture of the author"
                />
                {text_1}
            </div>
            <div>
                <Image
                    src={image3Url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '30%', 
                        height: 'auto', 
                        borderRadius: '5px', 
                        float: 'right',
                        marginRight: '1em',
                    }}
                    alt="Picture of the author"
                />
                {text_2}
            </div>
        </section>
    )
}