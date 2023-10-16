'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { ChangeEvent, useEffect } from 'react'
import type { About } from '@/types'
import { editPressArticle, createPressArticle, editHeroText, editAvailableCourse, createCourse, createSection, createCourseReview, editCourseReview, editTestimonial, createTestimonial, editCourseLogistics, editPressHeroImage, createPressVideo, editPressVideo, editShow, createShow } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { parseNameAndRole } from '@/lib/parseNameAndRole'
import { ImageInputWithIndex, ImageInputWithIndexAndDefaultValue, ImageInputWithIndexAndDefaultValueAndDeleteButton } from './ImageInput'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import { IframeForm, IframeEdit } from './IframeForm'
import type { Show, NameAndRole, WrittenPressArticle, VideoPressArticle, Course, Goals, Testimonial, Data, Review } from '@/types'
import parse from 'html-react-parser'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import Link from 'next/link'
import { Delete } from './Delete'
import Image from 'next/image'
import { set } from 'zod'


interface ShowsListProps {
    shows: Show[];
}

interface EditPressVideoProps {
    pressVideos: VideoPressArticle[];
    index: number;
    handleCancel: () => void;
}

interface EditProps {
    articles: Show[];
    index: number;
    handleCancel: () => void;
}

const initialState = {
    message: null
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Create
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

export function ShowsList({ shows }: ShowsListProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const showsList = shows.map((show: Show, i: number) => (
        <div key={`${show.title}-${i}`} >
            <div className="display-show-card">
                <div className="display-show-card__content">
                    <h2 className="display-show-card__title">{show.title}</h2>
                    <p className="display-show-card__theatre">{show.theatre}</p>
                    <p className="display-show-card__date">{show.opening_date}</p>
                </div>
                <div className="display-show-card__image">
                    <Image
                        src={show.image_1_url}
                        alt={show.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{
                            width: '20%',
                            height: 'auto',
                            borderRadius: '5px',
                            marginBottom: '.5em'
                        }}

                    />
                </div>
            </div>
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="shows" entry="content" section="shows" id={show.id} />
        </div>
    ));

    return (
        <div>
            <h2>Artículos de prensa:</h2>
            {/* {openEditor !== false ? <EditAvailableCourse shows={shows} index={openEditor} handleCancel={handleCancel} /> : showsList} */}
            {openEditor !== false ? <Edit articles={shows} index={openEditor} handleCancel={handleCancel} /> : showsList}
        </div>
    )

}

export function Edit({ articles, index, handleCancel }: EditProps) {
    const [state, formAction] = useFormState(editShow, initialState)
    const [deleteImages, setDeleteImages] = useState<{url: string, index: number}[]>([]);

    const item = articles[index];

    function handleDeleteImage(url: string, index: number) {
        setDeleteImages(prevParsedUrls => [...prevParsedUrls, {url: url, index: index}])
    }

    return (
        <form action={formAction} id="myForm" className="edit-show-form">

            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="slug" value={item.slug} />
            <input type="hidden" name={`delete_image_urls`} id={`delete_image_urls`} value={JSON.stringify(deleteImages)} />

            <h2>Editar show</h2>
            <div className="show-card create">
                <div className="show-card__image create">
                    <h2>Adjuntar imágenes -una obligatoria, dos opcionales-</h2>
                    <ImageInputWithIndexAndDefaultValue idx={1} defaultValue={item.image_1_url} />
                    <ImageInputWithIndexAndDefaultValueAndDeleteButton idx={2} defaultValue={item.image_2_url} handleDeleteImage={handleDeleteImage}  />
                    <ImageInputWithIndexAndDefaultValueAndDeleteButton idx={3} defaultValue={item.image_3_url} handleDeleteImage={handleDeleteImage} />
                </div>
                <div className="show-card__content create">
                    <label htmlFor="title">Título del espectáculo:</label>
                    <input type="text" id="title" name="title" className="show-card__title create" defaultValue={item.title} required />

                    <label htmlFor="opening_date">Fecha de estreno:</label>
                    <input type="text" id="opening_date" name="opening_date" className="show-card__date create" defaultValue={item.opening_date} />

                    <label htmlFor="theatre">Sala:</label>
                    <input type="text" id="theatre" name="theatre" className="show-card__theatre create" defaultValue={item.theatre} />

                    <label htmlFor="editor_content">Sinopsis:</label>
                    <RichText contentHtml={item.sinopsis} />

                    {/* <AddTeam labelContent="Agregar cast" inputName="cast" required={true}/>
                    <AddTeam labelContent="Agregar equipo creativo" inputName="creative" required={false}/>
                    <AddTeam labelContent="Agregar musicos" inputName="musicians" required={false}/>
                    <AddTeam labelContent="Agregar bailarines" inputName="dancers" required={false}/> */}
                    <EditTeam labelContent='Editar cast' inputName='cast' required={true} membersArray={item.cast} />
                    <EditTeam labelContent='Editar equipo creativo' inputName='creative' required={false} membersArray={item.creative} />
                    <EditTeam labelContent='Editar músicos' inputName='musicians' required={false} membersArray={item.musicians} />
                    <EditTeam labelContent='Editar bilarines' inputName='dancers' required={false} membersArray={item.dancers} />
                </div>
                <EditButton />
                <button onClick={handleCancel}>Cancelar</button>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </div>
        </form>
    )
}

export function CreateShow() {
    const [state, formAction] = useFormState(createShow, initialState)

    // until we figure out how to reset form input after successfull data savign, bare with this:
    if (state?.message === 'article added') {

        const form = document.getElementById("myForm");
        // @ts-ignore
        form.reset()
        // state.message = null;
    }

    return (
        <form action={formAction} id="myForm" className="create-show-form">
            <h2>Crear show</h2>
            <div className="show-card create">
                <div className="show-card__image create">
                    <h2>Adjuntar imágenes -una obligatoria, dos opcionales-</h2>
                    <ImageInputWithIndex idx={1} />
                    <ImageInputWithIndex idx={2} />
                    <ImageInputWithIndex idx={3} />
                </div>
                <div className="show-card__content create">
                    <label htmlFor="title">Título del espectáculo:</label>
                    <input type="text" id="title" name="title" className="show-card__title create" required />

                    <label htmlFor="opening_date">Fecha de estreno:</label>
                    <input type="text" id="opening_date" name="opening_date" className="show-card__date create" />

                    <label htmlFor="theatre">Sala:</label>
                    <input type="text" id="theatre" name="theatre" className="show-card__theatre create" />

                    <label htmlFor="editor_content">Sinopsis:</label>
                    <RichText contentHtml='' />

                    {/* <AddWholeCast/> */}
                    <AddTeam labelContent="Agregar cast" inputName="cast" required={true} />
                    <AddTeam labelContent="Agregar equipo creativo" inputName="creative" required={false} />
                    <AddTeam labelContent="Agregar musicos" inputName="musicians" required={false} />
                    <AddTeam labelContent="Agregar bailarines" inputName="dancers" required={false} />
                </div>
                <SubmitButton />
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </div>
        </form>
    )
}

export function AddTeam({ labelContent, inputName, required }: { labelContent: string, inputName: string, required: boolean }) {
    const [team, setTeam] = useState<string | null>();
    const [parsedTeam, setParsedTeam] = useState<NameAndRole[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTeam(value)
    };

    function handleWholeTeam() {
        const parsedData = parseNameAndRole(team);
        setParsedTeam(parsedData);
        setTeam(null);
    };

    return (
        <>
            <label htmlFor={inputName}>{labelContent}</label>
            <input type="text" id={inputName} name={inputName} onChange={handleInputChange} required={required} />
            {team ? (<button type="button" onClick={handleWholeTeam}>parse</button>) : <button disabled type="button" onClick={handleWholeTeam}>parse</button>}
            {parsedTeam.length > 0 && (
                <div>
                    <h3>Parsed team:</h3>
                    <ul>
                        {parsedTeam.map((item, index) => (
                            <li key={index}>
                                {item.name} - {item.role}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>

    )
}

export function EditTeam({ labelContent, inputName, required, membersArray }: { labelContent: string, inputName: string, required: boolean, membersArray: NameAndRole[] }) {
    const [team, setTeam] = useState<string | null>();
    const [parsedTeam, setParsedTeam] = useState<NameAndRole[]>(membersArray);

    function handleWholeTeam() {
        const parsedData = parseNameAndRole(team);
        const updatedData = [...parsedTeam, ...parsedData];
        setParsedTeam(updatedData);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTeam(value)
    };

    function handleItemChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const name = e.target.name;
        const value = e.target.value;

        setParsedTeam((prevParsedTeam) => {
            const updatedTeam = prevParsedTeam.map((item, itemIndex) => {
                if (itemIndex === index) {
                    if (name === 'name') {
                        return { ...item, name: value };
                    } else if (name === 'role') {
                        return { ...item, role: value };
                    }
                }
                return item;
            });
            return updatedTeam;
        });
    }

    return (
        <>
            <h2>{labelContent}</h2>
            {parsedTeam.length > 0 && (
                <div>
                    <ul>
                        {parsedTeam.map((item, index) => (
                            <li key={`item-${index}`}>
                                <label htmlFor='name'>name: </label>
                                <input type="text" name='name' defaultValue={item.name} onChange={(e) => handleItemChange(e, index)} />
                                <label htmlFor='role'>role: </label>
                                <input type="text" name='role' defaultValue={item.role} onChange={(e) => handleItemChange(e, index)} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <input type="hidden" id={inputName} name={inputName} value={JSON.stringify(parsedTeam)} />
            {/* <input type="text" id={inputName} name={inputName} onChange={handleInputChange}/> */}
            <label htmlFor='clientInput'>Agregar miembros</label>
            <input type="text" id='clientInput' name='clientInput' onChange={handleInputChange} />
            {team ? (<button type="button" onClick={handleWholeTeam}>agregar</button>) : <button disabled type="button" onClick={handleWholeTeam}>agregar</button>}
        </>
    )
}
