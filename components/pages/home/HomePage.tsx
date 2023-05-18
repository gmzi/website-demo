import { Header } from "@/components/shared/Header"

export function HomePage(){
    return (
        <div>
            <Header title={"Home page header"} description={"home page description"}/>
            <main>
                <section>
                    <h2>Section About</h2>
                </section>
                <section>
                    <h2>Section Shows</h2>
                </section>
                <section>
                    <h2>Section Reviews</h2>
                </section>
                <section>
                    <h2>Section Courses</h2>
                </section>
                <section>
                    <h2>Section Podcast</h2>
                </section>
            </main>
        </div>
    )
}