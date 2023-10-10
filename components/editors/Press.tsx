import { getData } from "@/lib/getData";
import type { WrittenPressArticle } from "@/types";
import type { VideoPressArticle } from "@/types";
import { PressArticles, CreatePressArticle, HeroImage, CreatePressVideo } from '@/components/forms/EditPress'
import document from '../../document.json';
import { Delete } from "../forms/Delete";
import { Edit } from "../forms/Edit";

export const runtime = 'edge'
export const preferredRegion = 'home'

export default async function Press() {
    const data = await getData("press");
    // const data = document.press;

    const documentName = "press";
    const sectionName = "press";
    const folderName = "press";

    const heroImageUrl = data?.hero_image_url || "";

    const written_articles = [...data?.written_press] || [];
    const video_articles = [...data?.video_press] || [];

    return (
        <div>
            <h1>Prensa</h1>
            <HeroImage imageUrl={heroImageUrl}/>
            <PressArticles articles={written_articles} />
            <CreatePressArticle />
            <CreatePressVideo/>
        </div>

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