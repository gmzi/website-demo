'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { WrittenPressArticle } from '@/app/(personal)/press/page'
import { deletePressArticle } from '@/app/actions'

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

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function DeleteForm({document, entry, section, item}: DeletionFormProps) {
  const [state, formAction] = useFormState(deletePressArticle, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={item.id} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}
