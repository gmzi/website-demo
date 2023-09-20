import type { Metadata } from "next"
import { getData } from "@/lib/getData"
import Image from "next/image";

export interface Tour {
    show_title: string;
    year: string;
    title_or_place: string;
    city: string;
    country: string;
    press_url: string;
    image_url: string;
}

export const metadata: Metadata = {
    title: 'Giras',
    description: 'giras por el mundo'
}

export default async function ToursPage() {

    const data = await getData("tours");

    const tours = [...data.content] || [];

    const uniqueYears: string[] = [...new Set(tours.map(item => item.year))];

    return (
        <section>
            <h1>Giras</h1>
            <div>
                {uniqueYears.map(year => (
                    <div key={year}>
                        <h2>{year}</h2>
                        {tours
                            .filter(item => item.year === year)
                            .map((item, index) => (
                                <div key={index}>
                                    <p>{item.title_or_place}</p>
                                    <p>{item.country}</p>
                                    <a href={item.press_url} target="_blank" rel="noopener noreferrer">
                                        Press URL
                                    </a>
                                    <Image
                                        src={item.image_url}
                                        alt="tour-image"
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{
                                            width: '40%',
                                            height: 'auto',
                                            borderRadius: '5px',
                                            marginBottom: '.5em'
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                ))}
            </div>
            <div>
                {/* <h2>2019</h2>
                <div>
                    <h3>Ciclo de Teatro Argentino de Barcelona</h3>
                    <Image
                        src="https://res.cloudinary.com/imagesgmzi/image/upload/v1695237434/website-fer/tours/III_ciclo_de_teatro_argentino_gou66i.jpg"
                        alt="tour-image"
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '40%',
                            height: 'auto',
                            borderRadius: '5px',
                            marginBottom: '.5em'
                        }}
                    />

                    <span>Barcelona</span>
                    <span>España</span>
                </div> */}
            </div>
        </section>
    )
}