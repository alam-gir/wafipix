"use client";

import { FC } from "react";

import { useApiGet } from "@/lib/reactQuery";
import {
  getContactInfo,
  getContactInfoKey,
  TContactInfo,
} from "@/lib/URL-services/contact-info";
import SectionLoader from "@/components/global/section-loader";


interface AddressBoxProps extends React.HTMLAttributes<HTMLDivElement> {

}

const AddressBox: FC<AddressBoxProps> = ({ ...props }) => {


  const { isLoading, data } = useApiGet<TContactInfo>({
    queryKey: getContactInfoKey,
    queryFn: getContactInfo,
  });

  if (isLoading) return <SectionLoader />

  if (data)
    return (
      <div
        className={`w-full max-w-[650px] h-full ${props.className}`}
      >
        {Object.entries(data)?.map(([key, value], index) => {
          const supportedKeys = ["country", "city", "area", "phone", "email"];
          if(!supportedKeys.includes(key)) return null;
          return (
            <div
              key={`address_${index}`}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 space-y-1 md:space-y-2 items-center"
            >
              <p className="text-lg lg:text-lg">{key}</p>
              {key === "email" ? (
                <a
                  className="text-lg lg:text-lg hover:underline duration-100"
                  href={`mailto:${value}`}
                >
                  {value}
                </a>
              ) : key === "phone" ? (
                <a
                  className="text-lg lg:text-lg hover:underline duration-100"
                  href={`tel:${value}`}
                >
                  {value}
                </a>
              ) : (
                <p className="text-lg lg:text-lg">{value}</p>
              )}
            </div>
          );
        })}
      </div>
    );
};

export default AddressBox;
