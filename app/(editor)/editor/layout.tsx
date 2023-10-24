import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';



interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {
  const { orgRole } = auth();

  if (orgRole !== 'admin') {
    return (
      <div>
        <UserButton afterSignOutUrl="/editor" />
        <SignOutButton />
        <p>you are an unauthorized user to edit this page, please sign out from your 
          current account and sign in as an authorized user</p>
      </div>
    )
  }

  return (
    <div className="editor-wrapper">
      {orgRole ? (
        <>
          <UserButton afterSignOutUrl="/editor" />
          <SignOutButton />
        </>
      ) : null}
      {children}
    </div>
  )
}

