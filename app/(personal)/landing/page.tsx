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
    // const data = await getData("about");

    const text = parse(data?.content_html) || '<p>/</p>';
    const imageUrl = data?.image_url || '';

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
            <h1>John Done</h1>
            <div className="heroContainer">
                <div className=''>
                    <Image
                        className="defaultImgStyle"
                        src={imageUrl}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Picture of the author"
                    />
                </div>
                <div className="paragraphContainer">
                    {text}
                </div>
            </div>
        </section>
    )
}