import { logoItems } from "@/types"

interface LogoProps {
    logoItems?: logoItems 
}

export function Logo({logoItems}: LogoProps) {

    return (
        <div className={'logoContainer'}>
        <span className={'logoTitle'}>
          <span>{logoItems?.title}</span>
        </span>
        <span className={'descriptionLine'}>
        <span>{logoItems?.subtitle}</span>
        </span>
      </div>
    )
  }
  