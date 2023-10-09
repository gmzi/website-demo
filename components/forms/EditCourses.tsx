'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editCoursesHeroImage, editHeroText, editAvailableCourse, createCourse, createSection, createCourseReview, editCourseReview, editTestimonial, createTestimonial } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImageForm } from './ImageForm'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import type { Course, Goals, OnlineAdd, Testimonial, Data, Review } from '@/types'
import parse from 'html-react-parser'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import Link from 'next/link'
import { Delete } from './Delete'


interface ImageProp {
    imageUrl: string;
}

interface TextProp {
    contentHtml: string;
}

interface CourseProps {
    index: number
    courses: Course[];
    handleCancel: () => void;
}

interface ReviewProps {
    index: number;
    reviews: Review[];
    handleCancel: () => void;
}

interface TestimonialProps {
    index: number;
    testimonials: Testimonial[];
    handleCancel: () => void;
}

interface CoursesProps {
    courses: Course[];
}

interface ReviewsProps {
    reviews: Review[];
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Create
        </button>
    )
}

function EditButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Save changes
        </button>
    )
}

export function HeroImage({ imageUrl }: ImageProp) {
    const [state, formAction] = useFormState(editCoursesHeroImage, initialState)

    return (
        <form action={formAction}>
            <h2>Editar imagen principal</h2>
            <ImageEdit imageUrl={imageUrl} />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )

}

export function HeroText({ contentHtml }: TextProp) {
    const [state, formAction] = useFormState(editHeroText, initialState)

    return (
        <form action={formAction}>
            <h2>Editar texto principal</h2>
            <RichText contentHtml={contentHtml} />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function AvailableCourses({ courses }: CoursesProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const coursesList = courses.map((course: Course, i: number) => (
        <div key={`course-${course.name}`}>
            <h3>{course.name}</h3>
            {parse(course.description)}
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="courses" entry="available_courses" section="courses" id={course.id} />
        </div>
    ));

    return (
        <div>
            <h2>Cursos disponibles:</h2>
            {openEditor !== false ? <EditAvailableCourse courses={courses} index={openEditor} handleCancel={handleCancel} /> : coursesList}
        </div>
    )
}

export function EditAvailableCourse({ courses, index, handleCancel }: CourseProps) {
    const [state, formAction] = useFormState(editAvailableCourse, initialState)

    const course = courses[index]

    return (
        <form action={formAction}>
            <h2>Editar curso</h2>
            <input type="hidden" name="id" value={course.id} />

            <label htmlFor="course_name">Nombre del curso:</label>
            <input type="text" id="course_name" name="course_name" defaultValue={course.name} />
            <label htmlFor="editor_content">Descripcion del curso:</label>
            <RichText contentHtml={course.description} />
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreateCourse() {
    const [state, formAction] = useFormState(createCourse, initialState)

    return (
        <form action={formAction}>
            <h2>Crear nuevo curso</h2>
            <label htmlFor="course_name">Nombre del curso:</label>
            <input type="text" id="course_name" name="course_name" />
            <label htmlFor="editor_content">Descripcion del curso:</label>
            <RichText contentHtml="" />
            <SubmitButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CourseReviews({ reviews }: ReviewsProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const reviewsList = reviews.map((review: Review, i: number) => (
        <div>
            <blockquote>
                {parse(review.content)}
                <cite>{review.author}</cite>
            </blockquote>
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="courses" entry="reviews" section="reviews" id={review.id} />
        </div>
    ));

    return (
        <div>
            <h2>Reseñas:</h2>
            {openEditor !== false ? <EditCourseReview reviews={reviews} index={openEditor} handleCancel={handleCancel} /> : reviewsList}
        </div>
    )
}

export function EditCourseReview({ reviews, index, handleCancel }: ReviewProps) {
    const [state, formAction] = useFormState(editCourseReview, initialState)

    const review = reviews[index]

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={review.id} />

            <h2>Editar reseña</h2>
            <label htmlFor="editor_content">Texto de la reseña:</label>
            <RichText contentHtml={review.content} />
            <label htmlFor="reviewAuthor">Autor de la reseña:</label>
            <input type="text" id="reviewAuthor" name="reviewAuthor" defaultValue={review.author} />
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreateCourseReview() {
    const [state, formAction] = useFormState(createCourseReview, initialState)

    return (
        <form action={formAction}>
            <h2>Agregar reseña</h2>
            <label htmlFor="editor_content">Texto de la reseña:</label>
            <RichText contentHtml="" />
            <label htmlFor="reviewAuthor">Autor de la reseña:</label>
            <input type="text" id="reviewAuthor" name="reviewAuthor" />
            <SubmitButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const testimonialsList =
        <div className="testimonialCards-container">
            {testimonials.map((testimonial: Testimonial, i: number) => (
                <div key={`card-${i}`} className="testimonialCard">
                    <h3>{testimonial.author}</h3>
                    <p>{testimonial.content}</p>
                    <button key={`btn-testimonials-${i}`} onClick={handleClick} tabIndex={i}>Editar</button>
                    <Delete document="courses" entry="testimonials" section="courses" id={testimonial.id} />
                </div>
            ))}
        </div>

    return (
        <div>
            <h2>Testimonios:</h2>
            {openEditor !== false ? <EditTestimonial testimonials={testimonials} index={openEditor} handleCancel={handleCancel} /> : testimonialsList}
        </div>
    )
}

export function EditTestimonial({ testimonials, index, handleCancel }: TestimonialProps) {
    const [state, formAction] = useFormState(editTestimonial, initialState)

    const testimonial = testimonials[index]

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={testimonial.id} />

            <h2>Editar testimonio</h2>
            <div className="testimonialCard">
                <label htmlFor="editor_content">Texto del testimonio:</label>
                <RichText contentHtml={testimonial.content} />
                <label htmlFor="testimonialAuthor">Autor del testimonio:</label>
                <input type="text" id="testimonialAuthor" name="testimonialAuthor" defaultValue={testimonial.author} />
            </div>
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreateTestimonial() {
    const [state, formAction] = useFormState(createTestimonial, initialState)

    return (
        <form action={formAction}>
            <h2>Agregar testimonio</h2>
            <label htmlFor="editor_content">Texto del testimonio:</label>
            <RichText contentHtml="" />
            <label htmlFor="testimonialAuthor">Autor del testimonio:</label>
            <input type="text" id="testimonialAuthor" name="testimonialAuthor" />
            <SubmitButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreateSection() {
    // a section has: a title, an image, a contentHtml
    const [state, formAction] = useFormState(createSection, initialState)

    return (
        <form action={formAction}>
            <h2>Crear sección</h2>
            <ImageForm />
            <label htmlFor="title">Título principal:</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="editor_content">Contenido:</label>
            <RichText contentHtml="" />
            <EditButton />
            <Link href="/contact">
                <button>Consultame</button>
            </Link>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}