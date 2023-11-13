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

    const image1Url = data?.image_1_url.content || '';
    const image2Url = data?.image_2_url.content || '';
    const image3Url = data?.image_3_url.content || '';
    const image4Url = data?.image_4_url.content || '';
    const image5Url = data?.image_5_url.content || '';
    const image6Url = data?.image_6_url.content || '';
    const image7Url = data?.image_7_url.content || '';

    const imageURLS = [image1Url, image2Url, image3Url, image4Url, image5Url, image6Url, image7Url];

    const filteredUrls = imageURLS.filter(item => item);


    
    return (
        <section className="">
            <h1>Edit - Bio</h1>
            <EditBio 
                contentHtml_1={html_1} 
                contentHtml_2={html_2} 
                image1Url={image1Url}
                image2Url={image2Url}
                image3Url={image3Url}
                image4Url={image4Url}
                image5Url={image5Url}
                image6Url={image6Url}
                image7Url={image7Url}
            />
        </section>
    )
  }

//   ON ADAPTING EDITBIO TO DELETE IMAGE FROM GRID:
// https://chat.openai.com/share/1654f704-7c46-4eee-9776-8325d338c87c