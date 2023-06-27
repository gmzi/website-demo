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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const DATA_API_KEY = process.env.NEXT_PUBLIC_DATA_API_KEY

// ADD STRING PROP: DOCUMENT, AND PASS THAT IN API CALL SO THE ROUTE KNOWS WHERE TO SAVE A DOCUMENT
const InputEditor = ({contentText, document, entry, section}) => {

  const [cleanTextContent, setCleanTextContent] = useState(contentText)

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        history: false,
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, 
        },
      }),
    ],
    content: cleanTextContent,
    onTransaction: () => {
      const text = editor?.getText()
      const cleanText = sanitizeHtml(text)
      setCleanTextContent(cleanText)
    },
  })

  const handleSave = async() => {

    const content = {
      document: document,
      entry: entry,
      content: cleanTextContent
    }

    // a saving status would go here

    const saved = await fetch(`${BASE_URL}/server/text/input`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': DATA_API_KEY
      }, 
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(content)
    })

    if (!saved.ok){
      console.log('failed saving new text:')
      console.log(saved)
      return;
    }

    // revalidation goes here:
    const editorRevalidation = await revalidateEditorPage(BASE_URL);
    const personalRevalidation = await revalidatePersonalPage(section, BASE_URL);

    console.log('Input editor revalidated editor:', editorRevalidation)
    console.log('Input editor revalidated personal:', personalRevalidation)

    // a 'success' status would go here

    return;
  }

  return (
    <div>
      <div className="editor">
        {/* {editor && <MenuBar editor={editor} />} */}
        <EditorContent className="editor__content" editor={editor} />
      </div>
      <div style={{padding: '3rem'}}>
          <button onClick={handleSave}>save to server</button>
      </div>
    </div>
  )
}

export default InputEditor;