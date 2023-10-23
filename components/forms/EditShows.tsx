'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { ChangeEvent, ChangeEventHandler, useEffect } from 'react'
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
        <div key={`${show.title}-${i}`} className="show-card-container">
            <div className='show-card editor'>
                <div>
                    <h2 className="">{show.title}</h2>
                    <p className="">{show.opening_date}</p>
                </div>
                <Image
                    className="show-card-image"
                    src={show.image_1_url}
                    alt={show.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                />
            </div>
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="shows" entry="content" section="shows" id={show.id} />
        </div>
    ));

    return (
        <div className=''>
            <>
                <h1>shows</h1>
                {openEditor !== false ? <Edit articles={shows} index={openEditor} handleCancel={handleCancel} /> : showsList}
            </>
        </div>
    )

}

export function Edit({ articles, index, handleCancel }: EditProps) {
    const [state, formAction] = useFormState(editShow, initialState)
    const [deleteImages, setDeleteImages] = useState<{ url: string, index: number }[]>([]);

    const item = articles[index];

    function handleDeleteImage(url: string, index: number) {
        setDeleteImages(prevParsedUrls => [...prevParsedUrls, { url: url, index: index }])
    }

    return (
        <form action={formAction} id="myForm" className="form-edit">
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="slug" value={item.slug} />
            <input type="hidden" name={`delete_image_urls`} id={`delete_image_urls`} value={JSON.stringify(deleteImages)} />
            <div className="show-card">
                <label htmlFor="title">Título del espectáculo:</label>
                <input type="text" id="title" name="title" className="show-title" defaultValue={item.title} required />

                <label htmlFor="opening_date">Fecha de estreno:</label>
                <input type="text" id="opening_date" name="opening_date" className="show-year" defaultValue={item.opening_date} />
                <h3>Poster</h3>
                <ImageInputWithIndexAndDefaultValue idx={1} defaultValue={item.image_1_url} />

                <div className="show-sinopsis">
                    <label htmlFor="editor_content">Sinopsis:</label>
                    <RichText contentHtml={item.sinopsis} />
                </div>
                <h2 className="show-credits-title">CREDITOS</h2>
                <div className="show-credits-container">
                    <div className="show-credits">
                        <h3>CON</h3>
                        <EditTeam labelContent='' inputName='cast' required={true} membersArray={item.cast} />
                    </div>
                    <div className="show-credits">
                        <h3>Bailarines</h3>
                        <EditTeam labelContent='' inputName='dancers' required={false} membersArray={item.dancers} />
                    </div>
                    <div className='show-credits'>
                        <h3>Musicos</h3>
                        <EditTeam labelContent='' inputName='musicians' required={false} membersArray={item.musicians} />
                    </div>
                    <div className='show-credits'>
                        <h3>Equipo creativo</h3>
                        <EditTeam labelContent='' inputName='creative' required={false} membersArray={item.creative} />
                    </div>
                </div>
                <div className="buttonsContainer">
                    <EditButton />
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
                {/* these fields are functional and available, but not being used in client: */}
                <div style={{ display: 'none' }}>
                    <ImageInputWithIndexAndDefaultValueAndDeleteButton idx={2} defaultValue={item.image_2_url} handleDeleteImage={handleDeleteImage} />
                    <ImageInputWithIndexAndDefaultValueAndDeleteButton idx={3} defaultValue={item.image_3_url} handleDeleteImage={handleDeleteImage} />
                    <label htmlFor="theatre">Sala:</label>
                    <input type="text" id="theatre" name="theatre" className="show-card__theatre create" defaultValue={item.theatre} />
                </div>
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
        // <form action={formAction} id="myForm" className="create-show-form">
        //     <h2>Crear show</h2>
        //     <div className="show-card create">
        //         <div className="show-card__image create">
        //             <h2>Adjuntar imágenes -una obligatoria, dos opcionales-</h2>
        //             <ImageInputWithIndex idx={1} />
        //             <ImageInputWithIndex idx={2} />
        //             <ImageInputWithIndex idx={3} />
        //         </div>
        //         <div className="show-card__content create">
        //             <label htmlFor="title">Título del espectáculo:</label>
        //             <input type="text" id="title" name="title" className="show-card__title create" required />

        //             <label htmlFor="opening_date">Fecha de estreno:</label>
        //             <input type="text" id="opening_date" name="opening_date" className="show-card__date create" />

        //             <label htmlFor="theatre">Sala:</label>
        //             <input type="text" id="theatre" name="theatre" className="show-card__theatre create" />

        //             <label htmlFor="editor_content">Sinopsis:</label>
        //             <RichText contentHtml='' />

        //             {/* <AddWholeCast/> */}
        //             <AddTeam labelContent="Agregar cast" inputName="cast" required={true} />
        //             <AddTeam labelContent="Agregar equipo creativo" inputName="creative" required={false} />
        //             <AddTeam labelContent="Agregar musicos" inputName="musicians" required={false} />
        //             <AddTeam labelContent="Agregar bailarines" inputName="dancers" required={false} />
        //         </div>
        //         <SubmitButton />
        //         <p aria-live="polite" className="sr-only" role="status">
        //             {state?.message}
        //         </p>
        //     </div>
        // </form>
        <form action={formAction} id="myForm" className="form-edit">
            <h2>Agregar nuevo show</h2>
            <div className="show-card">
                <label htmlFor="title">Título del espectáculo:</label>
                <input type="text" id="title" name="title" className="show-title" required />

                <label htmlFor="opening_date">Año de estreno:</label>
                <input type="text" id="opening_date" name="opening_date" className="show-year" />
                
                {/* <ImageInputWithIndexAndDefaultValue idx={1} defaultValue={item.image_1_url} /> */}
                <ImageInputWithIndex idx={1} />

                <div className="show-sinopsis">
                    <label htmlFor="editor_content">Sinopsis:</label>
                    <RichText contentHtml={''} />
                </div>
                <h2 className="show-credits-title">CREDITOS</h2>
                <div className="show-credits-container">
                    <div className="show-credits">
                        <h3>CON</h3>
                        {/* <EditTeam labelContent='' inputName='cast' required={true} membersArray={item.cast} /> */}
                        <AddTeam labelContent='' inputName='cast' required={true} />
                    </div>
                    <div className="show-credits">
                        <h3>Bailarines</h3>
                        {/* <EditTeam labelContent='' inputName='dancers' required={false} membersArray={item.dancers} /> */}
                        <AddTeam labelContent='' inputName='dancers' required={false} />
                    </div>
                    <div className='show-credits'>
                        <h3>Musicos</h3>
                        {/* <EditTeam labelContent='' inputName='musicians' required={false} membersArray={item.musicians} />*/}
                        <AddTeam labelContent='' inputName='musicians' required={false} />
                    </div>
                    <div className='show-credits'>
                        <h3>Equipo creativo</h3>
                        {/* <EditTeam labelContent='' inputName='creative' required={false} membersArray={item.creative} /> */}
                        <AddTeam labelContent='' inputName='creative' required={false} />
                    </div>
                </div>
                <div className="buttonsContainer">
                    <SubmitButton />
                </div>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
                {/* these fields are functional and available, but not being used in client: */}
                <div style={{ display: 'none' }}>
                    <ImageInputWithIndex idx={2} />
                    <ImageInputWithIndex idx={3} />
                    <label htmlFor="theatre">Sala:</label>
                    <input type="text" id="theatre" name="theatre" className="show-card__theatre create" value='' readOnly />
                </div>
            </div>
        </form>
    )
}

export function AddTeam({ labelContent, inputName, required }: { labelContent: string, inputName: string, required: boolean }) {
    const [team, setTeam] = useState<string | null>();
    const [parsedTeam, setParsedTeam] = useState<NameAndRole[]>([]);

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setTeam(value)
    };

    function handleWholeTeam() {
        const parsedData = parseNameAndRole(team);
        setParsedTeam(parsedData);
        setTeam(null);
    };

    return (
        <div>
            {/* <label htmlFor={inputName}>{labelContent}</label>
            <input type="text" id={inputName} name={inputName} onChange={handleInputChange} required={required} className="team-creation-input"/> */}
            <textarea id={inputName} name={inputName} onChange={handleInputChange} required={required} defaultValue={"Name 1: role 1, Name 2: role 2"}/>

            {team ? (<button type="button" onClick={handleWholeTeam}>parse</button>) : <button disabled type="button" onClick={handleWholeTeam}>parse</button>}
            {parsedTeam.length > 0 && (
                <div className='team-wrapper'>
                    <ul>
                        {parsedTeam.map((item, index) => (
                            <li key={index} className="nameAndRole">
                                <span className="credits-name">
                                    <label htmlFor='name'>name: </label>
                                    <input type="text" name='readonly-name' value={item.name} readOnly />
                                </span>
                                <span className="credits-role">
                                    <label htmlFor='role'>role: </label>
                                    <input type="text" name='readonly-role' value={item.role} readOnly />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

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
        <div className="team-wrapper">
            <h2>{labelContent}</h2>
            {parsedTeam.length > 0 && (
                <ul>
                    {parsedTeam.map((item, index) => (
                        <li key={`item-${index}`} className="nameAndRole">
                            <span className="credits-name">
                                <label htmlFor='name'>name: </label>
                                <input type="text" name='name' defaultValue={item.name} onChange={(e) => handleItemChange(e, index)} />
                            </span>
                            <span className="credits-role">
                                <label htmlFor='role'>role: </label>
                                <input type="text" name='role' defaultValue={item.role} onChange={(e) => handleItemChange(e, index)} />
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            <input type="hidden" id={inputName} name={inputName} value={JSON.stringify(parsedTeam)} />
            {/* <input type="text" id={inputName} name={inputName} onChange={handleInputChange}/> */}
            <label htmlFor='clientInput'>Agregar miembros</label>
            <input type="text" id='clientInput' name='clientInput' onChange={handleInputChange} />
            {team ? (<button type="button" onClick={handleWholeTeam}>agregar</button>) : <button disabled type="button" onClick={handleWholeTeam}>agregar</button>}
        </div>
    )
}
