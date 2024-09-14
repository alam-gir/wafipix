import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import ContactForm from "@/components/pages/contact/contact-form";
import { FC } from "react";

interface ContactProps {}

const Contact: FC<ContactProps> = ({}) => {
  return (
    <div className="p-4 lg:px-24">
      <PageHeader
        header="Tell us"
        subHeader="Get in touch with us. Tell us what kind of design do you need"
      />
      <div className="flex items-center justify-center">
        <ContactForm />
      </div>
      <Separator />
    </div>
  );
};

export default Contact;
