import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"
import ShowCard from "@/components/ShowCard"
import {ShowDisplay} from '@/components/ShowDisplay'
import type { Show } from "@/types";

const isProd = process.env.NODE_ENV === 'production';

// export interface Show {
//     title: string;
//     slug: string;
//     opening_date: string;
//     content_html: string;
//     image_1_url: string;
//     image_2_url: string;
//     image_3_url: string;
//     seasons: {
//         year: number;
//         theater: string;
//     }[];
//     theatre: string;
//     sinopsis: string;
//     castAndCreative: {
//         cast: {
//             name: string;
//             role: string;
//         }[];
//         creative: {
//             name: string;
//             role: string;
//         }[];
//         musicians: {
//             name: string;
//             instrument: string;
//         }[];
//         dancers: {
//             name: string;
//             role: string;
//         }[];
//     }
// }

interface Shows {
    shows: Show[]
}

const ShowsGallery: React.FC<Shows> = ({shows}) => {

    return (
        <div className="shows-gallery">
            {shows.map((show: Show, index: number) => (
                <ShowDisplay key={`show-${show.title}-${index}`} show={show}/>
            ))}
        </div>
    )
}

export default ShowsGallery;