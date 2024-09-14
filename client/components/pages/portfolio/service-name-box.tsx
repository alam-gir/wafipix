"use client"

import SectionLoader from "@/components/global/section-loader";
import { services } from "@/data";
import { useApiGet } from "@/lib/reactQuery";
import { TPaginate } from "@/lib/URL-services/portfolios";
import { getServices, getServicesKey, TService } from "@/lib/URL-services/services";
import { cn, getSlugFromString } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC } from "react";

interface ServiceNameBoxProps {}

const ServiceNameBox: FC<ServiceNameBoxProps> = ({}) => {
  const {isLoading, data} = useApiGet<{services:TService[], paginate: TPaginate}>({
    queryKey: getServicesKey.all,
    queryFn: getServices
  })

  const selectedService = useSearchParams().get("service")

  if(isLoading) return <SectionLoader iconClassName="opacity-30" />

  if(data)
  return (
    <div className="py-4">
      <ul className="flex items-center justify-center gap-2 flex-wrap">
        {ServiceItem({title: "All", selectedService: selectedService, key: `inPortfolioGaller-all`})}
        {data?.services?.map(service => {
            return ServiceItem({title: service.title,selectedService, key: `inPortfolioGaller-${service.title}`})
        })}
      </ul>
    </div>
  );
};

export default ServiceNameBox;

const ServiceItem = ({ title, selectedService, key }: { key: string,title: string, selectedService: string | null }) => {
    const slugTitle = getSlugFromString(title)
    const currentService = isCurrentService({selectedService, service: slugTitle})
  return (
    <Link key={key} href={`?service=${slugTitle}`}>
      <li className={cn("capitalize p-2 px-6 font-semibold bg-primary-foreground border hover:border-accent3 hover:bg-accent3 text:primary hover:text-primary-foreground text-base lg:text-lg rounded-full duration-100", {
        "bg-accent3 border-accent3 text-primary-foreground" : currentService
      })}>
        {title}
      </li>
    </Link>
  );
};


const isCurrentService = ({selectedService, service}:{service: string, selectedService: string | null}) => {
    if(service.toLowerCase() == "all" || service.toLowerCase() == null){
        if(selectedService == null) return true
        return service.toLowerCase() == selectedService?.toLocaleLowerCase()
    } else return service.toLowerCase() == selectedService?.toLowerCase()
}
