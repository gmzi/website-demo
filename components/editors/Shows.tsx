// http://localhost:3000/editor

import { getData } from "@/lib/getData";
import type { Show } from "@/types";
import { ShowsList, CreateShow } from "@/components/forms/EditShows"
import CreateShowFromClient from "../forms/CreateShowFromClient";







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

    const showsList = [...data?.content].reverse() || [];
    
    return (
        <div>
            <h1>Shows</h1>
            <ShowsList shows={showsList} />
            <CreateShow/>
            {/* <CreateShowFromClient document={documentName} entry={'content'} section={sectionName}/> */}
        </div>
    )
  }

/* 
    <h2>Add a show</h2>
    <CreateShow document={documentName} entry={'content'} section={sectionName}/>
    <h2>Edit shows</h2>
    {shows.map((show: Show, index: number) => (
        <div key={`show-${show.title}`}>
            <EditShow document={documentName} entry={`content`} section={sectionName} show={show} />
            <ButtonDelete text={"DELETE SHOW"} document={documentName} entry={`content`} keyName={"title"} valueName={show.title} section={sectionName} />
        </div>
    ))}
*/