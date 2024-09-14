"use client";

import Button2 from "@/components/global/buttons/button2";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";
import { isSame } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  TService,
} from "@/lib/URL-services/services";
import {
  getPackagesKey,
  PackageTextsSchema,
  TPackage,
  updatePackageTexts,
} from "@/lib/URL-services/packages";
import AddFeatureField from "./add-feature-field";

type PackageTexts = z.infer<typeof PackageTextsSchema>;

interface PackageTextUpdateFormProps {
  packageTexts: PackageTexts;
  id: string;
}

const PackageTextUpdateForm: FC<PackageTextUpdateFormProps> = ({
  packageTexts,
  id,
}) => {

  const { toast } = useToast();

  const [initialPackageTexts, setInitialPackageTexts] =
    useState<PackageTexts>(packageTexts);

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<
    { package: TPackage<TService>; success: boolean },
    { id: string; data: PackageTexts }
  >(
    {
      mutationFn: updatePackageTexts,
    },
    {
      invalidateKeys: getPackagesKey.all,
    }
  );

  const form = useForm<PackageTexts>({
    resolver: zodResolver(PackageTextsSchema),
    defaultValues: initialPackageTexts,
  });

  const submitHandler = (data: PackageTexts) => {
    mutate({ id, data });
  };

  const cancelHandle = () => {
    form.reset(initialPackageTexts);
  };

  console.log({initialPackageTexts, packageTexts})

  const isUpdateAvailable = !isSame(initialPackageTexts, form.watch());

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
        description: "Package text updated successfully",
      });

      setInitialPackageTexts({
        title: mutatedData.package.title,
        description: mutatedData.package.description,
        features: mutatedData.package.features,
        price: {
          bdt: mutatedData.package.price.bdt,
          usd: mutatedData.package.price.usd,
        },
      });
    }
  }, [isError, error, isSuccess, mutatedData]);

  return (
    <div className="w-full h-full">
      <h1 className="text-primary text-lg lg:text-xl font-semibold tracking-wide">
        Text data
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            {/* TITLE FIELD */}
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Package title
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter package title"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* DESCRIPTION FIELD */}
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Description
                      </FormLabel>
                      <Textarea
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value || ""}
                        disabled={field.disabled}
                        placeholder="Write about this service"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* ADD FEATURE FIELD */}
            <div>
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Features [ What customer will get ]
                      </FormLabel>
                      <AddFeatureField
                        onChange={field.onChange}
                        initialFeatures={initialPackageTexts.features}
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* PRICE FIELD */}
            <div>
              <FormLabel className="lg:text-lg tracking-wide">
                Price of Package
              </FormLabel>
              <div className="flex gap-2">
                <div className="flex gap-2 items-end w-44">
                  <FormField
                    control={form.control}
                    name="price.bdt"
                    render={({ field }) => (
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));
                            }}
                            type="number"
                            className="lg:text-lg"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    )}
                  />
                  <p className="text-lg text-primary/80 font-semibold">BDT</p>
                </div>

                <div className="flex gap-2 items-end w-44">
                  <FormField
                    control={form.control}
                    name="price.usd"
                    render={({ field }) => (
                      <FormControl>
                        <div className="space-y-2">
                          <Input
                            {...field}
                            onChange={(e) => {
                              field.onChange(parseInt(e.target.value));
                            }}
                            type="number"
                            className="lg:text-lg"
                          />
                          <FormMessage />
                        </div>
                      </FormControl>
                    )}
                  />
                  <p className="text-lg text-primary/80 font-semibold">USD</p>
                </div>
              </div>
            </div>
          </div>
          {isUpdateAvailable ? (
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <Button2
                type="submit"
                title="Update Service Texts"
                disabled={isPending}
                className="rounded-lg w-1/2 lg:w-96"
                isLoading={isPending}
              />

              <Button2
                type="button"
                variant={"outline"}
                title="Cancel"
                onClick={cancelHandle}
                className="rounded-lg w-1/2 lg:w-96"
                disabled={isPending}
              />
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );
};

export default PackageTextUpdateForm;
