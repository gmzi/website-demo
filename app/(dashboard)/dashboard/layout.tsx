interface EditorProps {
    children?: React.ReactNode
  }
  
  export default function DashboardLayout({ children }: EditorProps) {
    return (
      <div className="container mx-auto grid items-start gap-10 py-8">
        {children}
      </div>
    )
  }
  