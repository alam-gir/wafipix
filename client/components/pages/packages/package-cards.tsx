import WidthWrapper from "@/components/global/width-wrapper";
import { FC } from "react";
import PackageCard from "./package-card";
import { TPackage } from "@/lib/URL-services/packages";
import { TService } from "@/lib/URL-services/services";

interface PackageCardsProps {
  packages: TPackage<TService>[]
}

const PackageCards: FC<PackageCardsProps> = ({packages}) => {

  return (
    <WidthWrapper>
      <div className="mt-8 grid lg:grid-cols-3 gap-4">
        {packages?.map(pkg => {
            if(!pkg.is_active) return null;
            return <PackageCard key={pkg.title} pkg={pkg}/>
        })}
      </div>
    </WidthWrapper>
  );
};

export default PackageCards;
