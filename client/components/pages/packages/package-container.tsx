"use client";

import { FC } from "react";
import ServiceNameBox from "../portfolio/service-name-box";
import PackageCards from "./package-cards";
import { useSearchParams } from "next/navigation";
import { useApiGet } from "@/lib/reactQuery";
import {
  getServiceBySlug,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import {
  getPackagesByServiceId,
  getPackages,
  getPackagesKey,
  TPackage,
} from "@/lib/URL-services/packages";
import { TPaginate } from "@/lib/URL-services/portfolios";
import WidthWrapper from "@/components/global/width-wrapper";

interface PackageContainerProps {}

const PackageContainer: FC<PackageContainerProps> = ({}) => {
  const selectedService = useSearchParams().get("service");

  const { isLoading, data } = useApiGet<TService>({
    queryKey: getServicesKey.bySlug(selectedService!),
    queryFn: () => getServiceBySlug(selectedService!),
    enabled: selectedService != null && selectedService != "all",
  });

  const { isLoading: isLoadingPackages, data: packages } = useApiGet<
    TPackage<TService>[]
  >({
    queryKey: getPackagesKey.byServiceId(data?._id!),
    queryFn: () => getPackagesByServiceId(data?._id!),
    enabled: data?._id != null && selectedService != "all",
  });

  const { isLoading: isLoadingAllPackages, data: allPackages } = useApiGet<{
    packages: TPackage<TService>[];
    paginate: TPaginate;
  }>({
    queryKey: getPackagesKey.all,
    queryFn: () => getPackages({ filter: "active", populate: "service" }),
    enabled: selectedService == "all" || selectedService == null,
  });

  console.log({ allPackages });
  const currentPackages =
    selectedService == "all"
      ? allPackages?.packages
      : !selectedService
      ? allPackages?.packages
      : packages;

  if (isLoading || isLoadingPackages || isLoadingAllPackages)
    return (
      <div className="p-44 flex items-center justify-center">Loading...</div>
    );

  return (
    <div>
      <WidthWrapper>
        <ServiceNameBox />
      </WidthWrapper>
      {currentPackages?.length ? (
        <PackageCards packages={currentPackages!} />
      ) : (
        <div className="p-44 flex items-center justify-center">
          <p>Currently we do not have any package for {data?.title}</p>
        </div>
      )}
    </div>
  );
};

export default PackageContainer;
