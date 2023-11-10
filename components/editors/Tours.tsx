import { getData } from "@/lib/getData";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import {ToursList, HeroImage} from "../forms/EditTours";




export default async function Tours(){
    // const data = await getData("tours");
    const data = await getRemoteOrLocalData("tours");

    const documentName = "tours";
    const sectionName = "tours";
    const folderName = "tours";

    const image_1_urlRaw = data?.image_1_url;
    const image_1_url = image_1_urlRaw.split("--", 2)[1];
    const tours = [...data?.content] || [];

    return (
        <section>
            <h1>Edit Tours</h1>
            <HeroImage imageUrl={image_1_url}/>
            <ToursList tours={tours} />
        </section>
    )
}