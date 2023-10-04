'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { Bio  } from '@/types'
import { editBio } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'


interface BioProps {
    contentHtml: string;
    image1Url: string;
    image2Url: string;
    image3Url: string;
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

export function EditBio({ contentHtml, image1Url, image2Url, image3Url }: BioProps) {
    const [state, formAction] = useFormState(editBio, initialState)

    return (
        <form action={formAction}>
            <h2>EDITAR Bio</h2>
            <RichText contentHtml={contentHtml} />
            <ImageEdit imageUrl={image1Url} />
            <ImageEdit imageUrl={image2Url} />
            <ImageEdit imageUrl={image3Url} />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
