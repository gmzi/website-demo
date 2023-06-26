// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import ImageUpload from "../forms/ImageUpload";

export default async function Courses() {
    const data = await getData("courses")
    const documentName = "courses"
    const sectionName = "courses"
    const folderName="courses"

    const contentHtml = data.content_html;

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';

    const goals = data?.goals || []
    
    return (
        <div>
            <h1>tis is component editor Courses!!</h1>
            <label>faq editor:</label>
            <TextEditorEntry contentHtml={goals.FAQ} document={documentName} entry={'goals.FAQ'} section={sectionName}/>
            <label>Content html editor:</label>
            <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
            <ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
            <ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
            <ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/>
        </div>
    )
  }