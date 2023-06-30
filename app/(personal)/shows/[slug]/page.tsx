import ShowCard from "@/components/ShowCard";
import ShowsGallery from "@/components/ShowsGallery";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"

const isProd = process.env.NODE_ENV === 'production';

export interface Show {
    title: string;
    slug: string;
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

export async function generateStaticParams() {
    const data = await getData("shows")
    const shows = data.content
    return shows.map((show: Show) => ({
        slug: show.slug,
    }))
}



// generateMetadata  goes here

export default async function ShowRoute({params}: {params: {slug: string}}) {

    const data = await getData("shows");

    const shows = data.content;
    
    const {slug} = params;

    const fixedSlug = slug.replace(/%20/g, "-").toLowerCase();

    const show = shows.find((show: Show) => show.slug === fixedSlug);


    if (!show){
        console.log('slug:', slug)
        console.log('fixedSlug:', fixedSlug)
        return (
            <div>
                <p>Thats not found</p>
                <p>slug: {slug}</p>
                <p>fixedSlug: {fixedSlug}</p>
            </div>
        )
    }

    return (
        <section>
            <ShowCard show={show}/>

            <br />
            <hr/>
            <ShowsGallery shows={shows}/>
        </section>
    )
}


// result : My%20show%20slug
// I want: My-show-slug