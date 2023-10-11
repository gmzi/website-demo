'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { ChangeEvent } from 'react'
import type { About } from '@/types'
import { editPressArticle, createPressArticle, editHeroText, editAvailableCourse, createCourse, createSection, createCourseReview, editCourseReview, editTestimonial, createTestimonial, editCourseLogistics, editPressHeroImage, createPressVideo, editPressVideo, editShow, createShow } from '@/app/actions'
import { ImageEdit } from './ImageEdit'
import { ImageInput, ImageInputWithIndex } from './ImageInput'
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


interface ImageProp {
    imageUrl: string;
}

interface PressArticlesProps {
    articles: WrittenPressArticle[];
}

interface ShowsListProps {
    shows: Show[];
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

// export function PressArticles({ articles }: PressArticlesProps) {
//     const [openEditor, setOpenEditor] = useState<number | false>(false);

//     function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
//         e.preventDefault();
//         setOpenEditor(e.currentTarget.tabIndex)
//     }


//     function handleCancel() {
//         setOpenEditor(false)
//     }

//     const artciclesList = articles.map((article: WrittenPressArticle, i: number) => (
//         <div key={`press-card-${i}`} className="press-card">
//             <div className="press-card-header">
//                 <h4>{article.veredict}</h4>
//             </div>
//             <div>
//                 <p>{article.quote}</p>
//                 <div>
//                     <span className="journalist">{article.journalist}</span>
//                 </div>
//                 <div>
//                     <span className="media-organization">{article.media_organization}</span>
//                 </div>
//             </div>
//             <button onClick={handleClick} tabIndex={i}>Editar</button>
//             <Delete document="press" entry="written_press" section="press" id={article.id} />
//         </div>
//     ));

//     return (
//         <div>
//             <h2>Artículos de prensa:</h2>
//             {/* {openEditor !== false ? <EditAvailableCourse articles={articles} index={openEditor} handleCancel={handleCancel} /> : artciclesList} */}
//             {/* {openEditor !== false ? <Edit articles={articles} index={openEditor} handleCancel={handleCancel} /> : artciclesList} */}
//         </div>
//     )
// }

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

    const item = articles[index];

    return (
        <form action={formAction}>
            <h2>EDITAR</h2>
            <input type="hidden" name="id" value={item.id} />

            <h2>Show Card goes here</h2>

            {/* <div className="press-card">
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
            </div> */}
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
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

                    <AddWholeCast/>
                </div>


                <SubmitButton />
            </div>

            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}

export function AddWholeCast(){
    const [cast, setCast] = useState<string>('');
    const [parsedCast, setParsedCast] = useState<NameAndRole[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCast(value)
    };

    function handleWholeCast(){
        const contentString = cast.trim();
        const namesAndRolesArray = contentString.split(",");
    
        const parsedData = namesAndRolesArray.map(element => {
          const nameAndRole = element.split(":");
          const name = nameAndRole[0]?.trim() || '';
          const role = nameAndRole[1]?.trim() || '';
          return { name, role };
        });

        setParsedCast(parsedData);

      };

    return (
        <>
        <label htmlFor="wholeCast">Agregar cast</label>
        <input type="text" id="wholeCast" name="wholeCast" onChange={handleInputChange}/>
        <button type="button" onClick={handleWholeCast}> add whole cast</button>
        {parsedCast.length > 0 && (
        <div>
          <h3>Parsed Cast:</h3>
          <ul>
            {parsedCast.map((item, index) => (
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
