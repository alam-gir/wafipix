"use client";
import { TTopCustomers } from "@/lib/URL-services/top-customers";
import Image from "next/image";
import { FC } from "react";

interface CompanyCarouselContentProps {
  slide: TTopCustomers;
}

const CompanyCarouselContent: FC<CompanyCarouselContentProps> = ({
  slide,
}) => {
  
  return (
    <div
      className="h-full w-full px-2 group"
    > 
    <div className="bg-white flex items-center justify-center w-full h-full p-3 rounded-md">

      <Image
          src={slide?.logo_url}
          alt={slide?.title || "Company logo"}
          width={150}
          height={150}
          className="w-full h-full object-contain group-hover:filter group-hover:grayscale-0 grayscale duration-300"
          />
          </div>
    </div>
  );
};

export default CompanyCarouselContent;
