import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"
import ShowCard from "@/components/ShowCard"
import {ShowDisplay} from '@/components/ShowDisplay'
import ShowsGallery from "@/components/ShowsGallery"
import {getRemoteOrLocalData} from '@/lib/getRemoteOrLocalData';
// import type { Show } from "@/lib/types"



const isProd = process.env.NODE_ENV === 'production';



export const metadata: Metadata = {
    title: 'Espectaculos',
    description: 'espectaculos escritos y/o dirigidos por John Doe',
}

export default async function ShowsPage() {

    // const data = await getData("shows");
    const data = await getRemoteOrLocalData("shows");

    const shows = [...data.content].reverse() || [];

    return (
        <section className="shows">
            <h1>Espectáculos</h1>
            <ShowsGallery shows={shows}/>
        </section>
    )
}

/*

{shows.map((show, index) => (
                // <ShowCard key={`show-${show.title}-${index}`} show={show} />
                <ShowDisplay key={`show-${show.title}-${index}`} show={show}/>
            ))}
*/