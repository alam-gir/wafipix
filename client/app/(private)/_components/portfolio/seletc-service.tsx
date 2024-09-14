"use client";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { useApiGet } from "@/lib/reactQuery";
import { TPaginate } from "@/lib/URL-services/portfolios";
import {
  getServices,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import { FC } from "react";

interface SelectServiceProps {
  onSelectHandle: (serviceId: string) => void;
}

const SelectService: FC<SelectServiceProps> = ({ onSelectHandle }) => {
  const { isLoading, data } = useApiGet<{
    paginate: TPaginate;
    services: TService[];
  }>({
    queryKey: getServicesKey.services,
    queryFn: () => getServices({ limit: 1000000 }),
  });

  return (
    <Select disabled={isLoading || !data?.services.length} onValueChange={onSelectHandle}>
      <SelectTrigger
        onSelect={(e) => {}}
        className="text-muted-foreground lg:text-lg"
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <SelectValue placeholder="Select a service" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <ServiceItems services={data?.services!} />
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectService;

const ServiceItems = ({ services }: { services: TService[] }) => {
  return services?.map((service) => (
    <SelectItem key={service._id} value={service._id}>
      {service.title}
    </SelectItem>
  ));
};
