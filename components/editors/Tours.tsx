import { getData } from "@/lib/getData";
import {ToursList} from "../forms/EditTours";




export default async function Tours(){
    const data = await getData("tours");

    const documentName = "tours";
    const sectionName = "tours";
    const folderName = "tours";

    const tours = [...data?.content] || [];

    return (
        <div>
            <h1>Giras</h1>
            <ToursList tours={tours} />
            {/* <CreateTour document={documentName} entry={"content"} section={sectionName}/> */}
            {/* <CreateTour/>
            {tours.map((item: Tour, index: number) => (
                <div key={`item-${item.id}`}>
                    <div>{item.title_or_place}</div>
                    <Delete document={documentName} entry={`content`} section={sectionName} id={item.id}/>
                    <EditTour tour={item}/>
                </div>
            ))} */}
        </div>
    )
}