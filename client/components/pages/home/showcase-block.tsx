'use client'

import WidthWrapper from "@/components/global/width-wrapper";
import { FC } from "react";
import ShowcaseGallery from "./showcase-gallery";
import ShowcaseCarousel from "@/components/carousel/showcase-carousel/showcase-carousel";
import { useApiGet } from "@/lib/reactQuery";
import { getPortfoliosKey, getPortfolios, TPaginate, TPortfolio } from "@/lib/URL-services/portfolios";

interface ShowcaseBlockProps {}

const ShowcaseBlock: FC<ShowcaseBlockProps> = ({}) => {
  
  const {data, isLoading} = useApiGet<{portfolios:TPortfolio[], paginate: TPaginate}>({
    queryKey: getPortfoliosKey.image,
    queryFn: () => getPortfolios({limit: 20, populate: 'image'}),
  })
  
  if(isLoading || !data) return null
  
  return (
    <>
      <WidthWrapper>
        <div className="lg:hidden">
          <ShowcaseGallery portfolios={data?.portfolios} />
        </div>
      </WidthWrapper>
      <div className="hidden lg:block pointer-events-none">
        <ShowcaseCarousel slides={data?.portfolios} autoScrollOptions={{speed: .5}} />
        <ShowcaseCarousel slides={data?.portfolios} autoScrollOptions={{speed: .5, direction: "backward"}} />
      </div>
    </>
  );
};

export default ShowcaseBlock;
