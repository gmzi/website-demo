import Link from "next/link"
import { SpotifyIcon } from "@/components/shared/icons"
import { ApplePodcastsIcon } from "@/components/shared/icons"

export default async function PodcastPage() {
    return (
        <section>
            <div className="podcast-page">
                <h1>Podcast</h1>
                <h2>Testigo de la creaci&#243;n</h2>
                <p>Pienso que La Creación se está creando a sí misma, y nos utiliza para plasmarse. Intento estar entregado a ese misterio. En este Podcast tengo el privilegio de ser testigo del modo en que La Creación se presenta en otros a quien admiro, respeto y de quienes aprendo. Espero que estas conversaciones nos conecten con la maravillosa energía de manifestar el impulso creador en obras, en experiencias, en arte y más proyectos.</p>
                <div className="links">
                    <h3>Escuchar en:</h3>
                    <Link href="https://open.spotify.com/show/3GL13X7HswQjyLL3gDc0m8"><SpotifyIcon/></Link>
                    <Link href="https://podcasts.apple.com/podcast/testigo-de-la-creaci%C3%B3n/id1533448118"><ApplePodcastsIcon/></Link>

                </div>
            </div>
        </section>
    )
}