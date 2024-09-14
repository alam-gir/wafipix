"use client";

import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";

import { FC, useEffect, useState } from "react";

import {
  getServicesKey,
  TImage,
  updateServiceIcon,
} from "@/lib/URL-services/services";
import ImageUploader from "../image-uploader";

interface ServiceIconUpdateFormProps {
  icon_url: string;
  id: string;
}

const ServiceIconUpdateForm: FC<ServiceIconUpdateFormProps> = ({
  icon_url,
  id,
}) => {
  const [initialIconUrl, setInitialIconUrl] = useState(icon_url);

  const { toast } = useToast();

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<
    { serviceIcon: TImage; success: boolean },
    { id: string; icon: File }
  >(
    {
      mutationFn: updateServiceIcon,
    },
    {
      invalidateKeys: getServicesKey.all,
    }
  );

  const uploadHandle = (icon: File) => {
    mutate({ id, icon });
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
        description: "Service icon updated successfully",
      });
      setInitialIconUrl(mutatedData.serviceIcon.secure_url);
    }
  }, [isError, error, isSuccess, mutatedData]);

  return (
    <div className="w-full h-full space-y-2">
      <h1 className="text-primary text-lg lg:text-xl font-semibold tracking-wide">
        Icon
      </h1>
      <ImageUploader
        imageUrl={initialIconUrl}
        uploadHandle={uploadHandle}
        isLoading={isPending}
      />
    </div>
  );
};

export default ServiceIconUpdateForm;
