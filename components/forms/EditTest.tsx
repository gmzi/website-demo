'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
// import type { About } from '@/types'
import { editAbout, editTest } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import { useState } from 'react'
import { ImageInputWithIDAndDefaultValue } from './ImageInput'


interface AboutProps {
    contentHtml: string;
    imageUrl: string;
}


const initialState = {
    message: null
}

function EditButton() {
    const { pending } = useFormStatus()

    if (pending) {
        return <button type="submit" aria-disabled>Saving...</button>
    }

    return (
        <button type="submit" aria-disabled={pending}>
            Save changes
        </button>
    )
}

async function testAbout() {
    console.log("testAbout");
    return { message: "your action was successfull" };
}

export function EditTest({ contentHtml, imageUrl }: AboutProps) {
    const [state, formAction] = useFormState(editTest, initialState)
    // const [state, formAction] = useFormState(testAbout, initialState)

    return (
        <>
            <div className="editor-group">
                <form action={formAction} id="myForm-about" className="editor-about">
                    {/* <ImageEdit imageUrl={imageUrl} /> */}
                    <ImageInputWithIDAndDefaultValue id={1} defaultValue={imageUrl} className="bio-hero-image" />
                    <label htmlFor="editor_content" style={{ display: "none" }}>Texto:</label>
                    <RichText contentHtml={contentHtml} />
                    <EditButton />
                    <p
                        aria-live="polite"
                        className={`sr-only ${state?.message ? 'visible' : ''}`}
                        role="status"
                    >
                        {state?.message}
                    </p>
                </form>
            </div>
        </>
    )
}
