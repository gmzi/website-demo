'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { uploadImageToCloudinary } from '@/app/actions';

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

export function Image() {
  const [state, formAction] = useFormState(uploadImageToCloudinary, initialState)

  // until we figure out how to reset form input after successfull data savign, bare with this:
  if (state?.message === 'article added'){
    console.log('hello from Image');
  }

  return (
    <form action={formAction} id="myForm">
      <h2>Agregar imagen</h2>
      <label htmlFor="image">Image:</label>
      <input type="file" id="image" name="image" accept='image/*'/>
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
