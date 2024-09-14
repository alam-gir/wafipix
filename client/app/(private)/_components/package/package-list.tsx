"use client";
import NoContentField from "@/components/global/no-content";
import Pagination from "@/components/global/pagination";
import SectionLoader from "@/components/global/section-loader";
import SectionSeparator from "@/components/global/section-separator";
import { StatusIcon } from "@/components/global/status-icon";
import { useApiGet } from "@/lib/reactQuery";
import {
  getPackages,
  getPackagesKey,
  TPackage,
} from "@/lib/URL-services/packages";
import { TPaginate } from "@/lib/URL-services/portfolios";
import {
  TService,
} from "@/lib/URL-services/services";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PackageListProps {}

const PackageList: FC<PackageListProps> = ({}) => {
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
    packages: TPackage<TService>[];
    paginate: TPaginate;
  }>({
    queryKey: getPackagesKey.withFilter(filterKeys),
    queryFn: () =>
      getPackages({
        filter: currentFilter,
        sort: currentSort,
        q: currentQ,
        limit,
        page,
        populate: "service",
      }),
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
      {data?.packages.length ? (
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          {data.packages?.map((pkg) => (
            <PackageItem key={pkg._id} pkg={pkg} />
          ))}
        </div>
      ) : null}
      {!isLoading && !data?.packages.length
        ? NoContentField(
            "Currently no packages available. Add packages to view them."
          )
        : null}
      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <Pagination
        currentPage={data?.paginate.currentPage || 1}
        totalPages={data?.paginate.totalPages || 1}
      />
    </div>
  );
};

export default PackageList;

const PackageItem = ({ pkg }: { pkg: TPackage<TService> }) => {
  return (
    <Link href={"/dashboard/packages/" + pkg._id}>
      <div className={cn(
            "w-full p-4 rounded-lg space-y-2",
            {
              "bg-white": pkg.is_active,
              "bg-red-50 border border-red-300": !pkg.is_active,
            }
          )}>
        <div
          className=" flex justify-between items-center"
        >
          <h1 className="text-lg tracking-wide">{pkg.title}</h1>
          {StatusIcon(pkg.is_active)}
        </div>
        <h2 className="p-2 text-primary tracking-wide bg-accent4/30 rounded-xl drop-shadow-xl">
          {pkg.service.title}
        </h2>
      </div>
    </Link>
  );
};
