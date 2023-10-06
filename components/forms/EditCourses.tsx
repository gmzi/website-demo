'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editCoursesHeroImage, editHeroText } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import type {Course, Goals, OnlineAdd, Testimonial, Data} from '@/types'


interface ImageProp {
    imageUrl: string;
}

interface TextProp {
    contentHtml: string;
}

interface CoursesProps {
    contentHtml: string;
    imageUrl: string;
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

export function EditHeroImage({imageUrl}: ImageProp){
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

export function EditHeroText({ contentHtml}: TextProp) {
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
