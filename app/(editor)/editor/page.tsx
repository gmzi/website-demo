// example path:
// /website-taxonomy/app/(editor)/editor/[postId]/page.tsx

import TextEditor from '../../../components/forms/text-editor/TextEditor'

  
export default async function EditorPage() {
  return (
    <div>
      <TextEditor/>
      {/* <button onClick={handleSave}>save to server</button> */}
    </div>
  )
}
  