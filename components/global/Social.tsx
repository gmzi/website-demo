import { socialItems } from "@/types";
import Link from "next/link";

interface SocialProps {
    socialItems: socialItems[]
}

export function Social({socialItems}: SocialProps){
    return (
        <div>
            <p>map through social items, return Link with icon and url </p>
        </div>
    )
}