'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
import { createTour } from '@/app/actions';
// import { ImageInput } from '../ImageInput';
import { ImageInputWithID } from './ImageInput';

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

export function CreateTour() {
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
        <input type="text" id="title_or_place" name="title_or_place" className="show-credits"/>

        <label htmlFor="city">Ciudad:</label>
        <input type="text" id="city" name="city" className="show-credits" />

        <label htmlFor="country">País:</label>
        <input type="text" id="country" name="country" className="show-credits" />

        <label htmlFor="press_url">Link al articulo de prensa:</label>
        <input type="text" id="press_url" name="press_url" className="show-credits"/>
        <ImageInputWithID id={1}/>
        <SubmitButton />
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </div>
    </form>
  )
}
