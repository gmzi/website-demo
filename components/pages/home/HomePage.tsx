import { Header } from "@/components/shared/Header"
import { getData } from "@/lib/getData"

interface Data {
    image_url: string;
    content_html: string;
}

export function HomePage({image_url, content_html}: Data){    
    return (
        <main>
            <section>
                <img src={image_url}/>
                {content_html}
            </section>
        </main>
    )
}