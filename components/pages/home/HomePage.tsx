import parse from 'html-react-parser'
import Image from 'next/image'

interface Data {
    image_url: string;
    content_html: string;
}

export function HomePage({image_url, content_html}: Data){   
    return (
        <main>
            <section>
                {/* <img src={image_url} style={{width: '20%', height: 'auto'}}/> */}
                <Image
                    src={image_url}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{width: '20%', height: 'auto'}}
                    alt="Picture of the author"
                />
                {/* {parse(content_html)} */}
                <p>Hello</p>
            </section>
        </main>
    )
}