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
import { Textarea } from "@/components/ui/textarea";
import Button2 from "@/components/global/buttons/button2";
import ImageInput from "../image-input";
import { Hexagon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import TagInput from "../tag-input";
import { useApiSend } from "@/lib/reactQuery";
import {
  addService,
  getServicesKey,
  ServiceSchema,
  TService,
} from "@/lib/URL-services/services";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface ServiceAddFormProps {}

const ServiceAddForm: FC<ServiceAddFormProps> = ({}) => {
  const route = useRouter();

  const { toast } = useToast();

  const { mutate, data, isSuccess, isPending, isError, error } = useApiSend<
    {
      success: boolean;
      service: TService;
    },
    any
  >(
    {
      mutationFn: addService,
    },
    { invalidateKeys: getServicesKey.all }
  );

  const form = useForm<z.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      title: "",
      tags: [],
      description: "",
      image: null,
      icon: null,
      is_active: true,
    },
  });

  const submitHandler = (data: z.infer<typeof ServiceSchema>) => {
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
        description: "Service added successfully",
      });

      // reset form && redirect to service view page
      route.push("/dashboard/services/" + data?.service?.slug);
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
                    Service title
                  </FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter service title"
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
                    Tags will help to find services easily. So enter relevant
                    tags.
                  </FormDescription>
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

        <div className="md:flex gap-4">
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

          {/* ICON FIELD */}
          <div className="w-24 lg:w-28 h-auto">
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormControl>
                  <div className="space-y-2">
                    <FormLabel className="lg:text-lg tracking-wide">
                      Upload icon
                    </FormLabel>
                    <ImageInput
                      isLoading={false}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (!e.target.files) return;
                        field.onChange(e.target.files[0]);
                      }}
                      selectText="Icon"
                      icon={<Hexagon />}
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
                    If unchecked, this service will not be visible to users.
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
            title="Add Service"
          />
        </div>
      </form>
    </Form>
  );
};

export default ServiceAddForm;
