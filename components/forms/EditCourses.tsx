'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import {
    editCoursesHeroImage,
    editCoursesHeroText,
    editFAQ,
    editAvailableCourse,
    createCourse,
    createSection,
    createCourseReview,
    editCourseReview,
    editTestimonial,
    createTestimonial,
    editCourseLogistics,
    editImageGrid_A,
    editImageGrid_B
} from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImageGridInput, ImageInputWithIDAndDefaultValue } from './ImageInput'
import { ImageInput } from './ImageInput'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import type { Course, Goals, Testimonial, Data, Review } from '@/types'
import parse from 'html-react-parser'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import Link from 'next/link'
import { Delete } from './Delete'
import { set } from 'zod'


interface ImageProp {
    imageUrl: string;
}

interface TextProp {
    contentHtml: string;
}

interface CourseProps {
    entry: string;
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

interface ImageProps {
    url: string;
    id: number
}

interface EditImageGridProps {
    images: ImageProps[];
}

interface LogisticsProps {
    title: string;
    contentHtml: string;
    imageUrl: string;
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
        <div className="heroContainer">
            <form action={formAction}>
                {/* <ImageEdit imageUrl={imageUrl} /> */}
                <ImageInputWithIDAndDefaultValue id={1} defaultValue={imageUrl} className="" />
                <EditButton />
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </form>
        </div>

    )

}

export function HeroText({ contentHtml }: TextProp) {
    const [state, formAction] = useFormState(editCoursesHeroText, initialState)

    return (
        <form action={formAction}>
            <RichText contentHtml={contentHtml} />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function EditFAQ({ contentHtml }: { contentHtml: string }) {
    const [state, formAction] = useFormState(editFAQ, initialState)

    return (
        <ol className="goals">
            <form action={formAction}>
                <h3>Preguntas frecuentes</h3>
                <li className="faq">
                    <RichText contentHtml={contentHtml} />
                    <EditButton />
                    <p aria-live="polite" className="sr-only" role="status">
                        {state?.message}
                    </p>
                </li>
            </form>
        </ol>
    )
}

export function EditImageGrid_A({ images }: EditImageGridProps) {
    const [state, formAction] = useFormState(editImageGrid_A, initialState);

    const imagesGrid = images.map((image: ImageProps, index) => {
        return (
            <div key={`edit-image-${index}`}>
                <ImageGridInput id={image.id} defaultValue={image.url} className="" />
            </div>
        )
    })

    return (
        <form action={formAction}>
            <div className="image-grid">
                {imagesGrid}
            </div>
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function EditImageGrid_B({ images }: EditImageGridProps) {
    const [state, formAction] = useFormState(editImageGrid_B, initialState);

    const imagesGrid = images.map((image: ImageProps, index) => {
        return (
            <div key={`edit-image-${index}`}>
                <ImageGridInput id={image.id} defaultValue={image.url} className="" />
            </div>
        )
    })

    return (
        <form action={formAction}>
            <div className="image-grid">
                {imagesGrid}
            </div>
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function AvailableCourses({ title, courses, entry }: { title: string, courses: Course[], entry: string }) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);
    const [openCreator, setOpenCreator] = useState<true | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenCreator(true)
    }

    function handleCreateCancel() {
        setOpenCreator(false)
    }

    // const coursesList = courses.map((course: Course, i: number) => (
    //     <div key={`course-${course.name}`}>
    //         <h3>{course.name}</h3>
    //         {parse(course.description)}
    //         <button onClick={handleClick} tabIndex={i}>Editar</button>
    //         <Delete document="courses" entry={entry} section="courses" id={course.id} />
    //     </div>
    // ));

    const coursesList =
        <div className="cards-and-goals">
            <h2>{title}</h2>
            <div className='courseCards-container'>
                {courses.map((course: Course, i: number) => (
                    <div className="courseCard" key={`course-${i}`}>
                        {parse(course.name)}
                        {/* <p>{parse(course.description)}</p> */}
                        <div>
                            <button onClick={handleClick} tabIndex={i}>Editar</button>
                            <Delete document="courses" entry={entry} section="courses" id={course.id} />
                        </div>
                    </div>
                ))}
                {openCreator ? (<CreateCourse entry={entry} handleCreateCancel={handleCreateCancel} />) : (
                    <div className="courseCard">
                        <button onClick={handleCreate}>agregar un nuevo curso</button>
                    </div>
                )}
            </div>
        </div>

    return (
        <div className="card-container-editor">
            {openEditor !== false ? <EditAvailableCourse entry={entry} courses={courses} index={openEditor} handleCancel={handleCancel} /> : coursesList}
            {/* {openCreator ? (<CreateCourse entry={entry} handleCreateCancel={handleCreateCancel}  />) : (
                <div className="courseCard">
                    <button onClick={handleCreate}>agregar un nuevo curso</button>
                </div>
            )} */}
        </div>
    )
}

export function EditAvailableCourse({ entry, courses, index, handleCancel }: CourseProps) {
    const [state, formAction] = useFormState(editAvailableCourse, initialState)

    const course = courses[index]

    return (
        <form action={formAction}>
            <input type="hidden" name="entry" value={entry} />
            <input type="hidden" name="id" value={course.id} />

            {/* <input type="text" id="course_name" name="course_name" defaultValue={course.name} />
            <label htmlFor="editor_content">Descripcion del curso:</label> */}
            {/* TODO rename `course.name` to `course.content, since we're handling it in a single field, will have
            to update the naming in the whole cycle - database, client and here. */}
            <RichText contentHtml={course.name} />
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreateCourse({ entry, handleCreateCancel }: { entry: string, handleCreateCancel: () => void }) {
    const [state, formAction] = useFormState(createCourse, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="entry" value={entry} />

            <label htmlFor="editor_content" style={{ display: 'none' }}>Descripcion del curso:</label>
            <RichText contentHtml="" />
            <SubmitButton />
            <button onClick={handleCreateCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function EditCourseReview({ reviews, index, handleCancel }: ReviewProps) {
    const [state, formAction] = useFormState(editCourseReview, initialState)

    const review = reviews[index]

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={review.id} />

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

export function CourseReviews({ reviews }: ReviewsProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);
    const [openCreator, setOpenCreator] = useState<true | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenCreator(true)
    }

    function handleCreateCancel() {
        setOpenCreator(false)
    }

    const reviewsList = reviews.map((review: Review, i: number) => (
        <div key={`review-${review.author}-${i}`}>
            <blockquote className="review">
                {parse(review.content)}
                <cite>{review.author}</cite>
                <div>
                    <button onClick={handleClick} tabIndex={i}>Editar</button>
                    <Delete document="courses" entry="reviews" section="reviews" id={review.id} />
                </div>
            </blockquote>
        </div>
    ));

    return (
        <div className="reviews">
            {openEditor !== false ? <EditCourseReview reviews={reviews} index={openEditor} handleCancel={handleCancel} /> : reviewsList}
            {openCreator ? (<CreateCourseReview handleCreateCancel={handleCreateCancel} />) : (
                <div className="review">
                    <h3>Agregar nueva reseña</h3>
                    <button onClick={handleCreate}>agregar reseña</button>
                </div>
            )}
        </div>
    )
}



export function CreateCourseReview({ handleCreateCancel }: { handleCreateCancel: () => void }) {
    const [state, formAction] = useFormState(createCourseReview, initialState)

    return (
        <form action={formAction}>
            <h2>Agregar reseña</h2>
            <label htmlFor="editor_content">Texto de la reseña:</label>
            <RichText contentHtml="" />
            <label htmlFor="reviewAuthor">Autor de la reseña:</label>
            <input type="text" id="reviewAuthor" name="reviewAuthor" />
            <SubmitButton />
            <button onClick={handleCreateCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function Testimonials({ testimonials }: TestimonialsProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);
    const [openCreator, setOpenCreator] = useState<true | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    function handleCreate(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenCreator(true)
    }

    function handleCreateCancel() {
        setOpenCreator(false)
    }

    const testimonialsList =
        <div className="testimonialCards-container">
            {testimonials.map((testimonial: Testimonial, i: number) => (
                <div key={`card-${i}`} className="testimonialCard">
                    <h3>{testimonial.author}</h3>
                    {parse(testimonial.content)}
                    <button key={`btn-testimonials-${i}`} onClick={handleClick} tabIndex={i}>Editar</button>
                    <Delete document="courses" entry="testimonials" section="courses" id={testimonial.id} />
                </div>
            ))}
        </div>

    return (
        <div>
            <h2>Testimonios:</h2>
            {openEditor !== false ? <EditTestimonial testimonials={testimonials} index={openEditor} handleCancel={handleCancel} /> : testimonialsList}
            {openCreator ? (<CreateTestimonial handleCreateCancel={handleCreateCancel} />) : (
                <div className="testimonialCard">
                    <h3>Agregar testimonio</h3>
                    <button onClick={handleCreate}>agregar testimonio</button>
                </div>
            )}
        </div>
    )
}

export function CreateTestimonial({ handleCreateCancel }: { handleCreateCancel: () => void }) {
    const [state, formAction] = useFormState(createTestimonial, initialState)

    return (
        <form action={formAction}>
            <div className='testimonialCard'>
                <label htmlFor="testimonialAuthor">Autor del testimonio:</label>
                <input type="text" id="testimonialAuthor" name="testimonialAuthor" />
                <label htmlFor="editor_content" style={{ display: 'none' }}>Texto del testimonio:</label>
                <RichText contentHtml="" />

                {/* <EditButton /> */}
                <SubmitButton />
                <button onClick={handleCreateCancel}>Cancelar</button>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </div>
        </form>
    )
}

export function EditTestimonial({ testimonials, index, handleCancel }: TestimonialProps) {
    const [state, formAction] = useFormState(editTestimonial, initialState)

    const testimonial = testimonials[index]

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={testimonial.id} />

            <div className="testimonialCard">
                <label htmlFor="testimonialAuthor">Autor del testimonio:</label>
                <input type="text" id="testimonialAuthor" name="testimonialAuthor" defaultValue={testimonial.author} />
                <label htmlFor="editor_content" style={{ display: "none" }}>Texto del testimonio:</label>
                <RichText contentHtml={testimonial.content} />
            </div>
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function EditLogistics({ title, contentHtml, imageUrl }: LogisticsProps) {
    const [state, formAction] = useFormState(editCourseLogistics, initialState)

    return (
        <form action={formAction}>
            <div className="course-logistics">
                <ImageEdit imageUrl={imageUrl} />
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" name="title" defaultValue={title} />
                <label htmlFor="editor_content">Detalles logísticos del curso:</label>
                <RichText contentHtml={contentHtml} />
            </div>
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
} 