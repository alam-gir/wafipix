"use client";

import Button2 from "@/components/global/buttons/button2";
import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";
import { FC, useEffect } from "react";

import { deleteService, getServicesKey } from "@/lib/URL-services/services";
import { useRouter } from "next/navigation";
import Confirmation from "../confirmation";

interface ServiceDeleteButtonProps {
  id: string;
}

const ServiceDeleteButton: FC<ServiceDeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const { toast } = useToast();

  const {
    mutate,
    data: mutatedData,
    isPending,
    isError,
    error,
    isSuccess,
  } = useApiSend<{ success: boolean }, string>(
    {
      mutationFn: deleteService,
    },
    {
      invalidateKeys: getServicesKey.all,
    }
  );

  const deleteHandler = (id: string) => {
    mutate(id);
  };

  // RESULT EFFECT
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }

    if (isSuccess && mutatedData?.success) {
      toast({
        title: "Deleted",
        description: "Service status deleted successfully",
      });

      router.push("/dashboard/services");
    }

    if (isPending) {
      toast({
        title: "Deleting",
        description: "Service is deleting...",
      });
    }
  }, [isError, error, isSuccess, isPending, mutatedData]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit p-4 lg:max-w-96 bg-destructive/10 border border-destructive space-y-4">
        <Confirmation
          onConfirm={() => deleteHandler(id)}
          header="Are you sute to delete this ?"
          description="This action can't be undone. This will permanently delete the service."
        >
          <Button2
            className="w-full"
            variant="destructive"
            title="Delete Service"
          />
        </Confirmation>
        <p className="text-destructive italic font-semibold tracking-wide">
          Before deleting a service please confirm that, this service dosen't
          have any portfolios or packages. If it has, please delete them first.
        </p>
      </div>
    </div>
  );
};

export default ServiceDeleteButton;
