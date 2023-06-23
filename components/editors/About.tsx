import TextEditor from "../forms/text-editor/TextEditor";
import ImageUpload from "../forms/ImageUpload";
import { getData } from "@/lib/getData";

export default async function About(){
    const data = await getData("about");
    const documentName = "about";
    const sectionName = "/";
    const folderName = "about";

    const imageUrl = data.image_url;
    const contentHtml = data.content_html;

    return (
        <div>
            <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
            <ImageUpload imageUrl={imageUrl} document={documentName} folder={folderName} entry={'image_url'} section={sectionName}/>
        </div>
    )
}