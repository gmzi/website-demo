'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { About } from '@/types'
import { editPressArticle, createPressArticle, editHeroText, editAvailableCourse, createCourse, createSection, createCourseReview, editCourseReview, editTestimonial, createTestimonial, editCourseLogistics, editPressHeroImage } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImageForm } from './ImageForm'
import { ImagesEdit } from './ImageEdit'
import { RichText } from './text-editor/RichText'
import type { WrittenPressArticle, Course, Goals, Testimonial, Data, Review } from '@/types'
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
        <form action={formAction}>
            <h2>Editar imagen</h2>
            <ImageEdit imageUrl={imageUrl} />
            <EditButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )

}

export function PressArticles({ articles }: PressArticlesProps) {
    const [openEditor, setOpenEditor] = useState<number | false>(false);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        setOpenEditor(e.currentTarget.tabIndex)
    }


    function handleCancel() {
        setOpenEditor(false)
    }

    const artciclesList = articles.map((article: WrittenPressArticle, i: number) => (
        <div key={`press-card-${i}`} className="press-card">
            <div className="press-card-header">
                <h4>{article.veredict}</h4>
            </div>
            <div>
                <p>{article.quote}</p>
                <div>
                    <span className="journalist">{article.journalist}</span>
                </div>
                <div>
                    <span className="media-organization">{article.media_organization}</span>
                </div>
            </div>
            <button onClick={handleClick} tabIndex={i}>Editar</button>
            <Delete document="press" entry="written_press" section="press" id={article.id} />
        </div>
    ));

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
        <form action={formAction}>
            <h2>EDITAR</h2>
            <input type="hidden" name="id" value={item.id} />

            <div className="press-card">
                <label htmlFor="veredict">Veredict:</label>
                <input type="text" id="veredict" name="veredict" defaultValue={item.veredict} />
                <label htmlFor="quote">Cita:</label>
                <input type="text" id="quote" name="quote" defaultValue={item.quote} />
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
                <ImageEdit imageUrl={item.image_url} />
                <EditButton />
                <button onClick={handleCancel}>Cancelar</button>
            </div>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function CreatePressArticle() {
    const [state, formAction] = useFormState(createPressArticle, initialState)

    // until we figure out how to reset form input after successfull data savign, bare with this:
    if (state?.message === 'article added') {

        const form = document.getElementById("myForm");
        // @ts-ignore
        form.reset()
        // state.message = null;
    }

    return (
        <form action={formAction} id="myForm">
            <h2>Agregar artículo de prensa</h2>
            <div className="press-card">
                <label htmlFor="veredict">Veredict:</label>
                <input type="text" id="veredict" name="veredict" />
                <label htmlFor="quote">Cita:</label>
                <input type="text" id="quote" name="quote" required />
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
                <ImageForm />
                <SubmitButton />
            </div>

            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}
