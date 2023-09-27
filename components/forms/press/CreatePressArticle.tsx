'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { addPressArticle } from '@/app/actions';

const initialState = {
  message: null,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  )
}

export function CreatePressArticle() {
  const [state, formAction] = useFormState(addPressArticle, initialState)

  // until we figure out how to reset form input after successfull data savign, bare with this:
  if (state?.message === 'article added'){
    
    const form = document.getElementById("myForm");
    // @ts-ignore
    form.reset()
    // state.message = null;
  }

  return (
    <form action={formAction} id="myForm">
      <h2>Agregar artículo de prensa</h2>
      <label htmlFor="veredict">Veredict:</label>
      <input type="text" id="veredict" name="veredict"/>
      <label htmlFor="quote">Cita:</label>
      <input type="text" id="quote" name="quote" required/>
      <label htmlFor="media_organization">Medio:</label>
      <input type="text" id="media_organization" name="media_organization" required/>
      <label htmlFor="journalist">Autor de la nota:</label>
      <input type="text" id="journalist" name="journalist" required/>
      <label htmlFor="date">Fecha:</label>
      <input type="text" id="date" name="date"/>
      <label htmlFor="article_url">Link al articulo:</label>
      <input type="text" id="article_url" name="article_url"/>
      <label htmlFor="image_url">Link a imagen:</label>
      <input type="text" id="image_url" name="image_url"/>
      <label htmlFor="show">Espectaculo:</label>
      <input type="text" id="show" name="show"/>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
