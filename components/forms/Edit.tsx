'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import type { WrittenPressArticle } from '@/types'
import { editPressArticle } from '@/app/actions'
import { ImageEdit } from './ImageEdit'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DeletionFormProps {
    document: string;
    entry: string;
    section: string;
    item: WrittenPressArticle;
}

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

export function Edit({document, entry, section, item}: DeletionFormProps) {
  const [state, formAction] = useFormState(editPressArticle, initialState)

  return (
    <form action={formAction}>
        <h2>EDITAR</h2>
      <input type="hidden" name="id" value={item.id} />

      <label htmlFor="veredict">Veredict:</label>
      <input type="text" id="veredict" name="veredict" defaultValue={item.veredict}/>
      <label htmlFor="quote">Cita:</label>
      <input type="text" id="quote" name="quote" defaultValue={item.quote}/>
      <label htmlFor="media_organization">Medio:</label>
      <input type="text" id="media_organization" name="media_organization" defaultValue={item.media_organization}/>
      <label htmlFor="journalist">Autor de la nota:</label>
      <input type="text" id="journalist" name="journalist" defaultValue={item.journalist}/>
      <label htmlFor="date">Fecha:</label>
      <input type="text" id="date" name="date" defaultValue={item.date}/>
      <label htmlFor="article_url">Link al articulo:</label>
      <input type="text" id="article_url" name="article_url" defaultValue={item.article_url}/>
      <label htmlFor="show">Espectaculo:</label>
      <input type="text" id="show" name="show"defaultValue={item.show}/>
      <ImageEdit imageUrl={item.image_url}/>
      <EditButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
