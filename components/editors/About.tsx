import TextEditor from "../forms/text-editor/TextEditor";
import ImageUpload from "../forms/ImageUpload";
import { getData } from "@/lib/getData";
import { EditAbout } from "../forms/EditAbout";

const IMAGE_MAIN_FOLDER = process.env.IMAGE_MAIN_FOLDER;

export default async function About(){
    const data = await getData("about");
    const documentName = "about";
    const sectionName = "/";
    const folderName = "about";

    const imageUrl = data?.image_url || '';
    const contentHtml = data?.content_html || '';

    return (
        <section>
            <h1>Editar - Inicio</h1>
            <EditAbout contentHtml={contentHtml} imageUrl={imageUrl}/>
        </section>
    )
}

/*
<TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
<ImageUpload imageUrl={imageUrl} document={documentName} folder={folderName} entry={'image_url'} section={sectionName}/>
*/