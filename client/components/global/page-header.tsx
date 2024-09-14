import { FC } from "react";
import WidthWrapper from "./width-wrapper";

interface PageHeaderProps {
  header: string;
  subHeader?: string;
}

const PageHeader: FC<PageHeaderProps> = ({ header, subHeader }) => {
  return (
    <WidthWrapper>
      <div className="flex flex-col justify-center items-center gap-2 py-8 lg:py-24">
        <h1 className="text-primary text-3xl md:text-4xl lg:text-6xl font-bold capitalize tracking-wide w-full md:text-center">
          {header}
        </h1>
        {subHeader ? <p className="text-primary/80 text-subHead lg:text-subHeadLg tracking-wide md:text-center w-full">
          {subHeader}
        </p> : null}
      </div>
    </WidthWrapper>
  );
};

export default PageHeader;
