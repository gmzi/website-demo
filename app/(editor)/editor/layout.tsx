import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';
import { EditorNavbar } from "@/components/global/Navbar";
import { ClerkProvider } from '@clerk/nextjs';

const BASE_URL = process.env.BASE_URL;



interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {

  const { orgRole } = auth();

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
      <main className="editor-wrapper">
        {orgRole ? (
          <>
            <UserButton afterSignOutUrl="/editor" />
            <SignOutButton />
          </>
        ) : null}
        <>
          <EditorNavbar />
          {children}
        </>
      </main>
    </ClerkProvider>
  )
}

