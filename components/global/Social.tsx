import { SocialData } from "@/types";
import { getMetadata } from "@/lib/getMetadata";
import { getData } from "@/lib/getData";
import { getRemoteOrLocalData } from "@/lib/getRemoteOrLocalData";
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
} from '../shared/icons';

const Social = async function Social() {
    //     const data = await getData("metadata") || {
    //     author_name: '', 
    //     description: '',
    //     social: []
    //   }
    const data = await getRemoteOrLocalData("metadata") || {
        author_name: '',
        description: '',
        social: []
    }

    const { author_name, title, description, social } = data

    const localData = { author_name, title, description, social }

    const socialData: SocialData[] = localData.social!

    return (
        <div className="social-media">
            {socialData.map((item, index) => (
                <a key={`social-link-${index}`} href={item.url} rel="noopener noreferrer" target="_blank" className="social-link">{
                    item.name === "instagram" ? <InstagramIcon /> :
                        item.name === "facebook" ? <FacebookIcon /> :
                            item.name === "twitter" ? <TwitterIcon /> :
                                item.name === "youtube" ? <YoutubeIcon /> :
                                    null
                }</a>
            ))}
        </div>
    )
}

export default Social as unknown as () => JSX.Element;

// NOTE: the weird syntax and export being used in this component aims to fix a typescript problem with .JSX exports, 
// here's the proposed workaround for the issue:
// https://github.com/vercel/next.js/issues/42292#issuecomment-1494848699