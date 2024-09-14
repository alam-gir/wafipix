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
import ImageInput from "../image-input";
import {
  addSocialInfo,
  getSocialInfoQueryKey,
  SocialInfoSchema,
  TSocialInfo,
} from "@/lib/URL-services/social-info";

interface SocialInfoAddFormProps {}

const SocialInfoAddForm: FC<SocialInfoAddFormProps> = ({}) => {
  const route = useRouter();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } = useApiSend<
    {
      success: boolean;
      topCustomer: TSocialInfo;
    },
    any
  >(
    {
      mutationFn: addSocialInfo,
    },
    { invalidateKeys: getSocialInfoQueryKey }
  );

  const form = useForm<z.infer<typeof SocialInfoSchema>>({
    resolver: zodResolver(SocialInfoSchema),
    defaultValues: {
      title: "",
      url: "",
      icon: null,
    },
  });

  const submitHandler = (data: z.infer<typeof SocialInfoSchema>) => {
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
        description: "Social media added successfully",
      });

      // reset form && redirect to customer view page
      route.push("/dashboard/social-info/" + data?.topCustomer?._id);
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
                    Social Media Name
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter social media name"
                    className="lg:text-lg"
                  />
                  <FormMessage />
                </div>
              </FormControl>
            )}
          />
        </div>

        {/* URL FIELD */}
        <div>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    URL
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Example: https://www.facebook.com"
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
            name="icon"
            render={({ field }) => (
              <FormControl>
                <div className="space-y-2">
                  <FormLabel className="lg:text-lg tracking-wide">
                    Upload icon [ Max size 1 MB ]
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

export default SocialInfoAddForm;
