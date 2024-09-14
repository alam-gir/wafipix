import Separator from "@/components/global/separator";
import WidthWrapper from "@/components/global/width-wrapper";
import ContactUsCard from "@/components/pages/contact/contact-us-card";
import AllServices from "@/components/pages/services/all-services";
import { FC } from "react";

interface ServicesProps {}

const Services: FC<ServicesProps> = ({}) => {
  return (
    <>
      <WidthWrapper>
        <div>
          {/* HEADER */}
          <div className="h-fit w-full flex flex-col gap-4 lg:flex-row lg:justify-between items-center mb-8 lg:mb-12">
            <h1 className="text-primary text-head lg:text-headLg font-bold capitalize">
              services
            </h1>
          </div>
          
          <AllServices />

        </div>
      </WidthWrapper>
      <Separator />
      <ContactUsCard />
      <Separator />
    </>
  );
};

export default Services;
