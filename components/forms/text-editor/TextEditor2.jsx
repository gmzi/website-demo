'use client'
// https://github.com/ueberdosis/tiptap/blob/main/demos/src/Examples/CollaborativeEditing/React/index.jsx
import './styles.scss'
import sanitizeHtml from 'sanitize-html'
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
const TextEditor2 = ({ value }) => {

    //   const [cleanHtmlContent, setCleanHtmlContent] = useState(contentHtml);
    //   const [copied, setCopied] = useState(false)

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
        content: value,
        onTransaction: () => {
            const html = editor?.getHTML();
            const cleanHtml = sanitizeHtml(html)
            console.log(cleanHtml);
        },
    })



    return (
        <div className="editor">
            {editor && <MenuBar editor={editor} />}
            <EditorContent className="editor__content" editor={editor}/>
        </div>
    )
}

export default TextEditor2;