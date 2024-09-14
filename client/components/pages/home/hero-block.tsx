import { FC } from "react";
import HeroTexts from "./hero-text";
import HeroSocialButtons from "./hero-social-buttons";
import WidthWrapper from "@/components/global/width-wrapper";
import HeroActionButtons from "./hero-action-buttons";

interface HeroBlockProps {}

const HeroBlock : FC<HeroBlockProps> = ({}) => {
    return <WidthWrapper>
        <section className="flex flex-col gap-4 lg:flex-row lg:justify-between">
            <div className="space-y-4 md:space-y-8 mb-8">

            <HeroTexts/>
            <HeroActionButtons />
            </div>
            <HeroSocialButtons/>
        </section>
    </WidthWrapper>
}

export default HeroBlock