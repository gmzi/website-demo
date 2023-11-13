import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { type } from "os"
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"
import ImageGrid from "@/components/ImageGrid"


export const metadata: Metadata = {
    title: 'Bio',
    description: ' Tennesee Williams, bio',
}

export default async function BioPage() {

    // const data = await getData("bio");
    const data = await getRemoteOrLocalData("bio");

    const image1Url = data?.image_1_url?.content || '';
    const image2Url = data?.image_2_url?.content || '';
    const image3Url = data?.image_3_url?.content || '';
    const image4Url = data?.image_4_url?.content || '';
    const image5Url = data?.image_5_url?.content || '';
    const image6Url = data?.image_6_url?.content || '';
    const image7Url = data?.image_7_url?.content || '';

    const imageURLS = [image1Url, image2Url, image3Url, image4Url, image5Url, image6Url, image7Url];
    const filteredUrls = imageURLS.filter(item => item);

    const html_1 = data?.content_html_1?.content || '';
    const html_2 = data?.content_html_2?.content || '';

    const text_1 = parse(html_1)
    const text_2 = parse(html_2)


    return (
        <section className='bio'>
            <h1>Bio</h1>
            <div className="heroContainer">
                <Image
                    className="defaultImgStyle"
                    src={image1Url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt="Picture of the author"
                />
            </div>
            <div>
                <div className="paragraphContainer">
                    {text_1}
                </div>

                <ImageGrid images={filteredUrls} />
                <div className="paragraphContainer">
                    {text_2}
                </div>
            </div>
        </section>
    )
}