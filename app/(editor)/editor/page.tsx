// example path:
// /website-taxonomy/app/(editor)/editor/[postId]/page.tsx

import TextEditor from '../../../components/forms/text-editor/TextEditor'
import ImageUpload from '../../../components/forms/ImageUpload'

  
export default async function EditorPage() {
  return (
    <div>
      <TextEditor/>
      <ImageUpload/>
    </div>
  )
}
  