'use client'
// https://github.com/ueberdosis/tiptap/blob/main/demos/src/Examples/CollaborativeEditing/React/index.jsx
import './styles.scss'
import sanitizeHtml from 'sanitize-html'
import { useState } from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'
import { revalidateEditorPage } from '@/lib/revalidateEditorPage'
import { revalidatePersonalPage } from '@/lib/revalidatePersonalPage'
import { saveHtmlContent } from '@/app/actions'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY

// ADD STRING PROP: DOCUMENT, AND PASS THAT IN API CALL SO THE ROUTE KNOWS WHERE TO SAVE A DOCUMENT
const TextEditor = ({ contentHtml, document, section }) => {

  const [cleanHtmlContent, setCleanHtmlContent] = useState(contentHtml);
  const [contentSaved, setContentSaved] = useState({message: null});

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        history: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
      // Highlight,
      // TaskList,
      // TaskItem,
    ],
    content: cleanHtmlContent,
    onTransaction: () => {
      const html = editor?.getHTML();
      const cleanHtml = sanitizeHtml(html)
      setCleanHtmlContent(cleanHtml);
    },
  })


  const handleSave = async () => {

    const isSaved = await saveHtmlContent(cleanHtmlContent, document)

    setContentSaved(isSaved);

    return;
  }

  return (
    <div id="editor_div" className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent id="editor_content" className="editor__content" editor={editor} />
      <button onClick={handleSave}>save changes </button>
      <p
        aria-live="polite"
        className={`sr-only ${contentSaved?.message ? 'visible' : ''}`}
        role="status"
      >
        {contentSaved?.message}
      </p>
    </div>
  )
}

export default TextEditor;