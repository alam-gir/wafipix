import { request } from "../axios";

import * as z from "zod";

// schemas ----------------

export const PackageSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is too short" })
    .max(255, { message: "Title is too long" }),
  description: z.string().nullable(),
  serviceId: z.string().min(1, "Service is required"),
  features: z.array(z.string(), { message: "Features is required" }),
  price: z.object({
    bdt: z.number().int().positive(),
    usd: z.number().int().positive(),
  }),
  is_active: z.boolean().default(true),
});

export const PackageTextsSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title is too short" })
    .max(255, { message: "Title is too long" }),
  description: z.string().nullable(),
  features: z.array(z.string(), { message: "Features is required" }),
  price: z.object({
    bdt: z.number().int().positive(),
    usd: z.number().int().positive(),
  }),
});

export const PackageActiveStatusSchema = z.object({
  is_active: z.boolean().default(true),
});


// types ----------------

interface props {
  limit?: number;
  page?: number;
  sort?: "asc" | "desc";
  populate?: string;
  filter?: "all" | "active" | "inactive";
  q?: string;
}

export type TPackage<TService> = {
  _id: string;
  title: string;
  description: string;
  service: TService;
  is_active: true;
  price: {
    bdt: number;
    usd: number;
  };
  features: string[];
};

// get keys ----------------
export const getPackagesKey = {
  packages: ["packages"],
  service: ["packages", "packages-service"],
  all: [
    "packages",
    "packages-service",
    "packages-filtered",
    "packages-serviceId",
  ],
  withFilter: (keys: string[]) => ["service", "packages-filtered", ...keys],
  byId: (serviceId: string) => {
    return ["packages", "packages-id", serviceId];
  },
  byServiceId: (serviceId: string) => {
    return ["packages", "packages-serviceId", serviceId];
  },
};

// get all packages ----------------
export const getPackages = async (options?: props) => {
  return await request({
    url: "/packages",
    method: "GET",
    params: options,
  });
};

// --------- get package by id--------

export const getPackagesById = async (id: string) => {
  return await request({
    url: `/packages/${id}`,
    method: "GET",
  });
};


// -----------by serviceId ------------

export const getPackagesByServiceId = async (serviceId: string) => {
  return await request({
    url: `/packages/findbyserviceid/${serviceId}`,
    method: "GET",
  });
};

// -----------add------------

export const addPackage = async (data: z.infer<typeof PackageSchema>) => {
  const validatedData = PackageSchema.parse(data);

  if (!validatedData) return;

  return await request({
    url: "/packages",
    method: "POST",
    data: validatedData,
    withCredentials: true,
  });
};

// -----------update------------

//----------- text update ------------

export const updatePackageTexts = async ({
  id,
  data,
}: {
  id: string;
  data: z.infer<typeof PackageTextsSchema>;
}) => {
  const validatedData = PackageTextsSchema.parse(data);

  if (!validatedData) return;

  return await request({
    url: `/packages/${id}/update/texts`,
    method: "PATCH",
    data: validatedData,
    withCredentials: true,
  });
};

//----------- active status update ------------

export const updatePackageActiveStatus = async ({
  id,
  status,
}: {
  id: string;
  status: boolean;
}) => {
  const validatedData = PackageActiveStatusSchema.parse({ is_active: status });
  return await request({
    url: `/packages/${id}/update/active-status`,
    method: "PATCH",
    data: validatedData,
    withCredentials: true,
  });
};

// -----------delete------------

export const deletePackage = async (id: string) => {
  return await request({
    url: `/packages/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};

