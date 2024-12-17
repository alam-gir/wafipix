import ImageCard from "@/components/global/image-card";
import WidthWrapper from "@/components/global/width-wrapper";
import { FC } from "react";
import messageSendImage from "@/public/images/message-send.png";
import Button2 from "@/components/global/buttons/button2";
import { TEXTS } from "@/data";
import { ArrowRight } from "lucide-react";

interface ContactUsCardProps {}

const ContactUsCard: FC<ContactUsCardProps> = ({}) => {
  return (
    <WidthWrapper>
      <div className="h-fit w-full flex flex-col lg:flex-row lg:justify-between overflow-hidden from-accent3 to-accent4/70 bg-gradient-to-br lg:bg-gradient-to-br rounded-lg] space-y-8 lg:space-y-0 rounded-2xl">
        <div className="space-y-4 p-4 pt-8 lg:px-12 lg:py-16 h-full w-full">
          <div className="text-center lg:text-left">
            <h3 className="uppercase text-subHead lg:text-subHeadLg text-muted font-semibold">
              let's work together
            </h3>
            <h1 className="capitalize font-bold text-head lg:text-headLg text-primary-foreground">
              Contact Us
            </h1>
            <p className="mt-4 capitalize text-subHead lg:text-subHeadLg tracking-wide text-primary-foreground/80 flex justify-center lg:flex-col">
              <span>know what you want? Great.</span>
              <span>Got questions? Even better.</span>
            </p>
          </div>
          <div className="flex h-auto w-full">
            <Button2
              href="/contact"
              title={TEXTS.global.buttons.bookAcall}
              icon={<ArrowRight />}
              iconPosition="right"
              size={"lg"}
              className="w-full lg:w-96 drop-shadow-lg "
            />
          </div>
        </div>
        <div className="w-full h-full">
          <ImageCard
            src={messageSendImage}
            height={280}
            width={280}
            classNameValue="object-contain h-full w-full"
          />
        </div>
      </div>
    </WidthWrapper>
  );
};

export default ContactUsCard;
