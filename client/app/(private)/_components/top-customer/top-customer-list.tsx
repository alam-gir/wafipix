"use client";

import Button2 from "@/components/global/buttons/button2";
import NoContentField from "@/components/global/no-content";
import SectionLoader from "@/components/global/section-loader";
import { useApiGet, useApiSend } from "@/lib/reactQuery";
import {
  deleteTopCustomer,
  getTopCustomers,
  getTopCustomersKey,
  TTopCustomers,
} from "@/lib/URL-services/top-customers";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { FC, useEffect } from "react";
import Confirmation from "../confirmation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TopCustomerListProps {}

const TopCustomerList: FC<TopCustomerListProps> = ({}) => {
  const { toast } = useToast();

  const { isLoading, data } = useApiGet<TTopCustomers[]>({
    queryKey: getTopCustomersKey,
    queryFn: getTopCustomers,
  });

  const {
    isPending,
    mutate,
    data: mutateData,
    isSuccess,
    isError,
    error,
  } = useApiSend<{ success: boolean }, string>(
    {
      mutationFn: deleteTopCustomer,
    },
    {
      invalidateKeys: getTopCustomersKey,
    }
  );

  const deleteHandle = async (id: string) => {
    if (!id) return;
    mutate(id);
  };

  // RESPONSE EFFECT
  useEffect(() => {
    if (isSuccess && mutateData?.success) {
      toast({
        title: "Success",
        description: "Customer deleted successfully.",
      });
    }
    if (isError) {
      toast({
        title: "Error",
        description: error?.message,
      });
    }
    if (isPending) {
      toast({
        title: "Loading",
        description: "Please wait...",
      });
    }
  }, [isSuccess, mutateData, isError, error, isPending]);

  const Items = data?.map((customer) => {
    return (
      <TopCustomer
        key={customer._id}
        customer={customer}
        deleteHandle={deleteHandle}
        isLoading={isPending}
      />
    );
  });

  if (isLoading) return <SectionLoader className="min-h-96" />;
  return (
    <div className=" mt-8 flex gap-4 flex-wrap items-center justify-center">
      {data?.length ? Items : NoContentField("No customers added yet.")}
    </div>
  );
};

export default TopCustomerList;

const TopCustomer = ({
  customer,
  deleteHandle,
  isLoading,
}: {
  customer: TTopCustomers;
  deleteHandle: (id: string) => void;
  isLoading?: boolean;
}) => {
  return (
    <div
      className={cn("relative w-48 bg-white max-w-48 rounded overflow-hidden")}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0"
      >
        <Confirmation
          onConfirm={() => {
            deleteHandle(customer._id);
          }}
        >
          <Button2
            className="absolute top-0 right-0 z-10"
            icon={<Trash2 />}
            size={"sm"}
          />
        </Confirmation>
      </div>

      <Link href={"/dashboard/top-customers/" + customer._id}>
        <div className="h-full w-full relative flex items-center justify-center">
          <Image
            src={customer.logo_url}
            alt={customer.title}
            height={400}
            width={400}
            className="object-contain aspect-video w-full p-2"
          />

          <h1 className="w-full text-center p-2 absolute bottom-0 z-10 bg-primary/60 text-sm text-primary-foreground font-semibold tracking-wide">
            {customer.title}
          </h1>
        </div>
      </Link>
    </div>
  );
};
