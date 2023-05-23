import { SocialData } from "@/types";
import {
    FacebookIcon,
    InstagramIcon,
    TwitterIcon,
    YoutubeIcon,
  } from '../shared/icons';

type SocialProps = {
    data: SocialData[]
}


export function Social({data}: SocialProps){

    return (
        <ul className={'socialContainer'}>
            {data.map((item, index) => (
                <li key={index}>
                    <a href={item.url} rel="noopener noreferrer" target="_blank">{
                        item.name === "instagram" ? <InstagramIcon/> :
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