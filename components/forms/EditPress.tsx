'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editPressArticle, createPressArticle, editAvailableCourse, createCourse, createSection, createCourseReview, editCourseReview, editTestimonial, createTestimonial, editCourseLogistics, editPressHeroImage, createPressVideo, editPressVideo } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImageInput, ImageInputWithIDAndDefaultValue } from './ImageInput'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import { IframeForm, IframeEdit } from './IframeForm'
import type { WrittenPressArticle, VideoPressArticle, Course, Goals, Testimonial, Data, Review } from '@/types'
import parse from 'html-react-parser'
import HTMLReactParser from 'html-react-parser'
import { useState } from 'react'
import Link from 'next/link'
import { Delete } from './Delete'


interface ImageProp {
    imageUrl: string;
}

interface PressArticlesProps {
    articles: WrittenPressArticle[];
}

interface PressVideosProps {
    pressVideos: VideoPressArticle[];
}

interface EditPressVideoProps {
    pressVideos: VideoPressArticle[];
    index: number;
    handleCancel: () => void;
}

interface EditProps {
    articles: WrittenPressArticle[];
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

export function HeroImage({ imageUrl }: ImageProp) {
    const [state, formAction] = useFormState(editPressHeroImage, initialState)

    return (
        <div className="heroContainer editor-group">
            <form action={formAction}>
                <h2>Editar imagen</h2>
                {/* <ImageEdit imageUrl={imageUrl} /> */}
                <ImageInputWithIDAndDefaultValue id={1} defaultValue={imageUrl} className="" />
                <EditButton />
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </form>
        </div>
    )
}

export function PressArticles({ articles }: PressArticlesProps) {
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

    const artciclesList =
        <ul className="tours-list">
            {articles.map((article: WrittenPressArticle, i: number) => (
                <li key={`press-item-${i}`} className="">
                    <blockquote className="review">
                        <h4>{article.veredict}</h4>
                        <p>{parse(article.quote)}</p>
                        <cite>
                            <div className="journalist">{article.journalist}</div>
                            <div className="media-organization">{article.media_organization}</div>
                        </cite>
                        <div>
                            <button onClick={handleClick} tabIndex={i}>Editar</button>
                            <Delete document="press" entry="written_press" section="press" id={article.id} />
                        </div>
                    </blockquote>
                </li>
            ))}
            <li>
                {openCreator ? (<CreatePressArticle handleCreateCancel={handleCreateCancel} />) : (
                    <blockquote className="review">
                        <h5>Agregar nueva crítica</h5>
                        <button onClick={handleCreate}>agregar un nueva crítica</button>
                    </blockquote>
                )}
            </li>
        </ul>


    return (
        <div>
            <h2>Artículos de prensa:</h2>
            {/* {openEditor !== false ? <EditAvailableCourse articles={articles} index={openEditor} handleCancel={handleCancel} /> : artciclesList} */}
            {openEditor !== false ? <Edit articles={articles} index={openEditor} handleCancel={handleCancel} /> : artciclesList}
        </div>
    )
}

export function Edit({ articles, index, handleCancel }: EditProps) {
    const [state, formAction] = useFormState(editPressArticle, initialState)

    const item = articles[index];

    return (
        <blockquote className="review">
            <form action={formAction} className="">
                <input type="hidden" name="id" value={item.id} />

                <label htmlFor="veredict">Veredict:</label>
                <input type="text" id="veredict" name="veredict" defaultValue={item.veredict} />
                {/* <label htmlFor="quote">Cita:</label>
                <input type="text" id="quote" name="quote" defaultValue={item.quote} /> */}
                <label htmlFor="editor_content">Texto de la reseña:</label>
                <RichText contentHtml={item.quote} />
                <label htmlFor="media_organization">Medio:</label>
                <input type="text" id="media_organization" name="media_organization" defaultValue={item.media_organization} />
                <label htmlFor="journalist">Autor de la nota:</label>
                <input type="text" id="journalist" name="journalist" defaultValue={item.journalist} />
                <label htmlFor="date">Fecha:</label>
                <input type="text" id="date" name="date" defaultValue={item.date} />
                <label htmlFor="article_url">Link al articulo:</label>
                <input type="text" id="article_url" name="article_url" defaultValue={item.article_url} />
                <label htmlFor="show">Espectaculo:</label>
                <input type="text" id="show" name="show" defaultValue={item.show} />
                <EditButton />
                <button onClick={handleCancel}>Cancelar</button>
                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </form>
        </blockquote>
    )
}

export function CreatePressArticle({ handleCreateCancel }: { handleCreateCancel: () => void }) {
    const [state, formAction] = useFormState(createPressArticle, initialState)

    // until we figure out how to reset form input after successfull data savign, bare with this:
    if (state?.message === 'article added') {

        const form = document.getElementById("myForm");
        // @ts-ignore
        form.reset()
        // state.message = null;
    }

    return (
        <blockquote className="review">
            <form action={formAction} id="myForm" className="form-shows">
                <div className="press-card">
                    <label htmlFor="veredict">Veredict:</label>
                    <input type="text" id="veredict" name="veredict" />
                    {/* <label htmlFor="quote">Cita:</label>
                    <input type="text" id="quote" name="quote" required /> */}
                    <label htmlFor="editor_content">Texto de la reseña:</label>
                    <RichText contentHtml={""} />
                    <label htmlFor="media_organization">Medio:</label>
                    <input type="text" id="media_organization" name="media_organization" required />
                    <label htmlFor="journalist">Autor de la nota:</label>
                    <input type="text" id="journalist" name="journalist" required />
                    <label htmlFor="date">Fecha:</label>
                    <input type="text" id="date" name="date" />
                    <label htmlFor="article_url">Link al articulo:</label>
                    <input type="text" id="article_url" name="article_url" />
                    <label htmlFor="show">Espectaculo:</label>
                    <input type="text" id="show" name="show" />
                    <SubmitButton />
                    <button onClick={handleCreateCancel}>Cancelar</button>
                </div>

                <p aria-live="polite" className="sr-only" role="status">
                    {state?.message}
                </p>
            </form>
        </blockquote>
    )
}

export function PressVideos({ pressVideos }: PressVideosProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const pressVideosList = pressVideos.map((pressVideo: VideoPressArticle, i: number) => (
        <div className="press-video-card" key={`${pressVideo.video_url}-${i}`}>
            <div className="video-container">
                <iframe
                    src={pressVideo.video_url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    title={pressVideo.description}
                />
            </div>
            <div className="video-description">
                <span>{pressVideo.description}</span>
            </div>
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="press" entry="video_press" section="press" id={pressVideo.id} />
        </div>
    ));

    return (
        <div>
            <h2>Videos de prensa:</h2>
            {/* {openEditor !== false ? <EditAvailableCourse pressVideos={pressVideos} index={openEditor} handleCancel={handleCancel} /> : pressVideosList} */}
            {openEditor !== false ? <EditPressVideo pressVideos={pressVideos} index={openEditor} handleCancel={handleCancel} /> : pressVideosList}
        </div>
    )
}

export function EditPressVideo({ pressVideos, index, handleCancel }: EditPressVideoProps) {
    const [state, formAction] = useFormState(editPressVideo, initialState)

    const item = pressVideos[index];

    return (
        <form action={formAction}>
            <h2>EDITAR</h2>
            <input type="hidden" name="id" value={item.id} />

            <div className="press-video-card">
                <label htmlFor="show">Espectaculo:</label>
                <input type="text" id="show" name="show" defaultValue={item.show} />

                {/* <label htmlFor="video_url">Link al video:</label>
                <input type="text" id="video_url" name="video_url" defaultValue={item.video_url} required />
                <div className="video-container">
                    <iframe
                        src={item.video_url}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        title={item.description}
                    />
                </div> */}

                <IframeEdit videoUrl={item.video_url} />

                <div className="video-description">
                    <label htmlFor="description">Epigrafe del video:</label>
                    <input type="text" id="description" name="description" defaultValue={item.description} />
                </div>

                <label htmlFor="title">Titulo del video:</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="source_organization">Institución:</label>
                <input type="text" id="source_organization" name="source_organization" defaultValue={item.source_organization} />

                <EditButton />
                <button onClick={handleCancel}>Cancelar</button>
            </div>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}


export function CreatePressVideo() {
    const [state, formAction] = useFormState(createPressVideo, initialState)

    // until we figure out how to reset form input after successfull data savign, bare with this:
    if (state?.message === 'article added') {

        const form = document.getElementById("myForm");
        // @ts-ignore
        form.reset()
        // state.message = null;
    }

    return (
        <form action={formAction} id="myForm">
            <h2>Agregar video</h2>
            <div className="press-video-card">
                <label htmlFor="show">Espectaculo:</label>
                <input type="text" id="show" name="show" />

                {/* <label htmlFor="video_url">Link al video:</label>
                <input type="text" id="video_url" name="video_url" required />
                <h2>IFrame test</h2> */}

                <IframeForm />

                <label htmlFor="title">Titulo del video:</label>
                <input type="text" id="title" name="title" />

                <label htmlFor="description">Epigrafe del video:</label>
                <input type="text" id="description" name="description" />

                <label htmlFor="source_organization">Institución:</label>
                <input type="text" id="source_organization" name="source_organization" />

                <SubmitButton />
            </div>

            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
