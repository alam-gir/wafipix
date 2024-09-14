"use client";

import Button2 from "@/components/global/buttons/button2";
import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";
import { FC, useEffect } from "react";

import { useRouter } from "next/navigation";
import {
  deletePortfolio,
  getPortfoliosKey,
} from "@/lib/URL-services/portfolios";
import Confirmation from "../confirmation";

interface PortfolioDeleteButtonProps {
  id: string;
}

const PortfolioDeleteButton: FC<PortfolioDeleteButtonProps> = ({ id }) => {
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
      mutationFn: deletePortfolio,
    },
    {
      invalidateKeys: getPortfoliosKey.all,
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
        description: "Portfolio status deleted successfully",
      });

      router.push("/dashboard/portfolios");
    }

    if (isPending) {
      toast({
        title: "Deleting",
        description: "Portfolio is deleting...",
      });
    }
  }, [isError, error, isSuccess, isPending, mutatedData]);

  return (
    <div className="w-full h-full">
      <div className="w-full h-fit p-4 lg:max-w-96 bg-destructive/10 border border-destructive space-y-4">
        <Confirmation
          onConfirm={() => deleteHandler(id)}
          header="Are you sure to delete this ?"
          description="If you click yes, this portfolio cannot be recovered."
        >
          <Button2
            className="w-full"
            variant="destructive"
            title="Delete Portfolio"
          />
        </Confirmation>
        <p className="text-destructive italic font-semibold tracking-wide">
          Deleted Portfolio cannot be recovered.
        </p>
      </div>
    </div>
  );
};

export default PortfolioDeleteButton;
