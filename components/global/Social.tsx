import { SocialData } from "@/types";
import Link from "next/link";
import { ReactNode } from "react";

type SocialProps = {
    data: SocialData[]
}

export function Social({data}: SocialProps){
    return (
        <ul>
            {data.map((item, index) => (
                <li key={index}>
                    <a href={item.url}>{item.name}</a>
                </li>
            ))}
        </ul>
    )
}