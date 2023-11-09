import { getData } from "@/lib/getData";
import { EditAbout } from "../forms/EditAbout";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";

const IMAGE_MAIN_FOLDER = process.env.IMAGE_MAIN_FOLDER;

export default async function About(){
    // const data = await getData("about");
    const data = await getRemoteOrLocalData("about");
    const documentName = "about";
    const sectionName = "/";
    const folderName = "about";

    const imageUrl = data?.image_1_url.content || '';
    // const contentHtml = data?.content_html.content || '';
    const contentHtml = data?.content_html.content || '<p>/</p>';
    

    return (
        <>
            <h1>Editar - Inicio</h1>
            <EditAbout contentHtml={contentHtml} imageUrl={imageUrl}/>
        </>
    )
}