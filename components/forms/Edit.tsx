'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { WrittenPressArticle } from '@/app/(personal)/press/page'
import { editPressArticle } from '@/app/actions'

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
        <h2>EDIT ME</h2>
      <input type="hidden" name="id" value={item.id} />

      <label htmlFor="veredict">Veredict:</label>
      <input type="text" id="veredict" name="veredict" defaultValue={item.veredict}/>
      <EditButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
