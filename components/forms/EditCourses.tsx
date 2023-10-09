'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editCoursesHeroImage, editHeroText, editAvailableCourse } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import type { Course, Goals, OnlineAdd, Testimonial, Data } from '@/types'
import parse from 'html-react-parser'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'


interface ImageProp {
    imageUrl: string;
}

interface TextProp {
    contentHtml: string;
}

interface Course {
    id: string;
    name: string;
    description: string;
}

interface CourseProps {
    id: string;
    name: string;
    description: string;
    // courses: Course[];
}
interface CoursesProps {
    courses: Course[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const initialState = {
    message: null
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
    const [openEditor, setOpenEditor] = useState(false)

    function handleClick(e) {
        e.preventDefault();
        setOpenEditor(e.target.id)
    }

    function handleCancel() {
        setOpenEditor(false)
    }

    const coursesList = courses.map((course: Course, i: number) => (
            <div key={`course-${course.name}`}>
                <h3>{course.name}</h3>
                {parse(course.description)}
                <button onClick={handleClick} id={i}>Editar</button>
            </div>
    ));

    return (
        <div>
            {/* <CreateCourse/> */}
            <h2>Cursos disponibles:</h2>
            {openEditor ? <EditAvailableCourse courses={courses} index={openEditor} handleCancel={handleCancel} /> : coursesList}
            <h2>Crear un nuevo curso</h2>
            {/* <CreateCourse/>  */}
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
