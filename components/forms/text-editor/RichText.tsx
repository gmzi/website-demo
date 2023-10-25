'use client'
import sanitizeHtml from 'sanitize-html'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './MenuBar'

interface RichTextProps {
    contentHtml: string;
  }

export function RichText({contentHtml}: RichTextProps) {

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    //   @ts-ignore
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
    content: sanitizeHtml(contentHtml),
    onTransaction: () => {
      const html = editor?.getHTML();
    },
  });

  return (
    <div className="rich-text-editor">
        <input type="hidden" name="editor_content" value={sanitizeHtml(editor?.getHTML()|| '')} />
        {editor && <MenuBar editor={editor} />}
        {editor && <EditorContent editor={editor} className="editor__content"/>}
    </div>
  )
      
}

export function RichTextWithIdentificator({contentHtml, identificator}: {contentHtml: string, identificator: number}) {

  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
    //   @ts-ignore
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
    content: sanitizeHtml(contentHtml),
    onTransaction: () => {
      const html = editor?.getHTML();
    },
  });

  return (
    <div className="rich-text-editor">
        <input type="hidden" name={`editor_content_${identificator}`} value={sanitizeHtml(editor?.getHTML()|| '')} />
        {editor && <MenuBar editor={editor} />}
        {editor && <EditorContent editor={editor} className="editor__content"/>}
    </div>
  )
      
}
