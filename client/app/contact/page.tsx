import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import ContactForm from "@/components/pages/contact/contact-form";
import ScheduleApointMentButton from "@/components/pages/contact/schedule-appointment-button";
import { FC } from "react";

interface ContactProps {}

const Contact: FC<ContactProps> = ({}) => {
  return (
    <div className="p-4 lg:px-24">
      <div className="flex items-center justify-center pt-4 lg:pt-16">
        <ScheduleApointMentButton />
      </div>
      <PageHeader
        header=" Or send a message"
        subHeader="Get in touch with us. Tell us what kind of design do you need"
      />
      <div className="flex items-center justify-center lg:-mt-12">
        <ContactForm />
      </div>
      <Separator />
    </div>
  );
};

export default Contact;
