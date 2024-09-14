"use client";
import { FC } from "react";
import { useApiGet } from "@/lib/reactQuery";
import { TService } from "@/lib/URL-services/services";
import SectionLoader from "@/components/global/section-loader";
import NoContentField from "@/components/global/no-content";
import {
  getPackagesById,
  getPackagesKey,
  TPackage,
} from "@/lib/URL-services/packages";
import PackageTextUpdateForm from "./package-text-update-form";
import PackageActiveStatusUpdateForm from "./package-active-status-update-form";
import PackageDeleteButton from "./package-delete-button";

interface PackageFormContainerProps {
  id: string;
}

const PackageFormContainer: FC<PackageFormContainerProps> = ({ id }) => {
  const { isLoading, data } = useApiGet<TPackage<TService>>({
    queryKey: getPackagesKey.byId(id),
    queryFn: () => getPackagesById(id),
    enabled: !!id,
  });

  console.log(data);

  if (isLoading) return <SectionLoader className="min-h-96" />;
  if (!data) return NoContentField("No package found for package id - " + id);
  return (
    <div className="flex flex-col gap-16">
      <PackageTextUpdateForm
        packageTexts={{
          title: data?.title,
          description: data?.description,
          features: data?.features,
          price: {
            bdt: data?.price?.bdt,
            usd: data?.price?.usd,
          },
        }}
        id={data?._id}
      />
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-0">
        {/* <PackageImageUpdateForm
          image_url={data?.image.secure_url}
          id={data?._id}
        />
        <PackageIconUpdateForm
          icon_url={data?.icon.secure_url}
          id={data?._id}
        /> */}
      </div>
      <PackageActiveStatusUpdateForm
        status={data?.is_active}
        id={data?._id}
      />

      <PackageDeleteButton id={data?._id} />
    </div>
  );
};

export default PackageFormContainer;
