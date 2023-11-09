import ShowCard from "@/components/ShowCard";
import ShowsGallery from "@/components/ShowsGallery";
import type { Show } from "@/types";
import { Metadata, ResolvingMetadata } from 'next'
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";

const isProd = process.env.NODE_ENV === 'production';

type Props = {
    params: { slug: string, title: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export async function generateStaticParams() {
    // const data = await getData("shows")
    const data = await getRemoteOrLocalData("shows");
    const shows = data.content
    return shows.map((show: Show) => ({
        slug: show.slug,
        title: show.title
    }))
}

export async function generateMetadata(
    {params, searchParams} : Props,
    parent: ResolvingMetadata
) : Promise<Metadata> {
    const slug = params.slug;
    return {
        title: slug,
    }
}

export default async function ShowRoute({params}: {params: {slug: string}}) {

    // const data = await getData("shows");
    const data = await getRemoteOrLocalData("shows");

    const shows = data.content;
    
    const {slug} = params;

    const fixedSlug = slug.replace(/%20/g, "-").toLowerCase();

    const show = shows.find((show: Show) => show.slug === fixedSlug);

    const filteredShows = shows.filter((item: { slug: any; }) => item.slug !== show.slug);



    if (!show){
        return (
            <div>
                <p>Thats not found</p>
                <p>slug: {slug}</p>
                <p>fixedSlug: {fixedSlug}</p>
            </div>
        )
    }

    return (
        <section>
            <ShowCard show={show}/>
            <hr/>
            <ShowsGallery shows={filteredShows}/>
        </section>
    )
}