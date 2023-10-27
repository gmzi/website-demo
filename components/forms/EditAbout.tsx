'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
// import type { About } from '@/types'
import { editAbout } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'


interface AboutProps {
    contentHtml: string;
    imageUrl: string;
}


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

export function EditAbout({ contentHtml, imageUrl }: AboutProps) {
    const [state, formAction] = useFormState(editAbout, initialState)

    return (
        <div className="editor-group">
            <form action={formAction} id="myForm-about" className="editor-about">
                <h2>Editar página principal</h2>
                <ImageEdit imageUrl={imageUrl} />
                <label htmlFor="editor_content" style={{ display: "none" }}>Texto:</label>
                <RichText contentHtml={contentHtml} />
                <EditButton />
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </form>
        </div>
    )
}
