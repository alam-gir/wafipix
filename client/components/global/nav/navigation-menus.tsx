"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navLinks, services } from "@/data";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn, isCurrentPath } from "@/lib/utils";
import { useApiGet } from "@/lib/reactQuery";
import {
  getServices,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import SectionLoader from "../section-loader";
import { TPaginate } from "@/lib/URL-services/portfolios";

interface Props {
  onClick?: () => void;
}
const NavigationMenus: React.FC<Props> = ({ onClick }) => {
  const pathName = usePathname();

  const { isLoading, data } = useApiGet<{services:TService[], paginate: TPaginate}>({
    queryKey: getServicesKey.icon,
    queryFn: () => getServices({ populate: "icon", sort: "asc" }),
  });


  const NAVIGATIONS = navLinks.map((nav) => {
    const currentNav = isCurrentPath({ nav: nav.title, pathName });
    if (nav.title === "Services") {
      return (
        <NavigationMenuItem key={nav.title}>
          <NavigationMenuTrigger
            className={cn(
              "text-subHeader font-semibold bg-transparent focus:bg-transparent focus:text-accent3 hover:bg-accent3 text-lg lg:text-xl",
              {
                "bg-secondary": currentNav,
              }
            )}
          >
            {nav.title}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-6 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] text-xl">
              {isLoading ? (
                <SectionLoader />
              ) : (
                data?.services?.map((service) => {
                  return (
                    <ListItem
                      key={service.slug}
                      title={service.title}
                      href={`${nav.href}/${service.slug}`}
                      icon={service.icon.secure_url}
                      onClick={onClick}
                    />
                  );
                })
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      );
    } else
      return (
        <NavigationMenuItem key={nav.title}>
          <Link href={nav.href} legacyBehavior passHref>
            <NavigationMenuLink
              onClick={onClick}
              className={cn(
                navigationMenuTriggerStyle(),
                "text-subHeader font-semibold bg-transparent focus:bg-transparent focus:text-accent3 hover:bg-accent3 hover:text-primary-foreground text-lg",
                {
                  "text-accent3": currentNav,
                }
              )}
            >
              {nav.title}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      );
  });
  return (
    <NavigationMenu className="text-subHeader">
      <NavigationMenuList className="flex flex-col items-center justify-center h-full w-screen gap-4 lg:flex-row lg:w-auto lg:gap-2">
        {NAVIGATIONS}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = ({
  title,
  href,
  icon,
  onClick,
}: {
  title: string;
  href: string;
  icon: string;
  onClick?: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      href={href}
      className="hover:text-accent3 hover:underline text-secondary-foreground duration-100"
    >
      <li className="flex gap-3 items-start">
        <Image alt="" src={icon} height={20} width={20} quality={100} className="mt-1" />
        <span>{title}</span>
      </li>
    </Link>
  );
};

export default NavigationMenus;
