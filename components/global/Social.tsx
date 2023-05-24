import { SocialData } from "@/types";
import { getMetadata } from "@/lib/getMetadata";
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
  } from '../shared/icons';

const Social = async function Social(){
        const remote = await getMetadata() || {
        author_name: '', 
        description: '',
        social: []
      }
    
      const {author_name, title, description, social} = remote
    
      const localData = {author_name, title, description, social}

      const socialData:SocialData[] = localData.social!

    return (
        <ul className={'socialContainer'}>
            <h4>Find me on:</h4>
            {socialData.map((item, index) => (
                <li key={index}>
                    <a href={item.url} rel="noopener noreferrer" target="_blank">{
                        item.name === "instagram" ? <InstagramIcon/>:
                        item.name === "facebook" ? <FacebookIcon/> :
                        item.name === "twitter" ? <TwitterIcon/> :
                        item.name === "youtube" ? <YoutubeIcon/> :
                        null
                    }</a>
                </li>
            ))}
        </ul>
    )
}

export default Social as unknown as () => JSX.Element;

// NOTE: the weird syntax and export being used in this component aims to fix a typescript problem with .JSX exports, 
// here's the proposed workaround for the issue:
// https://github.com/vercel/next.js/issues/42292#issuecomment-1494848699