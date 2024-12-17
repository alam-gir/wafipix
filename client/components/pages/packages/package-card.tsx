import Button2 from "@/components/global/buttons/button2";
import { TPackage } from "@/lib/URL-services/packages";
import { TService } from "@/lib/URL-services/services";
import { cn } from "@/lib/utils";
import { Check, MoveRight } from "lucide-react";
import { FC } from "react";

interface PackageCardProps {
  pkg: TPackage<TService>;
}

const PackageCard: FC<PackageCardProps> = ({ pkg }) => {
  const isOffer = null;
  // const isOffer = pkg.offer.active && pkg.offer.perchentage ? true : false;

  return (
    <div className="relative overflow-hidden h-full w-full p-10 lg:p-12 flex flex-col gap-4 bg-white border backdrop-blur-3xl drop-shadow-lg rounded-2xl">

      {/* title descrition & price */}
      <div className="flex flex-col md:flex-row lg:flex-col md:border-b md:border-primary/10 lg:border-none md:pb-4 lg:pb-0">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-primary text-3xl font-semibold text-center md:text-left lg:text-center">
              {pkg.title}
            </h1>
            <p className="text-primary/80 tracking-wide text-lg">
              {pkg.description}
            </p>
          </div>
          <h2 className="p-2 text-accent4/60 font-semibold tracking-wide bg-accent/80 rounded-xl drop-shadow-xl w-fit px-4">
            {pkg.service.title}
          </h2>
        </div>
        <div className="py-8 my-8 md:my-0 md:py-0 lg:py-8 lg:my-8 flex justify-center md:pl-12 lg:pl-0 border-b border-primary/10 border-t md:border-b-0 md:border-t-0 lg:border-b lg:border-t ">
          <h1 className="text-3xl font-semibold space-x-2 md:flex md:flex-col-reverse md:space-x-0 lg:block lg:space-x-2">
            <span className="flex flex-col items-center">
              <span
                className={cn({
                  "line-through text-muted-foreground text-xl": isOffer,
                })}
              >
                {"USD " + pkg.price.usd}
              </span>

              <span
                className={cn({
                  "line-through text-muted-foreground text-xl": isOffer,
                })}
              >
                {"BDT " + pkg.price.bdt}
              </span>
            </span>

            {/* {isOffer ? <span>{pkg.price_type + " " + pkg.offer.price}</span> : null} */}
          </h1>
        </div>
      </div>

      {/* features */}
      <div className="space-y-2">
        <p className="text-primary text-lg lg:text-xl tracking-wide">
          Within this plan you will get :{" "}
        </p>
        <ul className="grid md:grid-cols-2 lg:grid-cols-1 gap-2">
          {pkg.features?.map((f) => FeatureList(f))}
        </ul>
      </div>

      {/* action buttons */}
      <div className="h-full w-full flex items-end">
        <Button2
          href="/contact"
          title="GET STARTED"
          icon={<MoveRight />}
          iconPosition="right"
          size={"lg"}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PackageCard;

const FeatureList = (feature: string) => {
  return (
    <li
      key={feature}
      className="flex gap-4 text-subHead lg:text-subHeadLg text-primary items-center"
    >
      <span className="h-4 w-4 flex items-center justify-center p-0.5 ring-2 ring-accent3/40 bg-accent3 rounded-full ">
        <Check className="text-secondary" />
      </span>
      <span>{feature}</span>
    </li>
  );
};
