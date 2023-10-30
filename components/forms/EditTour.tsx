'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { ImageEdit } from './ImageEdit'
import type { Tour } from '@/types'
import { editTour } from '@/app/actions'
import { ImageInputWithIDAndDefaultValue } from './ImageInput'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const initialState = {
    message: null,
}

function EditButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Save changes
        </button>
    )
}

export function EditTour({ tour }: {tour: Tour}) {
    const [state, formAction] = useFormState(editTour, initialState)

    return (
        <form action={formAction}>
            <h2>EDITAR Gira</h2>
            <input type="hidden" name="id" value={tour.id} />

            <label htmlFor="show_title">Espectáculo:</label>
            <input type="text" id="show_title" name="show_title" defaultValue={tour.show_title} />
            <label htmlFor="year">Año de la gira:</label>
            <input type="text" id="year" name="year" defaultValue={tour.year}/>
            <label htmlFor="title_or_place">Nombre del festival o sala:</label>
            <input type="text" id="title_or_place" name="title_or_place" defaultValue={tour.title_or_place} />
            <label htmlFor="city">Ciudad:</label>
            <input type="text" id="city" name="city" defaultValue={tour.city}/>
            <label htmlFor="country">Fecha:</label>
            <input type="text" id="country" name="country" defaultValue={tour.country}/>
            <label htmlFor="press_url">Link al articulo de prensa:</label>
            <input type="text" id="press_url" name="press_url" defaultValue={tour.press_url} />
            {/* <ImageEdit imageUrl={tour.image_url} /> */}
            <ImageInputWithIDAndDefaultValue id={1} defaultValue={tour.image_1_url} className=""/>
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
