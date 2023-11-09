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
            <h1 className="show-title">
                <span>{title}</span>
                <span className="openingDate">{opening_date}</span>
            </h1>
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
                        <li key={`creative-team-${index}`}>
                            <span className="team-name">{member.name}</span>
                            {member.role && member.role.length > 0 ? <span className="team-role">: {member.role}</span> : null}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
                {dancers.length ? <h3>Bailarines</h3> : null}
                <ul>
                    {dancers.map((member, index) => (
                        <li key={`dancers-team-${index}`}>
                            <span className="team-name">{member.name}</span>
                            {member.role && member.role.length > 0 ? <span className="team-role">: {member.role}</span> : null}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
                {musicians.length ? <h3>Músicos</h3> : null}
                <ul>
                    {musicians.map((member, index) => (
                        <li key={`musicians-team-${index}`}>
                            <span className="team-name">{member.name}</span>
                            {member.role && member.role.length > 0 ? <span className="team-role">: {member.role}</span> : null}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="show-credits">
                <h3>Equipo creativo</h3>
                <ul>
                    {creative.map((member, index) => (
                        <li key={`creative-team-${index}`}>
                            {member.role && member.role.length > 0 ? <span className="team-role">{member.role}: </span> : null}
                            <span className="team-name">{member.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShowCard;
