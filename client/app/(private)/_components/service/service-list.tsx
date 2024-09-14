"use client";
import NoContentField from "@/components/global/no-content";
import Pagination from "@/components/global/pagination";
import SectionLoader from "@/components/global/section-loader";
import SectionSeparator from "@/components/global/section-separator";
import { StatusIcon } from "@/components/global/status-icon";
import { useApiGet } from "@/lib/reactQuery";
import { TPaginate } from "@/lib/URL-services/portfolios";
import {
  getServices,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ServiceListProps {}

const ServiceList: FC<ServiceListProps> = ({}) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const filter = searchParams.get("filter");
  const sort = searchParams.get("sort");
  const updatedPage = searchParams.get("page");

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const [currentFilter, setCurrentFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [currentSort, setCurrentSort] = useState<"asc" | "desc">("asc");
  const [currentQ, setCurrentQ] = useState<string>("");
  const [filterKeys, setFilterKeys] = useState<string[]>([]);

  const { isLoading, data } = useApiGet<{
    services: TService[];
    paginate: TPaginate;
  }>({
    queryKey: getServicesKey.withFilter(filterKeys),
    queryFn: () =>
      getServices({ filter: currentFilter, sort: currentSort, q: currentQ, limit, page }),
  });

  useEffect(() => {
    setFilterKeys([]);

    const authenticFilter =
      filter == "inactive" ? "inactive" : filter == "active" ? "active" : "all";

    setCurrentFilter(authenticFilter);

    setFilterKeys((prev) => {
      if (!prev.includes(authenticFilter)) prev.push(authenticFilter);
      return prev;
    });

    const authenticSort = sort == "asc" ? "asc" : "desc";
    setCurrentSort(authenticSort ? authenticSort : "desc");
    setFilterKeys((prev) => {
      if (!prev.includes(authenticSort)) prev.push(authenticSort);
      return prev;
    });

    if (q) {
      setCurrentQ(q);
      setFilterKeys((prev) => {
        if (!prev.includes(q)) prev.push(q);
        return prev;
      });
    } else {
      setCurrentQ("");
    }

    // for pagination : set page
    if (updatedPage) {
      setFilterKeys((prev) => {
        const pageKey = `page=${updatedPage}`;
        if (!prev.includes(pageKey)) prev.push(pageKey);
        return prev;
      });
      setPage(parseInt(updatedPage));
    } else {
      setPage(1);
    }
  }, [filter, sort, q, updatedPage]);

  return (
    <div>
      {isLoading ? <SectionLoader className="min-h-[28rem]" /> : null}
      {data?.services.length ? (
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.services?.map((service) => (
            <ServiceItem key={service._id} service={service} />
          ))}
        </div>
      ) : null}
      {!isLoading && !data?.services.length
        ? NoContentField(
            "Currently no services available. Add services to view them."
          )
        : null}
        <SectionSeparator className="min-h-6 lg:min-h-6" />
        <Pagination currentPage={data?.paginate.currentPage || 1} totalPages={data?.paginate.totalPages || 1} />
    </div>
  );
};

export default ServiceList;

const ServiceItem = ({ service }: { service: TService }) => {
  return (
    <Link href={"/dashboard/services/" + service.slug}>
      <div
        className={cn(
          "w-full p-4 rounded-lg flex justify-between items-center",
          {
            "bg-white": service.is_active,
            "bg-red-50 border border-red-300": !service.is_active,
          }
        )}
      >
        <h1>{service.title}</h1>
        {StatusIcon(service.is_active)}
      </div>
    </Link>
  );
};
