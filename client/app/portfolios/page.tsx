import PageHeader from "@/components/global/page-header";
import Separator from "@/components/global/separator";
import PortfolioContainer from "@/components/pages/portfolio/portfolio-container";
import { FC } from "react";

interface PortfolioProps {}

const Portfolio: FC<PortfolioProps> = ({}) => {
  return (
    <div className="h-full w-full">
      <PageHeader header={"our portfolio"} subHeader={"We provide qualitiful graphics that your company need to grow up."} />
      <PortfolioContainer />
      <Separator />
    </div>
  );
};

export default Portfolio;
