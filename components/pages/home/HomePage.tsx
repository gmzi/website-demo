import parse from 'html-react-parser'

interface Data {
    image_url: string;
    content_html: string;
}

export function HomePage({image_url, content_html}: Data){   
    return (
        <main>
            <section>
                <img src={image_url} style={{width: '20%', height: 'auto'}}/>
                {/* {parse(content_html)} */}
                <p>Hello</p>
            </section>
        </main>
    )
}