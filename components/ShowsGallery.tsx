import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"
import ShowCard from "@/components/ShowCard"
import {ShowDisplay} from '@/components/ShowDisplay'
import type { Show } from "@/types";

const isProd = process.env.NODE_ENV === 'production';

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