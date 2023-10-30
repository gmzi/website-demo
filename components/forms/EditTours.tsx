'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { createTour } from '@/app/actions';
// import { ImageInput } from '../ImageInput';
import { ImageInputWithID, ImageInputWithIDAndDefaultValue } from './ImageInput';
import { Delete } from './Delete';
import type { Tour } from '@/types';
import { useState } from 'react';
import { editTour } from '@/app/actions';
import Image from 'next/image';



const initialState = {
    message: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Create tour
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

export function ToursList({ tours }: { tours: Tour[] }) {
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

    const toursList =
        <div>
            {tours.map((tour: Tour, i: number) => (
                <div key={`item-${tour.id}`} className="editor-group">
                    <h2>{tour.title_or_place}</h2>
                    <div className="heroContainer">
                        <ImageInputWithIDAndDefaultValue id={1} defaultValue={tour.image_1_url} className="" />
                    </div>
                    <div className="card-buttons">
                        <button onClick={handleClick} tabIndex={i}>Editar</button>
                        <Delete document="tours" entry={`content`} section="tours" id={tour.id} />
                    </div>
                </div>
            ))}
            {openCreator ? <CreateTour handleCreateCancel={handleCreateCancel} /> : <button onClick={handleCreate}>Agregar una nueva gira</button>}
        </div>

    return (
        <div className="showsList">
            <h1>Giras</h1>
            {openEditor !== false ? <EditTour tours={tours} index={openEditor} handleCancel={handleCancel} /> : toursList}
        </div>
    )
}

export function EditTour({ tours, index, handleCancel }: { tours: Tour[], index: number, handleCancel: () => void }) {
    const [state, formAction] = useFormState(editTour, initialState)

    const tour = tours[index];

    return (
        <form action={formAction}>
            <h2>EDITAR Gira</h2>
            <input type="hidden" name="id" value={tour.id} />

            <label htmlFor="show_title">Espectáculo:</label>
            <input type="text" id="show_title" name="show_title" defaultValue={tour.show_title} />
            <label htmlFor="year">Año de la gira:</label>
            <input type="text" id="year" name="year" defaultValue={tour.year} />
            <label htmlFor="title_or_place">Nombre del festival o sala:</label>
            <input type="text" id="title_or_place" name="title_or_place" defaultValue={tour.title_or_place} />
            <label htmlFor="city">Ciudad:</label>
            <input type="text" id="city" name="city" defaultValue={tour.city} />
            <label htmlFor="country">Fecha:</label>
            <input type="text" id="country" name="country" defaultValue={tour.country} />
            <label htmlFor="press_url">Link al articulo de prensa:</label>
            <input type="text" id="press_url" name="press_url" defaultValue={tour.press_url} />
            {/* <ImageEdit imageUrl={tour.image_url} /> */}
            <ImageInputWithIDAndDefaultValue id={1} defaultValue={tour.image_1_url} className="preview-default" />
            <EditButton />
            <button onClick={handleCancel}>Cancelar</button>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}



export function CreateTour({handleCreateCancel}: {handleCreateCancel: () => void}) {
    const [state, formAction] = useFormState(createTour, initialState)

    // until we figure out how to reset form input after successfull data savign, bare with this:
    if (state?.message === 'article added') {

        const form = document.getElementById("myForm");
        // @ts-ignore
        form.reset()
        // state.message = null;
    }

    return (
        <form action={formAction} id="myForm" className="form-shows">
            <h2>Agregar una nueva gira</h2>
            <div className="show-card">
                <label htmlFor="show_title">Espectáculo:</label>
                <input type="text" id="show_title" name="show_title" className="show-credits" />

                <label htmlFor="year">Año de la gira:</label>
                <input type="text" id="year" name="year" className="show-credits" />

                <label htmlFor="title_or_place">Nombre del festival o sala:</label>
                <input type="text" id="title_or_place" name="title_or_place" className="show-credits" />

                <label htmlFor="city">Ciudad:</label>
                <input type="text" id="city" name="city" className="show-credits" />

                <label htmlFor="country">País:</label>
                <input type="text" id="country" name="country" className="show-credits" />

                <label htmlFor="press_url">Link al articulo de prensa:</label>
                <input type="text" id="press_url" name="press_url" className="show-credits" />
                <ImageInputWithID id={1} />
                <SubmitButton />
                <button onClick={handleCreateCancel}>Cancelar</button>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </div>
        </form>
    )
}



