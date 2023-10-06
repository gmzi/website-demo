// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import ImageUpload from "../forms/ImageUpload";
import { EditHeroImage } from "../forms/EditCourses";

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
    const FAQ = data?.FAQ || [];
    const onlineDescription = data?.online.description || "";
    const onlineLogistics = data?.online.logistics || "";
    
    return (
        <div>
            <h2>Courses</h2>
            <EditHeroImage imageUrl={image1Url}/>

            {/* <label>faq editor:</label>
            <TextEditorEntry contentHtml={FAQ} document={documentName} entry={'FAQ'} section={sectionName}/>
            <label>online add editor:</label>
            <TextEditorEntry contentHtml={onlineDescription} document={documentName} entry={'online.description'} section={sectionName}/>
            <TextEditorEntry contentHtml={onlineLogistics} document={documentName} entry={'online.logistics'} section={sectionName}/>
            <label>Content html editor:</label>
            <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
            <ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
            <ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
            <ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/> */}
        </div>
    )
  }