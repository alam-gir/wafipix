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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button2 from "@/components/global/buttons/button2";
import ImageInput from "../image-input";
import TagInput from "../tag-input";
import { useApiSend } from "@/lib/reactQuery";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import SelectService from "./seletc-service";
import {
  addPortfolio,
  getPortfoliosKey,
  PortfolioSchema,
  TPortfolio,
} from "@/lib/URL-services/portfolios";

interface PortfolioAddFormProps {}

const PortfolioAddForm: FC<PortfolioAddFormProps> = ({}) => {
  const route = useRouter();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } = useApiSend<
    {
      success: boolean;
      portfolio: TPortfolio;
    },
    any
  >(
    {
      mutationFn: addPortfolio,
    },
    { invalidateKeys: getPortfoliosKey.all }
  );

  const form = useForm<z.infer<typeof PortfolioSchema>>({
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      title: "",
      tags: [],
      image: null,
      serviceId: "",
    },
  });

  const submitHandler = (data: z.infer<typeof PortfolioSchema>) => {
    mutate(data);
  };

  console.log({data, isPending, isError, isSuccess, error})
  
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
        description: "Portfolio added successfully",
      });

      // reset form && redirect to service view page
      route.push("/dashboard/portfolios/" + data?.portfolio?.slug);
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
                    Portfolio title
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter portfolio title"
                    className="lg:text-lg"
                  />
                  <FormMessage />
                </div>
              </FormControl>
            )}
          />
        </div>

        {/* TAGS FIELD */}
        <div>
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    Tags (optional)
                  </FormLabel>
                  <TagInput
                    onChangeHandle={(tags) => {
                      field.onChange(tags);
                    }}
                  />
                  <FormMessage />
                  <FormDescription className="lg:text-lg">
                    Tags will help to find portfolios easily. So enter relevant
                    tags.
                  </FormDescription>
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

        {/* IMAGE FIELD */}
        <div className="md:max-w-96 md:w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    Upload image [ Max size 1 MB ]
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
            title="Add Portfolio"
          />
        </div>
      </form>
    </Form>
  );
};

export default PortfolioAddForm;
