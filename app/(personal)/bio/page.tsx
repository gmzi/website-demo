import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { type } from "os"
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"
import ImageGrid from "@/components/ImageGrid"


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
    const image4Url = data?.image_4_url || '';
    const image5Url = data?.image_5_url || '';
    const image6Url = data?.image_6_url || '';

    const paragraphs = data?.content_html.split(/<\/?p>/).filter(Boolean);

    const midpoint = Math.floor(paragraphs.length / 2);

    const array_1 = paragraphs.slice(0, midpoint)
    const array_2 = paragraphs.slice(midpoint)

    const html_1 = array_1.join("")
    const html_2 = array_2.join("")

    const text_1 = parse(html_1)
    const text_2 = parse(html_2)

    console.log(image1Url)
    console.log(image2Url)
    console.log(image3Url)
    console.log(image4Url)
    console.log(image5Url)
    console.log(image6Url)


    return (
        <section className='bio'>
            <h1>Bio</h1>
            <div className="imgContainer">
                <Image
                    className="bio-hero-image"
                    src={image1Url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    // style={{
                    //     width: '60%',
                    //     height: 'auto',
                    //     borderRadius: '50%'
                    // }}
                    alt="Picture of the author"
                />
            </div>

            <div>
                <div className="paragraphContainer">
                    {text_1}
                </div>

                <ImageGrid images={[image2Url, image3Url, image4Url, image5Url, image6Url]} />
                <div className="paragraphContainer">
                    {text_2}
                </div>
            </div>
        </section>
    )
}