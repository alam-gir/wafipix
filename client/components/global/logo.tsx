'use client'

import { useApiGet } from "@/lib/reactQuery";
import { getLogo, getLogoKey, TLogo } from "@/lib/URL-services/logo";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import SectionLoader from "./section-loader";

interface LogoProps extends React.HTMLAttributes<HTMLHeadingElement> {
  type?: "icon" | "name";
}

const Logo: FC<LogoProps> = ({ type = "icon", ...props }) => {
  
  const {isLoading, data} = useApiGet<TLogo>({
    queryKey: getLogoKey,
    queryFn: getLogo
  })

  if(isLoading) return <SectionLoader iconClassName="opacity-30" />

  return (
    <h1
      {...props}
      className={`text-4xl text-accent2 font-bold tracking-tighter h-fit w-fit ${props.className}`}
    >
      <Link href={"/"} className="h-full w-full">
        {type === "icon" && !isLoading && data
        ? <Image className="h-12 w-fit object-contain" src={data?.url} height={200} width={200} alt="Logo" /> 
        : <span>wafipix.</span>}
      </Link>
    </h1>
  );
};

export default Logo;
