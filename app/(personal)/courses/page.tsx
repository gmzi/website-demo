import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { availableParallelism, type } from "os"
import { IntegerType } from "mongodb"
import {GoalsIcon} from "@/components/shared/icons"
import document from "@/document.json"
import type {Course, Goals, OnlineAdd, Testimonial, Data} from '@/types'

const isProd = process.env.NODE_ENV === 'production';


export const metadata: Metadata = {
    title: 'Cursos',
    description: 'cursos',
}

export default async function CoursesPage() {

    // let data;
    // if (isProd){
    //     data = await getData("courses");
    // } else {
    //     data = document.courses;
    // }
    
    const data = await getData("courses");

    const texto = (data: Data) => {
        if (data.content_html){
            return parse(data.content_html)
        }
        return ''
    } 

    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const availableCourses = data?.available_courses || [];
    const goals = data?.goals || [];

    const FAQ = parse(data?.FAQ) || "";
    const onlineAdd = parse(data?.online.description) || "";
    const testimonials  = data?.testimonials || [];
    const contactWhatsapp = data?.contact.whatsapp || {};

    const contactBtn = <form action={`https://wa.me/${contactWhatsapp}`}><button className="btn-whatsapp" type="submit">contactame por whatsapp</button></form>




    return (
        <section className='sectionCourses'>
            <h1>Cursos</h1>
                <div className="coursesHero">
                    <Image
                        alt="Picture of the author"
                        src={image1Url}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '100%', 
                            height: 'auto', 
                            borderRadius: '5px',
                            marginBottom: '.5em'
                        }}
                    />
                    <div className='description'>
                        {texto(data)}
                    </div>
                </div>
                <div className="btnContainer">
                    {contactBtn}
                </div>
                <div>
                    <h2>Mis tres cursos:</h2>
                        <div className='courseCards-container'>
                        {availableCourses.map((course: Course, i: number) => (
                        <div className="courseCard" key={`course-${i}`}>{course.name}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <ol>
                        <h2>Objetivos</h2>
                        {goals.map((goal: string, i: number) => (
                        <li key={`illustration-${i}`}>
                            <div><GoalsIcon/></div>
                            {goal}
                        </li>
                        ))}
                    </ol>
                </div>
                <div>
                <div className="faq">
                    <h2>Preguntas frecuentes</h2>
                    {FAQ}
                </div>
                </div>
                <div className="btnContainer">
                    {contactBtn}
                </div>
                <div className="online">
                    <h1>ONLINE</h1>
                    {onlineAdd}
                </div>
                <div>
                    <h2>Testimonios</h2>
                    <div className="testimonialCards-container">
                        {testimonials.map((testimonial: Testimonial, i: IntegerType) => (
                            <div className="testimonialCard" key={`card-${i}`}>
                                <h3>{testimonial.author}</h3>
                                <p>{testimonial.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
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