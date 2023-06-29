import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"
import ShowCard from "@/components/ShowCard"

const isProd = process.env.NODE_ENV === 'production';

export interface Show {
    title: string;
    opening_date: string;
    content_html: string;
    image_1_url: string;
    image_2_url: string;
    image_3_url: string;
    seasons: {
        year: number;
        theater: string;
    }[];
    theatre: string;
    sinopsis: string;
    castAndCreative: {
        cast: {
            name: string;
            role: string;
        }[];
        creative: {
            name: string;
            role: string;
        }[];
        musicians: {
            name: string;
            instrument: string;
        }[];
        dancers: {
            name: string;
            role: string;
        }[];
    }
}


export const metadata: Metadata = {
    title: 'Espectaculos',
    description: 'espectaculos escritos y/o dirigidos por John Doe',
}

export default async function ShowsPage() {
    // let data;
    // if (isProd){
    //     data = await getData("shows");
    // } else {
    //     data = document.shows;
    // }

    const data = await getData("shows");

    const shows = [...data.content].reverse() || [];

    return (
        <section>
            {shows.map((show, index) => (
                <ShowCard key={`show-${show.title}-${index}`} show={show} />
            ))}
        </section>
    )
}