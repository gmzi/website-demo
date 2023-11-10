// http://localhost:3000/editor/bio

import { getData } from "@/lib/getData";
import { EditBio } from "../forms/EditBio";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";

export default async function Bio() {
    // const data = await getData("bio")
    const data = await getRemoteOrLocalData("bio")
    const documentName = "bio"
    const sectionName = "bio"
    const folderName="bio"

    const html_1 = data?.content_html_1.content || "";
    const html_2 = data?.content_html_2.content || "";

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const image4Url = data?.image_4_url || '';
    const image5Url = data?.image_5_url || '';
    const image6Url = data?.image_6_url || '';
    const image7Url = data?.image_7_url || '';

    const imageURLS = [image1Url, image2Url, image3Url, image4Url, image5Url, image6Url, image7Url];
    
    return (
        <section className="">
            <h1>Edit - Bio</h1>
            <EditBio contentHtml_1={html_1} contentHtml_2={html_2} imageUrls={imageURLS}/>
        </section>
    )
  }