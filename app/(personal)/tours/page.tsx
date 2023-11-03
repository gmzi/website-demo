import type { Metadata } from "next"
import { getData } from "@/lib/getData"
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import ImageGrid from "@/components/ImageGrid";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Giras',
    description: 'giras, eventos y festivales de John Doe'
}

export default async function ToursPage() {

    // const data = await getData("tours");
    const data = await getRemoteOrLocalData("tours");

    const tours = [...data.content] || [];

    const heroImageRaw = data.image_1_url;
    const heroImage = heroImageRaw.split("--", 2)[1];

    const uniqueYears: string[] = [...new Set(tours.map(item => item.year))]
        .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    const grid_1 = tours
        .filter(item => item.image_1_url?.length > 0)
        .map(item => item.image_1_url);

    return (
        <section className="tours">
            <h1>Giras</h1>
            <div className="imgContainer">
                <Image
                    className="defaultImgStyle"
                    src={heroImage}
                    alt="press-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                />
                {uniqueYears.map(year => (
                <ul key={year} className="years-list">
                    <li>
                        <h2>{year}</h2>
                        <ul className="tours-list">
                            {tours
                                .filter(item => item.year === year)
                                .map((item, index) => (
                                    <li key={index}>
                                        <h4>{item.title_or_place}</h4>
                                        <p>{item.city}</p>
                                        {item.press_url.length > 0 &&
                                            <Link href={item.press_url} target="_blank">Artículo de prensa</Link>
                                        }
                                    </li>

                                ))}
                        </ul>
                    </li>

                </ul>
            ))}
            </div>
            
            <div className="imgContainer">
                <ImageGrid images={grid_1} />
            </div>
        </section>
    )
}