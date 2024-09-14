"use client";

import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";

import { FC, useEffect, useState } from "react";

import {
  TImage,
} from "@/lib/URL-services/services";
import ImageUploader from "../image-uploader";
import {
  getPortfoliosKey,
  updatePortfolioImage,
} from "@/lib/URL-services/portfolios";

interface PortfolioImageUpdateFormProps {
  image_url: string;
  id: string;
}

const PortfolioImageUpdateForm: FC<PortfolioImageUpdateFormProps> = ({
  image_url,
  id,
}) => {
  const [initialImageUrl, setInitialImageUrl] = useState(image_url);

  const { toast } = useToast();

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<
    { portfolioImage: TImage; success: boolean },
    { id: string; image: File }
  >(
    {
      mutationFn: updatePortfolioImage,
    },
    {
      invalidateKeys: getPortfoliosKey.all,
    }
  );

  const uploadHandle = (image: File) => {
    mutate({ id, image });
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
        title: "Updated",
        description: "Portfolio image updated successfully",
      });
      setInitialImageUrl(mutatedData.portfolioImage.secure_url);
    }
  }, [isError, error, isSuccess, mutatedData]);

  return (
    <div className="w-full h-full space-y-2">
      <h1 className="text-primary text-lg lg:text-xl font-semibold tracking-wide">
        Image
      </h1>
      <ImageUploader
        imageUrl={initialImageUrl}
        uploadHandle={uploadHandle}
        isLoading={isPending}
      />
    </div>
  );
};

export default PortfolioImageUpdateForm;
