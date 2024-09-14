"use client";

import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";

import { FC, useEffect, useState } from "react";

import {
  getServicesKey,
  TImage,
  updateServiceImage,
} from "@/lib/URL-services/services";
import ImageUploader from "../image-uploader";

interface ServiceImageUpdateFormProps {
  image_url: string;
  id: string;
}

const ServiceImageUpdateForm: FC<ServiceImageUpdateFormProps> = ({
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
    { serviceImage: TImage; success: boolean },
    { id: string; image: File }
  >(
    {
      mutationFn: updateServiceImage,
    },
    {
      invalidateKeys: getServicesKey.all,
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
        description: "Service image updated successfully",
      });
      setInitialImageUrl(mutatedData.serviceImage.secure_url);
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

export default ServiceImageUpdateForm;
