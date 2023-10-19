// /editor/shows

import { getData } from "@/lib/getData";
import { ShowsList, CreateShow } from "@/components/forms/EditShows"

export default async function Shows() {
    const data = await getData("shows")

    const showsList = [...data?.content].reverse() || [];
    
    return (
        <div>
            <h1>Shows</h1>
            <ShowsList shows={showsList} />
            <CreateShow/>
        </div>
    )
  }

/* 
    // const documentName = "shows"
    // const sectionName = "shows"
    // const folderName="shows"
    <h2>Add a show</h2>
    <CreateShowFromClient document={documentName} entry={'content'} section={sectionName}/>
    <CreateShow document={documentName} entry={'content'} section={sectionName}/>
    <h2>Edit shows</h2>
    {shows.map((show: Show, index: number) => (
        <div key={`show-${show.title}`}>
            <EditShow document={documentName} entry={`content`} section={sectionName} show={show} />
            <ButtonDelete text={"DELETE SHOW"} document={documentName} entry={`content`} keyName={"title"} valueName={show.title} section={sectionName} />
        </div>
    ))}
*/