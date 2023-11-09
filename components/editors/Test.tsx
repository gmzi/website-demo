import TextEditor from "../forms/text-editor/TextEditor";
import ImageUpload from "../forms/ImageUpload";
import { getData, getDataWithTag } from "@/lib/getData";
import { EditAbout } from "../forms/EditAbout";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import { EditTest } from "../forms/EditTest";

const IMAGE_MAIN_FOLDER = process.env.IMAGE_MAIN_FOLDER;

export default async function Test(){
    // const data = await getData("about");
    const data = await getRemoteOrLocalData("test");
    const documentName = "test";
    const sectionName = "/test";
    const folderName = "test";

    const imageUrl = data?.image_1_url.content || '';
    // const contentHtml = data?.content_html.content || '';
    const contentHtml = data?.content_html.content || '<p>/</p>';
    

    return (
        <>
            <h1>Editar - Inicio</h1>
            <EditTest contentHtml={contentHtml} imageUrl={imageUrl}/>
        </>
    )
}

/*
<TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
<ImageUpload imageUrl={imageUrl} document={documentName} folder={folderName} entry={'image_url'} section={sectionName}/>
*/