import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { type } from "os"
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"
import ImageGrid from "@/components/ImageGrid"

import image1 from '../../../public/images/grid/1.jpg'
import image2 from '../../../public/images/grid/2.jpg'
import image3 from '../../../public/images/grid/3.jpg'
import image4 from '../../../public/images/grid/4.jpg'
import image5 from '../../../public/images/grid/5.jpg'
import image6 from '../../../public/images/grid/6.jpg'


export const metadata: Metadata = {
    title: 'Bio',
    description: 'dramaturgo, director, docente y actor',
}

export default async function BioPage() {

    // const data = await getData("bio");
    const data = await getRemoteOrLocalData("bio");

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
        <section className='bio'>
            
            <h1>Bio</h1>
            <div>
                <div className="paragraphContainer">
                    {text_1}
                </div>
                <ImageGrid images={[image1Url, image2Url, image3Url]}/>
                <div className="paragraphContainer">
                    {text_2}
                </div>
            </div>
        </section>
    )
}