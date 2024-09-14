"use client";

import NoContentField from "@/components/global/no-content";
import Pagination from "@/components/global/pagination";
import SectionLoader from "@/components/global/section-loader";
import SectionSeparator from "@/components/global/section-separator";
import { useApiGet } from "@/lib/reactQuery";
import {
  getPortfolios,
  getPortfoliosKey,
  TPaginate,
  TPortfolio,
} from "@/lib/URL-services/portfolios";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface PortfolioListProps {}

const PortfolioList: FC<PortfolioListProps> = ({}) => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const sort = searchParams.get("sort");
  const updatedPage = searchParams.get("page");

  const [currentSort, setCurrentSort] = useState<"asc" | "desc">("asc");
  const [currentQ, setCurrentQ] = useState<string>("");
  const [filterKeys, setFilterKeys] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(6);

  const { isLoading, data } = useApiGet<{
    portfolios: TPortfolio[];
    paginate: TPaginate;
  }>({
    queryKey: getPortfoliosKey.withFilter(filterKeys),
    queryFn: () =>
      getPortfolios({
        sort: currentSort,
        q: currentQ,
        populate: "image",
        page,
        limit,
      }),
  });

  useEffect(() => {
    setFilterKeys([]);

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
  }, [sort, q, updatedPage]);

  return (
    <div>
      {isLoading ? <SectionLoader className="min-h-[28rem]" /> : null}
      {data?.portfolios ? (
        <div className="h-full w-full grid grid-cols-2 lg:grid-cols-3 gap-4">
          {data.portfolios?.map((portfolio) => {
            return <PortfolioItem key={portfolio._id} portfolio={portfolio} />;
          })}
        </div>
      ) : null}
      {!isLoading && !data?.portfolios.length
        ? NoContentField(
            "Currently no portfolios available. Add services to view them."
          )
        : null}

      <SectionSeparator className="min-h-6 lg:min-h-6" />
      <Pagination
        totalPages={data?.paginate.totalPages || 1}
        currentPage={page}
      />
    </div>
  );
};

export default PortfolioList;

const PortfolioItem = ({ portfolio }: { portfolio: TPortfolio }) => {
  return (
    <Link
      href={"/dashboard/portfolios/" + portfolio.slug}
      className="h-full w-full group"
    >
      <div
        className={cn(
          "h-full w-full rounded-lg flex flex-col relative overflow-hidden"
        )}
      >
        <Image
          src={portfolio.image.secure_url}
          alt={portfolio.title}
          height={400}
          width={400}
          className="group-hover:scale-105 duration-300 h-full w-full"
        />
        <h1 className="text-[.7rem] lg:text-lg tracking-wide font-semibold absolute bottom-0 bg-primary/30 p-2 w-full text-primary-foreground group-hover:text-accent3 duration-300 group-hover:bg-primary/80">
          {portfolio.title}
        </h1>
      </div>
    </Link>
  );
};
