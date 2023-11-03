import TextEditor from "../forms/text-editor/TextEditor";
import EditLinks from "../forms/EditLinks";
import { getData } from "@/lib/getData";

export default async function Podcast(){
    const data = await getData("podcast");
    const documentName = "podcast";
    const sectionName = "podcast";

    const contentHtml = data.content_html;
    const spotify_url = data.spotify_url;
    const apple_url = data.apple_url;

    return (
        <section className="editor-group">
            <h1>Editar - Podcast</h1>
            <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
            <EditLinks spotify_url={spotify_url} apple_url={apple_url} document={documentName} section={sectionName}/>
        </section>
    )
}