import { getData } from "@/lib/getData";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import type { WrittenPressArticle } from "@/types";
import type { VideoPressArticle } from "@/types";
import { PressArticles, CreatePressArticle, HeroImage, PressVideos, CreatePressVideo } from '@/components/forms/EditPress'
import document from '../../document.json';
import { Delete } from "../forms/Delete";
import { Edit } from "../forms/Edit";

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Press() {
    // const data = await getData("press");
    const data = await getRemoteOrLocalData("press");

    const documentName = "press";
    const sectionName = "press";
    const folderName = "press";

    const image_1_url = data?.image_1_url || "";

    const written_articles = [...data?.written_press].reverse() || [];

    const video_articles = [...data?.video_press].reverse() || [];

    return (
        <section>
            <h1>Editar prensa</h1>
            <HeroImage imageUrl={image_1_url}/>
            <PressArticles articles={written_articles} />
            <PressVideos pressVideos={video_articles} />
        </section>

    )
}

/* 
{written_articles.map((article: WrittenPressArticle, index: number) => (
    <div key={`written-article-${article.id}`}>
        <div>{article.veredict}</div>
        <Delete document={documentName} entry={`written_press`} section={sectionName} id={article.id}/>
        <Edit document={documentName} entry={`written_press`} section={sectionName} item={article}/>
    </div>
))} 
*/