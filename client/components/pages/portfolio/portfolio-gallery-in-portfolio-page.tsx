"use client";

import SectionLoader from "@/components/global/section-loader";
import { useApiGet } from "@/lib/reactQuery";
import {
  getPortfolios,
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
import { FC, useEffect, useState } from "react";
import PortfolioGallery from "./portfolio-gallery";
import { useSearchParams } from "next/navigation";
import NoContentField from "@/components/global/no-content";
import Pagination from "@/components/global/pagination";
import Separator from "@/components/global/separator";

interface PortfolioGalleryInPortfolioPageProps {}

const PortfolioGalleryInPortfolioPage: FC<
  PortfolioGalleryInPortfolioPageProps
> = ({}) => {
  // paginated portfolios things
  const searchParams = useSearchParams();
  const updatedPage = searchParams.get("page");

  const [filterKeys, setFilterKeys] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);

  const selectedService = useSearchParams().get("service");

  const { isLoading, data } = useApiGet<TService>({
    queryKey: getServicesKey.bySlug(selectedService!),
    queryFn: () => getServiceBySlug(selectedService!),
    enabled: !!selectedService && selectedService !== "all",
  });

  // portfolios by serviceId

  const { isLoading: isLoadingPortfolios, data: portfoliosByServiceId } =
    useApiGet<{
      portfolios: TPortfolio[];
      paginate: TPaginate;
    }>({
      queryKey: getPortfoliosKey.withFilter(filterKeys),
      queryFn: () =>
        getPortfoliosByServiceId(data?._id!, {
          limit,
          page,
          populate: "image",
        }),
      enabled: !!data,
    });

  // all portfolios

  const { isLoading: isLoadingAllPortfolios, data: allPortfolios } = useApiGet<{
    portfolios: TPortfolio[];
    paginate: TPaginate;
  }>({
    queryKey: getPortfoliosKey.withFilter(filterKeys),
    queryFn: () => getPortfolios({ populate: "image", limit, page }),
    enabled: selectedService == null || selectedService == "all",
  });

  const currentPortfolios =
    selectedService === "all" || !selectedService
      ? allPortfolios?.portfolios
      : portfoliosByServiceId?.portfolios;

  const allPortfoliosTotalPage = allPortfolios?.paginate?.totalPages;

  const portfoliosByServiceIdTotalPage =
    portfoliosByServiceId?.paginate?.totalPages;

  const totalPage =
    selectedService === "all"
      ? allPortfoliosTotalPage
      : portfoliosByServiceIdTotalPage;

  useEffect(() => {
    setFilterKeys([]);

    if (updatedPage) {
      setFilterKeys((prev) => {
        const pageKey = `page=${updatedPage}`;
        if (!prev.includes(pageKey)) prev.push(pageKey);
        return prev;
      });
      setPage(parseInt(updatedPage));
    } else{
      setPage(1);
    }
  }, [updatedPage]);

  if (isLoading || isLoadingPortfolios || isLoadingAllPortfolios)
    return <SectionLoader className="min-h-[50vh]" />;

  if (!currentPortfolios?.length)
    return NoContentField(
      `Currently we do not have any portfolio added for ${data?.title}`
    );

  if (currentPortfolios?.length)
    return (
      <div>
        <PortfolioGallery portfolios={currentPortfolios} />
        <Separator className="max-h-8" />
        <Pagination totalPages={totalPage || 1} currentPage={page} />
      </div>
    );
};

export default PortfolioGalleryInPortfolioPage;
