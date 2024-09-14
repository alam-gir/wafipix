'use client'
import { useApiGet } from "@/lib/reactQuery";
import { getSocialInfo, getSocialInfoQueryKey, TSocialInfo } from "@/lib/URL-services/social-info";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface HeroSocialButtonsProps {
    title?: boolean
}

const HeroSocialButtons : FC<HeroSocialButtonsProps> = ({title = false}) => {

    const {data} = useApiGet<TSocialInfo[]>({
        queryKey: getSocialInfoQueryKey,
        queryFn: getSocialInfo
    })

    const SOCIALBTNS = data?.map(social => {
        return <Link href={social.url} key={social.title} className="group flex flex-col lg:flex-row items-center gap-2 text-subHead lg:text-subHeadLg text-primary">
            <span>
                <Image className="filter hue-rotate-60 group-hover:rotate-12 duration-100 ease-out" src={social.icon.url} height={30} width={30} quality={100} alt={social.title} />    
            </span>
            {title ? <span>{social.title}</span> : null}
        </Link>
    })

    return <div className="h-auto w-auto py-8 lg:flex lg:items-center lg:justify-center">
        <ul className="flex gap-12 lg:gap-16 items-start justify-center lg:flex-col flex-wrap lg:max-h-96">
            {SOCIALBTNS}
        </ul>
    </div>
}

export default HeroSocialButtons