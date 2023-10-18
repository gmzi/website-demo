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
        // <div className="show-card">
        //     <div className="show-card__image">
        //         <Image
        //             src={image_1_url}
        //             alt={title}
        //             width={0}
        //             height={0}
        //             sizes="100vw"
        //             style={{
        //                 width: '100%',
        //                 height: 'auto',
        //                 borderRadius: '5px',
        //                 marginBottom: '.5em'
        //             }}

        //         />
        //     </div>
        //     <div className="show-card__content">
        //         <h2 className="show-card__title">{title}</h2>
        //         <p className="show-card__date">Opening Date: {opening_date}</p>
        //         <p className="show-card__theatre">Theatre: {theatre}</p>
        //         <div className="show-card__sinopsis">{parse(sinopsis)}</div>
        //         <div className="show-card__cast">
        //             <h3 className="show-card__section-title">Cast</h3>
        //             <ul>
        //                 {cast.map((member, index) => (
        //                     <li key={index}>
        //                         <strong>{member.name}</strong> - {member.role}
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //         <div className="show-card__creative">
        //             <h3 className="show-card__section-title">Creative Team</h3>
        //             <ul>
        //                 {creative.map((member, index) => (
        //                     <li key={index}>
        //                         <strong>{member.name}</strong> - {member.role}
        //                     </li>
        //                 ))}
        //             </ul>
        //         </div>
        //         {musicians.length ? (
        //             <div className="show-card__musicians">
        //                 <h3 className="show-card__section-title">Musicians</h3>
        //                 <ul>
        //                     {musicians.map((musician, index) => (
        //                         <li key={index}>
        //                             <strong>{musician.name}</strong> - {musician.role}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         ) : null}

        //         {dancers.length ? (
        //             <div className="show-card__dancers">
        //                 <h3 className="show-card__section-title">Dancers</h3>
        //                 <ul>
        //                     {dancers.map((dancer, index) => (
        //                         <li key={index}>
        //                             <strong>{dancer.name}</strong> - {dancer.role}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         ) : null}
        //         {/* <p className="show-card__description">{content_html}</p> */}
        //     </div>
        // </div>
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
