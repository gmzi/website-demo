import { LogoItems } from "@/types"
import { getMetadata } from "@/lib/getMetadata"

interface LogoProps {
    logoItems?: LogoItems
}

export async function Logo() {

  const remote = await getMetadata() || {
    author_name: '', 
    title: '',
    description: '',
    social: []
  }

  const {author_name, title, description, social} = remote;

    return (
        <div className={'logoContainer'}>
          <span className={'logoTitle'}>
            {/* <span>{author_name}</span> */}
            <span>Hardcoded author</span>
          </span>
          {/* <span className={'descriptionLine'}>
            <span>{logoItems?.description}</span>
          </span> */}
      </div>
    )
  }
  