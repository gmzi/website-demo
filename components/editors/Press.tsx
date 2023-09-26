import { getData } from "@/lib/getData";
import type { WrittenPressArticle } from "@/app/(personal)/press/page";
import type { VideoPressArticle } from "@/app/(personal)/press/page";
import CreatePressVideo from "../forms/press/CreatePressVideo";
import {CreatePressArticle} from "../forms/press/CreatePressArticle"

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Press() {
    const data = await getData("press");

    const documentName = "press";
    const sectionName = "press";
    const folderName = "press";

    const written_articles = [...data.written_press] || [];
    const video_articles = [...data.video_press] || [];

    return (
        <div>
            <h1>Prensa</h1>
            <h2>Agregar un artículo</h2>
            <CreatePressArticle/>
            <CreatePressVideo document={documentName} entry={"video_press"} section={sectionName} />
        </div>

    )
}