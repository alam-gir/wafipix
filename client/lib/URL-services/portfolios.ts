import { request } from "../axios";
import * as z from "zod";
import { TImage } from "./services";

// ----------------schemas----------------

export const PortfolioSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  tags: z.array(z.string()).default([]),
  image: z
    .any()
    .refine((file) => file instanceof File && file?.type?.includes("image/"), {
      message: "Please upload a valid image",
    })
    .refine((file) => file?.size < 1000000, {
      message: "Image size should be less than 1 MB",
    }),
  serviceId: z.string().min(1, "Please select a service"),
});

export const PortfolioTextsSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  tags: z.array(z.string()).default([]),
});

// ----------------type----------------

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  q?: string;
}

// get keys ----------------

export const getPortfoliosKey = {
  portfolios: ["portfolios"],
  image: ["portfolios", "portfolios-image"],
  all: [
    "portfolios",
    "portfolios-image",
    "portfolios-slug",
    "portfolios-serviceId",
    "portfolios-filtered",
  ],
  withFilter: (keys: string[]) => [
    "portfolios",
    "portfolios-filtered",
    ...keys,
  ],
  bySlug: (slug: string) => ["portfolios", "portfolios-slug", slug],
  byServiceId: (serviceId: string) => [
    "portfolios",
    "portfolios-serviceId",
    serviceId,
  ],
};

// Get all portfolios ---------------

export const getPortfolios = async (options?: props) => {
  return await request({
    url: "/portfolios",
    method: "GET",
    params: options,
  });
};

export type TPortfolio = {
  _id: string;
  title: string;
  tags: string[];
  slug: string;
  image: TImage;
  service: string;
};

// by serviceId ------------

export const getPortfoliosByServiceId = async (
  serviceId: string,
  options?: props
) => {
  return await request({
    url: `/portfolios/findbyserviceid/${serviceId}`,
    method: "GET",
    params: options,
  });
};

export type TPaginate = {
  currentPage: number;
  from: number;
  to: number;
  total: number;
  totalPages: number;
};

// find by slug----------

export const getPortfolioBySlug = async (slug: string) => {
  return await request({
    url: `/portfolios/findbyslug/${slug}`,
    method: "GET",
  });
};

// -----------add------------

export const addPortfolio = async (data: z.infer<typeof PortfolioSchema>) => {
  const validatedData = PortfolioSchema.parse(data);

  if (!validatedData) return;

  const formData = new FormData();

  formData.append("title", validatedData.title);
  validatedData.tags.forEach((tag) => formData.append("tags", tag));
  formData.append("serviceId", validatedData.serviceId);
  formData.append("image", validatedData.image);

  return await request({
    url: "/portfolios",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};

// ------------update------------

export const updatePortfolioTexts = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof PortfolioTextsSchema>;
}) => {
  const validatedData = PortfolioTextsSchema.parse(data);

  if (!validatedData) return;

  return await request({
    url: `/portfolios/${id}/update/texts`,
    method: "PATCH",
    data: validatedData,
    withCredentials: true,
  });
};

export const updatePortfolioImage = async ({
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
    url: `/portfolios/${id}/update/image`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};

// -----------delete------------

export const deletePortfolio = async (id: string) => {
  return await request({
    url: `/portfolios/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};
