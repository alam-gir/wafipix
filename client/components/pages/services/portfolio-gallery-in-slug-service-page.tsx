"use client";

import SectionLoader from "@/components/global/section-loader";
import { useApiGet } from "@/lib/reactQuery";
import {
  getPortfoliosByServiceId,
  getPortfoliosKey,
  TPaginate,
  TPortfolio,
} from "@/lib/URL-services/portfolios";
import {
  getServiceBySlug,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import { FC } from "react";
import PortfolioGallery from "../portfolio/portfolio-gallery";
import PageHeader from "@/components/global/page-header";

interface PortfolioGalleryInSlugServicepageProps {
  slug: string;
}

const PortfolioGalleryInSlugServicepage: FC<
  PortfolioGalleryInSlugServicepageProps
> = ({ slug }) => {
  const { isLoading, data } = useApiGet<TService>({
    queryKey: getServicesKey.bySlug(slug),
    queryFn: () => getServiceBySlug(slug),
  });

  const { isLoading: isLoadingPortfolios, data: portfolios } = useApiGet<{
    portfolios: TPortfolio[];
    paginate: TPaginate;
  }>({
    queryKey: getPortfoliosKey.byServiceId(data?._id!),
    queryFn: () =>
      getPortfoliosByServiceId(data?._id!, { limit: 9, populate: "image" }),
    enabled: !!data,
  });

  if (isLoading || isLoadingPortfolios)
    return <SectionLoader className="min-h-[50vh]" />;

  if (portfolios)
    return (
      <div>
        <PageHeader
          header={data?.title!}
          subHeader="We provide comport service, What your company needs to grow."
        />
        <PortfolioGallery portfolios={portfolios?.portfolios} />
      </div>
    );
};

export default PortfolioGalleryInSlugServicepage;
