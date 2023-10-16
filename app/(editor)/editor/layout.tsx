
interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {

  return (
    <div>
      {children}
    </div>
  )
}

