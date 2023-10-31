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
        </div>
    )
}