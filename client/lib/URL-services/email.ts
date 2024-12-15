export type TEmailForm = {
    fullName: string;
    companyName?: string;
    email: string;
    phone?: string;
    sourceOfCustomer: string;
    projectBudget: number;
    currency: "USD" | "BDT";
    projectDetails: string;
    isSubscribe: boolean;
  }

import { request } from "../axios"

export const sendContactMail = async (data: TEmailForm) => {
        return await request({
            url: "/email/contact",
            method: 'POST',
            data: JSON.stringify(data),
            headers: {  
                "Content-Type": "application/json"
            }
        })
}


