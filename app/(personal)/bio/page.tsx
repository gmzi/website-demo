import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'

export const metadata: Metadata = {
    title: 'Bio',
    description: 'dramaturgo, director, docente y actor',
}

export default async function BioPage() {
    
    const data = await getData("bio");
    // this section should have: image_1_url, image_2_url, image_3_url, content_html.

    const text = parse(data?.content_html) || '';
    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';

    return (
        <section className='sectionBio'>
            <div>
                <div className='imgContainer'>
                    <Image
                        src={image1Url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '30%', 
                            height: 'auto', 
                            borderRadius: '5px', 
                            float: 'left',
                            marginRight: '1em',
                        }}
                        alt="Picture of the author"
                    />
                    <Image
                        src={image2Url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '30%', 
                            height: 'auto', 
                            borderRadius: '5px', 
                            float: 'left',
                            marginRight: '1em',
                        }}
                        alt="Picture of the author"
                    />
                    <Image
                        src={image3Url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '30%', 
                            height: 'auto', 
                            borderRadius: '5px', 
                            float: 'left',
                            marginRight: '1em',
                        }}
                        alt="Picture of the author"
                    />
                </div>
                {text}
            </div>
        </section>
    )
}