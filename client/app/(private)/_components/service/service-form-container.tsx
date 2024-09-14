"use client";
import { FC } from "react";
import ServiceTextUpdateForm from "./service-text-update-form";
import { useApiGet } from "@/lib/reactQuery";
import {
  getServiceBySlug,
  getServicesKey,
  TService,
} from "@/lib/URL-services/services";
import SectionLoader from "@/components/global/section-loader";
import NoContentField from "@/components/global/no-content";
import ServiceImageUpdateForm from "./service-image-update-form";
import ServiceIconUpdateForm from "./service-icon-update-form";
import ServiceActiveStatusUpdateForm from "./service-active-status-update-form";
import ServiceDeleteButton from "./service-delete-button";

interface ServiceFormContainerProps {
  slug: string;
}

const ServiceFormContainer: FC<ServiceFormContainerProps> = ({ slug }) => {
  const { isLoading, data } = useApiGet<TService>({
    queryKey: getServicesKey.bySlug(slug),
    queryFn: () => getServiceBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) return <SectionLoader className="min-h-96" />;
  if (!data) return NoContentField("No service found for - " + slug);
  return (
    <div className="flex flex-col gap-16">
      <ServiceTextUpdateForm
        serviceTexts={{
          title: data.title,
          tags: data.tags,
          description: data.description,
        }}
        id={data?._id}
      />
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-0">
        <ServiceImageUpdateForm
          image_url={data?.image.secure_url}
          id={data?._id}
        />
        <ServiceIconUpdateForm
          icon_url={data?.icon.secure_url}
          id={data?._id}
        />
      </div>
      <ServiceActiveStatusUpdateForm
        status={data?.is_active}
        id={data?._id}
      />

      <ServiceDeleteButton id={data?._id} />
    </div>
  );
};

export default ServiceFormContainer;
