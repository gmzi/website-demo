import { HomePage } from "@/components/pages/home/HomePage"
import { getData } from "@/lib/getData"

export default async function IndexRoute() {
    const data = await getData("about")

    return (
        <div>
            <h1>Hello</h1>
            <HomePage image_url={data.image_url} content_html={data.content_html}/>
        </div>
    )
}