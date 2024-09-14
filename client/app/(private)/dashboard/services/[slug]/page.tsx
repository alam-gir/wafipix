import { FC } from "react";
import PageHeader from "../../../_components/page-header";
import SectionSeparator from "@/components/global/section-separator";
import ServiceFormContainer from "@/app/(private)/_components/service/service-form-container";

interface ServiceViewProps {
  params: { slug: string };
}

const ServiceView: FC<ServiceViewProps> = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      <PageHeader title="Service" description="Modify your service" />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <ServiceFormContainer slug={slug} />
    </div>
  );
};

export default ServiceView;
