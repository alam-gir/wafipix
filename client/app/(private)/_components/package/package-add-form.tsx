"use client";

import { FC, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button2 from "@/components/global/buttons/button2";
import { Checkbox } from "@/components/ui/checkbox";
import { useApiSend } from "@/lib/reactQuery";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  addPackage,
  getPackagesKey,
  PackageSchema,
  TPackage,
} from "@/lib/URL-services/packages";
import SelectService from "../portfolio/seletc-service";
import AddFeatureField from "./add-feature-field";

interface PackageAddFormProps {}

const PackageAddForm: FC<PackageAddFormProps> = ({}) => {
  const route = useRouter();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } = useApiSend<
    {
      success: boolean;
      package: TPackage<string>;
    },
    any
  >(
    {
      mutationFn: addPackage,
    },
    { invalidateKeys: getPackagesKey.all }
  );

  const form = useForm<z.infer<typeof PackageSchema>>({
    resolver: zodResolver(PackageSchema),
    defaultValues: {
      title: "",
      description: "",
      serviceId: "",
      is_active: true,
    },
  });

  const submitHandler = (data: z.infer<typeof PackageSchema>) => {
    mutate(data);
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
    if (isSuccess && data?.success) {
      toast({
        title: "Success",
        description: "Package added successfully",
      });

      // reset form && redirect to service view page
      route.push("/dashboard/packages/" + data?.package?._id);
      form.reset();
    }
  }, [isError, error, isSuccess, data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4"
      >
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

        {/* SELECT SERVICE FIELD */}
        <div>
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    Select a service
                  </FormLabel>
                  <SelectService
                    onSelectHandle={(serviceId) => {
                      field.onChange(serviceId);
                    }}
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
                  <AddFeatureField onChange={field.onChange} />
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
                      onCheckedChange={field.onChange}
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

        <div>
          <Button2
            size={"lg"}
            isLoading={isPending}
            disabled={isPending}
            className="w-full lg:max-w-96"
            type="submit"
            title="Add Package"
          />
        </div>
      </form>
    </Form>
  );
};

export default PackageAddForm;
