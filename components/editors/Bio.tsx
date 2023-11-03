// http://localhost:3000/editor/bio

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import ImageUpload from "../forms/ImageUpload";
import { EditBio } from "../forms/EditBio";

export default async function Bio() {
    const data = await getData("bio")
    const documentName = "bio"
    const sectionName = "bio"
    const folderName="bio"

    const html_1 = data?.content_html_1;
    const html_2 = data?.content_html_2;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const image4Url = data?.image_4_url || '';
    const image5Url = data?.image_5_url || '';
    const image6Url = data?.image_6_url || '';
    const image7Url = data?.image_7_url || '';

    const imageURLS = [image1Url, image2Url, image3Url, image4Url, image5Url, image6Url, image7Url];
    // continue on the passing cycle to ImagesEdit, remember to rename `ImageEdit` 
    // component to `ImageInput`, and fix all imports. 
    
    return (
        <section className="">
            <h1>Editar - Bio</h1>
            <EditBio contentHtml_1={html_1} contentHtml_2={html_2} imageUrls={imageURLS}/>
        </section>
    )
  }

  /* 
  <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
<ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
<ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
<ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/>
  */