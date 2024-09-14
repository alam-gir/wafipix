'use client'

import CompanyCarousel from "@/components/carousel/company-carousel/company-carousel";
import { TEXTS } from "@/data";
import { useApiGet } from "@/lib/reactQuery";
import { getTopCustomers, getTopCustomersKey, TTopCustomers } from "@/lib/URL-services/top-customers";
import { FC } from "react";

interface TopCustomersProps {}

const TopCustomers: FC<TopCustomersProps> = ({}) => {
    
    const {data, isLoading} = useApiGet<TTopCustomers[]>({
        queryKey: getTopCustomersKey,
        queryFn: getTopCustomers
    })

    if(!data || isLoading) return null

  return (
    <div className="space-y-4 lg:row-span-2 lg:self-center relative">
      {/* left Overlay */}
      <div className="h-full w-1/3 from-background2 to-transparent bg-gradient-to-r absolute z-10 left-0 top-2" />
      {/* right Overlay */}
      <div className="h-full w-1/3 from-background2 to-transparent bg-gradient-to-l absolute z-10 right-0 -top-2" />
      <p className="absolute -top-10 text-muted-foreground/20">
        {TEXTS.home.packagesBlock.ourTopCustomers}
      </p>
      <CompanyCarousel
        slides={data}
        autoScrollOptions={{ speed: 0.5 }}
      />
      <CompanyCarousel
        slides={data}
        autoScrollOptions={{ direction: "backward", speed: 0.5 }}
      />
    </div>
  );
};

export default TopCustomers;
