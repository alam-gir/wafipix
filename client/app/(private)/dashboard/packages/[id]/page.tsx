import { FC } from "react";
import PageHeader from "../../../_components/page-header";
import SectionSeparator from "@/components/global/section-separator";
import PackageFormContainer from "@/app/(private)/_components/package/package-form-container";

interface PackageViewProps {
  params: { id: string };
}

const PackageView: FC<PackageViewProps> = ({ params }) => {
  const { id } = params;
  return (
    <div>
      <PageHeader title="Package" description="Modify your package" />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <PackageFormContainer id={id} />
    </div>
  );
};

export default PackageView;
