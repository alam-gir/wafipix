"use client";

import Button2 from "@/components/global/buttons/button2";
import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";
import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";
import Confirmation from "../confirmation";
import { deletePackage, getPackagesKey } from "@/lib/URL-services/packages";

interface PackageDeleteButtonProps {
  id: string;
}

const PackageDeleteButton: FC<PackageDeleteButtonProps> = ({ id }) => {
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
      mutationFn: deletePackage,
    },
    {
      invalidateKeys: getPackagesKey.all,
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
        description: "Package status deleted successfully",
      });

      router.push("/dashboard/packages");
    }

    if (isPending) {
      toast({
        title: "Deleting",
        description: "Package is deleting...",
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
            title="Delete Package"
          />
        </Confirmation>
        <p className="text-destructive italic font-semibold tracking-wide">
            This action can't be undone. This will permanently delete the package.
        </p>
      </div>
    </div>
  );
};

export default PackageDeleteButton;
