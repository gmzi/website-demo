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
const InputEditorString = ({contentString, document, entry, section}) => {

  const [cleanStringContent, setCleanStringContent] = useState(contentString)

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
    content: cleanStringContent,
    onTransaction: () => {
      const text = editor?.getText();
      const cleanString = sanitizeHtml(text)
      setCleanStringContent(cleanString)
    },
  })

  const handleSave = async() => {

    const contentString = cleanStringContent.trim();

    const namesAndRolesArray = contentString.split(",");

    const arraySaved = namesAndRolesArray.forEach(async element => {
      const nameAndRole = element.split(':')
      const name = nameAndRole[0].trim() || 'default';
      const role = nameAndRole[1]?.trim() || 'default';
      const content = {
        document: document, 
        entry: entry,
        content: {name: name, role: role}
      }

      const saved = await fetch(`${BASE_URL}/server/text/array`, {
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
        return false;
      }
      console.log('saved:', name)
    })

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
      <div className="input-editorContainer" style={{border: '1px solid red'}}>
        {/* {editor && <MenuBar editor={editor} />} */}
        <EditorContent className="input__editor__content" editor={editor} />
        <button onClick={handleSave}>save to server</button>
      </div>
    </div>
  )
}

export default InputEditorString;