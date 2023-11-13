'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { editBio } from '@/app/actions'
import { ImageGridInput, ImageInputWithIDAndDefaultValue } from './ImageInput'
import { RichText, RichTextWithIdentificator } from './text-editor/RichText'
import ImageGrid from '../ImageGrid'
// import e from '@/app/(editor)/editor/editor.module.css'
import e from '@/app/(editor)/editor/editor.module.css'


interface BioProps {
    contentHtml_1: string;
    contentHtml_2: string;
    image1Url: string;
    image2Url: string;
    image3Url: string;
    image4Url: string;
    image5Url: string;
    image6Url: string;
    image7Url: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


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

export function EditBio({ 
    contentHtml_1, 
    contentHtml_2, 
    image1Url, 
    image2Url, 
    image3Url, 
    image4Url, 
    image5Url, 
    image6Url, 
    image7Url, 
    }
    : BioProps) {
    const [state, formAction] = useFormState(editBio, initialState)

    const heroImageUrl = image1Url;

    // const imagesGrid = gridImageUrls.map((url, index) => {
    //     return (
    //         <div key={`edit-image-${index}`}>
    //             <ImageGridInput id={index + 2} defaultValue={url} className="" />
    //         </div>
    //     )
    // })
    const imagesGrid = 
        <div className={e.imageGrid}>
            <ImageGridInput id={2} defaultValue={image2Url} className=''/>
            <ImageGridInput id={3} defaultValue={image3Url} className=''/>
            <ImageGridInput id={4} defaultValue={image4Url} className=''/>
            <ImageGridInput id={5} defaultValue={image5Url} className=''/>
            <ImageGridInput id={6} defaultValue={image6Url} className=''/>
            <ImageGridInput id={7} defaultValue={image7Url} className=''/>
        </div>



    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        window.location.reload();
    }

    return (
        <div className="editor-group">
            <form action={formAction} className="form-bio">
                <div className="imgContainer">
                    <ImageInputWithIDAndDefaultValue id={1} defaultValue={heroImageUrl} className="" />
                </div>
                <div>
                    <div className="paragraphContainer">
                        <RichTextWithIdentificator contentHtml={contentHtml_1} identificator={1} />
                    </div>
                    <div className="">
                        {imagesGrid}
                    </div>
                    <div className="paragraphContainer">
                        <RichTextWithIdentificator contentHtml={contentHtml_2} identificator={2} />
                    </div>
                </div>
                <EditButton />
                <button onClick={handleCancel}>Cancelar</button>
                <p
                        aria-live="polite"
                        className={`sr-only ${state?.message ? 'visible' : ''}`}
                        role="status"
                    >
                        {state?.message}
                </p>
            </form>
        </div>
    )
}
