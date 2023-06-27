// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import TextEditor from "../forms/text-editor/TextEditor";
import TextEditorEntry from "../forms/text-editor/TextEditorEntry";
import InputEditor from "../forms/text-editor/InputEditor";
import TextEditorIndex from '../forms/text-editor/InputEditor';
import ImageUpload from "../forms/ImageUpload";
import document from '@/document.json'
import type { Show } from "@/app/(personal)/shows/page";

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

    const shows = data.content || [];
    
    return (
        <div>
            <h1>Shows Editor!!!</h1>
            {shows.map((show: Show, index: number) => (
                <div className='editor-showCard' key={`show-${show.title}`}>
                    <h2>{show.title} - edit </h2>
                    <ImageUpload imageUrl={show.image_1_url} document={documentName} folder={folderName} entry={`${documentName}.content[${index}].image_1_url`} section={sectionName}/>
                    <h2>title</h2>
                    {/* <TextEditorEntry contentHtml={show.title} document={documentName} entry={`content.${index}.title`} section={sectionName}/> */}
                    <InputEditor contentText={show.title} document={documentName} entry={`content.${index}.title`} section={sectionName}/>
                </div>
            ))}
        </div>
        // <div>
        //     <h1>tis is component editor Courses!!</h1>
        //     <label>faq editor:</label>
        //     <TextEditorEntry contentHtml={FAQ} document={documentName} entry={'FAQ'} section={sectionName}/>
        //     <label>online add editor:</label>
        //     <TextEditorEntry contentHtml={onlineDescription} document={documentName} entry={'online.description'} section={sectionName}/>
        //     <TextEditorEntry contentHtml={onlineLogistics} document={documentName} entry={'online.logistics'} section={sectionName}/>
        //     <label>Content html editor:</label>
        //     <TextEditor contentHtml={contentHtml} document={documentName} section={sectionName}/>
        //     <ImageUpload imageUrl={image1Url} document={documentName} folder={folderName} entry={'image_1_url'} section={sectionName}/>
        //     <ImageUpload imageUrl={image2Url} document={documentName} folder={folderName} entry={'image_2_url'} section={sectionName}/>
        //     <ImageUpload imageUrl={image3Url} document={documentName} folder={folderName} entry={'image_3_url'} section={sectionName}/>
        // </div>
    )
  }