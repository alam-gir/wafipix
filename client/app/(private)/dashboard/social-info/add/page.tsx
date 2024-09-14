import PageHeader from "@/app/(private)/_components/page-header";
import SocialInfoAddForm from "@/app/(private)/_components/social-media/social-info-add-form";
import SectionSeparator from "@/components/global/section-separator";
import { FC } from "react";

interface AddSocialMediaProps {}

const AddSocialMedia: FC<AddSocialMediaProps> = ({}) => {
  return (
    <div>
      <PageHeader
        title="Add Social Media"
        description="Fill the form with all the required data."
      />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <SocialInfoAddForm />
    </div>
  );
};

export default AddSocialMedia;
