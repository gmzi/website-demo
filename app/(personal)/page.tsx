import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'

export const metadata: Metadata = {
    title: 'About',
    description: 'dramaturgo, director, docente y actor',
}

export default async function AboutPage() {
    
    const data = await getData("about");
    const text = parse(data?.content_html) || '';
    const imageUrl = data?.image_url || '';

    return (
        <section className='sectionAbout'>
            <h1>Bio</h1>
            <div>
                <div className='imgContainer'>
                    <Image
                        src={imageUrl}
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