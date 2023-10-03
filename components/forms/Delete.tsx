'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { WrittenPressArticle } from '@/types'
import { deleteItem } from '@/app/actions'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface DeletionFormProps {
    document: string;
    entry: string;
    section: string;
    id: string;
}

const initialState = {
  message: null,
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function Delete({document, entry, section, id}: DeletionFormProps) {
  const [state, formAction] = useFormState(deleteItem, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="document" value={document} />
      <input type="hidden" name="entry" value={entry} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
