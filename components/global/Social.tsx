import { SocialItems } from "@/types";
import Link from "next/link";

interface SocialProps {
    socialItems: SocialItems
}

export function Social({socialItems}: SocialProps){
    console.log('bith', socialItems)
    return (
        <div>
            {socialItems.map((item) => {
                <div>{item.name}</div>
                <div>{item.url}</div>
            })}
        </div>
    )
}