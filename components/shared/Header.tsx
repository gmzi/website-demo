

interface HeaderProps {
  centered?: boolean
  description?: string
  title?: string
}
export function Header(props: HeaderProps) {
  const { title, description, centered = false } = props
  if (!description && !title) {
    return null
  }
  return (
    <div>
      {/* Title */}
      {title && (
        <div>
          {title}
        </div>
      )}
      {/* Description */}
      {description && (
        <div>
          {description} 
        </div>
      )}
    </div>
  )
}
