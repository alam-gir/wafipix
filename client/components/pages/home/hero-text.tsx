'use client'

import SectionLoader from "@/components/global/section-loader";
import { TEXTS } from "@/data";
import { useApiGet } from "@/lib/reactQuery";
import { getHeroFeatures, getHeroFeaturesQueryKey } from "@/lib/URL-services/hero-features";
import { Check } from "lucide-react";
import { FC } from "react";

interface HeroTextsProps {}

const HeroTexts : FC<HeroTextsProps> = ({}) => {
    
    const {data, isLoading} = 
    useApiGet<string[]>({
        queryKey : getHeroFeaturesQueryKey,
        queryFn: getHeroFeatures
    })

    const FEATURES = data?.map(feature => {
        return <li key={feature} className="flex gap-4 text-subHead lg:text-subHeadLg text-primary items-center">
            <span className="h-4 w-4 flex items-center justify-center p-0.5 ring-2 ring-accent3/40 bg-accent3 rounded-full ">
                <Check className="text-secondary" />
            </span>
            <span>{feature}</span>
        </li>
    })

    return <div>

        {/* TAGLINE */}
        <div className="flex gap-1 items-center mt-12 lg:mt-16">
            <div className="h-0.5 w-4 md:w-20 bg-accent3"/>
            <p className="uppercase font-bold text-subHead lg:text-subHeadLg text-primary font">{TEXTS.home.tagline}</p>
        </div>

        {/* HEADING */}
        <div className="flex flex-col gap-4 lg:gap-6 items-start text-bigHead lg:text-bigHeadLg text-primary font-bold tracking-tight leading-tight mt-4 lg:mt-8">
            <h1>{TEXTS.home.heading}</h1>
            <h1 className="bg-accent3 bg-clip-text text-transparent ">{TEXTS.home.headingEnd}</h1>
        </div>

        {/* FEATURES LIST */}
        <div className="h-auto w-full mt-4 lg:mt-8">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoading ? <SectionLoader iconClassName="opacity-30" /> : data ? FEATURES : null}
            </ul>
        </div>
        
    </div>
}

export default HeroTexts;