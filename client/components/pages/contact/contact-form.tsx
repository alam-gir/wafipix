"use client";

import { FC, useEffect, useState } from "react";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MoveRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import ContactMessageSentDialog from "./contact-message-sent-dialog";
import { useApiSend } from "@/lib/reactQuery";
import { sendContactMail, TEmailForm } from "@/lib/URL-services/email";
import Button2 from "@/components/global/buttons/button2";

const ContactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  zipCode: z.string({ message: "Zip code is required" }).min(1),
  sourceOfCustomer: z.string(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
  isSubscribe: z.boolean().default(true),
});

interface ContactFormProps {}

const ContactForm: FC<ContactFormProps> = ({}) => {
  const [isSent, setSent] = useState<boolean>(false);

  const { toast } = useToast();


  const {
    mutate,
    data: mutateData,
    isSuccess,
    isPending,
    isError,
    error,
  } = useApiSend<{ success: boolean; message: string }, TEmailForm>({
    mutationFn: sendContactMail,
  });

  const form = useForm<z.infer<typeof ContactSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      zipCode: "",
      sourceOfCustomer: "google",
      message: "",
      isSubscribe: true,
    },
  });

  const submitHandle = (data: z.infer<typeof ContactSchema>) => {
    console.log(data);
    mutate({
      name: data?.name,
      email: data?.email,
      phone: data?.phone,
      zipCode: data?.zipCode,
      sourceOfCustomer: data?.sourceOfCustomer,
      message: data?.message,
      isSubscribe: data?.isSubscribe,
    });
  };

  const onOpenChange = (value: boolean) => setSent(value);

  // mutate response
  useEffect(() => {
    if (isSuccess && mutateData?.success) {
      setSent(true);
      form.reset();
    }
    if (
      (isError && error?.message) ||
      (!mutateData?.success && mutateData?.message)
    ) {
      toast({
        title: "Failed to send message.",
        description: error?.message || mutateData?.message,
        variant: "destructive"
      });
    }
  }, [isSuccess, mutateData, form, isError, error, toast]);

  return (
    <div className="h-full w-full max-w-screen-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandle)} className="space-y-6">
          <div className="space-y-4">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="name">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-lg lg:text-xl"
                      {...field}
                      type="text"
                      placeholder="First name & Last name"
                      id="name"
                      name="name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg lg:text-xl" htmlFor="email">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-lg lg:text-xl"
                        {...field}
                        type="email"
                        placeholder="example@mail.com"
                        id="email"
                        name="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg lg:text-xl" htmlFor="phone">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-lg lg:text-xl"
                        {...field}
                        type="tel"
                        placeholder="01***********"
                        id="phone"
                        name="phone"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              {/* Zip code field */}
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg lg:text-xl" htmlFor="zipCode">
                      Zip Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-lg lg:text-xl"
                        {...field}
                        type="tel"
                        placeholder="54321"
                        id="zipCode"
                        name="zipCode"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SourceOfCustomer  option field */}
              <FormField
                control={form.control}
                name="sourceOfCustomer"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="sourceOfCustomer"
                      className="text-lg lg:text-xl"
                    >
                      Where did you find us?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-lg lg:text-xl">
                          <SelectValue id="sourceOfCustomer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="google"
                        >
                          From google.
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="youtube"
                        >
                          From youtube.
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="facebook"
                        >
                          From facebook.
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="instagram"
                        >
                          From instagram.
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="twitter"
                        >
                          From twitter.
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="others"
                        >
                          From other sources.
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* message  field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="message">
                    Message
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-lg lg:text-xl"
                      placeholder="Tell us what you're looking for..."
                      {...field}
                      id="message"
                      name="message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* isSubscribe checkbox field */}
            <FormField
              control={form.control}
              name="isSubscribe"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-1 leading-none flex gap-2 items-center">
                    <FormControl>
                      <Checkbox
                        className="text-lg lg:text-xl"
                        defaultChecked={form.getValues("isSubscribe") as any}
                        value={field.value as any}
                        onCheckedChange={field.onChange}
                        id="isSubscribe"
                        name="isSubscribe"
                      >
                        Subscribe to our newsletter.
                      </Checkbox>
                    </FormControl>
                    <FormLabel className="text-lg lg:text-xl">
                      Stay up to do date on all things prop.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit Button */}
          <div className="pt-6">
            <Button2
              title="Send Message"
              icon={
                <MoveRight className="h-4 w-4 group-hover:ml-2 duration-300" />
              }
              size={"lg"}
              className="w-full text-lg lg:text-xl"
              type="submit"
              disabled={isPending}
              isLoading={isPending}
              loadingText="Sending..."
            />
          </div>
        </form>
      </Form>
      <ContactMessageSentDialog open={isSent} onOpenChange={onOpenChange} />
    </div>
  );
};

export default ContactForm;
