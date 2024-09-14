'use client'

import Button2 from "@/components/global/buttons/button2";
import WidthWrapper from "@/components/global/width-wrapper";
import { MoveRight } from "lucide-react";
import { FC } from "react";
import ServiceGallery from "../services/service-gallery";
import { useApiGet } from "@/lib/reactQuery";
import { getServices, getServicesKey, TService } from "@/lib/URL-services/services";
import { TPaginate } from "@/lib/URL-services/portfolios";

interface ServiceBlockProps {}

const ServiceBlock: FC<ServiceBlockProps> = ({}) => {

  const {data, isLoading} = useApiGet<{services: TService[], paginate: TPaginate}>({
    queryKey: getServicesKey.all,
    queryFn: () => getServices({
      limit: 3,
      filter: 'active',
      populate: 'image',
    })
  })

  if(isLoading || !data) return null;

  return (
    <WidthWrapper>
      <div>

        {/* HEADER */}
        <div className="h-fit w-full flex flex-col gap-4 lg:flex-row lg:justify-between items-center mb-8 lg:mb-12">
            <h1 className="text-primary text-head lg:text-headLg font-bold capitalize">our services</h1>
            <Button2 href="/services" title="SEE ALL SERVICES" icon={<MoveRight />} iconPosition="right" size={"lg"}/>
        </div>

        <ServiceGallery services={data?.services} />
      </div>
    </WidthWrapper>
  );
};

export default ServiceBlock;
