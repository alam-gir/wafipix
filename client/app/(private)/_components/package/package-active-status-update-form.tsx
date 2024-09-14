"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useApiSend } from "@/lib/reactQuery";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import {
  TService,
} from "@/lib/URL-services/services";
import { Checkbox } from "@/components/ui/checkbox";
import { getPackagesKey, PackageActiveStatusSchema, TPackage, updatePackageActiveStatus } from "@/lib/URL-services/packages";

type PackageActiveStatus = z.infer<typeof PackageActiveStatusSchema>;

interface PackageActiveStatusUpdateFormProps {
  status: boolean;
  id: string;
}

const PackageActiveStatusUpdateForm: FC<PackageActiveStatusUpdateFormProps> = ({
  status,
  id,
}) => {

  const { toast } = useToast();

  const [initialStatus, setInitialStatus] = useState<boolean>(status);

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<
    { package: TPackage<TService>; success: boolean },
    { id: string; status: boolean }
  >(
    {
      mutationFn: updatePackageActiveStatus,
    },
    {
      invalidateKeys: getPackagesKey.all,
    }
  );

  const form = useForm<PackageActiveStatus>({
    resolver: zodResolver(PackageActiveStatusSchema),
    defaultValues: {
      is_active: initialStatus,
    },
  });

  const submitHandler = (status: boolean) => {
    mutate({ id, status });
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
        description: "Package status updated successfully",
      });

      setInitialStatus(mutatedData.package.is_active);
    }

    if (isPending) {
      toast({
        title: "Updating",
        description: "Package status is updating...",
      });
    }
  }, [isError, error, isSuccess, mutatedData, isPending]);

  return (
    <div className="w-full h-full">
      <h1 className="text-primary text-lg lg:text-xl font-semibold tracking-wide">
        Status
      </h1>
      <Form {...form}>
        <form className="flex flex-col gap-4">
          {/* CHECKBOX */}
          <div>
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormControl>
                  <div className="space-y-2">
                    <div className=" flex items-center gap-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Active
                      </FormLabel>
                      <Checkbox
                        className="text-lg lg:text-xl"
                        checked={form.getValues("is_active")}
                        onCheckedChange={(status: boolean) => {
                          field.onChange(status);
                          submitHandler(status);
                        }}
                        id="is_active"
                        name="is_active"
                      >
                        Active
                      </Checkbox>
                      <FormMessage />
                    </div>
                    <FormDescription className="lg:text-lg">
                      If unchecked, this package will not be visible to users.
                    </FormDescription>
                  </div>
                </FormControl>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PackageActiveStatusUpdateForm;
