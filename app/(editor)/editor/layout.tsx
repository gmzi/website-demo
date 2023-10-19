import { SignIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs';

interface EditorProps {
  children?: React.ReactNode
}

export default async function EditorLayout({ children }: EditorProps) {
  const { orgRole } = auth();

  return (
    <div>
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

