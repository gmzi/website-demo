import { ClerkProvider } from '@clerk/nextjs';

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {

  return (
    <ClerkProvider allowedRedirectOrigins={['http://localhost:3000/editor', 'https://website-fer.vercel.app/editor']}>
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    </ClerkProvider>
  )
}

