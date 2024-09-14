import { FC } from "react";
import PageHeader from "../../_components/page-header";
import SectionSeparator from "@/components/global/section-separator";
import ContactInfoForm from "../../_components/contact-info/contact-info-form";

interface ContactInfosProps {}

const ContactInfos: FC<ContactInfosProps> = ({}) => {
  return (
    <div>
      <PageHeader
        title="Contact infos"
        description="Manage your Contact infos"
      />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <ContactInfoForm />
    </div>
  );
};

export default ContactInfos;
