"use client";
import { FC } from "react";
import ImageUploader from "../image-uploader";
import { useApiGet, useApiSend } from "@/lib/reactQuery";
import {
  getLogo,
  getLogoKey,
  TLogo,
  uploadLogo,
} from "@/lib/URL-services/logo";
import SectionLoader from "@/components/global/section-loader";

interface LogoMangeContainerProps {}

const LogoMangeContainer: FC<LogoMangeContainerProps> = ({}) => {
  const { isLoading, data } = useApiGet<TLogo>({
    queryKey: getLogoKey,
    queryFn: getLogo,
  });

  const {
    mutate,
    isPending,
  } = useApiSend<TLogo, FormData>(
    {
      mutationFn: uploadLogo,
    },
    { invalidateKeys: getLogoKey }
  );

  const uploadHandle = (imageFile: File) => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("logo", imageFile);
      mutate(formData);
    }
  };

  if (isLoading) return <SectionLoader className="min-h-[28rem]" />;

  return (
    <div className="w-full h-full flex items-center justify-center mt-8">
      <ImageUploader
        isLoading={isPending}
        uploadHandle={uploadHandle}
        imageUrl={data?.url}
        note="This is current logo, to change, choose new image, and upload, try png, background less image for better view."
      />
    </div>
  );
};

export default LogoMangeContainer;
