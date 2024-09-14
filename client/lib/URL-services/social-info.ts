import { request } from "../axios";
import * as z from "zod";

export const getSocialInfo = async () => {
  return await request({
    url: "/social-info",
    method: "GET",
  });
};

export const getSocialInfoQueryKey = ["social-info"];
export type TSocialInfo = {
  _id: string;
  title: string;
  url: string;
  icon: {
    url: string;
    public_id: string;
  };
};

//----------------deleteSocialInfo.ts----------------

export const deleteSocialInfo = async (id: string) => {
  return request({
    url: `/social-info/${id}`,
    method: "DELETE",
    withCredentials: true,
  });
};

// -----------add------------

export const SocialInfoSchema = z.object({
  title: z.string().min(3, "Title is too short").max(255, "Title is too long"),
  url: z.string().url("URL example: https://www.example.com"),
  icon: z
    .any()
    .refine((file) => file instanceof File && file?.type?.includes("image/"), {
      message: "Please upload a valid image",
    })
    .refine((file) => file?.size < 1000000, {
      message: "Image size should be less than 1 MB",
    }),
});

export const addSocialInfo = async (data: z.infer<typeof SocialInfoSchema>) => {
  const validatedData = SocialInfoSchema.parse(data);

  if (!validatedData) return;

  const formData = new FormData();

  formData.append("title", validatedData.title);
  formData.append("url", validatedData.url);
  formData.append("icon", validatedData.icon);

  return await request({
    url: "/social-info",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
    withCredentials: true,
  });
};
