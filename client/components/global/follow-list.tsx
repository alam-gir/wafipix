"use client";

import { useApiGet } from "@/lib/reactQuery";
import {
  getSocialInfo,
  getSocialInfoQueryKey,
  TSocialInfo,
} from "@/lib/URL-services/social-info";
import Link from "next/link";
import { FC } from "react";
import SectionLoader from "./section-loader";

interface FollowListProps {}

const FollowList: FC<FollowListProps> = ({}) => {
  const { isLoading, data } = useApiGet<TSocialInfo[]>({
    queryKey: getSocialInfoQueryKey,
    queryFn: getSocialInfo,
  });

  if (isLoading) return <SectionLoader />;

  if (data)
    return (
      <ul>
        {data?.map((social, index) => (
          <li
            key={`footer_follow_link${index}`}
            className="w-fit text-articlePara md:text-articleParaMd lg:text-articleParaLg text-primary-foreground/80 hover:underline hover:text-primary-foreground duration-100"
          >
            <Link className="h-full w-full" href={social?.url}>
              {social?.title}
            </Link>
          </li>
        ))}
      </ul>
    );
};

export default FollowList;
