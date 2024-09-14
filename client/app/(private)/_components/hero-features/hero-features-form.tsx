"use client";

import Button2 from "@/components/global/buttons/button2";
import NoContentField from "@/components/global/no-content";
import SectionLoader from "@/components/global/section-loader";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useApiGet, useApiSend } from "@/lib/reactQuery";
import {
  getHeroFeatures,
  getHeroFeaturesQueryKey,
  updateHeroFeatures,
} from "@/lib/URL-services/hero-features";
import { X } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";

interface HeroFeaturesFormProps {}

const HeroFeaturesForm: FC<HeroFeaturesFormProps> = ({}) => {
  const { toast } = useToast();

  const ref = useRef<HTMLInputElement>(null);

  const [features, setFeatures] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");

  const { data, isLoading } = useApiGet<string[]>({
    queryKey: getHeroFeaturesQueryKey,
    queryFn: getHeroFeatures,
  });

  const {
    mutate,
    isPending,
    data: mutedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<{ success: boolean; features: string[] }, string[]>(
    {
      mutationFn: updateHeroFeatures,
    },
    {
      invalidateKeys: getHeroFeaturesQueryKey,
    }
  );

  const onUpdate = () => {
    mutate(features)
  }

  const removeHandle = (i: number) => {
    const newFeatures = features.filter((_, index) => index !== i);
    setFeatures(newFeatures);
  };

  const addHandle = (feature: string) => {
    const newFeatures = [...features];

    if (!feature) return;

    if (!newFeatures.includes(feature)) {
      newFeatures.push(feature);

      if (ref.current) {
        ref.current.value = "";
      }
    }
    setFeatures(newFeatures);
  };

  const cancelHandle = () => {
    if (data?.length) setFeatures(data);
    else setFeatures([]);
  };

  const changeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setValue(target.value);
  };

  const isUpdateAvailable = JSON.stringify(data) !== JSON.stringify(features);

  // RESULT EFFECT
  useEffect(() => {
    if (data?.length) setFeatures(data);
    if (isError) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
    if (isSuccess && mutedData?.success) {
      toast({
        title: "Updated",
        description: "Features updated successfully",
      });
    }
  }, [isError, error, isSuccess, data]);

  if (isLoading) return <SectionLoader className="min-h-96" />;

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center mt-8">
      <div className="space-y-6">
        <div className="space-y-1">
          {data?.length
            ? features?.map((feature, i) => (
                <FeatureItem
                  key={i}
                  feature={feature}
                  onRemove={() => removeHandle(i)}
                />
              ))
            : NoContentField("No features found.")}
        </div>
        <div className="flex gap-3">
          <Input
            ref={ref}
            onChange={changeHandle}
            type="text"
            placeholder="Add a feature"
            className="flex-grow lg:text-lg"
          />
          <Button2
            type="button"
            title="Add"
            onClick={() => addHandle(value)}
            className="rounded"
          />
        </div>
      </div>
      {isUpdateAvailable ? (
        <div className="w-full flex flex-col items-center justify-center gap-3">
          <Button2
            type="button"
            title="Update"
            onClick={onUpdate}
            disabled={isLoading || isPending}
            className="rounded-lg w-1/2 lg:w-96"
            isLoading={isPending}
          />

          <Button2
            type="button"
            variant={"outline"}
            title="Cancel"
            onClick={cancelHandle}
            className="rounded-lg w-1/2 lg:w-96"
            disabled={isLoading || isPending}
          />
        </div>
      ) : null}
    </div>
  );
};

export default HeroFeaturesForm;

const FeatureItem = ({
  feature,
  onRemove,
}: {
  feature: string;
  onRemove: () => void;
}) => {
  return (
    <div className="flex items-center justify-between bg-white border-primary/20 border text-primary p-2 rounded lg:rounded-lg">
      <div className="flex items-center gap-2">
        <p className="lg:text-lg text-primary">{feature}</p>
      </div>

      <X
        onClick={onRemove}
        className="w-5 h-5 cursor-pointer hover:text-primary/80 text-primary duration-300"
      />
    </div>
  );
};
