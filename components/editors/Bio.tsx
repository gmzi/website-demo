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

    const contentHtml = data.content_html;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';

    const imageURLS = [image1Url, image2Url, image3Url];
    // continue on the passing cycle to ImagesEdit, remember to rename `ImageEdit` 
    // component to `ImageInput`, and fix all imports. 
    
    return (
        <div>
            <h2>Bio</h2>
            <EditBio contentHtml={contentHtml} imageUrls={imageURLS}/>
        </div>
    )
  }

  /* 
  <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
<ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
<ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
<ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/>
  */