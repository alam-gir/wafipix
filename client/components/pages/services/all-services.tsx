"use client";
import { FC } from "react";
import ServiceGallery from "./service-gallery";
import { useApiGet } from "@/lib/reactQuery";
import {
  getServices,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import { TPaginate } from "@/lib/URL-services/portfolios";
import SectionLoader from "@/components/global/section-loader";

interface AllServicesProps {}

const AllServices: FC<AllServicesProps> = ({}) => {
  const { isLoading, data } = useApiGet<{
    services: TService[];
    paginate: TPaginate;
  }>({
    queryKey: getServicesKey.image,
    queryFn: () => getServices({populate: "image", sort: "asc" }),

  });

  if (isLoading) return <SectionLoader className="min-h-screen w-full" />;

  if(data)
  return (
    <div>
      <ServiceGallery services={data.services} />
    </div>
  );
};

export default AllServices;
