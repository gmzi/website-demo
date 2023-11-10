import type { Metadata } from "next"
import { getData } from "@/lib/getData"
import { ShowDisplay } from '@/components/ShowDisplay'
import { getRemoteOrLocalData } from '@/lib/getRemoteOrLocalData';
import type { Show } from "@/types"



const isProd = process.env.NODE_ENV === 'production';



export const metadata: Metadata = {
    title: 'Espectaculos',
    description: 'espectaculos escritos y/o dirigidos por Tennesee Williams',
}

export default async function ShowsPage() {

    // const data = await getData("shows");
    const data = await getRemoteOrLocalData("shows");

    const shows = [...data.content].reverse() || [];

    return (
        <section className="shows">
            <h1>Shows</h1>
            <div className="shows-previews-container">
                {shows.map((show: Show, index: number) => (
                    <ShowDisplay key={`show-${show.title}-${index}`} show={show} />
                ))}
            </div>
        </section>
    )
}