

import Button2 from "@/components/global/buttons/button2";
import { FC } from "react";
import Breadcrumb from "./breadcrumb";

interface PageHeaderProps {
  title: string;
  description: string;
  buttonTitle?: string;
  buttonHref?: string;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  buttonTitle,
  buttonHref
}) => {
  return (
    <div className="space-y-4">
      <div className=" w-full h-fit flex flex-col gap-4 md:flex-row md:justify-between md:items-end">
        <div className="flex items-start justify-start flex-col">
          <h1 className="text-2xl font-medium text-primary leading-tight">
            {title}
          </h1>
          <p className="text-lg text-primary/80 tracking-wide">{description}</p>
        </div>
        <div>
          {buttonTitle ? <Button2 href={buttonHref} size={"lg"} title={buttonTitle} /> : null}
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
};

export default PageHeader;
