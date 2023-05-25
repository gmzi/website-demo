'use client'
// https://github.com/ueberdosis/tiptap/blob/main/demos/src/Examples/CollaborativeEditing/React/index.jsx
import './styles.scss'
import sanitizeHtml from 'sanitize-html'
import { useState } from 'react'
// import CharacterCount from '@tiptap/extension-character-count'
// import Highlight from '@tiptap/extension-highlight'
// import TaskItem from '@tiptap/extension-task-item'
// import TaskList from '@tiptap/extension-task-list'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'


const TextEditor = () => {
  const [cleanHtmlContent, setCleanHtmlContent] = useState('');
  const [copied, setCopied] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      // Highlight,
      // TaskList,
      // TaskItem,
    ],
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
    const document = {
      image_url: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Natalia_Lafourcade_2018_Gran_Rex_37_%28Cropped%29.jpg",
      html_content: cleanHtmlContent
    }
    // const saved = await saveToDB(document)
    // if (!saved){
    //   console.log('ups')
    // }
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