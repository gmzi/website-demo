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
const TextEditor = ({contentHtml, document, section}) => {

  const [cleanHtmlContent, setCleanHtmlContent] = useState(contentHtml);
  const [copied, setCopied] = useState(false)

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
      setCopied(false)
    },
  })

  const handleCopyToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(cleanHtmlContent)
    setCopied(true)
  }

  const handleSave = async() => {

    const content = {
      content_html: cleanHtmlContent,
      document: document,
    }

    // a saving status would go here

    const saved = await fetch(`${BASE_URL}/server/text`, {
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

    console.log('Text editor revalidated editor:', editorRevalidation)
    console.log('Text editor revalidated personal:', personalRevalidation)

    // a 'success' status would go here

    return;
  }

  return (
    <div>
      <div className="editor">
        {editor && <MenuBar editor={editor} />}
        <EditorContent className="editor__content" editor={editor} />
      </div>
      <div style={{padding: '3rem'}}>
          <h3>HTML Content:</h3>
          <pre>{cleanHtmlContent}</pre>
          <div>
            {copied && (<button>copied!</button> )}
            {!copied && <button onClick={handleCopyToClipboard}>Copy html to clipboard</button>}
          </div>
          <div>
            <button onClick={handleSave}>save to server</button>
          </div>
      </div>
    </div>
  )
}

export default TextEditor;