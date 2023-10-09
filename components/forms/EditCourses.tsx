'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editCoursesHeroImage, editHeroText, editAvailableCourse, createCourse } from '@/app/actions'
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

interface CourseProps {
    index: number
    courses: Course[];
    handleCancel: () => void;
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
            <input type="text" id="course_name" name="course_name"/>
            <label htmlFor="editor_content">Descripcion del curso:</label>
            <RichText contentHtml="" />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}