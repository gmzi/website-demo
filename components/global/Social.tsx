import { SocialData } from "@/types";
import Link from "next/link";
import { ReactNode } from "react";
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
    
    const icons = {
        "instagram": <InstagramIcon/>,
        "facebook": <FacebookIcon/>,
        "twitter": <TwitterIcon/>
    }

    return (
        <ul>
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
            {/* <InstagramIcon/>
            <FacebookIcon/>
            <TwitterIcon/>
            <YoutubeIcon/> */}
        </ul>
    )
}