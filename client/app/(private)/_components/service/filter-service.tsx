"use client";

import { FC } from "react";
import { useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";

interface FilterProps {
  isFilter?: boolean;
  isSort?: boolean;
  isSearch?: boolean;
}

const Filter: FC<FilterProps> = ({isFilter = true, isSort= true, isSearch = true}) => {
  const params = useSearchParams();
  const qParams = params.get("q");
  const filterParams = params.get("filter");
  const sortParams = params.get("sort");

  const [filter, setFilter] = useQueryState("filter");
  const [sort, setSort] = useQueryState("sort");
  const [q, setQ] = useQueryState("q");

  const handleQuery = (e: any) => {
    switch (e.target.name) {
      case "filter":
        if (e.target.value === "all" || e.target.value === "") {
          setFilter(null);
        } else {
          setFilter(e.target.value);
        }
        break;

      case "sort":
        if (e.target.value === "newest" || e.target.value === "") {
          setSort(null);
        } else {
          setSort("asc");
        }
        break;

      case "search":
        if (e.target.value === "") {
          setQ(null);
        } else {
          setQ(e.target.value);
        }
        break;

      default:
        return;
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between py-4">
        <div className="flex items-start justify-between gap-2 md:flex-row md:gap-4">
          { isFilter ?<div className="flex items-center gap-2">
            <label htmlFor="filter" className="text-primary text-sm">
              filter
            </label>
            <select
              onChange={handleQuery}
              name="filter"
              id="filter"
              defaultValue={filterParams ? filterParams : "all"}
              className="border border-accent3 bg-transparent rounded-md px-2 py-1"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div> : null }
          {isSort ? <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-primary text-sm">
              Sort
            </label>
            <select
              onChange={handleQuery}
              name="sort"
              id="sort"
              defaultValue={sortParams == "asc" ? 'oldest' : "newest"}
              className="border border-accent3 bg-transparent rounded-md px-2 py-1"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div> : null}
        </div>
        {isSearch ? <div className="flex items-center gap-2">
          <label htmlFor="search" className="text-primary text-sm">
            Search
          </label>
          <input
            onChange={handleQuery}
            type="text"
            name="search"
            id="search"
            placeholder="Search for ..."
            defaultValue={qParams ? qParams : ""}
            className="border border-accent3 rounded-md px-2 py-1 w-full lg:min-w-[28rem] bg-transparent"
          />
        </div> : null}
      </div>
    </div>
  );
};

export default Filter;
