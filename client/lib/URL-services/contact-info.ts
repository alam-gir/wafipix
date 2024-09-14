import { request } from "../axios"
import * as z from "zod"

export const getContactInfo = async () => {
    return await request({
        url: "/contact-info",
        method: "GET"
    })
}

export const getContactInfoKey = ["contact-info"]
export type TContactInfo = {
    country: string
    city: string
    area: string
    phone: string
    email: string
} 


// -----------add------------

export const ContactInfoSchema = z.object({
    country: z.string(),
    city: z.string(),
    area: z.string(),
    phone: z.string(),
    email: z.string().email("Enter valid email"),
  });
  
  export const updateContactInfo = async (data: z.infer<typeof ContactInfoSchema>) => {
    const validatedData = ContactInfoSchema.parse(data);
  
    if (!validatedData) return;
  
    return await request({
      url: "/contact-info",
      method: "POST",
      data: validatedData,
      withCredentials: true,
    });
  };
  