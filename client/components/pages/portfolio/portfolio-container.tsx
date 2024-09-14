import { FC } from "react";
import ServiceNameBox from "./service-name-box";
import WidthWrapper from "@/components/global/width-wrapper";
import ContactUsCard from "../contact/contact-us-card";
import Separator from "@/components/global/separator";
import PortfolioGalleryInPortfolioPage from "./portfolio-gallery-in-portfolio-page";

interface PortfolioContainerProps {}

const PortfolioContainer: FC<PortfolioContainerProps> = ({}) => {
  return (
    <>
      <WidthWrapper>
        <div className=" space-y-4 lg:space-y-12">
          <ServiceNameBox />
          <PortfolioGalleryInPortfolioPage />
        </div>
      </WidthWrapper>
      <Separator />
      <ContactUsCard />
    </>
  );
};

export default PortfolioContainer;
