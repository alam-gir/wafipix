import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import ContactUsCard from "@/components/pages/contact/contact-us-card";
import PackageContainer from "@/components/pages/packages/package-container";
import { FC } from "react";

interface ourPackagesProps {}

const ourPackages: FC<ourPackagesProps> = ({}) => {
  return (
    <div>
      <PageHeader
        header="our packages"
        subHeader="We provide best quality design with cost saving service, what your company actually need to grow up."
      />
      <PackageContainer />
      
      <Separator />

      <ContactUsCard />

      <Separator />
    </div>
  );
};

export default ourPackages;
