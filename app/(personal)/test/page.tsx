import type { Metadata } from "next"
import Image from 'next/image'
import { getData, getDataWithTag } from "@/lib/getData"
import parse from 'html-react-parser'
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"

export const metadata: Metadata = {
    title: 'Test',
    description: 'test',
}

export default async function TestPage() {

    // if prod env, get data from DB, else get it from /document.json
    const data = await getRemoteOrLocalData("test");
    // const data = await getData("about");

    const text = data?.content_html.content || '<p>/</p>';
    
    const parsedText = parse(text);

    const imageUrl = data?.image_1_url.content || '';

    const testing = false;

    // THIS IS WHAT WOULD BE AI GENERATED:
    // if (testing) {
    //     return (
    //         <div className="about-container">
    //             <div className="about-image">
    //                 <img src={data.image_url} alt="Profile" />
    //             </div>
    //             <div className="about-content">
    //                 <h2>{data.name}</h2>
    //                 <div dangerouslySetInnerHTML={{ __html: data.content_html }} />
    //             </div>
    //         </div>
    //     )

    // }

    return (
        <section className='about'>
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