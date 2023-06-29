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
        <div className="show-card">
            <div className="show-card__image">
                <img src={image_1_url} alt={title} />
                {/* <Image
                    src={image_1_url}
                    alt={title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{
                        width: '60%',
                        height: 'auto',
                        borderRadius: '5px',
                        marginBottom: '.5em'
                    }}
                    
                /> */}
            </div>
            <div className="show-card__content">
                <h2 className="show-card__title">{title}</h2>
                <p className="show-card__date">Opening Date: {opening_date}</p>
                <div className="show-card__sinopsis">{parse(sinopsis)}</div>
                <p className="show-card__theatre">Theatre: {theatre}</p>
                <div className="show-card__cast">
                    <h3 className="show-card__section-title">Cast</h3>
                    <ul>
                        {cast.map((member, index) => (
                            <li key={index}>
                                <strong>{member.name}</strong> - {member.role}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="show-card__creative">
                    <h3 className="show-card__section-title">Creative Team</h3>
                    <ul>
                        {creative.map((member, index) => (
                            <li key={index}>
                                <strong>{member.name}</strong> - {member.role}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="show-card__musicians">
                    <h3 className="show-card__section-title">Musicians</h3>
                    <ul>
                        {musicians.map((musician, index) => (
                            <li key={index}>
                                <strong>{musician.name}</strong> - {musician.instrument}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="show-card__dancers">
                    <h3 className="show-card__section-title">Dancers</h3>
                    <ul>
                        {dancers.map((dancer, index) => (
                            <li key={index}>
                                <strong>{dancer.name}</strong> - {dancer.role}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="show-card__description">{content_html}</p>
            </div>
        </div>
    );
};

export default ShowCard;
