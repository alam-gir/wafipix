import { FC } from "react";
import PageHeader from "../../../_components/page-header";
import SectionSeparator from "@/components/global/section-separator";
import PortfolioFormContainer from "@/app/(private)/_components/portfolio/portfolio-form-container";

interface PortfolioViewProps {
  params: { slug: string };
}

const PortfolioView: FC<PortfolioViewProps> = ({ params }) => {
  const { slug } = params;
  return (
    <div>
      <PageHeader title="Portfolio" description="Modify your portfolio" />
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <PortfolioFormContainer slug={slug} />
    </div>
  );
};

export default PortfolioView;
