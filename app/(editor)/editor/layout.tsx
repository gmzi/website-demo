import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {
  const { orgRole } = auth();
  // const orgRole  = false;

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

