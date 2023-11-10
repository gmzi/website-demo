'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { createTour, editToursHeroImage } from '@/app/actions';
// import { ImageInput } from '../ImageInput';
import { ImageInputWithID, ImageInputWithIDAndDefaultValue } from './ImageInput';
import { Delete } from './Delete';
import type { Tour } from '@/types';
import { useState } from 'react';
import { editTour } from '@/app/actions';
import Image from 'next/image';
import Link from 'next/link';


interface ImageProp {
    imageUrl: string;
}

export interface ToursProps {
    tours: Tour[];
}

const initialState = {
    message: null,
}

function SubmitButton() {
    const { pending } = useFormStatus()

    if (pending) {
        return <button type="submit" aria-disabled>Saving...</button>
    }

    return (
        <button type="submit" aria-disabled={pending}>
            Create tour
        </button>
    )
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

export function HeroImage({ imageUrl }: ImageProp) {
    const [state, formAction] = useFormState(editToursHeroImage, initialState)

    return (
        <div className="heroContainer editor-group">
            <form action={formAction}>
                <h2>Edit imagen</h2>
                {/* <ImageEdit imageUrl={imageUrl} /> */}
                <ImageInputWithIDAndDefaultValue id={1} defaultValue={imageUrl} className="" />
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
    )
}

export function ToursList({ tours }: { tours: Tour[] }) {
    const [openEditor, setOpenEditor] = useState<string | false>(false);
    const [openCreator, setOpenCreator] = useState<true | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.id);
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

    const uniqueYears: string[] = [...new Set(tours.map(item => item.year))]
        .sort((a, b) => parseInt(b, 10) - parseInt(a, 10));

    const toursList =
        <div className="">
            <ul className="years-list">
                {openCreator ? <CreateTour handleCreateCancel={handleCreateCancel} /> : (
                    <li className="editor-group">
                        <h2>Create new gira</h2>
                        <button onClick={handleCreate}>Agregar una nueva gira</button>
                    </li>
                )}
                {uniqueYears.map((year, i) => (
                    <li key={`${year}-${i}`}>
                        <h2>{year}</h2>
                        <ul className="tours-list">
                            {tours
                                .filter(item => item.year === year)
                                .map((item, index) => (
                                    <li key={index} className="editor-group">
                                        <h3>{item.title_or_place}</h3>
                                        <p>{item.city}</p>
                                        {item.press_url.length > 0 &&
                                            <Link href={item.press_url} target="_blank">Artículo de prensa</Link>
                                        }
                                        {item.image_1_url.length > 0 &&
                                            <div className="imgContainer">
                                                <Image
                                                    className="tours-default"
                                                    src={item.image_1_url}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    alt="Gira"
                                                />
                                            </div>

                                        }
                                        <div className='card-buttons'>
                                            <button onClick={handleClick} id={item.id}>Edit</button>
                                            <Delete document="tours" entry={`content`} section="tours" id={item.id} />
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </li>

                ))}
            </ul>
        </div>

    return (
        <div className="showsList">
            <h1>Tours</h1>
            {openEditor !== false ? <EditTour tours={tours} id={openEditor} handleCancel={handleCancel} /> : toursList}
        </div>
    )
}

export function EditTour({ tours, id, handleCancel }: { tours: Tour[], id: string, handleCancel: () => void }) {
    const [state, formAction] = useFormState(editTour, initialState)

    // const tour = tours.filter((item) => item.id === id);
    const tour = tours.find((item) => item.id === id);

    if (!tour) {
        // Handle the case where 'tour' is not found (optional)
        return <div>Tour not found</div>;
    }

    return (
        <form action={formAction} className='form-shows'>
            <h2>Edit Gira</h2>
            <div className="show-card">
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
                <p
                    aria-live="polite"
                    className={`sr-only ${state?.message ? 'visible' : ''}`}
                    role="status"
                >
                    {state?.message}
                </p>
            </div>

        </form>

    )
}



export function CreateTour({ handleCreateCancel }: { handleCreateCancel: () => void }) {
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
                <p
                    aria-live="polite"
                    className={`sr-only ${state?.message ? 'visible' : ''}`}
                    role="status"
                >
                    {state?.message}
                </p>
            </div>
        </form>
    )
}



