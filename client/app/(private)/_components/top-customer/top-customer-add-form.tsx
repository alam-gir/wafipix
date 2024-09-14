"use client";

import { ChangeEvent, FC, useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button2 from "@/components/global/buttons/button2";
import { useApiSend } from "@/lib/reactQuery";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

import {
  addTopCustomer,
  getTopCustomersKey,
  TopCustomerSchema,
  TTopCustomers,
} from "@/lib/URL-services/top-customers";
import ImageInput from "../image-input";

interface TopCustomerAddFormProps {}

const TopCustomerAddForm: FC<TopCustomerAddFormProps> = ({}) => {
  const route = useRouter();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } = useApiSend<
    {
      success: boolean;
      topCustomer: TTopCustomers;
    },
    any
  >(
    {
      mutationFn: addTopCustomer,
    },
    { invalidateKeys: getTopCustomersKey }
  );

  const form = useForm<z.infer<typeof TopCustomerSchema>>({
    resolver: zodResolver(TopCustomerSchema),
    defaultValues: {
      title: "",
      logo: null,
    },
  });

  const submitHandler = (data: z.infer<typeof TopCustomerSchema>) => {
    mutate(data);
  };

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
        description: "Top customer added successfully",
      });

      // reset form && redirect to customer view page
      route.push("/dashboard/top-customers/" + data?.topCustomer?._id);
      form.reset();
    }
  }, [isError, error, isSuccess, data]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className="flex flex-col gap-4 mt-8"
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
                    Customer title
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter customer name"
                    className="lg:text-lg"
                  />
                  <FormMessage />
                </div>
              </FormControl>
            )}
          />
        </div>

        {/* IMAGE FIELD */}
        <div className="md:max-w-96 md:w-full">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    Upload logo [ Max size 1 MB ]
                  </FormLabel>
                  <ImageInput
                    isLoading={false}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (!e.target.files) return;
                      field.onChange(e.target.files[0]);
                    }}
                    onBlur={field.onBlur}
                    isDisabled={field.disabled}
                    disabled={field.disabled}
                  />
                  <FormMessage />
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
            title="Add Top Customer"
          />
        </div>
      </form>
    </Form>
  );
};

export default TopCustomerAddForm;
