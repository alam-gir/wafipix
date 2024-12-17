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
import { SourceOfCustomers } from "@/data";

const ContactSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(20, { message: "Name must be at most 20 characters long" }),
  companyName: z
    .string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  sourceOfCustomer: z.string(),
  projectBudget: z.number({required_error: "Please provide project budget"}).gt(1).default(100),
  curreny: z.enum(["USD", "BDT"]).default("USD"),
  projectDetails: z
    .string()
    .min(10, { message: "Please provide project details." }),
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
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      sourceOfCustomer: "google",
      projectBudget: 100,
      curreny: "USD",
      projectDetails: "",
      isSubscribe: true,
    },
  });

  const submitHandle = (data: z.infer<typeof ContactSchema>) => {
    mutate({
      fullName: data?.fullName,
      companyName: data?.companyName,
      email: data?.email,
      phone: data?.phone,
      sourceOfCustomer: data?.sourceOfCustomer,
      projectBudget: data?.projectBudget,
      currency: data?.curreny,
      projectDetails: data?.projectDetails,
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

  const SourceOfCustomerSelectItems = SourceOfCustomers.map(item => {
    return <SelectItem
            key={item}
            className="text-lg lg:text-xl"
            value={item.toLowerCase()}
          >
            {item}
          </SelectItem>
  })

  return (
    <div className="h-full w-full max-w-screen-sm bg-white rounded-md p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandle)} className="space-y-8">
          <div className="space-y-6">
            {/* Name field */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="fullName">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                      {...field}
                      type="text"
                      placeholder="Jane Cooper"
                      id="fullName"
                      name="fullName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4">
              {/* Company Name field */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="companyName">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                      {...field}
                      type="text"
                      placeholder="Ex. Tesla Inc"
                      id="companyName"
                      name="companyName"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                        className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
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
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              
              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg lg:text-xl" htmlFor="phone">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                        {...field}
                        type="tel"
                        placeholder="8801234-56789"
                        id="phone"
                        name="phone"
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
                        <SelectTrigger className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0">
                          <SelectValue id="sourceOfCustomer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SourceOfCustomerSelectItems}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            
            <div className="grid grid-cols-2 gap-4">
              {/* Prjoject Budget field */}
            <FormField
              control={form.control}
              name="projectBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="projectBudget">
                    Project Budget
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                      {...field}
                      onChange={e => {
                        field.onChange(parseInt(e.target.value))
                      }}
                      type="number"
                      id="projectBudget"
                      name="projectBudget"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              {/* Currency field */}
              <FormField
                control={form.control}
                name="curreny"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="curreny"
                      className="text-lg lg:text-xl"
                    >
                      Currency
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0">
                          <SelectValue id="curreny" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="USD"
                        >
                          USD
                        </SelectItem>
                        <SelectItem
                          className="text-lg lg:text-xl"
                          value="BDT"
                        >
                          BDT
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Project details  field */}
            <FormField
              control={form.control}
              name="projectDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-xl" htmlFor="projectDetails">
                    Project Details
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
                      placeholder="Tell us about your project..."
                      {...field}
                      id="projectDetails"
                      name="projectDetails"
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
