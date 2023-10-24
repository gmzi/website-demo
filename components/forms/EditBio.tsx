'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { Bio } from '@/types'
import { editBio } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImagesEdit } from './ImageEdit'
import { ImageGridInput, ImageInputWithIndexAndDefaultValue } from './ImageInput'
import { RichText } from './text-editor/RichText'
import ImageGrid from '../ImageGrid'


interface BioProps {
    contentHtml: string;
    imageUrls: string[];
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

export function EditBio({ contentHtml, imageUrls }: BioProps) {
    const [state, formAction] = useFormState(editBio, initialState)

    const heroImageUrl = imageUrls[0];
    const gridImageUrls = imageUrls.slice(1);

    const imagesGrid = gridImageUrls.map((url, index) => {
        return (
            <div key={`edit-image-${index}`}>
                <ImageGridInput idx={index + 2} defaultValue={url} className="" />
            </div>
        )
    })

    function handleCancel(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        window.location.reload();
    }


    return (
        // <form action={formAction}>
        //     <h2>EDITAR Bio</h2>
        //     <RichText contentHtml={contentHtml} />
        //     <ImagesEdit imageUrls={imageUrls} />
        //     <EditButton />
        //     <p aria-live="polite" className="sr-only" role="status">
        //         {state?.message}
        //     </p>
        // </form>
        <form action={formAction}>
            <h2>EDITAR Bio</h2>
            <ImageInputWithIndexAndDefaultValue idx={1} defaultValue={heroImageUrl} className="bio-hero-image" />
            <RichText contentHtml={contentHtml} />
            <div className="image-grid">
                {imagesGrid}
            </div>
            {/* <ImageGrid images={gridImageUrls} /> */}
            {/* <ImagesEdit imageUrls={imageUrls} /> */}
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
