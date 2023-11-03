import Image from "next/image";
import Link from "next/link";
import parse from 'html-react-parser'
import type { Show } from "@/types";

interface ShowCardProps {
    show: Show;
}

export function ShowDisplay({ show }: ShowCardProps) {
    const { title, slug, opening_date, image_1_url, sinopsis, theatre, cast, creative, musicians, dancers } = show;

    return (
        <Link href={`/shows/${slug}`}>
            <div className="show-card-preview">
                <div>
                    <h2 className="">
                        <span>{title}</span>
                        <span>  </span>
                        <span className="openingDate">({opening_date})</span>
                    </h2>
                </div>
                <Image
                    className="show-card-image"
                    src={image_1_url}
                    alt={`poster preview of ${title}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </div>
        </Link>
    );
};
