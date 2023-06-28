import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import document from "@/document.json"

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
        <section className='sectionShows'>
            <h1>Espectáculos</h1>
            {shows.map((show: Show, i: number) => (
                <div className='showCard' key={`card-${show.title}`}>
                    <Image
                        src={show.image_1_url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '60%',
                            height: 'auto',
                            borderRadius: '5px',
                            marginBottom: '.5em'
                        }}
                        alt={`show ${show.title} poster image`}
                    />
                    <h2>{show.title}</h2>
                    <h3>Fecha de estreno: {show.opening_date}</h3>
                    <div>
                        {show.seasons.map((season) => (
                            <p key={`season-${season.year}-${season.theater}`}>{season.year}: {season.theater}</p>
                        ))}
                    </div>
                    <p key={`sinopsis-${show.title}`}>{show.sinopsis}</p>
                    <div>
                        <h5>Cast and crew</h5>
                        <ul key={`ul-cast-${show.title}`}>
                            <h6>Cast</h6>
                            {show.castAndCreative.cast.map(({name, role}) => (
                            <li key={`li-${name}-${role}`}>
                                <span>{name}: </span>
                                <span>{role}</span>
                            </li>
                            ))}
                            <h6>Equipo creativo</h6>
                            {show.castAndCreative.creative.map(({name, role}) => (
                                <li key={`li-${name}-${role}`}>
                                    <span>{role}: </span>
                                    <span>{name}</span>
                                </li>
                            ))}
                        </ul>
                        
                    </div>
                </div>
            ))}
        </section>
    )
}