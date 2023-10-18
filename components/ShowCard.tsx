import Image from "next/image";
import parse from 'html-react-parser'
import type { Show } from "@/types";

interface ShowCardProps {
    show: Show;
}

const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
    const { title, opening_date, image_1_url, sinopsis, theatre, cast, creative, musicians, dancers } = show;

    const parsedSinopsis = parse(sinopsis);

    return (
        <div className="show-card">
            <h1 className="show-title">{title}</h1>
            <p className="show-year">{opening_date}</p>
            <Image
                className="show-image"
                src={image_1_url}
                alt={`poster of ${title}`}
                width={0}
                height={0}
                sizes="100vw"
            />
            <div className="show-sinopsis">
                {parsedSinopsis}
            </div>
            <h2 className="show-credits-title">CREDITOS</h2>
            <div className="show-credits">
                <h3>CON</h3>
                <ul>
                    {cast.map((member, index) => (
                        <li key={index}>
                            <strong>{member.name}</strong> - {member.role}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
                {dancers.length ? <h3>Bailarines</h3> : null}
                <ul>
                    {dancers.map((member, index) => (
                        <li key={index}>
                            <strong>{member.name}</strong> - {member.role}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
            {musicians.length ? <h3>Músicos</h3> : null}
                <ul>
                    {musicians.map((member, index) => (
                        <li key={index}>
                            <strong>{member.name}</strong> - {member.role}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
                <h3>Equipo creativo</h3>
                <ul>
                {creative.map((member, index) => (
                    <li key={index}>
                        <strong>{member.name}</strong> - {member.role}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowCard;
