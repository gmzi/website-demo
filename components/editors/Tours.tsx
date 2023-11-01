import { getData } from "@/lib/getData";
import {ToursList, HeroImage} from "../forms/EditTours";




export default async function Tours(){
    const data = await getData("tours");

    const documentName = "tours";
    const sectionName = "tours";
    const folderName = "tours";

    const image_1_url = data?.image_1_url;
    const tours = [...data?.content] || [];

    return (
        <div>
            <h1>Editar Giras</h1>
            <HeroImage imageUrl={image_1_url}/>
            <ToursList tours={tours} />
        </div>
    )
}