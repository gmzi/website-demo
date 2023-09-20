import { getData } from "@/lib/getData";
import type { Tour } from "@/app/(personal)/tours/page";
import CreateTour from "../forms/CreateTour";

export default async function Tours(){
    const data = await getData("tours");

    const documentName = "tours";
    const sectionName = "tours";
    const folderName = "tours";

    const tours = [...data.content] || [];

    return (
        <div>
            <h1>Giras</h1>
            <h2>Agregar una gira</h2>
            <CreateTour document={documentName} entry={"content"} section={sectionName}/>
        </div>
    )
}