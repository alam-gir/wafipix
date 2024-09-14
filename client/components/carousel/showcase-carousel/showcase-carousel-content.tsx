"use client";
import { TPortfolio } from "@/lib/URL-services/portfolios";
import Image from "next/image";
import { FC } from "react";

interface ShowcaseCarouselContentProps {
  slide: TPortfolio;
}

const ShowcaseCarouselContent: FC<ShowcaseCarouselContentProps> = ({
  slide,
}) => {
  
  return (
    <div
      className="h-full w-full group"
    > 
    <div className="flex items-center justify-center w-full h-full p-4">

      <Image
          src={slide?.image.secure_url}
          alt={slide?.title || "Showcase logo"}
          height={720} width={1367}
          className="w-full h-96 rounded-2xl object-cover"
          />
          </div>
    </div>
  );
};

export default ShowcaseCarouselContent;
