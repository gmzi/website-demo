// example path:
// /website-taxonomy/app/(editor)/editor/[postId]/page.tsx

import TextEditor from '../../../components/forms/text-editor/TextEditor'


interface EditorPageProps {
    params: { postId: string }
  }
  
  export default async function EditorPage({ params }: EditorPageProps) {
    
    return (
      <div>
        <TextEditor/>
      </div>
    )
  }
  