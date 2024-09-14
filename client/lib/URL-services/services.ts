import { request } from "../axios";
import * as z from "zod";

// Schemas ---------------
export const ServiceSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  tags: z.array(z.string()).default([]),
  description: z.string().nullable(),
  image: z
    .any()
    .refine((file) => file instanceof File && file?.type?.includes("image/"), {
      message: "Please upload a valid image",
    })
    .refine((file) => file?.size < 1000000, {
      message: "Image size should be less than 1 MB",
    }),
  icon: z
    .any()
    .refine((file) => file instanceof File && file?.type?.includes("image/"), {
      message: "Please upload a valid icon",
    })
    .refine((file) => file?.size < 500000, {
      message: "Icon size should be less than 0.5 MB",
    }),
  is_active: z.boolean().default(true),
});

export const ServiceTextsSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  tags: z.array(z.string()).default([]),
  description: z.string().default(""),
});

export const ServiceActiveStatusSchema = z.object({
  is_active: z.boolean().default(true),
});

// -----------type------------

export type TImage = {
  _id: string;
  secure_url: string;
  public_id: string;
};

export type TService = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  is_active: boolean;
  description: string;
  image: TImage;
  icon: TImage;
};

// Get all services ---------------

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  filter?: "all" | "active" | "inactive";
  q?: string;
}

export const getServices = async (options?: props) => {
  return await request({
    url: "/services",
    method: "GET",
    params: options,
  });
};

export const getServicesKey = {
  services: ["services"],
  image: ["services", "services-image"],
  icon: ["services", "services-icon"],
  all: ["services", "services-icon", "services-image", "services-slug"],
  withFilter: (keys: string[]) => ["service", "services-filtered", ...keys],
  bySlug: (slug: string) => ["services", "services-slug", slug],
};

// -----------by slug ------------

export const getServiceBySlug = async (slug: string) => {
  return await request({
    url: `/services/findbyslug/${slug}`,
    method: "GET",
  });
};

// -----------add------------

export const addService = async (data: z.infer<typeof ServiceSchema>) => {
  const validatedData = ServiceSchema.parse(data);

  if (!validatedData) return;

  const formData = new FormData();

  formData.append("title", validatedData.title);
  validatedData.tags.forEach((tag) => {
    formData.append("tags", tag);
  });
  if (validatedData?.description)
    formData.append("description", validatedData.description);
  formData.append("is_active", validatedData.is_active.toString());
  formData.append("image", validatedData.image);
  formData.append("icon", validatedData.icon);

  return await request({
    url: "/services",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};

// -----------update------------
export const updateServiceTexts = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof ServiceTextsSchema>;
}) => {
  const validatedData = ServiceTextsSchema.parse(data);

  if (!validatedData) return;

  return await request({
    url: `/services/${id}/update/texts`,
    method: "PATCH",
    data: validatedData,
    withCredentials: true,
  });
};

export const updateServiceImage = async ({
  id,
  image,
}: {
  id: string;
  image: File;
}) => {
  if (!image) return;
  const formData = new FormData();
  formData.append("image", image);

  return await request({
    url: `/services/${id}/update/image`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};

export const updateServiceIcon = async ({
  id,
  icon,
}: {
  id: string;
  icon: File;
}) => {
  if (!icon) return;
  const formData = new FormData();
  formData.append("icon", icon);

  return await request({
    url: `/services/${id}/update/icon`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};

export const updateServiceActiveStatus = async ({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) => {
  const validatedData = ServiceActiveStatusSchema.parse({ is_active: status });
  return await request({
    url: `/services/${id}/update/active-status`,
    method: "PATCH",
    data: validatedData,
    withCredentials: true,
  });
};


// -----------delete------------

export const deleteService = async (id: string) => {
  return await request({
    url: `/services/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};