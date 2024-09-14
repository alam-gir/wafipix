"use client";
import { FC } from "react";
import { useApiGet } from "@/lib/reactQuery";
import SectionLoader from "@/components/global/section-loader";
import NoContentField from "@/components/global/no-content";
import PortfolioTextUpdateForm from "./portfolio-text-update-form";
import {
  getPortfolioBySlug,
  getPortfoliosKey,
  TPortfolio,
} from "@/lib/URL-services/portfolios";
import PortfolioImageUpdateForm from "./portfolio-imgae-update-form";
import PortfolioDeleteButton from "./portfolio-delete-button";

interface PortfolioFormContainerProps {
  slug: string;
}

const PortfolioFormContainer: FC<PortfolioFormContainerProps> = ({ slug }) => {
  const { isLoading, data } = useApiGet<TPortfolio>({
    queryKey: getPortfoliosKey.bySlug(slug),
    queryFn: () => getPortfolioBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) return <SectionLoader className="min-h-96" />;
  if (!data) return NoContentField("No portfolio found for - " + slug);
  return (
    <div className="flex flex-col gap-16">
      <PortfolioTextUpdateForm
        portfolioTexts={{
          title: data.title,
          tags: data.tags,
        }}
        id={data?._id}
      />
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-0">
        <PortfolioImageUpdateForm
          image_url={data?.image.secure_url}
          id={data?._id}
        />
      </div>
      {/* <PortfolioActiveStatusUpdateForm
        status={data?.is_active}
        id={data?._id}
      /> */}

      <PortfolioDeleteButton id={data?._id} />
    </div>
  );
};

export default PortfolioFormContainer;
