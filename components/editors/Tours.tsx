import { getData } from "@/lib/getData";
import type { Tour } from "@/app/(personal)/tours/page";
// import CreateTour from "../forms/CreateTour";
import {CreateTour} from "../forms/CreateTour";
import { Delete } from "../forms/Delete";
import { EditTour } from "../forms/EditTour";


export default async function Tours(){
    const data = await getData("tours");

    const documentName = "tours";
    const sectionName = "tours";
    const folderName = "tours";

    const tours = [...data?.content] || [];

    return (
        <div>
            <h1>Giras</h1>
            {/* <CreateTour document={documentName} entry={"content"} section={sectionName}/> */}
            <CreateTour/>
            {tours.map((tour: Tour, index: number) => (
                <div key={`tour-${tour.id}`}>
                    <div>{tour.title_or_place}</div>
                    <Delete document={documentName} entry={`content`} section={sectionName} id={tour.id}/>
                    <EditTour tour={tour}/>
                </div>
            ))}
        </div>
    )
}