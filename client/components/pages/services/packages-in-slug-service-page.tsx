"use client";

import { FC } from "react";
import PackageCards from "../packages/package-cards";
import {
  getServiceBySlug,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import { useApiGet } from "@/lib/reactQuery";
import { getPackagesByServiceId, getPackagesKey, TPackage } from "@/lib/URL-services/packages";
import SectionLoader from "@/components/global/section-loader";

interface PackagesInSlugServicePageProps {
  slug: string;
}

const PackagesInSlugServicePage: FC<PackagesInSlugServicePageProps> = ({
  slug,
}) => {

  const { isLoading, data } = useApiGet<TService>({
    queryKey: getServicesKey.bySlug(slug),
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
  });

  const { isLoading: isLoadingPackages, data: packages } = useApiGet<
    TPackage<TService>[]
  >({
    queryKey: getPackagesKey.byServiceId(data?._id!),
    queryFn: () => getPackagesByServiceId(data?._id!),
    enabled: !!data,
  });

  if (isLoading || isLoadingPackages)
    return <SectionLoader className="min-h-[50vh]" />;

  if (!packages?.length)
    return (
      <div className="p-44 flex items-center justify-center">
        <p>Currently we do not have any package for {data?.title}</p>
      </div>
    );
    
  if (packages?.length)
    return (
      <div>
        <PackageCards packages={packages!} />
      </div>
    );
};

export default PackagesInSlugServicePage;
