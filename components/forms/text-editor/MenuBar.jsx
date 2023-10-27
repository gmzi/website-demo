import './MenuBar.scss'
import React, { Fragment } from 'react'
import MenuItem from './MenuItem'
import {icons} from './icons'
import { EditorContent, useEditor } from '@tiptap/react'

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="editor-menu-bar">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
        }
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        {icons.bold2}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleItalic().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        {icons.italic2}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleStrike().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        {icons.strikethrough2}
      </button>
      {/* <button onClick={() => editor.chain().focus().clearNodes().run()}>
        clear nodes
      </button> */}
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleBlockquote().run()}}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        {icons.blockquote}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().setParagraph().run()}}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
      >
        {icons.paragraph}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 1 }).run()}}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        {icons.h1}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 2 }).run()}}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        {icons.h2}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 3 }).run()}}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        {icons.h3}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 4 }).run()}}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        {icons.h4}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 5 }).run()}}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        {icons.h5}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleHeading({ level: 6 }).run()}}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        {icons.h6}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleBulletList().run()}}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        {icons.listUnordered}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleOrderedList().run()}}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        {icons.listOrdered}
      </button>
      <button onClick={(e) => {
        e.preventDefault(); 
        editor.chain().focus().unsetAllMarks().run()}}>
        {icons.formatClear}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleCode().run()}}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        {icons.codeView}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault(); 
          editor.chain().focus().toggleCodeBlock().run()}}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        {icons.codeBoxLine}
      </button>
      <button onClick={(e) => {
        e.preventDefault(); 
        editor.chain().focus().setHorizontalRule().run()}}>
        {icons.separator}
      </button>
      <button onClick={(e) => {
        e.preventDefault(); 
        editor.chain().focus().setHardBreak().run()}}>
        {icons.paragraph}
      </button>
      {/* <button
        onClick={() => editor.chain().focus().setColor('#958DF1').run()}
        className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
      >
        {icons.highlight}
      </button> */}
    </div>
  )
}

export default MenuBar;