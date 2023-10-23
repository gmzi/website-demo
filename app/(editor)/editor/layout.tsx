import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';
import { enableAuthIfProd } from '@/lib/EnableAuthIfProd';



interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {
  const { orgRole } = auth();

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

