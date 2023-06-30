import Image from "next/image";
import parse from 'html-react-parser'

interface Show {
    title: string;
    opening_date: string;
    content_html: string;
    image_1_url: string;
    sinopsis: string;
    theatre: string;
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
    };
}

interface ShowCardProps {
    show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
    const { title, opening_date, content_html, image_1_url, sinopsis, theatre, castAndCreative } = show;
    const { cast, creative, musicians, dancers } = castAndCreative;


    return (
        <a href={`/shows/${title}`}>
            <div className="show-card">
                <div className="show-card__heading">
                    <h2 className="show-card__title">{title}</h2>
                    <p className="show-card__date">{opening_date}</p>
                </div>
                <div className="show-card__image">
                    {/* <img src={image_1_url} alt={title} /> */}

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

export default ShowCard;
