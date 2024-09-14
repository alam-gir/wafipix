import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import WidthWrapper from "@/components/global/width-wrapper";
import ContactUsCard from "@/components/pages/contact/contact-us-card";
import PackagesInSlugServicePage from "@/components/pages/services/packages-in-slug-service-page";
import PortfolioGalleryInSlugServicePage from "@/components/pages/services/portfolio-gallery-in-slug-service-page";
import { getStringFromSlug } from "@/lib/utils";
import { FC } from "react";

interface ServiceProps {
  params: {
    slug: string;
  };
}

const Service: FC<ServiceProps> = ({ params }) => {
  const { slug } = params;

  return (
    <WidthWrapper>
        
        <PortfolioGalleryInSlugServicePage slug={slug} />
        
        <Separator />

        <PageHeader header={"Packages for " + getStringFromSlug(slug)} subHeader="Want to grow your business, lets build your neccessary graphics" />
        
        <PackagesInSlugServicePage slug={slug} />
        
        <Separator />

        <ContactUsCard />
        <Separator />
    </WidthWrapper>
  );
};

export default Service;
