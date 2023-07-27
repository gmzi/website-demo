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

    const shows = [...data.content].reverse() || [];
    
    return (
        <div>
            <h1>Shows Editor!!!</h1>
            <h2>Add a show</h2>
            <CreateShow document={documentName} entry={'content'} section={sectionName}/>

            <h2>Edit shows</h2>
            {shows.map((show: Show, index: number) => (
                // <div className='editor-showCard' key={`show-${show.title}`}>
                //     <h2>{show.title} - edit </h2>
                //     <ImageUpload imageUrl={show.image_1_url} document={documentName} folder={folderName} entry={`content.${index}.image_1_url`} section={sectionName}/>
                //     <h2>title</h2>
                //     <InputEditor contentText={show.title} document={documentName} entry={`content.${index}.title`} section={sectionName}/>
                //     <h2>temporadas</h2>
                //     {show.seasons.map((season, seasonIndex)=> (
                //         <div className="pairInput" key={`season-${season.theater}`}>
                //             <label>año:</label>
                //             <InputEditor contentText={`${season.year}`} document={documentName} entry={`content.${index}.seasons.${seasonIndex}.year`} section={sectionName}/>
                //             <label>sala:</label>
                //             <InputEditor contentText={`${season.theater}`} document={documentName} entry={`content.${index}.seasons.${seasonIndex}.year`} section={sectionName}/>
                //         </div>
                //     ))}
                //     <h2>Sinopsis</h2>
                //     <TextEditorEntry contentHtml={show.sinopsis} document={documentName} entry={`content.${index}.sinopsis`} section={sectionName}/>
                //     <h2>Ficha Técnica</h2>
                //     <h3>Cast</h3>
                //     {show.castAndCreative.cast.map(({name, role}, castIndex) => (
                //         <div className="pairInput" key={`cast-${name}`}>
                //             <label>nombre:</label>
                //             <InputEditor contentText={name} document={documentName} entry={`content.${index}.castAndCreative.cast.${castIndex}.name`} section={sectionName}/>
                //             <label>rol:</label>
                //             <InputEditor contentText={role} document={documentName} entry={`content.${index}.castAndCreative.cast.${castIndex}.role`} section={sectionName}/>
                //         </div>
                //     ))}
                //     <h4>Agregar cast</h4>
                //     <p>Nombre Apellido : rol, Nombre Apellido : rol</p>
                //     <InputEditorString contentString={''} document={documentName} entry={`content.${index}.castAndCreative.cast`} section={sectionName}/>
                //     <h3>Equipo Creativo</h3>
                //     {show.castAndCreative.creative.map(({role, name}, creativeIndex) => (
                //         <div className="pairInput" key={`creative-${name}`}>
                //             <label>nombre:</label>
                //             <InputEditor contentText={name} document={documentName} entry={`content.${index}.castAndCreative.creative.${creativeIndex}.name`} section={sectionName}/>
                //             <label>rol:</label>
                //             <InputEditor contentText={role} document={documentName} entry={`content.${index}.castAndCreative.creative.${creativeIndex}.role`} section={sectionName}/>
                //         </div>
                //     ))}
                //     <h4>Agregar equipo creativo</h4>
                //     <p>Nombre Apellido : rol, Nombre Apellido : rol</p>
                //     <InputEditorString contentString={''} document={documentName} entry={`content.${index}.castAndCreative.creative`} section={sectionName}/>
                //     <br />
                //     <br />
                //     <br />
                //     <br />
                //     <div>
                //         <ButtonDelete text={"DELETE SHOW"} document={documentName} entry={`content`} keyName={"title"} valueName={show.title} section={sectionName} />
                //     </div>
                // </div>
                <div key={`show-${show.title}`}>
                    <EditShow document={documentName} entry={`content`} section={sectionName} show={show} />
                    <ButtonDelete text={"DELETE SHOW"} document={documentName} entry={`content`} keyName={"title"} valueName={show.title} section={sectionName} />
                </div>
            ))}
        </div>
    )
  }