import Button2 from "@/components/global/buttons/button2";
import { TEXTS } from "@/data";
import { MoveRight } from "lucide-react";
import { FC } from "react";

interface HeroActionButtonsProps {}

const HeroActionButtons : FC<HeroActionButtonsProps> = ({}) => {
    return <div className="flex flex-col gap-4 md:flex-row">
        <Button2 href="/contact" title={TEXTS.global.buttons.bookAcall} size={"lg"} variant={"default"} ring={true} iconPosition="right" icon={<MoveRight />} />
        <Button2 href="/portfolios" title={TEXTS.global.buttons.ourWorks} size={"lg"} variant={"outline"} ring={false} iconPosition="right" icon={<MoveRight />}/>
    </div>
}

export default HeroActionButtons