'use client'

// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import type { WrittenPressArticle } from '@/types'
import { deleteItem } from '@/app/actions'
import { useState } from 'react'

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
    <button type="submit" className="btnDelete" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function Delete({ document, entry, section, id }: DeletionFormProps) {
  const [state, formAction] = useFormState(deleteItem, initialState)
  const [warning, setWarning] = useState(false)

  const handleDeleteConfirm = () => {
    setWarning(true)
  }

  const handleCancel = () => {
    setWarning(false)
  }

  // return (
  //   <form action={formAction}>
  //     <input type="hidden" name="id" value={id} />
  //     <input type="hidden" name="document" value={document} />
  //     <input type="hidden" name="entry" value={entry} />
  //     <DeleteButton />
  //     <p aria-live="polite" className="sr-only" role="status">
  //       {state?.message}
  //     </p>
  //   </form>
  // )

  return (
      <div>
        {warning ? (
          <div className="warning-container">
            <p>Seguro que queres eliminar? Esta acción no puede deshacerse.</p>
            <form action={formAction}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="document" value={document} />
              <input type="hidden" name="entry" value={entry} />
              <DeleteButton />
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="document" value={document} />
            <input type="hidden" name="entry" value={entry} />
            {/* <DeleteButton /> */}
            <button type="button" onClick={handleDeleteConfirm}>DELETE</button>
            <p aria-live="polite" className="sr-only" role="status">
              {state?.message}
            </p>
          </form>
        )}
      </div>
  )
}
