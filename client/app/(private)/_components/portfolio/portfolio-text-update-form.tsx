"use client";

import Button2 from "@/components/global/buttons/button2";
import {
  Form,
  FormControl,
  FormDescription,
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
import TagInput from "../tag-input";
import { useRouter } from "next/navigation";
import {
  getPortfoliosKey,
  PortfolioTextsSchema,
  TPortfolio,
  updatePortfolioTexts,
} from "@/lib/URL-services/portfolios";

type PortfolioTexts = z.infer<typeof PortfolioTextsSchema>;

interface PortfolioTextUpdateFormProps {
  portfolioTexts: PortfolioTexts;
  id: string;
}

const PortfolioTextUpdateForm: FC<PortfolioTextUpdateFormProps> = ({
  portfolioTexts,
  id,
}) => {
  const router = useRouter();

  const { toast } = useToast();

  const [initialPortfolioTexts, setInitialPortfolioTexts] =
    useState<PortfolioTexts>(portfolioTexts);

  const {
    mutate,
    isPending,
    data: mutatedData,
    isError,
    error,
    isSuccess,
  } = useApiSend<
    { portfolio: TPortfolio; success: boolean },
    { id: string; data: PortfolioTexts }
  >(
    {
      mutationFn: updatePortfolioTexts,
    },
    {
      invalidateKeys: getPortfoliosKey.all,
    }
  );

  const form = useForm<PortfolioTexts>({
    resolver: zodResolver(PortfolioTextsSchema),
    defaultValues: initialPortfolioTexts,
  });

  const submitHandler = (data: PortfolioTexts) => {
    mutate({ id, data });
  };

  const cancelHandle = () => {
    form.reset(initialPortfolioTexts);
  };

  const isUpdateAvailable = !isSame(initialPortfolioTexts, form.watch());

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
        description: "Portfolio text updated successfully",
      });

      setInitialPortfolioTexts({
        title: mutatedData.portfolio.title,
        tags: mutatedData.portfolio.tags,
      });

      router.push(`/dashboard/portfolios/${mutatedData.portfolio.slug}`);
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
                        initialTags={field.value}
                      />
                      <FormMessage />
                      <FormDescription className="lg:text-lg">
                        Tags will help to find portfolios easily. So enter
                        relevant tags.
                      </FormDescription>
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

export default PortfolioTextUpdateForm;
