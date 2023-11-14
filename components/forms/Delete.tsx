'use client'

// @ts-expect-error
import { useFormState, useFormStatus } from 'react-dom'
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
      DELETE
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

  if (state.message) {
    return (
      <div>
        <p>{state.message}</p>
        <button>ok</button>
      </div>
    )
  }

  return (
    <div>
      {warning ? (
        <div className="warning">
          <div className="warning-box">
            <p className="warning-text">Are you sure? Deletion can&apos;t be undone</p>
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
        </div>
      ) : (
        <form>
          <button type="button" onClick={handleDeleteConfirm}>DELETE</button>
        </form>
      )}
    </div>
  )
}
