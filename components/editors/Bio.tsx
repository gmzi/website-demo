// http://localhost:3000/editor/bio

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import ImageUpload from "../forms/ImageUpload";

export default async function Bio() {
    const data = await getData("bio")
    const documentName = "bio"
    const sectionName = "bio"
    const folderName="bio"

    const contentHtml = data.content_html;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    
    return (
        <div>
            <h1>tis is component editor Bio!!</h1>
            <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
            <ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
            <ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
            <ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/>
        </div>
    )
  }