"use client";

import Button2 from "@/components/global/buttons/button2";
import SectionLoader from "@/components/global/section-loader";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useApiGet, useApiSend } from "@/lib/reactQuery";
import {
  updateContactInfo,
  ContactInfoSchema,
  getContactInfo,
  getContactInfoKey,
} from "@/lib/URL-services/contact-info";
import { isObjectSame } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";

type ContactInfo = z.infer<typeof ContactInfoSchema>;

interface ContactInfoFormProps {}

const ContactInfoForm: FC<ContactInfoFormProps> = ({}) => {
  const { toast } = useToast();

  const [contactInfo, setContactInfo] = useState<ContactInfo>();

  const { data, isLoading } = useApiGet<ContactInfo>({
    queryKey: getContactInfoKey,
    queryFn: getContactInfo,
  });

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<{ contactInfo: ContactInfo; success: boolean }, ContactInfo>(
    {
      mutationFn: updateContactInfo,
    },
    {
      invalidateKeys: getContactInfoKey,
    }
  );

  const cancelHandle = () => {
    if (data) setContactInfo(data);
  };

  const form = useForm<ContactInfo>({
    resolver: zodResolver(ContactInfoSchema),
    defaultValues: contactInfo,
  });

  const submitHandler = (data: ContactInfo) => {
    mutate(data);
  };

  const initialContactData = {
    country: data?.country!,
    city: data?.city!,
    area: data?.area!,
    email: data?.email!,
    phone: data?.phone!,
  };

  const isUpdateAvailable = !isObjectSame({
    obj1: initialContactData,
    obj2: form.watch(),
  });

  // RESULT EFFECT
  useEffect(() => {
    if (data) {
      form.setValue("country", data.country);
      form.setValue("city", data.city);
      form.setValue("area", data.area);
      form.setValue("email", data.email);
      form.setValue("phone", data.phone);
    }
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
        description: "Contact info updated successfully",
      });
    }
  }, [isError, error, isSuccess, data, isLoading, mutatedData]);

  if (isLoading) return <SectionLoader className="min-h-96" />;

  return (
    <div className="w-full h-full flex flex-col gap-3 items-center justify-center mt-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-4">
            {/* COUNTRY FIELD */}
            <div>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Country
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Country"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* CITY FIELD */}
            <div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Country
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter City"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* AREA FIELD */}
            <div>
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Area
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Area"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* EMAIL FIELD */}
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Email
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Email"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>

            {/* PHONE FIELD */}
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormControl>
                    <div className="space-y-2">
                      <FormLabel className="lg:text-lg tracking-wide">
                        Phone
                      </FormLabel>
                      <Input
                        {...field}
                        placeholder="Enter Phone"
                        className="lg:text-lg"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                )}
              />
            </div>
          </div>
          {isUpdateAvailable ? (
            <div className="w-full flex flex-col items-center justify-center gap-3">
              <Button2
                type="submit"
                title="Update"
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
        </form>
      </Form>
    </div>
  );
};

export default ContactInfoForm;

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
