import type { Metadata } from "next"
import Image from 'next/image'
import Link from "next/link"
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { availableParallelism, type } from "os"
import { IntegerType } from "mongodb"
import { GoalsIcon } from "@/components/shared/icons"
import ImageGrid from '@/components/ImageGrid';
import type { Course, Goals, Logistics, Testimonial, Data } from '@/types'
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData"

export const metadata: Metadata = {
    title: 'Cursos',
    description: 'cursos dictados por John Doe',
}

export default async function CoursesPage() {

    // const data = await getData("courses");
    const data = await getRemoteOrLocalData("courses");

    const texto = parse(data.content_html) || "";

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const image4Url = data?.image_4_url || '';
    const image5Url = data?.image_5_url || '';
    const image6Url = data?.image_6_url || '';
    const image7Url = data?.image_7_url || '';

    const grid_1 = [image2Url, image3Url];
    const grid_2 = [image4Url, image5Url];
    const grid_3 = [image6Url, image7Url];


    const availableCourses_writing = data?.available_courses_writing || [];
    const availableCourses_acting = data?.available_courses_acting || [];

    const goals_writing = data?.goals_writing || [];
    const goals_acting = data?.goals_acting || [];

    const FAQ = parse(data?.FAQ) || "";
    const testimonials = data?.testimonials || [];
    const contactWhatsapp = data?.contact.whatsapp || {};
    const reviews = data?.reviews || {};



    const contactBtn =
        <form action={`https://wa.me/${contactWhatsapp}`}>
            <button className="btn-whatsapp" type="submit">contactame por whatsapp</button>
        </form>

    return (
        <section className='courses'>
            <h1>Cursos</h1>
            <div className="heroContainer">
                <div className="">
                    <Image
                        className="defaultImgStyle"
                        src={image1Url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt="Picture of a class"
                    />
                </div>
                <div className='description'>
                    {texto}
                </div>
                <Link href={`https://wa.me/${contactWhatsapp}`} target="_blank">
                    <button className="btnWhatsapp">contactame por whatsapp</button>
                </Link>
            </div>

            <ImageGrid images={grid_1} />

            <div className="cards-and-goals">
                <h2>Mis cursos de actuación:</h2>
                <div className='courseCards-container'>
                    {availableCourses_acting.map((course: Course, i: number) => (
                        <div className="courseCard" key={`course-${i}`}>{course.name}</div>
                    ))}
                </div>
                <ol className="goals">
                    {goals_acting.length > 0 && <h3>Objetivos:</h3>}
                    {goals_acting.map((goal: string, i: number) => (
                        <li key={`illustration-${i}`}>
                            <span className="goals-emoji">&#x1F3AF;</span>
                            <span className="goals-text">{goal}</span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="cards-and-goals">
                <h2>Mis cursos de dramaturgia:</h2>
                <div className='courseCards-container'>
                    {availableCourses_writing.map((course: Course, i: number) => (
                        <div className="courseCard" key={`course-${i}`}>{course.name}</div>
                    ))}
                </div>
                <ol className="goals">
                    {goals_writing.length > 0 && <h3>Objetivos:</h3>}
                    {goals_writing.map((goal: string, i: number) => (
                        <li key={`illustration-${i}`}>
                            <span className="goals-emoji">&#x1F3AF;</span>
                            <span className="goals-text">{goal}</span>
                        </li>
                    ))}
                </ol>
                <div>
                    <div className="faq">
                        <h2>Preguntas frecuentes</h2>
                        {FAQ}
                    </div>
                </div>
            </div>

            <ImageGrid images={grid_2} />

            <div className="btnContainer">
                {contactBtn}
            </div>
            <ImageGrid images={grid_3} />

            <div>
                <h2>Testimonios</h2>
                <div className="testimonialCards-container">
                    {testimonials.map((testimonial: Testimonial, i: IntegerType) => (
                        <div key={`testimonial-card-${i}`} className="testimonialCard">
                            <h3>{testimonial.author}</h3>
                            {parse(testimonial.content)}
                        </div>
                    ))}
                </div>
            </div>
            {/* <div>
                {reviews.map((item, i) => {
                    return (
                        <div key={`review-${i}`}>
                            <h2>{item.title}</h2>
                            {parse(item.content)}
                        </div>
                    )
                
                })}
            </div> */}
            <div>
                <h2>Inscripción y consultas</h2>
                <div className="btnContainer">
                    <p>podés consultarme por whatsapp cliqueando acá:</p>
                    {contactBtn}
                    <p>o por email cliqueando <a href="mailto:name@email.com">acá</a></p>
                    <p>o en cualquiera de mis redes sociales acá abajo:</p>
                </div>
            </div>
        </section>
    )
}