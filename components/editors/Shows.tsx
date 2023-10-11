// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import { getAndSortData } from "@/lib/getAndSortData";
import CreateShow from "../forms/CreateShow";
import EditShow from "../forms/EditShow";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import InputEditor from "../forms/text-editor/InputEditor";
import InputEditorString from '../forms/text-editor/InputEditorString';
import TextEditorIndex from '../forms/text-editor/InputEditor';
import ImageUpload from "../forms/ImageUpload";
import ButtonDelete from "../shared/ButtonDelete";
import document from '@/document.json'
import type { Show } from "@/types";



const isProd = process.env.NODE_ENV === 'production';

export default async function Shows() {
    // let data;
    // if (isProd){
    //     data = await getData("shows");
    // } else {
    //     data = document.shows;
    // }

    const data = await getData("shows")

    const documentName = "shows"
    const sectionName = "shows"
    const folderName="shows"

    const shows = [...data.content].reverse() || [];
    
    return (
        <div>
            <h1>Shows</h1>
            <h2>Add a show</h2>
            <CreateShow document={documentName} entry={'content'} section={sectionName}/>

            <h2>Edit shows</h2>
            {shows.map((show: Show, index: number) => (
                <div key={`show-${show.title}`}>
                    <EditShow document={documentName} entry={`content`} section={sectionName} show={show} />
                    <ButtonDelete text={"DELETE SHOW"} document={documentName} entry={`content`} keyName={"title"} valueName={show.title} section={sectionName} />
                </div>
            ))}
        </div>
    )
  }