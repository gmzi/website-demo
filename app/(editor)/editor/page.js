// example path:
// /website-taxonomy/app/(editor)/editor/[postId]/page.tsx

import TextEditor from '../../../components/forms/text-editor/TextEditor'
import ImageUpload from '../../../components/forms/ImageUpload'
import { getData } from '@/lib/getData'

  
export default async function EditorPage() {
  const data = await getData("about")
  const imageUrl = data.image_url
  
  return (
    <div>
      <TextEditor/>
      <ImageUpload imageUrl={imageUrl}/>
    </div>
  )
}
  