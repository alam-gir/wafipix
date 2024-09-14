import Button2 from "@/components/global/buttons/button2";
import WidthWrapper from "@/components/global/width-wrapper";
import { TEXTS } from "@/data";
import { MoveRight } from "lucide-react";
import { FC } from "react";
import TopCustomers from "./top-customers";

interface PackagesBlockProps {}

const PackagesBlock: FC<PackagesBlockProps> = () => {
  return (
    <WidthWrapper>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-28">
        {/* texts */}
        <div className="flex flex-col gap-6">
          <h1 className="text-head lg:text-headLg text-primary font-bold leading-tight text-center lg:text-left">
            {TEXTS.home.packagesBlock.heading}
          </h1>
          <p className="text-subHead lg:text-subHeadLg text-primary/60 text-bold text-center lg:text-left">
            {TEXTS.home.packagesBlock.subHeading}
          </p>
        </div>

        {/* company slider */}
        <TopCustomers />
        
        {/* Packages button */}
        <div className="flex items-center justify-center lg:justify-start">
          <Button2
            title={TEXTS.global.buttons.ourPackages}
            size={"lg"}
            icon={<MoveRight />}
            iconPosition="right"
            variant={"outline"}
            href="/packages"
          />
        </div>
      </div>
    </WidthWrapper>
  );
};

export default PackagesBlock;
