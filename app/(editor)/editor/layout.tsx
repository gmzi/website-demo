import { ClerkProvider } from '@clerk/nextjs';

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {

  return (
    <ClerkProvider>
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    </ClerkProvider>
  )
}

