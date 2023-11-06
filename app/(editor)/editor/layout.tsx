import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';
import { EditorNavbar } from "@/components/global/Navbar";
import { ClerkProvider } from '@clerk/nextjs';
import e from '@/app/(editor)/editor/editor.module.css'
import { Footer } from "@/components/global/Footer";

const BASE_URL = process.env.BASE_URL;

const isProd = process.env.NODE_ENV === 'production';

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {
  
  // const { orgRole } = auth();
  const orgRole = 'admin'
    
  if (orgRole !== 'admin') {
    return (
      <ClerkProvider allowedRedirectOrigins={[`${BASE_URL}/editor`]}>
        <div>
          <UserButton afterSignOutUrl="/editor" />
          <SignOutButton />
          <p>you are an unauthorized user to edit this page, please sign out from your
            current account and sign in as an authorized user</p>
        </div>
      </ClerkProvider>
    )
  }

  return (
    <ClerkProvider allowedRedirectOrigins={[`${BASE_URL}/editor`]}>
      <header>
        {orgRole && <EditorNavbar orgRole={orgRole}/>}
      </header>
      <main className={e.editorMain}>
        {children}
      </main>
      <Footer/>
    </ClerkProvider>
  )
}

