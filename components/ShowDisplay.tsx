import Image from "next/image";
import parse from 'html-react-parser'
import type { Show } from "@/types";

// interface Show {
//     title: string;
//     slug: string;
//     opening_date: string;
//     content_html: string;
//     image_1_url: string;
//     sinopsis: string;
//     theatre: string;
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
//     };
// }

interface ShowCardProps {
    show: Show;
}

// const ShowDisplay: React.FC<ShowCardProps> = ({ show }) => {
export function ShowDisplay({ show }: ShowCardProps) {
    // const { title, slug, opening_date, content_html, image_1_url, sinopsis, theatre, castAndCreative } = show;
    // const { cast, creative, musicians, dancers } = castAndCreative;
    const { title, slug, opening_date, image_1_url, sinopsis, theatre, cast, creative, musicians, dancers } = show;


    return (
        <a className="display-card" href={`/shows/${slug}`}>
            <div className="display-show-card">
                <div className="display-show-card__content">
                    <h2 className="display-show-card__title">{title}</h2>
                    <p className="display-show-card__theatre">{theatre}</p>
                    <p className="display-show-card__date">{opening_date}</p>
                </div>
                <div className="display-show-card__image">
                    <Image
                        src={image_1_url}
                        alt={title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '5px',
                            marginBottom: '.5em'
                        }}

                    />
                </div>
            </div>
        </a>
    );
};

// export default ShowDisplay;
