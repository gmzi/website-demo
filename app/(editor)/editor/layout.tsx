import { ClerkProvider } from '@clerk/nextjs';

const BASE_URL = process.env.BASE_URL;

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {

  return (
    <ClerkProvider allowedRedirectOrigins={[`${BASE_URL}/editor`]}>
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    </ClerkProvider>
  )
}

