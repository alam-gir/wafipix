import { request } from "../axios";
import * as z from "zod";

export const getTopCustomers = async () => {
  return request({
    url: "/top-customers",
    method: "GET",
  });
};

export const getTopCustomersKey = ["top-customers"];

export type TTopCustomers = {
  _id: string;
  title: string;
  logo_url: string;
  public_id: string;
};

//----------------deleteTopCustomer.ts----------------

export const deleteTopCustomer = async (id: string) => {
  return request({
    url: `/top-customers/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};

// -----------add------------

export const TopCustomerSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  logo: z
    .any()
    .refine((file) => file instanceof File && file?.type?.includes("image/"), {
      message: "Please upload a valid image",
    })
    .refine((file) => file?.size < 1000000, {
      message: "Image size should be less than 1 MB",
    }),
});

export const addTopCustomer = async (
  data: z.infer<typeof TopCustomerSchema>
) => {
  const validatedData = TopCustomerSchema.parse(data);

  if (!validatedData) return;

  const formData = new FormData();

  formData.append("title", validatedData.title);
  formData.append("logo", validatedData.logo);

  return await request({
    url: "/top-customers",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};
