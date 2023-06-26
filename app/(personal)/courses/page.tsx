import type { Metadata } from "next"
import Image from 'next/image'
import { getData } from "@/lib/getData"
import parse from 'html-react-parser'
import { availableParallelism, type } from "os"
import { IntegerType } from "mongodb"

interface Course {
    name: string;
    descriptin: string;
}

interface Goals {
    illustration: string[];
    FAQ: string;
}

interface OnlineAdd {
    description: string;
    logistics: string;
}

interface Testimonial {
    content: string;
    author: string;
}


export const metadata: Metadata = {
    title: 'Cursos',
    description: 'cursos',
}

export default async function CoursesPage() {
    
    const data = await getData("courses");

    const text = parse(data?.content_html) || '';
    const image1Url = data?.image_1_url || '';
    const image2Url = data?.image_2_url || '';
    const image3Url = data?.image_3_url || '';
    const availableCourses = data?.available_courses || [];
    const goals: Goals = data?.goals || [];
    const FAQ = parse(goals.FAQ) || "";
    const onlineAdd = data?.online || {};
    const testimonials  = data?.testimonials || [];



    return (
        <section className='sectionCourses'>
            <Image
                src={image1Url}
                width={0}
                height={0}
                sizes="100vw"
                style={{
                    width: '70%', 
                    height: 'auto', 
                    borderRadius: '5px'
                }}
                alt="Picture of the author"
            />
            {text}
            <div>
                <div>
                    {availableCourses.map((course: Course, i:IntegerType) => (
                    <h4 key={`course-${i}`}>{course.name}</h4>
                    ))}
                </div>
            </div>
            <div>
                <h2>Objetivos</h2>
                <div>
                    {goals.illustration.map((illustration, i) => (
                    <p key={`illustration-${i}`}>{illustration}</p>
                    ))}
                </div>
                <div>
                    {FAQ}
                </div>
            </div>
            <div>
                <h1>ONLINE</h1>
                {onlineAdd.description}
                {onlineAdd.logistics}
            </div>
            <div>
                <h2>Testimonios</h2>
                <div>
                    {testimonials.map((testimonial: Testimonial, i: IntegerType) => (
                        <div key={`card-${i}`}>
                            <div>
                                <h3>{testimonial.author}</h3>
                                <p>{testimonial.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            

        </section>
    )
}